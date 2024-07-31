# JSON

JSON(Javascript Object Notation)은 값이나 객체를 나타내주는 범용 포맷이다.

## JSON.stringify

`JSON.stringify` 메서드는 인수로 받은 객체를 문자열로 변환해준다.

```js
const user = { name: 'sona', age: 26 };
const userStr = JSON.stringify(user); // {"name":"sona", "age":26}
```

- 반환된 문자열은 <u>JSON으로 인코딩된, 직렬화 처리된, 문자열로 변환된, 결집된 객체</u> 라고 부른다.
- 객체 내 문자열과 객체 프로퍼티 이름은 모두 큰따옴표로 감싸야 한다.
- 객체 뿐만 아니라 원시값에도 적용할 수 있다. 원시값이 인수로 오면 그냥 값을 다시 반환한다. (문자열엔 큰따옴표 추가)
- 프로퍼티 값이 메서드나 `undefined` 이거나 키가 심볼형이라면, 해당 프로퍼티는 무시된다.
- 만약 객체에 순환 참조가 존재하면 에러가 발생한다.
- 만약 변환할 객체 내부에 `toJSON` 메서드가 구현되어 있다면, `stringify` 는 이를 자동적으로 호출한다. Date 객체의 내장 메서드 `toJSON` 가 대표적인 예시이다.

### replacer

만약 특정 프로퍼티만 JSON으로 인코딩하고 싶다면 `stringify` 메서드의 두번째 인자에 원하는 프로퍼티만 담은 배열이나 매핑 함수를 넣어주면 된다.

```js
const user = { name: 'sona', age: 26 };

const nameStr = JSON.stringify(user, ['name']); // {"name":"sona"}
const ageStr = JSON.stringify(user, (key, value) => {
  return key === 'age' ? value : undefined;
}); // {"age": 26}
```

### space

가독성을 높이기 위해 세번째 인자로 `space` 값을 전달하면, 해당 값만큼 들여쓰기를 한다.

## JSON.parse

`JSON.parse` 메서드는 JSON으로 인코딩한 객체를 다시 객체로 디코딩해준다.

```js
const userStr = "{"name":"sona", "age":26}";
const userObj = JSON.parse(userStr); // {name:'sona', age:26}
```

- 빠르고 신뢰도 높은 파싱 알고리즘을 위해서 `parse` 인수로 들어갈 수 있는 JSON 포멧이 까다롭다.
  - 프로퍼티 키, 문자열 값은 반드시 큰따옴표로 감싸진 문자열이어야 한다.
  - `new` 생성자를 넣을 수 없다.
  - 주석도 들어갈 수 없다.
- 만약 포멧에 맞추지 않고 객체를 전달하면 에러가 발생한다. 좀 더 유연한 포멧을 지원하는 JSON5 라이브러리도 있다.

### reviver

```js
const str = '{"date": "2024-01-09T05:48:35.657Z"}';
const obj = JSON.parse(str, (key, value) => {
  return key == 'date' ? new Date(value) : value;
});
console.log(obj.date.getDate());
```
