# Jam Stack

JAM 은 `Javascript` , `API`, `Markup` 의 앞글자를 하나씩 따온 용어로, Javascript와 Markup(HTML, CSS)을 통해 정적 페이지를 생성하고 필요시에 API를 통해 데이터를 호출하는 아키텍처를 의미한다. 

- 전통적인 SSR : 서버에 페이지를 요청하면 HTML를 만들어 클라이언트에 전송해준다.
- SPA : 처음 요청받은 페이지만 SSR로 제공하고, 나머지는 CSR로 페이지를 생성한다.
- Jam Stack : 각 페이지를 HTML로 pre-render하여 이를 캐싱 후 CDN에서 제공한다. 

## 동작 원리 

<img width="567" alt="스크린샷 2023-06-15 00 09 15" src="https://github.com/ballsona/Study/assets/67703882/1fd795ff-31b8-4491-a1c5-1c8a03396f2d">

기존 웹 사이트의 동작 방식과 비교하면 Jam Stack 방식이 더 간단한 구조임을 확인할 수 있다. 기존 웹 사이트 방식은 대부분 서버에서 데이터베이스나 CMS(Content Management System, ex. Wordpress) 에서 데이터를 불러와 프론트엔드에 뿌려주는 방식이다. 

반면, Jam Stack은 Markup와 여러 API 등으로 만든 정적 웹 페이지를 미리 렌더링한 후 이를 CDN에 저장해두었다가 불러와 프론트엔드에 전달하는 방식이다.

이러한 JamStack Site를 만드는 프레임워크에는 Next, Hugo, Gatsby, Jekyll, Nuxt 등이 있다. 

## 참고 자료

- https://jamstack.org/