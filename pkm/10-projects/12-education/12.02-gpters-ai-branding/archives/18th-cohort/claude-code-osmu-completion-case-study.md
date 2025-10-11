# [Claude Code] IMI WORK OSMU 완성기 - 브랜딩 아카이빙 자동화를 위한 여정

🎯 **도입: 브랜딩 스터디장이 되면서 시작된 도전**

GPTers 브랜딩 스터디장을 맡게 되었다.
4주간 진행되는 스터디를 준비하면서 생각했다.
일단 우리 스터디는 입문이지만,

claude code 공부도 할겸 claude code 버전의 branding system 도 만들어 보자고...

"테스트를 위해 우선 내가 직접 새로운 브랜드를 만들어보자.
그리고 그 과정을 Claude Code로 시스템화해보자."

오랫동안 내 브랜드를 운영하며 깨달은 것이 있다.
브랜딩의 기본은 아카이빙이다.
브랜드의 철학, 톤앤매너, 콘텐츠를 일관되게 축적하고 관리하는 것. 그런데 이게 생각보다 어렵다.
특히 여러 플랫폼에 콘텐츠를 올려야 하는 시대에는 더욱 그렇다.

그래서 결정했다. Claude Code로 아카이빙을 쉽게 만드는 시스템을 구축하기로.

## 📋 **목표: IMI WORK 브랜드 OSMU 시스템**

브랜드 정체성 정립은 브랜딩 1회차때 공유한 GPTs system을 이용.

**브랜드명**: IMI WORK
**블로그명**: SENSE & AI
**포지셔닝**: 15년차 자영업자 출신 기획자 + AI 적극 활용자

**초기 시스템 목표**

- n8n으로 수집한 YouTube 콘텐츠를 IMI WORK 페르소나로 변환
- Ghost 블로그, 네이버 블로그, Instagram에 동시 배포
- 브랜드 일관성 100% 유지

## ⚡ **1단계: YouTube to Blog 자동화 시작**

처음 워크플로우는 다음과 같았다.

**기존 n8n YouTube RSS Bot** (이미 운영 중인 개인용 자동화)

다양한 유형의 정보를 보여주는 마인드 맵
ALT
↓

이걸 통해 좋은 콘텐츠 발견

전화에 한국 문자 메시지의 스크린 샷
ALT
↓

IMI WORK 페르소나로 재해석

한국 개인 가이드의 스크린 샷
ALT
↓

Ghost 블로그 자동 포스팅

한국어 웹 사이트의 스크린 샷
ALT
초기 설계

### **첫 번째 시도: 하나의 에이전트가 모든 걸 처리**

imi-work-youtube-blogger 서브 에이전트는

```javascript
// 첫 번째 시도: 하나의 에이전트가 모든 걸 처리
const workflow = {
  1: "YouTube 메타데이터 추출",
  2: "자막 다운로드 및 분석",
  3: "IMI WORK 브랜드 톤 적용",
  4: "이미지 생성",
  5: "Ghost 포스팅"
}
```

처음엔 잘 돌아가는 것 같았다. 하지만...

## 🔥 **첫 번째 벽: 하나의 에이전트가 모든 걸 할 때**

**문제 상황**:

- imi-work-youtube-blogger 에이전트가 너무 많은 일을 함
- 콘텐츠 작성 + 이미지 생성 + Ghost 발행 + SEO 최적화
- 결과: 에이전트가 무거워지고 좋은 결과물이 나오지 않음.

**실제 겪은 문제**

```javascript
// 에이전트가 처리해야 할 일들
const agentTasks = {
  content: "YouTube 분석 및 브랜드 콘텐츠 작성",
  images: "Gemini API로 이미지 6종 생성",  // 너무 무거움
  ghost: "Ghost Admin API 연동 및 발행",
  seo: "메타데이터 최적화",
  error: "각 단계별 오류 처리"  // 복잡도 폭발
}
```

Claude Code 의 핵심중 하나는 Sub Agents 라고 생각한다.

얼마나 워크플로우를 잘 고민하고 그에 맞게 일을 잘 분해하는게 핵심이다.

AI는 만능이 아니다 긴 콘텍스트를 전달했을때 모든걸 완벽하게 처리해주지 못한다.

하지만 초기에는 그걸 제대로 이해하지 못했다.

## 🛠️ **해결책 1: 서브에이전트 분업 체계**

파이썬 스크립트의 스크린 샷
ALT

