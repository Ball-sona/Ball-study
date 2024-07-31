# useReducer

useReducer도 useState와 마찬가지로 컴포넌트 내부에서 사용하는 상태 관리를 할 수 있는 훅이지만, 좀 더 심화 버전이라 할 수 있다.

```js
const [state, dispatch] = useReducer(reducer, initialArg, init?);
```

- 반환값
  - `state`: 현재 가지고 있는 상태 값
  - `dispatcher`: state를 업데이트하는 함수. `setState` 와 다른 점은, setState는 단순히 값을 넘겨주지만 dispatcher는 'action'을 넘겨주어야 한다.
- 인수
  - `reducer`: 기본 action을 정의하는 함수
  - `initialState`: useReducer의 초깃값
  - `init`: 게으른 초기화를 하고 싶을 때 사용되는 함수로, 초기값을 생성하는 함수

## 사용법

```tsx
import { useReducer } from 'react';

type State = { count: number };
type Action = { type: 'up' | 'down' | 'reset'; payload?: State };

// 무거운 연산이 포함딘 게으른 초기화 함수
function init(count: State): State {
  return count;
}
// 초기값
const initialState: State = { count: 0 };
// state 와 action에 따라 어떻게 state를 업데이트할지 정의하는 함수
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'up':
      return { count: state.count + 1 };
    case 'down':
      return { count: state.count > 1 ? state.count - 1 : 0 };
    case 'reset':
      return init(action.payload || { count: 0 });
    default:
      throw new Error(`Unexpected action type: ${action.type}`);
  }
}

export default function App() {
  const [state, dispatcher] = useReducer(reducer, initialState, init);
  return (
    <>
      <div>{state.count}</div>
      <button onClick={() => dispatcher({ type: 'up' })}>+</button>
      <button onClick={() => dispatcher({ type: 'down' })}>-</button>
      <button onClick={() => dispatcher({ type: 'reset', payload: { count: 1 } })}>reset</button>
    </>
  );
}
```

즉, `useReducer` 는 복잡한 형태의 state를 사전에 정의된 dispatcher로만 수정할 수 있게 만들어 줌으로써, state 값에 대한 접근은 컴포넌트에서만 가능하게 하고 이를 업데이트하는 방법은 미리 컴포넌트 밖에서 정의해두어 이를 dispatcher를 통해 사용할 수 있도록 한다.

## useReducer vs useState

- 원시값이나 단순한 객체 값을 관리하는 것은 `useState`로 충분하지만, state 하나가 가져야 할 값이 복잡하거나 이를 수정하는 경우의 수가 많아진다면 `useReducer` 를 사용하는 것이 좋다.
- 또 여러개의 state를 관리하는 것보다, 성격이 비슷한 여러개의 state를 묶어 useReducer로 관리하는 편이 더 효율적일 수 있다.

### useReducer로 useState 구현하기

```jsx
function reducer(prevState, newState) {
  return typeof newState === 'function' ? newState(prevState) : newState;
}
function init(initialState) {
  return typeof initialState === 'function' ? initialState() : initialState;
}
function useState(initialState) {
  return useReducer(reducer, initialState, init);
}
```

### useState로 useReducer 구현하기

```jsx
function useReducer(reducer, initialState, init) {
  const [state, setState] = useState(init ? init(initialState) : initialState);
  const dispatch = useCallback((action) => setState((prev) => reducer(prev, action)), [reducer]);
  return useMemo(() => [state, dispatch], [state, dispatch]);
}
```
