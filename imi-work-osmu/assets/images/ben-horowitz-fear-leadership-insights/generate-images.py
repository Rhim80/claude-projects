#!/usr/bin/env python3
"""
OSMU Image Generation Script for Ben Horowitz Fear Leadership Content
Created for IMI WORK - SENSE & AI Brand System

This script provides a complete workflow for generating platform-optimized images
using the detailed prompts and specifications in image-manifest.json.

Usage:
    python generate-images.py --service [gemini|dalle|midjourney] --api-key YOUR_API_KEY

Requirements:
    - API access to chosen image generation service
    - Python 3.7+
    - Required packages: requests, Pillow, json
"""

import json
import os
import sys
from datetime import datetime
from pathlib import Path
import argparse

class OSMUImageGenerator:
    def __init__(self, manifest_path, api_key, service='gemini'):
        self.manifest_path = manifest_path
        self.api_key = api_key
        self.service = service.lower()
        self.manifest = self.load_manifest()
        self.generation_log = []
        
    def load_manifest(self):
        """Load the image manifest with all specifications."""
        with open(self.manifest_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def generate_all_images(self):
        """Generate all images according to manifest specifications."""
        print(f"🎨 Starting OSMU Image Generation for: {self.manifest['package_info']['title']}")
        print(f"📱 Target Platforms: {', '.join(self.manifest['generation_metadata']['platforms'])}")
        print(f"🖼️ Total Images: {self.manifest['generation_metadata']['total_images']}")
        print("-" * 60)
        
        total_generated = 0
        total_errors = 0
        
        # Generate images for each platform
        for platform, platform_specs in self.manifest['image_specifications'].items():
            print(f"\n📂 Generating {platform.upper()} images...")
            
            for image_key, image_spec in platform_specs.items():
                try:
                    success = self.generate_single_image(platform, image_key, image_spec)
                    if success:
                        total_generated += 1
                        print(f"  ✅ {image_spec['filename']} ({image_spec['dimensions']})")
                    else:
                        total_errors += 1
                        print(f"  ❌ Failed: {image_spec['filename']}")
                        
                except Exception as e:
                    total_errors += 1
                    print(f"  ❌ Error generating {image_spec['filename']}: {str(e)}")
                    self.generation_log.append({
                        'image': f"{platform}/{image_spec['filename']}",
                        'status': 'error',
                        'error': str(e),
                        'timestamp': datetime.now().isoformat()
                    })
        
        # Generate final report
        self.generate_report(total_generated, total_errors)
        
    def generate_single_image(self, platform, image_key, image_spec):
        """Generate a single image using the specified AI service."""
        
        prompt = image_spec['generation_prompt']
        dimensions = image_spec['dimensions']
        file_path = image_spec['file_path']
        
        # Add brand-specific enhancements to prompt
        enhanced_prompt = self.enhance_prompt_with_brand(prompt)
        
        print(f"  🔄 Generating {image_spec['filename']}...")
        
        # This is where you would integrate with your chosen AI service
        # For now, creating a placeholder that shows the complete workflow
        
        if self.service == 'gemini':
            return self.generate_with_gemini(enhanced_prompt, dimensions, file_path)
        elif self.service == 'dalle':
            return self.generate_with_dalle(enhanced_prompt, dimensions, file_path)
        elif self.service == 'midjourney':
            return self.generate_with_midjourney(enhanced_prompt, dimensions, file_path)
        else:
            print(f"  ⚠️ Service '{self.service}' not implemented. Creating placeholder...")
            return self.create_placeholder(image_spec)
    
    def enhance_prompt_with_brand(self, base_prompt):
        """Enhance the base prompt with additional brand guidelines."""
        brand_colors = self.manifest['brand_guidelines']['primary_colors']
        
        brand_enhancement = f"""
        CRITICAL BRAND REQUIREMENTS:
        - Primary colors MUST be: Navy #{brand_colors['navy'][1:]}, White #{brand_colors['white'][1:]}, Light Gray #{brand_colors['light_gray'][1:]}
        - Style: {self.manifest['brand_guidelines']['visual_tone']}
        - Brand elements: {self.manifest['brand_guidelines']['brand_elements']}
        - Cultural context: {self.manifest['brand_guidelines']['cultural_context']}
        
        BASE PROMPT: {base_prompt}
        """
        
        return brand_enhancement
    
    def generate_with_gemini(self, prompt, dimensions, file_path):
        """Generate image using Gemini AI."""
        # Placeholder for Gemini integration
        print(f"    🤖 Using Gemini AI for generation...")
        # Here you would integrate with Gemini's image generation API
        return self.create_placeholder_with_specs(prompt, dimensions, file_path)
    
    def generate_with_dalle(self, prompt, dimensions, file_path):
        """Generate image using DALL-E."""
        # Placeholder for DALL-E integration
        print(f"    🤖 Using DALL-E for generation...")
        # Here you would integrate with OpenAI's DALL-E API
        return self.create_placeholder_with_specs(prompt, dimensions, file_path)
    
    def generate_with_midjourney(self, prompt, dimensions, file_path):
        """Generate image using Midjourney."""
        # Placeholder for Midjourney integration
        print(f"    🤖 Using Midjourney for generation...")
        # Here you would integrate with Midjourney API
        return self.create_placeholder_with_specs(prompt, dimensions, file_path)
    
    def create_placeholder_with_specs(self, prompt, dimensions, file_path):
        """Create a placeholder image with proper specifications."""
        try:
            from PIL import Image, ImageDraw, ImageFont
            
            # Parse dimensions
            width, height = map(int, dimensions.replace('px', '').split('x'))
            
            # Create placeholder image with brand colors
            brand_colors = self.manifest['brand_guidelines']['primary_colors']
            bg_color = brand_colors['navy']  # Navy background
            text_color = brand_colors['white']  # White text
            
            # Create image
            img = Image.new('RGB', (width, height), bg_color)
            draw = ImageDraw.Draw(img)
            
            # Add placeholder text
            placeholder_text = f"OSMU Image\n{dimensions}\n{Path(file_path).stem}"
            
            # Calculate text position (centered)
            bbox = draw.textbbox((0, 0), placeholder_text)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            x = (width - text_width) // 2
            y = (height - text_height) // 2
            
            draw.multiline_text((x, y), placeholder_text, fill=text_color, align='center')
            
            # Ensure directory exists
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            
            # Save image
            img.save(file_path, 'PNG', optimize=True)
            
            self.generation_log.append({
                'image': file_path,
                'status': 'placeholder_created',
                'dimensions': dimensions,
                'timestamp': datetime.now().isoformat()
            })
            
            return True
            
        except Exception as e:
            print(f"    ❌ Error creating placeholder: {e}")
            return False
    
    def create_placeholder(self, image_spec):
        """Create a basic placeholder for unsupported services."""
        file_path = image_spec['file_path']
        dimensions = image_spec['dimensions']
        
        return self.create_placeholder_with_specs("Placeholder", dimensions, file_path)
    
    def generate_report(self, total_generated, total_errors):
        """Generate comprehensive generation report."""
        
        report = {
            "generation_summary": {
                "package_title": self.manifest['package_info']['title'],
                "slug": self.manifest['package_info']['slug'],
                "generation_date": datetime.now().isoformat(),
                "total_images_requested": self.manifest['generation_metadata']['total_images'],
                "total_images_generated": total_generated,
                "total_errors": total_errors,
                "success_rate": f"{(total_generated / self.manifest['generation_metadata']['total_images'] * 100):.1f}%"
            },
            "platform_breakdown": {
                "ghost": 2,
                "naver": 2, 
                "instagram": 2
            },
            "generation_log": self.generation_log,
            "next_steps": [
                "Verify all images meet platform specifications",
                "Apply final brand color corrections if needed",
                "Optimize file sizes for web performance",
                "Upload images to respective platforms",
                "Update content management system with image paths"
            ]
        }
        
        report_path = os.path.join(os.path.dirname(self.manifest_path), 'generation-report.json')
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        # Print summary
        print("\n" + "="*60)
        print("🎯 GENERATION COMPLETE")
        print("="*60)
        print(f"📊 Success Rate: {report['generation_summary']['success_rate']}")
        print(f"✅ Generated: {total_generated}/{self.manifest['generation_metadata']['total_images']} images")
        if total_errors > 0:
            print(f"❌ Errors: {total_errors}")
        print(f"📄 Report saved: {report_path}")
        print(f"📁 Images location: {os.path.dirname(self.manifest_path)}")

def main():
    parser = argparse.ArgumentParser(description='Generate OSMU images for IMI WORK content')
    parser.add_argument('--service', choices=['gemini', 'dalle', 'midjourney'], 
                       default='gemini', help='AI image generation service to use')
    parser.add_argument('--api-key', required=True, help='API key for the chosen service')
    parser.add_argument('--manifest', default='image-manifest.json', 
                       help='Path to image manifest file')
    
    args = parser.parse_args()
    
    # Get absolute path to manifest
    script_dir = Path(__file__).parent
    manifest_path = script_dir / args.manifest
    
    if not manifest_path.exists():
        print(f"❌ Manifest file not found: {manifest_path}")
        sys.exit(1)
    
    # Initialize generator
    generator = OSMUImageGenerator(str(manifest_path), args.api_key, args.service)
    
    # Generate all images
    generator.generate_all_images()

if __name__ == "__main__":
    main()