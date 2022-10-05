### CRA 사용시 초기 렌더링 2번 되는 이유

```
ReactDOM.render(
  <React.StrictMode><App /></React.StrictMode>,
 document.getElementById('root')
 )
```

StrictMode는 **개발모드에서** 애플리케이션의 잠재적 문제를 알아내기 위한 도구로, 렌더링 2번을 야기한다. 에러라고 할수는 없지만, 2번 렌더링이 되면 안되는 컴포넌트에서는 이를 고려해야할 것. 

