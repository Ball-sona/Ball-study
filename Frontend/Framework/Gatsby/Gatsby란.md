# Gatsby

Gatsby란 React 기반 Static Site 생성 프레임워크이다.

## Static Site?

웹 사이트를 만드는 방식에 대해 이야기를 해보라 하면 CSR, SSR가 먼저 언급이 될 것 같다. CSR은 클라이언트 단에서 페이지를 렌더링하여 사용자에게 보여주는 방식이고, SSR은 서버 단에서 페이지를 렌더링하여 사용자에게 그 결과물을 전달해주는 방식이다.

우리가 흔히 말하는 CSR, SSR 방식으로 만드는 웹 사이트는 '동적(Dynamic) 웹 사이트'라고 분류할 수 있다.

## How Gatsby works

Gatsby는 총 3개의 단계로 동작한다.

### 1. Collecting Data Sources

Gatsby에서는 데이터를 불러오는 공간을 Data Sources 라고 부른다. 이는 WordPress 같은 CMS나 Database, CSV 등이 될 수 있다.

### 2. Building

Data Source에서 데이터를 불러오는 과정이다. Gatsby에서는 기본적으로 GraphQL을 통해 데이터를 불러온다. (플러그인을 사용하면 RESTful API도 사용 가능하다.)

이렇게 불러온 데이터를 이용해 웹 페이지를 생성한다. 코드는 React-based라 리액트 컴포넌트 처럼 제작하면 된다.

### 3. Deploying

정적 웹 사이트로 배포하는 과정이다.

## 참고자료

- https://www.gatsbyjs.com/
- https://mnxmnz.github.io/gatsby/what-is-gatsby/

https://blog.banksalad.com/tech/build-a-website-with-gatsby/