고민 끝에 깨달았다. 각자 잘하는 일을 나눠서 하자.

**개선된 구조**:

**1. imi-work-persona-writer**
└── YouTube 분석 + 브랜드 콘텐츠 작성만

```
⏺ 🤖 imi-work-persona-writer 서브에이전트 상세 워크플로우

1. 입력 분석 단계

🎯 소스 유형 판별
├── YouTube URL → YouTube Data API v3 활용
│   ├── 메타데이터 추출 (제목, 설명, 채널, 발행일)
│   ├── 썸네일 URL 수집
│   └── 자막/스크립트 (사용자 보완 입력)
├── 아티클/블로그 → 핵심 개념 및 논점 파악
├── 일상 경험 → 비즈니스 상황, 개인 성찰 구조화
└── 기타 콘텐츠 → 책, 팟캐스트, 연구자료 분석

2. IMI WORK 관점 변환

💡 "일을 잘한다" 철학 적용
├── 문제 설정 관점으로 재해석
├── 감각과 AI 두 축의 균형 분석
├── ESSENTIAL/THOUGHTFUL/PRACTICAL 등 6가지 핵심 가치 선별적 반영
└── 브랜딩 전문가 + 자영업자 모두를 위한 실용적 통찰 제공

3.4.5....
```

**2. osmu-image-generator** (신규)
└── 모든 플랫폼용 이미지 한 번에 생성

```
🎨 osmu-image-generator 서브에이전트 상세 워크플로우

1️⃣ 입력 단계

📥 콘텐츠 정보 수신
├── 콘텐츠 제목 (블로그 글 제목)
├── 핵심 메시지/요약 (글의 주요 인사이트)
├── slug (URL 친화적 식별자)
├── 타겟 키워드
└── 브랜드 톤앤매너

2️⃣ Gemini 2.5 Flash 이미지 생성 엔진

🤖 AI 이미지 생성 처리
├── Gemini 2.5 Flash Image Preview 모델 사용
├── 플랫폼별 맞춤 프롬프트 생성
├── 콘텐츠 적응형 색상 팔레트 (브랜드 제약 해제)
└── 총 6종류 이미지 병렬 생성

3️⃣ 다중 플랫폼 이미지 사양 > 4.5.6.7.
```

**3. ghost-auto-publisher**
└── Ghost SEO + 발행만 전담

```
⏺ 👻 ghost-auto-publisher 서브에이전트 상세 워크플로우

1. 입력 단계

📥 콘텐츠 및 이미지 패키지 수신
├── 마크다운 블로그 글 (imi-work-persona-writer에서)
├── image-manifest.json (osmu-image-generator에서)
├── slug 기반 이미지 디렉토리
└── SEO 메타데이터 (제목, 설명, 태그)

2. OSMU 이미지 패키지 로딩

🖼️ 이미지 패키지 처리
├── image-manifest.json 파싱
├── Ghost 전용 이미지 경로 추출
│   ├── feature.png (1200x630) - 피처 이미지
│   ├── content-1.png (800x450) - 본문 이미지 1
│   └── content-2.png (800x450) - 본문 이미지 2
└── 이미지 파일 존재 여부 검증

3. Ghost Admin API 연동

🔐 인증 및 API 준비
├── Ghost Admin API 키 로드 (.env)
├── JWT 토큰 생성 (시간 동기화 처리)
├── API Base URL 설정 (blog.imiwork.com)
└── 헤더 및 권한 설정

4.5.6.7.8......
```

## 🔥 **두 번째 벽: 이미지 관리의 혼돈**

플랫폼마다 이미지 사양이 달랐다.

- **Ghost**: 1200x630 (Feature) + 800x450 (Content)
- **네이버**: 800x450 (Main) + 800x450 (Body)
- **Instagram**: 1080x1080 (Feed) + 1080x1350 (Feed2)

처음엔 각 에이전트가 각자 이미지를 생성했다. 결과는? 카오스.

```javascript
// 문제가 된 구조
ghost-publisher: "Ghost용 이미지 2개 생성"
naver-writer: "네이버용 이미지 3개 또 생성"
instagram-optimizer: "인스타용 이미지 2개 또또 생성"
```

## 🛠️ **해결책 2: OSMU 이미지 중앙화**

**slug 기반 통합 관리 시스템 도입**

