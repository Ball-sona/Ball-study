# React StrictMode

---

```js
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

https://ko.reactjs.org/docs/strict-mode.html#gatsby-focus-wrapper

### +++

## JS Strict Mode

- "use strict" 함수 시작부분에 선언
- 전역변수 만드는 것 불가능
- 매개변수 이름 중복 불가능
- ...
- <b>보안 강화</b>
  - this의 값이 null/undefined인경우 전역 객체로 변환하지 않는다.
  - React 영향받는부분.
-
