# Process

## 프로그램이 만들어지는 과정

- Compiler

  - C언어 같은 Source Code를 Assembly Code 변환 후 기계어로 표현된Object 파일로 변환
  - Object File : 프로세스가 변환되기 위한 정보가 들어있고, 자체로 수행 되지 않는 상태일 수 있음
    - 주소가 Relocatable Address(Relative Address) 로 표현

- Linker

  - 여러 Object 파일들과 라이브러리들 연결하여 메모리로 로드 될 수 있는 하나의 Executable 로 변환
  - Executable File
    - 운영체제에서 실행 가능한 파일 (exe file)
    - Header: 프로세스 변환 위한 정보(메타 데이터). Text: 작업 내용. Data : 필요한 데이터
    - 주소가 Absolute Address 로 표현

- Loader

  - Executable을 실제 메모리에 올려주는 역할 담당
  - 동작 과정
    1. Executable의 Header을 읽어서 Text, Data 의 크기를 결정
    2. 프로그램을 위한 Address Space(Virtual Memory) 생성 → 프로세스마다 동일한 크기
    3. Header의 내용을 바탕으로 Virtual Memory에 Text와 Data를 로드
    4. 프로그램의 arguments 들을 Stack으로 복사
    5. CPU Register를 초기화(backup or clear) → Start-up routine으로 jump 시킨다.

- Runtime System

  - 프로그램의 효율적인 실행을 지원하기 위해 프로그램과 연결하여 상호 작용하는 장치 (ex. GCC)
  - C Runtime System Program Execution(GCC)
    1. Start-up Code Object 파일 추가하여 프로그램을 컴파일하고 이때 기본 라이브러리들도 동적으로 링크된다.
    2. 커널은 프로그램을 시작하기 위해 PC를 `_start` 함수의 주소로 지정
    3. `_start` 함수는 라이브러리 및 스레드 환경을 초기화하기 위해  `_libc_start_main` 함수 호출
    4. 라이브러리 초기화 후 프로그램의 `main` 함수 호출


## Process Concept

- Abstraction

  - Execution Unit → 스케줄링의 단위
  - Protection Domain → 서로 침범하지 못하는 독립적인 영역

- Implementation

  - PC + Stack + Data section 등으로 구성

  - bss : 초기화되어있지 않은 전역 변수들이 저장된 곳

- 디스크에 저장된 **프로그램으로부터 변환**되어 메모리 로딩

## Process State

- `new` : 방금 생성됨 (program 정적인 상태로)
- `running` : instruction 수행중
- `waiting` : 특정 이벤트가 발생하기를 대기중 (ex. I/O 종료)
- `ready` : 프로세서가 지정하기를 대기중 → `running` 으로 전환 가능상태
- `terminated` : 실행 완료
- 커널에 Ready Queue, Waiting Queue, Running Queue 를 두고 프로세스 상태에 따라 관리한다.

## Process Control

- Process Control Block(PCB)
  - 운영체제가 프로세스를 관리하기 위한 각 프로세스마다 갖는 data structure
  - Process State. PC. CPU Registers. CPU Scheduling Info. Memory management Info. Accounting Info. I/O Status Info..
- Context Switching(문맥 전환)
  - CPU가 새로운 프로세스로 교체하기 위해. old process의 상태값을 저장하고 저장되어있는 new process의 상태값을 불러와서 로드한다.
  - Context Switching 이 일어날때는 시스템이 특별한 다른 작업을 하지 않고. 이에 소요되는 시간은 하드웨어의 성능에 관련되어있다.
  - CISC (ex. Intel)
    - 복잡한 명령어셋으로 구성. 효율 높지만 클럭 속도 저하. 물리공간 많이 차지. 레시스터 용량 저하
    - 레지스터가 개수가 적기 때문에 문맥 전환에 소요되는 시간이 짧다
  - RISC (ex. ARM)
    - 간단한 명령어셋으로 구성. 클럭 속도 높고 수행 속도 빠름. 물리적 공간을 절약.
    - 레지스터 개수가 많기 때문에 문맥 전환 속도가 느리고 오버헤드 발생
- Process Creation
  - 프로세스들은 동시에 실행되며. 생성 및 종료가 동적으로 발생해야한다.
- fork
  - 부모 프로세스로부터 자식 프로세스를 복제하여 새로운 프로세스 생성
  - 자식 프로세스는 부모 프로세스의 메모리의 복사본을 사용
- exec
  - replace the memory with new program

## Process Creation

- Parent process → Child Process

  - 부모 프로세스로부터 자식 프로세스가 생성된다.
  - 두 프로세스는 메모리 자원을 공유할수도/안할수도 있고 있다.

- 동작 과정

  1. 부모 프로세스가 `fork` 시스템 콜을 호출하여 새로운 프로세스 생성한다.
  2. 새로운 프로세스는 부모 프로세스의 메모리의 복사본을 가지고 있다.
  3. 새로운 프로세스는 `exec` 시스템 콜을 통해 새로운 프로그램을 로드해 메모리에서 실행시킨다.

- 위 과정으로 프로세스를 생성하는게 더 효율적.

- 예시 코드

  ```c
  pid = fork();
  if(pid < 0){ // Error in Fork }
  else if (pid > 0) { // Parent Process }
  else if (pid == 0) { // Child Process }
  ```

## Process Termination

- `exit` 시스템 콜을 사용하여 프로세스를 종료한다.
- `wait` 시스템 콜을 사용하여 부모 프로세스는 자식 프로세스의 종료 상태를 받을 수 있다.
- 프로세스가 비정상 종료시 `SIGABRT` 시그널을 부모 프로세스에 전달하여 에러 메세지를 알려준다.
- Core dump : 어떻게 실행하다가 비정상 종료되었는지에 대한 정보?

## Cooperating Processes

- 기본적으로 프로세스들은 서로 영향을 주고 받을 수 없다. 독립적 실행.
- 프로세스 간 협력 이점 : 정보 공유. 계산 속도 향상. 모듈화. 안정성
- 협력 방법
  - Network/Pipe 로 통신
  - Shared Memory 를 사용



## 참고 자료

숭실대 3학년 1학기 운영체제 전공 수업 