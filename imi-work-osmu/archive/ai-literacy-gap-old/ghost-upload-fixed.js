const GhostAdminAPI = require('@tryghost/admin-api');

const api = new GhostAdminAPI({
    url: 'https://blog.imiwork.com',
    key: process.env.GHOST_ADMIN_API_KEY,
    version: 'v5.0'
});

const fs = require('fs');

// 간단한 HTML 콘텐츠로 다시 시도
const htmlContent = `
<p>어제 오후, 이미양과자 지하에 있는 사무실에 출근했다가 오랜만에 반가운 사람을 만났다. HFK에서 진행했던 공간브랜딩 팀원 분이 남자친구와 데이트를 나온 것이었다. 중간에 잠시 올라가 나눈 짧은 대화. 그녀가 물었다.</p>

<blockquote>
<p>"요즘 AI 쪽으로 완전히 넘어가신 것 같아요?"</p>
</blockquote>

<p>그 질문이 계기가 되어, 요즘 내가 목격하고 있는 풍경들을 떠올리게 되었다.</p>

<h2>같은 시대, 다른 세상</h2>

<p>아침에 노정석님의 YouTube 영상을 봤다. "AI와 노동의 미래"라는 제목의 54분짜리 영상. 100x 엔지니어, 인지 혁명, 구글의 중간관리층 해고. 이런 단어들이 자연스럽게 오가는 대화였다.</p>

<iframe width="560" height="315" src="https://www.youtube.com/embed/9v_mwoi9Q4Q?si=CRl6wb6kJnZFRNzK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<p>그런데 돌이켜보니, 내 주변 사람들 중 대부분은 여전히 <strong>AI 유료 구독조차 하지 않고</strong> 살아가고 있었다.</p>

<p>이보다 극단적인 격차가 또 있을까?</p>

<p>한쪽에서는 한 사람이 100명분의 일을 할 수 있는 세상을 이미 살고 있고, 다른 한쪽에서는 AI가 무엇인지조차 모른 채 살아가고 있다. 그리고 무서운 것은, 이 <strong>격차를 인지조차 하지 못하는 사람들이 대부분</strong>이라는 사실이다.</p>

<h2>무엇이 가능한지 아는 것의 힘</h2>

<p>그녀에게 말했다.</p>

<blockquote>
<p>"AI 시대에는 뭘 할 수 있는지 아는 게 중요해요. 모르면 아예 지금 어떻게 변하고 있는지, 개인이 뭘 할 수 있는지조차 알 수가 없거든요."</p>
</blockquote>

<p>2023년부터 ChatGPT를 써왔지만, 진짜 변화는 '무엇이 가능한지' 알게 되면서부터였다. <strong>Claude Code로 CLI 환경을 다루고, n8n으로 업무를 자동화</strong>하며, 비개발자도 프로덕트를 만들 수 있다는 것을 체감하면서부터.</p>

<p>IT와는 거리가 멀었던 40대 중반의 <strong>카페 사장</strong>이 이런 도구들을 일상적으로 쓰고 있다. 15년간 커피를 내리던 손이 이제는 워크플로우를 설계하고 있다.</p>

<h2>초조함과 경이로움 사이</h2>

<p>솔직히 말하면, 여전히 초조하다.</p>

<p>매일 새로운 AI 도구가 나오고, 패러다임이 바뀌고, 어제의 상식이 오늘의 구식이 된다. GPTers 스터디장으로 활동하며 다양한 수준의 사람들을 만나는데, 그 스펙트럼의 넓이에 매번 놀란다.</p>

<p>어제 본 아티클에서 누군가는 "전통적 소프트웨어 엔지니어링의 종말"을 선언하고 있었다. 동시에 내 카페의 누군가는 여전히 수기로 재고를 관리하고 있다.</p>

<p>이 격차가 주는 초조함. 하지만 동시에 느끼는 경이로움. 우리 시대가 얼마나 특별한 변곡점에 있는지를 실감한다.</p>

<h2>관심의 차이가 만드는 운명</h2>

<p>가장 큰 차이는 능력이 아니라 <strong>관심과 실행</strong>이다.</p>

<p>AI에 관심을 가진 사람과 그렇지 않은 사람. 단지 이 차이가 전혀 다른 미래를 만들고 있다. 관심이 있으면 시도하게 되고, 시도하면 가능성을 알게 되고, 가능성을 알면 더 큰 세계가 열린다.</p>

<p>나도 처음엔 그저 호기심이었다. ChatGPT가 뭔지 궁금해서 써봤고, 신기해서 계속 썼고, 어느새 일상이 되었고, 이제는 없으면 안 되는 도구가 되었다.</p>

<h2>지금이 아니면 언제</h2>

<p>이미양과자를 나서며 그녀에게 덧붙였다.</p>

<blockquote>
<p>"AI로 뭘 할 수 있는지는 제가 보여드린 것처럼 생각보다 많아요. 일단 많이 사용해보시고 계속 관심을 가져보세요."</p>
</blockquote>

<p>그녀는 고개를 끄덕였지만, 정말 시작할지는 모르겠다. 대부분의 사람들이 그렇듯이.</p>

<p>하지만 이것만은 확실하다. 지금 이 <strong>격차를 인지하고 관심을 갖는 사람</strong>과 그렇지 않은 사람의 차이는, 시간이 갈수록 더 이상 좁힐 수 없는 간극이 될 것이다.</p>

<h2>그래서, 오늘</h2>

<p>퇴근하고 집으로 돌아오는 길.</p>

<p>오늘도 <strong>n8n 워크플로우</strong>가 내 일을 대신하고 있고, <strong>Claude</strong>가 나의 사고를 확장시켜주고 있다. 100x는 아니더라도, 확실히 다른 차원의 생산성을 경험하고 있다.</p>

<p>누군가는 이미 새로운 세상을 살고 있고, 누군가는 여전히 그 세상이 있는지조차 모른다.</p>

<p>당신은 어느 쪽인가? 더 중요한 것은, <strong>어느 쪽이 되고 싶은가?</strong></p>

<p>모든 변화는 관심에서 시작된다. 그리고 그 관심을 행동으로 옮기는 순간, 이미 당신은 다른 세상으로 한 발을 내딛은 것이다.</p>

<hr>

<p><em>오늘도 <strong>Claude Code</strong>를 켜며 생각한다. 아직도 모르는 것이 너무 많지만, 적어도 무엇이 가능한지는 알게 되었다는 것. 그것만으로도 충분히 다른 세상에 살고 있다.</em></p>
`;

