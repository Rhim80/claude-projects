const GhostAdminAPI = require('@tryghost/admin-api');
const fs = require('fs');

const api = new GhostAdminAPI({
    url: 'https://blog.imiwork.com',
    key: '689ab9c2806ede000158236d:bcf8cc2cdfe9d9ecf91c534145101b6586aa6586f6ccec19ba359ec071cc2f8a',
    version: 'v5.0'
});

async function uploadImageAndSetFeature() {
    try {
        console.log('📤 Ghost에 이미지 업로드 시작...');
        
        // 1. 이미지 업로드
        const imageBuffer = fs.readFileSync('ai-literacy-gap-feature.png');
        const imageUpload = await api.images.upload({
            file: imageBuffer,
            filename: 'ai-literacy-gap-feature.png',
            purpose: 'feature_image'
        });
        
        console.log('✅ 이미지 업로드 성공!');
        console.log('🔗 이미지 URL:', imageUpload.url);
        
        // 2. 포스트 업데이트 (feature image 설정 + slug 수정)
        const postId = '68be44f5e7a7260001bb15c7'; // 이전에 생성된 포스트 ID
        
        const updatedPost = await api.posts.edit({
            id: postId,
            feature_image: imageUpload.url,
            slug: 'ai-literacy-gap-different-worlds',
            updated_at: new Date().toISOString()
        });
        
        console.log('✅ 포스트 업데이트 성공!');
        console.log('🖼️ Feature Image 설정 완료');
        console.log('🔗 최종 URL:', updatedPost.url);
        console.log('📝 Slug:', updatedPost.slug);
        
        return {
            success: true,
            imageUrl: imageUpload.url,
            postUrl: updatedPost.url,
            slug: updatedPost.slug
        };
        
    } catch (error) {
        console.error('❌ 실패:', error.message);
        if (error.details) {
            console.error('📋 세부사항:', JSON.stringify(error.details, null, 2));
        }
        return { success: false, error: error.message };
    }
}

uploadImageAndSetFeature().then(result => {
    if (result.success) {
        console.log('🎉 모든 작업 완료!');
        console.log('📊 최종 결과:');
        console.log('  - Image URL:', result.imageUrl);
        console.log('  - Post URL:', result.postUrl);
        console.log('  - Slug:', result.slug);
    } else {
        console.log('💥 작업 실패:', result.error);
    }
});
