# Training Content

### 1. Express.js 설치

### 2. MongoDB 세팅

- 회원가입
- 클러스터 무료버전 세팅
- db 등록
- `mongoose` 패키지 추가

### 3. User 모델, User schema 작성

- model > User.js

### 4. git 초기화

- ssh 연동: 알던 명령어랑 약간 다르니 참고
- `git init`으로 로컬 레포지토리 생성
- `git status`로 확인
- `git add .` 전체 add
- `.gitignore` || `git rm --cached node_modules -r`
- `Working directory` / `Staging Area` / `Git repository (local / remote)`
- `ssh-keygen -t rsa -b 4096 -C "${userEmail@gmail.com}"`
- ssh-agent 를 백그라운드에서 켜줘야함 `eval "${ssh-agent -s}"` `ssh-agent -s`
- `ssh-add -K ~/.ssh/id_rsa`
- `pbcopy < ~/.ssh/id_ras.pub` 클립보드에 퍼블릭 키 복사

### 5. 회원가입 / Body Parser / Postman

- `body-parser`
- API 테스트 > 클라이언트 역활: Postman

### 6. PostMan

- Web-client로 변경
- Proxy 설정에서 localhost 주소를 추가해줘야 CORS 이슈가 발생하지 않음

### 7. `bcrypt`로 정보 암호화

- `bcrypt` 모듈 추가
- Salt를 이용해서 비밀번호 암호화
- Salt를 먼저 생성해야함
- SaltRounds : length

### 8. 로그인 기능 구체화

- DB에서 login email 찾기
- 요청된 이메일이 DB에 있다면, 비밀번호 일치 여부 확인
- 비밀번호 일치 하는 경우, 인증 토큰 생성(`jsonwebtoken` 사용)

### 9. 인증 기능 Authentication

- cookie에 저장된

### Questions

1. Mysql 과 mongoDB 차이점은?

2. 쿠키, 로컬스토리지, 세션에 토큰저장 각 장단점?

3. User.js 에서는 Arrow 함수를 쓰면 this 참조 에러가 난다 확인해보자!
