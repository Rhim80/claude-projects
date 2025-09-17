#!/usr/bin/env python3
"""
Ghost Post Fix Script - Upload images and update existing post content
Specifically designed to fix posts with placeholder comments like <!-- CONTENT_IMAGE_1 -->
"""

import json
import os
import requests
import jwt
import time
import markdown
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class GhostPostFixer:
    def __init__(self, ghost_url, admin_api_key):
        self.ghost_url = ghost_url
        self.admin_api_key = admin_api_key
        self.api_base = f"{ghost_url}/ghost/api/admin/"

    def generate_jwt_token(self):
        """Generate JWT token for Ghost Admin API"""
        key_parts = self.admin_api_key.split(':')
        key_id = key_parts[0]
        key_secret = bytes.fromhex(key_parts[1])

        now_timestamp = int(time.time())
        iat = now_timestamp
        exp = now_timestamp + 300  # 5 minutes

        payload = {
            'iat': iat,
            'exp': exp,
            'aud': '/admin/'
        }

        header = {'kid': key_id}
        token = jwt.encode(payload, key_secret, algorithm='HS256', headers=header)
        return token

    def upload_image(self, image_path, purpose='image'):
        """Upload image to Ghost"""
        if not os.path.exists(image_path):
            print(f"Warning: Image not found: {image_path}")
            return None

        token = self.generate_jwt_token()
        url = f"{self.api_base}images/upload/"

        headers = {
            'Authorization': f'Ghost {token}'
        }

        try:
            with open(image_path, 'rb') as image_file:
                files = {
                    'file': (os.path.basename(image_path), image_file, 'image/png')
                }
                data = {
                    'purpose': purpose
                }

                print(f"📸 Uploading image: {os.path.basename(image_path)}")
                response = requests.post(url, headers=headers, files=files, data=data)
                response.raise_for_status()

                result = response.json()
                image_url = result['images'][0]['url']
                print(f"✅ Upload successful: {image_url}")
                return image_url

        except requests.exceptions.RequestException as e:
            print(f"❌ Error uploading image {image_path}: {e}")
            return None
        except Exception as e:
            print(f"❌ Error processing image {image_path}: {e}")
            return None

    def get_post_by_id(self, post_id):
        """Get existing post by ID"""
        token = self.generate_jwt_token()
        url = f"{self.api_base}posts/{post_id}/?formats=html,lexical"

        headers = {
            'Authorization': f'Ghost {token}'
        }

        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            result = response.json()
            return result['posts'][0]
        except Exception as e:
            print(f"❌ Error getting post: {e}")
            return None

    def update_post(self, post_id, post_data):
        """Update existing post"""
        token = self.generate_jwt_token()
        url = f"{self.api_base}posts/{post_id}/?source=html"

        headers = {
            'Authorization': f'Ghost {token}',
            'Content-Type': 'application/json'
        }

        try:
            payload = {'posts': [post_data]}
            response = requests.put(url, headers=headers, json=payload)
            response.raise_for_status()

            result = response.json()
            return result['posts'][0]
        except Exception as e:
            print(f"❌ Error updating post: {e}")
            return None

