#!/usr/bin/env python3
"""
OSMU Art Meta Generator
새로운 메타프롬프트 방식: 갤러리급 예술적 해석
AI 문해력 격차 콘텐츠 테스트 버전

작성자: osmu-image-generator (Claude Code)
프로젝트: imi-work-osmu
"""

import os
import json
import requests
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Tuple
import logging

# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class ArtMetaPromptGenerator:
    """갤러리급 예술적 메타프롬프트 생성기"""
    
    def __init__(self):
        self.art_theories = {
            'chiaroscuro': "키아로스쿠로 명암법으로 극적 대비 표현",
            'bauhaus': "바우하우스 기하학적 추상화와 기능주의 미학",
            'kandinsky': "칸딘스키 색채 감정 이론과 추상 표현",
            'mondrian': "몬드리안 구성주의적 균형과 순수 추상",
            'postmodern': "포스트모던 해체주의와 분화 표현"
        }
        
        self.color_theories = {
            'complementary': "보색 대비로 긴장과 조화 표현",
            'analogous': "유사색 조화로 연속성과 흐름 표현",
            'triadic': "삼원색 균형으로 역동적 안정감 표현",
            'monochromatic': "단색조 변화로 깊이와 층차 표현"
        }
        
        self.composition_rules = {
            'rule_of_thirds': "삼분할법으로 시각적 안정감 확보",
            'golden_ratio': "황금비율로 완벽한 균형미 추구",
            'dynamic_symmetry': "역동적 대칭으로 움직임과 안정감 조화",
            'fibonacci_spiral': "피보나치 나선으로 자연스러운 시선 유도"
        }

    def generate_meta_prompts(self, content_data: Dict) -> Dict[str, str]:
        """6개 플랫폼별 예술적 메타프롬프트 생성"""
        
        base_concept = self._extract_artistic_concept(content_data)
        
        meta_prompts = {
            'ghost_feature': self._create_ghost_feature_prompt(base_concept),
            'ghost_content': self._create_ghost_content_prompt(base_concept),
            'naver_main': self._create_naver_main_prompt(base_concept),
            'naver_body': self._create_naver_body_prompt(base_concept),
            'instagram_feed': self._create_instagram_feed_prompt(base_concept),
            'instagram_story': self._create_instagram_story_prompt(base_concept)
        }
        
        return meta_prompts
    
    def _extract_artistic_concept(self, content_data: Dict) -> Dict:
        """콘텐츠에서 예술적 개념 추출"""
        
        # AI 문해력 격차의 핵심 개념들
        core_concepts = {
            'digital_divide': '디지털 디바이드의 계층적 분화',
            'knowledge_gap': '지식 격차의 시각적 표현',
            'accessibility': 'AI 접근성의 불균형한 분포',
            'transformation': '개인적 변화와 사회적 변화의 대비'
        }
        
        # 시각적 메타포
        visual_metaphors = {
            'light_shadow': '빛과 그림자의 극적 대비',
            'staircase': '계단식 구조로 격차 표현',
            'bridge_gap': '연결과 단절의 이중성',
            'spectrum': '연속적 스펙트럼과 불연속적 경계'
        }
        
        return {
            'core_concepts': core_concepts,
            'visual_metaphors': visual_metaphors,
            'emotional_tone': 'contemplative_urgency',  # 사색적 긴급감
            'color_palette': 'unrestricted_artistic',  # 브랜드 색상 제약 해제
            'title_eng': 'AI Literacy Gap'
        }
    
    def _create_ghost_feature_prompt(self, concept: Dict) -> str:
        """Ghost 블로그 Feature 이미지 메타프롬프트 (1200x630px)"""
        
        return f"""
        **ARTISTIC VISION**: 
        Create a gallery-quality digital artwork that embodies the philosophical tension of AI literacy divide through {self.art_theories['chiaroscuro']} and {self.art_theories['bauhaus']}.
        
        **CONCEPTUAL FRAMEWORK**:
        - {concept['visual_metaphors']['light_shadow']} representing knowledge illumination vs ignorance
        - {concept['visual_metaphors']['staircase']} suggesting hierarchical access to AI capabilities  
        - Philosophical depth: contemplative urgency about technological transformation
        
        **COMPOSITIONAL STRUCTURE**:
        - {self.composition_rules['golden_ratio']} for panoramic visual harmony
        - Horizontal 1200x630px format optimized for impactful feature display
        - Left-weighted composition with breathing space for text overlay
        
        **COLOR THEORY APPLICATION**:
        - {self.color_theories['complementary']} creating visual tension and resolution
        - Unrestricted palette: deep blues, warm oranges, pure whites, technological grays
        - Gradient transitions suggesting continuous spectrum of digital literacy
        
        **ARTISTIC TECHNIQUES**:
        - Kandinsky-inspired abstract forms representing AI neural networks
        - Mondrian-style geometric divisions showing digital stratification
        - Soft focus backgrounds with sharp geometric foregrounds
        - Professional gallery lighting with dramatic shadows
        
        **TYPOGRAPHY INTEGRATION**:
        - "AI Literacy Gap" in minimal sans-serif, bottom-right corner
        - Subtle transparency (70% opacity) maintaining artistic integrity
        - Perfect typographic hierarchy respecting visual composition
        
        **TECHNICAL SPECIFICATIONS**:
        - 1200x630 pixels, 72 DPI, sRGB color profile
        - PNG format with optimized compression
        - Web-optimized for social media sharing
        - Professional photography lighting setup
        """
    
    def _create_ghost_content_prompt(self, concept: Dict) -> str:
        """Ghost 블로그 Content 이미지 메타프롬프트 (800x450px)"""
        
        return f"""
        **ARTISTIC VISION**: 
        Intimate gallery piece focusing on microscopic details of digital transformation through {self.art_theories['kandinsky']} emotional color theory.
        
        **CONCEPTUAL FRAMEWORK**:
        - {concept['visual_metaphors']['bridge_gap']} as central metaphor
        - Individual journey from analog to digital consciousness
        - Abstract representation of cognitive transformation
        
        **COMPOSITIONAL STRUCTURE**:
        - {self.composition_rules['rule_of_thirds']} for reading-optimized balance
        - 16:9 aspect ratio (800x450px) for content integration
        - Central focus with symmetrical supporting elements
        
        **COLOR THEORY APPLICATION**:
        - {self.color_theories['analogous']} creating emotional continuity
        - Warm-to-cool temperature gradient suggesting progression
        - Subtle color vibration creating depth without distraction
        
        **ARTISTIC TECHNIQUES**:
        - Close-up abstract details of larger digital landscape
        - Texture-rich surfaces suggesting tactile vs digital experience
        - Soft geometric forms with organic transitions
        - Museum-quality lighting with subtle gradients
        
        **TYPOGRAPHY INTEGRATION**:
        - "AI Literacy Gap" minimally integrated, lower right
        - 60% opacity respecting content context
        - Harmonious with article text flow
        
        **TECHNICAL SPECIFICATIONS**:
        - 800x450 pixels optimized for content readability
        - Balanced file size for fast loading
        - High contrast ratios for accessibility
        """
    
    def _create_naver_main_prompt(self, concept: Dict) -> str:
        """Naver 블로그 Main 이미지 메타프롬프트 (800x450px)"""
        
        return f"""
        **ARTISTIC VISION**: 
        Contemporary Korean interpretation of digital divide through {self.art_theories['mondrian']} compositional balance with East Asian aesthetic sensibility.
        
        **CULTURAL INTEGRATION**:
        - Korean business culture context: respectful professionalism
        - East-West artistic fusion: geometric abstraction with organic flow
        - Local relevance: corporate hierarchy meets technological democratization
        
        **CONCEPTUAL FRAMEWORK**:
        - {concept['visual_metaphors']['spectrum']} showing continuous learning journey
        - Traditional Korean spatial concepts (여백, negative space) with modern AI imagery
        - Cultural bridge between traditional business and AI transformation
        
        **COMPOSITIONAL STRUCTURE**:
        - {self.composition_rules['dynamic_symmetry']} respecting Korean aesthetic principles
        - Horizontal balance suitable for Naver platform display
        - Clear focal hierarchy for blog thumbnail optimization
        
        **COLOR THEORY APPLICATION**:
        - {self.color_theories['triadic']} with Korean color sensibility
        - Refined palette: deep navy, warm gray, accent orange
        - Cultural appropriateness: professional yet approachable tones
        
        **ARTISTIC TECHNIQUES**:
        - Clean minimalism with sophisticated detail layers
        - Professional business aesthetic with artistic elevation
        - Korean traditional space concepts in modern digital interpretation
        
        **TYPOGRAPHY INTEGRATION**:
        - "AI Literacy Gap" with Korean context consideration
        - Cultural sensitivity in placement and styling
        - Harmonious with Korean visual communication standards
        
        **TECHNICAL SPECIFICATIONS**:
        - 800x450 pixels optimized for Naver blog display
        - Local user behavior consideration: mobile-first approach
        - Fast loading optimized for Korean internet infrastructure
        """
    
    def _create_naver_body_prompt(self, concept: Dict) -> str:
        """Naver 블로그 Body 이미지 메타프롬프트 (800x450px)"""
        
        return f"""
        **ARTISTIC VISION**: 
        Educational narrative visualization combining {self.art_theories['postmodern']} deconstruction with clear storytelling elements.
        
        **NARRATIVE STRUCTURE**:
        - Sequential visual storytelling showing transformation stages
        - Educational infographic elevated to artistic expression
        - Step-by-step journey from AI unawareness to literacy
        
        **CONCEPTUAL FRAMEWORK**:
        - {concept['visual_metaphors']['staircase']} as educational progression
        - Knowledge building blocks as abstract sculptural forms
        - Personal transformation journey with universal appeal
        
        **COMPOSITIONAL STRUCTURE**:
        - {self.composition_rules['fibonacci_spiral']} guiding narrative flow
        - Left-to-right reading pattern optimized for Korean audience
        - Clear information hierarchy with artistic sophistication
        
        **COLOR THEORY APPLICATION**:
        - {self.color_theories['monochromatic']} with educational clarity
        - Progressive color intensity matching learning stages
        - High contrast for educational accessibility
        
        **ARTISTIC TECHNIQUES**:
        - Diagrammatic elements elevated to abstract art
        - Clean lines with sophisticated artistic details
        - Balance between information design and fine art
        
        **TYPOGRAPHY INTEGRATION**:
        - "AI Literacy Gap" supporting educational narrative
        - Clear, accessible placement for learning context
        
        **TECHNICAL SPECIFICATIONS**:
        - 800x450 pixels optimized for body content
        - Educational accessibility standards
        - Clear visibility on mobile devices
        """
    
    def _create_instagram_feed_prompt(self, concept: Dict) -> str:
        """Instagram Feed 이미지 메타프롬프트 (1080x1080px)"""
        
        return f"""
        **ARTISTIC VISION**: 
        Perfect square composition embodying {self.art_theories['bauhaus']} minimalism with maximum visual impact for social media engagement.
        
        **SOCIAL MEDIA OPTIMIZATION**:
        - Instant visual recognition in feed scroll
        - Thumb-stopping power with artistic sophistication
        - Perfect square balance: stability with dynamic energy
        
        **CONCEPTUAL FRAMEWORK**:
        - {concept['visual_metaphors']['bridge_gap']} as central focal point
        - Single powerful message: AI literacy transformation
        - Minimalist approach with maximum emotional impact
        
        **COMPOSITIONAL STRUCTURE**:
        - {self.composition_rules['golden_ratio']} in perfect square format
        - Central composition with balanced negative space
        - Instagram algorithm optimization: high engagement prediction
        
        **COLOR THEORY APPLICATION**:
        - {self.color_theories['complementary']} for maximum visual pop
        - High saturation contrast for mobile screen optimization
        - Brand-unrestricted artistic freedom with social media impact
        
        **ARTISTIC TECHNIQUES**:
        - Gallery-quality minimalism meets social media effectiveness
        - Single strong visual statement
        - Professional photography aesthetic with artistic abstraction
        
        **TYPOGRAPHY INTEGRATION**:
        - "AI Literacy Gap" perfectly balanced within square format
        - Mobile-optimized readability at all sizes
        - Artistic integration without overwhelming visual impact
        
        **TECHNICAL SPECIFICATIONS**:
        - 1080x1080 pixels, Instagram-optimized quality
        - Mobile screen optimization: clear at all sizes
        - High engagement prediction through visual psychology
        """
    
    def _create_instagram_story_prompt(self, concept: Dict) -> str:
        """Instagram Story 이미지 메타프롬프트 (1080x1350px)"""
        
        return f"""
        **ARTISTIC VISION**: 
        Vertical dynamic composition utilizing {self.art_theories['kandinsky']} vertical energy flow with mobile-first artistic approach.
        
        **MOBILE-FIRST DESIGN**:
        - Vertical 4:5 format optimized for handheld viewing
        - Scroll-friendly composition with upward visual movement
        - Thumb-friendly interaction consideration
        
        **CONCEPTUAL FRAMEWORK**:
        - {concept['visual_metaphors']['light_shadow']} in vertical gradient
        - Upward progression suggesting personal growth and learning
        - Mobile intimacy: personal transformation story
        
        **COMPOSITIONAL STRUCTURE**:
        - {self.composition_rules['dynamic_symmetry']} in vertical format
        - Top-to-bottom narrative flow
        - Story format optimization: beginning, middle, resolution
        
        **COLOR THEORY APPLICATION**:
        - {self.color_theories['analogous']} creating vertical flow harmony
        - Mobile screen optimization: clear contrast ratios
        - Artistic freedom with technical mobile constraints
        
        **ARTISTIC TECHNIQUES**:
        - Vertical energy: upward movement and progression
        - Mobile-intimate scale: personal connection focus
        - Quick visual communication with lasting artistic impression
        
        **TYPOGRAPHY INTEGRATION**:
        - "AI Literacy Gap" positioned for vertical reading flow
        - Story format consideration: not competing with UI elements
        - Mobile typography optimization
        
        **TECHNICAL SPECIFICATIONS**:
        - 1080x1350 pixels for Instagram Story optimization
        - Vertical mobile viewing optimization
        - Quick loading with high visual impact
        - Story UI element consideration in composition
        """

