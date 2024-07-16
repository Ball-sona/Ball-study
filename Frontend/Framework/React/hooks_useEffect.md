# useEffect

애플리케이션 내 컴포넌트의 여러 값들을 활용해 동기적으로 부수 효과(side effect)를 만드는 훅이다.

```js
useEffect(() => {
  // setup function
}, dependencyArray);
```

- 첫번째 인자에는 부수 효과(side effect)가 포함된 함수를 전달. 이 함수를 'setup' 함수라고 부르고, 셋업 함수는 선택적으로 클린업 함수를 반환할 수 있다.
- 두번째 인자에는 의존성 배열을 전달
- `undefined` 를 반환한다.

함수형 컴포넌트가 렌더링될 때마다, 즉 함수가 호출될 때마다 (두번째 인자로 전달 받은) 의존성 배열에 담긴 값들을 하나씩 확인해보면서 만약 하나라도 값이 이전 값과 달라진 게 있다면, **렌더링 직후에** (첫번째 인자로 전달 받은) 셋업 함수를 실행시킨다. 

## Side Effect

부수 효과(Side Effect)란, **컴포넌트가 렌더링된 이후에 발생시키고 싶은 효과**를 의미한다.

- API 호출, 이벤트 구독, 타이머 설정 등 작업
- `useEffect` 에 전달된 부수 효과를 포함한 함수는 반드시 '동기적'으로 처리된다. 만약 외부 API 호출 후 state를 변경하는 async 함수(비동기)를 콜백 함수로 전달했다고 가정해보자. 해당 비동기 함수의 응답 속도에 따라 state 업데이트 시점이 달라지기 때문에, state 값을 정확하게 추적할 수가 없다. 
- 따라서 `useEffect` 의 콜백 함수는 반드시 '동기 함수' 이어야 하며, 만약 비동기 함수를 사용하고 싶은 경우 내부에서 직접 선언 후 사용하거나 즉시 실행 함수를 만들어 사용해야 한다. 단, 이럴 경우 비동기 함수가 매번 생성 및 실행되는 것을 반복하므로 클린업 함수에서 이전 비동기 함수에 대한 처리를 해주는 것이 좋다. 

## 의존성 배열

앞서 말했듯, `useEffect` 는 컴포넌트가 렌더링될 때마다 의존성 배열에 담긴 값들을 이전 값과 일일히 비교한다.

### 배열 생략하기 vs 빈 배열 넣기

- 만약 두번째 인자를 아예 생략하면, 의존성을 비교할 필요 없이 렌더링할 때마다 `useEffect` 실행이 필요하다고 판단해서 `useEffect`의 콜백 함수가 매 렌더링마다 실행된다.
- 만약 두번째 인자에 빈 배열(`[]`)을 전달한다면, 따로 확인할 의존성이 없다고 판단하여 **최초 렌더링 직후에 실행**된 다음부터는 `useEffect` 콜백 함수가 더이상 실행되지 않는다.

### 배열 생략하기 vs useEffect 생략하기

배열을 생략하면 매번 렌더링될 때마다 `useEffect` 의 콜백 함수가 실행된다 했는데, 그럼 함수를 굳이 `useEffect` 에 전달하지 않고 그냥 컴포넌트 내부에서 호출하면 되는거 아닌가?

- 컴포넌트 내부에 있는 함수는 렌더링 도중이 실행되지만, useEffect 콜백 함수는 **렌더링 완료된 이후에 실행**된다. 컴포넌트 내부에서 함수를 호출하는 건 컴포넌트 반환(렌더링)을 지연시키는 행위이기도 하다.
- 서버 사이드 렌더링 관점에서, useEffect는 함수가 클라이언트 사이드에서 실행되는 것을 보장해주기 때문에 window 객체 등에 접근할 수 있다.

## 클린업 함수

```js
const [count, setCount] = useState(0);
const handleClick = () => setCount((prev) => prev + 1);

useEffect(() => {
  function addMouseEvent() {
    console.log(count);
  }
  window.addEventListener('click', addMouseEvent);

  // 클린업 함수
  return () => {
    window.removeEventListener('click', addMouseEvent);
  };
}, [count]);
```

