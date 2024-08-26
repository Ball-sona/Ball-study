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

프로토타입 객체를 통해 <u>모든 인스턴스들이 공통 메서드를 공유</u>할 수 있도록 할 수 있다.

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

## 4. 싱글톤 패턴

- 클래스의 인스턴스가 오직 하나만 존재하도록 제한하는 패턴
- 전역에서 접근 및 공유해야 하는 단 하나의 객체가 필요할 때 유용하다.

### 구현 예시

```js
let instance;
const randomNumber = Math.random();

class MySingleTon {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }
  getRandomNumber() {
    return randomNumber;
  }
}

const singleA = new MySingleTon();
const singleB = new MySingleTon();
console.log(singleA === singleB); // true
console.log(singleA.getRandomNumber() === singleB.getRandomNumber()); // true
```

### 특징

- 인스턴스가 정확히 하나만 있어야 하고, 접근 용이한 곳에 위치해야 한다.
- 인스턴스에 대한 전역 접근이 허용된다.
- 정적 클래스나 객체와는 다르게 <u>초기화를 지연</u>시킬 수 있다.
  - 필요할 때까지 리소스나 메모리 소모하지 않도록 지연 생성
- 서브클래싱을 통해서만 확장할 수 있어야 한다.

>  싱글톤을 정적 인스턴스로 구현했다 하더라도, 필요할 때까지는 리소스나 메모리를 소모하지 않도록 지연 생성될 수 있다?

>  자바스크립트에서 싱글토이 필요하다는 것은 설계를 다시 생각해봐야 한다는 신호일수도 있다..? 싱클톤 클래스 만드는 대신에 직접 객체 하나를 생성해도 되기 때문.?

## 5. 프로토타입 패턴

- 이미 존재하는 객체를 복제해 만든 템플릿을 기반으로 새 객체를 생성하는 패턴
- 프로토타입 상속 기반 = 클래스를 정의하고 이를 상속받는 방식이 아니라, 존재하는 다른 객체를 '복제'하는 방식임.
- 생성자 함수의 프로토타입이 name 속성을 가지고 있다면 -> 해당 생성자 함수를 사용해 만들어진 객체는 모두 name 속성을 가지게 된다.

- 자바스크립트에서 클래스와 생성자도 결국 내부적으로 함수와 프로토타입으로 컴파일된다.

### 구현 예시

어떻게 프로토타입 상속 구현할까?

```js
const myCar = {
  id: 1,
  name: 'GV80',
  drive: () => console.log('im driving!');
}
const yourCar = Object.create(myCar, {
  id: {
    value: GLOBAL.nextId(),
    enumberable: true,
  }
}); 
```

> 차등 상속? 

> 프로토타입 관계는 객체 속성을 나열할 때 문제를 일으킬 수 있으므로 `hasOwnProperty()` 로 속성 체크하는 게 좋다?

```js
class Vehicle extends VehiclePrototype {
 	constructor(model) {
    super(model);
  }
}
```

`extends` 키워드를 사용해서 프로토타입 상속 가능하다. 

>  단, 이 방식은 읽기 전용 속성을 사용할 수 없다.

```js
const beget = (() => {
  class F {
    constructor() {}
  }
  return proto => {
    F.prototype = proto;
    return new F();
  }
})();
```

## 6. 팩토리 패턴

- 필요한 타입의 팩토리 객체를 생성하는 방법을 제공하는 패턴
- 동적 요소나 애플리케이션 구조에 깊게 의지하는 등의 상황처럼 객체 생성이 복잡할 때 유용

### 구현 예시

```js
class VehicleFactory {
  constructor() {
    this.vehicleClass = Car;
  }
  createVehicle(options) {
    const { type, ...customOptions } = options;
    switch (type) {
      case 'car':
        this.vehicleClass = Car;
        break;
      case 'truck':
        this.vehicleClass = Truck;
        break;
    }
    return new this.vehicleClass(customOptions);
  }
}

const vehicleFactory = new VehicleFactory();
const car = vehicleFactory.createVehicle({
  type: 'car',
  color: 'yellow',
});

const truck = vehicleFactory.createVehicle({
  type:'truck',
  color:'black'
})
```

> 객체 생성 과정을 인터페이스 뒤에 추상화한다..

### 언제 유용한가?

- 객체나 컴포넌트 생성 과정이 복잡한 경우
- 상황에 맞춰 다양한 객체 인스턴스를 편리하게 생성할 수 있는 방법이 필요할 때
- 같은 속성을 공유하는 여러 작은 객체나 컴포넌트를 다뤄야할 때
- 덕 타이핑 같은 API 규칙만 충족하면 되는 다른 객체의 인스턴스와 함께 객체를 구성할 때 

## 7. 추상 팩토리 패턴

- 같은 목표를 가진 팩토리들을 하나의 그룹으로 캡슐화하는 패턴 
- 객체의 생성 과정에 영향을 받지 않아야 하거나 여러 타입의 객체로 작업해야 하는 경우 

### 구현 예시

```js
class AbstractVehicleFactory {
  constructor() {
    this.types = {};
  }
  getVehicle(type, customOptions) {
    const Vehicle = this.types[type];
    return Vehicle ? new Vehicle(customOptions) : null;
  }
  registerVehicle(type, Vehicle) {
    const proto = Vehicle.prototype;
    if (proto.drive && proto.breakDown) {
      this.types[type] = Vehicle;
    }
  }
}

const abstractVehicleFactory = new AbstractVehicleFactory();

abstractVehicleFactory.registerVehicle('car', Car);
abstractVehicleFactory.registerVehicle('car', Truck);

const car = vehicleFactory.getVehicle('car', {
  color: 'yellow',
});
```

- 추상 팩토리 `AbstractVehicleFactory` 는 차량 타입만 정의
- 구체적 팩토리는 차량의 공통 기능을 충족하는 클래스만 구현

