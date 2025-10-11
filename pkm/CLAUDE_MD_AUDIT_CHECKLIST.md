# CLAUDE.md 심층 분석 체크리스트

> Context clear 후 ~/.claude/CLAUDE.md 전체를 심층 분석하기 위한 가이드

**대상 파일**: `/Users/rhim/.claude/CLAUDE.md`
**목적**: 전역 컨텍스트 파일의 모든 내용이 현재 시스템과 일치하는지 검증

---

## 📋 이미 완료된 수정사항 (2025-10-11)

### ✅ Phase 1: 크리티컬 이슈 수정 완료
1. **프로젝트 목록 섹션 재작성** (Line 147-224)
   - ❌ 삭제: `archimedes-bath-lecture` (존재하지 않는 프로젝트)
   - ✅ 추가: `brand-identity` (14-brand-identity)
   - ✅ 모든 프로젝트에 PKM 경로 명시
   - ✅ Johnny Decimal 구조 설명 추가
   - ✅ 상태 업데이트 (9월 → 10월 반영)

2. **PKM 사용 가이드 추가** (Line 226-273)
   - 40-personal 폴더별 용도 설명
   - 30-knowledge 카테고리 설명
   - insights vs ideas 개념 명확화
   - 템플릿 위치 안내
   - 파일 명명 규칙

3. **관련 파일 동시 수정**
   - `~/.claude/commands/daily-review.md`: 프로젝트 경로 업데이트, `43-todos` → `46-todos`
   - `pkm/00-system/01-templates/daily-note-template.md`: 프로젝트 섹션 업데이트

---

## 🔍 Phase 2: 전체 심층 분석 필요 항목

### 1. 사용자 프로필 섹션 (Line 1-25)
**체크 포인트**:
- [ ] "이름" 정보 최신인가? (hovoo → 이림 변경 이력 있음)
- [ ] "핵심 정체성" 설명이 현재 포지셔닝과 일치하는가?
- [ ] "목표" 항목이 실제 진행 중인 일과 맞는가?
- [ ] 비즈니스 현황이 최신인가? (매장 수, 사업 영역)

### 2. 커뮤니티 활동 (Line 21-24)
**체크 포인트**:
- [ ] GPTers 스터디장 활동 상태 최신인가?
- [ ] 강의 활동 설명이 현재와 맞는가?

### 3. 기술 환경 및 자동화 현황 (Line 26-49)
**체크 포인트**:
- [ ] 인프라 스택 정보 정확한가? (미니PC, Docker, 도메인)
- [ ] 운영 중인 n8n 워크플로우 5개 설명이 최신인가?
- [ ] AI 도구 활용 수준 설명이 과장/축소 없이 정확한가?

### 4. 목표 및 비전 (Line 51-63)
**체크 포인트**:
- [ ] 단기 목표 (6개월)가 실제 진행 중인 일과 일치하는가?
- [ ] 장기 비전 (1-2년)이 현실적이고 구체적인가?
- [ ] "Claude Code 활용" 목표가 실제 사용 수준과 맞는가?

### 5. 주요 활동 영역 (Line 65-80)
**체크 포인트**:
- [ ] 3개 영역(F&B 브랜딩, AI 실무 활용, 교육) 설명이 정확한가?
- [ ] 각 영역의 구체적 활동이 현재와 일치하는가?

### 6. 선호하는 작업 스타일 (Line 82-94)
**체크 포인트**:
- [ ] AI와의 협업 방식 설명이 실제와 맞는가?
- [ ] 커뮤니케이션 스타일이 정확한가?
- [ ] 실제 대화 패턴과 일치하는가?

### 7. 연동 시스템 및 도구 (Line 96-110)
**체크 포인트**:
- [ ] 현재 활용 중인 도구 목록 완전한가?
- [ ] 도메인 정보 정확한가? (n8n.imiwork.com, blog.imiwork.com)
- [ ] 향후 연동 계획이 현실적인가?

### 8. 주요 업무 패턴 (Line 112-131)
**체크 포인트**:
- [ ] 스몰 비즈니스 대표 업무 설명이 정확한가?
- [ ] 교육 및 컨설팅 업무 빈도가 맞는가? (월 1-2건, 월 2-3회 등)
- [ ] 시스템 및 콘텐츠 업무가 실제 작업과 일치하는가?

### 9. 특별 고려사항 (Line 133-145)
**체크 포인트**:
- [ ] 비즈니스 우선순위 4가지가 현재 전략과 맞는가?
- [ ] 학습 및 성장 방향이 실제 추구하는 것과 일치하는가?

### 10. 서브에이전트 생성 규칙 (Line 276-285)
**체크 포인트**:
- [ ] 템플릿 경로가 정확한가?
- [ ] 4가지 원칙이 실제로 적용되고 있는가?

### 11. 업데이트 이력 (Line 289-293)
**체크 포인트**:
- [ ] 최근 수정사항 (2025.10.11) 추가되어야 함
- [ ] 주요 변경 이력이 기록되어 있는가?

---

## 🎯 심층 분석 시 확인할 사항

