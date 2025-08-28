# CLAUDE.md - YouTube 블로그 자동화 프로젝트

> 이미커피 대표 hovoo의 YouTube RSS Bot 블로그 자동화 시스템

## 📋 프로젝트 개요

### 목표
YouTube RSS Bot에서 수집한 영상을 이미커피 대표 hovoo의 페르소나가 담긴 블로그 글로 자동 변환하여 Ghost 블로그에 포스팅

### 핵심 기능
```
YouTube 영상 → 자막 추출 → AI 블로그 생성 → SEO 최적화 → Ghost 포스팅 → Telegram 알림
```

## 🎯 사용자 프로필 (이미커피 대표 hovoo)

### 핵심 정체성
- **이름**: hovoo (이미커피 대표)
- **경력**: 15년차 F&B 브랜딩 및 운영 전문가  
- **현재**: 카페 4개 매장 + 베이커리 운영
- **전문성**: 오프라인 비즈니스 × AI 자동화 융합

### 브랜딩 컨텍스트
- **브랜드**: 이미커피 (imi coffee)
- **도메인**: blog.imiwork.com
- **포지셔닝**: AI 활용 F&B 브랜딩 전문가
- **타겟**: 자영업자, 소상공인, AI 관심있는 사업자

### AI 전문성
- **커뮤니티**: GPTers 스터디장 ("AI 감성 브랜딩 시스템")
- **자동화**: n8n 워크플로우 7개 운영 (급여, 이메일, 영수증, YouTube RSS, 블로그 자동화)
- **강의**: 자영업자 대상 AI 실무 활용법 교육
- **도구**: GPT-4, Claude, Gemini 2.0 Flash 유료 구독

## 🛠 기술 스택

### 현재 인프라
```
미니PC (Windows) + Docker
├── n8n (n8n.imiwork.com) - 자동화 엔진
├── Ghost 블로그 (blog.imiwork.com) - 타겟 플랫폼
├── Notion - 데이터베이스 및 관리
└── Telegram - 알림 및 인터랙션
```

### n8n 워크플로우 구조 (현재 운영 중)
```
워크플로우 1: YouTube RSS Bot (수집 시스템)
├── RSS 트리거 (9개 채널, 시간당 폴링)
│   ├── 시민개발자 구씨, Lenny's Podcast, 언더스텐딩딩, 디자인하는AI
│   └── a16z, Big Think, GaryVee, Startup Grind, Ali Abdaal, CMI Content
├── 필드 정리 (Edit Fields)
├── YouTube Transcript (자막 추출)
├── Basic LLM Chain + Gemini 2.0 (800자 요약)
├── Notion 저장 (YouTube 수집 DB)
├── Telegram 알림 (인터랙티브 버튼)
└── Telegram Callback 처리 (블로그 생성 트리거)

워크플로우 2: YouTube Blog Complete Final (블로그 생성)
├── Webhook Trigger (youtube-blog-complete-final)
├── Notion 페이지 정보 조회
├── YouTube 정보 추출 (videoId 파싱)
├── YouTube Transcript 재추출
├── hovoo 페르소나 블로그 생성 (Gemini 2.0, 4000토큰)
├── SEO 메타데이터 최적화 (별도 Gemini 모델)
├── JSON 파싱 및 검증
├── Notion 블로그 DB 저장
├── Telegram 성공 알림
└── Webhook 응답 반환
```

## 📝 콘텐츠 전략

### 블로그 글 작성 페르소나
**화자**: 이미커피 대표 hovoo
**스타일**: 
- 15년 카페 운영 경험 기반의 실무적 통찰
- 오프라인 비즈니스 × AI 융합 관점
- 자영업자/소상공인을 위한 실용적 조언
- 친근하지만 전문적인 어투

### 콘텐츠 구조화
```markdown
# SEO 최적화 제목 (이미커피 브랜드 키워드 포함)

## 인트로 
"15년 카페를 운영하며 느낀..." 식으로 경험 기반 시작

## 본문
영상 내용 + 본인 경험 융합하여 재해석

## 실전 팁
F&B/AI 관점에서의 구체적 실행 방법

## 결론
독자의 비즈니스 성장을 위한 행동 유도
```

