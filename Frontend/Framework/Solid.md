# Solid

Solid.js feels like what I always wanted **React to be**.

```jsx
import { onCleanup, createSignal } from "solid-js";

function Component() {
  const [count, setCount] = createSignal(0);
  const squared = createMemo(() => count() ** 2); // memo

  createEffect(() => {
    console.log(`hello ${count}`);
    onCleanup(() => {}); // clean up function
  }); // no need dependency array

  return (
    <>
      <p>{count()}</p>
      <button onClick={() => setCount(count() + 1)}>Add One</button>
    </>
  );
}
```

## Fine-Grained Reactivity (세분화된 반응형)

세분화된 반응형은 Signal, Reaction(Memo), Derivation(Effect) 라는 원시 네트워크에서 구성된다.

### Signal

- getter, setter, 값으로 구성된다.
- 핵심은 이벤트 Emitter -> 구독 관리

> Observable, Atom, Subject, Ref 라고도 불린다.

### Reaction

- 리액션은 시그널을 관찰하고, 값이 업데이트될 때마다 시그널을 다시 실행한다.

> Effect, Autoruns, Watches, Computed 라고도 불린다.

### Derivations

- 데이터를 다른 방식으로 표현하거나 여러 리액션에 같은 시그널을 사용

> Memo, Computed, Pure Computed 라고도 불린다.

## Solid vs React

- Solid는 React와 달리 Virtual DOM을 사용하지 않는다.
- React는 `useState` 를 통해 상태를 관리하고, Solid는 `createSignal` 을 통해 상태를 관리한다. `useState` 는 컴포넌트 내부에서만 호출할 수 있지만, `createSignal` 은 컴포넌트 내외에서 모두 호출 가능하다.
- 상태 변경 시 React는 컴포넌트 함수를 다시 호출/실행하여 리렌더링하지만, Solid는 함수 원형은 유지하고 상태 관리를 별개로 작동시킨다.

> Virtual DOM
>
> - 장점: 여러 변경사항들을 한번에 렌더링에 적용할 수 있다.
> - 단점: 렌더링할 때마다 가상 돔을 경유하여 실제 돔에 적용하기 때문에 상대적으로 렌더링 속도가 느릴 수 있다.

## 특징

- props를 spread 하지 않는 것이 좋다
  - 왜?
- `createSignal` 을 사용하면 전역 상태 관리를 따로 할 필요가 없다.
- 리렌더링이라는 개념이 없다
  - 기존의 컴포넌트를 지우고 다시 새로 생성하는 것..
  - `map` 함수를 사용하는 대신 `<For>` 를 사용하는 것을 권장
- 중첩된 반응성?
- `createSignal` vs `createStore`

## Conditional Rendering

```jsx
<Show when={count() > 0}></Show>
```

## For

```jsx
<For each={list} fallback={<div>loading..</div>}>
  {(item) => <div>{item}</div>}
</For>
```

- 순서가 바뀔 일이 없다면 `<Index>`, 그렇지 않다면 `<For>`

## Solid and React

솔리드는 리액트와 닮은 점이 굉장히 많다!

- 공통점

  - State, Effect 사용

  - 함수형 컴포넌트
  - JSX

- 차이점

  - Reactivity, Signal
  - 사라지는 컴포넌트 : 리액트는 컴포넌트가 사라지지 않아. 계속 새로 생성된다. 반면 Solid는 state와의 관계만 남아.
  - Fined-Grained : 리액트는 state를 최적화하지만 넓은 범위. 반면 스벨트는 잘게 쪼개서 작은 단위로 최적화.

## 참고 자료

- GDSC Soongsil NFF Study 중 solid todo codejam 발표
- Solid 공식 문서
