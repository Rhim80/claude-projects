#!/usr/bin/env python3
"""
Ghost CMS 자동 발행 스크립트 with OSMU 이미지 패키지 통합
IMI WORK - SENSE & AI 블로그용 최적화 스크립트
"""

import json
import os
import requests
import jwt
from datetime import datetime, timedelta
from pathlib import Path
import markdown
from urllib.parse import urljoin
import time
from dotenv import load_dotenv

# 환경변수 로드
load_dotenv()

class GhostPublisher:
    def __init__(self, ghost_url, admin_api_key):
        self.ghost_url = ghost_url
        self.admin_api_key = admin_api_key
        self.api_base = f"{ghost_url}/ghost/api/admin/"
        
    def generate_jwt_token(self):
        """Ghost Admin API용 JWT 토큰 생성"""
        # API 키를 ID와 Secret으로 분리
        key_parts = self.admin_api_key.split(':')
        key_id = key_parts[0]
        key_secret = bytes.fromhex(key_parts[1])
        
        # JWT 페이로드 생성 - 현재 시간 사용
        import time
        # 현재 Unix timestamp를 직접 사용
        now_timestamp = int(time.time())
        # 현재 시간 기준으로 설정
        iat = now_timestamp
        exp = now_timestamp + 300  # 5분 후
        
        payload = {
            'iat': iat,
            'exp': exp,
            'aud': '/admin/'  # Ghost Admin API audience
        }
        
        print(f"Token debug - iat: {iat}, exp: {exp}, current: {now_timestamp}")
        
        # JWT 헤더
        header = {'kid': key_id}
        
        # JWT 토큰 생성
        token = jwt.encode(payload, key_secret, algorithm='HS256', headers=header)
        return token
    
    def upload_image(self, image_path, purpose='image'):
        """이미지를 Ghost에 업로드"""
        if not os.path.exists(image_path):
            print(f"Warning: Image not found: {image_path}")
            return None
            
        token = self.generate_jwt_token()
        url = f"{self.api_base}images/upload/"
        
        headers = {
            'Authorization': f'Ghost {token}'
            # Content-Type은 requests가 multipart로 자동 설정하므로 제거
        }
        
        try:
            with open(image_path, 'rb') as image_file:
                files = {
                    'file': (os.path.basename(image_path), image_file, 'image/png')
                }
                data = {
                    'purpose': purpose
                }
                print(f"🔍 이미지 업로드 디버그:")
                print(f"   파일 경로: {image_path}")
                print(f"   파일 크기: {os.path.getsize(image_path)} bytes")
                print(f"   헤더: {headers}")
                print(f"   Purpose: {purpose}")
                
                response = requests.post(url, headers=headers, files=files, data=data)
                
                print(f"📡 이미지 업로드 응답:")
                print(f"   상태 코드: {response.status_code}")
                print(f"   응답 내용: {response.text[:500]}...")
                
                response.raise_for_status()
                
                result = response.json()
                return result['images'][0]['url']
                
        except requests.exceptions.RequestException as e:
            print(f"Error uploading image {image_path}: {e}")
            return None
        except Exception as e:
            print(f"Error processing image {image_path}: {e}")
            return None
    
    def remove_first_h1(self, html_content):
        """HTML에서 첫 번째 H1 태그 제거 (Ghost 제목과 중복 방지)"""
        import re
        pattern = r'<h1[^>]*>.*?</h1>'
        modified_html = re.sub(pattern, '', html_content, count=1, flags=re.IGNORECASE | re.DOTALL)
        return modified_html.strip()

    def create_post(self, post_data):
        """Ghost에 포스트 생성"""
        print(f"🔑 JWT 토큰 생성 중...")
        token = self.generate_jwt_token()
        
        # HTML 콘텐츠에서 첫 번째 H1 제거
        if 'html' in post_data:
            original_length = len(post_data['html'])
            post_data['html'] = self.remove_first_h1(post_data['html'])
            print(f"🔧 H1 태그 제거: {original_length} → {len(post_data['html'])} characters")
        
        # source=html 파라미터로 HTML 직접 전송
        url = f"{self.api_base}posts/?source=html"
        
        headers = {
            'Authorization': f'Ghost {token}',
            'Content-Type': 'application/json'
        }
        
        # 전송할 데이터 디버깅
        print(f"📤 Ghost API 요청 준비:")
        print(f"   URL: {url}")
        print(f"   포스트 제목: {post_data.get('title', 'N/A')}")
        print(f"   HTML 크기: {len(post_data.get('html', ''))} characters")
        print(f"   HTML 미리보기: {post_data.get('html', '')[:200]}...")
        print(f"   슬러그: {post_data.get('slug', 'N/A')}")
        print(f"   메타 제목: {post_data.get('meta_title', 'N/A')}")
        print(f"   상태: {post_data.get('status', 'N/A')}")
        
        # 페이로드 전체 구조 확인
        payload = {'posts': [post_data]}
        print(f"🔍 전송 페이로드 키들: {list(payload['posts'][0].keys())}")
        
        try:
            payload = {'posts': [post_data]}
            print(f"🚀 Ghost API 호출 중...")
            response = requests.post(url, headers=headers, json=payload)
            
            print(f"📡 응답 상태 코드: {response.status_code}")
            
            if response.status_code == 201:
                print("✅ 포스트 생성 성공!")
                result = response.json()
                created_post = result['posts'][0]
                
                # API 응답 전체 구조 확인
                print(f"🔍 Ghost API 응답 전체 분석:")
                print(f"   응답 키들: {list(created_post.keys())}")
                print(f"   HTML 길이 (실제): {len(created_post.get('html', ''))}")
                print(f"   HTML 내용: {created_post.get('html', 'None')}")
                print(f"   Lexical 존재 여부: {'lexical' in created_post}")
                if 'lexical' in created_post:
                    print(f"   Lexical 내용: {created_post.get('lexical', '')[:200]}...")
                print(f"   Feature Image: {created_post.get('feature_image', 'None')}")
                
                return created_post
            else:
                print(f"❌ 포스트 생성 실패 - 상태 코드: {response.status_code}")
                print(f"응답 내용: {response.text}")
                return None
            
        except requests.exceptions.RequestException as e:
            print(f"❌ API 요청 오류: {e}")
            if hasattr(e, 'response') and e.response is not None:
                print(f"상세 응답: {e.response.text}")
            return None
        except Exception as e:
            print(f"❌ 포스트 처리 오류: {e}")
            return None