## 🔧 시스템 성능 분석

### ✅ 구축 완료 기능
- **hovoo 페르소나 강화**: 15년 F&B 경험 기반 블로그 생성 완료
- **SEO 최적화**: 메타데이터, 태그, 슬러그 자동 생성
- **9개 채널 RSS 수집**: 자동 수집 및 800자 요약
- **Telegram 인터랙티브**: 사용자 선택적 블로그 생성
- **이중 DB 구조**: 수집용 DB + 블로그용 DB 분리 완료
- **에러 처리**: JSON 파싱 실패 시 안전 기본값 처리

### 🟡 성능 이슈 및 개선점
- **자막 중복 추출**: 동일 영상 자막을 두 번 처리 (비효율)
- **Ghost 연동 부재**: Notion에만 저장, 실제 블로그 미포스팅
- **YouTube 정보 추출**: property 매핑 불안정 (수정 필요)
- **에러 복구**: 일부 API 실패 케이스 재시도 로직 부족

### 🎯 최적화 우선순위
1. **Ghost API 연동** - 블로그 자동 포스팅 (가장 높은 임팩트)
2. **자막 재사용** - 첫 워크플로우 자막을 Notion 저장 후 재활용
3. **워크플로우 통합** - 두 워크플로우를 하나로 통합 검토
4. **콘텐츠 품질 검증** - 최소 글자 수, 완성도 체크 로직

## 🎨 SEO 전략

### 브랜드 키워드 전략
**핵심 태그**: `이미커피`, `hovoo`, `카페운영`, `AI자동화`, `소상공인`

### 제목 패턴
```
- "카페사장이 말하는 [주제] 실무 활용법 | 15년 경험담"
- "이미커피 대표가 검증한 [AI도구] 솔직 후기"  
- "[주제] 자영업자도 5분만에 만드는 방법"
```

### URL 슬러그 규칙
```
/ai-automation-[도구명]-guide-2408
/cafe-branding-[주제]-strategy-2408
/small-business-[영역]-tips-2408
```

## 📊 데이터 플로우

### 입력 데이터
```json
{
  "pageId": "notion_page_id",
  "videoId": "youtube_video_id", 
  "chatId": "telegram_chat_id",
  "triggeredBy": "telegram"
}
```

### 출력 데이터
```json
{
  "ghost_post_id": "ghost_post_id",
  "blog_url": "https://blog.imiwork.com/slug/",
  "notion_page_id": "updated_notion_id",
  "telegram_sent": true
}
```

## ⚙️ 환경 변수 및 설정

### 운영 중인 크리덴셜
- **Notion API**: kCKFfrau35Gf4PvW (양쪽 워크플로우 공통 사용)
- **Gemini API**: SO4eLSfcE2Z5kkss (AI 모델 2개 - 요약/블로그/SEO)
- **Telegram Bot**: hIo5i77YKdu9Rs8g (알림 및 인터랙티브 UI)
- **YouTube Transcript**: n8n-bandi-youtube-transcript 커뮤니티 노드

### 추가 필요 크리덴셜
- **Ghost Admin API**: blog.imiwork.com 자동 포스팅용 (Phase 1 목표)

### Notion 데이터베이스
- **YouTube 수집 DB**: 23fd0f53-623d-81fe-a9cb-fda36d562a91
- **블로그 DB**: 251d0f53623d8158b023d994a1e58122

## 🚀 배포 및 운영

### 웹훅 엔드포인트
```
POST /webhook-test/youtube-blog-complete-final
Host: n8n.imiwork.com
```

### 모니터링
- n8n 실행 로그 확인
- Telegram 알림을 통한 성공/실패 추적  
- Ghost 블로그 포스트 발행 확인

## 📋 품질 관리

### 콘텐츠 품질 기준
- 최소 2500자 이상의 완성된 글
- 이미커피 브랜드 일관성 유지
- SEO 최적화 메타데이터 포함
- 실무 경험 기반의 가치 있는 통찰