class GeminiImageGenerator:
    """Gemini AI 이미지 생성 인터페이스"""
    
    def __init__(self):
        # 환경변수에서 API 키 로드 (실제 구현에서는 환경변수 사용)
        self.api_key = os.getenv('GEMINI_API_KEY')
        self.api_url = "https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:generateImage"
        
        if not self.api_key:
            logger.warning("GEMINI_API_KEY not found. Will run in simulation mode.")
            self.simulation_mode = True
        else:
            self.simulation_mode = False
    
    def generate_image(self, prompt: str, platform: str, size: Tuple[int, int]) -> Dict:
        """이미지 생성 (실제 또는 시뮬레이션)"""
        
        if self.simulation_mode:
            return self._simulate_generation(prompt, platform, size)
        else:
            return self._actual_generation(prompt, platform, size)
    
    def _simulate_generation(self, prompt: str, platform: str, size: Tuple[int, int]) -> Dict:
        """시뮬레이션 모드 - API 키 없이 테스트"""
        
        logger.info(f"SIMULATION: Generating {platform} image ({size[0]}x{size[1]}px)")
        logger.info(f"Prompt preview: {prompt[:200]}...")
        
        # 시뮬레이션 응답
        return {
            'success': True,
            'image_url': f'https://example.com/simulated-{platform}.png',
            'file_size': f'{size[0] * size[1] * 3 // 1024}KB (estimated)',
            'generation_time': 3.5,
            'platform': platform,
            'dimensions': f"{size[0]}x{size[1]}",
            'prompt_length': len(prompt)
        }
    
    def _actual_generation(self, prompt: str, platform: str, size: Tuple[int, int]) -> Dict:
        """실제 Gemini API 호출"""
        
        headers = {
            'Content-Type': 'application/json',
            'x-goog-api-key': self.api_key
        }
        
        payload = {
            'prompt': {
                'text': prompt
            },
            'safetySettings': [
                {
                    'category': 'HARM_CATEGORY_HATE_SPEECH',
                    'threshold': 'BLOCK_ONLY_HIGH'
                }
            ],
            'generationConfig': {
                'aspectRatio': f"{size[0]}:{size[1]}",
                'negativePrompt': 'low quality, blurry, distorted, generic stock photo'
            }
        }
        
        try:
            start_time = time.time()
            response = requests.post(f"{self.api_url}?key={self.api_key}", 
                                   headers=headers, 
                                   json=payload, 
                                   timeout=60)
            
            generation_time = time.time() - start_time
            
            if response.status_code == 200:
                return {
                    'success': True,
                    'response_data': response.json(),
                    'generation_time': generation_time,
                    'platform': platform,
                    'dimensions': f"{size[0]}x{size[1]}"
                }
            else:
                return {
                    'success': False,
                    'error': f"API Error: {response.status_code}",
                    'platform': platform
                }
                
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'platform': platform
            }

