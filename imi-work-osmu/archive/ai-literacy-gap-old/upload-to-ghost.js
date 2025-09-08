const GhostAdminAPI = require('@tryghost/admin-api');
const fs = require('fs');
const path = require('path');

// Ghost Admin API 설정
const api = new GhostAdminAPI({
  url: 'https://blog.imiwork.com',
  key: process.env.GHOST_ADMIN_API_KEY, // 환경 변수에서 가져오기
  version: 'v5.0'
});

async function uploadPost() {
  try {
    // Ghost 최적화된 포스트 데이터 로드
    const postData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'ghost-optimized.json'), 'utf8')
    );

    console.log('🚀 Ghost 블로그에 포스트 업로드 시작...');
    console.log(`📝 제목: ${postData.title}`);

    // 포스트 생성
    const result = await api.posts.add({
      title: postData.title,
      slug: postData.slug,
      html: postData.html,
      status: 'draft', // 초기에는 draft로 생성
      featured: postData.featured,
      feature_image: postData.feature_image,
      feature_image_alt: postData.feature_image_alt,
      feature_image_caption: postData.feature_image_caption,
      custom_excerpt: postData.custom_excerpt,
      meta_title: postData.meta_title,
      meta_description: postData.meta_description,
      og_image: postData.og_image,
      og_title: postData.og_title,
      og_description: postData.og_description,
      twitter_image: postData.twitter_image,
      twitter_title: postData.twitter_title,
      twitter_description: postData.twitter_description,
      tags: postData.tags.map(tag => ({ name: tag })),
      authors: postData.authors
    });

    console.log('✅ 포스트 업로드 완료!');
    console.log(`🔗 관리자 URL: https://blog.imiwork.com/ghost/#/editor/post/${result.id}`);
    console.log(`🌐 미리보기 URL: https://blog.imiwork.com/${result.slug}/`);

    return result;

  } catch (error) {
    console.error('❌ 포스트 업로드 실패:', error);
    
    if (error.response) {
      console.error('📋 에러 세부사항:', error.response.data);
    }
    
    throw error;
  }
}

// 포스트 업데이트 함수 (기존 포스트가 있는 경우)
async function updatePost(postId) {
  try {
    const postData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'ghost-optimized.json'), 'utf8')
    );

    console.log('🔄 기존 포스트 업데이트 시작...');
    
    const result = await api.posts.edit({
      id: postId,
      updated_at: new Date().toISOString(), // 현재 시간으로 업데이트
      title: postData.title,
      html: postData.html,
      feature_image: postData.feature_image,
      feature_image_alt: postData.feature_image_alt,
      feature_image_caption: postData.feature_image_caption,
      custom_excerpt: postData.custom_excerpt,
      meta_title: postData.meta_title,
      meta_description: postData.meta_description,
      og_image: postData.og_image,
      og_title: postData.og_title,
      og_description: postData.og_description,
      twitter_image: postData.twitter_image,
      twitter_title: postData.twitter_title,
      twitter_description: postData.twitter_description,
      tags: postData.tags.map(tag => ({ name: tag }))
    });

    console.log('✅ 포스트 업데이트 완료!');
    console.log(`🔗 관리자 URL: https://blog.imiwork.com/ghost/#/editor/post/${result.id}`);
    
    return result;

  } catch (error) {
    console.error('❌ 포스트 업데이트 실패:', error);
    throw error;
  }
}

// CLI에서 직접 실행할 때
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  const postId = args[1];

  if (command === 'upload') {
    uploadPost()
      .then(result => {
        console.log('\n🎉 업로드 성공! 포스트 ID:', result.id);
        process.exit(0);
      })
      .catch(error => {
        console.error('\n💥 업로드 실패');
        process.exit(1);
      });
  } else if (command === 'update' && postId) {
    updatePost(postId)
      .then(result => {
        console.log('\n🎉 업데이트 성공! 포스트 ID:', result.id);
        process.exit(0);
      })
      .catch(error => {
        console.error('\n💥 업데이트 실패');
        process.exit(1);
      });
  } else {
    console.log('사용법:');
    console.log('  node upload-to-ghost.js upload          # 새 포스트 생성');
    console.log('  node upload-to-ghost.js update <id>     # 기존 포스트 업데이트');
    process.exit(1);
  }
}

module.exports = { uploadPost, updatePost };