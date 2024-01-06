# 참조에 의한 객체 복사

원시값(문자열, 숫자 등)은 '값 그대로' 저장, 할당, 복사되는 반면, 객체는 '참조에 의해' 저장되고 복사된다.

## 객체 생성 및 복사

- 변수에 객체를 할당하게 되면 변수에는 객체가 그대로 저장되는 것이 아닌, **객체가 저장되어 있는 '메모리 주소'**, 즉 객체에 대한 '참조 값'이 저장된다.

- 마찬가지로 객체가 할당된 변수를 복사할 때는 객체의 참조 값이 복사된다.

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

- 객체에 대소 비교를 하거나 원시값과 비교를 하게 되면 **객체가 원시형으로 변환**된다.

## 객체 복제

앞서 말했듯이 객체가 할당된 변수를 복사하면 새로운 객체가 생성되는 게 아니라 동일한 객체에 대한 참조 값이 하나 더 만들어진다. 그럼 진짜 어떤 객체를 복제해서 <u>기존 객체와는 독립적인 객체를 생성</u>하고 싶다면 어떻게 할까?

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

   위에서 `assign` 메서드는 첫번째 인수로 받은 `{}` 에 rule1, rule2의 프로퍼티들을 복사한 후 이를 반환한다.

3. `...` 연산자 사용하기

   ```js
   const user = { name: 'sona', age: 26 };
   const user2 = { ...user };
   ```

그러나 만약 프로퍼티 값에 객체가 존재한다면 위 방식들은 **해당 객체의 참조 값을 복사**하기 때문에, 만약 원본 객체이 내부 객체 값(ex. `user.info.age`) 변경 시 복제된 객체의 값도 변경된다.

따라서 중첩 객체의 값까지 복사하지 못하고, 바로 아래 단계의 값만 복사하는 방법을 '**얕은 복사(shallow copy)**' 라고 한다.

### 깊은 복사(Deep copy)
