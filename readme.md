# Training Content

1. Express.js 설치

2. MongoDB 세팅

- 회원가입
- 클러스터 무료버전 세팅
- db 등록
- `mongoose` 패키지 추가

3. User 모델, User schema 작성

- model > User.js

4. git 초기화

- `git init`으로 로컬 레포지토리 생성
- `git status`로 확인
- `git add .` 전체 add
- `.gitignore` || `git rm --cached node_modules -r`
- `Working directory` / `Staging Area` / `Git repository (local / remote)`

- `ssh-keygen -t rsa -b 4096 -C "${userEmail@gmail.com}"`
- ssh-agent 를 백그라운드에서 켜줘야함 `eval "${ssh-agent -s}"` `ssh-agent -s`
- `ssh-add -K ~/.ssh/id_rsa`
- `pbcopy < ~/.ssh/id_ras.pub` 클립보드에 퍼블릭 키 복사

5. 회원가입 / Body Parser / Postman

- `body-parser`
- API 테스트 > 클라이언트 역활: Postman
