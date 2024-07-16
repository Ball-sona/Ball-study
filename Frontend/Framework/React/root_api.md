# Root API

`react-dom/client` 가 리액트 트리를 만들 때 사용하는 API

## ReactDOM.render

리액트 18 버전 미만에서 사용되던 메서드

```tsx
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
```

## ReactDOM.createRoot

```tsx
import ReactDOM from 'react-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
```

## ReactDOM.hydrate

서버 사이드 렌더링 애플리케이션에서 하이드레이션을 하기 위한 메서드

```tsx
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, <App />);
```

