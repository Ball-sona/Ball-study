# Architecture

### Bus

- Bus : CPU, RAM, I/O 장치 간 데이터가 전송되는 통로

  - data bus. address bus → system bus

- 단일 버스

  - 하나의 시스템 버스에 여러 모듈이 연결되어있음
  - CPU, Memory, I/O 속도 격차 증가
    - CPU> Memory > disk >> I/O 장치 (CD,keyboard)
  - 병목 현상(bottleneck) : 같은 버스에 연결된 디바이스들 사이의 속도 차이로 인해 발생
    - 만약 CPU는 초당 5단위의 일을, 메모리는 초당 3단위의 일을 전달할 수 있다고 하면 전체 시스템 속도는 메모리의 속도(3단위)로 제한됨.
  
- 이중 버스 (계층적 버스)

  - 빠른 CPU와 메모리는 시스템 버스에 연결하고. I/O 장치는 I/O 버스에 연결 → 세분화된 버스 채용
- 병목 현상 해결

### I/O Event Handling Mechanisms

- **Interrupt**
  - 비동기적 이벤트 처리 → 예상치 못하게 일어나는 이벤트 (ex. I/O 이벤트. 네트워크 요청)
  - 처리 순서
    - 핸들러가 현재 실행 상태를 저장 후 context switching
    - 커널 모드의 ISR(Interrupt Service Routine)로 jump
    - 저장했던 실행 상태를 복원
    - 인터럽트로 중단되었던 지점부터 다시 시작
  - ISR 이 짧아야한다. → 길면 다른 인터럽트 처리 불가
  - Time Sharing 은 Timer Interrupt 의 도움으로 가능하게 되었다.
  - Interrupt 에는 우선순위가 존재. 하드웨어 장치마다 다르게 설정
  
- **Trap**
  - 동기적 이벤트 처리 → 프로그램이 발생시킨 이벤트 (ex. Divide by Zero 같은 프로그램 에러, Breakpoint)
  - 커널 모드의 Trap Service Routine 는 인터럽트와 달리 실행 상태를 저장 및 복원하지 않는다.
  - user stack, kernel stack 을 별도로 사용하고 있기 때문에 상태 저장하지 않아도 이전 상태로 간다.
  
- **Interrupt vs Exception**
  - Interrupt
    - Hardware Interrupt(timer). Software Interrupt(system call)
    - 프로세스 상태를 저장하기 때문에 인터럽트를 처리하는 동안 다른 프로세스가 실행이 가능하다.
  - Exception (=Trap)
    - 프로세스의 상태를 저장하지 않기 때문에 다른 프로세스 실행이 불가능하다.
    - Fault. Trap. Abort 등

## I/O 관련 Device

- I/O 란 메모리와 디스크 등의 입출력 장치 간 상호작용.
- Device Registers
  - Control, Status, Input, Output 레지스터가 존재.
  - 레지스터는 메인 메모리의 일부 영역에 mapping → 매핑된 영역의 주소만 알면 CPU에서 접근 가능
- I/O Controller
  - 고수준의 I/O 요청을 저수준의 장치 특화된 명령어로 해석하는 회로
  - 장치와 직접 상호작용하고, CPU로부터 명령어를 수행

## I/O 처리 기법

- **Polling**

  - 주기적으로 특정 이벤트의 도착 여부를 확인하면서 기다리는 방법
  - Controller 장치가 매우 빠른 경우에 적합하다.
  - 이벤트 도착 시간이 길어지면 폴링은 CPU 타임을 낭비하는 셈이다.
  - Programmed I/O
- **DMA(Direct Memory Access)**

  - Polling 은 모든 연산을 CPU를 통해 진행하지만, 전송 데이터가 크면 CPU 를 낭비하는 것
  - DMA Controller 라는 I/O 전용 작은 프로세스를 따로 생성하여 사용
  
    - CPU가 DMA Controller에게 I/O를 요청하면 DMA Controller 는 CPU를 대신하여 I/O 장치와 메인 메모리 사이의 데이터 전송을 수행
    - DMAC가 I/O 하는 동안 해당 프로세스는 wait/sleep 상태에 있고 CPU는 다른 프로세스를 수행한다.
  - CPU는 그동안 다른 작업을 수행할 수 있으므로 효과적임
- Polling vs DMA

  - DMA를 사용해서 인터럽트를 하는 것은 추가 비용이 든다 → DMAC 라는 하드웨어를 추가적으로 사용하는 것도, 인터럽트로 인한 컨텍스트 스위칭도 비용이다. 따라서 이를 최대로 활용하기 위해서는 **적당한 parallelism** 이 필요하다.
  - 만약 특정 프로세스가 DMA 로 처리될 때 CPU 가 딱히 할일이 많이 없다면? 그냥 Polling 을 쓰는게 낫다.
  - 예전엔 카메라 촬영 버튼이 폴링 방식으로 동작했지만. 스마트폰이 등장하고 수행되는 기능이 많아지면서 DMA 방식으로 전환되었다

## I/O Device Access 기법

- I/O Instruction

  - I/O Controller 가 한개 혹은 그 이상의 레지스터를 가져서. CPU가 컨트롤러와 직접적으로 통신한다.
  - 이를 수행하기 위한 명령어 제공 (in,out,,)

- Memory Mapped I/O

  - Device Register 들을 메모리 공간에 매핑하여 사용

    → 레지스터를 메모리 공간에 매핑하면 레지스터들은 주소 공간의 일부로 여겨지는 효과

  - 일반적인 명령어로 I/O 작업 수행 (mov, and, xor,,)

  

## 참고 자료

숭실대 3학년 1학기 운영체제 전공 수업 

https://m.blog.naver.com/bycho211/220975324334