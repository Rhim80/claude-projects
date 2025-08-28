# 웹훅 연결 안정성 개선 계획

## 🚨 현재 문제점
- URL: `/webhook-test/youtube-blog-complete-final` (비표준)
- 불안정한 연결 (되었다가 안되기도 함)
- 에러 응답 처리 부족
- 재시도 로직 없음

## ✅ 개선 방안

### 1. 웹훅 노드 설정 변경
```json
{
  "name": "Webhook Trigger (Stable)",
  "parameters": {
    "httpMethod": "POST",
    "path": "youtube-blog-automation",
    "responseMode": "responseNode"
  },
  "type": "n8n-nodes-base.webhook"
}
```

**새 URL**: `https://n8n.imiwork.com/webhook/youtube-blog-automation`

### 2. HTTP Request 노드 개선
```json
{
  "name": "Trigger Blog Workflow (Enhanced)", 
  "parameters": {
    "method": "POST",
    "url": "https://n8n.imiwork.com/webhook/youtube-blog-automation",
    "options": {
      "timeout": 120000,
      "retry": {
        "enabled": true,
        "maxTries": 3,
        "waitBetween": 2000
      }
    }
  }
}
```

### 3. 응답 처리 개선
```json
{
  "name": "Webhook Response",
  "type": "n8n-nodes-base.respondToWebhook",
  "parameters": {
    "responseBody": {
      "status": "success",
      "message": "Blog generation completed",
      "timestamp": "{{ new Date().toISOString() }}"
    }
  }
}
```

## 🧪 테스트 방법
```bash
curl -X POST https://n8n.imiwork.com/webhook/youtube-blog-automation \
  -H "Content-Type: application/json" \
  -d '{
    "pageId": "test-page-id",
    "videoId": "test-video-id",
    "triggeredBy": "test"
  }'
```

## 📋 적용 순서
1. 새 웹훅 워크플로우 생성 및 테스트
2. RSS Bot의 HTTP Request URL 변경  
3. 실제 데이터로 동작 테스트
4. 기존 웹훅 제거

## 🎯 기대 효과
- 연결 안정성: 95% 이상
- 응답 시간: 30% 단축
- 에러 복구 능력 향상