- `useEffect` 는 셋업 함수를 실행할 때마다 **앞선 실행에서 반환**한 '클린업 함수'를 실행한 후에 '셋업 함수'를 실행한다.
- 따라서 이벤트를 새로 추가하기 전에 이전에 등록해두었던 이벤트 핸들러를 삭제하거나, `cleanTimeout` 를 호출하는 등 '클린업 함수'를 추가하여 특정 이벤트가 무한히 추가되는 것을 방지할 수 있다. 
- 즉, 클린업 함수는 `useEffect` 내에서 정의한 사이드 이펙트가 수행되기 전 이전 상태를 청소해주는 개념이라고 볼 수 있다.
- 만약 의존성 배열을 `[]`로 설정하면, 클린업 함수가 컴포넌트가 unmount 될 때만 실행되도록 설정할 수 있다.
- 리액트 16버전까지는 클린업 함수가 동기적으로 처리되었지만, 17버전부터는 비동기적으로 실행된다. 즉, 컴포넌트의 커밋 단계가 완료될 때까지 기다렸다가, 업데이트가 완전히 끝난 이후에 실행된다.

## 동작 방식

> 실제 구현체는 확인할 수 없지만, PReact를 기반으로 내부 구현을 유사하게 정의해보자.

```js
// 애플리케이션 전체 정보
const global = {};
let index = 0;

export function useEffect(calllback, dependencies) {
  const hooks = global.hooks;

  // 이전 훅 정보 있는지 확인
  let previousDependecies = hooks[index];

  // 의존성 배열 내 값들을 이전 값들과 얕은 비교하여 변경사항 있는지 확인
  let isDependenciesChanged = previousDependecies
    ? dependencies.some((value, idx) => !Object.is(value, previousDependecies[index]))
    : true;

  // 변경이 발생했다면 콜백 함수 실행
  if (isDependenciesChanged) {
    calllback();

    // 현재 의존성 배열을 훅에 다시 저장 후 인덱스 추가
    hooks[index] = dependencies;
    index++;
  }
}
```

- 만약 이전 값이 없다면 `useEffect` 의 최초 실행이므로 콜백 함수를 실행하고, 만약 이전 값이 있다면 현재 값과 비교하여 콜백 함수 실행 여부를 결정한다.
- 의존성 배열의 이전 값과 현재 값 비교는 `Object.is` 에 의한 '얕은 비교'로 수행된다.

## 주의할 점

### 1. 의존성 배열에 대한 고민

- `useEffect` 를 최초 렌더링 시 딱 한번만 실행하기 위해(컴포넌트가 마운트되는 시점에만 실행하기 위해) 의존성 배열에 값을 추가하라는 eslint의 경고를 무시하고 일부러 빈 배열을 전달하여 사용하는 경우가 있다.
  - `// eslint-disable-line react-hooks/exhaustive-hops`

- 그러나 의존성 배열을 일부러 비워놓는 건 생각보다 주의해야 한다. 콜백 함수 내 부수 효과가 실제로 관찰해서 실행되어야 하는 값과 별개로 작동한다는 것을 의미하기 때문이다.

### 2. 첫번째 인수에 함수명 부여하기

`useEffect`의 콜백 함수의 복잡성이 낮다면 익명 함수를 사용해도 괜찮지만, 코드가 복잡하고 많아진다면 기명 함수를 사용하는 게 좋다.

### 3. 최대한 간결하고 가볍게

`useEffect`의 의존성 배열에 값이 너무 많아진다면, 그 부수효과가 왜 발생하는지 추적하기가 어려워진다. 이러한 경우 여러개의 `useEffect`로 분리하여 구현하거나, `useCallback`, `useMemo` 등으로 사전에 정제한 값들만 담는 것이 좋다.

### 4. 불필요한 외부 함수 자제하기

`useEffect` 내에서 사용할 부수 효과라면 차라리 내부에서 만들어서 정의 후 사용하는 편이 나을 수 있다.

```jsx
const controllerRef = useRef<AbortController|null>(null);

// 무한 루프 막기 위해 useCallback 사용
const fetchInfo = useCallback(async(id:string)=> {
	controllerRef.current?.abort();
  controllerRef.current = new AbortController();
  const res = await fetchData(id, {signal:controllerRef.signal});
  setInfo(await res.json());
});

useEffect(() => {
  fetchInfo(id);
  return () => controllerRef.current?.abort();
},[id, fetchInfo])
```

위 `fetchInfo` 함수를 별도의 함수로 분리하지 않고, useEffect 내에서 구현한다면 훨씬 코드가 간결해진다.

```jsx
useEffect(() => {
  const controller = new AbortController();
  (async () => {
    const result = await fetchData(id, {signal:controller.signal});
    setInfo(await result.json());
  })();
  return () => controller.abort();
},[id]);
```
