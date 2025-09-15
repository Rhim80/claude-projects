#!/usr/bin/env python3
"""
실제 시각적 이미지 파일 생성
PIL을 사용하여 브랜드 가이드라인에 맞는 이미지 생성
"""

from PIL import Image, ImageDraw, ImageFont
import os
from pathlib import Path

# 브랜드 컬러 (RGB)
COLORS = {
    'navy': (30, 58, 138),        # #1e3a8a
    'white': (255, 255, 255),     # #ffffff  
    'light_gray': (248, 250, 252), # #f8fafc
    'accent_gold': (245, 158, 11)  # #f59e0b
}

def create_gradient_background(width, height, color1, color2, direction='vertical'):
    """그라데이션 배경 생성"""
    image = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(image)
    
    if direction == 'vertical':
        for y in range(height):
            ratio = y / height
            r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
            g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
            b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
            draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    return image

def add_geometric_elements(draw, width, height, color):
    """추상적 기하학 요소 추가"""
    # 삼각형들로 산 형태 표현
    points = [
        (width * 0.6, height * 0.7),
        (width * 0.8, height * 0.4), 
        (width * 0.9, height * 0.7)
    ]
    draw.polygon(points, fill=color)
    
    # 계단 형태의 성장 표현
    step_width = width * 0.04
    step_height = height * 0.05
    for i in range(5):
        x = width * 0.1 + i * step_width
        y = height * 0.8 - i * step_height
        draw.rectangle([x, y, x + step_width, y + step_height], fill=color)

def create_ghost_feature_image():
    """Ghost 피처 이미지 생성 (1200x630)"""
    width, height = 1200, 630
    
    # 그라데이션 배경
    img = create_gradient_background(width, height, COLORS['navy'], (50, 80, 160))
    draw = ImageDraw.Draw(img)
    
    # 기하학적 요소 추가
    add_geometric_elements(draw, width, height, COLORS['accent_gold'])
    
    # 텍스트 영역 (왼쪽 1/3)
    text_bg = Image.new('RGBA', (400, height), (0, 0, 0, 100))
    img.paste(text_bg, (0, 0), text_bg)
    
    # 리더 실루엣 (간단한 형태로)
    leader_x, leader_y = width * 0.7, height * 0.3
    draw.ellipse([leader_x-20, leader_y-20, leader_x+20, leader_y+20], fill=COLORS['white'])  # 머리
    draw.rectangle([leader_x-15, leader_y+5, leader_x+15, leader_y+80], fill=COLORS['white'])  # 몸통
    
    return img

def create_ghost_content_image():
    """Ghost 콘텐츠 이미지 생성 (800x450)"""
    width, height = 800, 450
    
    img = Image.new('RGB', (width, height), COLORS['light_gray'])
    draw = ImageDraw.Draw(img)
    
    # 상승 차트 그리기
    chart_points = []
    for i in range(10):
        x = 100 + i * 60
        y = height - 100 - (i * 15 + (i**1.2) * 5)
        chart_points.append((x, y))
    
    # 차트 선 그리기
    for i in range(len(chart_points)-1):
        draw.line([chart_points[i], chart_points[i+1]], fill=COLORS['navy'], width=4)
        draw.ellipse([chart_points[i][0]-6, chart_points[i][1]-6, 
                     chart_points[i][0]+6, chart_points[i][1]+6], fill=COLORS['accent_gold'])
    
    # 460B 텍스트
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 48)
        draw.text((50, 50), "$460B", fill=COLORS['navy'], font=font)
        
        font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 24)
        draw.text((50, 110), "Investment Experience", fill=COLORS['navy'], font=font_small)
    except:
        draw.text((50, 50), "$460B", fill=COLORS['navy'])
        draw.text((50, 110), "Investment Experience", fill=COLORS['navy'])
    
    return img

