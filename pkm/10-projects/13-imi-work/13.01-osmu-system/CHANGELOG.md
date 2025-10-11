# CHANGELOG

## IMI WORK OSMU v2.0 변경 이력

### 2025.09.16 - 🎨 DALL-E 3 이미지 생성 엔진 전환 완료
- **DALL-E 3 전환 완료**: OpenAI SDK 1.107.3 활용, HD + vivid 스타일
- **dalle3-osmu-generator.py 완성**: 간단하고 안정적인 DALL-E 3 전용 스크립트
- **미니멀 텍스트 오버레이**: 2-4단어 영어 문구, 60% 투명도, 우측하단 배치
- **검증 완료**: aeo-dalle3-test 성공 (600KB-1.2MB 갤러리급 이미지 6개)
- **DALLE3_SETUP_GUIDE.md**: 작동 방법 완전 문서화
- **osmu-image-generator.md 업데이트**: Gemini → DALL-E 3 참조 완전 변경
- **gemini-image-generator.py 제거**: 백업 파일 완전 삭제로 혼선 제거

### 2025.09.14 - 🔄 하이브리드 아키텍처 전환 완료
- **서브에이전트 역할 재정의**: 전략적 두뇌 역할로 명확화
- **Python 스크립트 역할 정의**: 기술적 실행 엔진으로 명확화
- **osmu-image-generator.md 업데이트**: 하이브리드 협력 방식 명시
- **ghost-auto-publisher.md 업데이트**: 전략적 조정 + 기술적 실행 분리
- **CLAUDE.md 하이브리드 문서화**: 새로운 협력 체계 완전 반영

### 2025.09.14 - 🎉 완전한 프로덕션 워크플로우 검증 완료
- **Photorealistic 이미지 생성**: DALL-E 3로 6개 고품질 이미지 성공
- **Ghost v5 완전 연동**: source=html로 HTML 직접 발행, Lexical 자동 변환
- **H1 중복 제거**: Ghost 제목과 본문 충돌 해결
- **Ben Horowitz 콘텐츠**: 전체 워크플로우 100% 성공 검증
- **SUCCESS_GUIDE.md**: 재현 가능한 완전한 가이드라인 작성

### 2025.09.08 - OSMU v2.0 아키텍처 대전환
- **서브에이전트 분업**: 각 에이전트의 전문성 극대화
- **이미지 중앙화**: osmu-image-generator가 모든 플랫폼용 이미지 패키지 생성
- **API 키 보안 강화**: .env 도입 및 프로젝트 구조 최적화

### 2025.08.27 - 초기 시스템 구축
- **첫 번째 블로그 글 작성**: 사실 왜곡, 강제 비교, 페르소나 과노출 문제 해결
- **템플릿 시스템 유연화**: 정형 구조 → 자연스러운 흐름 우선
- **Ghost CMS 연동**: HTML 변환 및 YouTube 임베드 반응형 최적화 완료
- **Bret Taylor 블로그 글**: Ghost 블로그 발행 완료 ✅
- **OSMU 전략 수립**: Ghost → 네이버 + Instagram + Threads
- **프로젝트 폴더 재구성**: `/Users/rhim/projects/imi-work-osmu/`
- **Notion 워크스페이스 설계**: 대시보드 + 3개 DB 스키마
- **Smithery Notion MCP 연동 준비**: 페이지 ID: 25cd0f53623d8078b7bccc15d606ede0

### 2025.08.26 - 프로젝트 시작
- **프로젝트 초기 설정**: CLAUDE.md 생성
- **YouTube Data API v3 연동**: 환경변수로 보안 설정 완료
- **IMI WORK 전용 서브에이전트**: `imi-work-persona-writer` 생성
- **가이드라인 파일 작성**: 페르소나, 프롬프트, SEO 가이드 완료

---

## 주요 마일스톤

### v2.0 하이브리드 아키텍처 (2025.09.14)
**서브에이전트(전략적 두뇌) + Python(기술적 실행) 하이브리드 체계 확립**
- AI가 창의성과 전략을, Python이 안정성과 기술을 담당하는 최적 분업
- 새로운 플랫폼 추가 시 전략과 기술이 독립적으로 확장 가능

### v1.0 OSMU 기본 시스템 (2025.08.27)
**YouTube → IMI WORK 브랜드 → Ghost 블로그 파이프라인 구축**
- 브랜드 페르소나 적용 자동화
- Ghost CMS 연동 완료
- 첫 번째 성공 사례 발행

### v0.1 프로젝트 초기화 (2025.08.26)
**기본 구조 및 컨셉 정립**
- IMI WORK 브랜드 정체성 정의
- Claude Code 서브에이전트 아키텍처 설계
- YouTube API 연동 기반 마련