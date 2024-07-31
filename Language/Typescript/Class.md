## Class

Typescript를 사용하므로서 객체 지향적 클래스 기반 접근 방식을 쉽게 사용 가능하다.

```ts
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distance: number = 0) {
    console.log(`${name} moved ${distance}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name);
  } // this에 있는 프로퍼티에 접근하기 전에 super를 먼저 호출.
  move(distance = 5) {
    super.move(distance);
  }
}

const sam = new Snake('Sam');
sam.move(); // Sam moved 5m.
```

#### Public. Private. Protected, Readonly Modifiers

- 기본적으로 각 멤버의 필드는 public 이다. -> 생략 가능

- `#name:string` 처럼 #을 프로퍼티 앞에 붙이면 private 필드가 된다. -> 클래스 외부에서 접근 불가능

- protected 로 선언된 멤버를 해당 클래스와 파생된 클래스(자식) 내에서만 접근 가능

  ```ts
  class Person {
    protected name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
  class Employee {
    private dept;
    constructor(name: string, dept: string) {
      super(name);
      this.dept = dept;
    } // 파생 클래스 인스턴스 내에서 사용 가능
  }

  const sona = new Employee('sona', 'dev');
  console.log(sona.name); // 클래스 외부에서는 사용 불가능
  ```

  만약 위 예시에서 Person의 생성자에 private을 부여하면, `const sona2 = new Person('sona')` 처럼 직접 인스턴스 생성이 불가능하다.

- readonly 가 붙은 프로퍼티는 값 변경이 불가능하다.

#### Accessor(접근자)

set/get

#### Static Properties

#### Abstract Classes

- 추상 클래스는 다른 클래스들이 파생될 수 있는 기초 클래스로, 직접 인스턴스화 할 수 없다.
- 추상 클래스 내에서 abstract 가 붙은 메서드는 반드시 파생 클래스에서 구현이 되어야한다.
- abstract가 붙지 않은 메서드는 (인터페이스와 다르게) 추상 클래스 내에서 구현이 가능하다.
