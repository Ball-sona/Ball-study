# CORS

CORS(Cross-Origin Resource Sharing)에 대해 알아보자.

## CORS란?

클라이언트-서버 통신 개발을 하다보면 한번쯤은 필수로 겪는 이슈가 바로 CORS 이슈인데, 이는 모두 CORS 정책을 위반했기 때문이다. CORS 정책은 '다른 출처' 간에 리소스 공유 하는 것을 막는 정책이다.

### 여기서 출처(origin)란?

```
https://prr.com/users?id=1#desc
```

우리는 위 같은 URL을 여러 조각으로 나눌 수 있다. 여기서 **출처**는 여러 조각 중 Protocol(`https://`) 와 Host(`prr.com`) 그리고 생략된 포트 번호(`:80` or `:443`) 까지를 합친 것을 의미한다. 즉 서버의 위치를 찾아가기 위해 필요한 가장 기본적인 정보들을 담고 있다.

> SOP(Same-Origin Policy) 도 다른 출처 간 리소스 공유를 제한하는 정책 중 하나다. 다른 출처의 리소스 요청을 제한하되 몇가지 예외 조항을 두고, 해당 조항에 해당하는 리소스 요청은 출처가 다르더라도 허용하는데, 그 중 하나가 'CORS 정책을 지킨 리소스 요청'이다.

## CORS는 어떻게 동작하나

먼저 브라우저는 출처가 다른지 같은지 어떻게 파악하는지 알아보자.

클라이언트에서 다른 출처의 리소스를 요청할 때, 브라우저는 요청 헤더에 `Origin` 이라는 필드에 요청을 보내는 출처를 함께 담아 보낸다.

```http
Origin: https://prr.com
```

이후 서버가 이 요청에 대한 응답을 할 때, 응답 헤더에 `Access-Control-Allow-Origin` 이라는 값에 '이 리소스를 접근하는 것이 허용된 출처'를 내려주고, 이 응답을 받은 브라우저는 자신이 보냈던 `Origin` 과 `Access-Control-Allow-Origin` 를 비교한 후 이 응답이 유효한 응답인지를 결정한다.

기본적인 흐름은 이렇지만, 사실 CORS가 동작하는 방식은 3가지 시나리오에 의해 변경된다.

### Preflight Request

Preflight 방식은 브라우저가 본 요청을 보내기 전 보내는 예비 요청을 의미하고, 여기에는 HTTP 메서드 중 `OPTIONS` 메서드가 사용된다.

이는 브라우저 스스로가 이 요청을 보내는 것이 안전한지 확인한다.

### Simple Request

단순 요청은 예비 요청을 따로 보내지 않고 바로 서버에 본 요청을 보낸 후, 서버가 이에 대한 응답의 헤더에 `Access-Control-Allow-Origin` 과 같은 값을 보내주면 그때 브라우저가 CORS 정책 위반 여부를 검사하는 방식이다.

> 단순 요청을 사용할 수 있는 조건
>
> - 메서드가 `GET` , `HEAD` , `POST` 중 하나여야함
> - `Accept`, `Accept-Language`, `Content-Language`, `Content-Type`, `DPR`, `Downlink`, `Save-Data`, `Viewport-Width`, `Width`를 제외한 헤더를 사용하면 안됨
> - 만약 `Content-Type`를 사용하는 경우에는 `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`만 허용

### Credentialed Request

다른 출처 간 통신에서 좀 더 보안을 강화하고 싶을 때 사용하는 방식이다.

기본적으로 `XMLHttpRequest` 나 `fetch`를 사용하여 서버에 요청을 보낼 때 별도의 옵션 없이는 브라우저 쿠키 정보나 인증과 관련된 헤더를 함부로 요청에 담지 않는다. 이때 요청에 인증과 관련된 정보를 담을 수 있게 해주는 옵션이 `credentials` 이다.

이 옵션은 총 3가지 값을 갖는다.

- same-origin (default) : 같은 출처 간 요청에만 가능
- include : 모든 요청에 가능
- omit : 모든 요청에 불가능

만약 `credentials` 옵션 값으로 `same-origin` 이나 `include` 을 설정하여 리소스 요청에 인증 정보가 포함하게 된다면, 다른 출처의 리소스를 요청할 때 단순히 `Access-Control-Allow-Origin` 만 확인하지 않고 추가 검사 조건을 확인한다.

- `Access-Control-Allow-Origin` 에 `*` 를 사용할 수 없다.
- 응답 헤더에 반드시 `Access-Control-Allow-Credentials: true` 가 존재해야한다.

## 출처

https://evan-moon.github.io/2020/05/21/about-cors/
