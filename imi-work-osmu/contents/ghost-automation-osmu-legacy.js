const GhostAdminAPI = require('@tryghost/admin-api');
const fs = require('fs');
const path = require('path');

// OSMU 지원하는 Ghost 자동화 스크립트
const api = new GhostAdminAPI({
    url: 'https://blog.imiwork.com',
    key: '689ab9c2806ede000158236d:bcf8cc2cdfe9d9ecf91c534145101b6586aa6586f6ccec19ba359ec071cc2f8a',
    version: 'v5.0'
});

class OSMUGhostPublisher {
    constructor() {
        this.assetsPath = 'imi-work-osmu/assets/images';
        this.ensureDirectories();
    }

    ensureDirectories() {
        const dirs = [
            `${this.assetsPath}/feature-images`,
            `${this.assetsPath}/social-images`, 
            `${this.assetsPath}/blog-images`
        ];
        
        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                console.log(`Created directory: ${dir}`);
            }
        });
    }

    async publishWithOSMU(postData, imageFile, slug, options = {}) {
        try {
            console.log('🚀 Starting OSMU Ghost publishing workflow...');
            
            // 1. Upload feature image to Ghost
            console.log('📤 Uploading feature image to Ghost...');
            const imageUpload = await api.images.upload({ file: imageFile });
            console.log(`✅ Image uploaded: ${imageUpload.url}`);
            
            // 2. Copy feature image to OSMU assets
            const featureImagePath = `${this.assetsPath}/feature-images/${slug}-feature.png`;
            if (fs.existsSync(imageFile)) {
                fs.copyFileSync(imageFile, featureImagePath);
                console.log(`💾 Feature image saved to: ${featureImagePath}`);
            }
            
            // 3. Process YouTube embed if provided
            let processedHTML = postData.html;
            if (options.youtubeUrl) {
                processedHTML = this.processYouTubeEmbed(processedHTML, options.youtubeUrl);
                console.log('🎥 YouTube embed processed');
            }
            
            // 4. Create Ghost post
            console.log('📝 Creating Ghost post...');
            const post = await api.posts.add({
                title: postData.title,
                slug: slug,
                html: processedHTML,
                meta_title: postData.meta_title,
                meta_description: postData.meta_description,
                custom_excerpt: postData.custom_excerpt,
                feature_image: imageUpload.url,
                featured: true,
                tags: postData.tags || [],
                status: 'draft' // Start as draft for review
            });
            
            console.log(`✅ Ghost post created: ${post.url}`);
            
            // 5. Save OSMU metadata
            const osmuData = {
                title: postData.title,
                slug: slug,
                ghostUrl: post.url,
                featureImageUrl: imageUpload.url,
                featureImageLocal: featureImagePath,
                socialImageLocal: null, // Will be generated separately if needed
                createdAt: new Date().toISOString(),
                youtubeUrl: options.youtubeUrl || null,
                tags: postData.tags || []
            };
            
            const metadataPath = `imi-work-osmu/contents/${slug}/osmu-metadata.json`;
            const contentDir = `imi-work-osmu/contents/${slug}`;
            
            if (!fs.existsSync(contentDir)) {
                fs.mkdirSync(contentDir, { recursive: true });
            }
            
            fs.writeFileSync(metadataPath, JSON.stringify(osmuData, null, 2));
            console.log(`📊 OSMU metadata saved: ${metadataPath}`);
            
            // 6. Generate OSMU report
            const report = this.generateOSMUReport(post, osmuData, options);
            console.log('\n' + report);
            
            return {
                success: true,
                post: post,
                osmuData: osmuData,
                report: report
            };
            
        } catch (error) {
            console.error('❌ OSMU publishing failed:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    processYouTubeEmbed(html, youtubeUrl) {
        const videoId = this.extractVideoId(youtubeUrl);
        if (!videoId) {
            console.warn('⚠️  Invalid YouTube URL, skipping embed');
            return html;
        }
        
        const responsiveEmbed = `
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 2rem 0;">
            <iframe 
                src="https://www.youtube.com/embed/${videoId}" 
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                frameborder="0" 
                allowfullscreen>
            </iframe>
        </div>`;
        
        // Replace placeholder or insert at beginning
        if (html.includes('<!-- YOUTUBE_PLACEHOLDER -->')) {
            return html.replace('<!-- YOUTUBE_PLACEHOLDER -->', responsiveEmbed);
        } else {
            // Insert after first paragraph
            const paragraphIndex = html.indexOf('</p>');
            if (paragraphIndex !== -1) {
                return html.slice(0, paragraphIndex + 4) + responsiveEmbed + html.slice(paragraphIndex + 4);
            }
            return responsiveEmbed + html;
        }
    }

    extractVideoId(url) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    generateOSMUReport(post, osmuData, options) {
        return `
# 🎉 OSMU Ghost 포스팅 자동화 완료!

## 📊 발행 결과
- **포스트 제목**: ${post.title}
- **Ghost URL**: ${post.url}
- **포스트 ID**: ${post.id} 
- **상태**: Draft (리뷰 후 발행 가능)

## 🖼️ OSMU 이미지 패키지  
- **피처 이미지**: ${osmuData.featureImageUrl} (1200x630)
- **로컬 저장**: ${osmuData.featureImageLocal}
- **네이버 블로그 호환**: ✅ 피처 이미지 재사용 가능
- **인스타그램 준비**: 📋 필요시 소셜 이미지 별도 생성 가능

## 📝 SEO 최적화
- **메타 제목**: ${post.meta_title || '자동 생성됨'}
- **메타 설명**: ${post.meta_description || '자동 생성됨'} 
- **URL Slug**: /${post.slug}
- **Tags**: ${osmuData.tags.join(', ') || '없음'}

${options.youtubeUrl ? `
## 🎬 YouTube 통합
- **YouTube URL**: ${options.youtubeUrl}
- **임베드 상태**: ✅ 반응형 최적화 완료
- **배치**: 글 상단 또는 첫 번째 문단 뒤
` : ''}

## 📋 OSMU 다음 단계
1. **네이버 블로그**: 피처 이미지 + 콘텐츠 재가공
2. **인스타그램**: 소셜 이미지 생성 + 캐럽션 최적화  
3. **기타 플랫폼**: 메타데이터 활용한 맞춤 콘텐츠

## ⚡ 기술 세부사항
- **OSMU 메타데이터**: imi-work-osmu/contents/${post.slug}/osmu-metadata.json
- **이미지 저장소**: imi-work-osmu/assets/images/
- **Ghost API**: v5.0 (성공적 연동)
- **실행 시간**: ${new Date().toLocaleString('ko-KR')}
        `.trim();
    }

    async generateSocialImage(slug, title, hookMessage) {
        // This would integrate with Gemini API for social image generation
        // For now, just create the file path structure
        const socialImagePath = `${this.assetsPath}/social-images/${slug}-instagram.png`;
        console.log(`📱 Social image will be generated at: ${socialImagePath}`);
        return socialImagePath;
    }
}

// 사용 예시
async function publishExample() {
    const publisher = new OSMUGhostPublisher();
    
    const postData = {
        title: "AI 리터러시 격차, 4개월이면 충분할까?",
        html: "<p>AI 시대의 새로운 도전...</p>",
        meta_title: "AI 리터러시 격차 분석 - IMI WORK",
        meta_description: "AI 활용 능력의 극단적 격차와 그 해결 방안을 15년 현장 경험으로 분석합니다.",
        custom_excerpt: "AI만큼 사용자들의 격차가 극단적인 분야가 있을까? 현장에서 본 AI 리터러시의 현실.",
        tags: ['AI', 'Digital Literacy', 'Business Strategy']
    };
    
    const options = {
        youtubeUrl: "https://youtu.be/9v_mwoi9Q4Q"
    };
    
    const result = await publisher.publishWithOSMU(
        postData, 
        'ai-literacy-gap-feature.png', 
        'ai-literacy-gap',
        options
    );
    
    return result;
}

module.exports = OSMUGhostPublisher;

// 직접 실행 시 예시 실행
if (require.main === module) {
    publishExample()
        .then(result => {
            if (result.success) {
                console.log('\n✅ OSMU 자동화 완료!');
            } else {
                console.log('\n❌ 자동화 실패:', result.error);
            }
        })
        .catch(error => {
            console.error('실행 오류:', error);
        });
}