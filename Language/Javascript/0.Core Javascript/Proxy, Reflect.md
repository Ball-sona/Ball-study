# Proxy, Reflect

## Proxy

특정 객체를 감싸 객체에 가해지는 작업을 중간에서 가로채는 객체

```js
const proxy = new Proxy(target, handler);
```

- target: 감싸게 될 객체
- handler: 동작을 가로채는 메서드인 trap이 담긴 객체

내부 메서드의 호출을 가로챈다.

## Reflect

<hr />

# Curring

`func(a)(b)(c)` 다중 callable 프로세스 형태로 변환하는 기술

## 참조 타입

`obj.method()` 를 실행하면. 내부에서 무슨 일이 일어나는지.어떻게 메서드 내에서 사용되는 this에 객체 정보를 전달해줄 수 있는지.
