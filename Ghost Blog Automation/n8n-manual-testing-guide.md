# n8n 워크플로우 수동 테스트 가이드

## 🎯 Enhanced Ghost Blog Automation 테스트 순서

### 1️⃣ **워크플로우 임포트**

1. **n8n 접속**: 사파리에서 `localhost:5678` 열기
2. **워크플로우 임포트**:
   - `Import from File` 클릭
   - `enhanced-ghost-workflow.json` 선택
   - `Import` 버튼 클릭

### 2️⃣ **자격 증명 설정**

#### **Telegram Bot API**
```
Node: Telegram Trigger
Credential Type: Telegram Api
Bot Token: [Your Bot Token]
```

#### **OpenAI API**
```
Node: Enhanced AI Content Analyzer, Generate Feature Image, Generate Inline Image
Credential Type: OpenAi Api
API Key: [Your OpenAI API Key]
```

#### **Notion API**
```
Node: Create Notion Page, Check Duplicate Slug, Update Notion Success
Credential Type: Notion Api
Integration Token: [Your Notion Token]
Database ID: [Your Database ID]
```

#### **Ghost Admin API**
```
Node: Create Enhanced Ghost Post
Credential Type: Ghost Admin Api
URL: https://blog.imiwork.com
Admin API Key: [Your Ghost API Key]
```

### 3️⃣ **워크플로우 구조 확인**

#### **주요 플로우**
```
Telegram → Validation → Duplicate Check → AI Analysis → Notion → Feature Image → 
Inline Images (조건부) → Ghost Creation → Success Notification
```

#### **에러 플로우**
```
각 단계 실패 시 → Error Message → Telegram 알림
```

### 4️⃣ **테스트 데이터 준비**

#### **테스트 메시지 예시**
```
/post 안녕하세요! 이것은 테스트 블로그 포스트입니다. 

## 소개
이 글은 n8n 워크플로우가 제대로 작동하는지 확인하기 위한 테스트 콘텐츠입니다.

## 주요 내용
- 자동화된 블로그 생성
- AI를 활용한 메타데이터 추출
- 다중 이미지 생성 및 배치
- Ghost CMS 연동

## 결론
모든 기능이 정상적으로 작동한다면 성공입니다!

이 테스트 콘텐츠는 약 500자 정도로 최소 요구사항인 100자를 초과하며, AI가 분석하기에 충분한 구조를 가지고 있습니다.
```

### 5️⃣ **단계별 테스트 체크리스트**

#### **✅ Telegram 트리거 테스트**
- [ ] 텔레그램 봇이 메시지를 수신하는가?
- [ ] `/post` 명령어가 인식되는가?
- [ ] 메시지가 n8n으로 전달되는가?

#### **✅ 콘텐츠 검증 테스트**
- [ ] 100자 미만 콘텐츠가 거부되는가?
- [ ] 50,000자 초과 콘텐츠가 거부되는가?
- [ ] 적정 길이 콘텐츠가 통과되는가?

#### **✅ 중복 체크 테스트**
- [ ] Notion 데이터베이스 연결이 정상인가?
- [ ] 중복 슬러그 감지가 작동하는가?
- [ ] 새로운 슬러그가 통과되는가?

#### **✅ AI 분석 테스트**
- [ ] OpenAI API 연결이 정상인가?
- [ ] 메타데이터가 올바르게 추출되는가?
- [ ] 인라인 이미지 프롬프트가 생성되는가?

#### **✅ Notion 생성 테스트**
- [ ] Notion 페이지가 생성되는가?
- [ ] 메타데이터가 올바르게 저장되는가?
- [ ] 긴 콘텐츠 분할이 작동하는가?

#### **✅ 이미지 생성 테스트**
- [ ] Feature Image가 생성되는가?
- [ ] 인라인 이미지들이 생성되는가?
- [ ] DALL-E 3 API 한도는 충분한가?

#### **✅ Ghost 포스트 생성 테스트**
- [ ] Ghost API 연결이 정상인가?
- [ ] 이미지가 HTML에 삽입되는가?
- [ ] Draft 상태로 포스트가 생성되는가?

#### **✅ 알림 테스트**
- [ ] 성공 시 텔레그램 알림이 오는가?
- [ ] 에러 시 적절한 메시지가 오는가?
- [ ] Ghost 링크가 올바른가?

### 6️⃣ **일반적인 오류 및 해결책**

#### **🔧 API 연결 오류**
```
문제: "Failed to connect to API"
해결: 자격 증명 재설정, 네트워크 확인
```

#### **🔧 Notion 데이터베이스 오류**
```
문제: "Database not found"
해결: Database ID 확인, 권한 설정 점검
```

#### **🔧 이미지 생성 실패**
```
문제: "Image generation failed"
해결: OpenAI API 크레딧 확인, 프롬프트 길이 조정
```

#### **🔧 Ghost 포스트 생성 실패**
```
문제: "Post creation failed"
해결: Ghost API 키 확인, URL 설정 점검
```

### 7️⃣ **성능 모니터링**

#### **실행 시간 목표**
- 기본 워크플로우: 30-60초
- 다중 이미지 포함: 2-4분
- 에러 처리: 5-10초

#### **API 비용 예상**
- GPT-4 분석: ~$0.05
- DALL-E 3 이미지 (5개): ~$0.20
- 총 예상 비용: ~$0.25/포스트

### 8️⃣ **최종 검증**

#### **성공 기준**
- [ ] 텔레그램에서 Ghost까지 전체 플로우 완료
- [ ] 모든 이미지가 올바르게 생성 및 배치
- [ ] Ghost에서 완성된 포스트 확인
- [ ] 메타데이터 및 SEO 설정 적용

#### **완성된 포스트 확인사항**
- [ ] 제목 및 슬러그 정확성
- [ ] Feature Image 표시
- [ ] 인라인 이미지 배치
- [ ] 메타 태그 설정
- [ ] 태그 및 카테고리 적용

## 🎉 **테스트 완료 후**

모든 테스트가 성공적으로 완료되면:
1. 워크플로우를 활성화
2. 실제 콘텐츠로 최종 테스트
3. 정기적인 모니터링 설정

**Happy Automation!** 🚀