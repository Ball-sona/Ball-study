# useTransition

useTransition은 UI 변경을 가로막지 않고 상태를 업데이트할 수 있는 훅이다.

```jsx
export const TabContainer = () => {
  const [tab, setTab] = useState<Tab>('about');
  const selectTab = (nextTab: Tab) => setTab(nextTab);

  return (
    <div>
      <button onClick={() => selectTab('about')}>about</button>
      <button onClick={() => selectTab('posts')}>posts</button>
      <button onClick={() => selectTab('contact')}>contact</button>
     
      {tab === 'about' && <About />}
      {tab === 'posts' && <Posts />}
      {tab === 'contact' && <Contact />}
    </div>
  );
};
```

위 예시에서 `Posts` 컴포넌트만 렌더링이 굉장히 오래 걸린다고 가정해보자. 만약 사용자가 'posts' 탭을 선택했다가 바로 'contact' 탭을 선택할 경우, 비교적 빠르게 렌더링할 수 있는 `Contact` 컴포넌트만 바로 렌더링해서 사용자에게 바로 보여주는 게 이상적이지만, 먼저 시작된 `Posts` 컴포넌트 렌더링이 끝난 이후에야 `Contact` 컴포넌트 렌더링이 실행될 수 있으므로 쓸데없이 대기를 해야 한다.

즉, 이전(~v17)까지 <u>컴포넌트 렌더링은 한번 시작하면 멈출 수 없는 작업</u>이었기에 이렇게 UI 렌더링이 무거운 작업으로 인해 가로막힐 여지가 있었지만, 18버전에 도입된 `useTransition` 훅을 사용하면 이러한 문제를 해결할 수 있다. 

```jsx
export const TabContainer = () => {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState<Tab>('about');

  const selectTab = (nextTab: Tab) => {
    startTransition(() => setTab(nextTab));
  };

  return (
    <div>
     	{/*...*/}
      
      {isPending ? (
        <p>로딩중..</p>
      ) : (
        <>
          {tab === 'about' && <About />}
          {tab === 'posts' && <Posts />}
          {tab === 'contact' && <Contact />}
        </>
      )}
    </div>
  );
};
```

useTransition은 쉽게 말해 **상태 업데이트에 우선순위를 지정**해주는 훅으로, `isPending` 와 `startTransition` 이 담긴 배열을 반환한다.

- isPending: 상태 업데이트가 진행 중인지(지연) 여부
- startTransition: '낮은 우선 순위로 지정할 상태'를 업데이트하는 함수(set) 하나 또는 여러개를 인자로 받는다.

이렇게 `setTab` 을 `useTransition` 을 통해 처리하면, Posts 컴포넌트가 렌더링될 동안 '로딩중' 이라는 메세지를 띄우게 되고, 렌더링 도중에 다른 탭을 선택하면 그 즉시 렌더링이 중단되고 다른 탭의 컴포넌트가 렌더링된다.

## 동시성 지원 

useTransition은 리액트 18 업데이트의 핵심인 '동시성(concurrency)'를 다룰 수 있도록 제공하는 훅이다.

이전까지는 모든 렌더링이 동기적으로 작동하여 느린 렌더링 작업이 애플리케이션 전체에 영향을 미쳤다면, `useTransition` 같은 동시성 지원 기능을 사용하여 느린 렌더링 과정에서 로딩 화면을 보여주거나 현재 렌더링 작업을 취소하고 새로운 상태값으로 다시 렌더링하는 등 작업을 처리할 수 있게 되었다.

## startTransition

`useTransition` 은 컴포넌트 내에서만 사용 가능한 훅이기 때문에, 만약 컴포넌트 밖에서 사용하고 싶다면 `startTransition` 함수를 바로 import 해서 사용할 수 있다. 

```jsx
import { startTransition } from 'react';

export const TabContainer = () => {
  const [tab, setTab] = useState<Tab>('about');

  const selectTab = (nextTab: Tab) => {
    startTransition(() => setTab(nextTab));
  };

  return <div>{...}</div>
};
```

- <u>상태를 업데이트하는 함수</u>만 인자로 넘길 수 있다.
- startTransition에 넘긴 상태 업데이트는 다른 모든 동기 상태 업데이트로 인해 실행이 지연될 수 있다.
- 반드시 동기 함수만 넘겨야 한다. 
