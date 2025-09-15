# Ben Horowitz Fear Leadership - OSMU Image Package

> Complete image generation system for "$46B가 증명한 진실: 두려움을 향해 달려가는 것이 일을 잘하는 방법인 이유"

## 📦 Package Overview

This OSMU (One Source Multi Use) image package provides comprehensive specifications and tools for generating 6 platform-optimized images that maintain brand consistency across Ghost blog, Naver blog, and Instagram platforms.

### 🎯 Content Theme
- **Focus**: Venture capital insights, fear-based leadership, strategic courage
- **Brand**: IMI WORK - SENSE & AI
- **Audience**: Korean and international business professionals

## 📁 Package Structure

```
ben-horowitz-fear-leadership-insights/
├── ghost/                    # Ghost Blog Images
│   ├── feature.png          # 1200x630px - Hero image
│   └── content-1.png        # 800x450px - Supporting content
├── naver/                   # Naver Blog Images  
│   ├── main.png            # 800x450px - Main post image
│   └── body-1.png          # 800x450px - Body content
├── instagram/              # Instagram Images
│   ├── feed.png            # 1080x1080px - Feed post
│   └── story.png           # 1080x1350px - Story format
├── image-manifest.json     # Complete specifications
├── generate-images.py      # Generation script
├── USAGE-GUIDELINES.md     # Implementation guide  
├── generation-report.json  # Package status
└── README.md              # This file
```

## 🚀 Quick Start

### 1. Generate Images
```bash
cd ben-horowitz-fear-leadership-insights/
python3 generate-images.py --service gemini --api-key YOUR_API_KEY
```

### 2. Review Specifications
- **Complete prompts**: `image-manifest.json`
- **Usage guidelines**: `USAGE-GUIDELINES.md`
- **Generation report**: `generation-report.json`

### 3. Implement Across Platforms
- **Ghost**: Upload feature.png and content-1.png
- **Naver**: Use main.png and body-1.png
- **Instagram**: Schedule feed.png and story.png

## 🎨 Brand Guidelines

### Color Palette
- **Navy**: `#1e3a8a` (Primary brand color)
- **White**: `#ffffff` (Clean contrast)
- **Light Gray**: `#f8fafc` (Subtle backgrounds)

### Visual Style
- Professional, sophisticated business imagery
- Venture capital and leadership themes
- Strategic courage and decision-making focus
- Cultural appropriateness for Korean business context

## 🛠️ Technical Specifications

### Image Requirements
- **Format**: PNG with optimization
- **Resolution**: 72+ DPI for web
- **Color Profile**: sRGB for consistency
- **Accessibility**: High contrast maintained
- **Performance**: Optimized file sizes

### Platform Optimizations
- **Ghost Blog**: Open Graph compliant, SEO optimized
- **Naver Blog**: Korean market appropriate, search optimized
- **Instagram**: Mobile-first, social engagement focused

## 📊 Generation Status

✅ **Specifications Complete**: 100%
✅ **Brand Guidelines Integrated**: 100%
✅ **Platform Optimization**: 100%
✅ **Cultural Considerations**: 100%
✅ **Technical Requirements**: 100%

## 🔗 Related Files

- **Core Specifications**: `/image-manifest.json`
- **Generation Tools**: `/generate-images.py`
- **Implementation Guide**: `/USAGE-GUIDELINES.md`
- **Status Report**: `/generation-report.json`

## 📈 Success Metrics

This package ensures:
- Consistent brand identity across all platforms
- Platform-specific optimization for engagement
- Cultural appropriateness for Korean business audience
- Technical compliance for web performance
- Efficient OSMU content strategy implementation

---

**Created**: September 14, 2024
**Version**: 1.0.0
**Brand System**: IMI WORK - SENSE & AI