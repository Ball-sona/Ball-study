# Solid

Solid.js feels like what I always wanted **React to be**.

## Fine-Grained Reactivity

반응성을 세분화해서.. 네..

```js
import {onCleanup, createSignal} from 'solid-js';
...
const [count, setCount] = createSignal();
```

- count는 단순 값이 아니라 `getter` 이다.

- 컴포넌트를 렌더링하는 함수는 그저 컴포넌트를 생성하는 역할. 마운트 할때만 실행이 된다.

## 특징

- props를 spread 하지 않는 것이 좋다
  - 왜?
- `createSignal` 을 사용하면 전역 상태 관리를 따로 할 필요가 없다.
- 리렌더링이라는 개념이 없다
  - 기존의 컴포넌트를 지우고 다시 새로 생성하는 것..
  - `map` 함수를 사용하는 대신 `<For>` 를 사용하는 것을 권장
- `<For>` 는 순서가 바뀔 일이 있을때. `<Index>` 는 순서가 바뀔 일이 없을 때 사용하는 것을 권장.
- Virtual Dom이 없다.
- 중첩된 반응성?
- `createSignal` vs `createStore`

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

GDSC Soongsil NFF Study 중 solid todo codejam 발표
