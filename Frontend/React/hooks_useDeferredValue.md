# useDeferredValue

useDeferredValue는 'UI 일부 업데이트'를 지연시키는 훅이다.

```jsx
const deferredValue = useDeferredValue(value);
```

- 인자로 '지연'시키고 싶은 값을 넘긴다. 이는 어떤 타입이든 가질 수 있다.
- 초기 렌더링 중에는 `value` 와 동일한 값을 반환한다. 이후 업데이트가 발생하면 리액트는 먼저 이전 값으로 리렌더링을 시도하다가, 이후 백그라운드에서 새 값으로 리렌더링을 시도한다.

## Suspense의 깜빡임 현상 해결하기

```tsx
export const SearchBar = () => {
  const [query, setQuery] = useState("");
 
  return (
  	<input value={query} onChange={e => setQuery(e.target.value)} />
    <Suspense fallback={<Loading />}>
    	<SearchResults query={query} />
    </Suspense>
  )
}
```

위 코드에서 `query` 값이 변경될 때마다 `SearchResults` 컴포넌트 내부에서는 이를 가지고 검색 결과를 요청한다. 그럼 이렇게 요청을 보낼때마다 결과값을 받을 때까지 `Loading` 컴포넌트가 보여지게 되는데, 데이터 요청이 잦지 않고 오래 걸리는 경우라면 이러한 Suspense가 좋은 사용자 경험을 줄 수 있지만, 사용자가 입력값을 변경할 때마다 fallback 컴포넌트를 보여줘야하는 상황이라면 오히려 UX를 악화시킬 것이다.

```jsx
export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  
  return (
  	...
    <Suspense fallback={<Loading />}>
    	<SearchResults query={deferredQuery} />
    </Suspense>
  )
}
```

이러한 경우라면, 새로운 `query` 값과 함께 데이터를 요청할때마다 fallback 컴포넌트를 띄우는 것보다 '이전 결과'을 유지해서 보여주는 것이 더 나을 것이다. 이렇게 `useDeferredValue`를 통해 원하는 UI 부분의 업데이트를 지연시켜 자연스러운 사용자 경험을 제공할 수 있다.

## vs useTransition

- `useTransition` 는 상태를 업데이트하는 set함수를 인자로 받는 반면, `useDeferredValue`는 상태 값 자체를 받아 사용한다.
- 즉, 낮은 우선순위로 처리해야 할 작업에 대해 직접적으로 상태를 업데이트할 수 있는 코드에 접근할 수 있다면 `useTransition` 을 사용하고, 만약 컴포넌트의 `props`  등 상태 업데이트에 관여할 수 없다면 `useDeferredValue`를 사용하면 된다.

## vs 디바운싱

- '디바운싱'은 성능 최적화를 위해 특정 시간 동안 발생하는 이벤트를 하나로 인색해 한 번만 실행하게 해주는 작업을 의미한다.
- 디바운싱은 '고정된 지연 시간'을 필요로 하지만, `useDeferredValue`는 고정된 지연 시간 없이 **첫번째 렌더링이 완료된 이후**에 `useDeferredValue`로 지연된 렌더링을 수행한다.
