const GhostAdminAPI = require('@tryghost/admin-api');

const api = new GhostAdminAPI({
    url: 'https://blog.imiwork.com',
    key: '689ab9c2806ede000158236d:bcf8cc2cdfe9d9ecf91c534145101b6586aa6586f6ccec19ba359ec071cc2f8a',
    version: 'v5.0'
});

async function updatePost() {
    try {
        console.log('📝 포스트 업데이트 시작...');
        
        const postId = '68be44f5e7a7260001bb15c7';
        const imageUrl = 'https://blog.imiwork.com/content/images/2025/09/ai-literacy-gap-feature.png';
        
        // 먼저 현재 포스트 정보 가져오기
        const currentPost = await api.posts.read({id: postId});
        console.log('📖 현재 포스트 정보:');
        console.log('  - 제목:', currentPost.title);
        console.log('  - 현재 Slug:', currentPost.slug);
        console.log('  - 업데이트 시간:', currentPost.updated_at);
        
        // 포스트 업데이트
        const updatedPost = await api.posts.edit({
            id: postId,
            updated_at: currentPost.updated_at, // 현재 업데이트 시간 사용
            feature_image: imageUrl,
            slug: 'ai-literacy-gap-different-worlds'
        });
        
        console.log('✅ 포스트 업데이트 성공!');
        console.log('🖼️ Feature Image:', updatedPost.feature_image);
        console.log('📝 새 Slug:', updatedPost.slug);
        console.log('🔗 새 URL:', updatedPost.url);
        
        return {
            success: true,
            postUrl: updatedPost.url,
            slug: updatedPost.slug,
            featureImage: updatedPost.feature_image
        };
        
    } catch (error) {
        console.error('❌ 포스트 업데이트 실패:', error.message);
        if (error.context) {
            console.error('📋 컨텍스트:', JSON.stringify(error.context, null, 2));
        }
        return { success: false, error: error.message };
    }
}

updatePost().then(result => {
    if (result.success) {
        console.log('🎉 포스트 업데이트 완료!');
        console.log('📊 최종 결과:');
        console.log('  - Post URL:', result.postUrl);
        console.log('  - Slug:', result.slug);
        console.log('  - Feature Image:', result.featureImage);
    } else {
        console.log('💥 업데이트 실패:', result.error);
    }
});
