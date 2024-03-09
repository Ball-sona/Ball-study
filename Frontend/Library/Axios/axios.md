# Axios 

- Promise 기반 HTTP 클라이언트 라이브러리
- node.js에서는 `http` 모듈을, 브라우저에서는 `XMLHttpRequests` 사용

## API 요청 보내는 법

### 1. axios() 사용

```ts
// axios(config: AxiosRequestConfig<any>)
axios({
  method: 'post',
  url: '/user/1',
  data: {
    firstName: 'sona',
    lastName: 'ball'
  }
});
```

- 모든 요청에 적용될 config 기본값을 설정해줄 수 있음

```ts 
axios.defaults.baseURL = ""
```

### 2. Instance 생성

```ts
const Axios = axios.create({
	baseURL: 'https://example.com',
	timeout:1000,
	//...
})

Axios.put('/user/1', {firstName: 'sona',lastName: 'ball'});
```

- 여러 요청들에 중복 설정되는 config를 한번만 정의 가능
- 인스턴스에 interceptor 추가하면 모든 요청 및 응답에 대해 공통적으로 특정 작업 수행 가능 

