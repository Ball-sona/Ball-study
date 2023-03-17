# Javascript Methods

## Array Methods 정리 

- #### slice()

- #### splice()

- #### join()

- #### sort()

  - `sort([compareFunction])`
  - 비교함수를 인자로 넣어주지 않으면 요소를 문자열로 변환하여 유니코드 포인트 순서로 비교하여 정렬한다. 

  - 오름차순 정렬 함수 : `(a,b) => a-b`
  - 내림차순 정렬 함수 : `(a,b) => b-a`

- #### fill()

- #### filter()

- #### reduce()

- #### find()

  - `find(callbackFn)`

  - 배열에서 find 함수 내 testing 함수를 만족하는 요소들 중 첫번째 요소를 반환한다.
  - callbackFn 은 특정 값을 반환하는 함수여야한다. 

  ```js
  [1,2,3,4].find((n)=>n>2); // 2
  ```

- #### findIndex()

  - `findIndex(callbackFn)`
  - 배열에서 findIndex 함수 내 testing 함수를 만족하는 요소들 중 첫번째 요소의 인덱스를 반환한다. 

  ```js
  [10,20,30,40].findIndex(n=>n>30); // 2
  ```

  

## String Methods 정리

- #### substr()

- #### slice()

- #### split()

- - 
  - 

- #### localeCompare()

  - `refStr.localeCompare(compareStr)` 

  - `a.localeCompare(b)` 는 a와 b가 같으면 0. a가 크면 1 a가 작으면 -1반환



## Object Methods

- #### Object.keys(`obj`) 

  객체의 키들을 담은 배열을 반환

  ```js
  Object.keys({a:1, b:2, c:3}); [a,b,c];

- #### Object.values(`obj`)

  객체의 값들을 담은 배열을 반환

  ```js
  Object.values({a:1, b:2, c:3}); [1,2,3];
  ```

- #### Object.assign(`target`,`source`)

  target 객체에 source 객체를 병합하여 새로운 target 객체를 반환한다. 이때 겹치는 요소들은 중복되지 않는다. 

  ```js
  Object.assign({a:1,b:2},{b:2,c:3}); // {a:1,b:2,c:3}
  ```

- #### Object.entries(`obj`)

  [키, 값] 쌍을 담은 배열을 반환

  ```js
  for(const [key,value] of Object.entries({a:1,b:2})){
    console.log(key,value); // a,b // 1,2
  }
  ```

  

## Set 사용하기 

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
for(let item of mySet) console.log(item);
mySet.forEach(item => console.log(item));
```

- Set 을 Array 으로 변환 가능

```
var myArr = Array.from(mySet);
var myArr = [...mySet];
```

- Array 를 Set 으로 변환 가능

```js
var mySet = new Set([1,2,1,1]); // {1,2}
```



## Queue

- FIFO(First in First out) 원칙 하에 운용되는 자료구조

- `shift()` 메서드를 사용하면 배열의 가장 앞에 있는 원소부터 하나씩 제거할 수 있으므로 이를 사용하여 큐를 구현할 수 있다. 하지만 `shift()` 메서드를 이용하여 맨 앞 원소를 제거하면 나머지 배열 원소에 대한 재정렬이 이루어지기 때문에, 본래 큐 자료구조의 시간 복잡도와 상당한 차이가 발생하게 된다. 

- 따라서 아래와 같이 큐 클래스를 구현할 수도 있다. 

  ```js
  class Queue {
    constructor(){
      this.queue = [];
      this.front = 0; // 첫 원소 가리키는 포인터
      this.rear = 0; // 마지막 원소를 가리키는 포인터
    }
    
    enqueue(value){
      this.queue[this.rear++] = value;
    }
    dequeue(){
      const value = this.queue[this.front];
      delete this.queue[this.front];
      this.front++;
      return value;
    }
    size(){
      return this.rear - this.front;
    }
  }
  ```



## 반복문

1. `for(let i=0;i<arr.length;i++)`
2. `arr.forEach(a=>{})`
3. `for(let i of arr)`
   - return false 로 break 가능하다. 

## JS 주의 사항

- `NaN` 값에 대한 비교 연산에는  `===` 를 사용할 수 없다. 따라서 `isNaN` 함수를 사용한다. 
- `[] === []` 가 true가 아니다.... 빈배열인지 확인하고 싶다면 `arr.length === 0` 을 사용하자..
- `parseInt` 함수는 문자열에 숫자가 아닌 문자가 나오면 앞 문자까지만 정수로 변환하고 멈춘다. 

