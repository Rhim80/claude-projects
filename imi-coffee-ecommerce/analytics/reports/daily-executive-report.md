# 이미커피 일일 경영진 리포트 템플릿

> 핵심 비즈니스 지표 기반 일일 성과 요약

## 📊 일일 성과 대시보드

### 날짜: {{DATE}}
### 요일: {{DAY_OF_WEEK}} | 날씨: {{WEATHER}}

---

## 💰 매출 현황

| 지표 | 어제 실적 | 전일 대비 | 목표 대비 | 상태 |
|-----|---------|---------|---------|------|
| **총 매출** | {{DAILY_REVENUE}}원 | {{REVENUE_CHANGE}}% | {{REVENUE_VS_TARGET}}% | {{REVENUE_STATUS}} |
| **주문 수** | {{ORDER_COUNT}}건 | {{ORDER_CHANGE}}% | {{ORDER_VS_TARGET}}% | {{ORDER_STATUS}} |
| **평균 주문가** | {{AOV}}원 | {{AOV_CHANGE}}% | {{AOV_VS_TARGET}}% | {{AOV_STATUS}} |

### 📈 주간 매출 추이
```
{{WEEKLY_REVENUE_CHART}}
월: ████████ {{MON_REVENUE}}
화: ██████████ {{TUE_REVENUE}}  
수: ████████████ {{WED_REVENUE}}
목: ██████ {{THU_REVENUE}}
금: ████████████████ {{FRI_REVENUE}}
토: ██████████████ {{SAT_REVENUE}}
일: ████████ {{SUN_REVENUE}}
```

---

## 🎯 고객 및 마케팅 성과

### 고객 획득
| 지표 | 실적 | 전일 대비 | 목표 |
|-----|------|---------|------|
| **신규 고객** | {{NEW_CUSTOMERS}}명 | {{NEW_CUSTOMER_CHANGE}}% | 15명 |
| **재구매 고객** | {{REPEAT_CUSTOMERS}}명 | {{REPEAT_CHANGE}}% | 8명 |
| **총 방문자** | {{TOTAL_VISITORS}}명 | {{VISITOR_CHANGE}}% | 800명 |
| **전환율** | {{CONVERSION_RATE}}% | {{CONVERSION_CHANGE}}% | 2.5% |

### 채널별 성과
| 채널 | 매출 | 비중 | ROAS | 신규고객 |
|------|------|------|------|--------|
| **자사몰** | {{CAFE24_REVENUE}}원 | {{CAFE24_SHARE}}% | - | {{CAFE24_NEW}}명 |
| **네이버** | {{NAVER_REVENUE}}원 | {{NAVER_SHARE}}% | {{NAVER_ROAS}}% | {{NAVER_NEW}}명 |
| **Meta 광고** | {{META_REVENUE}}원 | {{META_SHARE}}% | {{META_ROAS}}% | {{META_NEW}}명 |
| **Google 광고** | {{GOOGLE_REVENUE}}원 | {{GOOGLE_SHARE}}% | {{GOOGLE_ROAS}}% | {{GOOGLE_NEW}}명 |

---

## 📊 운영 지표

### 주문 처리
- **주문 처리 시간**: {{ORDER_PROCESSING_TIME}}시간
- **배송 준비 완료**: {{SHIPPING_READY}}건
- **고객 문의**: {{CUSTOMER_INQUIRIES}}건 (응답률: {{RESPONSE_RATE}}%)

### 재고 현황
- **주요 제품 재고**: {{MAIN_PRODUCT_STOCK}}개
- **재고 부족 알림**: {{LOW_STOCK_ITEMS}}개 품목
- **신제품 판매**: {{NEW_PRODUCT_SALES}}건

---

## ⚠️ 주의사항 및 알림

### 🚨 긴급 대응 필요
{{#if URGENT_ALERTS}}
{{#each URGENT_ALERTS}}
- {{this}}
{{/each}}
{{else}}
- 긴급 사항 없음
{{/if}}

### 📢 일반 알림
{{#if GENERAL_ALERTS}}
{{#each GENERAL_ALERTS}}
- {{this}}
{{/each}}
{{else}}
- 일반 알림 없음
{{/if}}

---

## 🎯 오늘의 주요 액션 아이템

### 우선순위 높음
{{#if HIGH_PRIORITY_ACTIONS}}
{{#each HIGH_PRIORITY_ACTIONS}}
- [ ] {{this}}
{{/each}}
{{else}}
- [ ] 우선순위 높은 액션 없음
{{/if}}

### 일반 검토사항
{{#if GENERAL_ACTIONS}}
{{#each GENERAL_ACTIONS}}
- [ ] {{this}}
{{/each}}
{{else}}
- [ ] 일반 검토사항 없음
{{/if}}

---

## 📈 주요 인사이트

### 👍 잘된 점
{{POSITIVE_INSIGHTS}}

### 👀 개선 필요
{{IMPROVEMENT_INSIGHTS}}

### 💡 제안사항
{{SUGGESTIONS}}

---

## 🔍 상세 분석

### A/B 테스트 현황
| 실험명 | 진행률 | 현재 결과 | 예상 완료 |
|-------|-------|----------|----------|
| {{AB_TEST_1_NAME}} | {{AB_TEST_1_PROGRESS}}% | {{AB_TEST_1_RESULT}} | {{AB_TEST_1_ETA}} |
| {{AB_TEST_2_NAME}} | {{AB_TEST_2_PROGRESS}}% | {{AB_TEST_2_RESULT}} | {{AB_TEST_2_ETA}} |

### 고객 피드백 요약
- **평점**: {{AVERAGE_RATING}}/5.0 (리뷰 {{REVIEW_COUNT}}개)
- **주요 키워드**: {{TOP_KEYWORDS}}
- **불만사항**: {{COMPLAINTS}}

---

## 📱 바로가기 링크

- [📊 실시간 대시보드]({{DASHBOARD_URL}})
- [📈 GA4 분석]({{GA4_URL}})
- [🛒 Cafe24 관리]({{CAFE24_ADMIN_URL}})
- [📦 주문 관리]({{ORDER_MANAGEMENT_URL}})

---

## 📞 담당자 연락처

- **이커머스 운영**: 이미커피 대표 ({{PHONE_NUMBER}})
- **마케팅 담당**: {{MARKETING_CONTACT}}
- **기술 지원**: {{TECH_SUPPORT}}

---

*📅 다음 리포트: {{TOMORROW_DATE}} 오전 9시*
*🔄 자동 생성: n8n 워크플로우*