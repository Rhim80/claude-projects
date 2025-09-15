#!/usr/bin/env python3
"""
실패한 이미지들을 위한 간소화된 메타프롬프트로 완성
"""
import sys
import os
import importlib.util

# Import the generator
spec = importlib.util.spec_from_file_location("gemini_image_generator", "/Users/rhim/Projects/imi-work-osmu/scripts/gemini-image-generator.py")
gemini_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gemini_module)
OSMUImageGenerator = gemini_module.OSMUImageGenerator

def main():
    print("🔧 실패한 이미지들을 간소화된 프롬프트로 완성 중...")
    
    generator = OSMUImageGenerator()
    
    # Ghost Feature Image - 간소화된 프롬프트
    ghost_feature_prompt = """Create a professional digital divide visualization showing AI literacy gap. Split composition with high-tech AI elements (circuits, data streams) on one side in blue tones, traditional learning methods on other side in warm orange tones. Clean, modern design. Include "AI Literacy Gap" text in lower right corner."""
    
    result1 = generator.generate_single_image(
        ghost_feature_prompt, 
        1200, 630, 
        "assets/images/ai-literacy-gap/ghost/feature.png"
    )
    
    # Missing Ghost Content-2
    ghost_content2_prompt = """Create a bridge-building concept image showing various educational pathways connecting across a digital divide. Modern infographic style with clean geometric shapes, neutral colors with blue and orange accents. "AI Literacy Gap" in lower right."""
    
    result2 = generator.generate_single_image(
        ghost_content2_prompt, 
        800, 450, 
        "assets/images/ai-literacy-gap/ghost/content-2.png"
    )
    
    # Missing Naver Body images
    naver_body1_prompt = """Create a generational technology contrast image. Smooth, modern tech interfaces on left, fragmented, pixelated elements on right. Contemporary digital art style. "AI Literacy Gap" text included."""
    
    result3 = generator.generate_single_image(
        naver_body1_prompt, 
        800, 450, 
        "assets/images/ai-literacy-gap/naver/body-1.png"
    )
    
    naver_body2_prompt = """Create a learning curve visualization with spiral upward path, showing obstacles and breakthroughs in AI education. Modern infographic style. Include "AI Literacy Gap" text."""
    
    result4 = generator.generate_single_image(
        naver_body2_prompt, 
        800, 450, 
        "assets/images/ai-literacy-gap/naver/body-2.png"
    )
    
    naver_body3_prompt = """Create a network diffusion diagram showing AI knowledge spreading from center outward. Warm colors in center transitioning to cooler periphery. Modern network visualization style. "AI Literacy Gap" text."""
    
    result5 = generator.generate_single_image(
        naver_body3_prompt, 
        800, 450, 
        "assets/images/ai-literacy-gap/naver/body-3.png"
    )
    
    # Instagram Story
    instagram_story_prompt = """Create a vertical knowledge progression image for Instagram story format. Bottom to top gradient from deep purple to bright cyan, with ascending data visualization elements. Modern, clean design. "AI Literacy Gap" text positioned for vertical layout."""
    
    result6 = generator.generate_single_image(
        instagram_story_prompt, 
        1080, 1350, 
        "assets/images/ai-literacy-gap/instagram/story.png"
    )
    
    results = [result1, result2, result3, result4, result5, result6]
    success_count = sum(results)
    
    print(f"\n✅ 추가 이미지 생성 완료: {success_count}/6 성공")

if __name__ == "__main__":
    main()