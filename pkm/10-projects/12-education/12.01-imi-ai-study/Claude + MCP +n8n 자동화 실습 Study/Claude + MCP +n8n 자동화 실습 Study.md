---
title: "Claude + MCP +n8n 자동화 실습 Study"
tags:
  - "para-system"
  - "db-areas"
  - "imi-ai-study"
aliases:
  - "Claude + MCP +n8n 자동화 실습 Study 23cd0f53623d8128a405f43d2732f67f"
notion-id: "23cd0f53623d8128a405f43d2732f67f"
folder: "🚀 PARA System 230d0f53623d80fc9622ed288f937b25/DB Areas 🔲 230d0f53623d812fa0e9f500c4679623/IMI AI STUDY 1d9d0f53623d8041bf76c077ebfc7363"
published: false
---

# Claude + MCP +n8n 자동화 실습 Study

## 스터디 개요 & 참고 자료

[[노션 기초 강의]]

* 7월 28일 강의
* 노션 스터디 1차 프롬프트 자료

## 원본 데이터베이스

[📋 강의 프로젝트](Claude%20%2B%20MCP%20%2Bn8n%20%EC%9E%90%EB%8F%99%ED%99%94%20%EC%8B%A4%EC%8A%B5%20Study/%F0%9F%93%8B%20%EA%B0%95%EC%9D%98%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8.csv)

[🔗 유용한 자료](Claude%20%2B%20MCP%20%2Bn8n%20%EC%9E%90%EB%8F%99%ED%99%94%20%EC%8B%A4%EC%8A%B5%20Study/%F0%9F%94%97%20%EC%9C%A0%EC%9A%A9%ED%95%9C%20%EC%9E%90%EB%A3%8C.csv)

[🎥 스터디 연관 유튜브 영상](Claude%20%2B%20MCP%20%2Bn8n%20%EC%9E%90%EB%8F%99%ED%99%94%20%EC%8B%A4%EC%8A%B5%20Study/%F0%9F%8E%A5%20%EC%8A%A4%ED%84%B0%EB%94%94%20%EC%97%B0%EA%B4%80%20%EC%9C%A0%ED%8A%9C%EB%B8%8C%20%EC%98%81%EC%83%81.csv)

***

## 📋 스터디 목적

* AI: 당신의 새로운 손과 발

[AI: 당신의 새로운 손과 발](https://flo.host/lA7IH0j/)

***

## 📋 스터디 내용

[AI 자동화 강의: 실행 파트너 만들기](https://flo.host/owUUPgJ/)

[AI 업무 자동화 워크숍](https://flo.host/93EwNmv/)

* **사례실습 상세내용**

  ## **실습세션 소개**

  중급 수준 사용자를 위한 API 및 데이터 연동 실습 세션으로, Naver Open API와 MCP 서버, Notion을 활용하여 데이터를 수집하고 자동으로 관리하는 방법을 학습합니다.

  ### **실습 목표**

  네이버 API를 통해 수집된 뉴스/블로그 데이터를 MCP 서버에서 가공 후, 이를 Notion DB에 자동 저장시켜 데이터 관리의 효율성을 높이는 것이 목표입니다.

  ### **실습 진행 단계**

  1. 네이버 개발자센터에서 Open API 키 발급 (클라이언트 ID / Secret)
  2. MCP 서버 설치 및 네이버 API 연동 설정 (검색어 등록, 타겟 채널 설정 등)
  3. MCP를 통해 키워드 기준 뉴스/블로그 데이터 수집 테스트
  4. 수집된 데이터를 Notion MCP 모듈을 이용해 자동으로 Notion DB에 저장하도록 설정
  5. Notion DB 내 데이터 정상 저장 확인 및 최종 점검

  ### **사용 도구**

  * **Naver Open API**: [네이버 오픈 API 플랫폼](https://developers.naver.com/products/openapi) (데이터 수집 및 분석)
  * **MCP (Model Context Protocol)**: 데이터 처리 및 서버 운영
  * **Notion**: [노션 플랫폼](https://www.notion.so/ko-kr) (데이터 관리 및 저장)

  **대상 수준:** 중급

  **사전 필요 지식:**

  * MCP 서버 사용법 (설치, 타겟 설정, 데이터 파이프라인 구성)
  * Notion API 연동 기본 개념 (integration 발급, DB ID 확인)

  **사전 준비 사항:**

  * [노션 API 설정부터 클로드에 노션 MCP 연결하기까지](https://www.gpters.org/nocode/post/falls-api-settings-notion-Tx9iQCMaaXClx6i) 읽기

  * Notion 계정 생성

  * Notion API Key (Integration Token) 발급

  * Notion MCP 모듈 설치 및 연동 설정

  * 뉴스레터 mark down

    [[newsletter-prompt]]

  * 디자인 가이드 mark down

    [[design-guide]]

  ###
