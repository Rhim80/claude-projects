#!/usr/bin/env python3
"""
YouTube Content Analyzer Script
유튜브 콘텐츠 분석을 위한 Python 스크립트
- YouTube Data API v3로 메타데이터 추출
- yt-dlp로 자막 추출
- JSON 형식으로 구조화된 데이터 반환
"""

import os
import sys
import json
import re
import subprocess
from urllib.parse import urlparse, parse_qs
from datetime import datetime, timedelta
from dotenv import load_dotenv
import requests

# 환경변수 로드
load_dotenv()

class YouTubeAnalyzer:
    def __init__(self):
        self.api_key = os.getenv('YOUTUBE_API_KEY')
        if not self.api_key:
            raise ValueError("YOUTUBE_API_KEY가 환경변수에 설정되지 않았습니다.")
        
        self.api_base = "https://www.googleapis.com/youtube/v3"
    
    def extract_video_id(self, url):
        """YouTube URL에서 비디오 ID 추출"""
        patterns = [
            r'(?:v=|\/)([0-9A-Za-z_-]{11}).*',
            r'(?:embed\/)([0-9A-Za-z_-]{11})',
            r'(?:youtu\.be\/)([0-9A-Za-z_-]{11})'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, url)
            if match:
                return match.group(1)
        
        raise ValueError(f"유효한 YouTube URL이 아닙니다: {url}")
    
    def get_video_metadata(self, video_id):
        """YouTube Data API로 비디오 메타데이터 추출"""
        url = f"{self.api_base}/videos"
        params = {
            'part': 'snippet,contentDetails,statistics',
            'id': video_id,
            'key': self.api_key
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()
        
        data = response.json()
        
        if not data.get('items'):
            raise ValueError(f"비디오를 찾을 수 없습니다: {video_id}")
        
        item = data['items'][0]
        snippet = item['snippet']
        content_details = item['contentDetails']
        statistics = item['statistics']
        
        # ISO 8601 duration을 초로 변환
        duration_match = re.match(r'PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?', content_details['duration'])
        hours = int(duration_match.group(1) or 0)
        minutes = int(duration_match.group(2) or 0) 
        seconds = int(duration_match.group(3) or 0)
        total_seconds = hours * 3600 + minutes * 60 + seconds
        duration_formatted = f"{hours:02d}:{minutes:02d}:{seconds:02d}" if hours > 0 else f"{minutes:02d}:{seconds:02d}"
        
        return {
            "video_id": video_id,
            "title": snippet.get('title', ''),
            "description": snippet.get('description', '')[:1000],  # 처음 1000자만
            "channel_name": snippet.get('channelTitle', ''),
            "channel_id": snippet.get('channelId', ''),
            "published_date": snippet.get('publishedAt', ''),
            "duration": duration_formatted,
            "duration_seconds": total_seconds,
            "view_count": int(statistics.get('viewCount', 0)),
            "like_count": int(statistics.get('likeCount', 0)),
            "comment_count": int(statistics.get('commentCount', 0)),
            "tags": snippet.get('tags', []),
            "thumbnail_url": snippet.get('thumbnails', {}).get('maxres', {}).get('url', 
                snippet.get('thumbnails', {}).get('high', {}).get('url', '')),
            "embed_code": f'<iframe width="560" height="315" src="https://www.youtube.com/embed/{video_id}" frameborder="0" allowfullscreen></iframe>'
        }
    
    def get_subtitles(self, video_id):
        """yt-dlp를 사용하여 자막 추출"""
        try:
            # 먼저 한국어 자막 시도
            cmd_ko = [
                'yt-dlp', 
                '--write-subs', 
                '--sub-langs', 'ko',
                '--skip-download',
                '--sub-format', 'vtt',
                f'https://www.youtube.com/watch?v={video_id}'
            ]
            
            result_ko = subprocess.run(cmd_ko, capture_output=True, text=True, cwd='/tmp')
            
            # 한국어가 없으면 영어 자막 시도
            if result_ko.returncode != 0:
                cmd_en = [
                    'yt-dlp', 
                    '--write-subs', 
                    '--sub-langs', 'en',
                    '--skip-download', 
                    '--sub-format', 'vtt',
                    f'https://www.youtube.com/watch?v={video_id}'
                ]
                
                result_en = subprocess.run(cmd_en, capture_output=True, text=True, cwd='/tmp')
                
                if result_en.returncode != 0:
                    return {
                        "available": False,
                        "language": None,
                        "content": None,
                        "error": "자막을 찾을 수 없습니다."
                    }
                
                lang = 'en'
            else:
                lang = 'ko'
            
            # VTT 파일 읽기
            vtt_files = [f for f in os.listdir('/tmp') if f.startswith(video_id) and f.endswith('.vtt')]
            
            if not vtt_files:
                return {
                    "available": False,
                    "language": None,
                    "content": None,
                    "error": "자막 파일을 찾을 수 없습니다."
                }
            
            vtt_path = f'/tmp/{vtt_files[0]}'
            
            with open(vtt_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # VTT에서 텍스트만 추출
            lines = content.split('\n')
            subtitle_text = []
            
            for line in lines:
                line = line.strip()
                # 타임스탬프 라인이 아니고, 빈 라인이 아니고, WEBVTT 헤더가 아닌 경우
                if (line and 
                    not re.match(r'\d{2}:\d{2}:\d{2}\.\d{3}', line) and
                    not line.startswith('WEBVTT') and
                    not line.startswith('NOTE')):
                    subtitle_text.append(line)
            
            # 임시 파일 삭제
            try:
                os.remove(vtt_path)
            except:
                pass
            
            return {
                "available": True,
                "language": lang,
                "content": '\n'.join(subtitle_text),
                "word_count": len(' '.join(subtitle_text).split())
            }
            
        except Exception as e:
            return {
                "available": False,
                "language": None,
                "content": None,
                "error": f"자막 추출 중 오류: {str(e)}"
            }
    
    def analyze_content_themes(self, metadata, subtitles):
        """콘텐츠 주제 및 인사이트 분석"""
        title = metadata['title']
        description = metadata['description']
        subtitle_content = subtitles.get('content', '') if subtitles['available'] else ''
        
        # 기본적인 키워드 추출 (간단한 분석)
        all_text = f"{title} {description} {subtitle_content}".lower()
        
        # 비즈니스/리더십 관련 키워드 확인
        business_keywords = ['business', 'leadership', 'entrepreneur', 'startup', 'marketing', 'strategy', 
                           'management', 'growth', 'success', '비즈니스', '리더십', '창업', '경영', '전략']
        
        found_keywords = [kw for kw in business_keywords if kw in all_text]
        
        # 콘텐츠 타입 추정
        content_type = "discussion"
        if "interview" in all_text or "인터뷰" in all_text:
            content_type = "interview"
        elif "tutorial" in all_text or "강의" in all_text:
            content_type = "tutorial"
        elif "review" in all_text or "리뷰" in all_text:
            content_type = "review"
        
        return {
            "primary_topic": found_keywords[0] if found_keywords else "general",
            "keywords": found_keywords[:10],  # 상위 10개
            "content_type": content_type,
            "estimated_complexity": "intermediate",  # 기본값
            "imi_work_relevance": len(found_keywords) > 2  # 비즈니스 키워드가 3개 이상이면 관련성 높음
        }
    
    def analyze_video(self, youtube_url):
        """전체 비디오 분석 실행"""
        try:
            # 1. 비디오 ID 추출
            video_id = self.extract_video_id(youtube_url)
            
            # 2. 메타데이터 추출
            print(f"메타데이터 추출 중... (ID: {video_id})")
            metadata = self.get_video_metadata(video_id)
            
            # 3. 자막 추출
            print("자막 추출 중...")
            subtitles = self.get_subtitles(video_id)
            
            # 4. 콘텐츠 분석
            print("콘텐츠 분석 중...")
            analysis = self.analyze_content_themes(metadata, subtitles)
            
            # 5. 결과 통합
            result = {
                "video_metadata": metadata,
                "subtitles": subtitles,
                "content_analysis": analysis,
                "actionable_data": {
                    "imi_work_suitable": analysis['imi_work_relevance'],
                    "suggested_title_keywords": analysis['keywords'][:5],
                    "content_themes": [analysis['primary_topic']],
                    "summary": f"{metadata['title']} - {metadata['channel_name']} ({metadata['duration']})"
                },
                "technical_details": {
                    "embed_code": metadata['embed_code'],
                    "thumbnail_url": metadata['thumbnail_url'],
                    "captions_available": subtitles['available']
                },
                "analysis_timestamp": datetime.now().isoformat()
            }
            
            return result
            
        except Exception as e:
            return {
                "error": True,
                "message": str(e),
                "analysis_timestamp": datetime.now().isoformat()
            }

def main():
    """메인 실행 함수"""
    if len(sys.argv) != 2:
        print("사용법: python3 youtube-analyzer.py <YouTube_URL>")
        sys.exit(1)
    
    youtube_url = sys.argv[1]
    
    try:
        analyzer = YouTubeAnalyzer()
        result = analyzer.analyze_video(youtube_url)
        
        # JSON으로 출력 (서브에이전트가 파싱)
        print(json.dumps(result, ensure_ascii=False, indent=2))
        
    except Exception as e:
        error_result = {
            "error": True,
            "message": str(e),
            "analysis_timestamp": datetime.now().isoformat()
        }
        print(json.dumps(error_result, ensure_ascii=False, indent=2))
        sys.exit(1)

if __name__ == "__main__":
    main()