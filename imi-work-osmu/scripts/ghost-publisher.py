#!/usr/bin/env python3
"""
Ghost CMS v5 Admin API Publisher
JWT 인증 기반 Ghost 블로그 자동 발행 시스템
"""

import os
import sys
import json
import jwt
import requests
import re
from datetime import datetime, timezone
from urllib.parse import urlparse
from pathlib import Path

class GhostPublisher:
    def __init__(self, ghost_url, admin_api_key):
        self.ghost_url = ghost_url.rstrip('/')
        self.admin_api_key = admin_api_key
        
        # Admin API key format: id:secret
        try:
            self.key_id, self.secret = admin_api_key.split(':')
        except ValueError:
            raise ValueError("Ghost Admin API key format이 잘못되었습니다. 'id:secret' 형식이어야 합니다.")
        
        self.api_url = f"{self.ghost_url}/ghost/api/admin"
        
        print(f"🔗 Ghost Publisher 초기화")
        print(f"   URL: {self.ghost_url}")
        print(f"   API: {self.api_url}")
    
    def generate_jwt_token(self):
        """Ghost Admin API용 JWT 토큰 생성"""
        # JWT payload
        iat = int(datetime.now(timezone.utc).timestamp())
        
        payload = {
            'iat': iat,
            'exp': iat + 300,  # 5분 유효
            'aud': '/admin/'
        }
        
        # JWT 토큰 생성
        token = jwt.encode(
            payload,
            bytes.fromhex(self.secret),
            algorithm='HS256',
            headers={'kid': self.key_id}
        )
        
        return token
    
    def get_headers(self):
        """API 요청 헤더 생성"""
        token = self.generate_jwt_token()
        return {
            'Authorization': f'Ghost {token}',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    
    def upload_image(self, image_path):
        """이미지를 Ghost에 업로드하고 URL 반환"""
        if not os.path.exists(image_path):
            print(f"❌ 이미지 파일이 없습니다: {image_path}")
            return None
        
        try:
            # JWT 토큰 (이미지 업로드는 multipart/form-data 사용)
            token = self.generate_jwt_token()
            
            headers = {
                'Authorization': f'Ghost {token}'
            }
            
            # 이미지 파일 읽기
            with open(image_path, 'rb') as f:
                files = {
                    'file': (os.path.basename(image_path), f, 'image/png'),
                    'purpose': (None, 'image')
                }
                
                print(f"📤 이미지 업로드 중: {os.path.basename(image_path)}")
                
                response = requests.post(
                    f"{self.api_url}/images/upload/",
                    headers=headers,
                    files=files,
                    timeout=30
                )
            
            if response.status_code == 201:
                result = response.json()
                image_url = result['images'][0]['url']
                print(f"✅ 이미지 업로드 성공: {image_url}")
                return image_url
            else:
                print(f"❌ 이미지 업로드 실패: {response.status_code}")
                print(f"응답: {response.text[:200]}...")
                return None
                
        except Exception as e:
            print(f"❌ 이미지 업로드 오류: {e}")
            return None
    
    def remove_first_h1(self, html_content):
        """HTML 콘텐츠에서 첫 번째 H1 태그 제거 (Ghost 제목과 중복 방지)"""
        # 첫 번째 H1 태그만 제거
        pattern = r'<h1[^>]*>.*?</h1>'
        modified_html = re.sub(pattern, '', html_content, count=1, flags=re.IGNORECASE | re.DOTALL)
        
        # 앞쪽 공백 정리
        modified_html = modified_html.strip()
        
        return modified_html
    
    def create_post(self, post_data):
        """Ghost에 새 포스트 생성"""
        try:
            headers = self.get_headers()
            
            # HTML 콘텐츠에서 첫 번째 H1 제거
            if 'html' in post_data:
                post_data['html'] = self.remove_first_h1(post_data['html'])
            
            # Ghost v5 Lexical 호환을 위한 source 파라미터 추가
            url = f"{self.api_url}/posts/?source=html"
            
            payload = {
                "posts": [post_data]
            }
            
            print(f"📝 Ghost 포스트 생성 중...")
            print(f"   제목: {post_data.get('title', 'N/A')}")
            print(f"   상태: {post_data.get('status', 'draft')}")
            
            response = requests.post(url, headers=headers, json=payload, timeout=30)
            
            if response.status_code == 201:
                result = response.json()
                post = result['posts'][0]
                print(f"✅ Ghost 포스트 생성 성공!")
                return post
            else:
                print(f"❌ Ghost 포스트 생성 실패: {response.status_code}")
                print(f"응답: {response.text[:500]}...")
                return None
                
        except Exception as e:
            print(f"❌ Ghost 포스트 생성 오류: {e}")
            return None
    
    def update_post(self, post_id, post_data):
        """기존 포스트 업데이트"""
        try:
            headers = self.get_headers()
            
            # HTML 콘텐츠에서 첫 번째 H1 제거
            if 'html' in post_data:
                post_data['html'] = self.remove_first_h1(post_data['html'])
            
            url = f"{self.api_url}/posts/{post_id}/?source=html"
            
            payload = {
                "posts": [post_data]
            }
            
            print(f"📝 Ghost 포스트 업데이트 중: {post_id}")
            
            response = requests.put(url, headers=headers, json=payload, timeout=30)
            
            if response.status_code == 200:
                result = response.json()
                post = result['posts'][0]
                print(f"✅ Ghost 포스트 업데이트 성공!")
                return post
            else:
                print(f"❌ Ghost 포스트 업데이트 실패: {response.status_code}")
                print(f"응답: {response.text[:500]}...")
                return None
                
        except Exception as e:
            print(f"❌ Ghost 포스트 업데이트 오류: {e}")
            return None
    
    def get_posts(self, limit=15, status='all'):
        """포스트 목록 가져오기"""
        try:
            headers = self.get_headers()
            url = f"{self.api_url}/posts/?limit={limit}&status={status}"
            
            response = requests.get(url, headers=headers, timeout=30)
            
            if response.status_code == 200:
                result = response.json()
                return result['posts']
            else:
                print(f"❌ 포스트 목록 가져오기 실패: {response.status_code}")
                return None
                
        except Exception as e:
            print(f"❌ 포스트 목록 가져오기 오류: {e}")
            return None
    
    def delete_post(self, post_id):
        """포스트 삭제"""
        try:
            headers = self.get_headers()
            url = f"{self.api_url}/posts/{post_id}/"
            
            print(f"🗑️ 포스트 삭제 중: {post_id}")
            
            response = requests.delete(url, headers=headers, timeout=30)
            
            if response.status_code == 204:
                print(f"✅ 포스트 삭제 성공!")
                return True
            else:
                print(f"❌ 포스트 삭제 실패: {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ 포스트 삭제 오류: {e}")
            return False

def test_ghost_connection():
    """Ghost 연결 테스트"""
    try:
        from dotenv import load_dotenv
        load_dotenv()
        
        ghost_url = os.getenv('GHOST_API_URL')
        admin_api_key = os.getenv('GHOST_ADMIN_API_KEY')
        
        if not ghost_url or not admin_api_key:
            print("❌ GHOST_API_URL 또는 GHOST_ADMIN_API_KEY가 설정되지 않았습니다.")
            return False
        
        publisher = GhostPublisher(ghost_url, admin_api_key)
        
        # 연결 테스트 - 포스트 목록 가져오기
        posts = publisher.get_posts(limit=1)
        
        if posts is not None:
            print(f"✅ Ghost 연결 테스트 성공! (총 포스트: {len(posts)}개)")
            return True
        else:
            print("❌ Ghost 연결 테스트 실패")
            return False
            
    except Exception as e:
        print(f"❌ Ghost 연결 테스트 오류: {e}")
        return False

if __name__ == "__main__":
    # 테스트 실행
    test_ghost_connection()