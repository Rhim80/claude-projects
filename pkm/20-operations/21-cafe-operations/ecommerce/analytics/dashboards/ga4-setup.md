# GA4 이커머스 추적 설정 가이드

> 이미커피 이커머스를 위한 Google Analytics 4 완전 설정

## 🎯 설정 목표

### 추적해야 할 핵심 데이터
- **전자상거래 이벤트**: 구매, 장바구니, 결제 시작
- **사용자 행동**: 페이지뷰, 체류시간, 이탈률
- **마케팅 성과**: 유입 경로, 캠페인 효과, 전환률
- **고객 분석**: 신규/재방문, 세그먼트, 코호트

## 🛠 1단계: 기본 GA4 설정

### GA4 속성 생성
```javascript
// gtag.js 기본 설정
gtag('config', 'G-XXXXXXXXXX', {
  // 쿠키 설정
  cookie_expires: 63072000, // 2년
  cookie_domain: '.imiwork.com',
  
  // 개인정보 보호
  anonymize_ip: true,
  allow_ad_personalization_signals: false,
  
  // 이커머스 설정
  send_page_view: true,
  enhanced_ecommerce: true
});
```

### 전환 목표 설정
```javascript
// 주요 전환 이벤트 정의
const conversionEvents = [
  'purchase',           // 구매 완료
  'add_to_cart',       // 장바구니 추가
  'begin_checkout',    // 결제 시작
  'sign_up',          // 회원가입
  'generate_lead'     // 리드 생성 (뉴스레터 등)
];
```

## 🛒 2단계: 전자상거래 이벤트 설정

### 제품 조회 (view_item)
```javascript
gtag('event', 'view_item', {
  currency: 'KRW',
  value: 25000,
  items: [{
    item_id: 'coffee_blend_001',
    item_name: '이미커피 시그니처 블렌드',
    category: '커피원두',
    category2: '블렌드',
    category3: '미디움로스트',
    quantity: 1,
    price: 25000,
    item_brand: '이미커피',
    item_variant: '200g'
  }]
});
```

### 장바구니 추가 (add_to_cart)
```javascript
gtag('event', 'add_to_cart', {
  currency: 'KRW',
  value: 25000,
  items: [{
    item_id: 'coffee_blend_001',
    item_name: '이미커피 시그니처 블렌드',
    category: '커피원두',
    quantity: 1,
    price: 25000
  }]
});
```

### 결제 시작 (begin_checkout)
```javascript
gtag('event', 'begin_checkout', {
  currency: 'KRW',
  value: 52000,
  coupon: 'WELCOME10', // 쿠폰 코드 (있는 경우)
  items: [{
    item_id: 'coffee_blend_001',
    item_name: '이미커피 시그니처 블렌드',
    category: '커피원두',
    quantity: 2,
    price: 25000
  }]
});
```

### 구매 완료 (purchase) - 가장 중요!
```javascript
gtag('event', 'purchase', {
  transaction_id: 'IMI20241201001', // 주문번호
  currency: 'KRW',
  value: 52000, // 총 주문 금액
  tax: 0,
  shipping: 3000,
  coupon: 'WELCOME10',
  affiliation: 'Cafe24', // 플랫폼
  items: [{
    item_id: 'coffee_blend_001',
    item_name: '이미커피 시그니처 블렌드',
    category: '커피원두',
    quantity: 2,
    price: 25000,
    coupon: 'WELCOME10'
  }]
});
```

## 🎨 3단계: 맞춤 이벤트 설정

### 커피 관련 특화 이벤트
```javascript
// 원두 정보 조회
gtag('event', 'view_coffee_info', {
  coffee_origin: '브라질',
  roast_level: '미디움',
  flavor_notes: '초콜릿,견과류'
});

// 구독 신청
gtag('event', 'subscription_signup', {
  subscription_type: '월정기',
  subscription_value: 80000,
  delivery_frequency: '월 1회'
});

// 원두 추천 사용
gtag('event', 'use_recommendation', {
  recommendation_type: '취향 기반',
  recommended_items: 3,
  clicked_item: 'coffee_blend_002'
});

// 리뷰 작성
gtag('event', 'write_review', {
  item_id: 'coffee_blend_001',
  rating: 5,
  review_type: '구매후기'
});
```

