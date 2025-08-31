#!/bin/bash

# Quick Note Generator for Idea Vault
# Usage: ./quick-note.sh [category]

VAULT_DIR="/Users/rhim/Projects/idea-vault"
TODAY=$(date +%Y-%m-%d)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}💡 아이디어 보관소 빠른 메모${NC}"
echo "================================"

# If no argument provided, show menu
if [ $# -eq 0 ]; then
    echo "어떤 종류의 메모를 하시겠습니까?"
    echo ""
    echo "1) daily - 오늘의 일일 메모"
    echo "2) business - 비즈니스 아이디어"
    echo "3) branding - 브랜딩 인사이트"
    echo "4) ai - AI 관련 발견"
    echo "5) cafe - 카페 운영 아이디어"
    echo "6) study - 스터디/교육 관련"
    echo "7) random - 자유로운 생각"
    echo ""
    read -p "번호를 선택하세요 (1-7): " choice
    
    case $choice in
        1) category="daily-notes" ;;
        2) category="business-ideas" ;;
        3) category="branding-insights" ;;
        4) category="ai-discoveries" ;;
        5) category="cafe-innovations" ;;
        6) category="study-concepts" ;;
        7) category="random-thoughts" ;;
        *) echo -e "${RED}잘못된 선택입니다.${NC}"; exit 1 ;;
    esac
else
    category="$1"
fi

# Set file name and template based on category
case $category in
    "daily-notes")
        filename="${TODAY}.md"
        template="TEMPLATE_daily.md"
        ;;
    "business-ideas")
        read -p "비즈니스 아이디어 제목: " title
        filename="${TODAY}_${title// /_}.md"
        template="TEMPLATE_business.md"
        ;;
    "branding-insights")
        read -p "인사이트 제목: " title
        filename="${TODAY}_${title// /_}.md"
        template="TEMPLATE_insight.md"
        ;;
    *)
        read -p "파일 제목: " title
        filename="${TODAY}_${title// /_}.md"
        template=""
        ;;
esac

filepath="${VAULT_DIR}/${category}/${filename}"

# Create file if it doesn't exist
if [ ! -f "$filepath" ]; then
    if [ -f "${VAULT_DIR}/${category}/${template}" ] && [ -n "$template" ]; then
        # Copy template and replace placeholders
        cp "${VAULT_DIR}/${category}/${template}" "$filepath"
        sed -i '' "s/\[날짜\]/$TODAY/g" "$filepath"
        if [ -n "$title" ]; then
            sed -i '' "s/\[아이디어 제목\]/$title/g" "$filepath"
            sed -i '' "s/\[인사이트 제목\]/$title/g" "$filepath"
        fi
        echo -e "${GREEN}✅ 템플릿을 사용해서 새 파일을 생성했습니다!${NC}"
    else
        # Create simple file with header
        echo "# 💡 ${title:-"메모"} - ${TODAY}" > "$filepath"
        echo "" >> "$filepath"
        echo "## 내용" >> "$filepath"
        echo "" >> "$filepath"
        echo "---" >> "$filepath"
        echo "*Tags: #$(basename $category)*" >> "$filepath"
        echo -e "${YELLOW}📝 기본 형태로 새 파일을 생성했습니다.${NC}"
    fi
else
    echo -e "${BLUE}📖 기존 파일을 열겠습니다.${NC}"
fi

# Open with VS Code (you can change this to your preferred editor)
if command -v code &> /dev/null; then
    code "$filepath"
    echo -e "${GREEN}🚀 VS Code로 파일을 열었습니다: $filename${NC}"
else
    echo -e "${YELLOW}📍 파일 위치: $filepath${NC}"
    echo -e "${YELLOW}💡 에디터로 열어서 작성하세요!${NC}"
fi

echo ""
echo -e "${BLUE}💡 팁: 메모를 다 작성한 후에는 주기적으로 정리해보세요!${NC}"