#!/usr/bin/env python3
"""
IMI WORK OSMU Notion 워크스페이스 자동 설정 스크립트

이 스크립트는 다음을 수행합니다:
1. OSMU 대시보드 페이지 생성
2. 콘텐츠 관리 데이터베이스 생성
3. 성과 추적 데이터베이스 생성
4. 콘텐츠 캘린더 데이터베이스 생성
5. 데이터베이스 간 관계 설정

사용법:
1. pip install notion-client python-dotenv
2. .env 파일에 NOTION_TOKEN 설정
3. python notion_workspace_setup.py
"""

import os
from dotenv import load_dotenv
from notion_client import Client
import json
from datetime import datetime, timedelta

# 환경변수 로드
load_dotenv()

# Notion 클라이언트 초기화
notion = Client(auth=os.environ["NOTION_TOKEN"])

def create_dashboard_page():
    """OSMU 대시보드 메인 페이지 생성"""
    try:
        dashboard_page = notion.pages.create(
            **{
                "parent": {"type": "page_id", "page_id": "25cd0f53623d8078b7bccc15d606ede0"},
                "properties": {
                    "title": {
                        "title": [
                            {
                                "text": {
                                    "content": "IMI WORK OSMU 대시보드"
                                }
                            }
                        ]
                    }
                },
                "icon": {"emoji": "🎯"},
                "children": [
                    {
                        "heading_1": {
                            "rich_text": [
                                {"text": {"content": "전체 현황"}}
                            ]
                        }
                    },
                    {
                        "paragraph": {
                            "rich_text": [
                                {"text": {"content": "IMI WORK OSMU(One Source Multi Use) 전략 실행을 위한 통합 대시보드입니다."}}
                            ]
                        }
                    },
                    {
                        "heading_2": {
                            "rich_text": [
                                {"text": {"content": "📊 이번 달 목표"}}
                            ]
                        }
                    },
                    {
                        "to_do": {
                            "rich_text": [{"text": {"content": "네이버 블로그 3개 글 발행"}}],
                            "checked": False
                        }
                    },
                    {
                        "to_do": {
                            "rich_text": [{"text": {"content": "Instagram 캐러셀 8개 제작"}}],
                            "checked": False
                        }
                    },
                    {
                        "to_do": {
                            "rich_text": [{"text": {"content": "Threads 스레드 12회 발행"}}],
                            "checked": False
                        }
                    },
                    {
                        "to_do": {
                            "rich_text": [{"text": {"content": "Ghost 블로그 방문자 1,000명 달성"}}],
                            "checked": False
                        }
                    }
                ]
            }
        )
        
        print(f"✅ 대시보드 페이지 생성 완료: {dashboard_page['url']}")
        return dashboard_page["id"]
        
    except Exception as e:
        print(f"❌ 대시보드 페이지 생성 실패: {e}")
        return None

