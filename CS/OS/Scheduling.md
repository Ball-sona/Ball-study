# CPU Scheduling

### Scheduling

- 어떻게 프로세스에게 CPU 의 사용을 할당할 것인가 (멀티 프로그래밍 기반)
- 여러 ready state 인 프로세스들이 있을 때 어떤 프로세스를 선택할 것인가?
- CPU 사용률과 처리량의 극대화

### 프로세스 수행 사이클의 구성

- Burst Cycle
  - CPU Burst : CPU가 연산 수행하는 시간
  - I/O Burst : I/O 처리를 위해 기다리는 시간
- CPU Burst는 주로 3~8ms로 ‘엄청 긴 애들은 많이 없더라’ 가 연구결과
- CPU Burst 에 따른 프로세스 분류
  - CPU-bound Process : 데이터 양은 적으나 연산이 긴 케이스. I/O Burst < CPU Burst
  - I/O-bound Process : 연산은 적으나 데이터가 많은 케이스. I/O Burst > CPU Burst

### Scheduling 종류

- 언제 CPU Scheduling 해야하는가?
  1. `running` → `waiting` : I/O or event 발생
  2. `running` → `ready` : Time interrupt
  3. `terminated`
  4. `ready` → `running` : 스케줄러에 의해?
- 비선점형 스케줄링(non-preemptive scheduling)
  - 1,4번 케이스만 가능. 프로세스가 자발적으로 CPU 사용을 해제하는 경우
  - 멀티프로그래밍의 기본 스케줄링. 혹은 거의 사용되지 않음
- 선점형 스케줄링(preemptive scheduling)
  - 어느 케이스든 사용 가능하다
  - CPU가 강제로 프로세스의 수행을 정지하는 경우

### Scheduling 기준

- CPU 사용률(CPU Utilization) : 시스템 시간 중 CPU가 작업을 처리하는 시간의 비율
- 처리량(Throughput) : CPU가 단위 시간 당 처리하는 프로세스의 개수
- 응답 시간(Response time) : 인터렉티브 시스템에서 요청에 대한 반응 시간
- 대기 시간(Waiting time) : 프로세스가 Ready Queue 내에서 대기하는 시간의 총합
- Turnaround time : 프로세스 소요시간 (시작 ~ 종료)

→ 이 조건을 모두 만족하는 스케줄러를 만드는건 현실적으로 불가능

→ 시스템 용도를 고려하여 설계하자!

### Scheduling Algorithms

1. **FCFS(First-Come, First-Served) Scheduling**

   - 먼저 CPU 할당을 요청한 프로세스에 CPU를 먼저 할당 → 시간 순
   - 비선점형 스케줄링 사용
   - 구현이 쉽고 빠르나. 작업 수행 순서가 따라 프로세스들의 평균 대기 시간의 차이가 크다.

2. **Shortest Job First Scheduling(SJF)**

   - CPU Burst Time이 가장 짧은 프로세스에 CPU를 먼저 할당 → FCFS보다 평균 대기 시간을 줄일 수 있다.
   - 비선점형 스케줄링 → CPU Burst Time이 끝나야 프로세스 종료
   - 선점형 스케줄링(Shortest Remaining Time First: SRTF)
     - 현재 프로세스를 실행 중인 상태에서 새로 들어온 프로세스의 CPU Burst Time이 더 짧다면?
     - 즉시 현재 프로세스 종료 후 새로운 프로세스에게 양보한다.
     - 평균 대기 시간이 SJF보다 짧다

3. **Priority Scheduling**

   - 미리 주어진 우선순위에 따라 CPU 할당

   - 비선점형 스케줄링 → CPU Burst Time이 끝나야 프로세스 종료

   - 선점형 스케줄링 → 새로 생성된 프로세스가 더 높은 priority 가지고 있으면 즉시 CPU 양보

   - 기

     아 상태(Starvation) :

      낮은 우선순위를 가진 프로세스가 계속 밀려서 수행을 하지 못하는 상황

     - 할당을 기다리는 시간에 따라 우선순위를 높여주는 **Aging 기법**으로 해결 가능

4. **Round-Robin Scheduling**

   - CPU를 Time Quantum(시간 단위)로 할당
   - 주로 10ms ~ 100ms
   - 선점형 스케줄링만 가능 : 정해진 Time Quantum 동안만 프로세스 수행하고 다시 Ready Queue에서 대기 → 프로세스 종료될때까지 반복
   - Process의 최대 대기 시간 = (n-1)* q  (n=프로세스 개수. q=time quantum)
   - q가 너무 크면 FCFS와 성능이 비슷해지고, q가 너무 작으면 context switching에 필요한 시간이 q보다 높아져서 효율 떨어진다
     - 적절한 q 값을 설정하는 것이 중요

5. **Multilevel Queue Scheduling**

   ![스크린샷 2022-11-16 23.07.34.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3e169fd4-99fd-47dd-a484-9d5ac6f08fdc/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-11-16_23.07.34.png)

   - **Ready Queue를 여러개로 분리**하여 각각에 대해 다른 스케줄링 알고리즘 사용
   - Foreground Queue : Interactive 동작. Round Robin 기법 사용하여 대기 시간을 줄인다.
   - Background Queue : CPU 연산 작업 수행. FCFS 사용(종료 보장)
   - Priority, Time slice 등을 사용해 각 큐에 CPU를 어떻게 할당할 건지 결정해야한다.

6. **Multilevel Feedback Queue Scheduling**

   ![스크린샷 2022-11-16 23.10.36.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/93371b81-facd-452c-b800-79734f714343/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-11-16_23.10.36.png)

   - Multilevel Queue에서 프로세스들이 Queue 간 이동할 수 있도록 하는 스케줄링 기법
     - Q0에서 8ms 실행한다
     - 아직 종료되지 않았다면 Q1에서 16ms 실행한다
     - 아직 종료되지 않았다면 Q2에서 실행하여 종료한다
   - Aging 기법의 한 방법
   - 고려 요소 : 큐 개수, 스케줄링 기법, 언제 큐 옮길까?, 옮길 방법 등

### Multiple Processor Scheduling

- 비대칭 멀티프로세싱(Asymmetric multiprocessing)
  - 하나의 CPU가 스케줄링과 시스템 자료 구조를 관리하고, 다른 CPU는 사용자 코드만 수행.
  - 데이터 공유가 간단함
- 대칭 멀티프로세싱(Symmetric multiprocessing)
  - CPU가 서로 동등하게 시스템 자료 구조에 접근. 서로 독립적으로 동작한다.
  - 복잡성 증가. 정교한 설계 필요
- Process Affinity
  - 과거에 수행하던 CPU에 프로세스를 배정하는 방법
  - 프로세스가 그 CPU 캐시에 존재하는 데이터 활용 가능성 높다 를 기반.
  - 특정 CPU에 프로세스 쏠릴 수 있다 → Load Balancing 필요
- Load Balancing
  - CPU 마다 Ready Queue를 둘 경우 → 일부 CPU에 프로세스가 집중될 수 있다.
  - CPU 가 하나의 Ready Queue를 공유할 경우 → 사용 가능한 CPU에 차례대로 Process 배정한다.