# useState

함수형 컴포넌트 내부에서 상태를 정의하고 관리할 수 있는 훅이다.

```js
const [state, setState] = useState(initialState);
```

## 동작 방식

- 함수형 컴포넌트가 렌더링된다는 것은 그 함수를 그대로 실행한다는 것을 의미한다. (그 함수가 반환한 결과물을 가지고 비교하기 때문)
- 이는 컴포넌트가 렌더링될 때마다 함수 내부에 있는 값들이 모두 초기화된다는 뜻인데, 어떻게 `useState` 로 관리하는 상태는 함수가 실행되어도 그 값을 유지할 수 있을까? 

아래는 useState 내부 작동 방식을 유사하게 구현해본 코드다. (실제 구현체는 정확하게 확인할 수 없어서 PReact의 구현을 기준으로 한다.)

```jsx
// 애플리케이션 전체 정보
const global = { };
let index = 0;

export function useState(initialState) {
  // 애플리케이션 최초 접근이면 빈 배열로 초기화
  if (!global.states) {
    global.states = [];
  }

  // state값을 조회해서 있는지 확인하고. 없다면 초기값으로 설정
  const currentState = global.states[index] || initialState;
  global.states[index] = currentState;

  // 즉시 실행 함수인 setter
  const setState = (function () {
    // 인덱스를 클로저에 가두어서, 이후 setState를 실행할 때마다 동일한 인덱스에 접근할 수 있도록 함.
    let currentIndex = index;
    
    return function (value) {
      // state 값을 변경
      global.states[currentIndex] = value;
      /** 이후 컴포넌트 렌더링.. */
    };
  })();

  // useState로 생성한 state마다 하나의 index를 부여한다. 이를 통해 global.states 접근
  index = index + 1;

  return [currentState, setState];
}
```

- setState는 '즉시 실행 함수'로, `state` 값을 새로운 값으로 변경하는 함수를 생성 후 바로 반환한다. 이때 새로 반환된 함수는 해당 `state`에 해당하는 `index` 를 이후에도 계속 기억하게 된다. 
- 즉, 함수의 실행이 끝났음에도 함수가 선언된 환경을 기억하는 '클로저'를 활용하여 `state` 값을 유지하고 사용할 수 있는 것을 알 수 있다.
- 이러한 방식을 통해 해당 값은 오직 리액트에서만 사용할 수 있고, 함수 컴포넌트가 매번 실행되더라도 `useState`에서 이전 값을 정확하게 가져다가 사용할 수 있다. 

## 게으른 초기화

useState() 인수로 원시 값이 아니라 **특정한 값을 반환하는 함수를 넣어주는 것**을 의미한다. 

```js
// 일반적인 초기화
const [number, setNumber] = useState(Number(window.localStorage.getItem(cachedKey)));

// 게으른 초기화
const [number, setNumber] = useState(() => useState(Number(window.localStorage.getItem(cachedKey)));
```

- 이렇게 `useState` 초기값으로 전달된 함수는 `state`가 처음 생성될 때만 사용되고, 컴포넌트 리렌더링시에는 해당 함수의 실행이 무시된다.
- 즉, 초기값이 <u>복잡하거나 무거운 연산을 포함</u>하고 있을 때 사용하면 좋다. (localStorage, sessionStorage 에 대한 접근이나. map,filter,find 같은 배열에 대한 접근 등)
- 이 역시 '클로저'의 특성을 활용한 것임을 알 수 있다.

