# 생명주기 메서드

<img src="https://i.imgur.com/FYszT10.png" style="zoom:50%;" />

## Life Cycle

먼저 생명주기 메서드가 실행되는 시점을 크게 3가지로 나눌 수 있다.

1. mount: 컴포넌트 생성되는 시점
2. update: 컴포넌트 내용이 변경되는 시점
3. unmount: 컴포넌트가 더이상 존재하지 않는 시점

## render()

- 컴포넌트가 렌더링할 UI를 정의하는 메서드
- Side effect가 없어야 한다. 즉, 함수 내부에서 `setState` 등을 호출해서는 안된다.

## componentDidMount()

- 컴포넌트가 마운트되고 준비가 완료된 즉시 호출되는 메서드
- API를 호출하거나 이벤트 리스너 추가 등 DOM에 의존적인 작업

## componentDidUpdate(prevProps, prevState, snapshot?)

- 컴포넌트 업데이트가 일어난 이후 바로 실행되는 메서드
- state나 props의 변화에 따라 DOM을 업데이트하는 작업

## componentWillUnmount()

- 컴포넌트가 언마운트되거나 더이상 사용되지 않기 직전에 호출
- 메모리 누수나 불필요한 작동을 막기 위한 클린업 함수

## shouldComponentUpdate(nextProps, nextState)

- 컴포넌트의 리렌더링 여부를 결정하는 메서드로, 해당 함수가 `false` 를 반환하면 컴포넌트를 리렌더링하지 않는다.
- 컴포넌트에 영향을 받지 않는 변화에 대해 정의

> `Component`는 state가 업데이트되는 대로 렌더링이 발생하지만, `PureComponent`은 <u>state값에 대해 얕은 비교를 수행해 결과가 다를 때만</u> 리렌더링한다. 따라서 일반 컴포넌트에 `shouldComponentUpdate` 를 추가해서 일일히 값을 비교하기 보다는, `PureComponent`를 사용할 것을 공식문서에서 추천하고 있다.

> React.memo() 와 유사한 역할을 한다.

## static getDerivedStateFromProps(nextProps, prevState)

- render 함수를 호출하기 직전에 호출된다.
- 다음에 올 props를 바탕으로 현재의 state를 변경하고 싶을 때
- ex. 만약 `props.userId` 가 변경되어 이에 맞는 `state.email`을 변경하고 싶을 때

## getSnapShotBeforeUpdate(prevProps, prevState)

- DOM이 업데이트 되기 직전에 호출
- 이 함수가 반환하는 값은 `componentDidUpdate` 의 세번째 인자인 `snapshot` 으로 전달된다.
- DOM에 렌더링되기 전에 윈도우 크기 조절하거나 스크롤 위치 조정하는 등 작업
- ex. 만약 `props.listLength` 가 `prevProps.listLength` 보다 길어져서, 즉 현재 배열 길이가 이전보다 길어진 경우 현재 스크롤 높이 값을 반환하면, `componentDidUpdate` 가 `snapshot` 으로 해당 값을 받아서 스크롤 위치를 재조정하여 기존 아이템이 스크롤에서 밀리지 않도록 한다.

## static getDerivedStateFromError(error)

- 자식 컴포넌트에서 에러가 발생했을 때 호출되는 에러 메서드
- 하위 컴포넌트에서 <u>에러가 발생했을 경우 어떻게 자식 컴포넌트를 렌더링할지 결정하는 메서드</u>이기 때문에, 반드시 미리 정의해둔 state 값을 반환해야 한다.
- 렌더링 과정에서 호출되는 함수이기 때문에 side effect를 발생시켜선 안된다.

## componentDidCatch(error, info)

- 자식 컴포넌트에서 에러가 발생했을 때 실행되며, `getDerivedStateFromError` 에서 에러를 잡고 state를 결정한 이후에 실행
- `getDerivedStateFromError`에서 실행하지 못한 side effect 수행 가능하다.

### ErrorBoundary 구현하기

위 두 생명주기 메서드를 활용하여 `ErrorBoundary` 컴포넌트를 구현할 수 있다.

```tsx
import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{}>;
type State = { didCatch: boolean; errorMessage: string };

export default class ErrorBoundary extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      didCatch: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      didCatch: true,
      errorMessage: error.toString(),
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>에러 발생함!</h1>
          <div>{this.state.errorMessage}</div>
        </div>
      );
    }
    return this.props.children;
  }
}

// App.tsx
export default function App() {
  return (
    <ErrorBoundary>
      <Child />
    </ErrorBoundary>
  );
}
```

프로젝트에서 에러 핸들링을 편하게 하기 위해 사용하던 `react-error-boundary` 라이브러리도 위와 같이 [두 생명주기 메서드를 활용하여 구현되어있음](https://github.com/bvaughn/react-error-boundary/blob/ed6d112ce8cb5899c5efe49bfd6862da58a5b023/src/ErrorBoundary.ts#L32-L51)을 확인할 수 있었다!
