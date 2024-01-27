# useContext

함수형 컴포넌트에서 Context 사용하기 위한 훅이다.

## Context

먼저 컨텍스트(Context)란 props drilling 없이 부모 컴포넌트가 자식 컴포넌트에게 값을 전달할 수 있도록 리액트에서 제공하는 API이다.

```tsx
const MyContext = createContext<{ hello: string } | undefined>(undefined);

const ParentComponent = () => {
  return (
    <MyContext.Provider value={{ hello: 'world' }}>
      <ChildComponent />
    </MyContext.Provider>
  );
};
```

`createContext` 를 호출하여 Context를 생성 후 하위 컴포넌트들을 감싸면, 하위 컴포넌트에서 `value` 값에 접근할 수 있다.

## useContext

`useContext` 는 하위 컴포넌트에서 context 값에 접근하기 위한 훅이다.

```jsx
const ChildComponent = () => {
  const context = useContext(MyContext);
  if (!context) throw Error('no context');

  return <div>{context.hello}</div>; // world
};
```

- 만약 여러 개의 Provider가 있다면 가장 가까운 Provider의 컨텍스트 값을 가져오게 된다.
- `useContext` 통해 컨텍스트 값을 가져오게 되면 자동으로 Provider와의 의존성을 가지게 되는 것이므로 주의해서 사용해야 한다.

## Context API는 상태 관리 도구로 볼 수 없다.

우리가 보통 사용하는 상태 관리 라이브러리의 조건은 다음과 같다.

1. 어떤 상태를 기반으로 다른 상태를 만들어낼 수 있어야 한다.
2. 필요에 따라 이러한 상태 변화를 최적화할 수 있어야한다.

그러나 Context API는 props 값을 하위로 전달해주는 역할을 할 뿐, 하위 컴포넌트의 렌더링을 최적화하진 않는다. 따라서 context 값을 사용하지 않는 중간 컴포넌트를 `React.memo()` 로 감싸주는 등 최적화 작업을 추가로 해주어야 한다.
