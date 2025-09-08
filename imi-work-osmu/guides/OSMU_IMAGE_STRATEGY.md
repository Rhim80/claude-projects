# OSMU 이미지 전략 가이드

> Ghost 블로그 콘텐츠를 네이버 블로그, 인스타그램, 기타 플랫폼으로 확장하기 위한 이미지 활용 전략

## 📁 이미지 저장 구조

```
imi-work-osmu/assets/images/
├── feature-images/          # Ghost 블로그 피처 이미지 (1200x630)
│   ├── ai-literacy-gap-feature.png
│   └── [slug]-feature.png
├── blog-images/             # 본문 삽입용 이미지 (800x450)
│   ├── [slug]-inline-1.png
│   └── [slug]-diagram.png
└── social-images/           # SNS 최적화 이미지 (1080x1080, 1080x1350)
    ├── [slug]-instagram.png
    ├── [slug]-facebook.png
    └── [slug]-threads.png
```

## 🎨 이미지 사양별 용도

### 1. Feature Images (1200x630)
- **용도**: Ghost 블로그 피처 이미지, 네이버 블로그 대표 이미지
- **사양**: 1200x630px, PNG/JPG, 최대 500KB
- **특징**: 
  - IMI WORK 브랜드 아이덴티티 반영
  - 글 제목의 핵심 키워드 포함
  - 미니멀하고 전문적인 디자인
- **생성 프롬프트**: Gemini 2.5 Flash Image API 활용

### 2. Blog Images (800x450)  
- **용도**: 네이버 블로그 본문 삽입, Ghost 블로그 본문 이미지
- **사양**: 800x450px, PNG/JPG, 최대 300KB
- **특징**:
  - 글 내용과 직접 연관된 시각적 설명
  - 인포그래픽, 도표, 개념도 등
  - 네이버 블로그 가독성 최적화

### 3. Social Images (1080x1080, 1080x1350)
- **용도**: 인스타그램, 페이스북, 쓰레드 등 SNS 플랫폼
- **사양**: 
  - 정사각형: 1080x1080px (인스타그램 피드)
  - 세로형: 1080x1350px (인스타그램 스토리)
- **특징**:
  - 모바일 최적화 텍스트 크기
  - 강렬한 컬러와 임팩트
  - 브랜드 로고/워터마크 포함

## 🤖 자동 이미지 생성 워크플로우

### Gemini 프롬프트 템플릿

#### Feature Image 생성
```
Create a professional feature image for a blog post about "[TOPIC]".

Style Requirements:
- Clean, modern, minimalist design
- Professional color scheme (navy blue #1e3a8a, white, light gray)
- IMI WORK brand identity
- Korean and English text combination
- 1200x630 pixels aspect ratio

Content:
- Main title: "[BLOG_TITLE]" (Korean)
- Subtitle: "SENSE & AI Blog" 
- Visual metaphor related to: [CORE_CONCEPT]
- Include subtle geometric elements or abstract shapes
- No stock photos or cliché business imagery

Brand Elements:
- IMI WORK logo/text in bottom right corner
- Consistent with professional consulting brand
- Target audience: Business professionals and entrepreneurs
```

#### Social Media Image 생성
```
Create an Instagram-optimized image for "[TOPIC]".

Style Requirements:
- Bold, eye-catching design optimized for mobile
- Square format (1080x1080)
- High contrast colors for small screen visibility
- Modern typography with clear hierarchy

Content:
- Hook text: "[INSTAGRAM_HOOK]" (Korean)
- Key insight: "[MAIN_TAKEAWAY]"
- Brand identifier: "@imi_work"
- Relevant emoji or icon
- Call-to-action element

Visual Style:
- Vibrant but professional color palette
- Clean background with subtle texture
- Easy to read on mobile devices
- Shareable and engaging aesthetic
```

## 📋 OSMU 이미지 체크리스트

### Ghost 블로그 발행 시
- [ ] Feature image 생성 (1200x630)
- [ ] `assets/images/feature-images/`에 저장
- [ ] Ghost CMS 업로드 및 설정
- [ ] 파일명 규칙: `[slug]-feature.png`

### 네이버 블로그 OSMU 시
- [ ] Feature image를 대표 이미지로 활용
- [ ] 필요시 본문용 추가 이미지 생성 (800x450)
- [ ] 네이버 에디터 최적화 확인
- [ ] 이미지 alt 텍스트 한글 설정

### 인스타그램 OSMU 시  
- [ ] 정사각형 이미지 생성 (1080x1080)
- [ ] 핵심 메시지를 시각적으로 강조
- [ ] 해시태그 전략과 연계된 디자인
- [ ] 스토리용 세로 이미지도 고려 (1080x1350)

## 🔧 자동화 개선 방안

### 현재 워크플로우 개선점
1. **이미지 자동 저장**: Ghost 업로드 후 로컬 assets 폴더에도 자동 저장
2. **다양한 사이즈 생성**: 하나의 컨셉으로 여러 사이즈 자동 생성
3. **브랜드 일관성**: 템플릿 기반 자동 브랜딩 요소 삽입
4. **OSMU 패키지**: 글 하나당 필요한 모든 이미지를 세트로 생성

### Ghost 자동화 스크립트 개선
```javascript
// ghost-with-osmu-images.js
async function publishWithOSMUImages(content, slug) {
  // 1. Feature image 생성
  const featureImage = await generateImage('feature', content.title, content.summary);
  
  // 2. 로컬 저장
  await saveImage(featureImage, `assets/images/feature-images/${slug}-feature.png`);
  
  // 3. Ghost 업로드
  const uploadedImage = await ghostAPI.images.upload(featureImage);
  
  // 4. OSMU용 추가 이미지 생성 (선택사항)
  if (content.createSocialImages) {
    const socialImage = await generateImage('social', content.title, content.hook);
    await saveImage(socialImage, `assets/images/social-images/${slug}-instagram.png`);
  }
  
  // 5. Ghost 포스트 생성
  const post = await ghostAPI.posts.add({
    ...content,
    feature_image: uploadedImage.url
  });
  
  return post;
}
```

## 📊 이미지 성과 측정

### 추적할 메트릭
- **브랜드 일관성**: 시각적 아이덴티티 점수
- **플랫폼별 성과**: 각 플랫폼에서의 이미지 반응도
- **OSMU 효율성**: 하나의 이미지로 여러 플랫폼 활용도
- **생성 시간**: 자동화를 통한 시간 절약 효과

### 최적화 포인트
- **A/B 테스트**: 다양한 이미지 스타일 실험
- **플랫폼 맞춤화**: 각 플랫폼 특성에 맞는 최적화
- **SEO 효과**: 이미지가 검색 노출에 미치는 영향
- **브랜드 인지도**: 일관된 이미지 사용의 브랜딩 효과

---

*"하나의 콘텐츠, 여러 플랫폼. 체계적인 이미지 관리로 OSMU 효율성을 극대화한다."*