```
imi-work-osmu/assets/images/
└── ai-literacy-gap/              # 콘텐츠별 폴더
    ├── ghost/
    │   ├── feature.png           # 1200x630
    │   └── content-1.png         # 800x450
    ├── naver/
    │   ├── main.png              # 800x450
    │   └── body-1.png            # 800x450
    ├── instagram/
    │   ├── feed.png              # 1080x1080
    │   └── feed2.png             # 1080x1350
    └── image-manifest.json       # 메타데이터
```

**image-manifest.json 구조**

```json
{
  "slug": "ai-literacy-gap",
  "title": "AI 리터러시 격차, 4개월이면 충분할까?",
  "created_at": "2025-09-08T10:00:00Z",
  "platforms": {
    "ghost": {
      "feature": "ghost/feature.png",
      "content": ["ghost/content-1.png"]
    },
    "naver": {
      "main": "naver/main.png",
      "body": ["naver/body-1.png"]
    },
    "instagram": {
      "feed": "instagram/feed.png",
      "story": "instagram/story.png"
    }
  }
}
```

## 🔥 **세 번째 벽: 브랜드 일관성 유지**

각 플랫폼마다 글쓰기 및 SEO 스타일이 달라야 했다.

- **Ghost**: 깊이 있는 인사이트 + 전문적 톤
- **네이버**: SEO 최적화 + 친근한 설명
- **Instagram**: 감성적 에세이 + 짧은 호흡

하지만 브랜드 정체성은 유지해야 했다. 이 균형을 어떻게?

## 🛠️ **해결책 3: IMI WORK 페르소나 시스템**

한국 프로그래밍 언어의 스크린 샷
ALT

## 🏆 **최종 완성: 실제 워크플로우**

**현재 안정화된 OSMU 시스템**

```
📺 YouTube URL 입력
   ↓
🤖 imi-work-persona-writer 실행
   ├── YouTube API로 메타데이터 추출
   ├── 자막 분석 및 핵심 포인트 정리
   └── IMI WORK 브랜드 톤으로 콘텐츠 작성
   ↓
🎨 osmu-image-generator 실행
   ├── Gemini 2.5 Flash로 이미지 생성
   ├── 6종 이미지 한 번에 생성 (Ghost/네이버/인스타)
   └── slug 기반 디렉토리 구조 생성
   ↓
📝 ghost-auto-publisher 실행
   ├── image-manifest.json 로드
   ├── Ghost Admin API 연동
   └── Draft 상태로 포스팅
   ↓
🔄 추가 플랫폼 배포 (선택)
   ├── naver-seo-writer: 네이버 최적화
   └── sns-essay-writer: 인스타 에세이
```

## 🔍 **Claude Code로 발견한 것들**

이 프로젝트는 아직 테스트 단계지만, Claude Code의 가능성을 확실히 보여줬다.

### **비개발자도 코딩이 아닌 방식으로 워크플로우를 만들 수 있다**

- 5개의 서브에이전트가 협업하는 시스템
- slug 기반 자산 관리와 메타데이터 처리
- API 연동과 파일 시스템 자동화

### **코딩보다 중요한 건 설계였다**

- 어떤 에이전트가 무슨 일을 할지 정의
- 에이전트 간 데이터를 어떻게 주고받을지 설계
- 브랜드 페르소나를 얼마나 디테일하게 만들지

### **서브에이전트 시스템이 생각보다 강력했다**

하나의 거대한 에이전트 (❌)
→ 여러 전문 서브에이전트들 (✅)

**결과**: 더 안정적, 더 유지보수 쉬움, 더 좋은 품질

## 💡 **핵심 교훈들**

### **1. 서브에이전트 개발의 교훈**

**분업의 미학이 진짜였다**

- **처음**: youtube-blogger 혼자 모든 일 처리 → 불안정, 품질 떨어짐
- **개선**: 5개 전문가로 분업 → 각자 잘하는 일만, 품질 상승
- **핵심**: 에이전트도 사람처럼 "전문성"이 중요하다

**에이전트 간 소통 표준화가 핵심**

```javascript
// 모든 에이전트가 공유하는 데이터 구조
const sharedData = {
  slug: "ai-literacy-gap",           // 콘텐츠 식별자
  manifest: "image-manifest.json",   // 이미지 정보
  brandTone: "IMI WORK 페르소나"     // 브랜드 일관성
}
```

**단일 책임 원칙(SRP) 적용**

- 한 에이전트 = 할 수 있는 정도의 일만 정리
- 디버깅 쉬워짐: 문제 생기면 어느 에이전트인지 바로 파악
- 재사용성: 다른 프로젝트에서도 개별 에이전트 활용 가능

