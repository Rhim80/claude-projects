# 설정 파일 종합 감사 리포트

> 전역 설정 파일과 PKM 시스템의 정합성 검증

**감사 일시**: 2025년 10월 11일 22:30
**감사 범위**: User-level 설정 + PKM vault-level 설정
**목적**: 설정 파일의 경로와 내용이 현재 시스템 구조를 정확히 반영하는지 검증

---

## 🎯 감사 결과 요약

### 종합 점수: 72/100

| 파일 유형 | 상태 | 점수 |
|---------|------|------|
| ~/.claude/agents/ (서브에이전트) | ✅ 완벽 | 100/100 |
| ~/.claude/commands/ (슬래시 커맨드) | ⚠️ 수정 필요 | 60/100 |
| ~/.claude/CLAUDE.md (전역 컨텍스트) | ❌ 대폭 수정 필요 | 40/100 |
| ~/.claude/SUBAGENT_*.md (템플릿) | ⚠️ 예시 수정 필요 | 80/100 |
| pkm/.claude/ (vault 설정) | ✅ 양호 | 90/100 |

---

## 1️⃣ ~/.claude/CLAUDE.md - 전역 컨텍스트 [40/100]

### ❌ 심각한 문제점

#### A. 진행 중인 프로젝트 목록 (Line 147-185) - 실제와 불일치

**❌ archimedes-bath-lecture (Line 149-153)**
```markdown
- **목적**: "구글에 없는 정보" 실무 중심 AI 활용법 강의 커리큘럼 개발
- **현재 상태**: 교육혁신 전략 연구 및 커리큘럼 설계 단계
```
- **문제**: 이 프로젝트는 PKM에도 Projects/에도 존재하지 않음 (삭제된 듯)
- **조치**: 프로젝트 목록에서 제거 필요

**❌ gpters-ai-branding-study (Line 155-159)**
```markdown
- **현재 상태**: 스터디 템플릿 및 커리큘럼 완성, 운영 중
```
- **실제 위치**: `pkm/10-projects/12-education/12.02-gpters-ai-branding/`
- **문제**: PKM 경로 언급 없음
- **조치**: 위치 정보 추가 필요

**❌ imi-work-osmu (Line 168-172)**
```markdown
- **현재 상태**: Claude Code 기반 워크플로우 개발 및 브랜드 가이드라인 완성
```
- **실제 위치**: `pkm/10-projects/13-imi-work/13.01-osmu-system/`
- **문제**: PKM 경로 언급 없음, 구 경로로 오인 가능
- **조치**: 위치 정보 업데이트 필요

**❌ insight-platform (Line 174-178)**
```markdown
- **현재 상태**: 커리큘럼 설계 완료, 9월 시작 예정
```
- **실제 위치**: `pkm/10-projects/12-education/12.03-insight-platform/`
- **문제**: "9월 시작 예정"은 과거 (현재 10월), PKM 경로 언급 없음
- **조치**: 상태 업데이트 ("첫 기수 운영 완료") + 위치 정보 추가

**❌ lotte-christmas-market-2025 (Line 180-184)**
```markdown
- **현재 상태**: 메뉴 개발 및 전략 검토 완료
```
- **실제 위치**: `pkm/20-operations/21-cafe-operations/lotte-christmas-market/2025/`
- **문제**: PKM 경로 언급 없음
- **조치**: 위치 정보 추가

#### B. 누락된 프로젝트

**❌ brand-identity 프로젝트 누락**
- **실제 위치**: `pkm/10-projects/14-brand-identity/`
- **상태**: Brand Identity Builder 웹앱 프로젝트 (개발 준비 단계)
- **문제**: 진행 중인 프로젝트 목록에 아예 없음
- **조치**: 프로젝트 추가 필요

**❌ 교육 사업 통합 설명 부족**
- `12-education/` 폴더에 4개 프로젝트 존재:
  - 12.01-imi-ai-study
  - 12.02-gpters-ai-branding
  - 12.03-insight-platform
  - 12.04-insighter
