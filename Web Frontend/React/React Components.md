# React Components

리액트에서 제공하는 build-in 컴포넌트들에 대해 알아보자.

## StrictMode

개발 단계에서 컴포넌트 내 버그를 찾을 수 있도록 돕는다.

> CRA를 사용하여 프로젝트를 세팅하면 자동으로 StrictMode가 활성화된다. 물론 개발 단계에서만 활성화되고, 배포시 자동으로 비활성화된다.

그렇다면 Strict Mode는 어떤 방식으로 나의 컴포넌트들에 버그가 있는지 체크하는 걸까?

- 불순한 렌더링(impure rendering)으로 인한 버그를 찾기 위해 추가 리렌더링을 진행한다.
- Effect cleanup 하지 못하여 발생하는 버그를 찾기 위해 Effects를 추가로 실행한다.
- deprecated된 API가 사용되는지 체크한다.

### Double Rendering

리액트는 기본적으로 모든 컴포넌트들을 순수 함수라고 가정한다. 즉 우리가 작성하는 리액트 컴포넌트들은  같은 input에 대하여 항상 같은 JSX를 반환해야 한다는 것이다.

이러한 규칙을 따르지 않는 컴포넌트, 즉 순수 함수로 구성되어 있지 않은 컴포넌트들은 쉽게 예측되지 않고 버그를 유발할 수 있다. 따라서 Strict Mode는 순수 함수로 구성되어야 하는 것들에 한해서 2번씩 실행한다. 그 대상들은 다음과 같다.

- Component Function Body (not include code inside event handlers)
- useState, set, useMemo, useReducer에 전달한 함수
- constructor, render, shouldComponentUpdate 등

### Re-running Effects

StrickMode는 이벤트가 발생할 때마다 추가적인 setup + cleanup 사이클을 진행한다.

이를 통해 cleanup 되지 않아 퍼포먼스나 네트워크에 문제를 줄 수 있는 effect가 있는지 체크한다. 

```
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect(); // cleanup
  }, [roomId]);
```

## Fragment 

리액트 컴포넌트는 오직 하나의 element만 반환할 수 있다. 따라서 우리는 여러개의 엘리먼트들을  `<></>` 를 이용하여 감싸곤 하는데, 이때 사용되는 빈 태그가 바로 `<Fragment></Fragment>` 를 단축시킨 것이다. 

주의할 점은 빈 태그에는 `key` 속성을 부여하지 못한다는 것이다. 따라서 해당 태그에 key 속성을 부여해야할 경우에는 `<Fragment key={id}></Fragment>` 형식으로 사용한다.

## Profiler

Profiler는 리액트 트리의 렌더링 성능을 측정해준다. 

```
<Profiler id="App" onRender={onRender}>
	<App />
</Profiler>
```

`onRender` 속성으로 넘겨주는 함수는 profiled tree 내 컴포넌트가 업데이트될 때마다 호출이 되는데, 이때 무엇이 렌더링 되었는지, 렌더링이 얼마나 소요되었는지 등 관련 정보를 전달받을 수 있다. 

> 가벼운 컴포넌트이지만, CPU나 메모리에 오버헤드를 부여할 수 있기에 개발 단계에서만, 그리고 필요할 때만 사용하도록 하자.

## Suspense

Suspense는 React v18.0부터 정식으로 추가된 기능으로, 어떤 컴포넌트가 읽어야 하는 데이터가 아직 준비되지 않았다고 리액트에게 알려주는 새로운 매커니즘이다. 

```
<Suspense fallback={<Loading />}>
	<SomeComponent data={fetchData(..)} />
</Suspense>
```

위 코드에서는 `SomeComponent` 에 넘겨주는 데이터가 로드되기 전까지 해당 컴포넌트의 렌더링을 미루고, 그동안 `fallback` 속성에 넘겨준 컴포넌트를 대신 보여준다.



## 참고 자료

- https://www.daleseo.com/react-suspense/

- 리액트 공식문서