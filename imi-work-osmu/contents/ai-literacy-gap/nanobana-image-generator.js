const axios = require('axios');
const fs = require('fs');

const NANOBANA_API_KEY = 'AIzaSyDBjAmTsAcj3YT2_F0eh6thHb4ctAxFfL4';

async function generateFeatureImage() {
    try {
        console.log('🎨 나노바나나로 feature image 생성 시작...');
        
        const prompt = `
AI 리터러시 격차를 표현하는 미니멀한 이미지.
한 쪽은 현대적인 AI 도구들 (터미널, 자동화 워크플로우)을 사용하는 밝은 공간,
다른 한 쪽은 전통적인 업무 환경의 어두운 공간.
깔끔한 분할 구성, 파스텔 톤, 미니멀 디자인.
16:9 비율, 블로그 헤더용.
IMI WORK 브랜드 느낌으로 따뜻하면서도 전문적인 톤.
`;

        const response = await axios.post('https://api.nanobana.com/v1/images/generations', {
            prompt: prompt,
            n: 1,
            size: "1024x576", // 16:9 비율
            style: "minimalist",
            quality: "hd"
        }, {
            headers: {
                'Authorization': `Bearer ${NANOBANA_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.data && response.data.data[0]) {
            const imageUrl = response.data.data[0].url;
            console.log('✅ 이미지 생성 완료!');
            console.log('🔗 이미지 URL:', imageUrl);
            
            // 이미지 다운로드
            const imageResponse = await axios.get(imageUrl, {
                responseType: 'arraybuffer'
            });
            
            fs.writeFileSync('ai-literacy-gap-feature.png', imageResponse.data);
            console.log('💾 이미지 저장 완료: ai-literacy-gap-feature.png');
            
            return {
                success: true,
                imagePath: 'ai-literacy-gap-feature.png',
                imageUrl: imageUrl
            };
        } else {
            throw new Error('이미지 생성 응답이 비어있습니다.');
        }
        
    } catch (error) {
        console.error('❌ 이미지 생성 실패:', error.message);
        if (error.response) {
            console.error('📋 응답 상태:', error.response.status);
            console.error('📋 응답 데이터:', JSON.stringify(error.response.data, null, 2));
        }
        return { success: false, error: error.message };
    }
}

generateFeatureImage().then(result => {
    if (result.success) {
        console.log('🎉 Feature image 생성 완료!');
    } else {
        console.log('💥 Feature image 생성 실패:', result.error);
    }
});
