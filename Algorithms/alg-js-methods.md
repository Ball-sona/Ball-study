# Javascript Methods

자바스크립트를 사용하여 알고리즘 풀이를 할 때 많이 사용되는 함수들과 그밖의 문법들을 정리해보자.

- 배열 관련 함수
- 문자열 관련 함수
- 객체 관련 함수
- Set 관련 함수
- 반복문
- JS 주의사항

## Array Methods

```
const arr = [1,2,3,4,5];
```

### slice()

`slice(start,end)` : 인덱스가 `start` 인 애부터 `end-1` 인 원소까지 잘라서 새로운 배열 추출

```js
arr.slice(2); // [3,4,5];
arr.slice(2,4); // [3,4];
arr.slice(-2); // [4,5];
arr.slice(); // [1,2,3,4,5];
```

### splice()

`splice(start, deleteCount, item1...itemN?)` : 인덱스가 `start` 인 원소부터 `deleteCount` 만큼 삭제 후, `item` 이 있다면 삭제한 자리에 삽입. 제거한 원소들을 배열로 반환한다.

```js
const arr2 = arr.splice(3,1); // arr:[1,2,3,5] arr2:[4]
const arr3 = arr.splice(2,0,'3'); //arr:[1,2,'3',3,5]; arr3:[] 
```

### join()

`join(separator)` : 배열의 요소들을 합친 새로운 문자열을 반환한다. 이때 인자로 `seperator` 가 주어지면, 요소와 요소 사이마다 `separator`가 들어가게 된다.

```js
arr.join(); // "12345"
arr.join('-'); // "1-2-3-4-5"
```

### sort()

`sort(compareFunction)` : 비교함수를 인자로 넣어주지 않으면 요소를 문자열로 변환하여 **유니코드 포인트 순서**로 비교하여 정렬한다.

- 오름차순 정렬 함수 : `(a,b) => a-b`
- 내림차순 정렬 함수 : `(a,b) => b-a`

### fill()

`fill(value,start,end)` : 기존 배열의 원소 중 인덱스가 `start` 인 애부터 `end-1` 인 애들을 모두 `value` 로 교체한다. 교체 후 새로운 배열을 반환한다.

```js
arr.fill(0,1,3); // [1,0,0,4,5]
arr.fill(0,2); // [1,2,0,0,0]
arr.fill(0); // [0,0,0,0,0]
```

### filter()

`filter(callbackFn)` : 기존 배열의 원소 중  `callbackFn` 을 수행했을 때 `true` 값이 나오는 원소들을 묶어 새로운 배열 추출

```js
arr.filter(num => num > 3) // [4,5]
```

### reduce()

`reduce` 메서드는 배열의 각 원소마다 인자로 받은 콜백 함수를 실행하는데, 해당 함수의 반환값을 다음 인자의 계산에 넘길 수 있다. 콜백 함수 형태를 살펴보면 다음과 같다.

```js
(accumulator, currentValue, currentIndex, array) => { /* … */ }
```

위에서 `accumulator` 가 콜백 함수가 이전 단계에서 반환하여 전달해준 값이다. `reduce` 함수의 2번째 인자로 `initialValue` 를 넣어주면, 첫 콜백 함수 호출시 해당 값이 `accumulator` 가 된다. (생략 시 0임) 

이외에도 `currentValue` 는 현재 순서의 배열 원소 값이고, `array` 는 `reduce` 메서드를 호출한 원 배열이다.

```js
arr.reduce((acc,cur) => acc+cur); // [1,3,7,11,16]
```

### find()

`find(callbackFn)` : 배열의 원소들 중에서 인자로 전달받은 콜백 함수를 만족하는 요소들 중 **첫번째 요소**를 반환한다.

```js
arr.find((n) => n > 2); // 3
```

### findIndex()

`findIndex(callbackFn)` : 배열의 원소들 중에서 인자로 전달받은 콜백 함수를 만족하는 요소들 중 **첫번째 요소의 인덱스**를 반환한다.

```js
arr.findIndex((n) => n > 2); // 4
```



