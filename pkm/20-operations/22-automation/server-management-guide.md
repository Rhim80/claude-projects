# 셀프호스팅 서버 관리 가이드

## 서버 현황

### 운영 중인 서비스
1. **n8n (자동화 워크플로우)**
   - 컨테이너명: `n8n-docker`
   - 포트: 5678
   - 도메인: https://n8n.imiwork.com
   - 로컬 접속: http://localhost:5678
   - 현재 버전: 1.105.4

2. **Ghost (블로그)**
   - 컨테이너명: `ghost-blog`
   - 포트: 2368 (로컬만)
   - 도메인: https://blog.imiwork.com
   - 로컬 접속: http://localhost:2368

### 파일 구조
```
C:\Users\imiwo\docker-services\
├── docker-compose.yml    # 메인 설정 파일
├── README.md            # 이 가이드 문서
└── (다른 설정 파일들)
```

### 현재 docker-compose.yml 설정
```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n-docker
    restart: always
    ports:
      - "5678:5678"  # 외부 접근 가능
    volumes:
      - n8n_data:/home/node/.n8n
    environment:
      - WEBHOOK_URL=https://n8n.imiwork.com/
      - N8N_HOST=n8n.imiwork.com
      - N8N_PROTOCOL=https
      - GENERIC_TIMEZONE=Asia/Seoul

  ghost:
    image: ghost:latest
    container_name: ghost-blog
    restart: always
    ports:
      - "127.0.0.1:2368:2368"  # 로컬만 접근 가능
    volumes:
      - ghost_content:/var/lib/ghost/content
    environment:
      url: https://blog.imiwork.com
      database__client: sqlite3
      database__connection__filename: /var/lib/ghost/content/data/ghost.db
      database__useNullAsDefault: 'true'
      TZ: Asia/Seoul
      mail__transport: SMTP
      mail__options__service: Gmail
      mail__options__host: smtp.gmail.com
      mail__options__port: 587
      mail__options__secure: false
      mail__options__auth__user: hovooimi@gmail.com
      mail__options__auth__pass: umrv emss kazn yduu
      mail__from: hovooimi@gmail.com

volumes:
  n8n_data:
  ghost_content:
```

### Docker 볼륨
- `docker-services_n8n_data`: n8n 데이터 (워크플로우, 자격증명 등)
- `docker-services_ghost_content`: Ghost 블로그 데이터

## 일반적인 관리 명령어

### 기본 작업 디렉토리
모든 명령어는 다음 경로에서 실행:
```powershell
cd C:\Users\imiwo\docker-services
```

### 서비스 상태 확인
```powershell
docker-compose ps
# 또는
docker ps
```

### 서비스 시작/중지
```powershell
# 전체 서비스 시작
docker-compose up -d

# 전체 서비스 중지
docker-compose down

# 특정 서비스만 재시작
docker-compose restart n8n
docker-compose restart ghost
```

### 로그 확인
```powershell
# n8n 로그 확인
docker logs n8n-docker

# Ghost 로그 확인
docker logs ghost-blog

# 실시간 로그 보기
docker logs -f n8n-docker
```

## 업데이트 절차

### 안전한 업데이트 방법
1. **백업 (권장)**
   - n8n 웹에서 워크플로우 전체 Export
   - Ghost 관리자에서 콘텐츠 Export

2. **업데이트 실행**
   ```powershell
   cd C:\Users\imiwo\docker-services
   docker-compose pull        # 최신 이미지 다운로드
   docker-compose up -d       # 서비스 재시작
   ```

3. **확인**
   - https://n8n.imiwork.com 접속 확인
   - https://blog.imiwork.com 접속 확인

### 버전 확인
```powershell
# n8n 버전 확인
docker exec n8n-docker n8n --version

# Ghost 버전 확인
docker exec ghost-blog node -e "console.log(require('/var/lib/ghost/current/package.json').version)"
```

## 문제 해결

### 502 Bad Gateway 에러
- 컨테이너가 완전히 시작될 때까지 2-3분 대기
- 로그 확인: `docker logs n8n-docker`

### 데이터가 사라진 경우
- 올바른 볼륨 연결 확인: `docker inspect [컨테이너명]`
- Docker Compose 파일의 volumes 설정 확인

### 포트 충돌
- 현재 사용 중인 포트 확인: `netstat -an | findstr :5678`
- 다른 프로세스 종료 후 재시작

## 도메인 및 SSL 설정

### 현재 도메인
- n8n.imiwork.com → n8n (포트 5678)
- blog.imiwork.com → Ghost (포트 2368)

### Cloudflare 설정
- DNS: A 레코드로 서버 IP 연결
- SSL: Full (strict) 모드
- 터널링 또는 직접 연결 설정됨

## 보안 주의사항

### 접근 제한
- Ghost: 로컬만 접근 가능 (`127.0.0.1:2368`)
- n8n: 외부 접근 가능 (`0.0.0.0:5678`)

### 정기 작업
- 월 1회 업데이트 확인
- 분기별 전체 백업
- 디스크 용량 모니터링

## 연락처 및 참고사항

### 작업 일시
- 초기 설정: 2025년 8월
- 마지막 업데이트: 2025.08.08 (n8n 1.105.4)

### 주의사항
- 업데이트 전 반드시 백업
- Docker Compose 방식으로만 관리
- 단독 docker run 명령어 사용 금지

---
*이 가이드는 서버 관리 시 참고용으로 작성되었습니다.*
