const GhostAdminAPI = require('@tryghost/admin-api');
const fs = require('fs');
const path = require('path');

/**
 * OSMU Ghost Publisher v2.0
 * 
 * 새로운 아키텍처 기반:
 * - 이미지 생성은 osmu-image-generator에서 담당
 * - 이 클래스는 이미지 패키지를 로드하여 Ghost에 발행하는 것에만 집중
 */
const api = new GhostAdminAPI({
    url: 'https://blog.imiwork.com',
    key: '689ab9c2806ede000158236d:bcf8cc2cdfe9d9ecf91c534145101b6586aa6586f6ccec19ba359ec071cc2f8a',
    version: 'v5.0'
});

class OSMUGhostPublisherV2 {
    constructor() {
        this.assetsBasePath = 'imi-work-osmu/assets/images';
    }

    /**
     * OSMU 이미지 매니페스트 로드
     * @param {string} slug - 콘텐츠 slug
     * @returns {Object} 이미지 매니페스트 데이터
     */
    loadImageManifest(slug) {
        const manifestPath = path.join(this.assetsBasePath, slug, 'image-manifest.json');
        
        if (!fs.existsSync(manifestPath)) {
            throw new Error(`OSMU image manifest not found: ${manifestPath}`);
        }
        
        console.log(`📄 Loading image manifest: ${manifestPath}`);
        return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    }

    /**
     * Ghost용 이미지 경로들 추출
     * @param {string} slug - 콘텐츠 slug
     * @returns {Object} Ghost용 이미지 경로들
     */
    getGhostImagePaths(slug) {
        const manifest = this.loadImageManifest(slug);
        const basePath = path.join(this.assetsBasePath, slug);
        const ghostImages = manifest.platforms.ghost;
        
        if (!ghostImages) {
            throw new Error(`No Ghost images found in manifest for slug: ${slug}`);
        }
        
        const imagePaths = {
            feature: ghostImages.feature ? path.join(basePath, ghostImages.feature) : null,
            content: (ghostImages.content || []).map(img => path.join(basePath, img))
        };
        
        // 파일 존재 여부 확인
        this.validateImageFiles(imagePaths);
        
        return imagePaths;
    }

    /**
     * 이미지 파일들이 실제로 존재하는지 확인
     * @param {Object} imagePaths - 이미지 경로 객체
     */
    validateImageFiles(imagePaths) {
        const allPaths = [imagePaths.feature, ...imagePaths.content].filter(Boolean);
        
        for (const imagePath of allPaths) {
            if (!fs.existsSync(imagePath)) {
                throw new Error(`Required image file not found: ${imagePath}`);
            }
        }
        
        console.log(`✅ All ${allPaths.length} image files validated`);
    }

    /**
     * Ghost CMS에 OSMU 이미지 패키지를 활용하여 포스트 발행
     * @param {Object} postData - 포스트 데이터
     * @param {string} slug - 콘텐츠 slug (이미지 패키지 참조용)
     * @param {Object} options - 추가 옵션
     */
    async publishWithOSMUPackage(postData, slug, options = {}) {
        try {
            console.log(`🚀 Starting OSMU Ghost publishing for slug: ${slug}`);
            
            // 1. OSMU 이미지 패키지 로드
            console.log('📦 Loading OSMU image package...');
            const imagePaths = this.getGhostImagePaths(slug);
            const manifest = this.loadImageManifest(slug);
            
            // 2. Feature image 업로드
            let featureImageUrl = null;
            if (imagePaths.feature) {
                console.log('📤 Uploading feature image to Ghost...');
                const featureUpload = await api.images.upload({
                    file: fs.createReadStream(imagePaths.feature)
                });
                featureImageUrl = featureUpload.url;
                console.log(`✅ Feature image uploaded: ${featureImageUrl}`);
            }
            
            // 3. 콘텐츠 이미지들 업로드
            const contentImageUrls = [];
            for (const contentImagePath of imagePaths.content) {
                console.log(`📤 Uploading content image: ${path.basename(contentImagePath)}`);
                const contentUpload = await api.images.upload({
                    file: fs.createReadStream(contentImagePath)
                });
                contentImageUrls.push(contentUpload.url);
                console.log(`✅ Content image uploaded: ${contentUpload.url}`);
            }
            
            // 4. HTML 콘텐츠 처리 (콘텐츠 이미지 플레이스홀더 교체)
            let processedHTML = postData.html || '';
            contentImageUrls.forEach((imageUrl, index) => {
                const placeholder = `<!-- CONTENT_IMAGE_${index + 1} -->`;
                const imageHTML = `<img src="${imageUrl}" alt="${postData.title} - Content Image ${index + 1}" style="max-width: 100%; height: auto; margin: 2rem 0;">`;
                processedHTML = processedHTML.replace(placeholder, imageHTML);
            });
            
            // 5. YouTube 임베드 처리
            if (options.youtubeUrl) {
                processedHTML = this.processYouTubeEmbed(processedHTML, options.youtubeUrl);
                console.log('🎥 YouTube embed processed');
            }
            
            // 6. Ghost 포스트 생성
            console.log('📝 Creating Ghost post...');
            const post = await api.posts.add({
                title: postData.title,
                slug: slug,
                html: processedHTML,
                meta_title: postData.meta_title || postData.title,
                meta_description: postData.meta_description,
                custom_excerpt: postData.custom_excerpt,
                feature_image: featureImageUrl,
                featured: postData.featured || true,
                tags: postData.tags || [],
                status: 'draft' // 리뷰를 위해 드래프트로 시작
            });
            
            console.log(`✅ Ghost post created successfully!`);
            
            // 7. 결과 리포트 생성
            const result = this.generatePublishingReport(post, manifest, {
                featureImageUrl,
                contentImageUrls,
                slug,
                options
            });
            
            console.log('\n📊 Publishing Report:');
            console.log(result.summary);
            
            return result;
            
        } catch (error) {
            console.error('❌ OSMU Ghost publishing failed:', error.message);
            throw error;
        }
    }

