# PKM Johnny Decimal 재구조화 계획

> 2025-10-10 | Simple Start (00-40, 90) + Zettelkasten Links

---

## 🎯 최종 구조

```
00-09  System      → inbox, templates, config
10-19  Projects    → consulting, education, content, imi-business
20-29  Operations  → automation, brand, community
30-39  Knowledge   → business, frameworks, insights
40-49  Personal    → daily, weekly, ideas
90-99  Archive     → completed projects/events
```

---

## 📊 매핑

```
현재                    →  신규
────────────────────────────────────
00_Inbox                →  00-inbox/
01_Projects/consulting/ →  11-consulting/
02_Areas/automation/    →  22-automation/
02_Areas/daily-notes/   →  41-daily/
03_Resources/business/  →  31-business/
03_Resources/insights/  →  33-insights/
04_Archive/             →  90-archive/
```

---

## 🔗 링크 패턴

### Project → Knowledge
```markdown
# 11.01-gangneung-cafe/proposal.md
[[31.01-consulting-philosophy]]
[[31.02-brand-identity-framework]]
```

### Knowledge → Examples
```markdown
# 31.02-brand-identity-framework.md
## 적용 사례
- [[11.01-gangneung-cafe]]
- [[11.03-paju-cafe]]
```

### Daily → Hub
```markdown
# 41-daily/2025-10-10.md
- [[31.05-pkm-sustainability]] 발견
- [[11.01-gangneung-cafe]] 작업
```

---

## 📝 실행 순서

1. 폴더 구조 생성
2. 파일 이동 (consulting → 11, daily → 41 등)
3. 링크 추가 (daily notes 우선)
4. 구조 정리 완료

---

## ✅ 완료

- [x] 침묵의 파티 Archive (91.01-silent-party-2020)
- [x] 불필요 폴더 삭제 10개
- [x] **새 구조 생성 및 이동 완료** (2025-10-10 23:30)
- [x] **링크 구조 추가 완료** (Daily Notes, Knowledge Hub)

---

## 📊 최종 결과

### Johnny Decimal 구조
```
00-inbox        ← 00_Inbox
10-projects     ← (카테고리 폴더)
11-consulting   ← 01_Projects/consulting (직접 접근)
12-education    ← 02_Areas/education
20-operations   ← (카테고리 폴더)
22-automation   ← 02_Areas/automation (직접 접근)
30-knowledge    ← 03_Resources
31-business     ← 03_Resources/business (직접 접근)
40-personal     ← (카테고리 폴더)
41-daily        ← 02_Areas/daily-notes (직접 접근)
90-archive      ← 04_Archive
```

### Zettelkasten 링크
- ✅ [[41-daily/2025-10-10]] → [[31-business/pkm-sustainability]]
- ✅ [[31-business/pkm-sustainability]] Hub Note 생성
- ✅ 00-inbox/README 업데이트 (Johnny Decimal 경로)

## Related Notes
- [[pkm-sustainability]] - 높은 연관성
- [[detailed-plan]] - 높은 연관성
- [[git-repository-study-plan]] - 높은 연관성
- [[2025-10-11]] - 높은 연관성
- [[작업-진행상황]] - 높은 연관성
- [[2025-10-10]] - 높은 연관성
- [[learning-roadmap]] - 높은 연관성
