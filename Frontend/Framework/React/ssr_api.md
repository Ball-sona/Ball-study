# SSR API

리액트 애플리케이션을 서버에서 렌더링할 수 있는 API (react-dom/server)

## renderToString

- 컴포넌트를 HTML 문자열로 변환
- useEffect 등은 배제
- Data-reactroot -> hydrate 함수에서 루트를 식별하는 기준점

## renderToStaticMarkup

- renderToString와 동일하게 HTML 문자열로 변환
- 차이점은 리액트에서만 사용하는 추가적인 DOM 속성을 만들지 않음.
- HTML 크기를 약간 더 줄일 수 있다.
- 단, 브라우저 API 사용 절대 불가능. 즉, 아무런 브라우저 액션이 없는 정적인 내용만 담긴 페이지인 경우.

## renderToNodeStream

> react 18부터 지원이 중단되었다.

- renderToString와 결과물 동일하나 2가지 차이점 존재
  - 브라우저에서 사용 완전 불가능. 즉 Node.js 환경에 의존
  - 결과물이 HTML 문자열이 아니라 Node.js의 ReadableStream
- 브라우저에 제공할 HTML 파일을 작은 단위로 쪼개서 연속적으로 작성.

## renderToStaticNodeStream

- renderToNodeStream와 동일한 기능. 단, 리액트 속성 제공 안됨.
- 순수 HTML 파일 보낼때만

## renderToPipeableStream

> 18버전에서 추가됨

## renderToReadbleStream

## hydrate

- 정적인 HTML에 이벤트 핸들러를 붙여 완전한 웹페이지 결과물을 만드는 것

### hyrdate vs render

render와 hydrate 모두 인수로 컴포넌트와 HTML 요소 받는다.

```jsx
// render
ReactDOM.render(<App />, document.getElementById('root'));

// hydrate
ReactDOM.hyrdate(<App />, document.getElementById(containerId));
```

- rendrer는 HTML 요소에 해당 컴포넌트 렌더링해서 이벤트 핸들러 붙이는 작업까지 한번에 수행
- hydrate는 이미 렌더링된 HTML이 있다고 가정하고, 이 렌더링된 HTML을 기준으로 이벤트를 붙이는 작업만 실행
- 만약. hydrate에 넘겨진 요소가 renderToStaticMarkup 등으로 만들어진 순수한 HTML 이라면. App 컴포넌트에 있는 요소가 있기를 기대했지만 없다는 경고 문구가 출력.
- 즉, hydrate는 서버에서 전달받은 요소가 App을 이미 렌더링한 결과물이라는 가정하에 진행.

### suppressHydrationWarning

서버와 클라이언트 불일치 허용
