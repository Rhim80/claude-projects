# 15-imi-working-backwards

> IMI Working Backwards 템플릿 프로젝트 개발 공간

**프로젝트 상태**: 🚧 개발 중 (2025-10-11 시작)
**목표 배포**: 2025-11월 초 (GPTers 19기 스터디 시작 전)
**최종 저장소**: `https://github.com/Rhim80/imi-working-backwards`

---

## 📋 프로젝트 개요

### 목적
Working Backwards 방법론을 Claude Code + Obsidian 환경에서 실행할 수 있는 **턴키 템플릿** 개발

### 타겟 사용자
1. **Primary**: GPTers 19기 스터디 참가자
2. **Secondary**: AI × 비즈니스 실행자

### 참고 시스템
- Noah Brier의 [Claudesidian](https://github.com/heyitsnoah/claudesidian)
- 이림의 현재 PKM 시스템 (`/Users/rhim/Projects/pkm/`)

---

## 📂 폴더 구조

```
15-imi-working-backwards/
├── README.md                          # 이 파일
├── planning/
│   └── imi-working-backwards-planning.md  # 마스터 기획서
├── development/
│   ├── commands/                      # 개발 중인 커맨드
│   ├── agents/                        # 개발 중인 에이전트
│   ├── templates/                     # 템플릿 파일들
│   └── scripts/                       # 스크립트
├── testing/
│   ├── test-workspace/                # 테스트용 워크스페이스
│   └── feedback/                      # 피드백 수집
├── docs/
│   ├── README.md                      # 템플릿 README (배포용)
│   ├── INSTALLATION.md                # 설치 가이드
│   ├── QUICKSTART.md                  # 빠른 시작
│   └── WORKING_BACKWARDS_GUIDE.md     # WB 가이드
└── release/
    └── v0.1/                          # 배포 버전별 아카이브
```

---

## 🎯 개발 계획

### Week 1 (2025-10-14 ~ 10-20): 기초 구축
- [ ] 폴더 구조 생성
- [ ] Noah Claudesidian 분석
- [ ] 기존 커맨드 복사 및 수정
- [ ] 신규 커맨드 3개 개발 시작

### Week 2 (2025-10-21 ~ 10-27): 기능 완성
- [ ] 서브에이전트 이전 및 수정
- [ ] 예제 파일 작성
- [ ] 문서 작성
- [ ] 설치 마법사 구현

### Week 3 (2025-10-28 ~ 11-03): 테스트
- [ ] 내부 테스트
- [ ] 알파 테스트 (2-3명)
- [ ] 버그 수정

### Week 4 (2025-11-04 ~ 11-10): 배포
- [ ] GPTers 19기 배포
- [ ] 온보딩 세션
- [ ] 초기 지원

---

## 📦 배포 전략

### Phase 1: Private (GPTers 19기)
- GitHub Private 저장소
- 참가자에게만 접근 권한
- 4주간 피드백 수집

### Phase 2: Public (오픈소스)
- GitHub Public 전환
- 커뮤니티 기여 활성화
- 문서 확충

### Phase 3: 제품화 (장기)
- Advanced 기능 추가
- 교육 프로그램 연계
- 다른 방법론 확장

---

## 🔗 관련 링크

- **마스터 기획서**: `/Users/rhim/Projects/imi-working-backwards-planning.md`
- **Noah Claudesidian**: [GitHub](https://github.com/heyitsnoah/claudesidian)
- **Noah 가이드**: `pkm/30-knowledge/36-ai-tools/36.01-claude-code/noah-brier-claudesidian-guide.md`
- **GPTers 19기 제안서**: `pkm/10-projects/12-education/12.02-gpters-ai-branding/19th-cohort/19th-proposal-simple.md`

---

## 📝 작업 로그

### 2025-10-11
- [x] 프로젝트 킥오프
- [x] 마스터 기획서 작성 (`imi-working-backwards-planning.md`)
- [x] 15번 프로젝트 폴더 생성
- [ ] 다음: Week 1 시작

---

## 💡 핵심 원칙

1. **단순함**: 10분 내 설치 가능
2. **실용성**: Working Backwards 실행에 집중
3. **확장성**: 다른 방법론으로 확장 가능
4. **품질**: Noah Claudesidian 수준 이상

---

**프로젝트 오너**: 이림 (hovoo)
**최종 업데이트**: 2025-10-11
