# Stack and Queue

## Stack

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

