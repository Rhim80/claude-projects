# Ghost CMS 업로드 완전 가이드

> Ghost v5 Lexical 형식 호환성 및 모든 업로드 문제 해결 방법 정리

## 🔍 문제 분석 및 해결 과정

### 주요 문제들
1. **Ghost v5 Lexical 형식 변경**: MobileDoc → Lexical로 전환으로 인한 HTML 업로드 실패
2. **중복 H1 제목**: 마크다운 첫 번째 `#` 제목이 Ghost 포스트 제목과 중복
3. **콘텐츠 이미지 누락**: 플레이스홀더 교체 누락으로 인한 이미지 미포함
4. **빈 콘텐츠 문제**: API는 성공(201)하지만 실제 본문이 비어있음

### 완전 해결 방법
- **source=html 파라미터**: Ghost가 HTML을 Lexical로 자동 변환
- **H1 제거 로직**: 정규식을 통한 첫 번째 H1 태그 자동 제거
- **필드 충돌 방지**: mobiledoc/lexical 필드 명시적 제거
- **완전한 워크플로우**: 이미지 업로드 → 플레이스홀더 교체 → 포스트 생성

## 🔧 ghost-publisher.py 핵심 수정사항

### 1. API URL에 source=html 파라미터 추가
```python
# 기존 (실패)
url = f"{self.api_base}posts/"

# 수정 (성공)
url = f"{self.api_base}posts/?source=html"
```

### 2. H1 중복 제거 로직
```python
# HTML 콘텐츠에서 중복 H1 제목 제거
if 'html' in cleaned_post_data and cleaned_post_data['html']:
    html_content = cleaned_post_data['html']
    # 첫 번째 H1 태그 제거 (Ghost 포스트 제목과 중복 방지)
    import re
    h1_pattern = r'<h1[^>]*>.*?</h1>'
    html_content = re.sub(h1_pattern, '', html_content, count=1, flags=re.DOTALL)
    cleaned_post_data['html'] = html_content.strip()
```

### 3. Lexical 형식 충돌 방지
```python
# Lexical 형식 충돌 방지를 위한 필드 정리
cleaned_post_data = post_data.copy()
# mobiledoc와 lexical 필드를 명시적으로 제거하여 HTML 우선 처리
cleaned_post_data.pop('mobiledoc', None)
cleaned_post_data.pop('lexical', None)
```

## 📋 완전한 업로드 워크플로우

### 단계별 체크리스트

#### 1. 이미지 업로드 단계
- [ ] 피처 이미지 업로드 완료
- [ ] 콘텐츠 이미지들 업로드 완료 (필요한 경우)
- [ ] 모든 이미지 URL 수집 완료

#### 2. HTML 콘텐츠 준비 단계
- [ ] 마크다운 → HTML 변환 완료
- [ ] 이미지 플레이스홀더 교체 완료
  - `<!-- CONTENT_IMAGE_1 -->` → 실제 이미지 HTML
  - `<!-- CONTENT_IMAGE_2 -->` → 실제 이미지 HTML
- [ ] HTML 길이 및 내용 확인 완료

#### 3. 포스트 데이터 검증 단계
- [ ] 제목(title) 설정 완료
- [ ] HTML 콘텐츠 포함 완료
- [ ] 메타 데이터 설정 완료 (meta_title, meta_description)
- [ ] 슬러그(slug) 설정 완료
- [ ] 태그(tags) 설정 완료
- [ ] 피처 이미지 URL 설정 완료

#### 4. Ghost API 호출 단계
- [ ] source=html 파라미터 포함 확인
- [ ] H1 중복 제거 자동 적용 확인
- [ ] mobiledoc/lexical 필드 제거 확인
- [ ] API 응답 상태 코드 201 확인
- [ ] Lexical 변환 성공 확인

## 🔧 업로드 전 준비사항 (통합 체크리스트)

### 파일 확인
- [ ] 마크다운 파일 존재 확인
- [ ] 이미지 파일들 존재 확인
  - [ ] `assets/images/{slug}/ghost/feature.png`
  - [ ] `assets/images/{slug}/ghost/content-1.png` (있는 경우)
  - [ ] `assets/images/{slug}/ghost/content-2.png` (있는 경우)

