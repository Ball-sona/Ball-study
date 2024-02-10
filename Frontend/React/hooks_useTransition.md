# useTransition

useTransition은 쉽게 말해 **상태 업데이트에 우선순위를 지정**해주는 훅으로, 리액트 18버전에서 '동시성 렌더링'을 지원하기 위해 새롭게 추가된 기능 중 하나이다.

```jsx
const [isPending, startTransition] = useTransition();
```

- `isPending`: 트랜지션이 현재 진행되고 있는지 여부
- `startTransition`: '낮은 우선 순위로 지정할 상태'를 업데이트하는 함수(set) 하나 또는 여러개를 인자로 받는 함수

## Transition

트랜지션을 이해하기 위해 아래 예시 코드를 살펴보자.

```tsx
export const TabContainer = () => {
  const [tab, setTab] = useState<Tab>('about');
  const selectTab = (nextTab: Tab) => setTab(nextTab);

  return (
    <div>
      <button onClick={() => selectTab('about')}>about</button>
      <button onClick={() => selectTab('posts')}>posts</button>
      <button onClick={() => selectTab('contact')}>contact</button>

      {tab === 'about' && <About />}
      {/** 엄청 무거운 컴포넌트 */}
      {tab === 'posts' && <Posts />}
      {/** 엄청 가벼운 컴포넌트 */}
      {tab === 'contact' && <Contact />}
    </div>
  );
};
```

만약 사용자가 'posts' 탭을 선택했다가 잘못 선택한 걸 깨닫고 바로 'contact' 탭을 선택했다고 해보자. 이미 `Posts` 컴포넌트 렌더링이 시작되었기 때문에 이 렌더링이 종료될 때까지 기다렸다가 `Contact` 컴포넌트를 보여줄 수 있고, 이 과정에서 UI 블로킹이 발생한다. 

```tsx
const [isPending, startTransition] = useTransition();
const [tab, setTab] = useState<Tab>('about');

const selectTab = (nextTab: Tab) => {
  // 낮은 우선순위를 가진 상태 업데이트
  startTransition(() => setTab(nextTab));
};
```

이제 이러한 문제를 **Transition**을 사용하여 해결할 수 있다.

- 리액트는 Fiber 알고리즘을 통해 여러 렌더링 작업을 '동시에' 실행 가능하다.
  - 정확히는 렌더링을 여러 작업으로 쪼개 번갈아가면서 실행
- `Posts` 컴포넌트를 렌더링하던 중에, 사용자가 'contact' 탭을 누른다면 `Contact` 컴포넌트를 비동기적으로 렌더링하기 시작한다.
- `Contact` 컴포넌트의 렌더링이 완료되기 전까지 `setTab` 업데이트를 지연(defer)시킨다. 
- 현재 비동기 렌더링 작업을 기다리며 상태 업데이트를 지연시키고 있는 상태인지, 즉 현재 트랜지션 상태인지는 `isPending` 을 통해 알 수 있고, 낮은 우선순위로 지정할 상태 업데이트, 즉 다른 업데이트가 일어날 때까지 지연시킬 '상태 업데이트'는 `startTransition` 에 인자로 전달한다.

트랜지션을 통해 여러 렌더링 작업을 '동시에' 실행하고, 이 과정에서 상태 업데이트의 '우선순위'를 지정하여 부드러운 UI 전환을 제공할 수 있다.

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

이때 `startTransition` 에는 동기적으로 실행되는 <u>상태를 업데이트하는 함수</u>만 인자로 넘길 수 있다. (`setTimeout` 등 비동기 함수 안됨)

https://17.reactjs.org/docs/concurrent-mode-patterns.html#the-three-steps

