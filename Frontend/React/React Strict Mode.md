# React Strict Mode

CRA를 사용하여 리액트 앱을 초기화하면 StrictMode 가 자동으로 사용된다. 

```jsx
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

`StrictMode` 는 애플리케이션 내의 잠재적인 문제를 알아내기 위한 도구다.`Fragment`와 같이 UI를 렌더링하지 않으며, 자손들에 대한 부가적인 검사와 경고를 활성화한다.

개발 모드에서만 활성화가 되고, 배포시 자동으로 비활성화된다. 

### StrictMode 기능 

- 안전하지 않은 생명주기를 사용하는 컴포넌트 발견
- 래거시 문자열 ref 사용에 대한 경고
- 권장되지 않는 findDOMNode 사용에 대한 경고
- 예상치 못한 부작용 검사
- 레거시 Context API 검사
- Ensuring Reusable State

https://ko.reactjs.org/docs/strict-mode.html





## JS Strict Mode

- "use strict" 함수 시작부분에 선언
- 전역변수 만드는 것 불가능
- 매개변수 이름 중복 불가능
- ...
- <b>보안 강화</b>
  - this의 값이 null/undefined인경우 전역 객체로 변환하지 않는다.
  - React 영향받는부분.
  -