### 콘텐츠 확인
- [ ] 마크다운에 `# 제목` 포함 여부 확인 (H1 제거 대상)
- [ ] `<!-- CONTENT_IMAGE_N -->` 플레이스홀더 개수 확인
- [ ] 실제 콘텐츠 이미지 개수와 플레이스홀더 개수 일치 확인

## 🚀 업로드 과정 체크

### ghost-publisher.py 자동 처리 확인
- [ ] `source=html` 파라미터 적용 확인
- [ ] H1 제거 로직 동작 확인 (HTML 길이 감소)
- [ ] mobiledoc/lexical 필드 제거 확인
- [ ] 이미지 업로드 성공 확인 (상태 코드 201)

### API 응답 확인
- [ ] 포스트 생성 성공 (상태 코드 201)
- [ ] 포스트 ID 생성 확인
- [ ] Lexical 콘텐츠 길이 확인 (100자 이상)
- [ ] 콘텐츠 이미지 URL이 Lexical에 포함되었는지 확인

## ✅ 업로드 후 검증

### Ghost 에디터에서 확인
- [ ] 포스트 제목이 한 번만 표시됨
- [ ] 본문 내용이 완전히 표시됨
- [ ] 피처 이미지가 정상 표시됨
- [ ] 모든 콘텐츠 이미지가 표시됨
- [ ] 메타 데이터가 올바르게 설정됨

## ⚠️ 문제 발생 시 체크포인트

### 빈 콘텐츠 문제
- [ ] `source=html` 파라미터 포함 여부
- [ ] HTML 콘텐츠 길이 확인
- [ ] Lexical 변환 성공 여부

### 제목 중복 문제
- [ ] H1 제거 로직 동작 여부
- [ ] HTML에서 `<h1>` 태그 제거 확인

### 이미지 누락 문제
- [ ] 이미지 업로드 성공 여부
- [ ] 플레이스홀더 완전 교체 여부
- [ ] 이미지 URL이 HTML에 포함되었는지 확인

## 🎯 성공 기준

**완전한 성공으로 간주하는 조건:**
1. API 응답 상태 코드 201
2. 포스트 ID 생성됨
3. Lexical 콘텐츠 길이 100자 이상
4. 모든 콘텐츠 이미지가 Lexical에 포함됨
5. Ghost 에디터에서 모든 요소가 정상 표시됨

#### 5. 결과 검증 단계
- [ ] 포스트 ID 생성 확인
- [ ] URL 생성 확인
- [ ] Lexical 콘텐츠 길이 확인 (100자 이상)
- [ ] 콘텐츠 이미지 포함 여부 확인
- [ ] Ghost 에디터에서 실제 확인

## ⚠️ 주의사항 및 트러블슈팅

### 반드시 확인해야 할 사항

#### 1. source=html 파라미터
- **필수**: 모든 HTML 업로드 시 반드시 포함
- **효과**: Ghost가 HTML을 Lexical로 자동 변환
- **없을 경우**: 빈 콘텐츠 문제 발생

#### 2. H1 제거 로직
- **필수**: 마크다운에서 변환된 첫 번째 H1 제거
- **효과**: Ghost 포스트 제목과 중복 방지
- **없을 경우**: 제목이 두 번 표시됨

#### 3. 이미지 플레이스홀더 교체
- **필수**: `<!-- CONTENT_IMAGE_N -->`을 실제 이미지 HTML로 교체
- **확인**: 교체 후 플레이스홀더가 남아있지 않은지 검증
- **없을 경우**: 콘텐츠 이미지가 표시되지 않음

### 문제 발생 시 진단 방법

#### 1. 빈 콘텐츠 문제
```
증상: API 성공(201)이지만 Ghost 에디터에서 본문이 비어있음
원인: source=html 파라미터 누락
해결: URL에 ?source=html 추가
```

#### 2. 제목 중복 문제
```
증상: Ghost 에디터에서 제목이 두 번 표시됨
원인: 마크다운 H1이 HTML로 변환되어 포함됨
해결: H1 제거 로직 확인 및 적용
```

