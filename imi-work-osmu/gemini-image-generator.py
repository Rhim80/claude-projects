#!/usr/bin/env python3
"""
Gemini 2.5 Flash를 사용한 실제 이미지 생성
"""

import os
import requests
import base64
import json
from dotenv import load_dotenv
from pathlib import Path

# 환경변수 로드
load_dotenv()

class GeminiImageGenerator:
    def __init__(self):
        self.api_key = os.getenv('GEMINI_API_KEY')
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY가 설정되지 않았습니다.")
        
        # Gemini 2.5 Flash Image Preview 모델 사용
        self.model_name = "gemini-2.5-flash-image-preview"
        self.base_url = "https://generativelanguage.googleapis.com/v1beta/models"
        
        print(f"🤖 Gemini Image Generator 초기화 완료")
        print(f"   모델: {self.model_name}")
        print(f"   API 키: {self.api_key[:10]}...")

    def generate_image(self, prompt, output_path, width=1200, height=630):
        """이미지 생성 및 저장"""
        
        url = f"{self.base_url}/{self.model_name}:generateContent"
        
        headers = {
            'Content-Type': 'application/json'
        }
        
        # 이미지 생성 요청 페이로드
        payload = {
            "contents": [{
                "parts": [{
                    "text": f"Create an image: {prompt}\n\nImage specifications: {width}x{height} pixels, high quality, professional design."
                }]
            }],
            "generationConfig": {
                "temperature": 0.1,
                "topK": 40,
                "topP": 0.95,
                "maxOutputTokens": 8192,
            },
            "safetySettings": [
                {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_HATE_SPEECH", 
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                }
            ]
        }
        
        try:
            print(f"🎨 이미지 생성 중: {os.path.basename(output_path)}")
            print(f"   크기: {width}x{height}")
            print(f"   프롬프트 길이: {len(prompt)} 문자")
            
            # API 호출
            response = requests.post(
                f"{url}?key={self.api_key}", 
                headers=headers, 
                json=payload,
                timeout=60  # 60초 타임아웃
            )
            
            print(f"📡 API 응답: {response.status_code}")
            
            if response.status_code == 200:
                result = response.json()
                
                # 응답에서 이미지 데이터 추출
                if 'candidates' in result and len(result['candidates']) > 0:
                    candidate = result['candidates'][0]
                    
                    # 이미지 데이터가 있는지 확인
                    if 'content' in candidate and 'parts' in candidate['content']:
                        for part in candidate['content']['parts']:
                            if 'inlineData' in part:
                                # Base64 이미지 데이터 저장
                                image_data = part['inlineData']['data']
                                mime_type = part['inlineData']['mimeType']
                                
                                # Base64 디코딩 후 파일 저장
                                image_bytes = base64.b64decode(image_data)
                                
                                # 디렉토리 생성
                                os.makedirs(os.path.dirname(output_path), exist_ok=True)
                                
                                with open(output_path, 'wb') as f:
                                    f.write(image_bytes)
                                
                                file_size = len(image_bytes)
                                print(f"✅ 이미지 저장 완료: {output_path}")
                                print(f"   파일 크기: {file_size:,} bytes")
                                print(f"   MIME 타입: {mime_type}")
                                
                                return True
                            elif 'text' in part:
                                # 텍스트 응답인 경우
                                print(f"📝 텍스트 응답: {part['text'][:200]}...")
                    
                    print("⚠️ 응답에 이미지 데이터가 없습니다.")
                    print(f"응답 구조: {json.dumps(result, indent=2)[:500]}...")
                    
                else:
                    print("❌ 응답에 candidates가 없습니다.")
                    print(f"전체 응답: {result}")
                    
            else:
                print(f"❌ API 호출 실패: {response.status_code}")
                print(f"오류 응답: {response.text[:500]}...")
                
            return False
            
        except requests.exceptions.Timeout:
            print("⏰ API 호출 타임아웃 (60초)")
            return False
        except Exception as e:
            print(f"❌ 이미지 생성 오류: {e}")
            return False

def test_single_image():
    """단일 이미지 생성 테스트"""
    
    try:
        generator = GeminiImageGenerator()
        
        # 테스트 프롬프트 (한글 포함)
        prompt = """
        Create a professional business infographic with Korean text. Show a small business owner figure standing at a crossroads with 3 clearly labeled paths:

        LEFT PATH: "매출 성장" (in bold Korean text) - show declining/difficult with red warning icons
        MIDDLE PATH: "규모 성장" (in bold Korean text) - show challenging with yellow caution icons  
        RIGHT PATH: "브랜딩" (in bold Korean text) - show bright, illuminated, successful with green checkmarks

        Requirements:
        - All Korean text must be clearly visible and readable
        - Use navy blue (#1e3a8a) and white color scheme
        - Professional infographic style, not artistic illustration
        - Include icons: 💰 for sales, 📈 for scale, ✨ for branding
        - Business presentation quality
        - Clean modern design
        
        Style: Professional Korean business infographic with clear text readability.
        """
        
        output_path = "/home/hovoo/Projects/imi-work-osmu/test-gemini-image.png"
        
        success = generator.generate_image(prompt, output_path, 1200, 630)
        
        if success:
            print("\n🎉 테스트 성공!")
            print(f"생성된 이미지: {output_path}")
        else:
            print("\n❌ 테스트 실패")
            
        return success
        
    except Exception as e:
        print(f"❌ 테스트 오류: {e}")
        return False

if __name__ == "__main__":
    print("🔬 Gemini 2.5 Flash 이미지 생성 테스트")
    print("=" * 50)
    
    success = test_single_image()
    
    if success:
        print("\n✅ Gemini 이미지 생성이 정상적으로 작동합니다!")
        print("이제 osmu-image-generator를 업데이트할 수 있습니다.")
    else:
        print("\n❌ Gemini 이미지 생성에 문제가 있습니다.")
        print("API 설정이나 모델을 확인해야 합니다.")