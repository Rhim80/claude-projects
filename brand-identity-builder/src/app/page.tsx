export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Brand Identity Builder
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
            15년 검증된 7단계 시스템으로 당신만의 브랜드 아이덴티티를 체계적으로 구축하세요
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">체계적 프로세스</h3>
              <p className="text-slate-600">브랜드 씨앗부터 완성까지 7단계 가이드</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI 맞춤 가이드</h3>
              <p className="text-slate-600">개인화된 질문과 피드백으로 브랜드 완성</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">실무 적용</h3>
              <p className="text-slate-600">15년 F&B 경험이 녹아든 실전 검증 시스템</p>
            </div>
          </div>
          
          <a 
            href="/builder" 
            className="inline-block bg-slate-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-800 transition-colors"
          >
            무료로 시작하기
          </a>
        </div>
      </main>
    </div>
  )
}