- **문제**: 각각 별도 설명되거나 누락되어 있음, 통합 개념 없음
- **조치**: "12-education - AI 교육 사업" 섹션 추가 필요

#### C. PKM 구조 설명 부족

**❌ Johnny Decimal 구조 상세 설명 없음**
```markdown
Line 163: Johnny Decimal 구조 (00-inbox, 10-projects, 20-operations, 30-knowledge, 40-personal, 90-archive)
```
- **문제**: 카테고리 이름만 나열, 각 용도 설명 없음
- **조치**: 각 카테고리의 역할과 사용 예시 추가 필요

**❌ 실제 사용법 예시 없음**
- daily-note가 `41-daily/`에 있다는 설명 없음
- ideas가 `43-ideas/`에 있다는 설명 없음
- strategy가 `45-strategy/`에 있다는 설명 없음
- todos가 `46-todos/`에 있다는 설명 없음
- **조치**: PKM 사용 가이드 섹션 추가 필요

### ✅ 정확한 부분

**✅ pkm 프로젝트 (Line 161-166)**
```markdown
- **위치**: `/Users/rhim/Projects/pkm/`
- **현재 상태**: Johnny Decimal 재구조화 완료 (2025-10-10), 369개 문서
```
- 정확함

**✅ idea-vault 경로 제거 (Line 206)**
```markdown
2025.10.10: ... idea-vault 경로 제거
```
- 업데이트 이력에 명시됨

---

## 2️⃣ ~/.claude/commands/ - 슬래시 커맨드 [60/100]

### ✅ 정확한 커맨드

**✅ daily-note.md**
```yaml
경로: /Users/rhim/Projects/pkm/40-personal/41-daily/
템플릿: /Users/rhim/Projects/pkm/00-system/01-templates/daily-note-template.md
```
- 모든 경로 정확함

### ⚠️ 수정 필요

**❌ idea.md (Line 15)**
```yaml
저장 경로: /Users/rhim/Projects/pkm/30-knowledge/33-insights/
```
- **문제**: `43-ideas` 폴더와 개념 혼동 가능
- **질문**: "idea"는 `33-insights` (지식)에 저장? 아니면 `43-ideas` (개인)?
- **추천**:
  - insights = 검증된 지식, 일반화 가능한 인사이트
  - ideas = 개인적 아이디어, 미검증 생각
  - 명확히 구분 필요

**❌ daily-review.md (Line 17-21)**
```yaml
분석 대상 프로젝트:
- gpters-ai-branding-study/
- archimedes-bath-lecture/
- imi-work-osmu/
- pkm/
- .claude/
```
- **문제**: 프로젝트 경로가 구버전
  - `gpters-ai-branding-study/` → 실제: `pkm/10-projects/12-education/12.02-gpters-ai-branding/`
  - `archimedes-bath-lecture/` → 존재하지 않음 (삭제)
  - `imi-work-osmu/` → 실제: `pkm/10-projects/13-imi-work/13.01-osmu-system/`
- **조치**: PKM 기반 경로로 전면 수정 필요

**❌ daily-review.md (Line 29)**
```yaml
cat pkm/40-personal/43-todos/active-todos.md
```
- **문제**: `43-todos`는 `46-todos`로 변경됨
- **올바른 경로**: `pkm/40-personal/46-todos/active-todos.md`
- **조치**: 경로 수정

---

## 3️⃣ ~/.claude/agents/ - 서브에이전트 [100/100]

### ✅ 모든 경로 정확함

