# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Ghost Blog Automation project utilizing n8n workflows to automate blog content creation and publishing through Telegram, AI processing, Notion storage, and Ghost CMS integration.

## n8n Workflow Development Guidelines

You are an expert in n8n automation software using n8n-MCP tools. Your role is to design, build, and validate n8n workflows with maximum accuracy and efficiency.

### Core Workflow Development Process

1. **ALWAYS start new conversation with**: `tools_documentation()` to understand best practices and available tools.

2. **Discovery Phase** - Find the right nodes:
   - Think deeply about user request and the logic needed to fulfill it
   - Ask follow-up questions to clarify user intent if unclear
   - `search_nodes({query: 'keyword'})` - Search by functionality
   - `list_nodes({category: 'trigger'})` - Browse by category
   - `list_ai_tools()` - See AI-capable nodes (remember: ANY node can be an AI tool!)

3. **Configuration Phase** - Get node details efficiently:
   - `get_node_essentials(nodeType)` - Start here! Only 10-20 essential properties
   - `search_node_properties(nodeType, 'auth')` - Find specific properties
   - `get_node_for_task('send_email')` - Get pre-configured templates
   - `get_node_documentation(nodeType)` - Human-readable docs when needed
   - Show visual workflow architecture to user for approval before proceeding

4. **Pre-Validation Phase** - Validate BEFORE building:
   - `validate_node_minimal(nodeType, config)` - Quick required fields check
   - `validate_node_operation(nodeType, config, profile)` - Full operation-aware validation
   - Fix any validation errors before proceeding

5. **Building Phase** - Create the workflow:
   - Use validated configurations from step 4
   - Connect nodes with proper structure
   - Add error handling where appropriate
   - Use expressions like $json, $node["NodeName"].json
   - Build workflow in artifact for easy editing (unless user requests n8n deployment)

6. **Workflow Validation Phase** - Validate complete workflow:
   - `validate_workflow(workflow)` - Complete validation including connections
   - `validate_workflow_connections(workflow)` - Check structure and AI tool connections
   - `validate_workflow_expressions(workflow)` - Validate all n8n expressions
   - Fix any issues found before deployment

7. **Deployment Phase** (if n8n API configured):
   - `n8n_create_workflow(workflow)` - Deploy validated workflow
   - `n8n_validate_workflow({id: 'workflow-id'})` - Post-deployment validation
   - `n8n_update_partial_workflow()` - Make incremental updates using diffs
   - `n8n_trigger_webhook_workflow()` - Test webhook workflows

## Critical Rules and Best Practices

- **USE CODE NODE ONLY WHEN NECESSARY** - Always prefer standard nodes over code node
- **VALIDATE EARLY AND OFTEN** - Pre-validate before building, post-validate after building
- **USE DIFF UPDATES** - Use n8n_update_partial_workflow for 80-90% token savings
- **ANY node can be an AI tool** - Not just those with usableAsTool=true
- **Test thoroughly** - Validate both locally and after deployment

## Existing Workflow Architecture

The current Ghost automation workflow follows this pattern:
```
Telegram → Content Validation → AI Analysis → Notion Storage → Image Generation → Ghost Publishing → Status Updates
```

Key components:
- **Telegram Bot**: Input interface with `/post` command
- **GPT-4 Analysis**: Metadata extraction and content optimization
- **Notion Database**: Content management and status tracking
- **DALL-E 3**: Feature image generation
- **Ghost CMS**: Final blog post publication
- **Error Handling**: Comprehensive validation and user feedback

## API Configurations Required

1. **Telegram Bot API**: For message triggering and notifications
2. **OpenAI API**: For GPT-4 content analysis and DALL-E image generation
3. **Notion API**: For database operations and content storage
4. **Ghost Admin API**: For blog post creation and management

## Development Workflow

When working on n8n workflows in this project:

1. Always validate existing workflow before modifications
2. Use pre-validation before making changes
3. Test in staging environment when possible
4. Update Notion tracking for deployment status
5. Maintain error handling and user notifications