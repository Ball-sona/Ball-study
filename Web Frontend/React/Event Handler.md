# Event Handle

---

1.

```js
<button onClick={alert("click")} />
```

버튼 클릭할 때가 아니라 컴포넌트가 그려질 때 alert 실행된다.

##### 왜???

컴포넌트가 render 하는 과정에서 함수 호출의 결과, 즉 alert("click")의 실행 결과가 onClick에 바인딩 되기 떄문이다. alert("click")의 return값은 undefined이기 떄문에 실제로 클릭하면 아무일도 일어나지 않을것...

##### 해결방법

1.

```js
<button onClick={() => alert("click")} />
```

2.

```js
<button
  onClick={function () {
    alert("click");
  }}
/>
```

함수 선언을 onClick에 바인딩해주는 것.

---

#### 참고

https://medium.com/@su_bak/react-js-react%EC%97%90%EC%84%9C-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%A0%81%EC%9A%A9-%ED%95%98%EA%B8%B0-904015a3bb1f





export const NavigationStoreContext =

  createContext<typeof navigationStore>(navigationStore);

export const withNavigationStateProvider = <T extends object>(

  WrapperComponent: (props: T) => JSX.Element,

) => {

  function ComponentWithNavigationStateProvider(props: T) {

​    return (

​      <NavigationStoreContext.Provider value={navigationStore}>

​        {/* eslint-disable-next-line react/jsx-props-no-spreading */}

​        <WrapperComponent {...props} />

​      </NavigationStoreContext.Provider>

​    );

  }

  return ComponentWithNavigationStateProvider;

};
