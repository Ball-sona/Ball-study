# useRef

useRef는 useState와 동일하게 **컴포넌트 내부에서 렌더링이 일어나도 변경 가능한 상태값을 저장**하는 훅이다.

```js
const ref = useRef();
```

- useRef는 반환값인 객체 내부에 있는 current로 값을 접근 및 변경한다.
- useRef 값이 변경되더라도 <u>렌더링 발생하지 않는다</u>.

## 외부 변수와 무엇이 다른가?

컴포넌트 렌더링에 영향을 미치지 않은 고정된 값을 사용하고 싶다면 useRef가 아니라 그냥 함수 외부에서 일반 변수를 선언하여 컴포넌트 내부에서 사용하면 되는게 아닐까 생각할 수 있다.

- 외부 변수를 사용하면, 만약 컴포넌트가 렌더링되지 않은 경우에도 해당 변수는 메모리 상에 올라가기 때문에 불필요한 값이 메모리를 차지하게 된다.
- 컴포넌트가 여러 개 생성된 경우에는 모든 컴포넌트 인스턴스가 같은 값을 가리키게 된다. 이를 의도한 거면 문제 없지만, 보통 컴포넌트 인스턴스마다 하나의 값을 필요로 하는 것이 일반적이다.

따라서 렌더링에 영향을 주지 않으면서 컴포넌트 인스턴스마다 개별적인 값을 저장하고 싶은 경우 `useRef` 를 사용할 수 있다.

## DOM 접근

`useRef` 가 일반적으로 사용되는 예시가 'DOM 접근'이다.

```jsx
function RefComponent() {
  const inputRef = useRef();

  useEffect(() => {
    console.log(inputRef.current); // <input type="text"></input>
  }, [inputRef]);

  return <input ref={inputRef} type="text" />;
}
```

## 동작 방식

> PReact를 기반으로 내부 구현을 유사하게 정의해보자.

```jsx
export function useRef(initialValue) {
  return useMemo(() => {
    current: initialValue;
  }, []);
}
```

값이 변경되어도 렌더링에 영향을 주면 안되므로 `useMemo` 의 의존성 배열을 빈 배열로 설정했고, `{current:value}` 형태로 값에 접근하는 것을 볼 수 있다.