def main():
    # Configuration
    GHOST_URL = "https://blog.imiwork.com"
    GHOST_API_KEY = "689ab9c2806ede000158236d:bcf8cc2cdfe9d9ecf91c534145101b6586aa6586f6ccec19ba359ec071cc2f8a"
    POST_ID = "68ca7b6c39fa3f00013cef13"
    SLUG = "calculated-business-transition-criteria"

    print("🔧 Starting Ghost Post Fix Process")
    print("=" * 50)
    print(f"📋 Post ID: {POST_ID}")
    print(f"📋 Slug: {SLUG}")

    # Initialize the fixer
    fixer = GhostPostFixer(GHOST_URL, GHOST_API_KEY)

    # Load OSMU image manifest
    manifest_path = f"assets/images/{SLUG}/image-manifest.json"
    with open(manifest_path, 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    # Image paths
    base_path = f"assets/images/{SLUG}/ghost/"
    feature_image_path = f"{base_path}feature.png"
    content_image_1_path = f"{base_path}content-1.png"
    content_image_2_path = f"{base_path}content-2.png"

    # Upload images
    print("\n📸 Uploading images...")
    feature_image_url = fixer.upload_image(feature_image_path)
    content_image_1_url = fixer.upload_image(content_image_1_path)
    content_image_2_url = fixer.upload_image(content_image_2_path)

    if not all([feature_image_url, content_image_1_url, content_image_2_url]):
        print("❌ Failed to upload one or more images")
        return

    # Load markdown content
    content_file = f"contents/{SLUG}/main.md"
    with open(content_file, 'r', encoding='utf-8') as f:
        markdown_content = f.read()

    # Convert markdown to HTML
    html_content = markdown.markdown(
        markdown_content,
        extensions=['extra', 'toc', 'codehilite', 'nl2br']
    )

    # Replace image placeholders with actual images
    content_image_1_html = f'<figure class="kg-card kg-image-card"><img src="{content_image_1_url}" class="kg-image" alt="계산된 도전의 기준 - 이미지 1" loading="lazy" width="800" height="450"></figure>'
    content_image_2_html = f'<figure class="kg-card kg-image-card"><img src="{content_image_2_url}" class="kg-image" alt="계산된 도전의 기준 - 이미지 2" loading="lazy" width="800" height="450"></figure>'

    html_content = html_content.replace('<!-- CONTENT_IMAGE_1 -->', content_image_1_html)
    html_content = html_content.replace('<!-- CONTENT_IMAGE_2 -->', content_image_2_html)

    # Remove first H1 tag to avoid duplication with Ghost title
    import re
    pattern = r'<h1[^>]*>.*?</h1>'
    html_content = re.sub(pattern, '', html_content, count=1, flags=re.IGNORECASE | re.DOTALL)
    html_content = html_content.strip()

    # Get current post
    print("\n📄 Getting current post...")
    current_post = fixer.get_post_by_id(POST_ID)
    if not current_post:
        print("❌ Failed to get current post")
        return

    # Update post data
    updated_data = {
        'title': current_post['title'],
        'slug': current_post['slug'],
        'html': html_content,
        'feature_image': feature_image_url,
        'meta_title': current_post.get('meta_title', f"{manifest['title']} | IMI WORK"),
        'meta_description': current_post.get('meta_description', f"{manifest['title']}에 대한 IMI WORK의 인사이트"),
        'custom_excerpt': current_post.get('custom_excerpt', f"{manifest['title']}에 대한 실무 중심의 분석과 적용 방안"),
        'tags': current_post.get('tags', []),
        'status': current_post['status'],
        'featured': current_post['featured'],
        'visibility': current_post['visibility'],
        'updated_at': current_post['updated_at']
    }

    # Update the post
    print("\n🚀 Updating post...")
    updated_post = fixer.update_post(POST_ID, updated_data)

    if updated_post:
        print("\n🎉 Ghost Post Fix Completed!")
        print("=" * 50)
        print(f"📊 Post Title: {updated_post['title']}")
        print(f"🌐 Ghost URL: {GHOST_URL}/{updated_post['slug']}/")
        print(f"🆔 Post ID: {updated_post['id']}")
        print(f"📋 Status: {updated_post['status'].upper()}")
        print(f"🖼️ Feature Image: {feature_image_url}")
        print(f"📷 Content Images: 2 images uploaded and integrated")
        print(f"✅ All placeholders replaced with actual images")

        # Verify images are in content
        lexical_content = str(updated_post.get('lexical', ''))
        if content_image_1_url in lexical_content and content_image_2_url in lexical_content:
            print("✅ Content images successfully integrated into post")
        else:
            print("⚠️ Warning: Some content images may not be properly integrated")

    else:
        print("❌ Failed to update post")

if __name__ == "__main__":
    main()