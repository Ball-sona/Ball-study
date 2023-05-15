# Gatsby

Gatsby란 React 기반 정적 사이트 생성 프레임워크이다. 

## Jamstack 이란?

> Jamstack 이란 웹 경험 계층을 데이터와 비즈니스 로직과 분리하여, 유연성, 확장성,성능 및 유지 관리성을 향상시키는 아키텍처 접근 방식이다.
>
> 이는 웹 경험에 영향을 미치는 비즈니스 로직의 필요성을 제거하고, API를 통해 custom한 로직과 써드파티 서비스가 사용될 때 웹용 구성가능한 아키텍처를 가능하게 한다?

JAM 은 `Javascript` , `API`, `Markup` 의 앞글자를 하나씩 따온 용어로, Javascript와 Markup을 통해 정적 페이지를 생성하고 필요시에 API를 통해 데이터를 호출하는 아키텍처를 의미한다. 

- 전통적인 SSR : 서버에 페이지를 요청하면 HTML를 만들어 클라이언트에 전송해준다.
- SPA : 처음 요청받은 페이지만 SSR로 제공하고, 나머지는 CSR로 페이지를 생성한다.
- Jam Stack : 각 페이지를 HTML로 pre-render하여 이를 캐싱 후 CDN에서 제공한다. 

이러한 JamStack Site를 만드는 프레임워크에는 Next, Hugo, Gatsby, Jekyll, Nuxt 등이 있다. 

<img width="441" alt="스크린샷 2023-05-12 12 34 16" src="https://github.com/ballsona/Study/assets/67703882/27afb1b6-c21d-4f22-a555-1da29d0a8b6a">

## Gatsby 시작하기

## 참고자료

- https://jamstack.org/
- https://www.gatsbyjs.com/