# Memory

여러 프로그램들이 한정된 자원인 메모리 영역을 공유하게 되면서 이를 잘 관리할 필요성이 등장한다.

### Address Space

- 주소 공간 = 프로세스에서 **참조**할 수 있는 주소들의 범위
- 프로세스와 1:1 관계이고, 스레드들은 주소 공간을 공유한다.
- 주소 공간의 크기는 CPU의 주소 버스(address bus)에 의존한다.
  - 주소 버스가 32bit 라면 주소 공간 크기는 2^32 임

### Physical Address and Virtual Address

- 물리 주소

  - 컴퓨터의 메인 메모리에 접근할때 사용되는 주소
  - 기억 장치의 주소 레지스터에 적재되는 주소

- 가상 주소 (논리 주소)

  - 프로세스 관점에서 사용하는 주소
  - 논리적인 주소이기 때문에 주소 공간을 의미있게 나눠서 사용하지 않는다

- **언제 가상 주소를 생성할까.**

  - Compile Time
    - 컴파일러는 프로세스가 물리 메모리에서 실행되는 주소를 파악해서 절대 코드를 생성
    - 시작 주소의 위치가 변경되면 다시 컴파일을 해야한다.
    - 컴파일러가 Symbol Table 을 만들고, 이에 relative 한 주소가 생성
    - 프로그램이 사용하는 주소 = 물리 주소
    - 초창기 컴퓨터의 주소 관리 방식임 → Multiprogramming 일 경우 컴파일 타임에 결정된 주소는 다른 프로그램과 동시에 메모리에 적재하기가 어렵다. → 가상 주소를 생성하자.
  - Link Time
    - Object 파일들과 시스템 제공 라이브러리 들을 묶어서 Symbol Table에 의존적이지 않은 주소를 생성
  - Load Time
    - 프로그램을 메모리에 올릴때 주소를 결정하는 방식.
    - 프로그램의 시작 주소를 바꾸려면 다시 load 해야한다.
  - Execution Time (Run Time)
    - 프로그램이 실행되는 순간 주소를 결정하는 방식이다. (런타임 바인딩)
    - MMU 같은 하드웨어의 도움이 필요하다. 현재 주로 이 방식을 사용 중

- CPU에서 Physical Relative Addree를 사용하면?

  ![스크린샷 2022-12-04 22.53.58.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9219ba1e-9f91-4e86-8ab9-f6c99f95438c/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-04_22.53.58.png)

  - 프로그램 내 연산자들의 주소 = 시작 주소로부터의 상대적인 offset
  - 절대 주소 = 시작 주소 + 상대 주소의 합

- CPU에서 Virtual Address를 사용하면?

  ![스크린샷 2022-12-04 22.54.37.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cf88dcd2-b4ea-492a-bd75-48d17dbc2993/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-04_22.54.37.png)

  - Translation의 속도가 중요해짐

### MMU

- Memory Management Unit
- 가상 주소와 물리 주소간의 변환을 수행하는 하드웨어 장치
- CPU 내에 존재

### Virtual Memory

- 메모리로서 실제로(물리적으로) 존재하지는 않지만, 사용자에게 메모리로서의 역할을 하는 가상 메모리
- 프로세스의 실행을 위해 프로그램의 모든 부분이 다 메모리에 올라가있을 필요는 없다 → 실행되고 있는 코드만 실제 메모리에 올려놓고 프로세스를 실행시키자!

![스크린샷 2022-12-04 22.56.58.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c6058af7-c1c0-4a0a-acec-d48087de36f3/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-04_22.56.58.png)

### Paging

- **가상 메모리**를 동일한 크기인 Page 단위로 나누어서 관리 → 보통 1 페이지 크기 = 4KB

- ↔ Frame : **물리 메모리**를 동일한 크기로 나누었을 때의 단위 → 페이지 크기 = 프레임 크기

- Frame을 할당 받지 못한 Page가 있다면? → 외부 저장장치에 저장된다.

- CPU 가 관리하는 모든 주소는 페이지 번호와 주소를 갖는다.

  - 페이지 번호 : 각 프로세스가 가진 페이지 각각에 부여된 번호
  - 페이지 주소 : 각 페이지의 내부 주소 (offset)

