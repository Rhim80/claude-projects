#!/usr/bin/env python3
"""
IMI WORK OSMU Image Generator
Ben Horowitz Fear Leadership Insights Article

전문적인 벤처캐피털 및 두려움 기반 리더십 컨텐츠를 위한
멀티플랫폼 최적화 이미지 패키지 생성기

Author: hovoo (이미커피)
Created: 2025-09-14
"""

import os
import json
import time
from datetime import datetime
from dotenv import load_dotenv
from google import genai
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
import requests
from pathlib import Path

# Load environment variables
load_dotenv()

class OSMUImageGenerator:
    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.slug = "ben-horowitz-fear-leadership-insights"
        self.title = "$46B가 증명한 진실: '두려움을 향해 달려가는' 것이 일을 잘하는 방법인 이유"
        self.base_path = Path(__file__).parent
        self.brand_colors = {
            "primary": "#1e3a8a",  # Navy
            "white": "#ffffff",
            "light_gray": "#f8fafc"
        }
        self.generation_log = []
        
    def log_progress(self, message):
        """진행 상황 로깅"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        log_entry = f"[{timestamp}] {message}"
        print(log_entry)
        self.generation_log.append(log_entry)
    
    def get_brand_prompt_elements(self):
        """IMI WORK 브랜드 가이드라인 프롬프트 요소"""
        return """
        Brand guidelines for IMI WORK:
        - Colors: Navy blue (#1e3a8a), white (#ffffff), light gray (#f8fafc)
        - Style: Professional, sophisticated, minimal, clean
        - Tone: Expert authority with approachable warmth
        - Values: ESSENTIAL, THOUGHTFUL, PRACTICAL
        - Target: Korean business professionals, entrepreneurs
        - Avoid: Generic stock photos, overly corporate feel
        - Include: Subtle 'SENSE & AI' blog identity markers
        """
    
    def generate_ghost_feature_image(self):
        """Ghost 블로그 피처 이미지 생성 (1200x630px)"""
        self.log_progress("🎨 Ghost 피처 이미지 생성 시작...")
        
        prompt = f"""
        Create a sophisticated feature image for a venture capital leadership article.
        
        Content: Ben Horowitz's $46B investment insights about fear-based leadership
        Size: 1200x630 pixels (Open Graph optimized)
        
        Visual concept:
        - Central focus: Abstract representation of "running towards fear"
        - Business elements: Boardroom, venture capital, strategic decisions
        - Symbolic: Arrow pointing towards challenging/dark area, transformation
        - Typography space: Left side reserved for potential text overlay
        
        {self.get_brand_prompt_elements()}
        
        Mood: Determined, strategic, professional courage
        Composition: Horizontal layout, left-weighted for text space
        Style: Modern business illustration, not photorealistic
        """
        
        return self._generate_image(prompt, "ghost/feature.png", (1200, 630))
    
    def generate_ghost_content_images(self):
        """Ghost 콘텐츠 이미지들 생성 (800x450px)"""
        content_images = [
            {
                "filename": "ghost/content-1.png",
                "concept": "Venture capital decision making process",
                "prompt": f"""
                Create a content image showing venture capital decision-making process.
                Size: 800x450 pixels
                
                Visual elements:
                - Data charts, investment portfolios, strategic analysis
                - Professional meeting environment
                - $46B scale representation (graphs, metrics)
                - Decision points and pathways
                
                {self.get_brand_prompt_elements()}
                
                Style: Clean infographic style, professional
                Mood: Analytical, strategic, data-driven
                """
            },
            {
                "filename": "ghost/content-2.png", 
                "concept": "Fear as strategic advantage",
                "prompt": f"""
                Create a content image representing fear as strategic advantage.
                Size: 800x450 pixels
                
                Visual concept:
                - Abstract representation of turning fear into opportunity
                - Mountain climbing, obstacle overcoming metaphors
                - Business growth arrows, transformation imagery
                - Professional courage visualization
                
                {self.get_brand_prompt_elements()}
                
                Style: Sophisticated business metaphor illustration
                Mood: Transformative, courageous, growth-oriented
                """
            }
        ]
        
        results = []
        for image_config in content_images:
            self.log_progress(f"🎨 Ghost 콘텐츠 이미지 생성: {image_config['concept']}")
            result = self._generate_image(
                image_config["prompt"], 
                image_config["filename"], 
                (800, 450)
            )
            results.append(result)
            
        return results
    
    def generate_naver_images(self):
        """네이버 블로그 이미지들 생성"""
        naver_images = [
            {
                "filename": "naver/main.png",
                "concept": "Ben Horowitz leadership main image",
                "prompt": f"""
                Create main image for Korean Naver blog about Ben Horowitz leadership.
                Size: 800x450 pixels
                
                Content focus:
                - Ben Horowitz venture capital expertise
                - Korean business context adaptation
                - Professional leadership principles
                - $46B proven track record emphasis
                
                {self.get_brand_prompt_elements()}
                
                Korean considerations:
                - Space for Korean text overlay
                - Business culture appropriate imagery
                - Professional hierarchy respect
                
                Style: Clean, authoritative, Korean business appropriate
                """
            },
            {
                "filename": "naver/body-1.png",
                "concept": "Fear-based decision making",
                "prompt": f"""
                Create supporting image for Korean business audience about fear-based decision making.
                Size: 800x450 pixels
                
                Visual elements:
                - CEO decision moment illustration
                - Risk assessment and management
                - Courage in business leadership
                - Strategic thinking under pressure
                
                {self.get_brand_prompt_elements()}
                
                Korean context: Professional business setting appropriate for Korean executives
                Style: Professional illustration, not intimidating
                """
            },
            {
                "filename": "naver/body-2.png", 
                "concept": "Venture capital success patterns",
                "prompt": f"""
                Create supporting image about venture capital success patterns.
                Size: 800x450 pixels
                
                Visual focus:
                - Investment success metrics
                - Pattern recognition in business
                - Long-term strategic thinking
                - Proven methodologies and frameworks
                
                {self.get_brand_prompt_elements()}
                
                Style: Data visualization style, professional charts and insights
                Mood: Analytical, proven, trustworthy
                """
            }
        ]
        
        results = []
        for image_config in naver_images:
            self.log_progress(f"🎨 네이버 이미지 생성: {image_config['concept']}")
            result = self._generate_image(
                image_config["prompt"], 
                image_config["filename"], 
                (800, 450)
            )
            results.append(result)
            
        return results
    
    def generate_instagram_images(self):
        """인스타그램 이미지들 생성"""
        instagram_images = [
            {
                "filename": "instagram/feed.png",
                "size": (1080, 1080),
                "concept": "Instagram feed post - Square format",
                "prompt": f"""
                Create Instagram feed post about Ben Horowitz leadership insights.
                Size: 1080x1080 pixels (square format)
                
                Mobile-optimized design:
                - Bold, attention-grabbing visual
                - Clear typography space for key message
                - $46B venture capital credibility
                - Fear → Success transformation theme
                
                {self.get_brand_prompt_elements()}
                
                Instagram considerations:
                - Mobile viewing optimized
                - Strong visual hierarchy
                - Social media appropriate tone
                - Thumb-stopping power
                
                Style: Modern, mobile-first, professional but approachable
                """
            },
            {
                "filename": "instagram/story.png",
                "size": (1080, 1350),
                "concept": "Instagram story - Vertical format", 
                "prompt": f"""
                Create Instagram story about venture capital leadership lessons.
                Size: 1080x1350 pixels (4:5 vertical format)
                
                Story-specific design:
                - Vertical composition
                - Upper and lower text zones
                - Engaging middle visual focus
                - Swipe-worthy content preview
                
                {self.get_brand_prompt_elements()}
                
                Story features:
                - Quick consumption design
                - Clear call-to-action space
                - Professional but social tone
                - Mobile-native experience
                
                Style: Vertical storytelling, professional social content
                """
            }
        ]
        
        results = []
        for image_config in instagram_images:
            self.log_progress(f"🎨 인스타그램 이미지 생성: {image_config['concept']}")
            result = self._generate_image(
                image_config["prompt"], 
                image_config["filename"], 
                image_config["size"]
            )
            results.append(result)
            
        return results
    
    def _generate_image(self, prompt, filename, size):
        """실제 이미지 생성 및 저장"""
        try:
            # Gemini API 모델들 시도
            models_to_try = [
                "gemini-2.5-flash-image-preview",
                "imagen-3.0-generate-001", 
                "imagegeneration-004"
            ]
            
            for model_name in models_to_try:
                try:
                    self.log_progress(f"🔄 {model_name}으로 시도 중...")
                    response = self.client.models.generate_content(
                        model=model_name,
                        contents=[prompt]
                    )
                    
                    # 이미지 추출 및 저장
                    for part in response.candidates[0].content.parts:
                        if part.inline_data is not None:
                            image = Image.open(BytesIO(part.inline_data.data))
                            
                            # 크기 조정 (필요한 경우)
                            if image.size != size:
                                image = image.resize(size, Image.Resampling.LANCZOS)
                            
                            # 파일 저장
                            save_path = self.base_path / filename
                            image.save(save_path, "PNG", optimize=True)
                            
                            self.log_progress(f"✅ 이미지 저장 완료: {filename} ({size[0]}x{size[1]})")
                            
                            return {
                                "success": True,
                                "filename": filename,
                                "size": size,
                                "model": model_name,
                                "file_size": os.path.getsize(save_path)
                            }
                            
                except Exception as e:
                    self.log_progress(f"❌ {model_name} 실패: {str(e)}")
                    continue
            
            self.log_progress(f"❌ 모든 모델 시도 실패: {filename}")
            return {"success": False, "filename": filename, "error": "모든 모델 실패"}
            
        except Exception as e:
            self.log_progress(f"❌ 전체 실패: {filename} - {str(e)}")
            return {"success": False, "filename": filename, "error": str(e)}
    
    def create_image_manifest(self, results):
        """이미지 매니페스트 JSON 파일 생성"""
        self.log_progress("📋 이미지 매니페스트 생성 중...")
        
        manifest = {
            "slug": self.slug,
            "title": self.title,
            "generated_at": datetime.now().isoformat(),
            "brand": "IMI WORK",
            "blog_identity": "SENSE & AI",
            "total_images": len([r for r in results if r.get("success", False)]),
            "generation_log": self.generation_log,
            "platforms": {
                "ghost": {
                    "feature": f"{self.base_path}/ghost/feature.png",
                    "content": [
                        f"{self.base_path}/ghost/content-1.png",
                        f"{self.base_path}/ghost/content-2.png"
                    ]
                },
                "naver": {
                    "main": f"{self.base_path}/naver/main.png",
                    "body": [
                        f"{self.base_path}/naver/body-1.png",
                        f"{self.base_path}/naver/body-2.png"
                    ]
                },
                "instagram": {
                    "feed": f"{self.base_path}/instagram/feed.png",
                    "story": f"{self.base_path}/instagram/story.png"
                }
            },
            "specifications": {
                "ghost_feature": "1200x630px (Open Graph optimized)",
                "ghost_content": "800x450px (16:9 readable)",
                "naver_main": "800x450px (Naver preferred)",
                "naver_body": "800x450px (up to 3 supporting)",
                "instagram_feed": "1080x1080px (square format)",
                "instagram_story": "1080x1350px (4:5 vertical)"
            },
            "brand_guidelines": {
                "colors": self.brand_colors,
                "values": ["ESSENTIAL", "THOUGHTFUL", "PRACTICAL"],
                "target": "Korean business professionals, entrepreneurs",
                "tone": "Professional yet approachable expertise"
            },
            "content_themes": [
                "Ben Horowitz venture capital insights",
                "Fear-based leadership and decision making", 
                "Business failure patterns from $46B experience",
                "Strategic courage in entrepreneurship",
                "IMI WORK brand values integration"
            ],
            "generation_results": results
        }
        
        manifest_path = self.base_path / "image-manifest.json"
        with open(manifest_path, 'w', encoding='utf-8') as f:
            json.dump(manifest, f, ensure_ascii=False, indent=2)
        
        self.log_progress(f"📋 매니페스트 저장 완료: image-manifest.json")
        return manifest
    
    def generate_complete_osmu_package(self):
        """전체 OSMU 이미지 패키지 생성"""
        start_time = time.time()
        self.log_progress("🚀 IMI WORK OSMU 이미지 패키지 생성 시작")
        self.log_progress(f"📝 컨텐츠: {self.title}")
        
        all_results = []
        
        # Ghost 이미지들 생성
        self.log_progress("👻 Ghost 블로그 이미지 생성 시작...")
        ghost_feature = self.generate_ghost_feature_image()
        ghost_content = self.generate_ghost_content_images()
        all_results.extend([ghost_feature] + ghost_content)
        
        # Naver 이미지들 생성  
        self.log_progress("🟢 네이버 블로그 이미지 생성 시작...")
        naver_results = self.generate_naver_images()
        all_results.extend(naver_results)
        
        # Instagram 이미지들 생성
        self.log_progress("📷 인스타그램 이미지 생성 시작...")
        instagram_results = self.generate_instagram_images()
        all_results.extend(instagram_results)
        
        # 매니페스트 생성
        manifest = self.create_image_manifest(all_results)
        
        # 최종 리포트
        end_time = time.time()
        generation_time = end_time - start_time
        successful_images = len([r for r in all_results if r.get("success", False)])
        
        self.log_progress("="*60)
        self.log_progress("🎉 OSMU 이미지 패키지 생성 완료!")
        self.log_progress(f"📊 성공한 이미지: {successful_images}/{len(all_results)}")
        self.log_progress(f"⏱️ 총 생성 시간: {generation_time:.1f}초")
        self.log_progress(f"📁 저장 위치: {self.base_path}")
        self.log_progress("="*60)
        
        return {
            "success": successful_images > 0,
            "total_images": len(all_results),
            "successful_images": successful_images,
            "generation_time": generation_time,
            "manifest": manifest,
            "results": all_results
        }

def main():
    """메인 실행 함수"""
    generator = OSMUImageGenerator()
    result = generator.generate_complete_osmu_package()
    
    if result["success"]:
        print(f"\n🎉 OSMU 이미지 패키지 생성 성공!")
        print(f"📊 {result['successful_images']}/{result['total_images']} 이미지 생성 완료")
    else:
        print(f"\n💥 이미지 생성 실패")
        
    return result

if __name__ == "__main__":
    main()