    /**
     * YouTube 임베드 처리
     * @param {string} html - 원본 HTML
     * @param {string} youtubeUrl - YouTube URL
     * @returns {string} 임베드가 추가된 HTML
     */
    processYouTubeEmbed(html, youtubeUrl) {
        const videoId = this.extractVideoId(youtubeUrl);
        if (!videoId) {
            console.warn('⚠️  Invalid YouTube URL, skipping embed');
            return html;
        }
        
        const responsiveEmbed = `
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 2rem 0; border-radius: 8px;">
            <iframe 
                src="https://www.youtube.com/embed/${videoId}" 
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
                allowfullscreen
                title="YouTube video">
            </iframe>
        </div>`;
        
        // 플레이스홀더 교체 또는 첫 번째 문단 뒤에 삽입
        if (html.includes('<!-- YOUTUBE_PLACEHOLDER -->')) {
            return html.replace('<!-- YOUTUBE_PLACEHOLDER -->', responsiveEmbed);
        } else {
            const paragraphIndex = html.indexOf('</p>');
            if (paragraphIndex !== -1) {
                return html.slice(0, paragraphIndex + 4) + responsiveEmbed + html.slice(paragraphIndex + 4);
            }
            return responsiveEmbed + html;
        }
    }

    /**
     * YouTube URL에서 비디오 ID 추출
     * @param {string} url - YouTube URL
     * @returns {string|null} 비디오 ID
     */
    extractVideoId(url) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    /**
     * 발행 리포트 생성
     * @param {Object} post - Ghost 포스트 객체
     * @param {Object} manifest - OSMU 매니페스트
     * @param {Object} publishingData - 발행 관련 데이터
     * @returns {Object} 종합 리포트
     */
    generatePublishingReport(post, manifest, publishingData) {
        const report = {
            success: true,
            post: {
                id: post.id,
                title: post.title,
                slug: post.slug,
                url: post.url,
                status: post.status
            },
            images: {
                feature: publishingData.featureImageUrl,
                content: publishingData.contentImageUrls,
                totalCount: 1 + publishingData.contentImageUrls.length
            },
            osmu: {
                slug: publishingData.slug,
                manifestVersion: manifest.generator_version,
                totalImagesInPackage: manifest.generation_metadata.total_images,
                availablePlatforms: Object.keys(manifest.platforms)
            },
            timestamp: new Date().toISOString()
        };

        report.summary = `
🎉 OSMU Ghost 발행 완료!

📊 발행 결과:
- 포스트 제목: ${post.title}
- Ghost URL: ${post.url}
- 상태: ${post.status} (리뷰 후 발행 가능)

🖼️ OSMU 이미지 활용:
- 피처 이미지: ✅ 업로드 완료
- 콘텐츠 이미지: ${publishingData.contentImageUrls.length}개 업로드
- 소스 패키지: imi-work-osmu/assets/images/${publishingData.slug}/

🚀 다음 단계:
- 네이버 블로그: naver-seo-writer 에이전트 사용 가능
- 인스타그램: sns-essay-writer 에이전트 사용 가능
- 모든 플랫폼용 이미지 준비 완료
        `.trim();

        return report;
    }
}

// 사용 예시 함수
async function publishExample() {
    const publisher = new OSMUGhostPublisherV2();
    
    const postData = {
        title: "AI 리터러시 격차, 4개월이면 충분할까?",
        html: `
        <p>AI만큼 audience들의 갭차이가 정말 극단적일만큼 늘어서있는 게 있을까 싶어...</p>
        <!-- CONTENT_IMAGE_1 -->
        <p>더 많은 내용...</p>
        <!-- YOUTUBE_PLACEHOLDER -->
        <p>결론 부분...</p>
        `,
        meta_title: "AI 리터러시 격차 분석 - IMI WORK",
        meta_description: "AI 활용 능력의 극단적 격차와 그 해결 방안을 15년 현장 경험으로 분석합니다.",
        custom_excerpt: "AI만큼 사용자들의 격차가 극단적인 분야가 있을까? 현장에서 본 AI 리터러시의 현실.",
        tags: ['AI', 'Digital Literacy', 'Business Strategy']
    };
    
    const options = {
        youtubeUrl: "https://youtu.be/9v_mwoi9Q4Q"
    };
    
    try {
        const result = await publisher.publishWithOSMUPackage(
            postData, 
            'ai-literacy-gap',
            options
        );
        
        console.log('\n✅ Publishing completed successfully!');
        return result;
        
    } catch (error) {
        console.error('❌ Publishing failed:', error.message);
        throw error;
    }
}

module.exports = OSMUGhostPublisherV2;

// 직접 실행 시 예시 실행
if (require.main === module) {
    publishExample()
        .then(result => {
            console.log('\n🎉 OSMU Ghost 자동화 완료!');
        })
        .catch(error => {
            console.error('실행 오류:', error);
            process.exit(1);
        });
}