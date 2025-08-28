# 이미커피 YouTube 블로그 자동화 시스템

> hovoo 대표의 15년 F&B 경험과 AI 전문성이 담긴 블로그 자동 생성 시스템

## 🎯 프로젝트 개요

YouTube RSS Bot에서 수집한 영상을 이미커피 대표의 페르소나로 블로그 글을 자동 생성하여 Ghost 블로그에 포스팅하는 완전 자동화 시스템

### 핵심 기능
```
YouTube 영상 → 자막 추출 → AI 블로그 생성 → SEO 최적화 → Ghost 포스팅 → Telegram 알림
```

## 📋 파일 구조

```
youtube-blog-automation/
├── CLAUDE.md                  # 프로젝트 컨텍스트 및 설정
├── README.md                  # 프로젝트 문서 (이 파일)
├── original-workflow.json     # 기존 워크플로우 백업
├── improved-workflow.json     # 개선된 워크플로우
├── improved-prompts.md        # 개선된 프롬프트 모음
└── deployment-guide.md        # 배포 가이드 (TODO)
```

## 🔄 워크플로우 개선사항

### 기존 → 개선
| 항목 | 기존 | 개선 |
|------|------|------|
| **페르소나** | 일반적인 블로그 작성자 | 이미커피 대표 hovoo (15년 경험) |
| **SEO 최적화** | 기본적인 SEO | 이미커피 브랜드 특화 SEO |
| **블로그 연동** | Notion 저장만 | Ghost 블로그 실제 포스팅 |
| **에러 처리** | 기본적인 처리 | 강화된 검증 및 기본값 처리 |
| **웹훅 경로** | `/youtube-to-blog` | `/youtube-to-blog-v2` |

### 주요 개선 노드
1. **Create Blog Article with Persona** - 이미커피 대표 경험 기반 글쓰기
2. **SEO Optimization with Brand** - 브랜드 특화 SEO 최적화  
3. **Create Ghost Blog Post** - 실제 블로그 포스팅 기능
4. **Parse and Validate JSON** - 강화된 데이터 검증
5. **Enhanced Success Message** - 상세한 성공 알림

## 🚀 배포 방법

### 1. 기존 워크플로우 업데이트
```bash
# n8n MCP를 통해 기존 워크플로우 업데이트
# 또는 새로운 워크플로우로 생성
```

### 2. 필수 설정
- **Ghost Admin API**: blog.imiwork.com 크리덴셜 추가 필요
- **웹훅 경로 변경**: youtube-to-blog → youtube-to-blog-v2
- **기존 RSS Bot 연동 수정** 필요

### 3. 테스트 시나리오
1. Telegram에서 "📝 블로그 글 생성" 버튼 클릭
2. 웹훅 `/youtube-to-blog-v2` 호출 확인
3. Ghost 블로그에 포스트 생성 확인
4. Notion DB에 Ghost 정보 저장 확인

## 📊 성과 지표

### 콘텐츠 품질
- ✅ 2500자 이상의 완성된 글
- ✅ 이미커피 브랜드 일관성
- ✅ 실무 경험 기반의 통찰
- ✅ SEO 최적화 메타데이터

### 자동화 안정성
- ✅ 에러 처리 및 기본값 설정
- ✅ JSON 파싱 실패 대응
- ✅ API 호출 타임아웃 처리
- ✅ Telegram 알림 전송

## 🔧 트러블슈팅

### 자주 발생하는 문제
1. **JSON 파싱 실패**: 기본값으로 안전하게 처리
2. **Ghost API 인증 실패**: 크리덴셜 확인 필요
3. **YouTube 자막 없음**: 에러 메시지와 함께 건너뛰기
4. **Notion DB 필드 불일치**: 필드명 확인 및 매핑

### 로그 확인
- n8n 실행 로그에서 각 노드별 성공/실패 확인
- Telegram 알림으로 실시간 상태 모니터링

## 📈 향후 개선 계획

### Phase 2 (예정)
- [ ] 이미지 자동 생성 및 삽입
- [ ] 다국어 지원 (영어 블로그 병행)
- [ ] A/B 테스트를 위한 다중 버전 생성
- [ ] 소셜미디어 자동 배포

### Phase 3 (예정)  
- [ ] 독자 반응 분석 및 피드백 수집
- [ ] 콘텐츠 성과 기반 자동 최적화
- [ ] 개인화된 콘텐츠 추천

---

## 📞 문의 및 지원

**프로젝트 담당**: hovoo (이미커피 대표)
**도메인**: blog.imiwork.com
**자동화 플랫폼**: n8n.imiwork.com

---

*"YouTube에서 얻은 인사이트를 이미커피 대표의 15년 경험으로 재해석하여, 자영업자들에게 실질적 가치를 제공하는 블로그 콘텐츠 자동화"*