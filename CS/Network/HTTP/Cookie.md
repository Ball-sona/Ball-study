# HTTP Cookie

- 브라우저에서 어떤 사이트를 방문할 경우 그 사이트가 사용하고 있는 서버를 통해 클라이언트 로컬에 설치(저장)되는 작은 데이터 파일을 말한다. 
- 쿠키는 `key-value` 형식으로 이루어져 있다. 

<img src="https://user-images.githubusercontent.com/67703882/201508437-7de7fd8e-e08c-41d6-bbb0-b1db5b513cdd.png" alt="image" style="zoom:67%;" />

## 쿠키 생성 및 송수신 과정

1. 클라이언트가 서버에 HTTP 요청을 보낸다.

   ```http
   GET /index.html HTTP/1.1
   Host: www.test.com
   ```

2. `www.test.com` 의 서버는 HTTP Response Header의 `Set-Cookie`에 클라이언트에 전달할 데이터를 담은 후 응답한다. 

   ```http
   HTTP/1.1 200 OK
   Content-Type: text/html
   Set-Cookie : name=sona
   Set-Cookie : age=24
   ```

3. 브라우저는 서버로부터 받은 쿠키를 클라이언트의 메모리나 디스크에 저장한다.

4. 이후 클라이언트는 "유효기간"이 만료될 때까지 `www.test.com`에 요청을 할 때마다 서버로부터 받았던 쿠키를 `Cookie` 헤더에 담아서 그대로 돌려 보낸다. 

   ```http
   GET /index.html HTTP/1.1
   Host: www.test.com
   Cookie: name=sona; age=24
   ```

   이때 `www.test.com` 에 머무는 한 `/index.html`를 요청하든 `/user.html`를 요청하든 매번 같은 쿠키를 서버에 돌려 보낸다. 

5. 서버는 브라우저로부터 받은 쿠키를 읽어 사용자 인증 등 여러 용도로 데이터를 활용한다.

## 유효 기간

- 서버가 `Set-Cookie` 헤더를 통해 브라우저로 쿠키를 보내는 것은 일회성 작업(stateless)이지만, 브라우저가 `Cookie` 헤더를 통해 서버로 쿠키를 돌려 보내는 것은 일정 시간동안 반복해서 수행되는 작업이다. 
- 서버는 맨 처음 쿠키를 생성하여 클라이언트에 보낼 때, "브라우저가 쿠키를 얼마나 오랫동안 돌려 보내야 하는지", 즉 **쿠키의 유효 기간을 설정**할 수 있다. 

```
Set-Cookie: <key>=<value>; Expires=<종료시점>
Set-Cookie: <key>=<value>; Max-Age=<유효기간> // 초단위
```

Expires 속성에는 쿠키 유효기간 종료 시점을 지정해주고, Max-Age 속성에는 유효 기간을 지정해준다. 만약 두 속성 모두 지정되어 있다면 Max-Age 속성 값이 우선이다.

### 세션 쿠키 vs 영속 쿠키

- 세션 쿠키(session cookie): 유효기간을 지정하지 않은 쿠키. 브라우저 닫으면 해당 쿠키는 삭제된다.
- 영속 쿠키(persistent cookie): 특정 만료시점이나 유효 기간이 지정된 쿠키. 브라우저 닫아도 유효기간이 남아있다면 쿠키가 삭제되지 않는다. 

## 적용 범위 

### Domain

```
Set-Cookie: <key>=<value>; Domain=<도메인>
```

도메인 속성 값을 설정하면 해당 쿠키는 **지정된 도메인과 서브 도메인**에서만 유효하다. 

- 만약 `Domain=test.com` 설정 시 `a.test.com` 에서 받은 쿠키를 `b.test.com`  으로도 보내게 된다. 즉, 서브 도메인들이 쿠키를 공유하는 효과가 발생한다.
- 만약 설정하지 않으면 "현재 도메인"에만 쿠키를 보낸다.

### Path

```
Set-Cookie: <key>=<value>; Path=<경로>
```

Path 속성을 통해 특정 경로로 쿠키의 범위를 축소할 수 있다.

- 만약 `Path=/users` 설정 시 `/users/mypage` , `/users/mypage/info` 등 모든 하위 경로에 쿠키를 보낸다.

## 보안

```
Set-Cookie: <key>=<value>; Secure; HttpOnly
```

