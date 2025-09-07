// n8n Playwright Test Suite
// This script demonstrates how to test n8n workflows using Playwright

const { test, expect } = require('@playwright/test');

// Configuration
const N8N_BASE_URL = process.env.N8N_BASE_URL || 'http://localhost:5678';
const WEBHOOK_ID = 'kQcqTFQc9Eibc9rR'; // Created workflow ID
const WEBHOOK_PATH = 'test-webhook';

test.describe('n8n Workflow Testing', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to n8n interface
    await page.goto(N8N_BASE_URL);
    
    // Wait for n8n to load
    await page.waitForSelector('[data-test-id="canvas"]', { timeout: 10000 });
  });

  test('should create and test webhook workflow', async ({ page }) => {
    // Test workflow creation via UI
    await page.click('[data-test-id="new-workflow-button"]');
    
    // Add webhook node
    await page.click('[data-test-id="node-creator-trigger-button"]');
    await page.fill('[data-test-id="search-input"]', 'webhook');
    await page.click('[data-test-id="node-item-webhook"]');
    
    // Configure webhook
    await page.click('[data-test-id="parameter-input-path"]');
    await page.fill('[data-test-id="parameter-input-path"]', WEBHOOK_PATH);
    
    // Set HTTP method to POST
    await page.click('[data-test-id="parameter-select-httpMethod"]');
    await page.click('[data-test-id="parameter-option-POST"]');
    
    // Add respond to webhook node
    await page.click('[data-test-id="add-node-button"]');
    await page.fill('[data-test-id="search-input"]', 'respond to webhook');
    await page.click('[data-test-id="node-item-respondToWebhook"]');
    
    // Save workflow
    await page.keyboard.press('Control+s');
    await page.fill('[data-test-id="workflow-name-input"]', 'Playwright Test Workflow');
    await page.click('[data-test-id="save-button"]');
    
    // Activate workflow
    await page.click('[data-test-id="workflow-activate-switch"]');
    
    // Verify workflow is active
    await expect(page.locator('[data-test-id="workflow-activate-switch"]')).toHaveAttribute('checked');
  });

  test('should test webhook endpoint', async ({ page, request }) => {
    // Test the webhook endpoint directly
    const webhookUrl = `${N8N_BASE_URL}/webhook/${WEBHOOK_PATH}`;
    
    const response = await request.post(webhookUrl, {
      data: {
        test: true,
        message: 'Playwright test data',
        timestamp: new Date().toISOString()
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('status', 'success');
    expect(responseBody).toHaveProperty('message', 'Test webhook received');
  });

  test('should monitor workflow executions', async ({ page }) => {
    // Navigate to executions page
    await page.goto(`${N8N_BASE_URL}/workflow/${WEBHOOK_ID}/executions`);
    
    // Wait for executions list
    await page.waitForSelector('[data-test-id="executions-list"]');
    
    // Check if there are any executions
    const executionCount = await page.locator('[data-test-id="execution-item"]').count();
    
    if (executionCount > 0) {
      // Click on the latest execution
      await page.click('[data-test-id="execution-item"]:first-child');
      
      // Verify execution details
      await page.waitForSelector('[data-test-id="execution-details"]');
      
      // Check execution status
      const status = await page.locator('[data-test-id="execution-status"]').textContent();
      expect(['success', 'running', 'waiting'].includes(status.toLowerCase())).toBeTruthy();
    }
  });

  test('should test workflow editor functionality', async ({ page }) => {
    // Navigate to specific workflow
    await page.goto(`${N8N_BASE_URL}/workflow/${WEBHOOK_ID}`);
    
    // Wait for workflow to load
    await page.waitForSelector('[data-test-id="canvas"]');
    
    // Verify nodes are present
    const nodeCount = await page.locator('[data-test-id="canvas-node"]').count();
    expect(nodeCount).toBeGreaterThan(0);
    
    // Test node selection
    await page.click('[data-test-id="canvas-node"]:first-child');
    
    // Verify node parameters panel opens
    await expect(page.locator('[data-test-id="parameter-panel"]')).toBeVisible();
    
    // Test workflow execution
    await page.click('[data-test-id="execute-workflow-button"]');
    
    // Wait for execution to complete
    await page.waitForSelector('[data-test-id="execution-success"]', { timeout: 30000 });
  });

  test('should test error handling', async ({ page, request }) => {
    // Test invalid webhook request
    const webhookUrl = `${N8N_BASE_URL}/webhook/invalid-path`;
    
    const response = await request.post(webhookUrl, {
      data: { invalid: 'data' }
    });
    
    expect(response.status()).toBe(404);
  });

  test('should validate workflow configuration', async ({ page }) => {
    // Navigate to workflow
    await page.goto(`${N8N_BASE_URL}/workflow/${WEBHOOK_ID}`);
    
    // Open workflow settings
    await page.click('[data-test-id="workflow-settings-button"]');
    
    // Verify workflow settings
    await expect(page.locator('[data-test-id="workflow-name"]')).toContainText('Test Webhook Workflow');
    
    // Check error workflow setting
    const errorWorkflow = await page.locator('[data-test-id="error-workflow-select"]').inputValue();
    console.log('Error workflow setting:', errorWorkflow);
    
    // Close settings
    await page.click('[data-test-id="close-settings-button"]');
  });

  test('should test node connections', async ({ page }) => {
    // Navigate to workflow
    await page.goto(`${N8N_BASE_URL}/workflow/${WEBHOOK_ID}`);
    
    // Verify connection between nodes
    const connections = await page.locator('[data-test-id="connection-line"]').count();
    expect(connections).toBeGreaterThan(0);
    
    // Test adding new connection
    await page.hover('[data-test-id="node-output-endpoint"]');
    await page.mouse.down();
    await page.hover('[data-test-id="node-input-endpoint"]');
    await page.mouse.up();
    
    // Verify new connection was created
    const newConnectionCount = await page.locator('[data-test-id="connection-line"]').count();
    expect(newConnectionCount).toBeGreaterThanOrEqual(connections);
  });
});

// Utility functions for n8n testing
class N8nTestUtils {
  constructor(page) {
    this.page = page;
  }

  async createWebhookWorkflow(name, path, method = 'POST') {
    await this.page.click('[data-test-id="new-workflow-button"]');
    
    // Add webhook node
    await this.addNode('webhook');
    await this.setNodeParameter('path', path);
    await this.setNodeParameter('httpMethod', method);
    
    // Add response node
    await this.addNode('respond to webhook');
    
    // Save workflow
    await this.saveWorkflow(name);
    
    return await this.getWorkflowId();
  }

  async addNode(nodeType) {
    await this.page.click('[data-test-id="add-node-button"]');
    await this.page.fill('[data-test-id="search-input"]', nodeType);
    await this.page.click(`[data-test-id="node-item-${nodeType.replace(/\s+/g, '')}"]`);
  }

  async setNodeParameter(parameter, value) {
    await this.page.click(`[data-test-id="parameter-input-${parameter}"]`);
    await this.page.fill(`[data-test-id="parameter-input-${parameter}"]`, value);
  }

  async saveWorkflow(name) {
    await this.page.keyboard.press('Control+s');
    await this.page.fill('[data-test-id="workflow-name-input"]', name);
    await this.page.click('[data-test-id="save-button"]');
  }

  async getWorkflowId() {
    const url = this.page.url();
    const match = url.match(/\/workflow\/([^\/]+)/);
    return match ? match[1] : null;
  }

  async activateWorkflow() {
    await this.page.click('[data-test-id="workflow-activate-switch"]');
  }

  async testWebhook(webhookPath, data = {}) {
    const webhookUrl = `${N8N_BASE_URL}/webhook/${webhookPath}`;
    
    const response = await this.page.request.post(webhookUrl, {
      data: data,
      headers: { 'Content-Type': 'application/json' }
    });
    
    return {
      status: response.status(),
      body: await response.json().catch(() => null)
    };
  }
}

module.exports = { N8nTestUtils };