async function uploadPostFixed() {
    try {
        console.log('🚀 Ghost Admin API로 포스트 재업로드 시작...');
        
        const result = await api.posts.add({
            title: "그 사이, 우리는 다른 세상에 살게 되었다",
            slug: "ai-literacy-gap-different-worlds",
            html: htmlContent,
            meta_title: "AI 리터러시 격차로 벌어지는 새로운 계층 구조 | IMI WORK",
            meta_description: "같은 시대를 살지만 AI 활용 능력에 따라 전혀 다른 세상을 경험하는 사람들. 15년차 카페 사장이 Claude Code와 n8n으로 경험한 디지털 전환의 현실.",
            custom_excerpt: "같은 시대를 살지만 AI 활용 능력에 따라 전혀 다른 세상을 경험하는 사람들. 15년차 카페 사장이 겪은 AI 리터러시 격차의 현실과 디지털 전환 이야기.",
            featured: true,
            tags: ["AI 리터러시", "비즈니스 자동화", "Claude Code", "n8n", "소상공인"],
            status: 'draft'
        }, {
            source: 'html'
        });
        
        console.log('✅ 포스트 재업로드 성공!');
        console.log('📝 포스트 ID:', result.id);
        console.log('🔗 URL:', result.url);
        console.log('📊 상태:', result.status);
        console.log('🎯 Slug:', result.slug);
        
    } catch (error) {
        console.error('❌ 업로드 실패:', error.message);
        if (error.details) {
            console.error('📋 세부사항:', JSON.stringify(error.details, null, 2));
        }
    }
}

uploadPostFixed();
