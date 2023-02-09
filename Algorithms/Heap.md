# Heap

힙(Heap) 이란 특정한 규칙을 가지는 **완전 이진 트리(Complete Binary Tree) 의 일종**이다. 주로 우선순위 큐를 구현하는데 밑받침이 되는 자료구조로 사용된다. 트리 구조이기 때문에 삽입과 삭제에 `O(logN)` 의 시간이 소요된다.

힙의 특징 

- 힙은 이진 탐색 트리와는 다르게 **중복된 값을 허용**한다. 
- 힙은 반정렬 상태를 유지한다. 

힙은 최대힙(Max Heap) 과 최소힙(Min Heap) 으로 구분할 수 있다.

- 최대힙 : 루트 노드로 올라갈수록 값이 커지는 완전 이진 트리
- 최소힙 : 루트 노드로 올라갈수록 값이 작아지는 완전 이진 트리

**힙을 통해 빠른 시간 내에 최대값 혹은 최소값을 찾아낼 수 있다.** 배열을 이용해서 이런 힙 구조를 구현할 수 있으나, 여러 언어들이 Heap 구조 자체를 라이브러리를 통해 기본적으로 제공해준다. (그러나 JS는 그런거 따위 지원해주지 않는다)

## 부모-자식 간 관계

힙은 보통의 완전 이진 트리와는 다르게 느슨한 정렬 상태를 유지한다. 이는 부모 노드의 키 값이 자식 노드의 키 값보다 항상 큰(최소힙이라면 작은) 이진 트리임을 의미한다. 

![image](https://user-images.githubusercontent.com/67703882/217472265-d1229653-7b77-411c-a43b-5e29eb7728ca.png)

## Heap with Javascript

```js
class Heap{
  constructor(){
    this.heap = [null]; // 첫 원소는 사용하지 않는다. 
  }
}
```

배열의 첫 원소를 사용하지 않으므로 부모와 자식 간의 다음의 관계가 성립된다.

- 왼쪽 자식의 index = (부모 자식의 index) *2
- 오른쪽 자식의 index = (부모 자식의 index) *2 + 1
- 부모의 index = Math.floor(자식의 index / 2);

### 삽입 구현 (최소힙)

```js
heappush(value){
	this.heap.push(value);
  let cIdx = this.heap.length - 1; //현재 인덱스
  let pIdx = Math.floor(cIdx / 2); // 부모 인덱스
  
  while(cIdx > 1 && this.heap[pIdx] > this.heap[cIdx]){
    [this.heap[pIdx],this.heap[cIdx]] = [this.heap[cIdx],this.heap[pIdx]]; // swap
	  cIdx = pIdx;
    pIdx = Math.floor(cIdx / 2);
  }
}
```

### 삭제 구현

힙에서의 삭제는 루트 노드의 삭제를 의미한다. 루트 노드를 삭제 후에 힙의 마지막 노드를 루트 노드 자리에 가져온 후 이를 기준으로 힙을 재구성한다. 

<img src="https://user-images.githubusercontent.com/67703882/217474791-ad5fd419-2442-4841-8721-cb3a95f579ef.png" alt="image" style="zoom:50%;" />

```js
// 위 예시는 최대힙으로 되어있으나, 이 함수는 최소힙을 구현했음을 주의...
heappop(){
  const min = this.heap[1]; // root
  if(this.heap.length <= 2) this.heap = [null];
  else this.heap[1] = this.heap.pop(); // root 노드 삭제
  
  let cIdx = 1;
  let leftIdx = cIdx * 2;
  let rightIdx = cIdx * 2 + 1;
  
  if(!this.heap[leftIdx]) return min; // 왼쪽 노드 없으면 오른쪽 노드도 없음
  if(!this.heap[rightIdx]) { // 오른쪽 노드 없으면, 왼쪽 노드와 현재 노드 비교해서 swap
    if(this.heap[leftIdx] < this.heap[cIdx]) {
      [this.heap[leftIdx], this.heap[cIdx]] = [this.heap[cIdx], this.heap[leftIdx]];
    }
    return min;
  }
  // 현재 노드가 왼쪽 노드 혹은 오른쪽 노드보다 더 큰지 검사 
  while(this.heap[leftIdx] < this.heap[cIdx] || this.heap[rightIdx] < this.heap[cIdx]){
    const minIdx = this.heap[leftIdx] > this.heap[rightIdx] ? rightIdx : leftIdx;
    [this.heap[minIdx], this.heap[cIdx]] = [this.heap[cIdx], this.heap[minIdx]];
    cIdx = minIdx;
    leftIdx = cIdx * 2;
    rightIdx = cIdx * 2 + 1;
  }
  return min;
}
```



## Heap with Python

위에서 보다시피 자바스크립트는 힙과 관련된 라이브러리를 제공해주지 않아 사용하기에 불편하다.. 그래서 혹시 모르니 파이썬의 `heapq` 모듈에 대해 간단하게 알아보자.

`heapq` 모듈은 이진 트리 기반의 최소 힙 자료구조를 제공한다. 이를 사용하면 원소들이 항상 정렬된 상태로 추가 및 삭제되고, 힙에서 가장 작은 값은 언젠나 인덱스가 0이 된다. 내부적으로 최소힙 내의 모든 원소는 항상 자식 원소들보다 크기가 작거나 같도록 원소가 추가 및 삭제된다. 

### 삽입 구현

```python
from heapq import heappush

heappush(heap,4)
heappush(heap,1)
heappush(heap,7)
heappush(heap,3) // [1,3,7,4]
```

### 삭제 구현

```python
from heapq import heappush

print(heappop(heap)); // 1
print(heap); // [3,4,7]
```

### 기존 리스트를 힙으로 변환

```python
heap = [4,1,7,3,8,5];
heapify(heap); // [1,3,5,4,8,7];
```

