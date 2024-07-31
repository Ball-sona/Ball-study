# Stack/Queue

기본 중에 기본인 스택과 큐에 대해 알아보자. (근데 이제 JS를 곁들여서..)

## Stack

스택은 LIFO(Last in First out)원칙 하에 운용되는 자료구조이다. 먼저 들어온 원소가 나중에 나갈 수 있다.

Javascript에서 스택의 구현은 비교적 쉽다. 스택 배열의 가장 마지막 원소만 접근하면 되므로, 원소 삽입은 `push` 로, 원소 삭제는 배열의 마지막값 삭제로 구현하면 된다. 시간 복잡도도 O(1)로 빠르다.

```js
const Stack = [];

Stack.push(1);
Stack.push(2);
Stack.push(3);
Stack.slice(0, Stack.length - 1);
```

## Queue

큐는 FIFO(First in First out) 원칙 하에 운용되는 자료구조이다. 먼저 들어온 원소가 먼저 나갈 수 있다.

큐에서 데이터가 삽입되는 곳을 `rear`, 데이터가 삭제되는 곳을 `front` 라고 한다. `front` , `rear` 의 위치를 이동하며 큐의 삽입 및 삭제를 구현하는 방식은 시간복잡도가 O(1)이다.

반면 Javscript에서 큐의 `enqueue` 메서드는 `push` 메서드를 통해 구현하고, `dequeue` 메서드는 `shift` 메서드를 통해 구현할 수 있다. 그러나 `shift()` 메서드를 이용하여 맨 앞 원소를 제거하면 나머지 배열 원소에 대한 재정렬이 이루어지기 때문에, 본래 큐 자료구조의 시간 복잡도와 상당한 차이가 발생하게 된다.

따라서 아래와 같은 방식으로 큐 클래스를 구현할 수 있다.

```js
// front,rear 이용한 방식
class Queue {
  constructor() {
    this.queue = [];
    this.front = 0; // 첫 원소 가리키는 포인터
    this.rear = 0; // 마지막 원소를 가리키는 포인터
  }
  enqueue(value) {
    this.queue[this.rear++] = value;
  }
  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;
    return value;
  }
  size() {
    return this.rear - this.front;
  }
  isEmpty() {
    return this.queue.length === 0;
  }
}

// push, shift 메서드를 이용한 방식
class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(item) {
    return this.items.push(item);
  }
  dequeue() {
    return this.items.shift();
  }
  isEmpty() {
    return this.items.length === 0;
  }
}
```

## Deque

덱은 Double-Ended Queue의 줄임말로, 한쪽에서만 삽입. 다른 한쪽에서만 삭제가 가능했던 큐와 달리 `front` , `rear` 에서 삽입 및 삭제가 모두 가능한 큐를 의미한다.

선언 이후 크기를 줄이거나 늘릴 수 있는 가변적 크기를 갖는다.

## 관련 문제

[프로그래머스 스택/큐](https://school.programmers.co.kr/learn/courses/30/parts/12081)