class OSMUArtGenerator:
    """OSMU 아트 생성기 메인 클래스"""
    
    def __init__(self, slug: str = "ai-literacy-gap-art"):
        self.slug = slug
        self.base_dir = Path("/Users/rhim/Projects/imi-work-osmu/assets/images")
        self.output_dir = self.base_dir / slug
        
        self.meta_generator = ArtMetaPromptGenerator()
        self.image_generator = GeminiImageGenerator()
        
        self.platforms = {
            'ghost_feature': (1200, 630, 'ghost/feature.png'),
            'ghost_content': (800, 450, 'ghost/content-1.png'),
            'naver_main': (800, 450, 'naver/main.png'),
            'naver_body': (800, 450, 'naver/body-1.png'),
            'instagram_feed': (1080, 1080, 'instagram/feed.png'),
            'instagram_story': (1080, 1350, 'instagram/story.png')
        }
        
        self.results = {
            'generation_start': datetime.now().isoformat(),
            'slug': slug,
            'total_images': len(self.platforms),
            'platforms': list(self.platforms.keys()),
            'meta_prompts': {},
            'generation_results': {},
            'statistics': {}
        }
    
    def setup_directories(self):
        """디렉토리 구조 생성"""
        
        directories = [
            self.output_dir,
            self.output_dir / 'ghost',
            self.output_dir / 'naver', 
            self.output_dir / 'instagram'
        ]
        
        for directory in directories:
            directory.mkdir(parents=True, exist_ok=True)
            logger.info(f"Directory ready: {directory}")
    
    def generate_art_package(self):
        """완전한 아트 패키지 생성"""
        
        logger.info(f"🎨 Starting OSMU Art Generation: {self.slug}")
        
        # 1. 디렉토리 설정
        self.setup_directories()
        
        # 2. 콘텐츠 데이터 준비
        content_data = {
            'title': 'AI 문해력 격차가 만드는 새로운 디지털 디바이드',
            'english_title': 'AI Literacy Gap',
            'key_concepts': ['digital_divide', 'education_inequality', 'ai_accessibility'],
            'tone': 'contemplative_urgent'
        }
        
        # 3. 메타프롬프트 생성
        logger.info("🧠 Generating artistic meta-prompts...")
        meta_prompts = self.meta_generator.generate_meta_prompts(content_data)
        self.results['meta_prompts'] = meta_prompts
        
        # 4. 이미지 생성
        logger.info("🖼️ Generating gallery-quality images...")
        generation_results = {}
        
        for platform, (width, height, file_path) in self.platforms.items():
            logger.info(f"   • Processing {platform} ({width}x{height}px)")
            
            prompt = meta_prompts[platform]
            result = self.image_generator.generate_image(
                prompt=prompt, 
                platform=platform, 
                size=(width, height)
            )
            
            generation_results[platform] = result
            
            # 결과 로깅
            if result['success']:
                logger.info(f"     ✓ Generated successfully")
            else:
                logger.error(f"     ✗ Generation failed: {result.get('error', 'Unknown error')}")
        
        self.results['generation_results'] = generation_results
        
        # 5. 통계 계산
        self._calculate_statistics()
        
        # 6. Manifest 파일 생성
        self._create_manifest()
        
        # 7. 리포트 생성
        self._create_generation_report()
        
        logger.info(f"🎯 OSMU Art Generation Complete: {self.slug}")
        
        return self.results
    
    def _calculate_statistics(self):
        """생성 통계 계산"""
        
        successful = sum(1 for r in self.results['generation_results'].values() if r['success'])
        failed = len(self.platforms) - successful
        
        total_prompt_length = sum(len(p) for p in self.results['meta_prompts'].values())
        avg_prompt_length = total_prompt_length / len(self.results['meta_prompts'])
        
        self.results['statistics'] = {
            'successful_generations': successful,
            'failed_generations': failed,
            'success_rate': f"{(successful/len(self.platforms))*100:.1f}%",
            'total_prompt_length': total_prompt_length,
            'average_prompt_length': int(avg_prompt_length),
            'generation_method': 'artistic_meta_prompts',
            'art_theories_used': list(self.meta_generator.art_theories.keys()),
            'color_theories_used': list(self.meta_generator.color_theories.keys())
        }
    
    def _create_manifest(self):
        """이미지 매니페스트 파일 생성"""
        
        manifest = {
            'slug': self.slug,
            'title': 'AI 문해력 격차가 만드는 새로운 디지털 디바이드',
            'english_title': 'AI Literacy Gap',
            'generation_timestamp': self.results['generation_start'],
            'generation_method': 'artistic_meta_prompts_v1',
            'brand_approach': 'unrestricted_artistic_interpretation',
            'platforms': {},
            'statistics': self.results['statistics'],
            'meta_prompts_summary': {
                platform: {
                    'length': len(prompt),
                    'art_theory': 'mixed_gallery_approach',
                    'color_theory': 'unrestricted_palette'
                }
                for platform, prompt in self.results['meta_prompts'].items()
            }
        }
        
        # 플랫폼별 정보
        for platform, (width, height, file_path) in self.platforms.items():
            result = self.results['generation_results'][platform]
            
            manifest['platforms'][platform] = {
                'file_path': f"{self.slug}/{file_path}",
                'dimensions': f"{width}x{height}",
                'aspect_ratio': f"{width}:{height}",
                'success': result['success'],
                'file_size': result.get('file_size', 'N/A'),
                'generation_time': result.get('generation_time', 'N/A')
            }
        
        # 매니페스트 파일 저장
        manifest_path = self.output_dir / 'image-manifest.json'
        with open(manifest_path, 'w', encoding='utf-8') as f:
            json.dump(manifest, f, indent=2, ensure_ascii=False)
        
        logger.info(f"📋 Manifest created: {manifest_path}")
    
    def _create_generation_report(self):
        """생성 리포트 작성"""
        
        stats = self.results['statistics']
        
        report_content = f"""# OSMU Art Generation Report
## {self.results['slug']}

**Generation Method**: Artistic Meta-Prompts v1.0
**Timestamp**: {self.results['generation_start']}
**Approach**: Gallery-quality artistic interpretation with unrestricted color palette

## Results Summary

- **Total Images**: {self.results['total_images']}
- **Successful**: {stats['successful_generations']}
- **Failed**: {stats['failed_generations']}
- **Success Rate**: {stats['success_rate']}

## Artistic Approach

### Art Theories Applied
{chr(10).join(f"- {theory}: {desc}" for theory, desc in self.meta_generator.art_theories.items())}

### Color Theories Applied  
{chr(10).join(f"- {theory}: {desc}" for theory, desc in self.meta_generator.color_theories.items())}

### Composition Rules Applied
{chr(10).join(f"- {rule}: {desc}" for rule, desc in self.meta_generator.composition_rules.items())}

## Meta-Prompt Statistics

- **Total Prompt Length**: {stats['total_prompt_length']:,} characters
- **Average Prompt Length**: {stats['average_prompt_length']:,} characters per platform
- **Approach**: Unrestricted artistic interpretation beyond brand guidelines

## Platform-Specific Results

"""
        
        for platform, result in self.results['generation_results'].items():
            width, height, file_path = self.platforms[platform]
            status = "✅ Success" if result['success'] else "❌ Failed"
            
            report_content += f"""
### {platform.replace('_', ' ').title()}
- **Status**: {status}
- **Dimensions**: {width}x{height}px
- **File**: {file_path}
- **Generation Time**: {result.get('generation_time', 'N/A')}s
- **File Size**: {result.get('file_size', 'N/A')}
"""
            
            if not result['success']:
                report_content += f"- **Error**: {result.get('error', 'Unknown error')}\n"

        report_content += f"""

## Next Steps

1. **Review Generated Images**: Check artistic quality and brand alignment
2. **Test Across Platforms**: Verify display quality on Ghost, Naver, Instagram
3. **Gather Feedback**: Assess artistic approach effectiveness
4. **Iterate Meta-Prompts**: Refine based on results and feedback

## Notes

This generation used the new artistic meta-prompt approach, emphasizing gallery-quality visual design over strict brand compliance. The "AI Literacy Gap" English title was integrated minimally in the bottom-right corner of each composition.

**Generated by**: osmu-image-generator (Claude Code)  
**Project**: imi-work-osmu  
**Version**: Artistic Meta-Prompts v1.0
"""

        # 리포트 파일 저장
        report_path = self.output_dir / 'generation-report.md'
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(report_content)
        
        logger.info(f"📊 Generation report created: {report_path}")

