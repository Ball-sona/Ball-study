# React Hooks

[리액트가 제공하는 Hook API](https://ko.reactjs.org/docs/hooks-reference.html#useeffect) 에 대해 알아보자.

## useState

```js
const [state, setState] = useState(initialState);
```

최초로 렌더링하는 동안 state은 `initialState` 을 값으로 갖는다. setState 함수는 새로운 state 값을 받아 컴포넌트 리렌더링을 큐에 등록한다. 

setState에 이전 state를 사용해서 새로운 state를 계산하는 함수를 전달할 수 있다. 만약 업데이트 함수가 현재 상태와 동일한 값을 반환한다면 바로 뒤에 일어날 리렌더링은 건너뛰게 된다. 

## useEffect

```js
useEffect(didUpdate);
```

명령형 또는 어떠한 effect를 발생하는 함수를 인자로 받는다. useEffect 에 전달된 함수는 **화면에 렌더링이 완료된 이후**에 수행되게 된다. 

> **Side Effect?**
>
> 리액트 컴포넌트가 화면에 렌더링된 이후에 비동기로 처리되어야하는 부수적인 효과들을 말한다. 예를 들어 외부 API를 호출하여 어떤 데이터를 가져와야하는 경우, 화면에 렌더링할 수 있는 부분들은 먼저 렌더링을 하고 데이터는 비동기로 가져와야 사용자 경험 측면에서 유리하다. 
>
> 외부 API 호출 외에도 setTimeout 같은 타이머 함수 작동, 사용자가 직접 DOM 요소를 수정하는 작업, 함수형 컴포넌트가 매개변수로 받은 값들을 수정하는 작업 등을 리액트 에서의 side effect 라고 할 수 있다. 
>
> 사이드 이펙트는 정리(clean-up)이 필요한 것과 그렇지 않은 것(api 요청, DOM 수동 조작 등) 으로 나눌 수 있다. 

#### Cleaning up an effect

- 어떤 이벤트들은 '구독' 이나 '타이머 아이디' 처럼 UI에서 컴포넌트가 제거되기 전에 정리(clean-up) 해야하는 리소스를 가지고 있을 수 있다.  `useEffect` 의 반환값에 이러한 리소스들을 제거하는 함수를 전달해주면 컴포넌트가 제거되기 전에 수행된다. 
- 더불어 컴포넌트가 여러번 렌더링 된다면 다음 이펙트가 수행되기 전에 이전 이펙트는 정리된다. 

#### Timing of Effects

- `componentDidMount` 와 `componentDidUpdate` 와는 다르게 `useEffect` 에 전달된 함수는 지연 이벤트(deferred event) 동안 **레이아웃 배치와 그리기를 완료한 이후에 발생**한다. 특정 작업이 끝날 때까지 대기하기 위해 브라우저에서 화면 업데이트를 차단하는 것은 좋지 않기 때문이다. 이는 대부분의 작업에 해당한다. 
- 하지만 모든 이벤트가 비동기적으로 동작(=지연)될 수는 없다. 예를 들어 사용자에게 노출되는 DOM 변경은 다음 화면이 다 그려지기 전에 동기화 되어야 한다. **(수동적 이벤트 리스너와 능동적 이벤트 리스너의 차이와 유사하다??)** 이런 종류의 effect를 위해 리액트는 `useLayoutEffect` 라는 추가적인 훅을 제공한다. 
- `useEffect` 에 전달된 함수는 click 같은 사용자 입력에 의해 호출되는 함수이거나 `flushSync` 에 감싸진 업데이트에 의한 함수라면, 레이아웃 배치와 그리기 전임에도 동기적으로 호출될 수 있다. 이는 이벤트 시스템에 감지된 effect는 허용하게 되는 것이다.

#### Conditionally firing an effect

- `useEffect` 의 두번째 인자에 특정 배열을 넣어주게 되면, effect는 해당 배열에 종속된다. 즉 해당 배열 안에 있는 요소가 변경될 때만 effect가 갱신(재생성)된다. 
- effect를 한번만 실행하고 싶다면 두번째 인자에 **빈 배열을 전달**하면 된다. 이는 effect가 어떠한 값에도 의존하지 않으므로 다시 실행할 필요가 전혀 없다는 것을 알려주게 된다. 이렇게 되면 effect 안에 있는 props와 state는 항상 초깃값을 가지게 된다. 

#### LifeCycle and useEffect

- `useEffect(fn)` : 렌더링이 될때마다 fn이 실행된다. 
- `useEffect(fn,[])` : 컴포넌트가 최초 렌더링이 되었을때만 fn이 실행된다.
- `useEffect(fn, [s1,s2])` : 컴포넌트가 최초 렌더링 되었을때와 s1 혹은 s2가 변경되었을 때 fn가 실행된다.
- `useEffect(()=>{return( ()=>fn() )})` : 컴포넌트가 unmount 될때 fn이 실행된다. 

## useContext

```
const value = useContext(SomeContext)
```

context에 등록한 값이 변경되면 useContext를 사용하고 있는 모든 컴포넌트들이 리렌더링된다. 

## useReducer



## useCallback

```js
const memoizedCallback = useCallback(fn,[dep]);
```

메모이제이션된 콜백을 반환한다. 

> memoization : 프로그램이 동일한 계산을 반복할 때, 이전에 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술이다.

컴포넌트 함수 안에 함수가 선언이 되어 있다면 이 함수는 해당 컴포넌트가 렌더링될 때 마다 새로운 함수로 생성된다. 하지만 `useCallback`을 사용하면 해당 컴포넌트가 렌더링되더라도 그 함수가 의존하는 값들이 바뀌지 않는 한 기존 함수를 계속해서 반환(재사용)한다. 

하지만 컴포넌트가 렌더링될 때마다 함수를 새로 선언하는 것은 성능에 크게 문제를 주지 않는다. 오히려 단순히 함수를 반복해서 생성하지 않기 위한 목적으로 `useCallback` 을 잘못 사용했다간 손해를 일으킬 수도 있다. 그렇다면 `useCallback` 을 어떻게 사용해야 성능 향상을 기대할 수 있을까?

```js
function Profile({ userId }) {
  const [user, setUser] = useState(null);

  const fetchUser = () =>
    fetch(`https://your-api.com/users/${userId}`)
      .then((response) => response.json())
      .then(({ user }) => user);

  useEffect(() => {
    fetchUser().then((user) => setUser(user));
  }, [fetchUser]);

  // ...
}
```

위 코드에서 `fetchUser` 는 함수이기에 `userId` 가 바뀌든 말든 컴포넌트가 렌더링될 때마다 새로운 함수로 변경된다. 그러면 `useEffect` 함수가 호출되어 `user` 의 상태값이 바뀌고, 그럼 다시 렌더링이 되어 또 다시 `useEffect` 함수가 호출되는 악순환(무한 루프)가 발생하게 된다. 

이런 상황에서 `useCallback` 훅을 이용하면 컴포넌트가 다시 렌더링되더라도 `fetchUser` 함수의 참조값을 동일하게 유지시킬 수 있다. 따라서 `useEffect` 에 넘어온 함수는 `userId` 값이 변경되지 않는 한 재호출되지 않는다. 

```react
...
const fetchUser = useCallback(
  () =>
    fetch(`https://your-api.com/users/${userId}`)
      .then((response) => response.json())
      .then(({ user }) => user),
  [userId]
);
```



## useMemo

```js
const cachedValue = useMemo(calculateValue, dependencies)
```

리렌더링 전에 계산된 값을 캐시한다.?

```react
function TodoList({todos, tab}) {
	const visibleTodos = useMemo(
		() => filterTodos(todos, tab),
    [todos, tab]
  )
}
```

dependencies 배열 안에 있는 값이 변경되면 등록한 함수를 호출해서 값을 연산하고, 만약 바뀌지 않았다면 이전에 연산한 값을 재사용한다. 

> React.memo는 컴포넌트 단위로 memoization하는 HOC 함수로, 컴포넌트에 같은 props가 들어온다면 해당 컴포넌트 렌더링 과정은 스킵하고 마지막에 렌더링된 결과를 재사용한다. 
>
> - 오직 props가 변경되었는지 여부만 체크하므로 컴포넌트 내부에서 useState나 useContext 같은 훅을 사용하고 있다면 state, context가 변경될때마다 리렌더링된다.
> - props로 들어온 number, string 같은 스칼라들은 값을 비교하지만, object의 경우 참조하고 있는지를 비교한다. 

## useRef

## useImperativeHandle

## useLayoutEffect

```js
useLayoutEffect(didUpdate);
```

- `useLayoutEffect` 는 `useEffect` 와 함수 시그니처가 동일하지만, 모든 DOM 변경 후에 동기적으로 발생한다. 이것은 DOM에서 레이아웃을 읽고 동기적으로 리렌더링 하는 경우 사용한다. 즉 **effect는 브라우저가 화면을 그리기 이전 시점에 동기적으로 수행**된다. 

## useDebugValue

## useDeferredValue

## useTransition

## useId

## useSyncExternalStore

## useInsertionEffect

## Reack Hook Flow Diagram

<img width="542" alt="스크린샷 2023-02-04 17 26 08" src="https://user-images.githubusercontent.com/67703882/216757250-a131701a-0be5-4a2c-bce4-369af63977f9.png">

