# 참조에 의한 객체 복사

원시값(문자열, 숫자 등)은 '값 그대로' 저장, 할당, 복사되는 반면, 객체는 '참조에 의해' 저장되고 복사된다.

## 객체 생성 및 참조 복사

- 변수에 객체를 할당하게 되면 변수에는 객체가 그대로 저장되는 것이 아닌, **객체가 저장되어 있는 '메모리 주소'**, 즉 객체에 대한 '참조 값'이 저장된다.

- 마찬가지로 객체가 할당된 변수를 복사할 때는 **객체의 참조 값이 복사**된다.

- 즉 아래 코드에서는 `{name:"sona"}` 가 메모리 내 어딘가에 따로 저장이 되고, 그 공간의 메모리 주소 값이 변수 `user`에 할당된 메모리 공간에 저장이 되어서 `user` 를 통해 객체를 참조할 수 있게 되는 것이다.

  ```js
  let user = { name: 'sona' };
  let admin = user;

  user.age = 26;
  console.log(admin.age); // 26
  ```

  변수 `admin` 에는 객체의 참조값이 복사되어, 결론적으로 `user` 와 `admin` 은 같은 객체를 참조하게 된다.

<img src="https://i.imgur.com/32j2DmL.png" />

## 객체 비교

- 객체 비교 시 `==` 와 `===` 는 동일하게 동작한다.

- 두 변수가 같은 객체를 참조하는 경우 비교 시 true를 반환한다.

  ```js
  const a = { c: 1 };
  const b = a; // 참조에 의한 복사

  console.log(a == b, a === b); // true, true
  ```

- 반면 독립된 객체 비교 시 false를 반환한다.

  ```js
  const a = { c: 1 };
  const b = { c: 1 }; // 내용은 같아보여도 각자 다른 객체를 참조 중

  console.log(a == b, a === b); // false, false
  ```

- 객체에 대소 비교를 하거나 원시값과 비교를 하게 되면 [객체가 원시형으로 변환](/Language/Javascript/0.Core%20Javascript/Object%20to%20Primitive.md)된다.

## 객체 복사본 만들기

그럼 동일한 객체를 참조하는 변수를 만드는 게 아니라, 어떤 객체를 복제해서 <u>기존 객체와는 독립적인 객체를 생성</u>하고 싶다면 어떻게 할까?

### 얕은 복사(shallow copy)

1. 프로퍼티 순회하며 복사하기

   ```js
   const user = { name: 'sona', age: 26 };
   const user2 = {};

   for (let key in user) {
     user2[key] = user[key];
   }
   ```

2. `Object.assign` 사용하기

   ```js
   const rule1 = { canView: true };
   const rule2 = { canEdit: true };

   const admin = Object.assign({}, rule1, rule2);
   console.log(admi2); // {canView: true,canEdit: true};
   ```

   이는 첫번째 인수로 받은 `{}` 에 rule1, rule2의 프로퍼티들을 복사한 후 이를 반환한다.

3. `...` 연산자(스프레드 구문) 사용하기

   ```js
   const user = { name: 'sona', age: 26 };
   const user2 = { ...user };

   console.log(user === user2); // false
   ```

그러나 만약 프로퍼티 값으로 객체가 들어있다면, 즉 객체 내 중첩 객체가 존재한다면 <u>그 객체의 내용이 아닌 참조 값을 복사</u>하기 때문에, 중첩 객체는 여전히 공유하게 되는 한계점이 존재한다. 이렇게 객체의 한 단계 아래의 값만 복사하는 방법을 '**얕은 복사(shallow copy)**' 라고 한다.

### 깊은 복사(Deep copy)

그럼 중첩 객체까지 완전히 복제하고 싶다면 어떻게 해야할까?

1. `JSON.stringify()` 으로 문자열 변환 후 `JSON.parse` 로 객체 변환하기

   ```js
   const obj2 = JSON.parse(JSON.stringify(obj1));
   ```

2. Web API `structuredClone()` 사용
