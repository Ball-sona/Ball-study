# Chapter 7. 자바스크립트 디자인 패턴 - 구조 패턴

## 1. 퍼사드 패턴

> 퍼사드(facade) = 실제 모습 숨기고 꾸며낸 겉모습만 세상을 드러내는 것

- 심층적인 복잡성을 숨기고, 사용하기 편리한 <u>높은 수준의 인터페이스 제공</u>하는 패턴
- 클래스의 인터페이스를 단순화하고 코드의 구현 부분과 사용 부분을 분리

### 구현 예시

```js
const addMyEvent = (el, event, fn) => {
  if (el.addEventListener) {
    el.addEventListener(event, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent(`on${event}`, fn);
  } else {
    el[`on${event}`] = fn;
  }
};
```

`addMyEvent` 내부에서 알아서 이벤트와 크로스 브라우징을 처리하고 있기 때문에, 외부에서는 해당 함수를 통해 시스템 접근하지 않고 그냥 간편하게 이벤트를 부착할 수 있다.

## 2. 믹스인 패턴

- 믹스인 = 서브 클래스가 쉽게 상속받아 기능을 재사용할 수 있도록 하는 클래스
- 최소한의 복잡성으로 객체 기능을 빌리거나 상속할 수 있게 해줘야 한다.
- 다른 여러 클래스를 아울러 쉽게 공유할 수 있는 속성과 메서드를 가진 클래스여야 한다.

### 구현 예시

```js
// 동적으로 부모 클래스를 받아 확장하는 함수
const MyMixins = (superClass) =>
  class extends superClass {
    moveUp() {}
    moveDown() {}
  };

class CarAnimator {
  moveLeft() {}
}
// CarAnimator 확장
class MyAnimators extends MyMixins(CarAnimator) {}
const myAnimator = new MyAnimators();
myAnimator.moveLeft();
myAnimator.moveUp();
```

> HOC와 다른 점은?

### 장단점

- 장점: 함수의 중복을 줄이고 재사용성을 높인다. 여러 객체 인스턴스들이 믹스인을 통해 특정 기능을 공유할 수 있음.
- 단점: 클래스나 객체의 프로토타입에 기능을 주입하는 방식은 프로토타입 오염과 함수의 출처에 대한 불확실성을 초래
  - 리액트에서는 믹스인 대신에 HOC나 hooks 사용 장려

https://www.patterns.dev/vanilla/mixin-pattern

## 3. 데코레이터 패턴

- 기존 클래스에 '동적으로 기능을 추가'하는 패턴으로, 코드 재사용을 목표
- 프로토타입 상속에 의지하기 보다는 하나의 베이스 클래스에 추가 기능을 제공하는 데코레이터 객체를 점진적으로 추가

### 구현 예시

```js
// 베이스 클래스
class Vehicle {
  constructor(type) {
    this.type = type || 'car';
    this.model = 'default';
  }
}

const truck = new Vehicle('truck');

truck.setModel = (modelName) => {
  this.model = modelName;
};
```

### 의사 클래스 데코레이터

### 추상 데코레이터

## 4. 플라이웨이트 패턴

- 연관된 객체끼리 데이터 공유하게 하면서 애플리케이션의 메모리를 최소화하는 패턴
- 여러 비슷한 객체나 데이터 구조에서 공통으로 사용되는 부분만을 하나이 외부 객체로 내보내기

### 데이터 공유

- 내재적 정보 = 개체 내부 메서드에서 필요한 정보로, 없으면 동작 X
- 외재적 정보 = 외부에 저장되어도 되는 정보

-> 같은 내제적 정보를 가진 객체를 팩토리 메서드 이용해서 하나의 공유된 객체로 대체한다.
-> 외재적 정보는 따로 관리자를 구현해서 관리

### 구현 예시

```js
const bookDatabase = {}; // Book
const bookRecordDatabase = {}; // BookRecord = Book + 해당 도서를 대출한 도서관 회원의 조합

class Book {
  constructor({ title, author, ISBN }) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
  }
}

// 고유한 ISBN 값에 대해 고유한 Book 객체가 생성되도록 보장하는 팩토리
class BookFactory {
  createBook({ title, author, ISBN }) {
    const existingBook = bookDatabase[ISBN];
    if (!!existingBook) return existingBook;
    else {
      const book = new Book({ title, author, ISBN });
      bookDatabase[ISBN] = book;
      return book;
    }
  }
}
// 도서 대출 관련 메서드(외재적 정보)를 관리하는 싱글톤 관리자
class BookRecordManager {
  addBookRecord({ id, title, author, ISBN, checkoutDate, checkoutMemberId, availability }) {
    const bookFactory = new BookFactory();
    const book = bookFactory.createBook({ title, author, ISBN });
    bookRecordDatabase[id] = {
      book,
      checkoutMemberId,
      checkoutDate,
      availability,
    };
  }

  updateCheckoutStatus({ bookId, newStatus, checkoutMemberId, checkoutDate }) {
    const record = bookRecordDatabase[bookId];
    record.availability = newStatus;
    record.checkoutMemberId = checkoutMemberId;
    record.checkoutDate = checkoutDate;
  }
}
```