def load_osmu_manifest(slug):
    """OSMU 이미지 매니페스트 로드"""
    manifest_path = f"assets/images/{slug}/image-manifest.json"
    
    if not os.path.exists(manifest_path):
        raise FileNotFoundError(f"OSMU image manifest not found: {manifest_path}")
    
    with open(manifest_path, 'r', encoding='utf-8') as f:
        manifest = json.load(f)
    
    return manifest

def markdown_to_optimized_html(markdown_content, slug):
    """마크다운을 SEO 최적화된 HTML로 변환"""
    print(f"🔄 마크다운 변환 시작: {len(markdown_content)} characters")
    
    # 마크다운 내용이 있는지 확인
    if not markdown_content or markdown_content.strip() == "":
        print("❌ 마크다운 콘텐츠가 비어있습니다!")
        return "<p>콘텐츠를 불러오는 중 오류가 발생했습니다.</p>"
    
    try:
        # 기본 마크다운 변환
        html = markdown.markdown(
            markdown_content, 
            extensions=['extra', 'toc', 'codehilite', 'nl2br']
        )
        
        print(f"✅ 마크다운 변환 완료: {len(html)} characters")
        
        # Ghost용 HTML 최적화
        optimized_html = html
        
        # SEO 친화적 구조 개선 - H2 태그에 id 속성 추가
        import re
        def add_id_to_headings(match):
            heading_text = match.group(1)
            heading_id = heading_text.lower().replace(' ', '-').replace(':', '').replace('?', '').replace(',', '').replace('(', '').replace(')', '')
            return f'<h2 id="{heading_id}">{heading_text}</h2>'
        
        optimized_html = re.sub(r'<h2>([^<]+)</h2>', add_id_to_headings, optimized_html)
        
        # 디버깅: 변환된 HTML의 일부 출력
        print(f"🔍 HTML 변환 결과 (첫 200자): {optimized_html[:200]}...")
        
        return optimized_html
        
    except Exception as e:
        print(f"❌ 마크다운 변환 중 오류: {e}")
        return f"<p>마크다운 변환 오류: {str(e)}</p>"

