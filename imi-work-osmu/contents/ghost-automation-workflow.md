# Ghost SEO 포스팅 자동화 워크플로우

> 에세이 작성부터 Ghost 블로그 발행까지 완전 자동화 가이드

## 📋 워크플로우 개요

1. **콘텐츠 준비** → 2. **SEO 최적화** → 3. **Feature Image 생성** → 4. **Ghost 업로드** → 5. **발행**

## 🛠 필수 환경 설정

### API 키 설정
```bash
# .env 파일 생성
GEMINI_API_KEY=AIzaSyDBjAmTsAcj3YT2_F0eh6thHb4ctAxFfL4
GHOST_API_URL=https://blog.imiwork.com
GHOST_ADMIN_API_KEY=689ab9c2806ede000158236d:bcf8cc2cdfe9d9ecf91c534145101b6586aa6586f6ccec19ba359ec071cc2f8a
```

### 필수 패키지 설치
```bash
# Python 패키지
pip install google-genai python-dotenv pillow

# Node.js 패키지  
npm install @tryghost/admin-api axios
```

## 📝 단계별 실행 가이드

### STEP 1: 콘텐츠 작성
원본 에세이를 마크다운 형태로 작성
```
/contents/{주제명}/essay.md
```

### STEP 2: Ghost SEO 최적화
```bash
# ghost-seo-optimizer 서브에이전트 사용
사용법: "다음 블로그 글을 Ghost CMS에 최적화해주세요: /path/to/essay.md"

자동 생성 파일:
- ghost-optimized.json (포스트 데이터)
- upload-to-ghost.js (업로드 스크립트)
- ghost-styles.css (스타일)
```

### STEP 3: Feature Image 생성
```python
# gemini-image-generator.py
import os
from dotenv import load_dotenv
from google import genai
from PIL import Image
from io import BytesIO

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generate_feature_image(topic_description):
    prompt = f"""
    Create a minimalist feature image for: {topic_description}
    Requirements:
    - 16:9 aspect ratio (1024x576 or 1152x648)
    - Minimalist design
    - Professional yet warm tone
    - IMI WORK brand aesthetic (pastel colors)
    - Blog header suitable
    - Clean visual composition
    """
    
    response = client.models.generate_content(
        model="gemini-2.5-flash-image-preview",
        contents=[prompt]
    )
    
    for part in response.candidates[0].content.parts:
        if part.inline_data is not None:
            image = Image.open(BytesIO(part.inline_data.data))
            filename = f"{topic_description.lower().replace(' ', '-')}-feature.png"
            image.save(filename)
            return filename
    
    return None
```

### STEP 4: Ghost 업로드 및 설정
```javascript
// ghost-auto-upload.js
const GhostAdminAPI = require('@tryghost/admin-api');
const fs = require('fs');
const path = require('path');

const api = new GhostAdminAPI({
    url: process.env.GHOST_API_URL,
    key: process.env.GHOST_ADMIN_API_KEY,
    version: 'v5.0'
});

async function fullGhostUpload(postDataFile, imageFile, youtubeUrl = null) {
    try {
        // 1. 포스트 데이터 로드
        const postData = JSON.parse(fs.readFileSync(postDataFile, 'utf8'));
        
        // 2. YouTube 임베드 추가 (있는 경우)
        if (youtubeUrl) {
            const videoId = youtubeUrl.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/)[1];
            const embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
            postData.html = postData.html.replace('<!-- YOUTUBE_EMBED -->', embedCode);
        }
        
        // 3. 이미지 업로드
        let imageUrl = null;
        if (imageFile && fs.existsSync(imageFile)) {
            const imageUpload = await api.images.upload({ file: imageFile });
            imageUrl = imageUpload.url;
        }
        
        // 4. 포스트 생성
        const post = await api.posts.add({
            title: postData.title,
            slug: postData.slug,
            html: postData.html,
            meta_title: postData.meta_title,
            meta_description: postData.meta_description,
            custom_excerpt: postData.custom_excerpt,
            feature_image: imageUrl,
            featured: postData.featured || false,
            tags: postData.tags || [],
            status: 'draft'
        });
        
        console.log('✅ 포스트 업로드 완료!');
        console.log('🔗 URL:', post.url);
        console.log('📝 Slug:', post.slug);
        
        return {
            success: true,
            postId: post.id,
            url: post.url,
            slug: post.slug
        };
        
    } catch (error) {
        console.error('❌ 업로드 실패:', error.message);
        return { success: false, error: error.message };
    }
}

module.exports = { fullGhostUpload };
```

