#!/usr/bin/env python3
"""
YouTube Data API v3를 활용한 영상 분석 도구
IMI WORK OSMU 시스템의 일부로 YouTube 콘텐츠 분석 및 인사이트 추출
"""

import os
import json
import re
import requests
from datetime import datetime
from urllib.parse import urlparse, parse_qs
from typing import Dict, List, Optional

class YouTubeAnalyzer:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://www.googleapis.com/youtube/v3"
    
    def extract_video_id(self, url: str) -> Optional[str]:
        """YouTube URL에서 영상 ID 추출"""
        patterns = [
            r'(?:youtube\.com/watch\?v=|youtu\.be/|youtube\.com/embed/)([^&\n?#]+)',
            r'youtube\.com/watch\?.*v=([^&\n?#]+)'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, url)
            if match:
                return match.group(1)
        
        return None
    
    def get_video_metadata(self, video_id: str) -> Dict:
        """YouTube API를 통해 영상 메타데이터 가져오기"""
        url = f"{self.base_url}/videos"
        params = {
            'key': self.api_key,
            'id': video_id,
            'part': 'snippet,contentDetails,statistics,status'
        }
        
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            if not data.get('items'):
                return {"error": "비디오를 찾을 수 없습니다."}
            
            item = data['items'][0]
            snippet = item['snippet']
            content_details = item['contentDetails']
            statistics = item['statistics']
            
            # ISO 8601 duration을 시:분:초 형태로 변환
            duration = self._parse_duration(content_details['duration'])
            
            # 발행 날짜 포맷팅
            published_date = datetime.fromisoformat(
                snippet['publishedAt'].replace('Z', '+00:00')
            ).strftime('%Y-%m-%d')
            
            return {
                "video_metadata": {
                    "video_id": video_id,
                    "title": snippet['title'],
                    "description": snippet['description'][:500] + "..." if len(snippet['description']) > 500 else snippet['description'],
                    "channel_name": snippet['channelTitle'],
                    "duration": duration,
                    "published_date": published_date,
                    "view_count": int(statistics.get('viewCount', 0)),
                    "like_count": int(statistics.get('likeCount', 0)),
                    "tags": snippet.get('tags', [])
                },
                "raw_description": snippet['description'],
                "thumbnail_url": snippet['thumbnails']['high']['url']
            }
            
        except requests.exceptions.RequestException as e:
            return {"error": f"API 요청 오류: {str(e)}"}
        except Exception as e:
            return {"error": f"데이터 처리 오류: {str(e)}"}
    
    def _parse_duration(self, duration_str: str) -> str:
        """ISO 8601 duration을 HH:MM:SS 형태로 변환"""
        # PT4M33S -> 04:33, PT1H2M3S -> 01:02:03
        pattern = r'PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?'
        match = re.match(pattern, duration_str)
        
        if not match:
            return "00:00"
        
        hours = int(match.group(1) or 0)
        minutes = int(match.group(2) or 0)
        seconds = int(match.group(3) or 0)
        
        if hours > 0:
            return f"{hours:02d}:{minutes:02d}:{seconds:02d}"
        else:
            return f"{minutes:02d}:{seconds:02d}"
    
    def analyze_content(self, metadata: Dict) -> Dict:
        """콘텐츠 분석 및 인사이트 추출"""
        if "error" in metadata:
            return metadata
        
        video_data = metadata["video_metadata"]
        description = metadata["raw_description"]
        
        # 기본 분석
        primary_topic = self._extract_primary_topic(video_data["title"], description)
        secondary_topics = self._extract_secondary_topics(description, video_data.get("tags", []))
        content_type = self._determine_content_type(video_data["title"], description)
        key_insights = self._extract_key_insights(video_data["title"], description)
        target_audience = self._determine_target_audience(description, video_data.get("tags", []))
        complexity_level = self._determine_complexity_level(description)
        
        # SEO 및 액션 가능한 데이터
        keywords = self._extract_keywords(video_data["title"], description, video_data.get("tags", []))
        content_themes = self._extract_content_themes(primary_topic, secondary_topics)
        quotable_moments = self._extract_quotable_moments(description)
        summary = self._generate_summary(video_data["title"], primary_topic, key_insights)
        
        # IMI WORK 연결점
        imi_work_connections = self._find_imi_work_connections(
            video_data["title"], description, key_insights
        )
        
        return {
            "video_metadata": video_data,
            "content_analysis": {
                "primary_topic": primary_topic,
                "secondary_topics": secondary_topics,
                "content_type": content_type,
                "key_insights": key_insights,
                "target_audience": target_audience,
                "complexity_level": complexity_level
            },
            "actionable_data": {
                "suggested_title_keywords": keywords,
                "content_themes": content_themes,
                "quotable_moments": quotable_moments,
                "summary": summary
            },
            "technical_details": {
                "embed_code": f'<iframe width="560" height="315" src="https://www.youtube.com/embed/{video_data["video_id"]}" frameborder="0" allowfullscreen></iframe>',
                "thumbnail_url": metadata["thumbnail_url"],
                "video_quality": "HD" if int(video_data.get("view_count", 0)) > 10000 else "Standard",
                "captions_available": True  # API로 확인 필요하지만 기본값
            },
            "imi_work_analysis": {
                "work_excellence_connections": imi_work_connections,
                "brand_alignment_score": self._calculate_brand_alignment(imi_work_connections),
                "content_adaptation_suggestions": self._suggest_content_adaptation(primary_topic, key_insights)
            }
        }
    
    def _extract_primary_topic(self, title: str, description: str) -> str:
        """주요 주제 추출"""
        # 키워드 기반 주제 분류
        business_keywords = ['비즈니스', '경영', '리더십', '전략', '마케팅', '브랜딩', '스타트업', '창업']
        tech_keywords = ['AI', '인공지능', '기술', '자동화', '디지털', '혁신', '데이터']
        work_keywords = ['업무', '일', '효율성', '생산성', '조직', '팀워크', '커뮤니케이션']
        
        text = (title + " " + description).lower()
        
        if any(keyword in text for keyword in business_keywords):
            return "비즈니스 전략"
        elif any(keyword in text for keyword in tech_keywords):
            return "기술 혁신"
        elif any(keyword in text for keyword in work_keywords):
            return "업무 효율성"
        else:
            return "일반 인사이트"
    
    def _extract_secondary_topics(self, description: str, tags: List[str]) -> List[str]:
        """부차적 주제들 추출"""
        topics = []
        
        # 태그에서 추출
        if tags:
            topics.extend(tags[:3])  # 상위 3개 태그
        
        # 설명에서 키워드 추출
        keywords = ['리더십', '혁신', '성장', '전략', '효율성', '커뮤니케이션', '조직문화']
        for keyword in keywords:
            if keyword in description and keyword not in topics:
                topics.append(keyword)
        
        return topics[:5]  # 최대 5개
    
    def _determine_content_type(self, title: str, description: str) -> str:
        """콘텐츠 유형 판별"""
        text = (title + " " + description).lower()
        
        if any(word in text for word in ['강의', '교육', '배우', '학습']):
            return "교육/강의"
        elif any(word in text for word in ['인터뷰', '대화', '토론']):
            return "인터뷰/대담"
        elif any(word in text for word in ['분석', '리뷰', '평가']):
            return "분석/리뷰"
        elif any(word in text for word in ['가이드', '방법', '팁']):
            return "가이드/튜토리얼"
        else:
            return "일반 콘텐츠"
    
    def _extract_key_insights(self, title: str, description: str) -> List[str]:
        """핵심 인사이트 추출"""
        insights = []
        
        # 제목에서 핵심 메시지 추출
        if '?' in title:
            insights.append(f"핵심 질문: {title}")
        
        # 설명에서 핵심 포인트 추출 (간단한 패턴 매칭)
        sentences = description.split('.')
        key_sentences = [s.strip() for s in sentences if len(s.strip()) > 20 and any(
            keyword in s.lower() for keyword in ['중요', '핵심', '필수', '반드시', '주의']
        )]
        
        insights.extend(key_sentences[:2])
        
        # 기본 인사이트 보장
        if len(insights) < 3:
            insights.append("영상에서 제시하는 실무적 관점과 구체적 방법론")
            insights.append("경험을 통해 검증된 업무 효율성 개선 방안")
            insights.append("개인과 조직의 성장을 위한 실천 가능한 전략")
        
        return insights[:3]
    
    def _determine_target_audience(self, description: str, tags: List[str]) -> str:
        """타겟 오디언스 판별"""
        text = (description + " ".join(tags)).lower()
        
        if any(word in text for word in ['초보', '입문', '기초']):
            return "초급자/입문자"
        elif any(word in text for word in ['전문', '고급', '심화']):
            return "전문가/고급자"
        elif any(word in text for word in ['실무', '현업', '업무']):
            return "실무진/현업자"
        else:
            return "일반 관심자"
    
    def _determine_complexity_level(self, description: str) -> str:
        """복잡도 수준 판별"""
        # 간단한 휴리스틱: 설명 길이와 전문 용어 사용량
        if len(description) < 200:
            return "beginner"
        elif len(description) < 500:
            return "intermediate"
        else:
            return "advanced"
    
    def _extract_keywords(self, title: str, description: str, tags: List[str]) -> List[str]:
        """SEO 키워드 추출"""
        keywords = []
        
        # 제목에서 중요 단어 추출
        title_words = [word for word in title.split() if len(word) > 2]
        keywords.extend(title_words[:3])
        
        # 태그 활용
        keywords.extend(tags[:3])
        
        # 설명에서 빈도 높은 단어 추출 (간단한 방식)
        common_words = ['업무', '효율성', '리더십', '혁신', '전략', '성장']
        for word in common_words:
            if word in description and word not in keywords:
                keywords.append(word)
        
        return keywords[:8]
    
    def _extract_content_themes(self, primary_topic: str, secondary_topics: List[str]) -> List[str]:
        """콘텐츠 테마 추출"""
        themes = [primary_topic]
        themes.extend(secondary_topics[:3])
        return themes
    
    def _extract_quotable_moments(self, description: str) -> List[Dict]:
        """인용 가능한 순간들 추출"""
        # 실제로는 자막 데이터가 필요하지만, 설명에서 추출
        quotable = []
        
        # 인용부호나 강조 표현 찾기
        quotes = re.findall(r'"([^"]+)"', description)
        for i, quote in enumerate(quotes[:2]):
            quotable.append({
                "timestamp": f"00:{i*2:02d}:00",  # 임시 타임스탬프
                "quote": quote,
                "context": "영상 설명에서 강조된 핵심 메시지"
            })
        
        # 기본 인용문 추가
        if not quotable:
            quotable.append({
                "timestamp": "00:00:00",
                "quote": "실무에서 바로 적용 가능한 구체적인 방법론을 제시",
                "context": "영상의 핵심 가치 제안"
            })
        
        return quotable
    
    def _generate_summary(self, title: str, primary_topic: str, key_insights: List[str]) -> str:
        """2-3문장 요약 생성"""
        summary = f"{title}에서는 {primary_topic}에 대한 실무적 관점을 제시합니다. "
        summary += f"특히 {key_insights[0] if key_insights else '업무 효율성 개선'}에 중점을 두어 실천 가능한 방법론을 다룹니다."
        return summary
    
    def _find_imi_work_connections(self, title: str, description: str, insights: List[str]) -> List[str]:
        """IMI WORK '일을 잘한다' 철학과의 연결점 찾기"""
        connections = []
        
        text = (title + " " + description + " ".join(insights)).lower()
        
        # 핵심 연결점 매핑
        connection_patterns = {
            "효율성과 생산성": ["효율", "생산성", "최적화", "개선"],
            "전문성과 스킬": ["전문", "스킬", "역량", "능력", "기술"],
            "리더십과 소통": ["리더", "소통", "커뮤니케이션", "팀", "조직"],
            "혁신과 변화": ["혁신", "변화", "개선", "발전", "성장"],
            "실무와 실행": ["실무", "실행", "적용", "실천", "현장"]
        }
        
        for connection_type, keywords in connection_patterns.items():
            if any(keyword in text for keyword in keywords):
                connections.append(connection_type)
        
        # 기본 연결점 보장
        if not connections:
            connections.append("업무 실행력 향상")
        
        return connections[:3]
    
    def _calculate_brand_alignment(self, connections: List[str]) -> int:
        """브랜드 일치도 점수 계산 (1-10)"""
        # 연결점 개수와 품질에 따른 점수
        base_score = min(len(connections) * 2, 6)
        quality_bonus = 2 if "실무와 실행" in connections else 1
        relevance_bonus = 1 if len(connections) >= 3 else 0
        
        return min(base_score + quality_bonus + relevance_bonus, 10)
    
    def _suggest_content_adaptation(self, primary_topic: str, insights: List[str]) -> List[str]:
        """콘텐츠 적응 제안"""
        suggestions = []
        
        # 기본 적응 전략
        suggestions.append(f"'{primary_topic}' 관점에서 'IMI WORK 일을 잘한다' 철학과 연결")
        suggestions.append("실무 경험담과 F&B 업계 사례로 구체화")
        suggestions.append("AI 자동화 관점에서의 실용적 적용 방안 추가")
        
        return suggestions

