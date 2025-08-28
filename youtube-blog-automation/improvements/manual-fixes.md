# 기존 워크플로우 수동 수정 가이드

## 🎯 목표
기존 "YouTube Blog Complete Final" 워크플로우를 안정성 개선

## 📝 수정 항목 

### 1. 웹훅 노드 수정
**노드명**: "Webhook Trigger"
- **Path**: `youtube-blog-automation` (기존: `youtube-blog-complete-final`)
- **HTTP Method**: POST 유지
- **Response Mode**: Response Node 유지

### 2. YouTube 정보 추출 코드 개선
**노드명**: "Extract YouTube Info"
기존 코드를 다음으로 교체:

```javascript
// Enhanced YouTube 정보 추출 with error handling
const items = $input.all();
const results = [];

for (const item of items) {
  try {
    let youtubeUrl = '';
    let title = '제목 없음';
    let channelName = '채널명 없음';

    // YouTube URL 추출 (다중 경로 지원)
    if (item.json.properties?.URL?.url) {
      youtubeUrl = item.json.properties.URL.url;
    } else if (item.json.properties?.url?.url) {
      youtubeUrl = item.json.properties.url.url;
    } else if (item.json.property_url) {
      youtubeUrl = item.json.property_url;
    }

    if (!youtubeUrl) {
      throw new Error('YouTube URL을 찾을 수 없습니다.');
    }

    // 제목 추출 - 안전한 접근
    if (item.json.properties?.제목?.title?.[0]?.plain_text) {
      title = item.json.properties.제목.title[0].plain_text;
    } else if (item.json.property_) {
      title = item.json.property_;
    } else if (item.json.name) {
      title = item.json.name;
    }

    // 채널명 추출 - 안전한 접근
    if (item.json.properties?.채널명?.rich_text?.[0]?.plain_text) {
      channelName = item.json.properties.채널명.rich_text[0].plain_text;
    } else if (item.json.property_rss) {
      channelName = item.json.property_rss;
    }

    // YouTube video ID 추출
    let videoId = '';
    const match = youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (match && match[1]) {
      videoId = match[1];
    } else {
      throw new Error('유효한 YouTube video ID를 추출할 수 없습니다.');
    }

    results.push({
      json: {
        videoId: videoId,
        youtubeUrl: youtubeUrl,
        title: title,
        channelName: channelName,
        success: true
      }
    });

  } catch (error) {
    console.error('YouTube 정보 추출 오류:', error.message);
    results.push({
      json: {
        videoId: null,
        youtubeUrl: null,
        title: '오류: ' + error.message,
        channelName: '추출 실패',
        success: false,
        error: error.message
      }
    });
  }
}

return results;
```

### 3. 에러 처리 노드 추가
YouTube 정보 추출 후 IF 노드 추가:
- **노드명**: "Check Extraction Success"
- **조건**: `{{ $json.json.success }}` equals `true`
- True 출력 → 기존 플로우 계속
- False 출력 → 에러 처리

### 4. 각 노드에 에러 처리 설정
다음 노드들에 설정 추가:
- **Continue On Fail**: ✅
- **Retry On Fail**: ✅  
- **Max Tries**: 3
- **Wait Between**: 2000ms

적용 대상:
- Get Video Info from Notion
- Get YouTube Transcript  
- Create Blog Article
- SEO Optimization

## 🎯 최우선 수정사항
1. **웹훅 Path 변경**: `youtube-blog-automation`
2. **YouTube 정보 추출 코드 교체**
3. **RSS Bot URL 변경**: 새 웹훅 경로로

## 🧪 테스트 순서
1. 웹훅 Path 변경 후 저장
2. RSS Bot URL 변경 
3. Telegram 테스트
4. 나머지 개선사항 적용