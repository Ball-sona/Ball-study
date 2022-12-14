# OS Structure

### Computer History

- 1950 초반

  - 원시적. 1bit 단위(0,1)로 실행.

- 1950 중반

  - 기계어 사용.
  - 프로그래밍 언어와 운영체제 없음
  - 영구적 저장 장치 없어서 매번 프로그램을 다시 입력해야함

- 1960 초반

  - 펀치카드에 기계어 작성해서 프로그래밍

- Mainframe - Batch Processing

  - 일괄 처리(batch) 는 아주 단순한 OS 개념으로, 메모리에 적재된 순서로 Job 진행
  - 중간에 User Interaction 불가능하고. 사람이 Job scheduling 하는 구조
  - I/O가 실행되는 동안 CPU가 쉬는 시간(=Idle 상태)이 길어짐.

- Automatic Job Sequencing

  - 사람의 관여 없이 여러개의 프로그램 순차적으로 실행

  - 이전 작업 종료되면 알아서 다음 작업 실행하니까 일괄 처리보다 성능 향상

  - 여전히 **I/O에 의한 CPU Idle 문제** 는 해결 불가

    ![스크린샷 2022-10-04 19.32.49.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/71c6c05c-f6ba-4534-9297-f7f8055470c6/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-10-04_19.32.49.png)

### CPU Idle 문제 해결책

- **Spooling (Simultaneous Peripheral Operation On-Line)**

  - 이전 작업의 종료를 기다리지 않고 버퍼에 작업 로드 후 다른 작업을 바로 실행
  - I/O 와 Commputation을 동시에 진행할 수 있게 되었다.

- **Multiprogramming**

  ![스크린샷 2022-12-14 18.08.17.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3afbfe45-d64f-467d-8a38-8ceb34f909e7/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-14_18.08.17.png)

  - 여러 개의 작업을 메모리에 동시에 유지하여, 현재 실행 중인 작업이 I/O를 할 경우 다음 작업을 순차적으로 실행
  - First Come First Served → 먼저 온 순으로 스케줄링
  - CPU Idle time이 감소하여 CPU 활용도 증가
  - Issue
    - 여전히 프로그램이 모두 실행 완료되기 전까지는 user interaction이 불가능하다.
    - 다른 작업으로 넘기는 시점을 I/O 여부로 결정하다보니까 특정 작업에서 의도적으로 I/O 를 안하거나 미루는 이슈가 발생 → 공평성 문제
    - 특정 작업이 우선순위가 높을 수 있음 → High Priority 수행할 필요

- **Timesharing**

  ![스크린샷 2022-12-14 18.16.44.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9a7e82ce-92a7-4e18-8860-7f1686272eb6/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-14_18.16.44.png)

  - CPU 실행 시간을 타임 슬라이스(time slice)로 나누어서 실행  ex. 10ms
  - CPU 스위칭 을 통해 여러개의 작업들이 동시에 실행됨.
    - 정확히는 각각의 작업들이 엄청 짧은 시간동안 실행하고 양보하는 과정을 계속 반복시켜서 동시에 실행되는 것처럼 보이게 함
  - CPU 스위칭(Context Switching) 이 너무 빈번하게 일어난다

- Multitasking

### Multitasking

- 하나의 Process 는 여러 개의 Task들을 가질 수 있다.
  - UI 프로세스, 입출력 처리 프로세스, 계산 처리 프로세스 등
- 하나의 Task 는 일정 시간동안 CPU를 돌아가면서 사용하고. 여러 개의 Task 들은 CPU 같은 자원을 공유하며 동시에 실행된다.
- CPU Idle 상태를 많이 줄일 수 있고, Idle 상태일때도 background 작업 실행 가능
- Fork 를 통한 자식 프로세스 생성
  - Concurrent Execution 가능
  - 하나의 프로세스가 여러개의 태스크(Child Process) 생성 후. 각자 협력하며 작업 수행
- Issue
  - 복잡한 메모리 관리 시스템 : 동시에 여러 프로그램이 메모리에 상주하기 때문에 엄격한 메모리 관리 및 보호 시스템이 필요하다.
  - 적절한 응답 시간 제공 : 작업들은 메모리와 디스크를 swap in/out 되는데 이때 걸리는 loading time 을 고려하여 응답 시간을 제공해야한다.
  - Concurrent Execution : 섬세한 CPU 스케줄링 필요
  - Job 간의 Orderly Execution : 만약 Task 간에 순서들이 존재한다면?

### 그 외 시스템

- 멀티 프로세서 시스템
- 분산 시스템
- Clustered Systems
- Embedded Systems
- Real-Time Systems

### System Structure

- 운영체제는 규모가 매우 크고 복잡한 소프트웨어
- 소프트웨어의 구조를 고려하여 신중하고 좋은 설계 필요
- 좋은 설계를 위한 디자인 목표 → 설계하고자 하는 시스템의 목적과 관계

### OS Design Principle