def extract_meta_from_content(content):
    """콘텐츠에서 메타 정보 추출"""
    import re
    import yaml

    # YAML 메타데이터 블록 찾기
    yaml_pattern = r'```yaml\n(.*?)\n```'
    yaml_match = re.search(yaml_pattern, content, re.DOTALL)

    if yaml_match:
        try:
            yaml_content = yaml_match.group(1)
            meta_data = yaml.safe_load(yaml_content)
            return meta_data
        except Exception as e:
            print(f"⚠️ YAML 파싱 오류: {e}")
            return {}

    return {}

def optimize_for_seo(title, content, slug):
    """SEO 최적화된 메타데이터 생성"""
    # 콘텐츠에서 메타 정보 추출
    meta_data = extract_meta_from_content(content)

    # 기본값 설정
    meta_title = meta_data.get('meta_title', f"{title} | IMI WORK")
    meta_description = meta_data.get('meta_description', f"{title}에 대한 IMI WORK의 인사이트")
    custom_excerpt = meta_data.get('custom_excerpt', f"{title}에 대한 실무 중심의 분석과 적용 방안")

    # 태그 처리
    tag_list = meta_data.get('tags', ['IMI WORK'])
    tags = [{'name': tag} for tag in tag_list]
    
    return {
        'meta_title': meta_title,
        'meta_description': meta_description,
        'custom_excerpt': custom_excerpt,
        'tags': tags
    }

