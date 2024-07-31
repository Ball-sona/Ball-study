# Axios Interceptors

- Axios interceptors를 활용해서 API 요청을 보내거나 응답이 오기 직전에 특정 작업을 수행할 수 있다.
- 보통 헤더를 추가하거나, 에러를 처리하는 등 요청이나 응답을 수정 및 컨트롤한다.

## Intercepting Request

- 서버에 요청을 보내기 직전에 특정 작업을 수행
- 아래 예시에서는 API 요청 직전에 현재 시각을 메타 데이터에 추가한다.

```js
const API: AxiosInstance = axios.create({
  // ...
});

API.interceptors.request.use(req => {
	req.meta = req.meta || {};
	req.meta.requestStartedAt = new Date().getTime();
	return req;
})
```

## Intercepting Response

- 서버에서 요청을 받은 직후 에러 로깅, 데이터 파싱, 재요청 등 작업 수행
- `use` 함수의 첫번째 인자에 전달된 함수는 Promise가 `fulfilled` 상태가 될 경우, 즉 요청이 성공할 경우 실행되고 두번째 인자로 전달된 함수는 요청이 실패할 경우 실행된다.

```ts
export interface AxiosInterceptorManager<V> {
  use(
    onFulfilled?: ((value: V) => V | Promise<V>) | null,
    onRejected?: ((error: any) => any) | null,
    options?: AxiosInterceptorOptions
  ): number;
}
```

- 아래 예시에서는 요청 직전에 담았던 메타 데이터를 활용하여 '요청이 얼마나 걸렸는지 계산'한다.

```js
axios.interceptors.response.use(
  (res) => {
    // 2XX response codes
    res.durationInMs = new Date().getTime() - res.config.meta.requestStartedAt;
    return res;
  },
  (res) => {
    // non 2XX response codes (400 or 501)
    res.durationInMs = new Date().getTime() - res.config.meta.requestStartedAt;
    throw res;
  }
);
```

## 인터셉터 제거

```ts
const reqInterceptor = axios.interceptors.request.use(function () {
  /*...*/
});
const resInterceptor = axios.interceptors.response.use(function () {
  /*...*/
});
axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);

axios.interceptors.response.clear(); // 모든 응답 인터셉터 제거
```

## Options

```ts
export interface AxiosInterceptorOptions {
  synchronous?: boolean;
  runWhen?: (config: InternalAxiosRequestConfig) => boolean;
}
```

### synchronous

- 여러 인터셉터를 사용하는 경우, 기본적으로 '동기적으로' 실행 -> 인터셉터 작업 오래 걸릴 경우 요청에 딜레이 발생
- 비동기 실행 원할 경우 `{synchronous:true}` 설정

### runWhen

- Runtime check을 기반으로 인터셉터 동작 유무를 결정할 경우

```ts
axios.interceptors.request.use(
  function (config) {
    config.headers.test = 'special get headers';
    return config;
  },
  null,
  { runWhen: (config) => config.method == 'get' }
);
```
