# 프로퍼티 플래그와 설명자

객체 프로퍼티가 단순히 '키-값'으로 구성되어 보이지만, 사실 값과 함께 <u>flag라 불리는 특별한 속성 3가지</u>를 갖는다.

## Property Flag

```js
const user = { name: 'sona' };

console.log(Object.getOwnPropertyDescriptor(user, 'name'));
/* property descriptor:
{
  "value": "sona",
  "writable": true, 
  "enumerable": true,
  "configurable": true
}
*/
```

- 쓰기 가능(`writable`) : 할당 연산자를 통해 속성값을 변경할 수 있는지 여부
- 열거 가능(`enumerable`): 객체 속성을 열거할 때 해당 속성을 표시할지 여부. 해당 속성이 false 이면 `for..in` 나 `Object.keys()` 사용시 해당 프로퍼티가 나타나지 않는다.
- 구성 가능(`configurable`): 속성 유형을 변경하거나 객체에서 속성을 삭제할 수 있는지 여부. 해당 속성을 한번 false로 설정하면 `Object.defineProperty` 를 사용해서도 true로 되돌릴 수 없다.

위 플래그들의 기본값은 모두 `true` 이며, 언제든 수정 가능하다.

## Descriptor

프로퍼티 값과 3개의 프로퍼티 플래그가 담긴 객체를 **프로퍼티 설명자(descriptor)** 라고 한다.

## 관련 메서드

### Object.getOwnPropertyDescriptor

앞서 보았듯, `Object.getOwnPropertyDescriptor` 를 통해 특정 프로퍼티에 대한 플러그를 포함한 정보를 모두 얻을 수 있다.

### Object.defineProperty

`Object.defineProperty` 를 통해 플래그를 변경할 수 있다.

```js
Object.defineProperty(user, 'name', {
  writable: false,
});
user.name = 'ball'; // Error
```

`user` 객체의 `name` 프로퍼티의 `writable` 속성 값을 변경하여 해당 값을 변경할 수 없도록 했다.

### Object.defineProperties

`Object.defineProperties` 를 통해 여러 프로퍼티를 한번에 정의할 수 있다.

```js
Object.defineProperties(user, {
  name: { value: 'sona', writable: false },
  age: { value: 26, enumerable: false },
});
```

### Object.getOwnPropertyDescriptors

`Object.getOwnPropertyDescriptors ` 를 사용하면 프로퍼티 설명자를 한꺼번에 전부 꺼내올 수 있다.

```js
Object.getOwnPropertyDescriptors(user);
```

## 이 외 객체 수정 관련 메서드

하나의 프로퍼티 대상이 아닌, <u>객체 프로퍼티 전체를 대상</u>으로 하는 메서드들에 대해 알아보자.

### Object.preventExtensions(obj)

객체에 프로퍼티를 추가할 수 없게 한다.

### Object.seal(obj)

새로운 프로퍼티를 추가하거나 기존 프로퍼티를 삭제할 수 없게 한다.

> 프로퍼티 전체에 `configurable:false` 를 설정하는 것과 동일

### Object.freeze(obj)

새로운 프로퍼티 추가나 기존 프로퍼티 삭제, 수정을 막는다.

> 프로퍼티 전체에 `configurable:fals, writable:false` 를 설정하는 것과 동일

위 메서드들을 통해 제약사항이 걸려있는지 유무는 `Object.isExtensible(obj)`, `Object.isSealed(obj)`, `Object.isFrozen(obj)` 를 통해 알 수 있다.
