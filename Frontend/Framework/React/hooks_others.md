# Other Hooks

- useImperativeHandle
- useLayoutEffect
- useDebugValue
- useId
- useSyncExternalStore
- useInsertionEffect

## useImperativeHandle

useImperativeHandle은 부모로부터 넘겨받은 ref, 즉 forwardRef를 원하는대로 수정할 수 있는 훅이다.

### forwardRef

- 만약 자식 컴포넌트에게 ref를 전달하기 위해 `<Child ref={parentRef} />` 같이 일반적인 props 처럼 전달해주면, ref는 key와 같이 props 예약어이기 때문에 경고문이 생기면서 `undefined` 가 반환된다.
- 따라서 `<Child parentRef={parentRef} />` 처럼 다른 이름의 props로 전달하면 정상적으로 ref를 전달할 수 있지만, `forwardRef`는 이러한 네이밍 자유가 주어진 props보다는 <u>확실하게 ref를 전달할 것임을 예측하고 일관성을 제공하기 위해 사용</u>된다.

```jsx
const ParentComponent = () => {
  const inputRef = useRef();
  // ...
  return <ChildComponent ref={inputRef} value={1} />;
};

const ChildComponent = forwardRef((props, ref) => {
  console.log(ref); // {current: HTMLInputElement}
  return <div>{props.value}</div>;
});
```

여기서 `useImperativeHandle`을 사용하면 자식 컴포넌트에서 부모로부터 받은 ref를 수정할 수 있다. 즉, 전달 받은 `{current: Value}` 객체에 추가적인 액션이나 값 등을 담은 프로퍼티를 추가할 수 있는 것이다.

```jsx
const ChildComponent = forwardRef((props, ref) => {
 	useImperativeHandle(ref, () => ({
    alert: () => alert(props.value); // 부모 컴포넌트에서 inputRef.current.alert() 호출 가능
  }))
  return <div>{props.value}</div>;
});
```

## useLayoutEffect

useLayoutEffect는 '모든 DOM의 변경' 이후에 콜백 함수를 '동기적으로' 실행하는 훅이다.

- 즉, `useEffect` 는 브라우저에 변경 사항이 반영된 이후 콜백 함수를 실행했다면, `useLayoutEffect` 는 DOM 업데이트 이후 브라우저에 변경 사항을 반영하기 전에 실행된다.
- 따라서 `useLayoutEffect` 는 항상 `useEffect` 보다 먼저 실행된다.
- `useLayoutEffect`의 함수가 동기적으로 수행된다는 건, 콜백 함수가 실행 종료될 때까지 기다렸다가 브라우저 화면을 그린다는 것을 의미한다. 즉, `useLayoutEffect`의 실행 동안 리액트 컴포넌트가 잠시 일시 중지하므로, 오래 걸리는 작업을 포함해서는 안된다.
- DOM 요소를 기반으로 스크롤 위치를 제어하는 등 작업

<img width="542" alt="스크린샷 2023-02-04 17 26 08" src="https://user-images.githubusercontent.com/67703882/216757250-a131701a-0be5-4a2c-bce4-369af63977f9.png" style="zoom:80%;" >

## useDebugValue

- 개발하는 과정에서 디버깅하고 싶은 정보가 있는 경우
- 컴포넌트 레벨에서는 실행할 수 없고, 오직 다른 훅 내부에서만 실행 가능하다.

```js
function useDate() {
	const date = new Date();
	useDebugValue(date, (date) => `data: ${date.toISOString()});
	return date;
}
```

## useId

useId는 컴포넌트별로 '고유한 값'을 생성하는 훅이다.

- 컴포넌트 내부에서 고유한 값을 가지기 위해 `Math.random()` 등을 사용하면, 해당 컴포넌트가 서버 사이드 렌더링될 경우 서버와 클라이언트가 각자 다른 값을 가지게 되어 하이드레이션 에러가 발생한다.
- 따라서 서버 사이드와 클라이언트의 불일치를 피하면서 컴포넌트 내부에 고유한 값을 가지고 싶다면 `useId` 훅을 사용하면 된다.

```jsx
const id = useId();
```

## useSyncExternalStore

- 리액트 18버전부터 '동시성 렌더링'을 지원하면서 하나의 state를 사용하는 컴포넌트들이 서로 다른 값을 가지고 렌더링하게 되는 'tearing' 현상이 발생할 수 있게 되었다.
- `useTransition` 이나 `useDeferredValue` 를 사용하는 경우에는 리액트가 내부적으로 이러한 문제를 처리하고 있지만, 외부 데이터 소스나 리액트 클로저 범위 밖에 있는 값들은 tearing 현상이 발생할 수 있다.
- 따라서 리액트 18버전에서 동작하는 상태 관리 라이브러리는 `useSyncExternalStore`를 통해 외부 상태 변경을 추적하고 있어야 한다.

## useInsertionEffect

- css-in-js 라이브러리를 위한 훅
- `useInsertionEffect` 는 DOM이 실제로 변경되기 전에 동기적으로 실행되어, 훅 내부에서 스타일을 삽입하는 코드를 집어넣음으로써 브라우저가 레이아웃을 계산하기 전에 실행될 수 있게끔 한다.
  - `useInsertionEffect` -> `useLayoutEffect` -> `useEffect`