def create_naver_main_image():
    """네이버 메인 이미지 생성 (800x450)"""
    width, height = 800, 450
    
    img = Image.new('RGB', (width, height), COLORS['navy'])
    draw = ImageDraw.Draw(img)
    
    # 회의실 테이블 표현
    draw.rectangle([100, height-100, width-100, height-80], fill=COLORS['light_gray'])
    
    # 리더 실루엣 (뒷모습)
    draw.ellipse([width//2-25, 200, width//2+25, 250], fill=COLORS['white'])
    draw.rectangle([width//2-20, 250, width//2+20, 350], fill=COLORS['white'])
    
    # 전략 보드 (차트들)
    board_x, board_y = 200, 100
    draw.rectangle([board_x, board_y, board_x+400, board_y+200], fill=COLORS['light_gray'])
    
    # 보드 위 간단한 차트
    for i in range(5):
        bar_height = 20 + i * 15
        draw.rectangle([board_x + 50 + i*60, board_y + 150 - bar_height, 
                       board_x + 80 + i*60, board_y + 150], fill=COLORS['accent_gold'])
    
    return img

def create_naver_body_image():
    """네이버 바디 이미지 생성 (800x450)"""
    width, height = 800, 450
    
    img = Image.new('RGB', (width, height), COLORS['navy'])
    draw = ImageDraw.Draw(img)
    
    # 프로세스 단계 표현
    steps = ['문제 인식', '분석', '결정', '실행']
    step_width = width // 5
    
    for i, step in enumerate(steps):
        x = step_width * (i + 1)
        y = height // 2
        
        # 원형 스텝
        draw.ellipse([x-30, y-30, x+30, y+30], fill=COLORS['accent_gold'])
        
        # 화살표 (마지막 단계 제외)
        if i < len(steps) - 1:
            draw.line([x+35, y, x+step_width-35, y], fill=COLORS['white'], width=3)
            # 화살표 끝
            draw.polygon([
                (x+step_width-35, y-10),
                (x+step_width-35, y+10), 
                (x+step_width-25, y)
            ], fill=COLORS['white'])
    
    return img

def create_instagram_feed_image():
    """Instagram 피드 이미지 생성 (1080x1080)"""
    width, height = 1080, 1080
    
    img = Image.new('RGB', (width, height), COLORS['navy'])
    draw = ImageDraw.Draw(img)
    
    # 중앙 메시지 영역
    try:
        font_large = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 72)
        font_medium = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 48)
        
        # 메인 텍스트
        main_text = "두려움을 향해\n달려가라"
        text_bbox = draw.textbbox((0, 0), main_text, font=font_large)
        text_width = text_bbox[2] - text_bbox[0]
        text_height = text_bbox[3] - text_bbox[1]
        
        x = (width - text_width) // 2
        y = (height - text_height) // 2 - 100
        
        draw.text((x, y), main_text, fill=COLORS['white'], font=font_large, align='center')
        
        # 서브 텍스트
        sub_text = "성공한 리더의 선택"
        sub_bbox = draw.textbbox((0, 0), sub_text, font=font_medium)
        sub_width = sub_bbox[2] - sub_bbox[0]
        sub_x = (width - sub_width) // 2
        
        draw.text((sub_x, y + text_height + 50), sub_text, fill=COLORS['accent_gold'], font=font_medium)
        
    except:
        draw.text((width//2-200, height//2-100), "두려움을 향해 달려가라", fill=COLORS['white'])
        draw.text((width//2-150, height//2), "성공한 리더의 선택", fill=COLORS['accent_gold'])
    
    # 장식 요소
    draw.rectangle([100, height-150, width-100, height-140], fill=COLORS['accent_gold'])
    
    return img

def create_instagram_story_image():
    """Instagram 스토리 이미지 생성 (1080x1350)"""
    width, height = 1080, 1350
    
    # 그라데이션 배경
    img = create_gradient_background(width, height, COLORS['navy'], (80, 100, 180))
    draw = ImageDraw.Draw(img)
    
    try:
        font_brand = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 32)
        font_main = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 64)
        font_sub = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 28)
        
        # 상단 브랜드
        draw.text((50, 100), "SENSE & AI", fill=COLORS['white'], font=font_brand)
        
        # 중앙 메인 메시지
        main_msg = "진짜 성공한 리더는\n두려움을 인정한다"
        main_bbox = draw.textbbox((0, 0), main_msg, font=font_main)
        main_height = main_bbox[3] - main_bbox[1]
        
        draw.text((50, (height-main_height)//2), main_msg, fill=COLORS['white'], 
                 font=font_main, align='left')
        
        # 하단 CTA
        draw.text((50, height-200), "자세히 보기 →", fill=COLORS['accent_gold'], font=font_sub)
        
    except:
        draw.text((50, 100), "SENSE & AI", fill=COLORS['white'])
        draw.text((50, height//2-100), "진짜 성공한 리더는\n두려움을 인정한다", fill=COLORS['white'])
        draw.text((50, height-200), "자세히 보기 →", fill=COLORS['accent_gold'])
    
    return img

def main():
    """모든 이미지 생성 및 저장"""
    base_path = Path("assets/images/ben-horowitz-fear-leadership-insights")
    
    # 이미지 생성 및 저장
    images = {
        'ghost/feature.png': create_ghost_feature_image(),
        'ghost/content-1.png': create_ghost_content_image(), 
        'naver/main.png': create_naver_main_image(),
        'naver/body-1.png': create_naver_body_image(),
        'instagram/feed.png': create_instagram_feed_image(),
        'instagram/story.png': create_instagram_story_image()
    }
    
    for path, image in images.items():
        full_path = base_path / path
        full_path.parent.mkdir(parents=True, exist_ok=True)
        image.save(full_path, 'PNG', optimize=True)
        print(f"✓ 저장됨: {full_path}")
    
    print(f"\n🎉 총 {len(images)}개 이미지가 생성되었습니다!")
    print("브랜드 가이드라인에 따른 IMI WORK OSMU 이미지 패키지 완성")

if __name__ == "__main__":
    main()