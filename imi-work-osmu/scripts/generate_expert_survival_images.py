#!/usr/bin/env python3
"""
OSMU Expert Survival Image Generator v1.0
AI 시대 전문가 생존 전략 콘텐츠용 브랜드 이미지 생성
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
    """DALL-E 3으로 전문가 브랜드 이미지 생성"""
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

# AI 전문가 생존 전략 프롬프트 정의
GHOST_PROMPT = """
A sophisticated professional minimalist artwork representing AI-era expertise and business survival strategy.

COMPOSITION: Clean professional layout with deep navy blue (#1e3a8a) foundation, featuring abstract representations of human expertise merging with AI capabilities - geometric patterns suggesting knowledge networks, skill development pathways, and strategic thinking frameworks flowing into bright white and light gray accents.

STYLE: Professional business quality, modern minimalism meets corporate sophistication, executive presentation aesthetics, Korean business context appropriate.

ELEMENTS: Abstract skill development networks, expertise visualization patterns, strategic adaptation symbols, professional growth trajectories, handshake metaphor integration suggesting business partnerships and pivots.

MOOD: Professional confidence, strategic insight, authentic expertise, 15-year F&B credibility, survival and adaptation strength.

TECHNICAL: Ultra-sharp details, business presentation quality, clean composition with reserved space for text overlay in bottom-right corner, no photorealistic elements, sophisticated negative space management.
"""

NAVER_PROMPT = """
A minimalist professional artwork focusing on AI-era expertise development and business adaptation strategies.

COMPOSITION: Centered design with navy blue (#1e3a8a) foundation, featuring abstract professional development patterns and strategic thinking visualization in white and light gray accents.

STYLE: Korean business context appropriate, professional minimalism, corporate presentation quality, trustworthy and authentic feel.

ELEMENTS: Professional expertise symbols, business adaptation patterns, strategic pivot representations, authentic experience markers.

MOOD: Trust, credibility, professional expertise, 15-year F&B experience authority, adaptation and survival.

TECHNICAL: 16:9 aspect ratio optimized, sharp details, business presentation quality, Korean professional standards.
"""

INSTAGRAM_FEED_PROMPT = """
A square format professional minimalist masterpiece representing AI-era expert survival and business adaptation.

COMPOSITION: Balanced square layout with navy blue (#1e3a8a) core, featuring geometric patterns suggesting professional expertise evolution and strategic business adaptation.

STYLE: Instagram-optimized professional art, mobile-first visual hierarchy, business minimalism with authentic feel.

ELEMENTS: Professional development flows, expertise networks, adaptation symbols, strategic thinking patterns.

MOOD: Professional confidence, authentic expertise, mobile-friendly impact, survival strategy strength.

TECHNICAL: Perfect square composition, high mobile visibility, professional business quality, authentic brand representation.
"""

INSTAGRAM_STORY_PROMPT = """
A vertical professional minimalist artwork optimized for mobile storytelling about AI-era expertise and survival strategy.

COMPOSITION: Vertical flow design with navy blue (#1e3a8a) gradient, featuring upward-flowing professional development patterns and expertise evolution visualization.

STYLE: Mobile-first professional art, business minimalism, story-format optimized for authentic engagement.

ELEMENTS: Vertical expertise flows, ascending professional patterns, strategic adaptation visualization, authentic experience markers.

MOOD: Upward professional momentum, strategic expertise, mobile storytelling impact, survival and adaptation confidence.

TECHNICAL: 4:5 vertical ratio, mobile screen optimized, sharp vertical composition, professional business quality.
"""

def main():
    """메인 실행 함수"""
    print("🎨 OSMU Expert Survival Image Generator v1.0 시작")
    print("AI 시대 전문가 생존 전략 콘텐츠용 브랜드 이미지 생성")

    # 기본 경로
    base_path = "/Users/rhim/Projects/imi-work-osmu/assets/images/ai-expert-survival-handshake-lessons"

    images_generated = []

    # Ghost Feature 이미지 (1200x630)
    print("\n1. Ghost Feature 이미지 생성 중...")
    ghost_img = generate_image(GHOST_PROMPT, "1792x1024")  # DALL-E 3 최대 해상도
    if ghost_img:
        # 1200x630으로 리사이즈
        ghost_img = ghost_img.resize((1200, 630), Image.Resampling.LANCZOS)
        ghost_img = add_text_overlay(ghost_img, "Expert Survival", "SENSE & AI")
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
        naver_img = add_text_overlay(naver_img, "Expert Survival", "SENSE & AI")
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
        instagram_feed_img = add_text_overlay(instagram_feed_img, "Expert Survival", "SENSE & AI")
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
        instagram_story_img = add_text_overlay(instagram_story_img, "Expert Survival", "SENSE & AI")
        instagram_story_path = f"{base_path}/instagram/story.png"
        instagram_story_img.save(instagram_story_path, "PNG", quality=95)
        images_generated.append({"platform": "instagram", "type": "story", "path": instagram_story_path})
        print(f"✅ Instagram Story 이미지 생성 완료: {instagram_story_path}")

    # Manifest 파일 생성
    manifest = {
        "slug": "ai-expert-survival-handshake-lessons",
        "title": "AI 시대, 전문가가 되어야 살아남는다 - Handshake 피벗에서 배우는 현장의 교훈",
        "generated_at": datetime.now().isoformat(),
        "version": "v1.0",
        "total_images": len(images_generated),
        "images": images_generated,
        "brand_settings": {
            "primary_color": BRAND_NAVY,
            "text_overlay": {
                "primary": "Expert Survival",
                "secondary": "SENSE & AI",
                "position": "bottom_right",
                "opacity": "60%"
            }
        },
        "content_summary": {
            "theme": "AI 시대 전문가 생존 전략",
            "key_insights": [
                "AI 시대의 전문가 되기",
                "비즈니스 피벗 전략",
                "전문성과 AI의 결합",
                "Handshake 사례 분석",
                "현장 경험과 인사이트",
                "15년 F&B 경험 + AI 전문성"
            ],
            "visual_style": "Professional minimalism meets authentic expertise",
            "brand_philosophy": "일을 잘한다는 것 - SENSE & AI"
        }
    }

    manifest_path = f"{base_path}/image-manifest.json"
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    print(f"\n📋 Image Manifest 생성 완료: {manifest_path}")
    print(f"\n🎯 총 {len(images_generated)}개의 전문가 브랜드 이미지 생성 완료!")
    print("\n생성된 이미지 목록:")
    for img in images_generated:
        print(f"  - {img['platform'].upper()} {img['type']}: {img['path']}")

    return images_generated

if __name__ == "__main__":
    main()