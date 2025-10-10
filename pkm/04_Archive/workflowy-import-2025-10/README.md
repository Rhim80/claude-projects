# Workflowy Import 2025-10

## 개요

이 폴더는 Workflowy에서 내보낸 원본 데이터를 보존하고, PKM 시스템으로 마이그레이션하는 과정을 기록합니다.

## 원본 파일

`original/` 폴더에 보존된 파일들:

| 파일명 | 크기 | 줄 수 | 설명 |
|--------|------|-------|------|
| workflowy-IMI.txt | 300KB | 5,670 | 이미커피 비즈니스 메모, 프로젝트 기획 |
| workflowy-Life Log.txt | 434KB | 10,074 | 날짜별 일상 로그, 미팅 메모, 인사이트 |
| workflowy-STUDY.txt | 167KB | 2,107 | 트레바리 독서모임, HFK 기획안 등 |
| workflowy-Work.txt | 139KB | 2,278 | 업무 프로세스, 컨설팅 관련 |
| workflowy-consulting PROJECT.txt | 91KB | 2,011 | 컨설팅 프로젝트별 기록 |
| workflowy-txt.txt | 52KB | 743 | 에세이, 철학적 성찰, 인사이트 |
| workflowy-강연.txt | 178KB | 2,720 | 강의 콘텐츠, 교육 자료 |

**총계**: 25,603줄

## 마이그레이션 전략

### ✅ 완료된 파일
- `workflowy-STUDY.txt` → `03_Resources/study-notes/trevari-독서모임.md` 등

### 🔄 처리 예정
- `workflowy-txt.txt` → 주제별 개별 파일로 분리
- `workflowy-IMI.txt` → 비즈니스 노트 및 프로젝트 폴더
- `workflowy-Work.txt` → 업무 프로세스 문서화
- `workflowy-강연.txt` → 강의 콘텐츠 정리
- `workflowy-consulting PROJECT.txt` → 프로젝트별 분리
- `workflowy-Life Log.txt` → 처리 방향 상의 필요

## 원칙

1. **손실 제로**: 모든 원본 데이터는 이 폴더에 영구 보존
2. **맥락 보존**: STUDY 파일처럼 계층 구조와 맥락 유지
3. **링크 가능**: Obsidian에서 상호 참조 가능하도록 변환
4. **단순함**: 머리속에서 떠올릴 수 있는 구조

## 타임라인

- 2025-10-10: 원본 백업 완료
- 2025-10-10: PKM 구조 단순화 진행 예정
- 향후: 파일별 맞춤 처리

## 참고사항

- 원본 파일은 절대 수정하지 않음
- 변환된 내용은 `#from-workflowy` 태그로 추적
- 각 파일별 처리 방식은 별도 문서로 기록
