#!/usr/bin/env python3
"""
DALL-E 3 OSMU 이미지 생성기 - 간소화 버전
VISUAL_PROMPT v5.5 + OpenAI DALL-E 3 = 갤러리급 이미지
"""

import os
import json
import requests
import argparse
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv
from PIL import Image
from io import BytesIO

from openai import OpenAI

# 환경변수 로드
load_dotenv()

def generate_from_prompts(slug, prompt_a, prompt_b, single_mode=False, single_size="1080x1080", quality="standard", platforms=None):
    """
    VISUAL_PROMPT v5.5 프롬프트로 DALL-E 3 이미지 생성

    Args:
        slug: 콘텐츠 식별자
        prompt_a: Primary visual prompt
        prompt_b: Secondary visual prompt
        single_mode: 단일 이미지만 생성 (기본: False)
        single_size: 단일 이미지 크기 (기본: "1080x1080")
        quality: 이미지 품질 "standard" 또는 "hd" (기본: "standard")
        platforms: 생성할 플랫폼 리스트 (기본: None, 전체 생성)

    Returns:
        bool: 생성 성공 여부
    """
    
    # OpenAI API 키 확인
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        print("❌ OPENAI_API_KEY가 설정되지 않았습니다.")
        return False
    
    print(f"🎨 DALL-E 3 OSMU 이미지 생성 시작: {slug}")

    # OpenAI 클라이언트 초기화
    client = OpenAI(api_key=api_key)
    
    # 출력 디렉토리 설정 (절대 경로 사용)
    script_dir = Path(__file__).parent.parent  # /Users/rhim/Projects/imi-work-osmu
    base_dir = script_dir / "assets" / "images" / slug
    base_dir.mkdir(parents=True, exist_ok=True)

    print(f"📁 이미지 저장 경로: {base_dir.absolute()}")
    
    # 플랫폼별 이미지 설정
    if single_mode:
        # 단일 이미지 모드
        width, height = parse_size(single_size)
        images_config = [
            {"platform": "single", "type": "artwork", "size": (width, height), "prompt": prompt_a}
        ]
        print(f"🎨 단일 이미지 모드: {width}x{height}")
    else:
        # 전체 OSMU 이미지 설정
        all_images_config = [
            # Primary prompt (prompt_a) 사용
            {"platform": "ghost", "type": "feature", "size": (1200, 630), "prompt": prompt_a},
            {"platform": "naver", "type": "main", "size": (800, 450), "prompt": prompt_a},
            {"platform": "instagram", "type": "feed", "size": (1080, 1080), "prompt": prompt_a},

            # Secondary prompt (prompt_b) 사용
            {"platform": "ghost", "type": "content-1", "size": (800, 450), "prompt": prompt_b},
            {"platform": "naver", "type": "body-1", "size": (800, 450), "prompt": prompt_b},
            {"platform": "instagram", "type": "story", "size": (1080, 1350), "prompt": prompt_b},
        ]

        # 플랫폼 필터링
        if platforms:
            platform_list = [p.strip().lower() for p in platforms.split(',')]
            images_config = [img for img in all_images_config if img["platform"] in platform_list]
            print(f"🎨 선택된 플랫폼: {platforms} ({len(images_config)}개 이미지)")
        else:
            images_config = all_images_config
            print(f"🎨 OSMU 패키지 모드: 6개 이미지 생성")
    
    successful_images = 0
    generation_log = []
    start_time = datetime.now()
    
    # 각 이미지 생성
    for config in images_config:
        platform = config["platform"]
        image_type = config["type"]
        target_size = config["size"]
        prompt = config["prompt"]
        
        print(f"\n📱 {platform.upper()} - {image_type} ({target_size[0]}x{target_size[1]})")
        
        try:
            # DALL-E 3 이미지 생성
            response = client.images.generate(
                model="dall-e-3",
                prompt=prompt,
                size=get_dalle_size(target_size),
                quality=quality,
                style="vivid",
                n=1
            )
            
            # 이미지 다운로드
            image_url = response.data[0].url
            img_response = requests.get(image_url)
            img_response.raise_for_status()
            
            # PIL로 이미지 처리
            image = Image.open(BytesIO(img_response.content))
            
            # 타겟 크기로 리사이즈
            if image.size != target_size:
                image = image.resize(target_size, Image.Resampling.LANCZOS)
            
            # 플랫폼 디렉토리 생성 및 저장
            platform_dir = base_dir / platform
            platform_dir.mkdir(exist_ok=True)
            
            output_path = platform_dir / f"{image_type}.png"
            image.save(output_path, "PNG", optimize=True)
            
            print(f"   ✅ 저장 완료: {output_path}")
            print(f"   📁 절대 경로: {output_path.absolute()}")
            successful_images += 1
            
            # 로그 기록
            generation_log.append({
                "file": f"{platform}/{image_type}.png",
                "platform": platform,
                "image_type": image_type,
                "size": f"{target_size[0]}x{target_size[1]}",
                "success": True,
                "timestamp": datetime.now().isoformat()
            })
            
        except Exception as e:
            print(f"   ❌ 생성 실패: {e}")
            generation_log.append({
                "file": f"{platform}/{image_type}.png",
                "platform": platform,
                "image_type": image_type,
                "size": f"{target_size[0]}x{target_size[1]}",
                "success": False,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            })
    
    # 매니페스트 생성
    end_time = datetime.now()
    duration = (end_time - start_time).total_seconds()
    
    manifest = {
        "slug": slug,
        "generated_at": start_time.isoformat(),
        "generation_method": f"DALL-E 3 {quality.upper()} + VISUAL_PROMPT v5.5",
        "model": "dall-e-3",
        "quality": quality,
        "style": "vivid",
        "total_images": len(images_config),
        "successful_images": successful_images,
        "failed_images": len(images_config) - successful_images,
        "generation_duration_seconds": duration,
        "generation_log": generation_log
    }
    
    # 매니페스트 저장
    manifest_path = base_dir / "image-manifest.json"
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    
    # 결과 출력
    print(f"\n🎉 DALL-E 3 생성 완료!")
    print(f"✅ 성공: {successful_images}개")
    print(f"❌ 실패: {len(images_config) - successful_images}개")
    print(f"⏱️  소요시간: {duration:.1f}초")
    print(f"📄 매니페스트: {manifest_path}")

    # 생성된 파일 존재 확인
    print(f"\n📁 생성된 파일 목록:")
    for config in images_config:
        platform = config["platform"]
        image_type = config["type"]
        file_path = base_dir / platform / f"{image_type}.png"
        exists = "✅" if file_path.exists() else "❌"
        size_info = f"({file_path.stat().st_size // 1024}KB)" if file_path.exists() else ""
        print(f"   {exists} {platform}/{image_type}.png {size_info}")

    print(f"\n🎯 저장 경로: {base_dir.absolute()}")

    return successful_images > 0

