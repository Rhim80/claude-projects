// Global test setup for n8n Playwright tests
const { chromium } = require('@playwright/test');

async function globalSetup(config) {
  console.log('🚀 Setting up n8n Playwright tests...');
  
  const baseURL = config.use.baseURL || 'http://localhost:5678';
  
  // Launch browser for setup
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Check if n8n is running
    console.log(`📡 Checking n8n connectivity at ${baseURL}...`);
    
    const response = await page.goto(baseURL, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    if (!response || !response.ok()) {
      throw new Error(`n8n is not accessible at ${baseURL}. Make sure n8n is running.`);
    }
    
    console.log('✅ n8n is accessible');
    
    // Wait for n8n interface to load
    await page.waitForSelector('[data-test-id="canvas"], .el-loading-mask', { 
      timeout: 30000 
    });
    
    // Check if login is required
    const loginForm = await page.$('[data-test-id="login-form"]');
    if (loginForm) {
      console.log('🔐 Login required - please ensure n8n is configured for testing');
      
      // You can add automatic login here if needed
      // await page.fill('[data-test-id="email-input"]', 'test@example.com');
      // await page.fill('[data-test-id="password-input"]', 'password');
      // await page.click('[data-test-id="login-button"]');
    }
    
    console.log('✅ n8n setup complete');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('');
    console.log('Setup requirements:');
    console.log('1. Start n8n: npm run start (or n8n start)');
    console.log('2. Ensure n8n is accessible at:', baseURL);
    console.log('3. Configure authentication if required');
    console.log('');
    throw error;
  } finally {
    await context.close();
    await browser.close();
  }
}

module.exports = globalSetup;