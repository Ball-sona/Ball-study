# 콜백

'콜백 기반' 비동기 프로그래밍에 대해 알아보자.

## 동기 vs 비동기

- 자바스크립트는 단일 스레드, 단일 호출 스택으로 가지고 있으므로, 한 번에 하나의 작업만 처리할 수 있다.
- 즉, 기본적으로 자바스크립트는 '동기'적으로 실행된다.
- 그러나 `setTimeout` 이나 이벤트 핸들러 등 여러 작업이 병렬적으로 처리되는 '비동기' 작업도 지원한다.

## 콜백

- 만약 실행 흐름이 비동기적으로 동작하고 있다면, 우리는 특정 동작의 실행 시점을 예측할 수 없다.
- 만약 A라는 함수의 실행이 끝난 이후에 B라는 함수를 실행하고 싶다면, B를 A의 '콜백 함수'로 지정해줌으로써 실행 순서를 결정할 수 있다.
- 이렇게 <u>무언가를 비동기적으로 수행하는 함수</u>의 동작이 모두 처리된 이후 실행되어야 할 함수를 '콜백' 인수로 제공함으로써 **비동기 동작 스케줄링을 처리**할 수 있다.

## 에러 핸들링

- 만약 비동기적으로 수행하는 함수가 실패한다면, 이후에 실행 예정이었던 콜백 함수는 이런 에러를 핸들링할 수 있어야 한다.
- 이를 위해 보통 콜백 함수의 첫번째 인수는 에러를 위해 `error` 로 남겨두고, 두번째 인수부터는 에러를 발생하지 않았을 때 사용하도록 한다.

```js
function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  scriipt.onerror = () => callback(new Error(`fail to load ${src}`));
}

loadScript('sample1.js', function (error, script) {
  if (error) {
    handleError(error);
  } else {
    console.log('load success!');
  }
});
```

위 예시에서 스크립트를 불러오는 비동기 함수 `loadScript` 가 스크립트 로딩에 성공하면 `callback(null, script)` 를, 실패하면 `callback(error)` 를 호출하도록 하고 있다.

## 콜백 지옥

비동기 동작의 콜백 함수가 늘어나면서, 깊은 중첩으로 인해 코드가 지저분해지는 것을 '콜백 지옥' 이라고 한다. 동작상의 문제는 없지만, 가독성이 매우 떨어진다는 단점이 있다.

```js
loadScript("sample1.js", function(error, script) {
  if(error) {
    handleError(error);
  } else {
		loadScript("sample2.js", function(error, script) {
			if(error) {
				handleError(error);
      } else {
        loadScript("sample3.js", function(error, scripit) {
					...
        })
      }
    })
  }
})
```
