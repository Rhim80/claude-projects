#!/usr/bin/env python3
"""
OSMU Gallery-grade Image Generator v5.5
AI 투자 패러다임 콘텐츠용 갤러리급 예술 작품 생성
"""

import os
import openai
import requests
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
import json
from datetime import datetime

# OpenAI 클라이언트 설정
client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# 브랜드 컬러 정의
BRAND_NAVY = "#1e3a8a"
BRAND_WHITE = "#ffffff"
BRAND_LIGHT_GRAY = "#f8fafc"

def generate_image(prompt, size="1024x1024"):
    """DALL-E 3으로 갤러리급 이미지 생성"""
    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size=size,
            quality="hd",
            style="vivid"
        )

        image_url = response.data[0].url

        # 이미지 다운로드
        img_response = requests.get(image_url)
        img = Image.open(BytesIO(img_response.content))

        return img
    except Exception as e:
        print(f"이미지 생성 오류: {e}")
        return None

def add_text_overlay(image, primary_text, secondary_text, position="bottom_right"):
    """미니멀 텍스트 오버레이 추가"""
    draw = ImageDraw.Draw(image)

    # 이미지 크기
    width, height = image.size

    try:
        # 폰트 설정 (시스템 기본 폰트 사용)
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()

    if position == "bottom_right":
        # Primary text
        primary_bbox = draw.textbbox((0, 0), primary_text, font=font_large)
        primary_x = width - (primary_bbox[2] - primary_bbox[0]) - 40
        primary_y = height - (primary_bbox[3] - primary_bbox[1]) - 60

        # 60% 투명도로 텍스트 추가
        overlay = Image.new('RGBA', image.size, (0, 0, 0, 0))
        overlay_draw = ImageDraw.Draw(overlay)
        overlay_draw.text((primary_x, primary_y), primary_text,
                         fill=(30, 58, 138, 153), font=font_large)  # Navy with 60% opacity

        # Secondary text
        secondary_bbox = draw.textbbox((0, 0), secondary_text, font=font_small)
        secondary_x = width - (secondary_bbox[2] - secondary_bbox[0]) - 40
        secondary_y = primary_y + 30

        overlay_draw.text((secondary_x, secondary_y), secondary_text,
                         fill=(255, 255, 255, 153), font=font_small)  # White with 60% opacity

        # 오버레이 합성
        image = Image.alpha_composite(image.convert('RGBA'), overlay).convert('RGB')

    return image

# VISUAL_PROMPT v5.5 갤러리급 프롬프트 정의
GHOST_PROMPT = """
A sophisticated cyberpunk minimalist data visualization artwork representing AI investment paradigm transformation.

COMPOSITION: Three-stage visual narrative (PRE/TICK/POST structure) - Deep navy blue (#1e3a8a) gradient background with subtle geometric patterns suggesting market dynamics flowing into bright cyan and white holographic data streams forming neural network connections, culminating in clean architectural lines representing workflow optimization.

STYLE: Gallery exhibition quality, cyberpunk minimalism meets academic precision, generative art aesthetics, cinema-grade lighting, sophisticated negative space management.

ELEMENTS: Floating holographic data streams, abstract neural networks, geometric workflow patterns, strategic thinking visualization.

MOOD: Professional confidence, strategic insight, innovation leadership.

TECHNICAL: Ultra-sharp details, large format display quality, no photorealistic elements, clean composition with reserved space for text overlay in bottom-right corner.
"""

NAVER_PROMPT = """
A minimalist cyberpunk artwork focusing on AI workflow innovation and strategic thinking.

COMPOSITION: Centered design with navy blue (#1e3a8a) foundation, featuring abstract data flow patterns and neural network structures in cyan and white accents.

STYLE: Gallery-quality generative art, cyberpunk minimalism, academic precision, Korean business context appropriate.

ELEMENTS: Strategic workflow visualization, data transformation patterns, AI network representations.

MOOD: Trust, expertise, innovation, 15-year F&B experience credibility.

TECHNICAL: 16:9 aspect ratio optimized, sharp details, professional presentation quality.
"""

INSTAGRAM_FEED_PROMPT = """
A square format cyberpunk minimalist masterpiece representing zero-sum game transcendence in AI investment.

COMPOSITION: Balanced square layout with navy blue (#1e3a8a) core, radiating geometric patterns suggesting market expansion beyond traditional limitations.

STYLE: Instagram-optimized gallery art, mobile-first visual hierarchy, cyberpunk minimalism.

ELEMENTS: Circular data flows, expanding network patterns, breakthrough visualization.

MOOD: Innovation breakthrough, strategic advancement, mobile-friendly impact.

TECHNICAL: Perfect square composition, high mobile visibility, gallery exhibition quality.
"""

INSTAGRAM_STORY_PROMPT = """
A vertical cyberpunk minimalist artwork optimized for mobile storytelling about AI workflow mastery.

COMPOSITION: Vertical flow design with navy blue (#1e3a8a) gradient, featuring upward-flowing data streams and workflow optimization patterns.

STYLE: Mobile-first gallery art, cyberpunk minimalism, story-format optimized.

ELEMENTS: Vertical data flows, ascending network patterns, workflow mastery visualization.

MOOD: Upward momentum, strategic mastery, mobile storytelling impact.

TECHNICAL: 4:5 vertical ratio, mobile screen optimized, sharp vertical composition.
"""

