# YouTube 콘텐츠 홍수 속에서 살아남기: RSS + AI 요약으로 정보 다이어트 시스템 구축하기

## 문제: 정보 과부하와 언어 장벽

요즘 YouTube에서 나오는 AI 관련 콘텐츠들이 너무 많다. 특히 해외 채널들은 정말 좋은 정보가 많은데, 영어라는 장벽 때문에 "나중에 봐야지" 하고 쌓아만 놓게 된다. 그러다 보면 정말 중요한 영상은 놓치고, 별로 중요하지 않은 영상에 시간을 쓰게 되는 악순환.

15년째 카페를 운영하면서 느낀 건데, 정보도 커피처럼 "큐레이션"이 중요하다. 좋은 원두를 골라서 적절히 볶아야 맛있는 커피가 나오는 것처럼, 좋은 정보를 골라서 적절히 요약해야 진짜 유용한 인사이트가 나온다.

그래서 만들었다. YouTube RSS + AI 요약 시스템을.

## 해결책: n8n으로 YouTube 콘텐츠 자동 분류 시스템

### 1단계: RSS로 실시간 모니터링

```json
{
  "id": "youtube-rss-trigger",
  "name": "YouTube RSS Monitor",
  "type": "n8n-nodes-base.rssFeedRead",
  "parameters": {
    "feedUrl": [
      "https://www.youtube.com/feeds/videos.xml?channel_id=UCXuqSBlHAE6Xw-yeJA0Tunw", // Linus Tech Tips
      "https://www.youtube.com/feeds/videos.xml?channel_id=UC4JX40jDee_tINbkjycV4Sg", // TechCrunch
      "https://www.youtube.com/feeds/videos.xml?channel_id=UCbfYPyITQ-7l4upoX8nvctg", // Two Minute Papers
      "https://www.youtube.com/feeds/videos.xml?channel_id=UCJQIAI7laI4VdCG25oAUWyQ"  // AI Explained
    ]
  }
}
```

처음에는 5개 채널로 시작했는데, 하루에 10-15개 영상이 올라온다. 이걸 다 보려면... 음, 카페 운영은 언제 하나?

### 2단계: YouTube 전사 API로 자막 추출

여기서 핵심은 YouTube의 자동 생성 자막을 가져오는 것이다. 영어 영상도 자막이 있으면 번역이 가능하니까.

```javascript
// YouTube 자막 추출 커스텀 노드
const videoId = items[0].json.link.split('v=')[1];
const response = await this.helpers.request({
  method: 'GET',
  url: `https://www.googleapis.com/youtube/v3/captions`,
  qs: {
    part: 'snippet',
    videoId: videoId,
    key: process.env.YOUTUBE_API_KEY
  }
});

// 자막 텍스트 정리
const cleanTranscript = transcript
  .replace(/\[.*?\]/g, '') // 타임스탬프 제거
  .replace(/\n+/g, ' ')    // 줄바꿈 정리
  .trim();
```

### 3단계: GPT-3.5로 스마트 요약

전사본을 그대로 읽기엔 너무 길고, 번역만 하기엔 맥락이 없다. 그래서 GPT-3.5에게 "3줄 요약 + 핵심 키워드" 형태로 정리해달라고 했다.

```text
다음 YouTube 영상의 전사본을 분석해서 다음 형식으로 요약해주세요:

**제목**: (영상 제목)
**채널**: (채널명)
**핵심 내용**: 
1. 첫 번째 주요 포인트
2. 두 번째 주요 포인트  
3. 세 번째 주요 포인트

**키워드**: #AI #머신러닝 #비즈니스 (최대 5개)
**볼 가치**: 높음/중간/낮음 (카페 사장이 비즈니스에 활용할 관점에서)

**전사본**:
{transcript}
```

이렇게 하니까 10분짜리 영상도 30초만에 핵심만 파악할 수 있게 됐다.

### 4단계: Notion 데이터베이스로 체계적 저장

```json
{
  "properties": {
    "제목": {"title": [{"text": {"content": videoTitle}}]},
    "채널": {"select": {"name": channelName}},
    "요약": {"rich_text": [{"text": {"content": summary}}]},
    "키워드": {"multi_select": keywordArray},
    "볼가치": {"select": {"name": watchValue}},
    "날짜": {"date": {"start": publishDate}},
    "링크": {"url": videoUrl},
    "상태": {"select": {"name": "새영상"}}
  }
}
```

Notion에 저장하면 좋은 점이 필터링과 정렬이 자유롭다는 거다. "볼 가치: 높음"만 모아서 볼 수도 있고, 키워드별로 분류해서 볼 수도 있고.

### 5단계: Telegram 알림으로 즉석 피드백

```javascript
const telegramMessage = `
🎥 새 영상 요약 완료!

**${videoTitle}**
채널: ${channelName}

${summary}

🔖 키워드: ${keywords.join(' ')}
📊 볼 가치: ${watchValue}

어떻게 하실래요?
`;

