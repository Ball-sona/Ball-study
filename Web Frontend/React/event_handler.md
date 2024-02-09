# Event Handler

리액트가 이벤트를 처리하는 방법

## Event Delegation

```jsx
const Button = () => {
  const onClick = () => console.log('clicked!');
  return <button onClick={onClick}>button1</button>;
};
```

리액트는 이벤트 핸들러를 각각의 DOM 요소(위 예시에서 `button`)에 부착하는 것이 아니라, 이벤트 타입(ex. `click`, `change` 등) 당 하나의 핸들러를 **루트**에 부착한다. 즉, 이벤트 핸들러를 어떤 요소에 부착하든 모든 이벤트 핸들러는 root DOM Container에 부착된다는 뜻이다.

실제로 루트 노드에 연결되어있는 이벤트 핸들러들을 출력해보면 다음과 같다.

<img src="https://github.com/ballsona/Study/assets/67703882/2e3558d7-42c4-48c9-8ab1-397b66c85099" />

## Synthetic Event

리액트는 크로스 브라우징을 위해 Native Event를 그대로 사용하지 않고 `SyntheticEvent` 객체로 한번 감싸는 방식을 사용한다.

```tsx
interface BaseSyntheticEvent<E = object, C = any, T = any> {
  nativeEvent: E;
  currentTarget: C;
  target: T;
  bubbles: boolean;
  cancelable: boolean;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  preventDefault(): void;
  isDefaultPrevented(): boolean;
  stopPropagation(): void;
  isPropagationStopped(): boolean;
  persist(): void;
  timeStamp: number;
  type: string;
}

interface SyntheticEvent<T = Element, E = Event>
  extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> {}
```

이러한 `SyntheticEvent` 객체를 사용하기 때문에 리액트가 `onChange`, `onClick` 등 이벤트 핸들러를 따로 처리할 수 있다.

## 이벤트 처리 과정

'NativeEvent가 리액트 이벤트 핸들러로 매칭되고 루트 노드에 부착되는 과정'은 Virtual DOM, 즉 **Fiber Tree가 생성되는 시점**에 일어난다.

### 이벤트 등록

1. 리액트는 `click`, `change` 등 모든 NativeEvent 목록을 List에 저장해둔다. 

> [최근 코드](https://github.com/facebook/react/blob/main/packages/react-dom-bindings/src/events/EventRegistry.js#L10)를 보면 Set에 저장하는 것 같은데 확인해보자.

2. NativeEvent 이름과 리액트 이벤트 핸들러 Property를 매핑한다. (ex. change -> onChange)

```ts
//https://github.com/facebook/react/blob/ba5e6a8329c7194a2c573c037a37f24ce45ee58f/packages/react-dom-bindings/src/events/DOMEventProperties.js#L118
export function registerSimpleEvents() {
  for (let i = 0; i < simpleEventPluginEvents.length; i++) {
    const eventName = ((simpleEventPluginEvents[i]: any): string);
    const domEventName = ((eventName.toLowerCase(): any): DOMEventName);
    const capitalizedEvent = eventName[0].toUpperCase() + eventName.slice(1);
    registerSimpleEvent(domEventName, 'on' + capitalizedEvent);
  }
}
```

3. 이때 리액트에서 정의된 이벤트 타입에 따른 우선 순위에 따라 각 NativeEvent에 우선순위를 부여한다.

4. 이후 root Fiber Node에 이 이벤트 핸들러들을 등록하는 과정을 거친다. 따라서 이벤트 등록 과정이 렌더링 전에 모두 이루어지므로 실제 이벤트가 발생했을 때는 모든 이벤트 핸들러가 루트에 등록되어있는 상태이다.

### 이벤트 발생

1. 사용자가 버튼을 클릭하면 리액트에서 `click` 이벤트를 감지하고, 이에 부착한 이벤트 리스너를 트리거한다.
2. 트리거된 이벤트 리스너는 리액트에서 정의한 `dispatchEvent` 함수를 호출한다.
3. 호출 시 넘겨받은 이벤트 객체로부터 'target DOM 노드'을 식별한 후, 해당 DOM 노드가 어떤 'Fiber 노드 인스턴스'와 매칭되는지 확인한다.
4. 해당 fiber 노드 인스턴스를 찾으면, 해당 노드에서부터 fiber 루트 노드에 이르기까지 fiber tree를 순회하며 '매칭되는 이벤트(`onClick`)'을 가지고 있는 fiber node을 발견할 때마다 해당 이벤트 리스너를 `dispatchQueue` 라는 배열에 저장한다.
5. 이후 루트에 도착하면 `dispatchQueue`에 들어간 순서대로 리스너 함수를 실행한다. 이때 리스너의 propagation 여부와 이벤트 중복 여부를 확인한 후에 `executeDispatch` 함수를 호출하여 리스너 함수를 실행한다. 

## 참고 자료

https://blog.mathpresso.com/react-deep-dive-react-event-system-1-759523d90341
