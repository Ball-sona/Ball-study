# HTTP 모듈로 웹 서버 만들기

http 모듈을 통해 웹 브라우저의 요청을 처리할 수 있다.

## http 모듈 사용하기

```js
const server = http.createServer((req, res) => {
  res.write('<h1>Hello Node</h1>'); // 클라이언트로 보낼 데이터
  res.end('<p>Hello server<p>'); // 응답을 종료하는 메서드
})

server.listen(8080, () => { // 8080: 포트번호
  console.log('8080 port waiting...');
});
server.on('listening',()=>{...});
server.on('error',()=>{...});
```

- `createServer` 함수 내에 요청에 대한 콜백 함수를 넣을 수 있다.

  - 콜백 함수의 `req` 인자는 요청에 관한 정보, `res` 인자는 응답에 관한 정보를 담는다.

- `listen(port, callbackFn)` : 클라이언트에게 공개할 포트 번호와 포트 연결 완료 후 실행될 콜백 함수

> HTTP 상태 코드
>
> - 2XX : 성공을 알리는 상태 코드. 200은 성공, 201은 작성됨
> - 3XX : 리다이렉션을 알리는 상태 코드. 301은 영구 이동 302는 임시 이동
> - 4XX : 요청 오류를 나타내는 상태 코드. 요청 자체에 오류가 있는 경우다. 401은 권한 없음 403은 금지됨 404는 찾을 수 없음
> - 5XX : 서버 오류를 나타내는 상태 코드. 요청은 제대로 왔지만 서버에 오류가 생긴 경우다. 500은 내부 서버 오류 502은 불량 게이트웨이 503은 서비스를 사용할 수 없음.

## 쿠키와 세션

우리가 로그인 기능을 구현하기 위해서는 쿠키와 세션에 대한 개념을 알고 있어야 한다.

### 쿠키

쿠키란 단순한 'key-value'의 한 쌍인데, 서버는 요청을 보낸 클라이언트를 기억하기 위해 요청에 대한 응답을 할 때 쿠키를 같이 보내준다. 서버로부터 쿠키를 받은 웹 브라우저는 이를 저장해두었다가 동일한 서버에 요청할 때마다 쿠키를 동봉해서 보내준다. 그럼 서버는 요청에 들어있는 쿠키를 이용해 클라이언트가 누군지 파악하는 방식이다.

```js
const server = http.createServer((req, res) => {
  const cookies = parseCookies(req.headers.cookie); // cookie를 객체 형태로 파싱
  res.writeHead(200, { 'Set-cookie': 'mycookie=test' }); // 응답 헤더에 쿠키 기록
  res.end('Hello Cookie');
});
```

### 쿠키 관련 옵션들

- 쿠키명=쿠키값 : 기본적인 쿠키값
- Expires=날짜 : 만료기한. 이 기한이 지나면 쿠키가 제거된다. 기본값은 클라이언트가 종료될 때까지.
- Max-age=초 : Expires와 동일하게 만료 기한이지만, 날짜 대신 초를 입력할 수 있다. (Expires보다 우선)
- Domain=도메인명 : 쿠키가 전송될 도메인을 특정할 수 있다. 기본 값은 현재 도메인.
- Path=URL : 쿠키가 전송될 URL. 기본값은 `/`
- Secure : HTTPS 인 경우에만 쿠키를 전송한다.
- HttpOnly : 설정시 자바스크립트에서 쿠키에 접근할 수 없다. (쿠키 조작 방지)

### 세션

쿠키로 로그인하는 방식은 간단하지만, 사용자 정보가 노출되고 조작될 위험이 높다는 점에서 안전한 방법이 아니다.

이와 달리 세션은 서버에 사용자 정보를 저장하고 클라이언트와는 세션 아이디로만 소통한다.

