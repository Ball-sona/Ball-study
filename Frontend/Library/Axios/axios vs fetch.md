# Axios vs Fetch API

## 공통점

Promise 기반의 HTTP 클라이언트

## 차이점

### 동작 방식

- axios는 `XMLHttpRequest` or Node.js `HTTP` 모듈 기반
- fetch 는 브라우저에서 기본적으로 제공하는 API

### 지원 환경

- axios는 브라우저 및 node.js 사용 가능
- fetch는 브라우저에서 제공하는 API 이므로, node.js에서 사용하려면 별도의 패키지 필요

### JSON

- axios 자동으로 응답 데이터 json 파싱
- fetch 수동으로 파싱해줘야함.

### 요청 인터셉터 및 취소

- axios 요청이나 응답 인터셉터 가능. 요청 취소도 가능
- fetch 인터셉터 불가. `AbortController` 사용해서 수동 처리

### 쿠키

- axios 브라우저 쿠키 다루려면 별도 설정 필요.
- fetch same-origin policy에 따라 자동으로 쿠키 관리

## 이 외 HTTP 클라이언트 라이브러리

- superagent
- request
- got
