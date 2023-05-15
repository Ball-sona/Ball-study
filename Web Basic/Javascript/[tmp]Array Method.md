## Array Method

### sort

```javascript
let arr = [1,2,15];
arr.sort();
console.log(arr); // [1,15,2]
```

위 예시에서 arr 배열에 sort 함수를 적용했더니 (python의 sort 처럼) 알아서 오름차순으로 정렬이 될 줄 알았는데 그렇지 않음을 볼 수 있다. 
이는 sort 함수가 기본적으로 원소들을 문자열로 변환한 후 정렬하기 떄문이다. (The items are sorted as strings by defaul)
그렇다면 자바스크립트 sort 함수를 통해 오름차순, 내림차순 정렬을 하기 위해서는 .. `sort` 함수 인수로 **비교 함수**를 전달해주면 된다. 

```javascript
function compareByNumeric(a,b){
  if(a>b) return 1;
  if(a=b) return 0;
  if(a<b) return -1;
}
arr.sort(compareByNumeric);
arr.sort((a,b)=> a-b);
```

### reduce

reduce 함수는 배열의 각 요소를 돌면서 특정 수행을 반복한다는 점에서 `map`이나 `forEach`와 유사하지만, 조금 더 복잡하다. 매 요소를 돌때마다 특정 함수를 호출하는데, **이전 호출의 결과 값**을 사용할 수 있다.  reduce 함수의 기본 형식을 보자.

```javascript
arr.reduce(function(accumulator,item,index,array) {
  //...
},[initial]);
```

- accumulator : 이전 함수 호출의 결과값. 만약 함수 최초로 호출 시 `initial` 값을 사용.
- item : 현재 배열 요소
- index : 현재 배열 요소의 위치 
- array : 해당 배열 (arr.length 등 배열에 접근하기 위해 사용)

예시를 살펴보자면,

```javascript
let arr = [1,2,3,4,5];
let result = arr.reduce((sum,current)=> sum+current,0);
// 보통, 위 함수처럼 sum(accumulator), current(item) 두개의 인자만 받는다. 
```

`initial` 값을 0으로 시작하여 각 배열 요소를 누적하여 더한다. 마지막으로 더한 후 결과값은 변수 result에 담겨지게 된다. 
만약 `initial` 값을 생략하게 되면 배열의 첫번째 값을 `initial` 값으로 둔 후 함수를 호출한다. (누적값을 사용하고 싶을 때 주로 사용)

### reduceRight

`reduce` 함수와 동일한 기능을 하지만, 배열의 오른쪽부터 연산을 수행한다. 



### from





