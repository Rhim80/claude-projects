#!/usr/bin/env node

/**
 * OSMU Pipeline Orchestrator
 * 
 * Coordinates the complete OSMU (One Source Multi Use) workflow:
 * 1. Content creation (imi-work-persona-writer)
 * 2. Image generation (osmu-image-generator)
 * 3. Platform publishing (ghost-auto-publisher, naver-seo-writer, sns-essay-writer)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class OSMUPipeline {
    constructor() {
        this.config = {
            assetsPath: 'imi-work-osmu/assets/images',
            scriptsPath: 'imi-work-osmu/scripts',
            contentsPath: 'imi-work-osmu/contents'
        };
        this.currentJob = null;
    }

    /**
     * Execute complete OSMU pipeline
     * @param {Object} jobConfig - Pipeline configuration
     */
    async execute(jobConfig) {
        const startTime = Date.now();
        this.currentJob = {
            id: this.generateJobId(),
            config: jobConfig,
            startTime: startTime,
            status: 'running',
            steps: []
        };

        console.log(`🚀 Starting OSMU Pipeline Job: ${this.currentJob.id}`);
        console.log(`📋 Target platforms: ${jobConfig.platforms.join(', ')}`);

        try {
            // Step 1: Content Creation (if needed)
            if (!jobConfig.existingContent) {
                await this.executeStep('content-creation', async () => {
                    console.log('📝 Creating content with imi-work-persona-writer...');
                    // This would integrate with Claude Code agent system
                    return { status: 'completed', output: 'Content created' };
                });
            }

            // Step 2: Image Generation
            await this.executeStep('image-generation', async () => {
                console.log('🎨 Generating OSMU image package...');
                return await this.generateImagePackage(jobConfig);
            });

            // Step 3: Platform Publishing
            for (const platform of jobConfig.platforms) {
                await this.executeStep(`publish-${platform}`, async () => {
                    console.log(`📤 Publishing to ${platform}...`);
                    return await this.publishToPlatform(platform, jobConfig);
                });
            }

            // Step 4: Completion Report
            await this.generateCompletionReport();

            this.currentJob.status = 'completed';
            const duration = Date.now() - startTime;
            console.log(`✅ OSMU Pipeline completed in ${duration}ms`);

        } catch (error) {
            this.currentJob.status = 'failed';
            console.error('❌ OSMU Pipeline failed:', error);
            throw error;
        }

        return this.currentJob;
    }

    /**
     * Execute a pipeline step with error handling and logging
     */
    async executeStep(stepName, stepFunction) {
        const stepStart = Date.now();
        console.log(`🔄 Executing step: ${stepName}`);

        try {
            const result = await stepFunction();
            const stepDuration = Date.now() - stepStart;
            
            this.currentJob.steps.push({
                name: stepName,
                status: 'completed',
                duration: stepDuration,
                result: result
            });

            console.log(`✅ Step '${stepName}' completed in ${stepDuration}ms`);
            return result;

        } catch (error) {
            const stepDuration = Date.now() - stepStart;
            
            this.currentJob.steps.push({
                name: stepName,
                status: 'failed',
                duration: stepDuration,
                error: error.message
            });

            console.error(`❌ Step '${stepName}' failed after ${stepDuration}ms:`, error.message);
            throw error;
        }
    }

    /**
     * Generate complete image package for all target platforms
     */
    async generateImagePackage(jobConfig) {
        const { slug, title, summary, platforms } = jobConfig;
        const imageDir = path.join(this.config.assetsPath, slug);

        // Create directory structure
        for (const platform of platforms) {
            const platformDir = path.join(imageDir, platform);
            if (!fs.existsSync(platformDir)) {
                fs.mkdirSync(platformDir, { recursive: true });
            }
        }

        // Generate platform-specific images
        const manifest = {
            slug: slug,
            title: title,
            created_at: new Date().toISOString(),
            generator_version: "1.0",
            content_summary: summary,
            platforms: {},
            generation_metadata: {
                total_images: 0,
                prompts_used: {},
                generation_time: new Date().toISOString(),
                api_calls: 0,
                generator_agent: "osmu-pipeline"
            }
        };

        // Ghost platform images
        if (platforms.includes('ghost')) {
            console.log('  📷 Generating Ghost images...');
            manifest.platforms.ghost = {
                feature: "ghost/feature.png",
                content: []
            };
            // Here would call osmu-image-generator agent
            // await this.callAgent('osmu-image-generator', { platform: 'ghost', ... });
        }

        // Naver platform images
        if (platforms.includes('naver')) {
            console.log('  📷 Generating Naver images...');
            manifest.platforms.naver = {
                main: "naver/main.png",
                body: ["naver/body-1.png", "naver/body-2.png", "naver/body-3.png"]
            };
        }

        // Instagram platform images
        if (platforms.includes('instagram')) {
            console.log('  📷 Generating Instagram images...');
            manifest.platforms.instagram = {
                feed: "instagram/feed.png",
                story: "instagram/story.png",
                carousel: ["instagram/carousel-1.png", "instagram/carousel-2.png"]
            };
        }

        // Save manifest
        const manifestPath = path.join(imageDir, 'image-manifest.json');
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

        console.log(`📄 Image manifest saved: ${manifestPath}`);
        return { manifest: manifest, imagePath: imageDir };
    }

    /**
     * Publish content to specific platform
     */
    async publishToPlatform(platform, jobConfig) {
        const { slug } = jobConfig;
        
        switch (platform) {
            case 'ghost':
                console.log('  👻 Publishing to Ghost CMS...');
                // Here would call ghost-auto-publisher agent
                // return await this.callAgent('ghost-auto-publisher', { slug, content: jobConfig.content });
                return { status: 'published', url: `https://blog.imiwork.com/${slug}` };

            case 'naver':
                console.log('  🔍 Publishing to Naver Blog...');
                // Here would call naver-seo-writer agent
                return { status: 'published', url: `https://blog.naver.com/imiwork/${slug}` };

            case 'instagram':
                console.log('  📸 Preparing Instagram content...');
                // Here would call sns-essay-writer agent
                return { status: 'prepared', assets: ['feed.png', 'story.png', 'caption.txt'] };

            default:
                throw new Error(`Unsupported platform: ${platform}`);
        }
    }

    /**
     * Generate comprehensive completion report
     */
    async generateCompletionReport() {
        const report = {
            jobId: this.currentJob.id,
            title: this.currentJob.config.title,
            platforms: this.currentJob.config.platforms,
            totalDuration: Date.now() - this.currentJob.startTime,
            steps: this.currentJob.steps,
            assets: this.getGeneratedAssets(),
            nextSteps: this.generateNextSteps()
        };

        const reportPath = path.join(this.config.scriptsPath, `reports/osmu-${this.currentJob.id}.json`);
        
        // Ensure reports directory exists
        const reportsDir = path.dirname(reportPath);
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
        }

        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(`📊 Completion report saved: ${reportPath}`);

        // Also generate markdown summary
        const markdownReport = this.generateMarkdownReport(report);
        const markdownPath = reportPath.replace('.json', '.md');
        fs.writeFileSync(markdownPath, markdownReport);

        return report;
    }

    /**
     * Generate markdown format report
     */
    generateMarkdownReport(report) {
        return `# OSMU Pipeline Report

## Job Summary
- **Job ID**: ${report.jobId}
- **Content**: ${report.title}
- **Platforms**: ${report.platforms.join(', ')}
- **Duration**: ${report.totalDuration}ms
- **Status**: ${this.currentJob.status}

## Execution Steps
${report.steps.map(step => 
    `- **${step.name}**: ${step.status} (${step.duration}ms)`
).join('\n')}

## Generated Assets
${report.assets.map(asset => `- ${asset}`).join('\n')}

## Next Steps
${report.nextSteps.map(step => `- ${step}`).join('\n')}

---
*Generated by OSMU Pipeline at ${new Date().toISOString()}*
`;
    }

    /**
     * Get list of all generated assets
     */
    getGeneratedAssets() {
        const { slug } = this.currentJob.config;
        const imageDir = path.join(this.config.assetsPath, slug);
        const assets = [];

        if (fs.existsSync(imageDir)) {
            const walkDir = (dir, prefix = '') => {
                const items = fs.readdirSync(dir);
                for (const item of items) {
                    const fullPath = path.join(dir, item);
                    const relativePath = path.join(prefix, item);
                    
                    if (fs.statSync(fullPath).isDirectory()) {
                        walkDir(fullPath, relativePath);
                    } else {
                        assets.push(relativePath);
                    }
                }
            };
            walkDir(imageDir);
        }

        return assets;
    }

    /**
     * Generate platform-specific next steps
     */
    generateNextSteps() {
        const platforms = this.currentJob.config.platforms;
        const steps = [];

        if (platforms.includes('ghost')) {
            steps.push('Ghost: Review draft post and publish when ready');
        }
        if (platforms.includes('naver')) {
            steps.push('Naver: Optimize tags and schedule publishing');
        }
        if (platforms.includes('instagram')) {
            steps.push('Instagram: Upload images and post with generated caption');
        }

        return steps;
    }

    /**
     * Generate unique job ID
     */
    generateJobId() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const random = Math.random().toString(36).substr(2, 5);
        return `osmu-${timestamp}-${random}`;
    }

    /**
     * Call Claude Code agent (placeholder for actual implementation)
     */
    async callAgent(agentName, params) {
        // This would integrate with the actual Claude Code agent system
        console.log(`🤖 Calling agent: ${agentName}`, params);
        return { status: 'completed', agent: agentName };
    }
}

// CLI interface
if (require.main === module) {
    const pipeline = new OSMUPipeline();
    
    // Example job configuration
    const jobConfig = {
        slug: 'ai-literacy-gap',
        title: 'AI 리터러시 격차, 4개월이면 충분할까?',
        summary: 'AI 활용 능력의 극단적 격차와 그 해결 방안을 15년 현장 경험으로 분석',
        platforms: ['ghost', 'naver', 'instagram'],
        content: null, // Would be provided or generated
        existingContent: false
    };

    pipeline.execute(jobConfig)
        .then(result => {
            console.log('\n🎉 Pipeline execution completed successfully!');
            console.log(`📊 Job ID: ${result.id}`);
        })
        .catch(error => {
            console.error('\n💥 Pipeline execution failed:', error.message);
            process.exit(1);
        });
}

module.exports = OSMUPipeline;