def main():
    """메인 실행 함수"""
    
    print("🎨 OSMU Art Meta-Prompt Generator")
    print("=" * 50)
    print("새로운 방식: 갤러리급 예술적 해석")
    print("테스트 콘텐츠: AI 문해력 격차")
    print("=" * 50)
    
    # OSMU 아트 생성기 초기화
    generator = OSMUArtGenerator("ai-literacy-gap-art")
    
    try:
        # 아트 패키지 생성
        results = generator.generate_art_package()
        
        print(f"\n🎯 Generation Complete!")
        print(f"📁 Output Directory: {generator.output_dir}")
        print(f"📊 Success Rate: {results['statistics']['success_rate']}")
        print(f"🎨 Art Theories Used: {len(results['statistics']['art_theories_used'])}")
        print(f"🌈 Color Theories Used: {len(results['statistics']['color_theories_used'])}")
        
        # 결과 요약
        successful = results['statistics']['successful_generations']
        total = results['total_images']
        
        if successful == total:
            print(f"\n✅ All {total} images generated successfully!")
        elif successful > 0:
            print(f"\n⚠️  {successful}/{total} images generated successfully")
        else:
            print(f"\n❌ Generation failed for all images")
        
        print(f"\n📋 Check the manifest: {generator.output_dir}/image-manifest.json")
        print(f"📊 Check the report: {generator.output_dir}/generation-report.md")
        
    except Exception as e:
        logger.error(f"Generation failed: {str(e)}")
        print(f"\n❌ Generation failed: {str(e)}")
        return False
    
    return True

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)