- Page Table

  ![스크린샷 2022-12-04 23.09.54.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/14da59d0-6d1d-4ba4-bed7-672642ab98a9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-04_23.09.54.png)

  - 각 프로세스의 페이지 정보를 저장. 즉 프로세스마다 하나씩 가지고 있음
  - 해당 page에 할당된 물리 메모리의 시작 주소 정보를 가지고 있다. → 이 시작 주소랑 page 주소를 결합하면 실제 원하는 데이터 주소를 알 수 있음
  - 물리 메모리에 위치
  - PTBR(page table base register) 가 물리 메모리 내 page table 가리킴
  - PTLR(page table length register) 가 page table의 크기를 나타냄

- PTE(Page Table Entry)

  - Page Table의 레코드 하나하나를 pte 라고 한다.
  - **Page Base Address** : 해당 페이지에 할당된 Frame 시작 주소
  - Flag Bits
    - Accessed Bit
    - Dirty Bit
    - Present Bit
    - Read/Write Bit

### TLB

- Translation Look-aside Buffers
- Paging → 데이터 한번 접근할때 페이지 테이블, 물리 메모리 총 2번 메모리에 접근해야한다 → 메모리 접근 속도 떨어트림 → 해결방법 TLB
- Page Table을 이용해 변환된 주소를 TLB에 저장한다. → 이후 접근 시에는 TLB에 저장된 값을 이용해 빠르게 변환된 주소를 사용
- TLB는 레지스터이기 때문에 빠른 수행 가능
- TLB Hit Ratio, 즉 TLB에서 원하는 주소를 찾을 확률을 높일수록 성능 향상

![스크린샷 2022-12-04 23.15.59.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fcd4f5f3-83ac-418c-8338-febf24c1c9c8/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-04_23.15.59.png)

시스템 발전에 따라 가상 주소 공간도 큰 용량을 요구하게 되면서 페이지 테이블 역시 차지하는 공간이 켜졌다. 이러한 문제를 해결한 방법들을 알아보자

### Multilevel Page Table

- 2 Level Page Table → Outer page Table을 하나 더 둔다

  ![스크린샷 2022-12-04 23.20.26.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/30f246e3-91fa-4937-ac9f-d5cd9834283e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-04_23.20.26.png)

- Paget Table의 레벨이 높아지면?

  - page table이 차지하는 메모리 영역의 크기가 줄어들겠지만.
  - Table walk 에 걸리는 시간이 증가한다

### Inverted Page Table

- 모든 물리 메모리는 가상 메모리의 페이지에 매핑되어있지 않을까? ← 가상 메모리 용량이 커지면서 물리 메모리가 인기가 더 많아진거잖아

- 기존에는 page 번호를 이용해 frame 번호를 검색했다면 이를 반대로 생각

  ![스크린샷 2022-12-04 23.24.38.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fe94675e-55bd-43be-a0b2-6ccd799a99da/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-04_23.24.38.png)

- CPU에서 참조하는 address와 PID 조합으로 Page ID를 만들어서 page table 내에서 page ID를 검색한다.

  ![스크린샷 2022-12-04 23.25.36.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/78fcb346-3cdb-4646-ae08-8c6b2ce2efb9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-04_23.25.36.png)

- 시스템 전체에 하나의 Page Table만 둔다.

- 적은 용량을 차지하게 되지만 테이블 검색하는데 더 오랜 시간이 걸린다.

### Demand Paging

![스크린샷 2022-12-04 23.29.52.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2c6361dd-e4ab-4ce4-a85b-d195f1553965/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-04_23.29.52.png)

- 프로세스 실행을 위한 모든 페이지를 메모리에 올리지 않고 필요한 페이지 요청이 발생할때 메모리에 올리는 Paging 기법
- Page 를 Memory 와 Secondary Storage 간 이동시킨다
- 물리 메모리 구성 시간이 줄어들고. 필요한 메모리 크기를 줄일 수 있다
- 참조하려는 페이지가..
  - valid 하면 → 물리 메모리 내에 있는거니까 정상적인 참조
  - invalid 하면 → 물리 메모리 내에 없는거니까 `Page Fault` 발생
- Page Fault
  - `present bit == invalid`
  - Page Fault Handler 가 실행된다
    - 새로운 프레임 할당
    - Backing Storage에서 페이지 내용을 프레임으로 불러들인다
    - Page Table 재구성
    - 프로세스 작업 재시작
  - page fault 횟수를 줄이는것이 성능에 있어서 중요함