#!/usr/bin/env python3
"""
갤러리급 메타프롬프트 방식 AI 문해력 격차 이미지 생성
"""
import sys
import os
sys.path.append('/Users/rhim/Projects/imi-work-osmu/scripts')

# Import directly from the script file
import importlib.util
spec = importlib.util.spec_from_file_location("gemini_image_generator", "/Users/rhim/Projects/imi-work-osmu/scripts/gemini-image-generator.py")
gemini_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gemini_module)
OSMUImageGenerator = gemini_module.OSMUImageGenerator

# 새로운 갤러리급 메타프롬프트 정의
gallery_metaprompts = {
    'ghost': {
        'feature': '''Create a gallery-worthy digital art piece titled "Digital Chasm" inspired by Caspar David Friedrich's romantic sublime aesthetics merged with contemporary minimalism. 

Visual concept: A profound digital canyon dividing two worlds - one side radiating with luminous AI technology (neural networks, data streams, glowing nodes) in cool teal and electric blue tones, the other side shrouded in shadow with analog textures and warm golden accents suggesting traditional knowledge systems. The composition employs horizontal division but includes subtle connecting elements - bridges of light or data streams - hinting at possibility for bridging the gap.

Technical execution: Apply Chiaroscuro lighting techniques with dramatic contrast between illuminated AI realm and shadowed analog world. Use binary composition with sophisticated color temperature contrast (cool vs warm). Include sublime aesthetic elements that evoke both wonder and melancholy about technological progress.

Typography: Place "AI Literacy Gap" in elegant serif font, minimally sized, positioned in lower right corner in muted tone that doesn't compete with the dramatic composition.

Quality: Museum-quality digital art, gallery exhibition standard, professional fine art composition. Resolution: 1200x630 pixels.''',
        
        'content-1': '''Create "The Enlightened vs The Excluded" - a sophisticated digital composition inspired by Georges de La Tour's candlelit paintings merged with modern infographic design principles.

Visual concept: Dramatic tenebrism composition showing figures illuminated by golden AI knowledge on the left side (people surrounded by glowing data, algorithms, neural patterns in warm golden light) contrasting with silhouetted figures in deep blue shadows on the right representing those excluded from AI literacy. Use diagonal composition to create dynamic visual flow.

Technical execution: Employ La Tour's signature luminosity hierarchy with AI knowledge as the light source. Apply asymmetrical balance with weighted composition favoring the illuminated side. Use sophisticated golden ratio proportions. Color palette: rich golden illumination against deep cobalt shadows.

Typography: "AI Literacy Gap" positioned in lower right, architectural precision typography, minimal integration.

Artistic influence: Tenebrism master techniques, contemporary data visualization aesthetics. Gallery-worthy execution standard. Resolution: 800x450 pixels.''',

        'content-2': '''Create "Bridging the Divide" - a sophisticated composition inspired by Bauhaus functionality merged with Japanese Zen minimalism.

Visual concept: Various forms of bridges spanning across a technological gap - some geometric and rigid representing formal education systems, others flowing and organic representing innovative learning approaches. Show connection possibilities while maintaining the tension of the divide.

Technical execution: Apply Bauhaus modular design principles with Zen negative space utilization. Use neutral gray palette with strategic accent colors highlighting connection points. Balance grid-based geometry with organic curves. Apply Gestalt principles of visual grouping.

Typography: "AI Literacy Gap" in architectural precision, minimally integrated.

Design philosophy: Functional beauty meets contemplative simplicity. Museum-quality composition. Resolution: 800x450 pixels.'''
    },
    'naver': {
        'main': '''Create "Knowledge Stratification" - a sophisticated abstract composition inspired by Piet Mondrian's geometric abstraction merged with contemporary data visualization design.

Visual concept: Modular composition featuring stepped, architectural blocks arranged in ascending hierarchy. Lower levels show traditional learning methods in monochromatic gray, middle tiers introduce selective neon blue accents representing basic digital literacy, highest tier blazes with electric orange AI mastery symbols. Perfect balance of vertical hierarchy and horizontal expansion.

Technical execution: Apply Mondrian's modular composition principles with chromatic restraint - primarily monochromatic gray scale punctuated by strategic neon blue and electric orange accents. Use hierarchical visualization principles from modern data science. Clean geometric forms with subtle texture differentiation.

Typography: "AI Literacy Gap" in lower right corner, minimal sans-serif integration.

Design philosophy: Bauhaus functionality meets Korean digital aesthetics. Museum-quality geometric abstraction. Resolution: 800x450 pixels.''',
        
        'body-1': '''Create "Digital Natives vs Digital Immigrants" inspired by David Hockney's pool paintings merged with digital glitch art aesthetics.

Visual concept: Generational dichotomy showing smooth, flowing organic forms (representing digital natives' intuitive relationship with technology) contrasting with angular, pixelated, glitch-art forms (representing digital immigrants' fragmented understanding). Use Hockney's characteristic bright, saturated color palette with digital distortion effects.

Technical execution: Organic vs synthetic forms, fluid curves vs harsh pixels, chromatic saturation vs digital fragmentation. Apply Hockney's pool-like reflective surfaces merged with contemporary glitch aesthetics.

Typography: "AI Literacy Gap" minimally placed, lower right positioning. Resolution: 800x450 pixels.''',

        'body-2': '''Create "The Learning Curve" inspired by M.C. Escher's optical illusions merged with modern infographic design.

Visual concept: Spiral dynamics showing the journey of AI learning with obstacles and breakthroughs. Use Escher's impossible geometry to represent the cognitive challenges of understanding AI concepts. Show ascending spiral structure with periodic barriers that learners must overcome.

Technical execution: Apply Escher's mathematical precision with contemporary data visualization principles. Use perspective tricks and optical illusions to represent cognitive load. Monochromatic approach with selective color highlighting key learning moments.

Typography: "AI Literacy Gap" integrated into the spiral design. Resolution: 800x450 pixels.''',

        'body-3': '''Create "Democratizing AI" inspired by Mark Rothko's color field paintings merged with network diagram aesthetics.

Visual concept: Radial diffusion pattern emanating from central source, representing the spread of AI knowledge from concentrated expertise to general population. Use Rothko's signature color bleeding effects with network topology visualization.

Technical execution: Apply Rothko's color field techniques with soft edge transitions merged with technical network diagrams. Warm color center (representing concentrated AI knowledge) radiating to cooler periphery (representing broader population). Show egalitarian network topology.

Typography: "AI Literacy Gap" positioned to complement radial flow. Resolution: 800x450 pixels.'''
    },
    'instagram': {
        'feed': '''Create "The Great Divide" - a gallery-worthy pop art composition inspired by Andy Warhol's aesthetic merged with minimal conceptual art principles.

Visual concept: Perfect central division of square format - left half features hyperrealistic, complex AI patterns (circuits, neural networks, data visualization) in electric blue, right half shows minimal, simple geometric forms in warm orange. Create dualistic composition with symmetrical asymmetry - perfectly divided yet content is opposites.

Technical execution: Warhol's pop art sensibility with high contrast duotone palette (electric blue vs warm orange). Hyperrealism vs reduction aesthetic tension. Apply sophisticated color theory with complementary contrast.

Typography: "AI Literacy Gap" in architectural precision, lower right corner.

Quality standard: Gallery exhibition ready, museum-quality digital art. Resolution: 1080x1080 pixels.''',
        
        'story': '''Create "Ascending Knowledge" inspired by Wassily Kandinsky's abstract expressionism merged with contemporary UI design aesthetics.

Visual concept: Vertical dynamics showing knowledge journey from bottom to top. Begin with deep purple at base (representing traditional learning), flowing through chromatic progression via particle systems and data streams, culminating in bright cyan at peak (representing AI mastery). Suggest movement and transformation through dynamic visual flow.

Technical execution: Apply Kandinsky's color theory with chromatic progression creating emotional journey. Use particle system aesthetics from digital art, vertical dynamism emphasizing upward movement. Sophisticated gradient work with geometric and organic elements interplaying.

Typography: "AI Literacy Gap" positioned for vertical format optimization.

Artistic standard: Contemporary gallery quality, digital art museum standard. Resolution: 1080x1350 pixels.'''
    }
}

def main():
    print("🎨 갤러리급 메타프롬프트 방식 이미지 생성 시작")
    print("=" * 60)
    
    try:
        # OSMUImageGenerator 인스턴스 생성
        generator = OSMUImageGenerator()
        
        # 이미지 패키지 생성
        success = generator.generate_image_package('ai-literacy-gap', gallery_metaprompts)
        
        if success:
            print('\n🎯 갤러리급 메타프롬프트 방식으로 모든 이미지 생성 완료!')
        else:
            print('\n⚠️ 일부 이미지 생성에 실패했습니다.')
            
    except Exception as e:
        print(f'\n❌ 오류 발생: {e}')

if __name__ == "__main__":
    main()