def parse_size(size_string):
    """크기 문자열을 파싱하여 (width, height) 튜플 반환"""
    try:
        if 'x' in size_string:
            width, height = size_string.split('x')
            return (int(width), int(height))
        else:
            # 정사각형으로 가정
            size = int(size_string)
            return (size, size)
    except ValueError:
        print(f"⚠️ 잘못된 크기 형식: {size_string}. 기본값 1080x1080 사용")
        return (1080, 1080)

def get_dalle_size(target_size):
    """타겟 크기에 따른 DALL-E 3 최적 크기 선택 (비용 최적화)"""
    width, height = target_size

    # 1080px 이하는 1024x1024로 통일 (비용 절감)
    if max(width, height) <= 1080:
        return "1024x1024"

    if width > height:
        return "1792x1024"  # 가로형
    elif width == height:
        return "1024x1024"  # 정사각형
    else:
        return "1024x1792"  # 세로형

def main():
    """커맨드라인 인자 또는 대화형 모드"""
    parser = argparse.ArgumentParser(description="DALL-E 3 OSMU 이미지 생성기")
    parser.add_argument("--slug", help="콘텐츠 슬러그")
    parser.add_argument("--prompt-a", help="Primary 프롬프트")
    parser.add_argument("--prompt-b", help="Secondary 프롬프트")
    parser.add_argument("--single", action="store_true", help="단일 이미지만 생성 (기본값)")
    parser.add_argument("--size", default="1080x1080", help="단일 이미지 크기 (예: 1080x1080)")
    parser.add_argument("--quality", default="standard", choices=["standard", "hd"],
                        help="이미지 품질 (기본: standard, 비용 절약)")
    parser.add_argument("--platforms", help="생성할 플랫폼 (예: ghost,instagram)")

    args = parser.parse_args()

    print("🎨 DALL-E 3 OSMU 이미지 생성기")

    # 커맨드라인 인자가 있으면 사용, 없으면 대화형 모드
    if args.slug and args.prompt_a:
        print("📋 커맨드라인 모드")
        slug = args.slug
        prompt_a = args.prompt_a
        prompt_b = args.prompt_b or "An abstract artistic composition with elegant visual harmony"

        print(f"   슬러그: {slug}")
        print(f"   Primary: {prompt_a[:50]}...")
        if not args.single:
            print(f"   Secondary: {prompt_b[:50]}...")
        print(f"   모드: {'단일 이미지' if args.single else 'OSMU 패키지'}")
        print(f"   품질: {args.quality}")
        if args.platforms:
            print(f"   플랫폼: {args.platforms}")

        # 커맨드라인 모드에서 실행
        success = generate_from_prompts(slug, prompt_a, prompt_b,
                                       single_mode=args.single,
                                       single_size=args.size,
                                       quality=args.quality,
                                       platforms=args.platforms)

        if success:
            print("\n🎯 생성 성공!")
        else:
            print("\n❌ 생성 실패!")
        return
    else:
        print("⚠️  이 스크립트는 서브에이전트와 함께 사용하도록 설계되었습니다.")
        print("💬 대화형 테스트 모드:")

        slug = input("슬러그 입력: ").strip()
        if not slug:
            slug = "test-dalle3"

        prompt_a = input("Primary prompt: ").strip()
        if not prompt_a:
            prompt_a = "A minimalist architectural visualization with geometric shapes and golden ratio composition"

        prompt_b = input("Secondary prompt: ").strip()
        if not prompt_b:
            prompt_b = "An abstract data visualization with clean lines and professional aesthetic"

    print(f"\n🚀 생성 시작...")
    # 대화형 모드에서는 기본값으로 단일 모드 사용 (비용 절약)
    success = generate_from_prompts(slug, prompt_a, prompt_b, single_mode=True, quality="standard")

    if success:
        print("\n🎯 생성 성공! assets/images/ 폴더를 확인하세요.")
    else:
        print("\n❌ 생성 실패!")

if __name__ == "__main__":
    main()