### 마케팅 추적 이벤트
```javascript
// 쿠폰 사용
gtag('event', 'coupon_used', {
  coupon_code: 'FIRST10',
  discount_amount: 2500,
  order_value: 25000
});

// 뉴스레터 구독
gtag('event', 'newsletter_signup', {
  signup_method: '팝업',
  user_segment: '신규방문자'
});

// 소셜 공유
gtag('event', 'share', {
  method: 'instagram',
  content_type: 'product',
  item_id: 'coffee_blend_001'
});
```

## 📊 4단계: 향상된 전자상거래 설정

### 사용자 속성 설정
```javascript
// 고객 세그먼트 정의
gtag('config', 'G-XXXXXXXXXX', {
  user_properties: {
    customer_type: '신규고객', // 신규고객, 재구매고객
    preferred_roast: '미디움',
    purchase_frequency: '월 1회',
    average_order_value: '30000'
  }
});
```

### 맞춤 측정기준 설정
```javascript
// 제품별 상세 추적
gtag('event', 'page_view', {
  custom_parameters: {
    coffee_origin: '브라질',
    roast_date: '2024-12-01',
    bean_type: '아라비카',
    processing_method: '워시드'
  }
});
```

## 🔗 5단계: Cafe24 연동 설정

### 주문 완료 페이지 코드
```html
<!-- 주문 완료 페이지에 삽입 -->
<script>
// 주문 데이터 가져오기 (Cafe24 변수 활용)
var orderData = {
  transaction_id: '{$order_id}',
  value: {$total_price},
  tax: {$tax_amount},
  shipping: {$shipping_cost},
  currency: 'KRW',
  items: [
    {%for item in order_items%}
    {
      item_id: '{$item.product_code}',
      item_name: '{$item.product_name}',
      category: '{$item.category}',
      quantity: {$item.quantity},
      price: {$item.price}
    }{%if not loop.last%},{%endif%}
    {%endfor%}
  ]
};

// GA4로 구매 이벤트 전송
gtag('event', 'purchase', orderData);
</script>
```

### 장바구니 페이지 코드
```html
<script>
// 장바구니 데이터 추적
function trackCartItems() {
  var cartItems = [];
  var cartValue = 0;
  
  // Cafe24 장바구니 데이터 파싱
  $('.cart-item').each(function() {
    var item = {
      item_id: $(this).data('product-code'),
      item_name: $(this).find('.product-name').text(),
      category: $(this).data('category'),
      quantity: parseInt($(this).find('.quantity').val()),
      price: parseInt($(this).data('price'))
    };
    cartItems.push(item);
    cartValue += item.price * item.quantity;
  });
  
  // 장바구니 조회 이벤트
  gtag('event', 'view_cart', {
    currency: 'KRW',
    value: cartValue,
    items: cartItems
  });
}
</script>
```

## 📈 6단계: 대시보드 및 리포트 설정

### 맞춤 보고서 생성

#### 1. 이커머스 성과 보고서
```javascript
// 탐색 분석 > 경로 탐색
dimensions = ['이벤트 이름', '제품명', '캠페인']
metrics = ['전환수', '전환가치', '전환율']
filters = ['이벤트 이름 = purchase']
```

#### 2. 고객 여정 분석
```javascript
// 탐색 분석 > 유입경로 분석
steps = [
  'page_view (상품페이지)',
  'add_to_cart',
  'begin_checkout',
  'purchase'
]
```

#### 3. 코호트 분석 설정
```javascript
// 고객 > 코호트 분석
cohort_type = '획득일'
metric = '사용자 유지율'
granularity = '주별'
```

### 맞춤 대시보드 구성

#### 경영진 대시보드
- **핵심 지표**: 일일 매출, 주문 수, 전환율
- **트렌드**: 주간/월간 성장률
- **채널 성과**: 유입 경로별 기여도

#### 마케팅 대시보드  
- **캠페인 성과**: ROAS, 클릭률, 전환율
- **고객 획득**: CAC, 유입 경로 분석
- **행동 분석**: 페이지별 성과, 이탈률