def main():
    """메인 실행 함수"""
    import argparse

    # 커맨드라인 인자 파싱
    parser = argparse.ArgumentParser(description="Ghost CMS 자동 발행 스크립트")
    parser.add_argument("--slug", required=True, help="콘텐츠 슬러그 (예: ai-agents-improving-interns)")
    parser.add_argument("--title", help="포스트 제목 (선택사항, 없으면 마크다운에서 추출)")
    parser.add_argument("--content-file", help="마크다운 파일 경로 (기본값: contents/{slug}/main.md)")
    parser.add_argument("--status", default="draft", choices=["draft", "published"], help="발행 상태 (기본값: draft)")

    args = parser.parse_args()

    print("🚀 Ghost CMS 자동 발행 시작")
    print("=" * 50)
    print(f"📋 슬러그: {args.slug}")
    print(f"📝 제목: {args.title or '마크다운에서 추출'}")
    print(f"📄 상태: {args.status}")

    GHOST_URL = os.getenv('GHOST_API_URL', 'https://blog.imiwork.com')
    GHOST_API_KEY = os.getenv('GHOST_ADMIN_API_KEY')

    if not GHOST_API_KEY:
        raise ValueError("GHOST_ADMIN_API_KEY가 환경변수에 설정되지 않았습니다.")

    slug = args.slug
    content_file = args.content_file or f"contents/{slug}/main.md"
    
    try:
        # 1. 마크다운 콘텐츠 로드
        print("📄 마크다운 콘텐츠 로드 중...")
        with open(content_file, 'r', encoding='utf-8') as f:
            markdown_content = f.read()
        
        # 2. OSMU 매니페스트 로드
        print("📦 OSMU 이미지 매니페스트 로드 중...")
        try:
            manifest = load_osmu_manifest(slug)
            title = manifest.get('title', slug.replace('-', ' ').title())
            print(f"✅ 매니페스트 로드 완료: {title}")
        except FileNotFoundError as e:
            print(f"⚠️ 매니페스트 파일을 찾을 수 없습니다: {e}")
            manifest = None
        
        # 3. Ghost 퍼블리셔 초기화
        publisher = GhostPublisher(GHOST_URL, GHOST_API_KEY)
        
        # 4. HTML 변환 및 SEO 최적화
        print("🔧 콘텐츠 최적화 중...")
        html_content = markdown_to_optimized_html(markdown_content, slug)
        # Extract title from markdown content's first line (H1)
        lines = markdown_content.strip().split('\n')
        content_title = lines[0].replace('# ', '') if lines and lines[0].startswith('# ') else title
        seo_data = optimize_for_seo(content_title, markdown_content, slug)
        
        # 5. 이미지 업로드 (OSMU 패키지가 있는 경우)
        feature_image_url = None
        content_images = []
        
        if manifest and 'platform_mappings' in manifest and 'ghost' in manifest['platform_mappings']:
            print("🖼️ OSMU 이미지 업로드 시도 중...")
            ghost_images = manifest['platform_mappings']['ghost']
            base_path = f"assets/images/{slug}/"
            
            # 피처 이미지 업로드
            if 'feature' in ghost_images:
                feature_path = base_path + ghost_images['feature']
                if os.path.exists(feature_path):
                    print(f"📸 피처 이미지 업로드: {feature_path}")
                    feature_image_url = publisher.upload_image(feature_path, 'image')
                    if feature_image_url:
                        print(f"✅ 피처 이미지 업로드 완료: {feature_image_url}")
                else:
                    print(f"⚠️ 피처 이미지 파일이 존재하지 않습니다: {feature_path}")
            
            # 콘텐츠 이미지 업로드
            if 'content-1' in ghost_images:
                img_path = base_path + ghost_images['content-1']
                if os.path.exists(img_path):
                    print(f"📸 콘텐츠 이미지 업로드: {img_path}")
                    img_url = publisher.upload_image(img_path, 'image')
                    if img_url:
                        content_images.append(img_url)
                        print(f"✅ 콘텐츠 이미지 업로드 완료: {img_url}")
        
        # 6. Ghost 포스트 데이터 준비 - 실제 콘텐츠로 발행
        print(f"📝 포스트 데이터 준비 중...")
        print(f"   제목: {seo_data['meta_title']}")
        print(f"   HTML 길이: {len(html_content)} characters")
        print(f"   슬러그: {slug}")
        
        # 제목 결정: 커맨드라인 인자 > 마크다운 첫 줄 > 기본값
        final_title = args.title or content_title or slug.replace('-', ' ').title()

        # Ghost v5 source=html 사용으로 HTML 직접 전송
        post_data = {
            'title': final_title,
            'slug': slug,
            'html': html_content,  # 직접 HTML 전송 (source=html 파라미터로)
            'meta_title': seo_data['meta_title'],
            'meta_description': seo_data['meta_description'],
            'custom_excerpt': seo_data['custom_excerpt'],
            'tags': seo_data['tags'],
            'status': args.status,
            'featured': True,
            'visibility': 'public'
        }
        
        # HTML 콘텐츠가 제대로 있는지 확인
        if not html_content or len(html_content.strip()) < 100:
            print(f"⚠️  경고: HTML 콘텐츠가 너무 짧습니다: {len(html_content)} characters")
            print(f"HTML 내용 미리보기: {html_content[:500]}...")
        else:
            print(f"✅ HTML 콘텐츠 검증 완료: {len(html_content)} characters")
        
        # 피처 이미지가 있으면 추가
        if feature_image_url:
            post_data['feature_image'] = feature_image_url
        
        # 7. Ghost에 포스트 생성 - 검증된 방식으로 source=html 사용
        print("🚀 Ghost에 포스트 생성 중...")
        created_post = publisher.create_post(post_data)
        
        if created_post:
            print("\n🎉 Ghost 포스팅 자동화 완료!")
            print("=" * 50)
            print(f"📊 포스트 제목: {created_post['title']}")
            print(f"🌐 Ghost URL: {GHOST_URL}/{created_post['slug']}/")
            print(f"🆔 포스트 ID: {created_post['id']}")
            print(f"📋 상태: {created_post['status'].upper()}")
            
            if feature_image_url:
                print(f"🖼️ 피처 이미지: {feature_image_url}")
            if content_images:
                print(f"📷 콘텐츠 이미지: {len(content_images)}개 업로드 완료")
            
            print(f"\n📝 SEO 최적화:")
            print(f"- 메타 제목: {seo_data['meta_title']}")
            print(f"- 메타 설명: {seo_data['meta_description']}")
            print(f"- URL Slug: /{slug}")
            
            print(f"\n📋 다음 단계:")
            print("1. Ghost 관리자에서 포스트 내용 최종 확인")
            print("2. Draft → Published 상태 변경")
            print("3. SNS 공유 및 마케팅 활동")
            
        else:
            print("❌ 포스트 생성에 실패했습니다.")
            
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()