**검증된 에이전트들**:
- `ghost-publisher.md`: `/Users/rhim/Projects/pkm/10-projects/13-imi-work/13.01-osmu-system/` ✅
- `ghost-validator.md`: `/Users/rhim/Projects/pkm/10-projects/13-imi-work/13.01-osmu-system/` ✅
- `imi-work-persona-writer.md`: `/Users/rhim/Projects/pkm/10-projects/13-imi-work/13.01-osmu-system/guides/` ✅
- `instagram-threads-optimizer.md`: `/Users/rhim/Projects/pkm/10-projects/13-imi-work/13.01-osmu-system/guides/` ✅
- `naver-seo-writer.md`: `/Users/rhim/Projects/pkm/10-projects/13-imi-work/13.01-osmu-system/guides/` ✅
- `osmu-image-generator.md`: `/Users/rhim/Projects/pkm/10-projects/13-imi-work/13.01-osmu-system/` ✅
- `zettelkasten-linker.md`: `/Users/rhim/Projects/pkm/` ✅

**업데이트 이력**: 2025년 10월 11일 20:50~21:30 Phase 4에서 경로 업데이트 완료

---

## 4️⃣ ~/.claude/SUBAGENT_*.md - 템플릿 가이드 [80/100]

### ⚠️ 예시 코드 수정 필요

**❌ SUBAGENT_IMPROVEMENTS.md (Line 55, 64-65)**
```yaml
# 잘못된 예시:
Script: /Users/rhim/Projects/imi-work-osmu/scripts/... (하드코딩)

config:
  script_path: /Users/rhim/Projects/imi-work-osmu/scripts/ghost-auto-publish.py
  assets_path: /Users/rhim/Projects/imi-work-osmu/assets/images/
```
- **문제**: 구 경로를 예시로 사용 중
- **올바른 경로**: `/Users/rhim/Projects/pkm/10-projects/13-imi-work/13.01-osmu-system/`
- **조치**: 예시 코드 업데이트 필요

### ✅ 구조적 가이드라인
- One Source of Truth 원칙 ✅
- Single Responsibility 원칙 ✅
- Separate Constants 원칙 ✅
- Follow Patterns 원칙 ✅

---

## 5️⃣ pkm/.claude/ - Vault-level 설정 [90/100]

### ✅ 양호한 구조

**claude_config.json**:
```json
{
  "preferences": {
    "primary_folders": ["00-inbox", "10-projects", "20-operations", "30-knowledge", "40-personal"],
    "template_folder": "00-system/01-templates",
    "archive_after_days": 30,
    "default_note_location": "00-inbox"
  }
}
```
- Johnny Decimal 구조 정확히 반영 ✅
- 템플릿 폴더 경로 정확 ✅

### ⚠️ 개선 여지

**누락된 폴더**:
- `50-resources` 폴더가 `primary_folders`에 없음
- `90-archive` 폴더가 `primary_folders`에 없음
- **조치**: 전체 카테고리 반영 고려

---

## 📋 우선순위별 수정 계획

### P0: 즉시 수정 필요 (크리티컬)

1. **~/.claude/commands/daily-review.md**
   - Line 17-21: 프로젝트 경로 업데이트
   - Line 29: `43-todos` → `46-todos`

2. **~/.claude/CLAUDE.md**
   - Line 149-153: `archimedes-bath-lecture` 제거 (존재하지 않음)
   - Line 155-184: 모든 프로젝트에 PKM 경로 추가

### P1: 긴급 수정 필요

3. **~/.claude/CLAUDE.md**
   - `brand-identity` 프로젝트 추가
   - `12-education` 통합 섹션 추가
   - PKM Johnny Decimal 구조 상세 설명 추가

4. **~/.claude/SUBAGENT_IMPROVEMENTS.md**
   - Line 55, 64-65: 예시 경로 업데이트

### P2: 개선 권장

5. **~/.claude/commands/idea.md**
   - `33-insights` vs `43-ideas` 개념 명확화
   - 저장 규칙 문서화

6. **pkm/.claude/claude_config.json**
   - `primary_folders`에 `50-resources`, `90-archive` 추가 고려

---

## 🎯 핵심 발견 사항

### 1. 경로 vs 내용의 이중 불일치
- **경로 불일치**: 일부 커맨드에서 구 경로 참조 (수정 가능)
- **내용 불일치**: CLAUDE.md의 프로젝트 목록이 실제와 다름 (더 심각)