#### 3. 이미지 누락 문제
```
증상: 피처 이미지는 있지만 콘텐츠 이미지가 없음
원인: 플레이스홀더 교체 누락
해결: HTML에서 플레이스홀더 완전 교체 확인
```

#### 4. Lexical 변환 실패
```
증상: API 성공이지만 Lexical 필드가 비어있음
원인: 필드 충돌 또는 HTML 형식 문제
해결: mobiledoc/lexical 필드 제거 및 HTML 검증
```

## 🧪 테스트 방법

### 완전한 테스트 스크립트 예시
```python
def test_complete_ghost_upload():
    """완전한 Ghost 업로드 테스트"""
    
    # 1. 이미지 업로드
    feature_url = publisher.upload_image(feature_path)
    content1_url = publisher.upload_image(content1_path)
    content2_url = publisher.upload_image(content2_path)
    
    # 2. HTML 변환 및 이미지 교체
    html = markdown.markdown(md_content, extensions=['extra'])
    html = html.replace("<!-- CONTENT_IMAGE_1 -->", img_html_1)
    html = html.replace("<!-- CONTENT_IMAGE_2 -->", img_html_2)
    
    # 3. 포스트 데이터 준비
    post_data = {
        "title": "테스트 제목",
        "html": html,  # H1 제거는 자동 적용됨
        "feature_image": feature_url,
        # ... 기타 필드
    }
    
    # 4. 포스트 생성 (source=html 자동 적용)
    post = publisher.create_post(post_data)
    
    # 5. 결과 검증
    assert post and post.get('id')
    assert len(str(post.get('lexical', ''))) > 100
    assert content1_url in str(post.get('lexical', ''))
    assert content2_url in str(post.get('lexical', ''))
```

### 빠른 확인 방법
```bash
# 1. 마크다운 파일 확인
echo "플레이스홀더 확인:"
grep -n "CONTENT_IMAGE" content/your-file.md

# 2. 이미지 파일 존재 확인
ls -la assets/images/your-slug/ghost/

# 3. HTML 변환 후 길이 확인
python3 -c "import markdown; print(len(markdown.markdown(open('content/your-file.md').read())))"
```

## 📚 참고 자료

### Ghost API v5 관련
- [Ghost Admin API 공식 문서](https://docs.ghost.org/admin-api/)
- [Lexical 형식 변경 관련 포럼](https://forum.ghost.org/t/updating-post-content-via-admin-api-html-lexical-mobiledoc-changes-not-pushed-through/44374)

### 핵심 해결책
- **source=html 파라미터**: Ghost v5에서 HTML을 Lexical로 자동 변환
- **정규식 H1 제거**: `r'<h1[^>]*>.*?</h1>'` 패턴으로 첫 번째 H1만 제거
- **필드 정리**: mobiledoc/lexical 필드 충돌 방지

## 🎯 최종 검증 체크리스트

업로드 완료 후 반드시 확인:
- [ ] Ghost 에디터에서 포스트 열기
- [ ] 제목이 한 번만 표시되는지 확인
- [ ] 본문 내용이 완전히 표시되는지 확인  
- [ ] 피처 이미지가 정상 표시되는지 확인
- [ ] 콘텐츠 이미지들이 모두 표시되는지 확인
- [ ] 메타 데이터가 올바르게 설정되었는지 확인

---

*이 가이드를 따르면 Ghost v5에서 발생할 수 있는 모든 업로드 문제를 해결할 수 있습니다.*

## Related Notes

- [[CLAUDE]] - content_creation 관련; 10-projects ↔ CLAUDE.md 연결
- [[MIGRATION_VALIDATION_REPORT]] - content_creation 관련; 10-projects ↔ MIGRATION_VALIDATION_REPORT.md 연결
- [[30-knowledge/36-ai-tools/36.01-claude-code/ab-method-study/awesome-claude-code/resources/slash-commands/add-to-changelog/add-to-changelog]] - content_creation 관련; 10-projects ↔ 30-knowledge 연결
- [[00-system/04-docs/NOTION_MIGRATION_GUIDE]] - content_creation 관련; 10-projects ↔ 00-system 연결
- [[00-system/04-docs/CONTRIBUTING]] - content_creation 관련; 10-projects ↔ 00-system 연결
