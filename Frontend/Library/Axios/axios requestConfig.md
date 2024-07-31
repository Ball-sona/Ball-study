# Axios Request Config

### url

- API 요청할 서버 URL

### method

- 요청 메서드
- `get` | '`GET`' 둘 다 가능

### baseURL

- `url` 값이 상대 URL일 경우, 절대 URL을 `baseURL` 에 설정
- ex. `baseURL`이 'example.com' 이고 `url`이 '/user/1'

### transformRequest

- 서버에 API 요청 보내기 직전, 데이터 변경하는 함수 (혹은 함수들 담은 배열)
- `PUT`, `POST`, `PATCH` , `DELETE` 메서드에만 가능

```js
  transformRequest: [function (data, headers) {
    // data 수정..
    return data;
  }],
```

### transformResponse

- 응답 데이터가 `then/catch` 에 전달되기 직전, 데이터 변경하는 함수 (혹은 함수들 담은 배열)

### headers

- 사용자 지정 헤더

### params

- URL 매개 변수
- 일반 객체 혹은 `URLSearchParams` 객체

### paramsSerializer

- params 객체를 '직렬화'하는 옵션 함수
- 인코딩 옵션도 지정 가능

```ts
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'repeat'}) // {a:['b','c']} -> 'a=b&a=c'
  },
```

### data

- `PUT`, `POST`, `PATCH` , `DELETE` 메서드 사용할 경우 전송할 데이터
- (transformRequest 설정되지 않은 경우) 문자열, 일반 객체, `ArrayBuffer` , `ArrayBufferView` , `URLSearchParams` 가능
  - 브라우저는 `FormData` , `File` , `Blob` 도 가능
  - Node.js는 `Stream` , `Buffer` 도 가능

### timeout

- 요청이 시간초과되기 전의 시간 밀리 초 설정
- 요청이 `timeout` 보다 오래 걸리면 중단된다. -> 기본값 0

### withCredentials

CORS 요청, 즉 '다른 도메인'에 요청 보낼 때 쿠키나 인증 헤더 정보 등 Credentials 담을 지 유무 (기본값 false)

> 기본적으로 CORS 요청에 쿠키를 담는 것은 허용되지 않음 -> 클라이언트/서버 모두 처리 필요
>
> - 클라이언트: API 요청의 `withCredentials` 옵션을 `true`로 설정
> - 서버: 응답 헤더의 `Access-Control-Allow-Credentials` 를 `true`로 설정
>   - `Access-Control-Allow-Origin` 값으로 `*` 안됨.
>   - Prelight 필요한 요청인 경우 `Access-Control-Allow-Origin`, `Access-Control-Allow-Headers` 값으로 `*` 안됨

### adapter

- 테스트를 위한 커스텀 핸들링 요청?

```ts
// https://github.com/axios/axios/tree/v1.x/lib/adapters
adapter: function myAdapter(config) {
  // request transformers, inteceptors 실행 이후
  // config 내 응답 정보 사용 가능

  return new Promise(function (resolve, reject) {
    const response = {
      data: responseData,
      status: request.status,
      statusText: request.statusText,
      headers: responseHeaders,
      config: config,
      request: request,
    };
    settle(resolve, reject, response);

    // response transformers, inteceptors 실행
  });
}
```

### auth

- HTTP Basic Authentication 사용되며, Credentials 제공
- `auth` 사용 시 `headers`로 설정한 `Authorization`를 덮어쓴다

```tsx
auth: {
  username: 'ball',
  password: '123'
},
```

### responseType

- 서버에서 응답할 데이터 타입 -> 기본값 `json`
- `"arraybuffer" | "blob" | "document" | "json" | "text" | "stream"`

### responseEncoding

- Node.js 전용
- 응답 디코딩에 사용할 '인코딩' 방식. 단, 응답 타입이 `stream` 인 경우 제외

### xsrfCookieName, xsrfHeaderName

- csrf 토큰에 대한 값으로 사용할 쿠키 이름, 이를 운반하는 HTTP 헤더 이름

```ts
xsrfCookieName: 'XSRF-TOKEN', // 기본 값
xsrfHeaderName: 'X-XSRF-TOKEN', // 기본 값 -> ? 자동으로 xsrf 토큰이 붙는다는 뜻임?
```

### onUploadProgress, onDownloadProgress

- 업로드 및 다운로드 `Progress` 이벤트 처리

### maxContentLength

- http 응답 콘텐츠의 최대 크기를 바이트 단위
- `maxBodyLength` 는 Node.js 전용

### validateStatus

- 지정된 HTTP 응답 상태에 따라 Promise 이행할지 혹은 거부할지 정의 -> 함수가 `true` 반환 시 이행
- 기본값은 `return status >= 200 && status < 300;`

```ts
validateStatus: function (status) {
  return status < 500;  // HTTP 상태 코드 500 미만인 경우에만 응답 처리
},
```

### proxy

- 프록시 서버의 호스트이름, 포트, 프로토콜을 정의

```ts
proxy: {
  host: '127.0.0.1',
  port: 9000,
  auth: { // Proxy-Authorization
    username: 'ball',
    password: '123'
  }
},
```

### cancelToken

- 요청을 취소하는데 사용할 수 있는 '취소 토큰'

```ts
cancelToken: new CancelToken(function (cancel) {
  // ...
});
```
