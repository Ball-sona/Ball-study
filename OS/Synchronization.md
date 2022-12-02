# Synchronization

### Race Condition

- 독립적으로 실행되는 프로세스들이 서로 협력하기 위해 Shared Memory 를 통해 데이터를 공유한다.
- 이러한 공유 데이터에 대해 여러 프로세스가 동시에 접근 및 변경을 시도하는 상황을 Race Condition(경쟁 상황) 이라고 한다.
- 데이터의 일관성을 유지하기 위해 프로세스 간 동기화(순차적으로 수행)이 필요하다.

### Critical Section

- 여러 프로세스들이 공유하는 데이터에 접근하는 **Code 영역** (ex. 입출금 영역)
- 한번에 하나의 프로세스만이 Critical Section에 접근해야한다.
- Critical Section 접근 알고리즘의 조건
  - Mutual Exclusion(상호 배제) : 하나의 프로세스만이 CS에 진입해있어야한다.
  - Progress : CS에 진입해있는 프로세스가 없다면 즉각적으로 진입이 바로 가능해야한다. → 결정은 무한히 연기되서는 안된다.
  - Bounded Waiting : 프로세스가 CS에 진입할때까지 대기하는 시간에는 제한이 있어야한다.

### Critical Section 접근 알고리즘

- Shared Variables (turn)

  ```c
  int turn = 0; // 초기화 
  
  // Process 0
  while (turn != 0); // turn != 0 일동안 무한 루프 (대기)
  [Critical Section] 
  turn = 1; // turn 값을 1로 변경 
  [Remainder Section]
  
  // Process 1
  while (turn != 1); // turn != 1 일동안 무한 루프 (대기)
  [Critical Section] 
  turn = 0; // turn 값을 1로 변경  
  [Remainder Section]
  ```

  - Mutual Exclusion은 만족
  - Progress, Bounded Waiting 은 만족하지 않는다. 프로세스의 순서(P0 → P1 →..) 가 정해져있기 때문.

- Shared Variables (flag[])

  ```c
  boolean flag[2] = [false, false]; // 초기화
  
  // Process 0
  flag[0] = true;
  while (flag[1]); // flag[1]가 true일 동안 대기
  [Critical Section] 
  flag[0] = false;
  [Remainder Section]
  
  // Process 1
  flag[1] = true;
  while (flag[0]); // flag[0]가 true일 동안 대기
  [Critical Section] 
  flag[1] = false;
  [Remainder Section]
  ```

  - Mutual Exclusion은 만족
  - Progress, Bounded Waiting 은 만족하지 않는다. 프로세스의 순서는 정해져있지 않지만, flag 값이 모두 true가 되어 둘다 진입 불가 상태가 될 수 있다.

- Peterson Solution

  ```c
  int turn = false;
  boolean flag[2] = [false, false]; 
  
  // Process 0
  flag[0] = true; 
  turn = 1;
  while (flag[1] && turn == 1); // P1 차례라면 대기
  [Critical Section] 
  flag[0] = false;
  [Remainder Section]
  
  // Process 1
  flag[1] = true;
  turn = 0;
  while (flag[0] && turn == 0); // P0 차례라면 대기
  [Critical Section] 
  flag[1] = false;
  [Remainder Section]
  ```

  - 두 프로세스에서 동시에 turn 값을 변경했을때, 예를 들어 turn = 1이 미세하게 더 빨랐다면 Process 1 이 더 먼저 실행하게 된다.
  - Mutual Exclusion, Progress, Bounded Waiting 만족 → 프로세스가 상대의 순서를 서로 결정해주기 때문에, CS에 접근한 프로세스가 없다면 내 순서가 아니어도 접근이 가능하고, 무한정 대기하지도 않는다.
  - 한계
    - 3개 이상의 프로세스에 적용하기에는 확장하기 어렵다
    - 이 알고리즘이 항상 옳게 동작할거라고 증명하기가 어렵다 → NP문제

### Synchronization Instruction

- Critical Section에 들어가면서 Interrupt 를 불가능하게 막아보자.

  - User Program에서 Interrupt 를 컨트롤하는 것은 바람직하지 않다
  - 프로세스의 개수가 늘어날수록 문제 생길 소지가 생긴다.

  → 하드웨어적인 **Atomic Instruction** 으로 해결

- Atomic Instruction : 해당 명령어의 내부 연산들이 모두 실행될때까지는 절대 Interrupt 되지 않는다.

- `TestAndSet(target)` : target의 값을 반환하고, target 값을 true로 변경

- `Swap(a,b)` : a와 b 값을 변경

- 한계

  - Mutual Exclusion은 만족. Bounded Waiting은 User program에서 해결해야한다
  - 이마저도 완벽히 처리하는 것을 기대하기 어려움

### Semaphores

- 세마포어 : 2개의 Atomic Instruction 을 가지는 정수 변수
  - `P()` or `Wait()` : CS 들어갈때 수행
  - `V()` or `Signal()` : CS 나갈때 수행
  - P() → [Critical Section] → V() → [Remainder Section]
- 하나의 프로세스가 P를 수행하고 있다면 다른 프로세스는 P나 V를 수행할 수 없다.
- 2가지의 세마포어 종류
  - Binary Semaphore : value 가 0,1
    - `TestAndSet` 같은 하드웨어의 도움 받아 구현
  - Counting Semaphore : value 초기값은 접근 가능한 자원의 수
    - Binary Semaphore 이용하여 구현
    - 어떻게 구현되는지 더 이해하고 설명 . P25

### Semaphores 구현

- Busy Waiting

  - P(S) : S ≤ 0 인 동안 무한대기 하다가, S = S-1
  - V(S) : S = S+1
  - CS 진입 전까지 무한루프를 돈다 → CPU Cycle 낭비

- Sleep Queue

  - Queue 를 두어 대기 중인 프로세스들을 관리
  - 세마포어 값이 양수가 되면, 즉 CS 진입할 프로세스 개수가 늘어나면 Sleep Queue 에서 대기중인 프로세스를 깨워서 실행시킨다

  ```c
  typeof struct {
  	int value; // CS에 접근 가능한 프로세스 개수 
  	struct process *list; // 대기 Sleep Queue
  } semaphore;
  
  P(semaphore *S){
  	S->value--; 
  	if(S->value < 0){ add Process to S->list; block(); }
  }
  V(semphore *S){
  	S->value++;
  	if(S->value <=0){ remove Process to S->list; wakeup(P); }  
  }
  ```

- 커널이 싱글 스레드면 → P/V를 시스템콜로 커널 내에서 처리. 커널에 들어간게 즉 Critical Section에 들어간거다

- 커널이 멀티 스레드면 → P/V를 시스템콜로 사용하지만 커널 내에서 별도로 동기화를 해야한다.

### Semaphore 의 단점

- deadlock 발생할 가능성 존재
- 잘못 사용해버리면 (ex. P→CS→P or V→CS→P) 이에 대한 대책이 없음
- High-level 언어에서 동기화 제공하는 방법이 필요해졌다

### Deadlock

- 두개 이상의 프로세스들이 다들 대기만 끝없이 하고 있는 상황

![스크린샷 2022-12-02 18.33.16.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/09ecf0cc-94cd-401f-8efa-d64a553fb619/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-02_18.33.16.png)

### Monitor

- High-level 언어에서의 동기화 방법
- 한 순간에 하나의 프로세스만 Monitor 에서 활동하도록 보장하는 것
- 모니터 더 이해하고 정리할 것
- 애플리케이션은 P나 V 연산에 대한 고려 없이 Procedure 호출하므로서 동기화 해결 가능해짐
- ex. Transaction in Database