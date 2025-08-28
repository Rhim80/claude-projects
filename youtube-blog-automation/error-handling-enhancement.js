// 강화된 에러 처리 시스템

class WorkflowErrorHandler {
  constructor(telegramBot, notionClient) {
    this.telegram = telegramBot;
    this.notion = notionClient;
    this.maxRetries = 3;
    this.baseDelay = 1000; // 1 second
  }

  async executeWithRetry(operation, operationName, context = {}) {
    let lastError;
    
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const result = await operation();
        
        // 성공 시 복구 상태 기록
        if (attempt > 1) {
          await this.logRecovery(operationName, attempt, context);
        }
        
        return { success: true, data: result, attempts: attempt };
      } catch (error) {
        lastError = error;
        const isLastAttempt = attempt === this.maxRetries;
        
        // 재시도 불가능한 에러 체크
        if (this.isNonRetryableError(error)) {
          await this.logFatalError(operationName, error, context);
          throw error;
        }
        
        if (!isLastAttempt) {
          const delay = this.calculateDelay(attempt);
          await this.logRetryAttempt(operationName, attempt, error, delay);
          await this.sleep(delay);
        }
      }
    }
    
    // 모든 재시도 실패
    await this.logFinalFailure(operationName, lastError, context);
    throw lastError;
  }

  isNonRetryableError(error) {
    const nonRetryablePatterns = [
      /invalid.*video.*id/i,
      /video.*not.*found/i,
      /unauthorized.*access/i,
      /invalid.*credentials/i,
      /malformed.*request/i
    ];
    
    return nonRetryablePatterns.some(pattern => 
      pattern.test(error.message)
    );
  }

  calculateDelay(attempt) {
    return this.baseDelay * Math.pow(2, attempt - 1); // Exponential backoff
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async logRetryAttempt(operation, attempt, error, delay) {
    const message = `🔄 재시도 ${attempt}/${this.maxRetries}\n` +
      `📍 작업: ${operation}\n` +
      `❌ 오류: ${error.message.substring(0, 100)}\n` +
      `⏰ ${delay}ms 후 재시도`;
    
    await this.telegram.sendMessage('7830356405', message);
  }

  async logRecovery(operation, totalAttempts, context) {
    const message = `✅ 복구 성공!\n` +
      `📍 작업: ${operation}\n` +
      `🔄 시도 횟수: ${totalAttempts}\n` +
      `📝 컨텍스트: ${JSON.stringify(context)}`;
    
    await this.telegram.sendMessage('7830356405', message);
  }

  async logFinalFailure(operation, error, context) {
    const message = `🚨 최종 실패\n` +
      `📍 작업: ${operation}\n` +
      `❌ 오류: ${error.message}\n` +
      `📝 컨텍스트: ${JSON.stringify(context)}\n` +
      `🔧 수동 확인 필요`;
    
    await this.telegram.sendMessage('7830356405', message);
    
    // Notion에도 에러 로그 저장
    await this.notion.pages.create({
      parent: { database_id: 'error-log-database-id' },
      properties: {
        'Operation': { title: [{ text: { content: operation } }] },
        'Error': { rich_text: [{ text: { content: error.message } }] },
        'Context': { rich_text: [{ text: { content: JSON.stringify(context) } }] },
        'Timestamp': { date: { start: new Date().toISOString() } }
      }
    });
  }
}

// 사용 예시
async function robustYouTubeTranscriptExtraction(videoId) {
  const errorHandler = new WorkflowErrorHandler(telegramBot, notionClient);
  
  const operation = async () => {
    return await youTubeTranscriptAPI.extract(videoId);
  };
  
  return await errorHandler.executeWithRetry(
    operation, 
    'YouTube 자막 추출',
    { videoId, timestamp: new Date().toISOString() }
  );
}

module.exports = { WorkflowErrorHandler, robustYouTubeTranscriptExtraction };