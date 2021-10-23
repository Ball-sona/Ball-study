# useEffect

---

```js
useEffect(() => {
  effect;
  return () => {
    cleanup;
  };
}, [deps]);
```

두번째 파라미터인 deps 배열을 비우게 되면, <b>컴포넌트가 처음 나타날때만 effect 함수가 호출된다. </b>

##### 마운트 시 주로 뭐하는데?

- props 로 받은 값 컴포넌트의 로컬 상태로 설정
- 외부 API 요청
- 라이브러리 사용
- 반복작업(setInterval)/작업예약(setTimeout)

##### 언마운트 시 주로 뭐하는데?

- clearInterval/clearTimeout
- 라이브러리 인스턴스 제거

##### deps에 값 넣기

- useEffect 안에서 사용하는 값이 있다면, 그 값을 deps에 넣어주어야 한다.
- deps에 넣은 값이 변경될 때 effect를 호출한다.
- 그렇지 않으면, useEffect에 등록된 effect 함수가 실행될때 그 값이 최신 상태로 업데이트 되지 않는다.

```js
useEffect(() => {
  effect;
  return () => {
    cleanup;
  };
});
```

- [deps]가 아예 없다면? 컴포넌트가 리랜더링 될때마다 effect가 호출된다.

#### 정리

1. [deps]가 빈배열이면 effect가 처음 한번만 호출
2. [deps]에 값이 들어가면, 그 값이 변경될 때마다 effect가 호출
3. [deps]가 아예 없다면, 랜더링 될때마다 effect호출

---

#### 참고

https://react.vlpt.us/basic/16-useEffect.html

// 이거 다시 읽어보기
https://rinae.dev/posts/a-complete-guide-to-useeffect-ko
