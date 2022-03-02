# 로그인 및 로그인 유지방법을 공부하기 위한 App입니다.

## 기술스택

> 추가 기능
> >jsonwebtoken
> > > 20220303 server - access_token 과 refresh_token 발행으로 로그인 확인 

> 공용

- Typescript javascript superSet
  > Server
- Port : 4000
- Express - 웹 프레임워크
- cookie-parser - cookie를 쉽게 가져오기 위한 미들웨어
- cors - 다른 port에서도 api를 사용하기 위한 미들웨어 `ex)현재 http://localhost:3000만 허용`
- mongoose - Node.js와 MongoDB를 위한 ODM(Object Data Mapping) 라이브러리

  > Client
- Port : 3000
- Next.js - react 프레임워크 (주로 사용하여 채택)
- Antd - design library
  > DB
- MongoDB - 예제도 많고 초반 러닝커브가 짧아 사용

## Getting Started

- Client - yarn dev
- Server - cd /server yarn server

## API

post `/api/auth/signup`
post `/api/auth/login`
get `/api/auth/logOut`
get `/api/auth/refreshAuth`

### User Schema

`name : string`
`email : string , unique: true`
`password : string`
`phone : string`

## 구현 예정

- 이메일, 비밀번호 정규식
- client에서 access token 로컬 변수 저장
- SNS 로그인