### 에러 처리
- JSON 파싱 실패 시 기본값 처리
- API 호출 실패 시 재시도 로직
- 텔레그램 에러 알림 발송

## 🛠 개발 가이드라인

### n8n 워크플로우 개발 필수 사항
**⚠️ 중요: n8n 워크플로우 작업 시 반드시 준수해야 할 원칙**

1. **n8n 서브에이전트 의무 사용**
   - 모든 n8n 워크플로우 설계, 구축, 수정 작업 시 `n8n-workflow-builder` 서브에이전트 활용 필수
   - 단순 코드 수정이 아닌 전체 워크플로우 아키텍처 설계부터 배포까지 체계적 접근

2. **Context7 MCP 문서 참조**
   - n8n 관련 최신 문서 및 모범 사례는 Context7 MCP를 통해 확인
   - 새로운 노드 추가, API 연동, 에러 처리 패턴 등 업데이트된 가이드 활용
   - 예시: `resolve-library-id` → `get-library-docs` 순서로 n8n 공식 문서 참조

3. **체계적 워크플로우 개발 프로세스**
   ```
   1단계: 요구사항 분석 (서브에이전트)
   2단계: Context7에서 n8n 최신 문서 확인
   3단계: 워크플로우 설계 및 노드 구성
   4단계: 테스트 및 검증
   5단계: 배포 및 모니터링 설정
   ```

4. **에러 처리 및 최적화**
   - 모든 API 호출에 재시도 로직 구현
   - 데이터 검증 및 폴백 메커니즘 필수
   - 성능 모니터링 및 로깅 체계 구축

### 개발 시 금지사항
- ❌ n8n 서브에이전트 없이 워크플로우 직접 수정
- ❌ 오래된 문서나 추측에 의존한 노드 구성
- ❌ 에러 처리 없는 API 호출 체인 구축
- ❌ 테스트 없는 프로덕션 배포

## 🚀 다음 단계 로드맵

### Phase 1: Ghost 블로그 연동 (최우선)
- **목표**: Notion 저장된 블로그 글을 Ghost CMS 자동 포스팅
- **개발 방식**: 
  - `n8n-workflow-builder` 서브에이전트 활용 필수
  - Context7 MCP에서 Ghost API 최신 문서 확인
- **필요 작업**:
  - Ghost Admin API 키 발급 및 설정
  - Ghost 포스트 생성 노드 추가 (서브에이전트 통해)
  - 이미지 업로드 및 Featured Image 설정
  - 태그 매핑 및 카테고리 설정
- **예상 완료**: 1-2일

### Phase 2: 성능 최적화
- **자막 중복 제거**: 첫 워크플로우에서 자막을 Notion에 저장, 재사용
- **YouTube 정보 추출 안정화**: property 매핑 로직 개선
- **에러 처리 강화**: API 실패 시 재시도 메커니즘 추가
- **예상 완료**: 2-3일

### Phase 3: 콘텐츠 품질 향상
- **품질 검증 로직**: 최소 글자 수, 완성도 체크
- **A/B 테스트**: 다양한 프롬프트 패턴 실험
- **독자 피드백 수집**: 블로그 글 품질 개선 사이클
- **예상 완료**: 1주

### Phase 4: 확장 기능 (선택사항)
- **다중 채널 지원**: 포스트 자동 배포 (LinkedIn, Medium 등)
- **콘텐츠 스케줄링**: 최적 시간대 자동 발행
- **분석 대시보드**: 성과 추적 및 인사이트 제공

## 🔄 업데이트 이력
- **2025.08.24**: YouTube 블로그 자동화 프로젝트 독립 생성
- **2025.08.25**: hovoo 페르소나 강화 및 SEO 최적화 완료
- **2025.08.25**: 이중 워크플로우 구조 완성 (수집 + 블로그 생성)
- **2025.08.25**: n8n 개발 가이드라인 추가 (서브에이전트 + Context7 MCP 의무화)
- **진행 중**: Ghost CMS 연동 준비

---

*"YouTube에서 얻은 인사이트를 이미커피 대표의 15년 경험으로 재해석하여, 자영업자들에게 실질적 가치를 제공하는 블로그 콘텐츠 자동화"*