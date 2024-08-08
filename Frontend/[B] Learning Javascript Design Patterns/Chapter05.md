# Chapter 5. 최신 자바스크립트 문법과 기능

## 1. Modular Javascript

- 잘게 분리된 모듈로 구성된 '모듈형' 애플리케이션 -> 모듈 간 느슨한 결합, 낮은 의존성, 유지보수 용이
- ES6 이전에는 AMD, CJS 패턴을 통해 모듈화 구현했었음.
- ES6에서 ES Modules(ESM) 등장하며 모듈형 자바스크립트가 사실상 표준이 됨.

### 정적 모듈

```js
import { cakeFactory } from '/modules/cakeFactory.mjs'; // mjs는 모듈 파일임을 구분하기 위한 확장자

cakeFactory.oven.makeCupcake();
```

### 동적 모듈

```js
form.addEventListener('submit', (e) => {
    e.preventDefault();
    import('/modules/cakeFactory.mjs').then((module) => module.oven.makeCupcake();)
})
```

- `import(module)`은 요청된 모듈의 네임스페이스 객체에 대한 Promise 객체를 반환
  - `import * as mod from '/module.mjs'` 에서 mod가 네임스페이스 객체임
  - 해당 객체는 모듈 자체와 모든 모듈 의존성을 가져온 후, 인스턴스화하고 평가된 뒤 만들어진다.
- 모듈을 필요한 시점에 로드(lazy loading)하여 초기 로딩 시간을 줄일 수 있다. -> Lazy Loading
- IntersectionObserver API 활용해서 컴포넌트가 화면에 보이는지 감지하여 모듈을 동적으로 로드할 수도 있다.

### Node.js 서버

- Node v15.3.0 부터 자바스크립트 모듈 지원
- package.json에 `{"type" : "module"}` 추가하면 자동으로 js/mjs 파일을 모듈 취급

### 모듈 사용 시 이점

- DOM에 추가될 때마다 실행되는 기존 스크립트와 달리, 모듈 스크립트는 한번만 실행된다.
- 모듈 스크립트는 자동으로 지연 로드된다. -> `defer` 속성 자동 적용
- 유지보수와 재사용이 쉽다.
- 각 모듈은 변수와 상수를 위한 개별 공간을 가지고 있고, 모듈 참조를 통해 사용한다. -> 전역 네임스페이스 오염 X
- 번들러가 알아서 사용하지 않는 코드를 제거하는 Three Shaking을 제공한다.

## 2. Class

- ES6에서는 생성자와 내부를 숨기는 기능을 가진 '클래스' 추가
- 자바스크립트의 클래스는 Prototype 기반

```js
class Cake {
  // static
  static brandName = 'paris baguette';

  constructor(name, price, cakeSize, message) {
    this.name = name;
    this.price = price;
    this.cakeSize = cakeSize;
    this.message = message;
  }

  showMessage() {
    console.log(this.message);
  }

  // Getter
  get getCakePrice() {
    return this.price;
  }

  // Setter
  set setCakeSize(size) {
    if (size < 0) throw new Error('invalid size');
    this.cakeSize = size;
  }
}

// Inheritance
class BirthdayCake extends Cake {
  // private member
  #candleCounts = 10;

  surprise() {
    // super -> execute parent methods
    super.showMessage();
    console.log('happy birthday~');
  }
}
```

## 3. Javascript Framework

- **리액트 Hooks** 통해 클래스 사용하지 않고도 리액트 상태와 라이프사이클 다룰 수 있게 됨.
- Web Components 등 다양한 시도가 클래스 기반으로 이루어짐.