def create_content_database(parent_id):
    """콘텐츠 관리 데이터베이스 생성"""
    try:
        database = notion.databases.create(
            **{
                "parent": {"type": "page_id", "page_id": parent_id},
                "title": [
                    {
                        "text": {
                            "content": "콘텐츠 관리"
                        }
                    }
                ],
                "properties": {
                    "제목": {
                        "title": {}
                    },
                    "YouTube 소스": {
                        "url": {}
                    },
                    "제작일": {
                        "date": {}
                    },
                    "상태": {
                        "select": {
                            "options": [
                                {"name": "🔵 기획중", "color": "blue"},
                                {"name": "🟡 작업중", "color": "yellow"},
                                {"name": "🟢 완성", "color": "green"},
                                {"name": "🔴 보류", "color": "red"}
                            ]
                        }
                    },
                    "Ghost 블로그": {
                        "select": {
                            "options": [
                                {"name": "✅ 완성", "color": "green"},
                                {"name": "🔄 작업중", "color": "yellow"},
                                {"name": "⏳ 예정", "color": "gray"},
                                {"name": "❌ 해당없음", "color": "red"}
                            ]
                        }
                    },
                    "네이버 블로그": {
                        "select": {
                            "options": [
                                {"name": "✅ 발행완료", "color": "green"},
                                {"name": "🔄 작업중", "color": "yellow"},
                                {"name": "⏳ 예정", "color": "gray"},
                                {"name": "❌ 해당없음", "color": "red"}
                            ]
                        }
                    },
                    "Instagram 캐러셀": {
                        "select": {
                            "options": [
                                {"name": "✅ 발행완료", "color": "green"},
                                {"name": "🔄 작업중", "color": "yellow"},
                                {"name": "⏳ 예정", "color": "gray"},
                                {"name": "❌ 해당없음", "color": "red"}
                            ]
                        }
                    },
                    "Threads 스레드": {
                        "select": {
                            "options": [
                                {"name": "✅ 발행완료", "color": "green"},
                                {"name": "🔄 작업중", "color": "yellow"},
                                {"name": "⏳ 예정", "color": "gray"},
                                {"name": "❌ 해당없음", "color": "red"}
                            ]
                        }
                    },
                    "키워드": {
                        "multi_select": {
                            "options": [
                                {"name": "브랜딩", "color": "purple"},
                                {"name": "마케팅", "color": "pink"},
                                {"name": "AI", "color": "blue"},
                                {"name": "비즈니스", "color": "green"},
                                {"name": "자영업", "color": "orange"},
                                {"name": "감각", "color": "red"},
                                {"name": "실무", "color": "yellow"}
                            ]
                        }
                    },
                    "카테고리": {
                        "select": {
                            "options": [
                                {"name": "일 잘하기", "color": "blue"},
                                {"name": "감각과 AI", "color": "purple"},
                                {"name": "브랜딩", "color": "green"},
                                {"name": "비즈니스 통찰", "color": "orange"},
                                {"name": "자영업 팁", "color": "red"}
                            ]
                        }
                    }
                }
            }
        )
        
        print(f"✅ 콘텐츠 관리 DB 생성 완료: {database['url']}")
        
        # 첫 번째 콘텐츠 레코드 추가
        notion.pages.create(
            **{
                "parent": {"database_id": database["id"]},
                "properties": {
                    "제목": {
                        "title": [
                            {
                                "text": {
                                    "content": "연결하는 사람이 되면 일이 잘 풀린다"
                                }
                            }
                        ]
                    },
                    "YouTube 소스": {
                        "url": "https://www.youtube.com/watch?v=qImgGtnNbx0"
                    },
                    "제작일": {
                        "date": {
                            "start": "2025-08-27"
                        }
                    },
                    "상태": {
                        "select": {
                            "name": "🟢 완성"
                        }
                    },
                    "Ghost 블로그": {
                        "select": {
                            "name": "✅ 완성"
                        }
                    },
                    "네이버 블로그": {
                        "select": {
                            "name": "⏳ 예정"
                        }
                    },
                    "Instagram 캐러셀": {
                        "select": {
                            "name": "⏳ 예정"
                        }
                    },
                    "Threads 스레드": {
                        "select": {
                            "name": "⏳ 예정"
                        }
                    },
                    "키워드": {
                        "multi_select": [
                            {"name": "브랜딩"},
                            {"name": "비즈니스"}
                        ]
                    },
                    "카테고리": {
                        "select": {
                            "name": "일 잘하기"
                        }
                    }
                }
            }
        )
        
        return database["id"]
        
    except Exception as e:
        print(f"❌ 콘텐츠 관리 DB 생성 실패: {e}")
        return None

def create_analytics_database(parent_id):
    """성과 추적 데이터베이스 생성"""
    try:
        database = notion.databases.create(
            **{
                "parent": {"type": "page_id", "page_id": parent_id},
                "title": [
                    {
                        "text": {
                            "content": "성과 추적"
                        }
                    }
                ],
                "properties": {
                    "측정 기간": {
                        "title": {}
                    },
                    "날짜": {
                        "date": {}
                    },
                    "측정 주기": {
                        "select": {
                            "options": [
                                {"name": "📆 일간", "color": "blue"},
                                {"name": "📅 주간", "color": "green"},
                                {"name": "📊 월간", "color": "purple"}
                            ]
                        }
                    },
                    "플랫폼": {
                        "select": {
                            "options": [
                                {"name": "Ghost", "color": "gray"},
                                {"name": "네이버", "color": "green"},
                                {"name": "Instagram", "color": "pink"},
                                {"name": "Threads", "color": "blue"}
                            ]
                        }
                    },
                    "방문자 수": {
                        "number": {}
                    },
                    "페이지 뷰": {
                        "number": {}
                    },
                    "도달률": {
                        "number": {}
                    },
                    "참여율": {
                        "number": {}
                    },
                    "주요 인사이트": {
                        "rich_text": {}
                    },
                    "개선 계획": {
                        "rich_text": {}
                    }
                }
            }
        )
        
        print(f"✅ 성과 추적 DB 생성 완료: {database['url']}")
        return database["id"]
        
    except Exception as e:
        print(f"❌ 성과 추적 DB 생성 실패: {e}")
        return None

