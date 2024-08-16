# Chapter 7. 자바스크립트 디자인 패턴 - 생성 패턴

## 1. 생성자 패턴

- 생성자(constructor): 객체가 새로 만들어진 뒤 초기화하는 데 사용되는 메서드
- ES6에 도입된 자바스크립트 클래스는 객체 템플릿을 정의하고 캡슐화 및 상속 구현을 가능하게 한다.

```js
class Car {
  constructor(model, year) {
    this.model = model;
    this.year = year;
  }

  toString() {
    return `Car ${this.model} - ${this.year}`;
  }
}
```

- 상속이 어렵다.
- 생성자로 객체(인스턴스)를 생성할 때마다 `toString` 같은 내부 함수들을 새로 정의하게 된다.

### 프로토타입 가진 생성자

- 프로토타입 객체를 통해 <u>모든 인스턴스들이 공통 메서드를 공유</u>할 수 있도록 할 수 있다.

```js
Car.prototype.toString() = () => { /**...**/ };
```

## 2. 모듈 패턴

- 모듈: 애플리케이션 아키텍처의 핵심 구성 요소이자 <u>프로젝트 구성하는 코드 단위를 체계적으로 분리 및 관리</u>하는 데 활용
- 모듈 패턴: 공개 및 비공개 메서드 가진 로직을 캡슐화하고, 모듈을 다른 파일에 쉽게 내보내거나 가져오기

### 비공개

- ES10이전에는 자바스크립트에서 '비공개'라는 개념이 존재하지 않았음.
  - 클로저를 통해 비공개를 구현하여, 선언된 모듈 내부에서만 변수와 메서드를 사용
  - 객체를 외부로 반환하되 객체에 포함된 변수를 비공개하고 싶다면, WeakMap 사용
- ES10에서 접근 제한자(`#`)를 지원

```js
const basket = []; // 비공개 변수로 외부에서 직접 읽을 수 없음
const doSomethingPrivate = () => {}; // 비공개 함수

const basketModule = {
  addItem(values) {
    basket.push(values);
  },
  // 비공개 함수를 공개 함수로 감싸기
  doSomething() {
    doSomethingPrivate();
  },
};

export default basketModule;
```

### 장단점

- 장점
  - 이해하기 쉽다.
  - 모듈 사이의 의존성을 관리하고 전역 요소를 원하는 만큼 넘겨주어 코드 유지보수를 용이하게 하고 독립적으로 만든다.
  - 비공개를 지원하여 불필요한 전역 스코프 오염을 방지한다.
- 단점
  - 이후 추가되는 메서드들은 비공개 멤버에 접근할 수 없다.
  - 단위 테스트에서 비공개 멤버는 제외되고, 핫 픽스 오류를 고칠 때 복잡도를 높인다.
  - 비공개 멤버를 직접 수정하지 못하고, 이를 사용하는 모든 공개 메서드를 살펴봐야하기 때문

### WeakMap 사용 모듈 패턴

- WeakMap 객체는 약한 참조를 가진 key-value 쌍으로 이루어진 집합체
  - key가 무조건 '객체'여야 한다.
  - 참조되지 않는 WeakMap 키는 가비지 컬렉션의 대상이 된다.
- 반환된 객체에 포함된 변수를 비공개하려면 WeakMap을 사용하면 된다.

```js
const basket = new WeakMap();
const doSomethingPrivate = new WeakMap();

class BasketModule {
  constructor() {
    basket.set(this, []);
    doSomethingPrivate.set(this, () => {});
  }
  addItem(values) {
    const basketData = basket.get(this);
    basketData.push(values);
    basket.set(this, basketData);
  }
  goSomething() {
    doSomethingPrivate.get(this)();
  }
}
```

## 3. 노출 모듈 패턴

- 모듈 패턴은 공개 변수나 메서드에 접근하기 위해서 메인 객체의 이름을 반복해서 사용해야 함.
- 노출 모듈 패턴: 모든 함수와 변수를 비공개 스코프에 정의하고, 공개하고 싶은 부분만 포인터를 통해 비공개 요소에 접근할 수 있게 해주는 익명 객체를 반환

```js
// 비공개 함수와 속성에 접근하는 공개 포인터
const RevealingModule = {
  setName: publicSetName,
  getName: publicGetName,
};

export default RevealingModule;
```