### 2. "진행 중인 프로젝트" 개념의 모호함
- `archimedes-bath-lecture`는 삭제되었는데 여전히 목록에 있음
- 새 프로젝트 `brand-identity`는 목록에 없음
- **문제**: "진행 중"의 기준이 불명확

### 3. PKM 구조 설명의 부재
- CLAUDE.md에 PKM 위치만 명시, 사용법 설명 없음
- Johnny Decimal 카테고리 설명 부족
- **결과**: AI가 올바른 위치에 파일 저장하기 어려움

### 4. insights vs ideas 개념 혼동
- `33-insights` (지식 카테고리) vs `43-ideas` (개인 카테고리)
- `/idea` 커맨드는 `33-insights`에 저장
- **문제**: 명확한 구분 기준 없음

---

## ✅ 권장 조치사항

### 즉시 실행 (오늘)
1. `daily-review.md` 경로 수정 (`43-todos` → `46-todos`)
2. `daily-review.md` 프로젝트 목록 업데이트 (PKM 기반)
3. `CLAUDE.md`에서 `archimedes-bath-lecture` 제거

### 단기 실행 (이번 주)
4. `CLAUDE.md` "진행 중인 프로젝트" 섹션 전면 개편:
   - 모든 프로젝트에 PKM 경로 명시
   - `brand-identity` 추가
   - `12-education` 통합 설명 추가
   - 상태 업데이트 (9월 → 10월 반영)

5. `CLAUDE.md`에 "PKM 사용 가이드" 섹션 추가:
   - Johnny Decimal 카테고리별 용도 설명
   - 파일 저장 위치 예시
   - daily-note, ideas, strategy 등의 위치

### 중기 실행 (이번 달)
6. `idea.md` vs `43-ideas` vs `33-insights` 개념 정리
7. `SUBAGENT_IMPROVEMENTS.md` 예시 코드 업데이트
8. vault-level config에 전체 카테고리 반영

---

## 📊 최종 평가

**전체 시스템 일관성 점수**: **72/100**

**강점**:
- ✅ 서브에이전트 경로 100% 정확 (Phase 4 업데이트 성공)
- ✅ daily-note 커맨드 완벽 작동
- ✅ vault-level 설정 양호

**약점**:
- ❌ CLAUDE.md 프로젝트 목록이 실제와 크게 불일치
- ❌ daily-review 커맨드의 구버전 경로
- ❌ PKM 구조 사용법 설명 부족

**결론**:
- **기술적 설정**은 대부분 정확 (경로, 스크립트)
- **문서 내용**이 현실과 괴리 (프로젝트 목록, 상태)
- **즉시 수정 필요**: CLAUDE.md 및 daily-review.md

---

**감사 완료 시각**: 2025-10-11 22:45
**다음 단계**: P0/P1 수정 사항 즉시 반영 🔧

## Related Notes

- [[40-personal/44-reflections/learning/git-repository-study-plan]] - ai_automation 관련; CONFIGURATION_AUDIT_REPORT.md ↔ 40-personal 연결
- [[40-personal/44-reflections/learning/ab-method-philosophy]] - ai_automation 관련; CONFIGURATION_AUDIT_REPORT.md ↔ 40-personal 연결
- [[10-projects/12-education/12.02-gpters-ai-branding/templates/custom-gpt-instructions/NEUTRAL_AI_GUIDE]] - ai_automation 관련; CONFIGURATION_AUDIT_REPORT.md ↔ 10-projects 연결
- [[00-system/04-docs/WINDOWS_SETUP]] - pkm_systems, ai_automation 관련; CONFIGURATION_AUDIT_REPORT.md ↔ 00-system 연결
- [[00-inbox/Welcome]] - pkm_systems, ai_automation 관련; CONFIGURATION_AUDIT_REPORT.md ↔ 00-inbox 연결
