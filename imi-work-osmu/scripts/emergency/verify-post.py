#!/usr/bin/env python3
"""
Verify Ghost Post Content - Check if images are properly integrated
"""

import json
import requests
import jwt
import time

def generate_jwt_token(admin_api_key):
    key_parts = admin_api_key.split(':')
    key_id = key_parts[0]
    key_secret = bytes.fromhex(key_parts[1])

    now_timestamp = int(time.time())
    iat = now_timestamp
    exp = now_timestamp + 300

    payload = {
        'iat': iat,
        'exp': exp,
        'aud': '/admin/'
    }

    header = {'kid': key_id}
    token = jwt.encode(payload, key_secret, algorithm='HS256', headers=header)
    return token

def verify_post():
    GHOST_URL = "https://blog.imiwork.com"
    GHOST_API_KEY = "689ab9c2806ede000158236d:bcf8cc2cdfe9d9ecf91c534145101b6586aa6586f6ccec19ba359ec071cc2f8a"
    POST_ID = "68ca7b6c39fa3f00013cef13"

    token = generate_jwt_token(GHOST_API_KEY)
    url = f"{GHOST_URL}/ghost/api/admin/posts/{POST_ID}/?formats=html,lexical"

    headers = {
        'Authorization': f'Ghost {token}'
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        result = response.json()
        post = result['posts'][0]

        print("🔍 Post Verification Results")
        print("=" * 50)
        print(f"📊 Title: {post['title']}")
        print(f"🌐 URL: {GHOST_URL}/{post['slug']}/")
        print(f"🆔 ID: {post['id']}")
        print(f"📋 Status: {post['status']}")
        print(f"🖼️ Feature Image: {post.get('feature_image', 'None')}")

        # Check HTML content
        html_content = post.get('html', '')
        print(f"\n📄 HTML Content Length: {len(html_content)} characters")

        # Check for image URLs in content
        if 'content/images' in html_content:
            print("✅ Content images found in HTML")
            # Count image occurrences
            image_count = html_content.count('content/images')
            print(f"📷 Total images in content: {image_count}")
        else:
            print("❌ No content images found in HTML")

        # Check for placeholder comments
        if '<!-- CONTENT_IMAGE_' in html_content:
            print("⚠️ Warning: Placeholder comments still exist")
        else:
            print("✅ No placeholder comments found")

        # Check Lexical content
        lexical_content = str(post.get('lexical', ''))
        print(f"📝 Lexical Content Length: {len(lexical_content)} characters")

        if 'content/images' in lexical_content:
            print("✅ Content images found in Lexical")
            lexical_image_count = lexical_content.count('content/images')
            print(f"📷 Total images in Lexical: {lexical_image_count}")
        else:
            print("❌ No content images found in Lexical")

        print(f"\n🔗 Post URL for manual verification: {GHOST_URL}/{post['slug']}/")

        return post

    except Exception as e:
        print(f"❌ Error verifying post: {e}")
        return None

if __name__ == "__main__":
    verify_post()