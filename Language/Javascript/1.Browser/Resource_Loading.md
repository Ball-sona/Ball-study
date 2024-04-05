# Resource Loading

## onload

스크립트 로드 성공하고 실행 완료 후.

```js
const script = document.createElement('script'); // <script>
script.src = 'script-example.js';
document.head.append(script);

script.onload = function () {
  // 불러온 srcript 내 변수 사용 가능
};
```

## onerror

스크립트 로딩 중 에러 발생한 경우

```js
script.onerror = function () {
  // HTTP error code 알 수 없음!
};
```

## Cross Origin Policy

- 특정 사이트의 스크립트가 다른 도메인을 가진 사이트의 컨텐츠를 접근할 수 없다!
  - 여기서 서브 도메인이나 다른 포트로 구성된 origin도 다른 origin으로 간주하여 접근 불가능함.
- 이는 '다른 도메인의 리소스를 불러올 때도 적용'되는데, 만약 외부 스크립트에서 에러가 발생한 경우 에러의 원인을 정확하게 알 수 없다.

### 외부 도메인의 리소스에 접근하고 싶다면?

허용할 전송 데이터에 따라 Cross Origin을 허용하는 방법은 2가지로 나뉜다.

1. `<script>` 속성에 `crossorigin="anonymous"` 추가하고, 서버에서는 헤더에 `Access-Control-Allow-Origin` 를 `*` or 내 origin으로 설정 시 -> 접근 허용 + 단, 브라우저는 인증 정보나 쿠키를 서버에 보내지 않을 것
2. `<script>` 속성에 `crossorigin="use-credentials"` 추가하고, 서버에서는 헤더에 `Access-Control-Allow-Origin`를 내 origin으로 설정하고 `Access-Control-Allow-Credentials` 를 `true` 로 설정 -> 접근 허용 + 인증 정보나 쿠키도 서버에 보낼 수 있음