## 🚀 원클릭 실행 스크립트

### 완전 자동화 스크립트
```bash
#!/bin/bash
# auto-ghost-post.sh

TOPIC_NAME=$1
ESSAY_PATH=$2
YOUTUBE_URL=$3

if [ -z "$TOPIC_NAME" ] || [ -z "$ESSAY_PATH" ]; then
    echo "사용법: ./auto-ghost-post.sh [주제명] [에세이파일경로] [YouTube URL(선택)]"
    exit 1
fi

echo "🚀 Ghost 포스팅 자동화 시작: $TOPIC_NAME"

# 1. 작업 디렉토리 생성
mkdir -p "contents/$TOPIC_NAME"
cd "contents/$TOPIC_NAME"

# 2. Ghost SEO 최적화
echo "📝 Ghost SEO 최적화 중..."
claude-code task ghost-seo-optimizer "다음 블로그 글을 Ghost CMS에 최적화해주세요: $ESSAY_PATH"

# 3. Feature Image 생성
echo "🎨 Feature Image 생성 중..."
python3 ../../gemini-image-generator.py "$TOPIC_NAME"

# 4. Ghost 업로드
echo "📤 Ghost 업로드 중..."
node ../../ghost-auto-upload.js ghost-optimized.json *-feature.png "$YOUTUBE_URL"

echo "🎉 완료! Ghost 관리자에서 draft 상태 확인 후 발행하세요."
```

## 📋 체크리스트 템플릿

### 포스팅 전 체크리스트
```markdown
- [ ] 원본 에세이 작성 완료
- [ ] .env 파일에 API 키 설정 완료
- [ ] YouTube URL 확인 (있는 경우)
- [ ] 주제명과 slug 중복 확인
```

### SEO 최적화 체크리스트
```markdown
- [ ] 메타 제목 60자 이내
- [ ] 메타 설명 150자 이내  
- [ ] 타겟 키워드 포함
- [ ] 내부 링크 전략 반영
- [ ] 구조화된 데이터 포함
```

### 이미지 체크리스트
```markdown
- [ ] 16:9 비율 준수
- [ ] 1024x576 이상 해상도
- [ ] IMI WORK 브랜드 톤 반영
- [ ] 미니멀 디자인 적용
- [ ] 파일명 SEO 친화적 작성
```

## 🔧 고급 설정

### YouTube 임베드 최적화
```html
<!-- HTML 템플릿에 추가할 YouTube 임베드 코드 -->
<div class="video-container responsive-embed">
    <iframe 
        width="100%" 
        height="400" 
        src="https://www.youtube.com/embed/VIDEO_ID" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" 
        allowfullscreen
        loading="lazy">
    </iframe>
</div>
```

### Slug 자동 생성 규칙
```javascript
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^가-힣a-z0-9\s-]/g, '') // 한글, 영문, 숫자, 공백, 하이픈만 허용
        .replace(/\s+/g, '-') // 공백을 하이픈으로
        .replace(/-+/g, '-') // 연속 하이픈 정리
        .trim('-'); // 앞뒤 하이픈 제거
}
```

## 📊 성과 측정

### 자동 생성 메트릭
```javascript
// 포스트 성과 자동 추적
const metrics = {
    publishedAt: new Date(),
    wordCount: postData.html.replace(/<[^>]*>/g, '').split(' ').length,
    imageCount: (postData.html.match(/<img/g) || []).length,
    videoCount: (postData.html.match(/<iframe.*youtube/g) || []).length,
    internalLinks: (postData.html.match(/<a.*href="https:\/\/blog\.imiwork\.com/g) || []).length
};
```

## 🚨 문제 해결

### 자주 발생하는 오류
1. **API 키 에러**: `.env` 파일 확인
2. **이미지 업로드 실패**: 파일 경로와 권한 확인
3. **Slug 중복**: Ghost 관리자에서 기존 포스트 확인
4. **YouTube 임베드 실패**: Video ID 추출 로직 확인

### 디버깅 모드
```bash
# 상세 로그와 함께 실행
DEBUG=true ./auto-ghost-post.sh topic-name essay.md youtube-url
```

---

## 📞 사용법 요약

```bash
# 기본 사용법
./auto-ghost-post.sh "ai-literacy-gap" "/path/to/essay.md"

# YouTube 포함
./auto-ghost-post.sh "ai-literacy-gap" "/path/to/essay.md" "https://youtu.be/9v_mwoi9Q4Q"
```

이 워크플로우를 따르면 에세이 작성부터 Ghost 발행까지 **5분 이내**에 완료할 수 있습니다.