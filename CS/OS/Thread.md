# Thread

## 스레드란?

- Execution Unit (프로세스보다 작은 단위)
- 프로세스 내 실행 흐름.
- Cooperative Process와는 다르게 IPC가 필요하지 않음. (같은 프로세스 내 논리적 실행 흐름이니까)
- Process 내에서 협력하는 스레드를 만든다면. 프로세스보다 적은 비용으로 사용 가능

- Thread 수가 증가하면 CPU 사용도가 증가. = CPU가 많을수록 스레드 많이 이용하는게 유리.
- Thread Switching 비용이 증가해서.. 임계점 이후에는 throughout 떨어짐

## Process 와 Thread

- Process
  - 하나의 스레드와 같은 실행 흐름
  - 프로세스의 가상 메모리 각자 독립적. 서로 영역에 접근하기 어려움.
  - Context Switching 비용이 많이 든다
- Thread
  - 하나의 프로세스 안에 여러개의 스레드 존재.
  - 여러 스레드가 가상 메모리에서 Code, Data 영역을 공유함.
  - Context Switching 비용이 적게 든다 → 프로세스보다 각 스레드가 가지는 고유 정보 수가 적기 때문에.

## Thread 구성 요소

- Thread ID : 스레드 식별자
- Program Counter(PC) : 현재 실행중인 instruction의 주소
- Register Set : CPU 레지스터 값들
- Stack
- 스레드간 공유하는 것
  - Code
  - Data
  - File

## Multi-Threaded Program 장점

- Program 실행 중에 특정 Thread의 작업이 block 되거나 오래 걸린다고 해도, 다른 Thread 들이 실행되고 있기 때문에 사용자의 입장에서는 해당 Program이 Interactive 하다고 여겨진다.
- Thread 들 간에 프로세스의 메모리와 다른 자원들을 공유한다.
- 새로운 프로세스를 생성하는 것보다 스레드를 생성하는 것이 비용이 적게 들어간다.
- 여러 개의 스레드가 각각 다른 프로세서에서 동시에 실행이 가능하다.
- Multicore Programming 에도 효율적이다.
  - 하나의 Chip 에 여러 개의 Core 를 탑재하는 것을 말한다.
  - 프로세서는 각각의 Core 를 하나의 프로세서로 인식하고 스케줄링한다. 각각의 스레드를 Core에 할당하여 실행이 가능하다.
  - Multicore 는 Cache 를 공유하기 때문에 프로세스의 자원을 공유하는 멀티 스레드 에 보다 호율적임!



## 참고 자료

숭실대 3학년 1학기 운영체제 전공 수업 