def create_calendar_database(parent_id):
    """콘텐츠 캘린더 데이터베이스 생성"""
    try:
        database = notion.databases.create(
            **{
                "parent": {"type": "page_id", "page_id": parent_id},
                "title": [
                    {
                        "text": {
                            "content": "콘텐츠 캘린더"
                        }
                    }
                ],
                "properties": {
                    "일정": {
                        "title": {}
                    },
                    "날짜": {
                        "date": {}
                    },
                    "타입": {
                        "select": {
                            "options": [
                                {"name": "📝 콘텐츠 제작", "color": "blue"},
                                {"name": "📊 성과 분석", "color": "green"},
                                {"name": "🎯 전략 수립", "color": "purple"},
                                {"name": "🔧 시스템 개선", "color": "orange"}
                            ]
                        }
                    },
                    "플랫폼": {
                        "multi_select": {
                            "options": [
                                {"name": "Ghost", "color": "gray"},
                                {"name": "네이버", "color": "green"},
                                {"name": "Instagram", "color": "pink"},
                                {"name": "Threads", "color": "blue"}
                            ]
                        }
                    },
                    "우선순위": {
                        "select": {
                            "options": [
                                {"name": "🔴 높음", "color": "red"},
                                {"name": "🟡 보통", "color": "yellow"},
                                {"name": "🟢 낮음", "color": "green"}
                            ]
                        }
                    },
                    "상태": {
                        "select": {
                            "options": [
                                {"name": "⏳ 예정", "color": "gray"},
                                {"name": "🔄 진행중", "color": "yellow"},
                                {"name": "✅ 완료", "color": "green"},
                                {"name": "⏸️ 보류", "color": "red"}
                            ]
                        }
                    },
                    "메모": {
                        "rich_text": {}
                    }
                }
            }
        )
        
        print(f"✅ 콘텐츠 캘린더 DB 생성 완료: {database['url']}")
        
        # 이번 주 일정 몇 개 추가
        today = datetime.now()
        for i in range(7):
            date = today + timedelta(days=i)
            if date.weekday() < 5:  # 평일만
                if date.weekday() == 0:  # 월요일
                    task = "새 YouTube 영상 발굴"
                    type_name = "📝 콘텐츠 제작"
                    platforms = ["Ghost"]
                elif date.weekday() == 1:  # 화요일
                    task = "Instagram 캐러셀 제작"
                    type_name = "📝 콘텐츠 제작"
                    platforms = ["Instagram"]
                elif date.weekday() == 2:  # 수요일
                    task = "Threads 스레드 기획"
                    type_name = "📝 콘텐츠 제작"
                    platforms = ["Threads"]
                elif date.weekday() == 3:  # 목요일
                    task = "플랫폼별 포스팅 실행"
                    type_name = "📝 콘텐츠 제작"
                    platforms = ["Ghost", "네이버", "Instagram", "Threads"]
                else:  # 금요일
                    task = "주간 성과 분석 및 리뷰"
                    type_name = "📊 성과 분석"
                    platforms = ["Ghost", "네이버", "Instagram", "Threads"]
                
                notion.pages.create(
                    **{
                        "parent": {"database_id": database["id"]},
                        "properties": {
                            "일정": {
                                "title": [
                                    {
                                        "text": {
                                            "content": task
                                        }
                                    }
                                ]
                            },
                            "날짜": {
                                "date": {
                                    "start": date.strftime("%Y-%m-%d")
                                }
                            },
                            "타입": {
                                "select": {
                                    "name": type_name
                                }
                            },
                            "플랫폼": {
                                "multi_select": [{"name": platform} for platform in platforms]
                            },
                            "우선순위": {
                                "select": {
                                    "name": "🟡 보통"
                                }
                            },
                            "상태": {
                                "select": {
                                    "name": "⏳ 예정"
                                }
                            }
                        }
                    }
                )
        
        return database["id"]
        
    except Exception as e:
        print(f"❌ 콘텐츠 캘린더 DB 생성 실패: {e}")
        return None

def main():
    """메인 실행 함수"""
    print("🚀 IMI WORK OSMU Notion 워크스페이스 설정을 시작합니다...")
    
    try:
        # 1. 대시보드 페이지 생성
        dashboard_id = create_dashboard_page()
        if not dashboard_id:
            return
        
        # 2. 콘텐츠 관리 DB 생성
        content_db_id = create_content_database(dashboard_id)
        
        # 3. 성과 추적 DB 생성
        analytics_db_id = create_analytics_database(dashboard_id)
        
        # 4. 콘텐츠 캘린더 DB 생성
        calendar_db_id = create_calendar_database(dashboard_id)
        
        # 5. 설정 정보 저장
        config = {
            "dashboard_id": dashboard_id,
            "content_db_id": content_db_id,
            "analytics_db_id": analytics_db_id,
            "calendar_db_id": calendar_db_id,
            "created_at": datetime.now().isoformat()
        }
        
        with open("notion_workspace_config.json", "w") as f:
            json.dump(config, f, indent=2)
        
        print("\n🎉 IMI WORK OSMU Notion 워크스페이스 설정이 완료되었습니다!")
        print(f"📋 대시보드 ID: {dashboard_id}")
        print(f"📝 콘텐츠 관리 DB ID: {content_db_id}")
        print(f"📊 성과 추적 DB ID: {analytics_db_id}")
        print(f"📅 콘텐츠 캘린더 DB ID: {calendar_db_id}")
        print("\n설정 정보가 notion_workspace_config.json 파일에 저장되었습니다.")
        
    except Exception as e:
        print(f"❌ 워크스페이스 설정 중 오류가 발생했습니다: {e}")

if __name__ == "__main__":
    main()