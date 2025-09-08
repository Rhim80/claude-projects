const GhostAdminAPI = require('@tryghost/admin-api');

// API 설정
const api = new GhostAdminAPI({
    url: 'https://blog.imiwork.com',
    key: '689ab9c2806ede000158236d:bcf8cc2cdfe9d9ecf91c534145101b6586aa6586f6ccec19ba359ec071cc2f8a',
    version: 'v5.0'
});

// JSON 파일 읽기
const fs = require('fs');
const postData = JSON.parse(fs.readFileSync('ghost-optimized.json', 'utf8'));

async function uploadPost() {
    try {
        console.log('🚀 Ghost Admin API로 포스트 업로드 시작...');
        
        // 포스트 생성
        const result = await api.posts.add({
            title: postData.title,
            slug: postData.slug,
            html: postData.html,
            meta_title: postData.meta_title,
            meta_description: postData.meta_description,
            og_title: postData.og_title,
            og_description: postData.og_description,
            twitter_title: postData.twitter_title,
            twitter_description: postData.twitter_description,
            custom_excerpt: postData.custom_excerpt,
            featured: postData.featured,
            tags: postData.tags,
            status: 'draft' // 먼저 초안으로 생성
        });
        
        console.log('✅ 포스트 업로드 성공!');
        console.log('📝 포스트 ID:', result.id);
        console.log('🔗 URL:', result.url);
        console.log('📊 상태:', result.status);
        
    } catch (error) {
        console.error('❌ 업로드 실패:', error.message);
        if (error.details) {
            console.error('📋 세부사항:', JSON.stringify(error.details, null, 2));
        }
    }
}

uploadPost();
