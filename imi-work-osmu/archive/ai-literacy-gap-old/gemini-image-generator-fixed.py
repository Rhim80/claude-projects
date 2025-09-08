import os
from dotenv import load_dotenv
from google import genai
from PIL import Image
from io import BytesIO

# Load environment variables
load_dotenv()

# Initialize the client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generate_feature_image():
    try:
        print('🎨 Gemini 2.5 Flash Image로 feature image 생성 시작...')
        
        # AI 리터러시 격차를 표현하는 미니멀한 프롬프트
        prompt = """
        Create a minimalist feature image representing AI literacy gap.
        Split composition: 
        Left side - modern workspace with terminal screens, automated workflows, AI tools, bright and organized
        Right side - traditional office with papers, manual work, darker and cluttered
        Clean visual separation in the middle.
        Pastel color palette, professional yet warm tone.
        16:9 aspect ratio, suitable for blog header.
        Minimalist design, IMI WORK brand aesthetic.
        """

        # Try different model names
        models_to_try = [
            "gemini-2.5-flash-image-preview",
            "imagen-3.0-generate-001",
            "imagegeneration-004"
        ]
        
        for model_name in models_to_try:
            try:
                print(f'🔄 시도 중: {model_name}')
                response = client.models.generate_content(
                    model=model_name,
                    contents=[prompt]
                )
                
                print(f'✅ {model_name}로 이미지 생성 완료!')
                
                # Extract and save the image
                for part in response.candidates[0].content.parts:
                    if part.inline_data is not None:
                        # Convert the raw data into an image
                        image = Image.open(BytesIO(part.inline_data.data))
                        # Save it as a PNG file
                        image.save("ai-literacy-gap-feature.png")
                        print(f'💾 이미지 저장 완료: ai-literacy-gap-feature.png')
                        print(f'📏 이미지 크기: {image.size}')
                        print(f'🎨 이미지 모드: {image.mode}')
                        return True
                
            except Exception as e:
                print(f'❌ {model_name} 실패: {e}')
                continue
        
        print('❌ 모든 모델 시도 실패')
        return False
        
    except Exception as e:
        print(f'❌ 전체 실패: {e}')
        return False

if __name__ == "__main__":
    success = generate_feature_image()
    if success:
        print('🎉 Feature image 생성 성공!')
    else:
        print('💥 모든 시도 실패')
