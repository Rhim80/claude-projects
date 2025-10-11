# 13-imi-work - IMI WORK 브랜드 프로젝트

> "일을 잘한다는 것"에 대한 통찰을 전하는 SENSE & AI 블로그 운영

## 📋 브랜드 정체성

**브랜드명**: IMI WORK
**블로그명**: SENSE & AI
**블로그 설명**: "인간을 이해하는 감각과 AI로 멋진 일을 만드는 이야기"

**포지셔닝**:
- 15년차 자영업자 출신 기획자 + AI를 진짜 중요하게 생각하고 적극 활용하는 사람
- 브랜딩/마케팅 전문가(1차) & 자영업자/소상공인(2차) 타겟

## 🌟 핵심 철학

### "일을 잘한다는 것이 무엇인가?"

**핵심 공식**: 문제 설정 감각 × AI 증폭 효과 = 대체 불가능한 가치

**6가지 핵심 가치**:
1. **ESSENTIAL**: 문제 해결이 아닌 문제 설정의 본질 탐구
2. **THOUGHTFUL**: 가설 설정과 직관의 중요성
3. **PRIORITIZED**: 양적 문제에서 질적 문제로, 의미 가치 창출
4. **PRINCIPLED**: 인사이드 아웃 사고방식
5. **PRACTICAL**: 구체와 추상의 왕복운동, 톱다운과 보텀업의 조화
6. **AUTHENTIC**: 감각의 사후성과 경험 축적

### 감각(Sense)과 AI의 관계
- **감각 우선**: AI는 감각을 증폭시키는 도구
- **상호 보완**: 감각만으로도, AI만으로도 부족한 시대
- **효과적 활용**: 감각이 뛰어나야 AI도 제대로 쓸 수 있음

## 📁 프로젝트 구조

### 13.01-osmu-system
**OSMU (One Source Multi Use) 콘텐츠 자동화 시스템**

#### 🏗️ 하이브리드 아키텍처
- **Claude Code 서브에이전트** (전략적 두뇌): 창의성, 브랜드 일관성, 전략적 판단
- **Python 스크립트** (기술적 실행): API 호출, 파일 처리, 오류 핸들링

#### 🔄 핵심 워크플로우
```
1. 콘텐츠 분석 → youtube-content-analyzer
2. 경험 연결 → experience-bridge
3. [병렬 실행]
   ├─ 텍스트 → imi-work-persona-writer
   └─ 이미지 → osmu-image-generator (DALL-E 3)
4. Ghost 발행 → ghost-auto-publisher
```

#### 주요 서브에이전트
- `youtube-content-analyzer`: YouTube 메타데이터 추출 및 인사이트 분석
- `imi-work-persona-writer`: "일을 잘한다" 철학으로 콘텐츠 재해석
- `osmu-image-generator`: VISUAL_PROMPT v5.5 메타프롬프트, 갤러리급 이미지 생성
- `ghost-auto-publisher`: SEO 전략, 브랜드 정렬, Ghost v5 발행
- `naver-seo-writer`: 네이버 블로그 SEO 최적화
- `instagram-threads-optimizer`: SNS 카드뉴스 형식 변환

#### 기술 스택
- **블로그**: Ghost v5 (blog.imiwork.com)
- **이미지**: DALL-E 3 API
- **자동화**: Claude Code + Python
- **환경**: .env (API 키 관리)

## 🏆 주요 성과

**검증 완료** (2025년 9월):
- ✅ 전체 워크플로우 100% 성공
- ✅ 하이브리드 아키텍처 확립 (서브에이전트 + Python)
- ✅ Ghost v5 + DALL-E 3 통합 완료
- ✅ 성공 사례: [Ben Horowitz 리더십 인사이트](https://blog.imiwork.com/ben-horowitz-fear-leadership-insights-2/)

**시스템 안정성**:
- 서브에이전트 경로 관리: `/Users/rhim/Projects/pkm/10-projects/13-imi-work/13.01-osmu-system`
- 6개 플랫폼 이미지 생성 자동화
- SEO 최적화 및 브랜드 일관성 유지

## 🔗 연관 카테고리

- [[20-operations/23-brand]] - 브랜드 전략 및 가이드라인
- [[30-knowledge/36-ai-tools]] - AI 도구 활용 노하우
- [[40-personal/44-reflections]] - 콘텐츠 인사이트 기록

## 📚 주요 문서

- `CLAUDE.md`: OSMU 시스템 전체 아키텍처 및 브랜드 가이드
- `SUCCESS_GUIDE.md`: 검증된 워크플로우 실행 방법
- `guides/IMI_WORK_PERSONA_GUIDE.md`: 브랜드 페르소나 상세 정의
- `guides/VISUAL_PROMPT_v5.5.js`: 갤러리급 이미지 생성 메타프롬프트
- `.claude/subagents/`: 6개 전문 서브에이전트 정의
- `scripts/`: Python 헬퍼 스크립트 (dalle3-osmu-generator.py, ghost-auto-publish.py)

---

*"감각과 AI의 조합으로 불확실한 시대에서도 대체 불가능한 가치를 만든다."*
