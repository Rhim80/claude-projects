# 자막 중복 추출 해결 방안

## 현재 문제점
- RSS Bot: 자막 추출 → 요약만 저장
- Blog 워크플로우: 자막 재추출 → 전체 자막 사용
- **결과**: 동일한 영상의 자막을 2번 추출

## 개선 전략

### 1단계: RSS Bot 수정
```json
// Notion 저장 시 자막 원문도 함께 저장
{
  "key": "자막원문|rich_text",
  "textContent": "={{ $json.transcript }}"
}
```

### 2단계: Blog 워크플로우 수정
```javascript
// 자막 재사용 로직
const savedTranscript = notionData.properties?.자막원문?.rich_text?.[0]?.plain_text;

if (savedTranscript && savedTranscript.length > 100) {
  // 저장된 자막 사용
  return { transcript: savedTranscript, source: 'cached' };
} else {
  // 자막이 없거나 너무 짧은 경우만 재추출
  return await fetchYouTubeTranscript(videoId);
}
```

### 예상 개선 효과
- **처리 시간**: 30-40초 단축
- **API 호출량**: 50% 감소  
- **안정성**: 자막 추출 실패 리스크 감소
- **비용**: YouTube Transcript API 사용량 절약

### 호환성 보장
- 기존 데이터: 자막원문 필드가 없는 경우 자동으로 재추출
- 점진적 적용: 새로운 영상부터 적용, 기존 영상은 기존 방식 유지