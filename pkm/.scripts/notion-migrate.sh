#!/bin/bash

# Notion to PKM Migration Helper Script
# Author: Claude Code for hovoo
# Date: 2025-10-09

set -e

BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# PKM vault root
PKM_ROOT="/Users/rhim/Projects/pkm"
IMPORT_DIR="$PKM_ROOT/00_Inbox/NOTION_IMPORT"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Notion → PKM 자동 마이그레이션 도구                      ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if Bun is installed
if ! command -v bun &> /dev/null; then
    echo -e "${RED}❌ Bun이 설치되어 있지 않습니다.${NC}"
    echo -e "${YELLOW}💡 다음 명령어로 설치하세요:${NC}"
    echo -e "   curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

# Check if notion2obsidian is installed
if ! command -v notion2obsidian &> /dev/null; then
    echo -e "${RED}❌ notion2obsidian이 설치되어 있지 않습니다.${NC}"
    echo -e "${YELLOW}💡 다음 명령어로 설치하세요:${NC}"
    echo -e "   bun install -g notion2obsidian"
    exit 1
fi

echo -e "${GREEN}✅ 필수 도구 확인 완료${NC}"
echo ""

# Step 1: Export from Notion
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}📦 Step 1: Notion에서 Export 하기${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "1. Notion 웹사이트에서 Settings & Members 열기"
echo "2. 'Export all workspace content' 클릭"
echo "3. Format: 'Markdown & CSV' 선택"
echo "4. 'Include subpages' 체크"
echo "5. Export 버튼 클릭 → ZIP 파일 다운로드"
echo ""
echo -e "${YELLOW}💾 다운로드한 ZIP 파일 경로를 입력하세요:${NC}"
read -e -p "> " ZIP_PATH

# Expand ~ to full path
ZIP_PATH="${ZIP_PATH/#\~/$HOME}"

if [ ! -f "$ZIP_PATH" ]; then
    echo -e "${RED}❌ 파일을 찾을 수 없습니다: $ZIP_PATH${NC}"
    exit 1
fi

echo -e "${GREEN}✅ ZIP 파일 확인 완료${NC}"
echo ""

# Step 2: Choose migration mode
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}🔧 Step 2: 마이그레이션 모드 선택${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "1. Dry-run (미리보기, 변경 없음) - 추천"
echo "2. Full migration (실제 마이그레이션)"
echo ""
read -p "선택 (1 또는 2): " MODE_CHOICE

# Create import directory
mkdir -p "$IMPORT_DIR"

# Step 3: Run migration
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}🚀 Step 3: 마이그레이션 실행${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ "$MODE_CHOICE" = "1" ]; then
    echo -e "${YELLOW}🔍 Dry-run 모드로 실행 중...${NC}"
    notion2obsidian "$ZIP_PATH" "$IMPORT_DIR" --dry-run --verbose

    echo ""
    echo -e "${GREEN}✅ Dry-run 완료!${NC}"
    echo ""
    echo -e "${YELLOW}💡 실제 마이그레이션을 진행하려면 다시 이 스크립트를 실행하고 option 2를 선택하세요.${NC}"
else
    echo -e "${YELLOW}⚡ 마이그레이션 실행 중...${NC}"
    notion2obsidian "$ZIP_PATH" "$IMPORT_DIR" --verbose

    echo ""
    echo -e "${GREEN}✅ 마이그레이션 완료!${NC}"
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}📂 다음 단계: PARA 구조로 정리${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "Import된 파일 위치: $IMPORT_DIR"
    echo ""
    echo "이제 Claude Code에서 다음 명령어를 실행하세요:"
    echo ""
    echo -e "${GREEN}  /thinking-partner${NC}"
    echo ""
    echo "그리고 다음과 같이 요청하세요:"
    echo ""
    echo "  '00_Inbox/NOTION_IMPORT/ 폴더의 내용을 분석하고"
    echo "   PARA 구조(01_Projects, 02_Areas, 03_Resources)로"
    echo "   체계적으로 정리해줘'"
    echo ""

    # Git status check
    echo -e "${YELLOW}📊 Git 상태 확인...${NC}"
    cd "$PKM_ROOT"
    git status --short
    echo ""
    echo -e "${YELLOW}💡 변경사항을 커밋하려면:${NC}"
    echo "  cd $PKM_ROOT"
    echo "  git add ."
    echo "  git commit -m '📥 Notion 워크스페이스 마이그레이션'"
    echo "  git push"
fi

echo ""
echo -e "${GREEN}🎉 완료!${NC}"