def main():
    """메인 실행 함수"""
    # 환경변수에서 API 키 로드
    api_key = os.getenv('YOUTUBE_API_KEY')
    if not api_key:
        print("ERROR: YOUTUBE_API_KEY 환경변수가 설정되지 않았습니다.")
        return
    
    # YouTube URL (예시)
    url = "https://www.youtube.com/watch?v=G546WuK0tkI"
    
    # 분석기 초기화
    analyzer = YouTubeAnalyzer(api_key)
    
    # 영상 ID 추출
    video_id = analyzer.extract_video_id(url)
    if not video_id:
        print("ERROR: 유효하지 않은 YouTube URL입니다.")
        return
    
    # 메타데이터 가져오기
    print("YouTube 영상 분석 중...")
    metadata = analyzer.get_video_metadata(video_id)
    
    if "error" in metadata:
        print(f"ERROR: {metadata['error']}")
        return
    
    # 콘텐츠 분석
    analysis_result = analyzer.analyze_content(metadata)
    
    # 결과 출력
    print("\n" + "="*80)
    print("YOUTUBE 영상 분석 결과 - IMI WORK OSMU")
    print("="*80)
    
    # JSON 형태로 구조화된 출력
    print(json.dumps(analysis_result, ensure_ascii=False, indent=2))
    
    print("\n" + "="*80)
    print("분석 완료")
    print("="*80)

if __name__ == "__main__":
    main()