### **2. Claude Code 활용의 교훈**

**프롬프트가 코드보다 중요한 시대**

- 좋은 코드 < 좋은 프롬프트 설계
- 페르소나 파일 하나로 브랜드 일관성 100% 유지
- 가이드 파일의 디테일이 결과물 품질 결정

**"좋은 자동화" vs "그냥 돌아가는 자동화"**

**그냥 돌아가는 자동화**:
- 일단 작동하면 OK
- 결과물 품질은 운에 맡김
- 에러 처리 대충

**좋은 자동화**:
- 브랜드 일관성 100% 보장
- 예외 상황 모두 고려
- 디테일한 가이드라인

**점진적 개선의 가치**

- **Phase 1**: 일단 돌아가게
- **Phase 2**: 품질 개선
- **Phase 3**: 안정성 확보
- **Phase 4**: 확장성 고려

### **3. 시스템 설계의 교훈**

**구조가 품질을 결정한다**

- slug 기반 관리 → 콘텐츠 아카이빙 자동화
- manifest.json → 이미지 버전 관리 체계화
- 표준화된 폴더 구조 → 확장성 확보

**작게 나누면 크게 얻는다**

- 큰 문제를 작은 단위로 분해
- 각 단위별로 완벽하게 해결
- 레고 블록처럼 조립해서 큰 시스템 완성

## 🚀 **앞으로의 계획**

### **단기: 디테일 고도화**

```javascript
const improvements = {
  prompts: "각 에이전트별 프롬프트 정교화",
  personas: "브랜드 페르소나 가이드 강화",
  errorHandling: "예외 상황 처리 보완",
  testing: "다양한 콘텐츠 타입으로 테스트"
}
```

### **중기: 확장과 재사용성**

- **서브에이전트 라이브러리**: 다른 브랜드에서도 재사용 가능한 에이전트들
- **브랜드별 페르소나 에이전트**: 각 브랜드의 톤앤매너를 학습한 전용 에이전트
- **템플릿화**: GPTers 커뮤니티에서 활용할 수 있는 템플릿 제작

### **장기: 진짜 AI 브랜딩 시스템**

```
개인 브랜드 → 회사 브랜드 → 멀티 브랜드
└── 각각의 브랜드별 전용 AI 어시스턴트
    ├── 브랜드 가이드라인 숙지
    ├── 타겟 고객 이해
    └── 플랫폼별 최적화
```

## 🎓 **마무리: Claude Code, 비개발자의 새로운 무기**

**좋은 시스템이 좋은 결과를 만든다.**

Claude Code는 바로 그 "시스템"을 만드는 도구다.
코딩을 몰라도, 복잡한 비즈니스 로직을 구현할 수 있다.

**핵심은 두 가지**:

1. **"무엇을" 자동화할 것인가** - 비즈니스 이해력
2. **"어떻게 잘" 자동화할 것인가** - 디테일의 힘

자동화를 "딸깍" 만드는 건 시작일 뿐이다.

진짜 가치는 디테일에 있다.

- 프롬프트 하나하나의 정교함
- 페르소나 가이드의 구체성

**Claude Code는 비개발자에게도 새로운 프로그래밍이다.**

코드 대신 사고를, 문법 대신 설계를, 디버깅 대신 개선을.
40대 중반 카페 사장도 할 수 있다면,
여러분도 분명 할 수 있다.

---

**"일을 잘한다는 것은, 반복되는 일을 시스템화하고 창의적인 일에 집중하는 것이다.
그리고 이제 그 시스템을, 우리가 직접 만들 수 있다."**

https://blog.imiwork.com

## Related Notes

- [[40-personal/44-reflections/learning/ab-method-philosophy]] - ai_automation 관련; 10-projects ↔ 40-personal 연결
- [[40-personal/44-reflections/learning/git-repository-study-plan]] - ai_automation 관련; 10-projects ↔ 40-personal 연결
- [[30-knowledge/36-ai-tools/36.01-claude-code/vs-gpts-comparison]] - ai_automation 관련; 10-projects ↔ 30-knowledge 연결
- [[40-personal/41-daily/2025-10-09]] - ai_automation 관련; 10-projects ↔ 40-personal 연결
- [[30-knowledge/34-learning/북토크-강연-오프라인-비즈니스-생존기]] - ai_automation 관련; 10-projects ↔ 30-knowledge 연결