## ⚙️ 7단계: 자동화 및 알림 설정

### Google Analytics Intelligence 활용
```javascript
// 인사이트 알림 설정
insights_config = {
  anomaly_detection: true,
  threshold_alerts: {
    daily_revenue: {min: 300000}, // 30만원 미만 시 알림
    conversion_rate: {min: 2.0},  // 2% 미만 시 알림
    bounce_rate: {max: 70}        // 70% 초과 시 알림
  }
}
```

### n8n 연동을 위한 API 설정
```javascript
// Google Analytics Reporting API v4 활용
const report_request = {
  reportRequests: [{
    viewId: 'VIEW_ID',
    dateRanges: [{startDate: '7daysAgo', endDate: 'today'}],
    metrics: [
      {expression: 'ga:transactions'},
      {expression: 'ga:transactionRevenue'},
      {expression: 'ga:ecommerceConversionRate'}
    ],
    dimensions: [
      {name: 'ga:source'},
      {name: 'ga:medium'},
      {name: 'ga:campaign'}
    ]
  }]
};
```

## 🎯 8단계: 목표 및 전환 설정

### 마이크로 전환 목표
- **뉴스레터 구독**: 월 50명
- **상품 상세 조회**: 세션당 2.5페이지
- **장바구니 추가**: 방문자의 8%

### 매크로 전환 목표
- **구매 완료**: 전체 방문자의 2.5%
- **재구매**: 기존 고객의 30% (분기별)
- **평균 주문가격**: 28,000원 이상

## 🔍 9단계: 데이터 검증 및 테스트

### 이벤트 추적 테스트
```javascript
// GA4 DebugView를 활용한 테스트
gtag('config', 'G-XXXXXXXXXX', {
  debug_mode: true // 개발 환경에서만 사용
});

// 테스트 이벤트 발송
function testEvents() {
  // 상품 조회 테스트
  gtag('event', 'view_item', {
    currency: 'KRW',
    value: 25000,
    items: [testItem]
  });
  
  console.log('테스트 이벤트 발송됨');
}
```

### 데이터 정확성 검증
- **일일 매출**: Cafe24 데이터와 GA4 비교 (±5% 이내)
- **주문 수**: 실제 주문과 GA4 구매 이벤트 일치
- **유입 경로**: UTM 파라미터와 GA4 소스/매체 일치

## 📋 구현 체크리스트

### 기본 설정
- [ ] GA4 속성 생성 및 gtag 설치
- [ ] 전자상거래 측정 활성화
- [ ] 데이터 스트림 설정 (웹)

### 이벤트 추적
- [ ] 구매 완료 이벤트 (purchase)
- [ ] 장바구니 추가 (add_to_cart)
- [ ] 결제 시작 (begin_checkout)
- [ ] 제품 조회 (view_item)

### 고급 설정
- [ ] 사용자 속성 정의
- [ ] 맞춤 측정기준 생성
- [ ] 전환 목표 설정
- [ ] 오디언스 정의

### 대시보드 구성
- [ ] 이커머스 개요 대시보드
- [ ] 고객 여정 분석 리포트
- [ ] 마케팅 성과 대시보드
- [ ] 실시간 모니터링 뷰

---

*정확한 데이터 추적을 통해 이미커피의 성공적인 이커머스 운영을 지원합니다.*

## Related Notes

- [[40-personal/44-reflections/learning/ab-method-philosophy]] - ai_automation 관련; 20-operations ↔ 40-personal 연결
- [[00-system/04-docs/WINDOWS_SETUP]] - ai_automation 관련; 20-operations ↔ 00-system 연결
- [[10-projects/12-education/12.01-imi-ai-study/Claude + MCP +n8n 자동화 실습 Study/Claude + MCP +n8n 자동화 실습 Study]] - ai_automation 관련; 20-operations ↔ 10-projects 연결
- [[10-projects/12-education/12.03-insight-platform/2024-09_첫번째_교육_wrap-up]] - ai_automation 관련; 20-operations ↔ 10-projects 연결
- [[30-knowledge/36-ai-tools/36.01-claude-code/vs-gpts-comparison]] - ai_automation 관련; 20-operations ↔ 30-knowledge 연결