```js
const session = {};
...
const randomInt = +new Date();
session[randomInt] = {name, expires};
res.writeHead(302, {
  Location: '/',
  'Set-Cookie': `session=${randomInt};Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
});
```

이런식으로 `session` 이라는 변수에 사용자 이름과 유효기간을 저장한 후, 클라이언트에게는 session id만 쿠키에 넣어서 전달한다. 물론 서버에서 세션을 변수로 관리하지 않고 보통 데이터베이스에 넣어 관리한다.

## REST API 와 라우팅

### REST API

REST API는 REpresentational State Transfer의 약어로, 네트워크 구조의 한 형식이다. 서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법을 가리킨다.

- 주소는 의미를 명확히 전달하기 위해 명사로 구성된다. (ex. `/user` = 사용자 정보 요청)

- HTTP 요청 메서드를 사용한다.

  | HTTP 메서드 | 설명                                                                                           |
  | ----------- | ---------------------------------------------------------------------------------------------- |
  | GET         | 서버 자원을 가져오고자 할 때 사용. 서버에 보낼 데이터가 있다면 body가 아닌 쿼리에 넣어 보낸다. |
  | POST        | 서버에 자원을 새로 등록하고자 할 때 사용. 요청의 body에 새로 등록할 데이터를 넣어 보낸다.      |
  | PUT         | 서버 자원을 요청에 들어있는 자원으로 치환하고자 할 때 사용. body에 치환할 데이터 넣어 보낸다.  |
  | PATCH       | 서버 자원의 일부만 수정하고자 할 때 사용. body에 일부 수정할 데이터를 넣어 보낸다.             |
  | DELETE      | 서버 자원을 삭제하고자 할 때 사용.                                                             |

이러한 REST API를 따르는서버를 RESTful하다고 표현한다.

### REST API를 사용하는 이유

- 주소와 메서드만 보고 요청의 내용을 명확하게 알아볼 수가 있다.
- `GET` 메서드 같은 경우 브라우저에서 캐싱할 수도 있어서 `GET` 요청이 오면 서버에서 가져오는 것이 아니라 캐시에서 가져올 수 있다. 이런 캐싱 기능으로 성능을 향상시킬 수도 있다.
- HTTP 프로토콜을 사용하면 클라이언트(IOS, 안드로이드, 웹)가 누구든 상관없이 서버와 소통할 수 있다.

## https와 http2 모듈

### https

https 모듈은 웹 서버에 SSL 암호화를 추가해준다. 즉 `GET` 이나 `POST` 요청을 통해 주고 받는 데이터를 암호화해서 중간에 다른 사람이 요청을 가로채도 내용을 확인할 수 없도록 한다.

https를 사용하려면 CA(인증 기관)에서 인증서를 가져와야한다. 인증서는 인증 기관에서 구입해야 하고, [Let's Encrypt](https://letsencrypt.org/) 같은 기관에서 무료로 발급받을 수도 있다.

```js
https.createServer(
  {
    cert: fs.readFileSync('도메인 인증서 경로'),
    key: fs.readFileSync('도메인 비밀키 경로'),
    ca: [fs.readFileSync('상위 인증서 경로'), fs.readFileSync('도메인 비밀키 경로')],
  },
  (req, res) => {
    res.write('hello');
    res.end();
  }
);
```

https의 `createServer` 는 첫번째 인자로 인증서에 관련된 옵션 객체를 받는다. 인증서를 구입하면 발급해주는 파일들을 알맞게 넣어주면 된다.

### http2

http2 모듈은 SSL 암호화와 더불어 최신 HTTP 프로토콜인 http/2를 사용할 수 있게 해준다. http/2는 요청 및 응답 방식이 기존의 http/1.1보다 개선되어 더 효율적으로 요청을 보낼 수 있고, 웹 속도도 개선할 수 있다.

![image](https://user-images.githubusercontent.com/67703882/220863777-8e953d47-4820-44e7-a9f1-4f2f779e9558.png)

## Cluster 모듈

cluster 모듈은 싱글 스레드인 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈이다.
