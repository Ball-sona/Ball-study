# useMemo, useCallback

메모이제이션 관련 훅

## useMemo

비용이 큰 연산에 대한 결과를 저장해두고, 이 저장된 값을 반환하는 훅이다.

```js
const memoizedValue = useMemo(() => {
  return expensiveComputation(a, b);
}, [a, b]);
```

- 첫번째 인수에는 어떤 값을 반환하는 생성 함수 전달
- 두번째 인수에는 해당 함수가 의존하는 값의 배열 전달

`useMemo`는 컴포넌트 렌더링 발생 시 의존성 배열의 값들이 변경되지 않았다면 (첫번째 인자로 전달 받은) 함수를 재실행하여 값을 다시 생성하지 않고, 이전에 기억해 둔 해당 값을 반환한다. 만약 값이 하나라도 변경되었다면 함수를 실행한 후에 그 값을 반환하고 다시 기억해둔다.

```jsx
const MemoizedComponent = useMemo(() => <ExpensiveComponent value={value} />, [value]);
```

위처럼 단순히 값 뿐만 아니라 컴포넌트도 메모이제이션 할 수 있다. (물론 컴포넌트를 메모이제이션할거면 `React.memo()`를 쓰는 게 더 나을 수 있다.)

## useCallback

함수 자체를 기억하는 훅이다. `useMemo` 가 콜백 함수가 반환한 '값'을 기억한다면, `useCallback` 는 콜백 함수 자체를 기억한다.

```jsx
const ChildComponent = React.memo(({ value, onChange }) => (
  <>
    <div>{value ? 'on' : 'off'} </div>
    <button onClick={onChange}>toggle</button>
  </>
));

const ParentComponent = () => {
  const [status1, setStatus1] = useState(false);
  const [status2, setStatus2] = useState(false);
  const toggleClick1 = () => setStatus1((prev) => !prev);
  const toggleClick2 = () => setStatus2((prev) => !prev);

  return (
    <>
      <ChildComponent value={status1} onChange={toggleClick1} />
      <ChildComponent value={status2} onChange={toggleClick2} />
    </>
  );
};
```

- 위 예시에서 자식 컴포넌트에서 `memo`를 사용하여 props 값 변경되지 않는다면 리렌더링되지 않도록 최적화했지만, 실행해보면 다른 컴포넌트의 버튼을 클릭할 때도 모든 자식 컴포넌트가 리렌더링되고 있다.
- 이는 부모 컴포넌트가 리렌더링되면서 `toggleClick1` , `toggleClick2` 함수가 새롭게 만들어지기 때문에 `onChange` 으로 전달하는 값이 변경되면서 모두 리렌더링되는 것이다.
- 이렇게 '함수 자체'를 메모이제이션해야 하는 경우 부모 컴포넌트 내 함수들을 useCallback` 으로 감싸주면 된다.

```js
const toggleClick1 = useCallback(() => setStatus1((prev) => !prev), [status1]);
const toggleClick2 = useCallback(() => setStatus2((prev) => !prev), [status2]);
```
