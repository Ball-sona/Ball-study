# Synchronization Examples

고전적인 동기화 문제 살펴보고 이를 해결하는 현대 방법들 알아보자.

## Bounded-Buffer Problem

하나의 버퍼가 존재하고, 이 버퍼에 접근하는 2가지 role 존재

- 생산자: 버퍼에 값을 저장. 값이 들어있지 않은 idx를 찾아서 `buffer[idx] = VAL` 수행 
- 소비자: 버퍼에서 값을 읽고 비워. 값이 들어있는 idx 찾아서 `buffer[idx] = null` 수행 

만약 여러 생산자와 소비자들이 값을 접근하려고 한다면? Race Conditon 발생 

### Semaphore solution 

3가지의 세마포어를 두어 해결해보자.

- `empty` : 버퍼에 빈 공간 있는지 확인하는 생산자들의 진입 관리
- `full` : 버퍼에 값이 들어 있는 공간이 있는지 확인하는 소비자들 집입 관리
- `mutex` : 생산자 및 소비자의 버퍼 접근 관리

```c
semaphore mutex = 1;
semaphore empty = n;
semaphore full  = 0;

/** 생산자 **/
while(true) {
	P(empty); // 버퍼에 빈공간 생겼다는 시그널을 소비자로부터 받을 때가지 대기 
	P(mutex);
/* Critical Section: 버퍼에 값 저장 */
	V(mutex);
	V(full);  // P(full)을 통해 값 들어있는 공간 접근 대기 중이던 소비자들한테 시그널
}

/** 소비자 **/
while(true) {
	P(full); 
	P(mutex);
/* Critical Section: 버퍼의 값 읽고 null 저장  */
	V(mutex);
	V(empty); // P(empty)을 통해 빈공간 접근 대기 중이던 생산자들한테 시그널
}
```

## Readers-Writers Problem

이번에도 공유 데이터가 들어 있는 버퍼가 존재하고, 이 버퍼에 접근하는 2가지 role이 있다.

- **reader**: 버퍼 값을 읽기 -> 여러 명이 동시에 읽어도 상관 없음
- **writer**: 버퍼에 값을 쓰기 -> <u>writer가 쓸 때는 그 누구도 공유 데이터를 읽어서도 써서도 안됨</u>

### Semaphore solution 

1개의 정수 값과 2개의 세마포어 통해 해결해보자.

- int `readcount` : 현재 버퍼에 접근 중인 reader 수 
- semaphore `wrt` : 버퍼에 값을 쓰고자 하는 writer 들의 접근 관리
- semaphore `mutex` : <u>readcount와 wrt 값에 접근이 원자적으로 수행되도록 보장</u>하는 세마포어

```c
semaphore mutex = 1;
semaphore wrt = 1;
int rc = 0;


/** reader **/
while(true) {
	P(mutex);
	rc++; 
  // 현재 버퍼에 접근하는 reader가 나밖에 없다면 바로 읽자 -> 현재 작업 중인 writer 있다면 대기
	if(rc == 1) P(wrt); 
	V(mutex);
/* Critical Section: read data from buffer */ 
  P(mutex);
  rc--;
  // 현재 버퍼에 접근하는 reader가 따로 없다면 -> 대기 중이었던 writer 중 하나 깨우도록 signal
  if(rc == 0) V(wrt);
  V(mutex);
}

/** writer **/
while(true) {
	P(wrt); 
/* Critical Section: write data to buffer */
	V(wrt); 
}
```

- 첫번째 reader, 즉 rc++ 결과가 1인 reader가 P(wrt)만 통과한다면, 다른 reader들은 P(mutex) 통과 후 언제든지 read 실행 가능
- 근데 이렇게 되면 reader이 계속 진입 시, rc가 0이 되지 않아서 writer가 연산을 못해.. > starvation

## Dining-Philosophers Problem

마지막으로 **deadlock와 starvation 없이 여러 스레드에게 여러 자원을 할당해야 할 필요**에 관한 문제이다.

5명의 철학자가 원형 식탁에서 밥을 먹을 건데 젓가락이 5개 뿐임. 

### Semaphore solution

5개의 젓가락에 대한 각각의 세마포어를 두어, 특정 사람이 특정 젓가락을 집고 놓는 행위를 임계 구역으로 설정해보자. 

```c
semaphore chop[5]; // 모두 1로 초기화

while(true) {
	P(chop[i]);
  P(chop[(i+1%5)]);
/** eat dinner.. */
  V(chop[i]);
  V(chop[(i+1%5)]);
}
```

철학자들은 양쪽에 놓인 젓가락을 모두 잡을 때까지 기다렸다가 2개의 세마포어를 획득 완료하면 비로소 밥을 먹는다.

이는 동시에 두 철학자가 밥을 먹지 않는 상호 배제를 만족하지만, deadlock 야기 가능.

이러한 deadlock 해결 위해 

### Monitor Solution

```c
enum {THINKING, HUNGRY, EATING} state[5];
semaphore self[5];  // 젓가락 두개를 다 집을 때까지
semaphore mutex;    // 젓가락 집거나 놓는 행위를 관리

void test(int i) {
  // 내가 현재 배고프고, 내 양쪽 인간들이 밥을 안먹고 있다면 -> 비로소 밥 먹을 수 있음
 	if(state[i] == HUNGRY && state[LEFT] != EATING && state[RIGHT] != EATING) {
    state[i] = EATING; // 밥 먹기 시작
    V(self[i]); // 나에 대한 self 세마포어 접근 가능하도록 signal
  }
}

void take_chop(int i) {
  P(mutex);
  state[i] = HUNGRY; 
  test(i); // 내가 밥을 먹을 수 있는지 확인
  V(mutex);
  P(self[i]); // 대기 -> test에서 밥 먹을수 있는 상태인지 확인 후 V(self[i])를 했다면 대기 중지 후 식사 시작 
}

void put_chop(int i) {
  P(mutex);
  state[i] = THINKING;
  test(LEFT);  // 양쪽 사람 중 한명이 밥 먹을 수 있는 상태라면 -> V(self[LEFT]) -> 대기 중이던 옆 사람이 밥먹기 시작할 것
  test(RIGHT);
  V(mutex);
}

while(true) {
/** think */
  take_chop(i);
/** eat */
  put_chop(i);
}
```