- Policy
  - 무엇이 되게 만들지? 어떤 기능을 재공할지?
- Mechanism
  - 그 작업을 어떠한 형태로 제공할 것인지? 구현 방법
- Policy 와 Mechanism 분리하여 운영체제 설계를 모듈화.

### Layering

- 정의가 명확한 함수들로 이루어진 Layer들을 정의하고, 이러한 Layer들은 인접한 Layer 와만 통신한다.
- ex. 7-Layers of the OSI Model
- 각 기능별로 Module들이 나누어져 있고, Layer 내에는 여러 module 들이 동작하는 구조?

![스크린샷 2022-12-14 19.13.08.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4eac0410-229d-4ce3-8e0c-84b1b53b91bb/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-14_19.13.08.png)

- 장점 : Layer의 수정이 독립적이다.
- 단점 : Layering 원칙(인접한 Layer끼리만 통신할 것)이 제대로 지켜지지 않으면 불완전해질 수 있다.
- 커널 내 모듈들
  - 커널의 각 기능들에 맞게 모듈화 되어있다.
  - 각 모듈들은 Layering 되어있다.

### User Mode and Kernel Mode

- System Protection 을 위해 모드를 나누고. 각 실행 모드의 권한에 따라 접근할 수 있는 메모리나 실행 가능한 명령어가 제한된다.

- User Mode

  - 애플리케이션이 실행되는 Mode
  - 상대적으로 낮은 권한을 갖고 Priviledge 명령어 실행 불가능하다

- Kernel Mode

  - 모든 권한을 가진 실행 Mode (Root)
  - 운영체제 실행되는 Mode
  - Priviledge 명령어 실행 및 레지스터 접근 가능

- Execution Mode Switch (실행 모드 전환)

  - 유저 모드에서 실행 권한이 없는 서비스는 시스템 콜을 통해 커널 모드에 요청 → 커널 모드에서는 대신 서비스 실행 후 결과값을 유저 모드에 반환

- System Call

  ![스크린샷 2022-12-14 19.37.51.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/70b99084-8343-45cf-a053-c864e12520c2/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-14_19.37.51.png)

  - User Mode 에서 Kernel Mode 로 진입하기 위한 통로
  - 커널에서 제공하는 Protected 서비스(open,write,…) 이용하기 위해 필요
  - Register 사용

### Kernel Designs

![스크린샷 2022-10-15 03.30.52.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dbd64bb2-d56d-4b37-9147-1c4f1791b2e6/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-10-15_03.30.52.png)

- **Monolithic Kernel**

  - Kernel의 모든 서비스가 같은 (물리적) 주소 공간에 위치한다.

  - 어플리케이션은 자신의 주소 공간에 커널 코드 영역을 매핑하여 커널 서비스 이용

  - 하드웨어 계층에 관해 단일한 Abstraction 정의하여, 라이브러리나 어플리케이션에게 단일한 인터페이스를 제공한다.

    → 커다란 덩어리 안에 한번에 구현 되어잇다?

  - 장점 : 어플리케이션과 모든 커널 서비스가 같은 주소 공간에 위치하기 때문에 데이터 전달 과정에서 overhead 가 적다.

  - 단점 : 모든 모듈이 하나의 바이너리 내에서 유기적으로 연결되어 있기 때문에 일부분의 수정이 전체에 영향을 끼치고 크기가 커질수록 유지보수가 어려움. 만약 하나의 모듈에 버그가 발생하면 시스템 전체에 영향을 끼칠 수 있음

  - Window. Linux 등 사용

- **Micro Kernel**

  - 커널 서비스가 기능에 따라 모듈화되어 각각 독립된 주소 공간에서 실행
  - 이러한 독립된 모듈을 서버라고 하며. IPC를 통해 서버들 간에 통신
  - 마이크로 커널은 이러한 서버들에게 서비스 콜을 전달하는 간단한 기능만 담당
  - 장점 : 커널 서비스간 의존성이 낮고. 개발 및 유지보수가 상대적으로 용이. 불필요한 서버들은 종료하여 자원 확보가 가능하고. 상대적으로 안정적
  - 단점 : 서버 간 통신과 컨텍스트 스위칭으로 인한 낮은 성능

  ![스크린샷 2022-10-13 20.50.23.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/97982fa6-24ee-401f-af40-67d9dbf22511/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-10-13_20.50.23.png)

- **Hypervisor**

  - 가상화된 컴퓨터 하드웨어 자원을 제공하기 위한 관리 계층
  - 게스트 OS 와 하드웨어 사이에 위치해서 Virtual Box 실행시켜주고. 시스템 자원을 분배하는 최소한의 역할 수행
  - 장점 : 하나의 물리 컴퓨터에서 여러 개의 게스트 OS 운용 가능
  - 단점 : 하드웨어를 직접 사용하는 운영체제에 비해 성능 떨어짐 → 반가상화로 성능 저하 문제 해결 시도