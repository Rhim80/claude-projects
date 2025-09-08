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

        # Ask Gemini to create the image
        response = client.models.generate_content(
            model="gemini-2.0-flash-image-exp-1219",
            contents=[prompt]
        )
        
        print('✅ 이미지 생성 완료!')
        
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
        
        print('❌ 응답에서 이미지를 찾을 수 없습니다.')
        return False
        
    except Exception as e:
        print(f'❌ 이미지 생성 실패: {e}')
        return False

if __name__ == "__main__":
    success = generate_feature_image()
    if success:
        print('🎉 Feature image 생성 성공!')
    else:
        print('💥 Feature image 생성 실패')
