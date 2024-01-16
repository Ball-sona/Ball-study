# 데코레이터

인수로 함수를 받아서 함수의 행동을 변경시켜주는 함수를 **데코레이터(decorator)** 라고 한다.

```js
function cacheDecorator(func) {
  const cache = new Map();
  return function (val) {
    if (cache.has(val)) {
      return cache.get(val);
    }
    const result = func(x);
    cache.set(val, result);
    return result;
  };
}

let busyFunc = function (x) {
  // using CPU too much...
  return x++;
};
busyFunc = cacheDecorator(busyFunc);
```

위 `cacheDecorator` 처럼 CPU를 많이 사용하는 함수에 캐싱 기능을 적용해주는 데코레이터를 생성할 수 있다.