## String Methods 정리

```js
const str = "Javascript";
```

### substring()

`substring(indexStart, indexEnd?)` : 문자열 내 문자들 중 인덱스가 `indexStart` 인 애부터 `indexEnd-1` 인 애까지를 잘라 반환

```js
str.substring(1,3); // "av"
str.substring(2); // "vascript"
```

### slice()

`slice(indexStart, indexEnd?)` : 문자열 내 문자들 중 인덱스가 `indexStart` 인 애부터 `indexEnd-1` 인 애까지를 잘라 반환

```js
str.slice(1,3); // "av"
str.slice(2); // "vascript"
str.slice(); // "Javascript"
```

> **substring vs slice**
>
> 만약 indexStart > indexEnd 라면 `substring` 은 둘을 바꿔서 처리(ex. substring(5,3) -> substring(3,5))하는 반면, slice는 비어있는 문자열("") 를 반환한다. 

### split()

`split(seperator,limit)` : `seperator` 를 기준으로 문자열을 나눠 배열로 반환한다. `limit` 은 반환할 배열 원소 개수 제한이다. 

```js
str = "JS and TS"
str.split(" "); // ["JS", "and", "TS"];
str.split(); // ["JS and TS"]
```

### localeCompare()

`refStr.localeCompare(compareStr)` : `refStr` 와 `compareStr` 를 비교한다. 

```js
a.localCompare(b); // a와 b가 같으면 0. a가 크면 1 a가 작으면 -1반환
```



## Object Methods

### Object.keys(`obj`)

객체의 키들을 담은 배열을 반환

```js
Object.keys({ a: 1, b: 2, c: 3 });
[a, b, c];
```

### Object.values(`obj`)

객체의 값들을 담은 배열을 반환

```js
Object.values({ a: 1, b: 2, c: 3 });
[1, 2, 3];
```

### Object.assign(`target`,`source`)

target 객체에 source 객체를 병합하여 새로운 target 객체를 반환한다. 이때 겹치는 요소들은 중복되지 않는다.

```js
Object.assign({ a: 1, b: 2 }, { b: 2, c: 3 }); // {a:1,b:2,c:3}
```

### Object.entries(`obj`)

<key, value> 쌍을 담은 배열을 반환

```js
for (const [key, value] of Object.entries({ a: 1, b: 2 })) {
  console.log(key, value); // a,b // 1,2
}
```



## Set Methods

`Set` 객체는 자료형에 관계 없이 원시 값과 객체 참조 모두 **유일한 값으로 저장**할 수 있다.

- 값 추가는 `add`
- 값 삭제는 `delete`
- 값 존재 여부는 `has`
- 요소 개수는 `length` 가 아니라 `size` 임을 주의

```js
const mySet = new Set();

mySet.add(1); // {1}
mySet.add(5); // {1,5}
mySet.add(5); // {1,5}

mySet.has(1); // true
mySet.size; // 2
mySet.delete(5);
```

- 반복은 `of` 이나 `forEach` 사용 가능

```js
for (let item of mySet) console.log(item);
mySet.forEach((item) => console.log(item));
```

- Set 을 Array 으로 변환 가능

```
var myArr = Array.from(mySet);
var myArr = [...mySet];
```

- Array 를 Set 으로 변환 가능

```js
var mySet = new Set([1, 2, 1, 1]); // {1,2}
```



## Javascript Iterators 

1. `for(let i=0;i<arr.length;i++)`
2. `arr.forEach(a=>{})`
3. `for(let i of arr)`
   - `return false` 로 break 가능하다.

## Javacsript 관련 주의 사항

- `NaN` 값에 대한 비교 연산에는 `===` 를 사용할 수 없다. 따라서 `isNaN` 함수를 사용한다.
- `[] === []` 가 true가 아니다. 빈배열인지 확인하고 싶다면 `arr.length === 0` 을 사용하자..
- `parseInt` 함수는 문자열에 숫자가 아닌 문자가 나오면 앞 문자까지만 정수로 변환하고 멈춘다.




