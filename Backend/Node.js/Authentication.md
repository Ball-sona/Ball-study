# Everything you need to know about the 'passport-local' Passport JS Strategy

[https://www.npmjs.com/package/express-session](https://levelup.gitconnected.com/everything-you-need-to-know-about-the-passport-local-passport-js-strategy-633bbab6195) 블로그 글 번역

## Authentication Choices

![image](https://user-images.githubusercontent.com/67703882/222881420-045631d9-e480-4c36-a8de-860c25468f49.png)

오늘날 개발자들이 선택 가능한 인증 선택지들은 다음과 같다.

- 세션 기반 인증 : 사용자의 로그인 및 로그아웃을 관리하기 위해 백엔드의 session과 브라우저의 cookie를 이용한다.
- JWT 인증 : JSON Web Token은 주로 브라우저의 localStorage에 저장되는 stateless 인증 방법이다. 이 JWT는 사용자에 대한 확인을 갖고 있으며, 서버에 저장된 secret만으로 디코드가 가능하다.
- OAuth와 OpenID Connect 인증 : 현대적인 인증 방식. 클라이언트 애플리케이션이 클라이언트의 사용자를 인증하기 위해 다른 애플리케이션으로부터 생성된 **claims** 라는 것을 사용한다. 구글 같은 현존하는 서비스가 인증과 사용자 저장소를 관리하는 동안, 클라이언트 애플리케이션이 이 플로우를 활용해 유저 인증을 하는 '결합된' 인증이다.

위 그림을 보면 OAuth는 `As a service` 방식과 `In house` 방식으로 구분해놓았는데, 이는 OAuth 프로토콜을 서비스로 구현하는 'OAuth' 라는 회사가 있기 때문이다. 우리는 이 회사의 서비스 없이도 OAuth 프로토콜을 구현할 수 있다.

## 세션 기반 인증이란 무엇인가?

세션 기반 인증은 이 중 가장 오래된 인증 방법이지만 아직 쓸만하고 실제로 쓰이고 있다. 이는 `passport-local` 전략의 근간이다. 이 인증 방법은 '서버 사이드' 방식인데, Express 애플리케이션과 데이터베이스가 우리 애플리케이션에 방문하는 유저들의 현재 인증 상태를 유지하기 위해 함께 돌아간다.

세션 기반 인증의 기본 원리를 이해하려면, 우리는 4가지의 기본 개념을 이해해야 한다.

- 기본 HTTP 헤더 프로토콜
- 쿠키이란 무엇인지
- 세션이란 무엇인지
- 유저 인증을 위해 서버의 세션과 브라우저의 쿠키가 어떻게 상호작용하는지

### HTTP Header

브라우저에 HTTP 요청을 보내기 위한 방법에는 여러가지가 있다. HTTP 클라이언트는 웹 애플리케이션, IoT 디바이스, 커맨드 라인(curl) 등 다양한 형태일 수 있다. 이러한 클라이언트들은 인터넷에 연결되어 데이터를 불러오거나 수정하는 HTTP 요청을 보내게 된다.

예를 들어 서버와 클라이언트가 다음과 같다고 해보자.

```
Server = www.google.com
Client = 카페에서 노트북으로 일하고 있는 어떤 사람..
```

이 사람이 크롬 브라우저에서 `www.google.com` 를 접속하면, 이 요청은 'HTTP 헤더'를 통해 보내진다. 이 HTTP 헤더는 key-value 형태로 구성되어 있는데, 이는 요청이 무사히 완료되기 위해 필요한 추가적인 데이터들을 브라우저에 제공한다. 이 요청에는 2가지의 헤더 종류를 가질 수 있다.

- 일반적인 헤더(General Header)
- 요청 헤더(Request Header)

우리가 일반적으로 보내는 요청의 헤더는 아마 다음과 같을 것이다.

```
General Headers
  Request URL: https://www.google.com/
  Request Method: GET
  Status Code: 200
Request Headers
  Accept: text/html
  Accept-Language: en-US
  Connection: keep-alive
```

이 헤더들의 의미는 그냥 읽어봐도 충분히 이해 가능하겠지만, HTTP 헤더들이 어떻게 이용되는지 더 잘 이해하기 위해 몇가지 더 알아보자.

#### General Headers

일반적인 헤더(General Header)는 요청과 응답 데이터의 혼합이 될 수 있다. `request URL` 와 `request method` 는 **요청 객체의 일부**이고, 이들은 크롬 브라우저에게 우리의 요청에 대해 어디로 라우팅해주어야 할지 알려준다. `status code` 는 **응답의 일부**로서, 우리의 GET 요청이 성공적으로 보내졌고, `www.google.com` 웹 페이지가 잘 로드되었는지 알려준다.

#### Request Headers

요청 헤더(Request Header)는 요청 객체 자체를 포함한 헤더들을 갖고 있다. 우리는 요청 헤더를 '서버에 대한 지시사항'으로도 생각할 수 있다.

- '구글 서버야. 나한테 HTML이나 텍스트 데이터를 보내줘. 나 지금 다른 것들은 못 읽는 상태야!'
- '구글 서버야. 나한테 영어만 보내줘.'
- '구글 서버야. 요청이 끝난 후에도 내 연결 끊지 말아줘.'

등등 같이 말이다.

구글 서버는 우리의 요청을 받으면, 헤더의 지시 사항들(헤더)를 읽고 '응답'을 만들어낸다. 이 응답은 HTML data(우리가 브라우저에서 보고 있는 페이지들)과 HTTP 헤더로 구성될 것이다.

응답 헤더는 다음과 같을 것이다.

```
Response Headers
  Content-Length: 41485
  Content-Type: text/html; charset=UTF-8
  Set-Cookie: made_up_cookie_name=some value; expires=Thu, 28-Dec-2020 20:44:50 GMT;
```

이러한 응답 헤더들은 `Set-Cookie` 를 제외하면 꽤 직관적이다. `Set-Cookie` 헤더는 우리가 세션 기반 인증을 배우기 위해 어떤 것인지 알아야한다.