### 내용 정합성
1. **사실 확인**
   - 매장 수, 직원 수, 사업 규모 등 숫자 정확한가?
   - 프로젝트 상태 (진행 중/완료/중단)가 맞는가?
   - 시간 표현 ("9월 예정", "운영 중" 등)이 현재 시점과 맞는가?

2. **일관성 확인**
   - 같은 프로젝트가 여러 곳에서 다르게 설명되지 않는가?
   - 경로 정보가 일관적인가?
   - 상태 정보가 모순되지 않는가?

3. **완전성 확인**
   - 누락된 프로젝트가 없는가?
   - 삭제된 프로젝트가 언급되지 않는가?
   - 주요 변경사항이 모두 반영되었는가?

### 유용성 검증
1. **AI 활용성**
   - AI가 이 정보로 올바른 위치에 파일을 저장할 수 있는가?
   - AI가 현재 상황을 정확히 이해할 수 있는가?
   - 너무 추상적이거나 모호한 표현은 없는가?

2. **최신성**
   - 3개월 이상 된 정보가 업데이트 없이 남아있지 않은가?
   - "예정", "계획" 등의 표현이 실제 완료된 것은 아닌가?

3. **간결성**
   - 불필요하게 중복된 설명이 없는가?
   - 핵심만 담겨있는가?

---

## 📂 참조해야 할 실제 시스템 파일

### PKM 구조 확인
```bash
ls -la /Users/rhim/Projects/pkm/
ls -la /Users/rhim/Projects/pkm/10-projects/
ls -la /Users/rhim/Projects/pkm/20-operations/
ls -la /Users/rhim/Projects/pkm/40-personal/
```

### 프로젝트 README 확인
```bash
cat /Users/rhim/Projects/pkm/10-projects/12-education/README.md
cat /Users/rhim/Projects/pkm/10-projects/13-imi-work/README.md
cat /Users/rhim/Projects/pkm/10-projects/14-brand-identity/README.md
cat /Users/rhim/Projects/pkm/20-operations/21-cafe-operations/README.md
cat /Users/rhim/Projects/pkm/20-operations/22-automation/README.md
```

### 최근 작업 이력 확인
```bash
cd /Users/rhim/Projects/pkm
git log --oneline --since="7 days ago"
```

### 설정 파일 감사 리포트 확인
```bash
cat /Users/rhim/Projects/pkm/CONFIGURATION_AUDIT_REPORT.md
cat /Users/rhim/Projects/pkm/PKM_FINAL_VALIDATION_REPORT.md
```

---

## 🔧 수정 시 주의사항

1. **One Source of Truth 원칙**
   - CLAUDE.md는 다른 파일을 참조하지, 정보를 중복하지 않음
   - 프로젝트 상세는 각 README에, CLAUDE.md는 개요만

2. **경로 정보 명확성**
   - 절대 경로 사용: `/Users/rhim/Projects/pkm/...`
   - Johnny Decimal 번호 포함

3. **시간 표현 정확성**
   - "예정" → 실제 날짜나 "검토 중"
   - "운영 중" → 구체적 상태
   - 과거형/현재형 정확히 구분

4. **업데이트 이력 기록**
   - 중요 수정사항은 맨 아래 "업데이트 이력"에 추가
   - 날짜 + 변경 내용 간단히 기록

---

## 🎬 작업 순서

1. **CLAUDE.md 전체 읽기**
   ```bash
   cat ~/.claude/CLAUDE.md
   ```

2. **체크리스트 따라 섹션별 검증**
   - 각 섹션 읽으면서 위 체크포인트 확인
   - 문제 발견 시 메모

3. **실제 시스템과 대조**
   - PKM 폴더 구조 확인
   - README 파일 내용 대조
   - 최근 git 이력 확인

4. **수정안 작성**
   - 발견된 문제점 정리
   - 수정할 내용 명확히 정의

5. **수정 실행 및 검증**
   - Edit 툴로 수정
   - 수정 후 다시 읽어서 확인

6. **업데이트 이력 추가**
   - 맨 아래 섹션에 오늘 날짜 + 변경사항 기록

---

**생성일**: 2025-10-11
**다음 작업**: Context clear 후 이 파일 참조하여 CLAUDE.md 심층 분석 시작

## Related Notes

- [[40-personal/44-reflections/learning/git-repository-study-plan]] - ai_automation 관련; CLAUDE_MD_AUDIT_CHECKLIST.md ↔ 40-personal 연결
- [[40-personal/44-reflections/learning/ab-method-philosophy]] - ai_automation 관련; CLAUDE_MD_AUDIT_CHECKLIST.md ↔ 40-personal 연결
- [[10-projects/14-brand-identity/14.01-brand-builder/brand-identity-ai/brand-identity-builder-prd]] - ai_automation 관련; CLAUDE_MD_AUDIT_CHECKLIST.md ↔ 10-projects 연결
- [[10-projects/12-education/12.02-gpters-ai-branding/templates/custom-gpt-instructions/NEUTRAL_AI_GUIDE]] - ai_automation 관련; CLAUDE_MD_AUDIT_CHECKLIST.md ↔ 10-projects 연결
- [[00-system/04-docs/OBSIDIAN_SYNC_GUIDE]] - pkm_systems 관련; CLAUDE_MD_AUDIT_CHECKLIST.md ↔ 00-system 연결
