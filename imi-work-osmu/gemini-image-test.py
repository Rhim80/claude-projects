#!/usr/bin/env python3
"""
Gemini API를 사용한 이미지 생성 테스트
"""

import os
import requests
import base64
from dotenv import load_dotenv

# 환경변수 로드
load_dotenv()

def test_gemini_image_generation():
    """Gemini API로 이미지 생성 테스트"""
    
    api_key = os.getenv('GEMINI_API_KEY')
    if not api_key:
        print("❌ GEMINI_API_KEY가 설정되지 않았습니다.")
        return None
    
    print(f"🔑 Gemini API Key: {api_key[:10]}...")
    
    # Gemini 1.5 Flash를 사용한 이미지 생성 테스트
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    # 한글 텍스트 포함 프롬프트 테스트
    prompt = """
    Create a professional business infographic (1200x630px) with Korean text. Show a small business owner figure standing at a crossroads with 3 clearly labeled paths:

    LEFT PATH: "매출 성장" (in bold Korean text) - show declining/difficult with red warning icons
    MIDDLE PATH: "규모 성장" (in bold Korean text) - show challenging with yellow caution icons  
    RIGHT PATH: "브랜딩" (in bold Korean text) - show bright, illuminated, successful with green checkmarks

    REQUIREMENTS:
    - All Korean text must be clearly visible and readable
    - Use navy blue (#1e3a8a) and white color scheme
    - Professional infographic style, not artistic illustration
    - Include icons: 💰 for sales, 📈 for scale, ✨ for branding
    - Make branding path clearly the best choice visually
    - Business presentation quality, suitable for LinkedIn/blog sharing

    Style: Clean modern infographic, not abstract art. Text readability is critical.
    """
    
    headers = {
        'Content-Type': 'application/json'
    }
    
    payload = {
        "contents": [{
            "parts": [{
                "text": prompt
            }]
        }],
        "generationConfig": {
            "temperature": 0.1,
            "topK": 32,
            "topP": 1,
            "maxOutputTokens": 4096,
        }
    }
    
    try:
        print("🚀 Gemini API 호출 중...")
        response = requests.post(url, headers=headers, json=payload)
        
        print(f"📡 응답 상태: {response.status_code}")
        print(f"📄 응답 내용: {response.text[:500]}...")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Gemini API 호출 성공!")
            
            # 응답에서 이미지 데이터 확인
            if 'candidates' in result:
                content = result['candidates'][0]['content']
                print(f"📝 생성된 응답: {content}")
                return result
            else:
                print("⚠️ 응답에 candidates 없음")
                
        else:
            print(f"❌ API 호출 실패: {response.status_code}")
            print(f"오류 내용: {response.text}")
            
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        return None

def test_imagen_api():
    """Imagen 3 API 테스트 (가능한 경우)"""
    
    api_key = os.getenv('GEMINI_API_KEY')
    
    # Imagen 3 API 엔드포인트 (실험적)
    url = f"https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:generateImage?key={api_key}"
    
    headers = {
        'Content-Type': 'application/json'
    }
    
    payload = {
        "prompt": "Create a professional Korean business infographic showing three paths: 매출 성장, 규모 성장, 브랜딩. Navy blue color scheme, clean design.",
        "aspectRatio": "16:9",
        "safetySettings": [
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            }
        ]
    }
    
    try:
        print("🖼️ Imagen API 테스트...")
        response = requests.post(url, headers=headers, json=payload)
        
        print(f"📡 Imagen 응답 상태: {response.status_code}")
        print(f"📄 Imagen 응답 내용: {response.text[:200]}...")
        
        return response.status_code == 200
        
    except Exception as e:
        print(f"⚠️ Imagen API 오류: {e}")
        return False

if __name__ == "__main__":
    print("🔬 Gemini 이미지 생성 API 테스트 시작")
    print("=" * 50)
    
    # 1. 기본 Gemini 텍스트 생성 테스트
    result = test_gemini_image_generation()
    
    # 2. Imagen API 테스트 (실험적)
    imagen_available = test_imagen_api()
    
    print("\n📊 테스트 결과 요약:")
    print(f"   Gemini 1.5 Flash: {'✅' if result else '❌'}")
    print(f"   Imagen 3 API: {'✅' if imagen_available else '❌'}")
    
    if result:
        print("\n✅ Gemini API를 사용한 이미지 생성이 가능합니다!")
    else:
        print("\n❌ 현재 설정으로는 이미지 생성이 불가능합니다.")