def main():
    """메인 실행 함수"""
    print("🎨 OSMU Gallery-grade Image Generator v5.5 시작")
    print("AI 투자 패러다임 콘텐츠용 갤러리급 예술 작품 생성")

    # 기본 경로
    base_path = "/Users/rhim/Projects/imi-work-osmu/assets/images/ai-investment-beyond-zero-sum"

    images_generated = []

    # Ghost Feature 이미지 (1200x630)
    print("\n1. Ghost Feature 이미지 생성 중...")
    ghost_img = generate_image(GHOST_PROMPT, "1792x1024")  # DALL-E 3 최대 해상도
    if ghost_img:
        # 1200x630으로 리사이즈
        ghost_img = ghost_img.resize((1200, 630), Image.Resampling.LANCZOS)
        ghost_img = add_text_overlay(ghost_img, "Beyond Zero Sum", "Smart Workflow")
        ghost_path = f"{base_path}/ghost/feature.png"
        ghost_img.save(ghost_path, "PNG", quality=95)
        images_generated.append({"platform": "ghost", "type": "feature", "path": ghost_path})
        print(f"✅ Ghost Feature 이미지 생성 완료: {ghost_path}")

    # Naver Main 이미지 (800x450)
    print("\n2. Naver Main 이미지 생성 중...")
    naver_img = generate_image(NAVER_PROMPT, "1792x1024")
    if naver_img:
        # 800x450으로 리사이즈
        naver_img = naver_img.resize((800, 450), Image.Resampling.LANCZOS)
        naver_img = add_text_overlay(naver_img, "Beyond Zero Sum", "Smart Workflow")
        naver_path = f"{base_path}/naver/main.png"
        naver_img.save(naver_path, "PNG", quality=95)
        images_generated.append({"platform": "naver", "type": "main", "path": naver_path})
        print(f"✅ Naver Main 이미지 생성 완료: {naver_path}")

    # Instagram Feed 이미지 (1080x1080)
    print("\n3. Instagram Feed 이미지 생성 중...")
    instagram_feed_img = generate_image(INSTAGRAM_FEED_PROMPT, "1024x1024")
    if instagram_feed_img:
        # 1080x1080으로 리사이즈
        instagram_feed_img = instagram_feed_img.resize((1080, 1080), Image.Resampling.LANCZOS)
        instagram_feed_img = add_text_overlay(instagram_feed_img, "Beyond Zero Sum", "Smart Workflow")
        instagram_feed_path = f"{base_path}/instagram/feed.png"
        instagram_feed_img.save(instagram_feed_path, "PNG", quality=95)
        images_generated.append({"platform": "instagram", "type": "feed", "path": instagram_feed_path})
        print(f"✅ Instagram Feed 이미지 생성 완료: {instagram_feed_path}")

    # Instagram Story 이미지 (1080x1350)
    print("\n4. Instagram Story 이미지 생성 중...")
    instagram_story_img = generate_image(INSTAGRAM_STORY_PROMPT, "1024x1792")
    if instagram_story_img:
        # 1080x1350으로 리사이즈
        instagram_story_img = instagram_story_img.resize((1080, 1350), Image.Resampling.LANCZOS)
        instagram_story_img = add_text_overlay(instagram_story_img, "Beyond Zero Sum", "Smart Workflow")
        instagram_story_path = f"{base_path}/instagram/story.png"
        instagram_story_img.save(instagram_story_path, "PNG", quality=95)
        images_generated.append({"platform": "instagram", "type": "story", "path": instagram_story_path})
        print(f"✅ Instagram Story 이미지 생성 완료: {instagram_story_path}")

    # Manifest 파일 생성
    manifest = {
        "slug": "ai-investment-beyond-zero-sum",
        "title": "AI 투자는 제로섬 게임이 아니다: AI 네이티브 기업의 진짜 승부처",
        "generated_at": datetime.now().isoformat(),
        "version": "v5.5",
        "total_images": len(images_generated),
        "images": images_generated,
        "brand_settings": {
            "primary_color": BRAND_NAVY,
            "text_overlay": {
                "primary": "Beyond Zero Sum",
                "secondary": "Smart Workflow",
                "position": "bottom_right",
                "opacity": "60%"
            }
        },
        "content_summary": {
            "theme": "AI 투자 패러다임 전환",
            "key_insights": [
                "AI 시장의 제로섬 사고 한계 돌파",
                "GPT Wrapper 편견 극복",
                "혁신자의 딜레마 현상",
                "워크플로우 설계의 중요성",
                "문제 설정 능력이 승부처"
            ],
            "visual_style": "Cyberpunk minimalism meets academic precision"
        }
    }

    manifest_path = f"{base_path}/image-manifest.json"
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    print(f"\n📋 Image Manifest 생성 완료: {manifest_path}")
    print(f"\n🎯 총 {len(images_generated)}개의 갤러리급 이미지 생성 완료!")
    print("\n생성된 이미지 목록:")
    for img in images_generated:
        print(f"  - {img['platform'].upper()} {img['type']}: {img['path']}")

    return images_generated

if __name__ == "__main__":
    main()