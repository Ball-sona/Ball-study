# Binary Data

이진 데이터 관련 클래스에는 ArrayBuffer, Uint8Array, DataView, Blob, File 등이 있다.

## ArrayBuffer

A reference to a fixed-length contiguous memory area

- 이진 데이터를 다루는 핵심 객체
- 어떤 값들을 담은 배열이 아닌 메모리 영역을 나타냄
- 고정된 크기로 생성. 크기 늘리거나 줄이지 못함.
- `new ArrayBuffer(16)` 은 실제로 메모리 영역에서 16 byte 차지

### TypedArray

- ArrayBuffer 바이트들에 접근 및 조작하려면 View 객체가 필요하다. (`buffer[idx]` 불가)
- Uint8Array, Uint16Array, Uint32Array, Float64Array 등
  - 각각 1, 2, 4, 8 바이트씩 접근 가능
- 위 view 객체들을 묶어 TypedArray라 부르고, 이들은 공통 메서드와 속성을 공유
- ArrayBuffer에 접근하기 위한 View 객체일 뿐, Array가 아님을 주의하자.

```js
const buffer = new ArrayBuffer(32);
const view = new Uint32Array(buffer);

console.log(Uint32Array.BYTES_PER_ELEMENT); // 4
console.log(view.length); // 8
console.log(view.byteLength); // 32

// buffer 조작하려면 view를 이용
view[0] = 100;

for (let n of view) {
  console.log(n); // 100 0 0 0 ...
}
```

> `Uint8Array`는 양수와 0만, `Int8Array`는 음수를 포함한 모든 정수를 표현할 수 있다.

## DataView

- Super-flexible "untyped" View 객체
- 하나의 버퍼에 여러 포멧 데이터를 저장하고 싶을 때 유용

```js
const buffer = new Uint8Array([255, 255, 255, 255]).buffer;
const dataView = new DataView(buffer);

console.log(dataView.getUint8(0)); // 255
console.log(dataView.getUint16(0)); //65535
```

## TextDecoder & TextEncoder

- TextDecoder를 통해 주어진 버퍼와 인코딩으로 이진 데이터 값을 실제 문자열로 읽을 수 있다.
  - ex. 텍스트 데이터 파일
  - 기본 인코딩 방식은 utf-8
- ## 반대로 TextEncoder를 통해 문자열을 바이트로 변환할 수 있다.

```js
const uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
console.log(new TextDecoder().decode(uint8Array)); // Hello

comsole.log(new TextEncoder().encode('hello')); // [72, 101, 108, 108, 111]
```