const keyboard = {
  "inline_keyboard": [
    [
      {"text": "👀 지금 보기", "url": videoUrl},
      {"text": "📚 나중에 보기", "callback_data": `later_${videoId}`}
    ],
    [
      {"text": "🗑 관심없음", "callback_data": `skip_${videoId}`},
      {"text": "📝 블로그용", "callback_data": `blog_${videoId}`}
    ]
  ]
};
```

이게 진짜 게임 체인저였다. 요약을 보고 "이거 괜찮네" 싶으면 바로 클릭해서 볼 수 있고, "나중에" 누르면 Notion에서 상태가 바뀐다.

## 예상치 못한 부작용들

### 1. 정보 FOMO 해결
이전에는 "이 영상도 봐야 하고, 저 영상도 봐야 하고" 하면서 스트레스받았는데, 이제는 요약만 보고 정말 필요한 것만 골라본다. 마음이 한결 편해졌다.

### 2. 해외 콘텐츠 접근성 향상
영어 영상에 대한 진입 장벽이 확실히 낮아졌다. 요약을 먼저 보고 "아, 이거 내가 알아야 할 내용이네" 싶으면 그때 집중해서 본다.

### 3. 트렌드 파악 속도 향상
AI 분야는 정말 빠르게 변하는데, 매일 아침 Notion에서 어제 올라온 영상들의 요약을 쭉 훑어보면 업계 동향을 빠르게 파악할 수 있다.

## 개선하고 싶은 것들

### 1. 중복 콘텐츠 필터링
같은 뉴스를 다루는 영상들이 여러 개 올라올 때가 있는데, 이걸 자동으로 그루핑하면 좋겠다.

### 2. 개인화된 추천
내가 "관심없음"을 누른 키워드들을 학습해서 비슷한 영상은 애초에 필터링하면 더 좋겠다.

### 3. 블로그 포스팅 자동 생성
"블로그용" 버튼을 누르면 자동으로 Ghost 블로그에 초안이 올라가면... 그건 너무 욕심일까?

## 운영 중인 워크플로우 상세

```
YouTube RSS 모니터링 (1시간마다)
↓
새 영상 감지
↓
YouTube API로 자막 추출
↓
GPT-3.5로 요약 생성
↓
Notion 데이터베이스 저장
↓
Telegram 알림 발송
↓
사용자 피드백 대기
↓
상태 업데이트 (본다/나중에/관심없음)
```

현재까지 처리한 영상: 약 150개
평균 처리 시간: 영상당 2-3분
일일 신규 영상: 10-15개
실제로 본 영상: 약 30% (이전엔 5%도 안 봤는데!)

## 비용

- n8n 클라우드: 월 $20
- OpenAI API (GPT-3.5): 월 $15 정도
- YouTube API: 무료 (할당량 내)
- Notion API: 무료
- Telegram Bot: 무료

월 $35 정도로 내 시간을 많이 아끼고, 정보 품질은 높일 수 있다. 카페 아메리카노 10잔 값으로 개인 비서를 하나 둔 셈이다.

## 결론

정보 홍수 시대에는 "더 많이 보는 것"보다 "잘 골라서 보는 것"이 중요하다. 이 시스템 덕분에 YouTube 영상 소비 패턴이 완전히 바뀌었다.

이전: 일단 저장해두고 → 쌓이기만 하고 → 결국 안 봄
현재: 요약 확인 → 필요한 것만 선별 → 집중해서 시청

카페에서 원두를 고를 때처럼, 정보도 큐레이션이 핵심이다. AI가 1차 선별을 해주고, 내가 최종 선택을 하는 이 조합이 꽤 만족스럽다.

그냥... 또 해봤다는 기록. ☕

---

*이 포스트는 실제 운영 중인 n8n 워크플로우를 바탕으로 작성되었습니다. 궁금한 점이나 개선 아이디어가 있으시면 언제든 공유해주세요!*

#n8n #YouTube #AI #자동화 #정보관리 #워크플로우

## Related Notes

- [[30-knowledge/33-insights/33.03-writing/전자음악과-발효커피-비유]] - ai_automation 관련; '결론' 개념 공유
- [[10-projects/12-education/12.04-insighter/AI시대_학습의_새로운_패러다임]] - ai_automation 관련; 20-operations ↔ 10-projects 연결
- [[00-inbox/2025-08-30]] - ai_automation 관련; 20-operations ↔ 00-inbox 연결
- [[10-projects/12-education/12.02-gpters-ai-branding/templates/brand-wheel-canvas/IMPROVEMENT_ROADMAP]] - ai_automation 관련; 20-operations ↔ 10-projects 연결
- [[10-projects/13-imi-work/13.01-osmu-system/guides/IMI_WORK_PERSONA_GUIDE]] - ai_automation 관련; 20-operations ↔ 10-projects 연결
