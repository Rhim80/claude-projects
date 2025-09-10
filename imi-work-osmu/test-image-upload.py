#!/usr/bin/env python3
"""
Ghost 이미지 업로드 테스트 스크립트
"""

import os
import requests
import jwt
import time

def generate_jwt_token(admin_api_key):
    """Ghost Admin API용 JWT 토큰 생성"""
    # API 키를 ID와 Secret으로 분리
    key_parts = admin_api_key.split(':')
    key_id = key_parts[0]
    key_secret = bytes.fromhex(key_parts[1])
    
    # JWT 페이로드 생성 - 시간 보정
    now_timestamp = int(time.time())
    iat = now_timestamp - 300  # 5분 전
    exp = now_timestamp + 300  # 5분 후
    
    payload = {
        'iat': iat,
        'exp': exp,
        'aud': '/admin/'  # Ghost Admin API audience
    }
    
    print(f"Token debug - iat: {iat}, exp: {exp}, current: {now_timestamp}")
    
    # JWT 헤더
    header = {'kid': key_id}
    
    # JWT 토큰 생성
    token = jwt.encode(payload, key_secret, algorithm='HS256', headers=header)
    return token

def upload_image_test(image_path):
    """이미지 업로드 테스트"""
    ghost_url = "https://blog.imiwork.com"
    admin_api_key = "689ab9c2806ede000158236d:bcf8cc2cdfe9d9ecf91c534145101b6586aa6586f6ccec19ba359ec071cc2f8a"
    
    if not os.path.exists(image_path):
        print(f"❌ 파일이 존재하지 않습니다: {image_path}")
        return None
        
    token = generate_jwt_token(admin_api_key)
    url = f"{ghost_url}/ghost/api/admin/images/upload/"
    
    headers = {
        'Authorization': f'Ghost {token}'
    }
    
    print(f"🔍 이미지 업로드 디버그:")
    print(f"   파일 경로: {image_path}")
    print(f"   파일 크기: {os.path.getsize(image_path)} bytes")
    print(f"   URL: {url}")
    print(f"   헤더: {headers}")
    
    try:
        with open(image_path, 'rb') as image_file:
            files = {
                'file': (os.path.basename(image_path), image_file, 'image/png')
            }
            data = {
                'purpose': 'image'
            }
            
            response = requests.post(url, headers=headers, files=files, data=data)
            
            print(f"📡 이미지 업로드 응답:")
            print(f"   상태 코드: {response.status_code}")
            print(f"   응답 헤더: {dict(response.headers)}")
            print(f"   응답 내용: {response.text}")
            
            if response.status_code == 201:
                result = response.json()
                print(f"✅ 업로드 성공!")
                print(f"   이미지 URL: {result['images'][0]['url']}")
                return result['images'][0]['url']
            else:
                print(f"❌ 업로드 실패")
                return None
                
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        return None

if __name__ == "__main__":
    image_path = "/home/hovoo/Projects/imi-work-osmu/assets/images/small-brand-branding-survival/ghost/feature.png"
    upload_image_test(image_path)