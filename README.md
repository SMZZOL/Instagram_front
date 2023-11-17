# I. **MERN Stack 을 활용한 Instagram Clone Coding-Frontend**

## 1. 개요

- React, Redux 를 이요한 FrontEnd, Express 와 MongoDB 및 Mongoose를 활용한 백엔드. [작업중]

## 2. 활용 기술

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"><br>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

## 3. 역할 및 소요시간

- 개인프로젝트
- MERN Stack 학습 기간 포함 3주간

## 4. 내용

### 빌드, 패키지 관리
 - npm
### 베포
~~## V1 (Onrender)~~
![Deploy_V1](https://github.com/SMZZOL/Instagram_front/assets/103109967/88a1d826-5050-4a20-9344-0ebb674542b9)
## V2 (Docker+EC2+Compose) (Curr)
![Deploy_V2](https://github.com/SMZZOL/Instagram_front/assets/103109967/37820a1b-8a52-4a7d-a169-28d28dee9278)
## V3 (Docker+Kubernetes+RDS+Jenkins) (In progress)
![Deploy_V3png](https://github.com/SMZZOL/Instagram_front/assets/103109967/1b334146-3824-4959-b76c-ab0d7c06f14f)

### 형상관리
 - git
### 테스트
- Postman, Thunderclient
  - 베포과정



## 시퀀스 다이어그램
### 시퀀스 다이어그램 (회원가입)
![시퀀스_다이어그램(회원가입)](https://github.com/SMZZOL/Instagram_front/assets/103109967/56cb1463-49c1-4e21-bec3-4c4b45002558)
<BR/>
### 시퀀스 다이어그램 (로그인)
![시퀀스_다이어그램(로그인)](https://github.com/SMZZOL/Instagram_front/assets/103109967/310bac52-bf14-432e-96b1-1381e1ae48ed)
<BR>
### 시퀀스 다이어그램 (JWT인증)
![시퀀스_다이어그램(인증)](https://github.com/SMZZOL/Instagram_front/assets/103109967/7c6759ff-04ae-40b7-8a99-8e54bb90228b)
<BR>
### 시퀀스 다이어그램 (홈_피드)
![시퀀스 다이어그램(홈_피드)](https://github.com/SMZZOL/Instagram_front/assets/103109967/2cc357a6-6da2-4499-a893-0b59a7bd3519)
<BR>









## Todo List

- AUTH
  - 회원가입 [V]
  - 로그인 [V]
  - JWT 인증 [V]
  - Refresh, Access Token [V]
  - 비번찾기[X]
- PROFILE
  - 프로필 [V]
    - 내 게시물[V]
    - 태그된 게시물 [X]
  - 팔로잉, 팔로워 [V]
  - 계정 검색[V]
  - 비공개 게정 [X]
  - 게정추가[X]
- CONTENT
  - 피드 CRUD [-]
    - 피드 C [V] R [V] U [X] D [V]
      - 파일 다중 업로드 [V] 파일 다중 View (작업중..!)
    - 피드 유저 태그 [V]
      - 태그 위치 설정 [X]
    - 피드 공개 대상 [X] (친한 친구와 연동)
  - 스토리 CRUD [X] (작업중..!)
  - 하이라이트 (스토리) 추가 [X]
  - DM [X]
  - 릴스 [X]
- ALGOROTHM
  - 관심도에 따른 피드 노출 [X]
  - 관심도에 따른 스토리 노출 [X]
  - 서치탭 [X]
- SETTINGS
  - 친한친구 [X]
  - 차단 [X]
  -
