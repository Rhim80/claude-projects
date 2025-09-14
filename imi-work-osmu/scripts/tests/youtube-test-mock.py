#!/usr/bin/env python3
"""
YouTube Data API v3 없이 mock 데이터로 워크플로우 테스트
"""

import json
from datetime import datetime
from pathlib import Path
import sys
import os

# imi-work-osmu 디렉토리를 Python path에 추가
sys.path.insert(0, str(Path("imi-work-osmu")))

def create_mock_youtube_analysis(youtube_url):
    """Mock YouTube 분석 데이터 생성"""
    # 실제 YouTube URL: https://www.youtube.com/watch?v=TGb87Us2c5c
    # 이 URL의 예상 데이터를 기반으로 mock 생성
    
    mock_analysis = {
        "video_id": "TGb87Us2c5c",
        "url": youtube_url,
        "title": "Sora는 진짜 게임체인저일까? OpenAI 영상생성 AI 완전분석",
        "description": "OpenAI의 새로운 영상생성 AI 'Sora'에 대한 완전분석입니다. 기술적 특징, 활용 가능성, 그리고 실제 비즈니스에 미칠 영향까지 종합적으로 다뤄봅니다. AI 시대의 새로운 패러다임을 함께 탐구해보세요.",
        "channel_name": "테크인사이트",
        "channel_id": "UC123456789",
        "published_at": "2024-02-20 10:30:00 UTC",
        "published_date_kr": "2024년 02월 20일",
        "duration": "15분 42초",
        "duration_raw": "PT15M42S",
        "view_count": "127.5K회",
        "view_count_raw": "127532",
        "like_count": "3420",
        "comment_count": "287",
        "thumbnail_url": "https://i.ytimg.com/vi/TGb87Us2c5c/hqdefault.jpg",
        "tags": ["AI", "OpenAI", "Sora", "영상생성", "인공지능", "기술분석"],
        "category_id": "28",
        "default_language": "ko",
        "channel_info": {
            "description": "최신 AI 기술과 트렌드를 깊이있게 분석하는 채널",
            "subscriber_count": "89500",
            "video_count": "234",
            "view_count": "5670000",
            "country": "KR",
            "custom_url": "@techinsight"
        }
    }
    
    return mock_analysis

def main():
    """메인 실행 함수"""
    if len(sys.argv) != 2:
        print("사용법: python youtube-test-mock.py <YouTube_URL>")
        return 1
    
    youtube_url = sys.argv[1]
    
    try:
        print(f"🎬 Mock YouTube 분석 시작: {youtube_url}")
        
        # Mock 데이터 생성
        analysis = create_mock_youtube_analysis(youtube_url)
        
        # 임시 디렉토리 생성 및 저장
        temp_dir = Path("imi-work-osmu/temp")
        temp_dir.mkdir(parents=True, exist_ok=True)
        
        # 분석 결과 저장
        filename = f"youtube-analysis-{analysis['video_id']}-mock.json"
        filepath = temp_dir / filename
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(analysis, f, ensure_ascii=False, indent=2)
        
        print(f"✅ Mock 분석 결과 저장: {filepath}")
        print(f"📊 제목: {analysis['title']}")
        print(f"   채널: {analysis['channel_name']}")
        print(f"   길이: {analysis['duration']}")
        print(f"   조회수: {analysis['view_count']}")
        
        # IMI WORK Persona Writer 호출
        print(f"\n✍️ IMI WORK Persona Writer 실행...")
        
        # Python 경로에서 모듈 import 시도
        try:
            from imi_work_persona_writer import IMIWorkPersonaWriter
            
            writer = IMIWorkPersonaWriter()
            
            # Mock 분석 데이터로 콘텐츠 프롬프트 생성
            brand_guides = writer.load_brand_guides()
            slug = writer.generate_slug(analysis['title'])
            content_prompt = writer.create_content_prompt(analysis, brand_guides)
            
            # 프롬프트 파일 저장
            prompt_file = temp_dir / f"content-prompt-{slug}.md"
            with open(prompt_file, 'w', encoding='utf-8') as f:
                f.write(content_prompt)
            
            print(f"💾 콘텐츠 생성 프롬프트 저장: {prompt_file}")
            print(f"🏷️ 생성된 Slug: {slug}")
            
            print(f"\n🎉 Mock 테스트 완료!")
            print(f"다음 단계: 이 프롬프트를 Claude에게 전달하여 실제 콘텐츠를 생성하세요.")
            
            return 0
            
        except ImportError as e:
            print(f"❌ 모듈 import 실패: {e}")
            print("직접 실행해보겠습니다...")
            
            # 직접 실행
            import subprocess
            result = subprocess.run([
                sys.executable, 
                "imi-work-osmu/imi-work-persona-writer.py", 
                youtube_url
            ], cwd=".")
            
            return result.returncode
        
    except Exception as e:
        print(f"💥 오류 발생: {str(e)}")
        return 1

if __name__ == "__main__":
    exit(main())