### Secure

- Secure 속성을 설정 시 HTTPS 프로토콜 상에서 암호화된 요청일 경우에만 전송한다.
- 하지만 Secure 속성을 설정했다 하더라도 **민감한 정보는 쿠키에 담으면 안된다는 것**을 명시하자.

### HttpOnly

- HttpOnly 속성을 설정 시 브라우저에서 `Document.cookie` 객체를 통해 접근할 수 없다. 
- XSS 공격 방지

## Third-party Cookie

- 동일한 도메인 서버로부터 받은 쿠키를 '퍼스트파티(First-party) 쿠키'라 부르고, 현재 도메인과 다른 도메인 서버로부터 받은 쿠키를 '서드파티(Third-party) 쿠키'라 부른다.
- `test.com` 에서 `example.com/img.png` 를 사용하고 있다고 가정해보자. 사용자가 `test.com`에 접속하면 브라우저는 `example.com` 에 이미지 데이터를 요청하는데, 이때 사용자가 `example.com` 에 대한 쿠키를 가지고 있다면, 해당 쿠키가 같이 전송된다. 이렇게 접속한 도메인과 다른 도메인으로 전송되는 쿠키가 서드파티 쿠키이다.
- GA(Google Analytics)에서 유저 행동을 분석하고 트래킹하기 위해 특정 사이트에 스크립트를 추가하여 서드파티 쿠키를 활용할 수 있다.

## Samesite Cookie

Samesite 쿠키는 서드파티 쿠키의 보안적 허점을 보완하기 위해 만들어진 기술이다. 

### CSRF(Cross Site Request Forgery)

CSRF 공격은 브라우저가 HTML 문서, 이미지, XHR, Form 등 모든 HTTP 요청을 보낸다는 점을 악용하고, 서드파티 쿠키를 가지고 공격을 실행한다.

- `test.com` 이 공격 대상 사이트라고 해보자.
  1. 사용자가 쿠키를 통해 사용자 인증을 하는 `test.com` 에 로그인이 되어 있다. 즉, `test.com` 에 대한 쿠키를 가지고 있다.
  2. 공격자는 피해자가 그럴듯한 사이크 링크(`csrf.com`)를 누르게 유도한다.
  3. 만약 링크를 누르면 HTML 문서가 열리는데, 해당 문서는 `test.com` 에 HTTP 요청을 보낸다.
  4. 브라우저에는 `test.com` 에 대한 쿠키를 가지고 있으므로, 이를 `csrf.com` 에 담아 보낸다. 이는 `csrf.com` 입장에서는 서드파티 쿠키이다.
  5. 이러한 서드파티 쿠키를 이용해서 공격자는 유도한 동작을 실행한다.

### Samesite 정책

Samesite는 도메인이 다른 사이트(Cross Site)로 전송하는 요청의 경우 쿠키의 전송을 제한할 수 있도록 하는 정책이다. `None`, `Lax`, `Strict` 중 하나를 선택할 수 있다.

- `None`: 모든 요청에 전송되는 쿠키로, 크로스 사이트 요청의 경우에도 항상 전송된다. 즉, CSRF 공격에 취약할 수 있다.
- `Strict`: 크로스 사이트 요청에는 항상 전송되지 않는 쿠키로, 퍼스트 파티 쿠키일 때만 전송된다.
- `Lax`: 대체로 크로스 사이트 요청에는 전송되지 않지만, 몇 가지 예외적인 요청에는 전송된다.
  - Top Level Navigation: `<a>` 클릭 시, `window.location.replace` 에 의해 자동으로 이동 시, `302` 리다이렉트된 경우 (`<iframe>`, `<img>`에 의한 요청은 Navigation이라 할 수 없다.)
  - `POST` 나 `DELETE` 는 서버의 상태를 변경시킬 수 있으므로 '위험한 요청'으로 간주하여 서드파티쿠키 전송이 제한되지만, `GET`은 안전한 요청으로 간주되어 `Lax`로 설정된 쿠키를 전송된다.

### 브라우저의 Samesite 

-  Chrome, Firefox, Safari, Edge 등 대부분의 최신 브라우저에서는 `Samesite` 의 기본값이 `Lax` 이다. 
- `Samesite`의 값을 `none`으로 설정하기 위해서는, `Secure` 속성이 반드시 명시되어 있어야 한다.
