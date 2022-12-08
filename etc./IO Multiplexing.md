# I/O Multiplexing server

### 멀티 프로세스 서버의 단점

- 프로세스의 빈번한 생성 → 성능의 저하
- 멀티 프로세스의 흐름을 고려해야하고 프로세스 간 통신도 필요한 상황이라면 더 복잡한 구현

→ 하나의 프로세스가 여러 개의 소켓을 핸들링할 수 있게 하자.
→ IO 멀티플렉싱 or 입출력 다중화

### 소켓 모드

- **블로킹 소켓**

  - 소켓 함수 호출시 조건이 만족되지 않으면 함수가 리턴하지 않고 스레드 실행이 정지되었다가, 조건이 만족되면 소켓 함수가 리턴하고 정지되었던 스레드가 실행을 재게한다.
  - `socket()` 함수를 통해 만들어진 소켓은 기본적으로 블로킹 모드임

- **논블로킹 소켓**

  - 소켓 함수 호출시 조건 만족되지 않더라도 함수가 리턴하므로 스레드 중단 없이 다음 코드 수행된다.

  - 조건 만족하지 않으면 오류를 리턴 (`errno` 전역 변수를 통해 오류 코드 확인) → 주로 나오는 오류코드는  WSAEWOULDBLOCK (리소스 없어여 란 뜻) → 나중에 다시 함수 호출 해줘야한다.

  - `fcntl()` 함수를 통해 소켓 모드를 논블로킹으로 변경

    ```c
    SOCKET sock =(AF_INET, SOCK_STREAM, 0); // 블로킹 모드의 소켓이 생성됨
    int flags = fcntl(sock, F_GETFL); // ??
    flags |= O_NON_BLOCK; 
    fcntl(sock, F_SETFL, flags); // 논블로킹 모드로 전환
    ```

  - 장점

    - 소켓 함수가 조건에 관계없이 항상 리턴하므로 스레드가 오래 정지하는 상황, 즉 deadlock이 생기지 않는다.
    - **멀티 스레드를 사용하지 않고도 여러 소켓들이 대해 돌아가면서 입출력 처리를 할 수 있다.**

  - 단점

    - 소켓 함수 호출할때마다 오류 코드 확인 및 처리해야함. 프로그램 복잡성
    - 블로킹 소켓보다 CPU 사용률이 훨씬 높다

### Select 모델

- 소켓 모드와 관계없이 여러 소켓을 한 스레드로 처리 가능한 모델

- 소켓 함수 호출이 성공할 수 있는 시점을 미리 알 수 있어서. 소켓 함수가 조건을 만족하지 않아서 생기는 문제를 해결할 수 있다.

  - 블로킹 소켓 → 소켓 함수 호출시 조건 만족하지 않아서 블로킹 되는 상황 방지
  - 논블로킹 소켓 → 소켓 함수 호출시 조건 만족하지 않아서 나중에 또 호출해야하는 상황 방지

- 순서

  1. 파일 디스크립터 설정 → 관찰 대상 묶고 관찰 유형 지정
  2. select 함수 호출 → 관찰 대상의 변화 탐색
  3. 호출 결과 확인

- 파일 디스크립터

  ```c
  fd_set set; // set이라는 변수에 디스크립터의 정보들을 묶어
  
  FD_ZERO(&set);     // set의 모든 비트를 0으로 초기화
  FD_SET(1, &set);   // 디스크립터 1을 관찰 대상으로 추가 
  FD_CLR(2, &set);   // 디스크립터 2를 관찰 대상에서 제외
  FD_ISSET(3, &set); // 디스크립터 3의 정보가 있으면 양수로 반환
  ```

- select() : 조건을 만족하여 I/O 준비된 소켓들을 탐색하는 함수

  ```c
  #include <sys/select.h>
  #include <sys/time.h>
  
  struct timeval {
  	long tv_sec; //seconds
  	logn tv_usec; //microseconds
  }
  
  /**
  * @param maxfd: 검사 대상이 되는 파일 디스크립터의 수
  * @param readset: '**수신된 데이터의 존재여부**'에 관심있는 파일 디스크립터 정보
  * @param writeset: '**블로킹 없는 데이터 전송 가능여부**'에 관심있는 파일 디스크립터 정보
  * @param exceptset: '**예외상황 발생여부**'에 관심있는 파일 디스크립터 정보
  * @param timeout: 무한정 블로킹 상태에 빠지지 않도록 하는 타임아웃 설정 인자 
  * @return 관찰 대상 변화 발생시 변화 발생한 파일 디스크립터 수 반환. 타임 아웃시 0. 오류시 -1 
  */
  int select(int maxfd, fd_set* readset, fd_set* writeset, 
  	fd_set *exceptset, const struct timeval* timeout);
  ```

  - 함수 호출 이후 →  **변화 발생한 소켓의 디스크립터만 1로 설정**. 나머지는 0으로 초기화

- 순수 함수 레벨에서 완성됨. 다양한 운영체제에서 사용 가능. 서버 접속자 수 많지 않을때 적합.

- Select 모델 기반 멀티 플렉싱 서버 구현

  1. 리스닝 소켓(서버 소켓)을 통한 연결 요청도 일종의 데이터 수신이므로 관찰 대상에 포함시킨다.

     ```c
     FD_ZERO(&reads);
     FD_SET(serv_sock, &read);
     fd_max = serv_sock;
     ```

  2. select 함수 호출.

     ```c
     while(1){
     	cpy_reads = reads;
     	timeout.tv_sec = 5;
     	timeout.tv_usec = 5000;
     	if((fd_sum = select(fd_max+1, &cpy_reads, 0, 0, &timeout)) == -1)	break;
     	if(fd_num == 0)	continue; // 타임아웃에 의한 반환이라면 함수 재호출해야함
     }
     ```

  3. select 함수의 이벤트 핸들러

     ```c
     for(i=0;i<fd_max+1,i++){
     	if(FD_ISSET(i,&cpy_reads)){
     		if(i == serv_sock) { 
     			// 수신 데이터가 serv_sock에 있다는 뜻으로 클라이언트와 연결
     			// 클라이언트와 연결하기 위해 만들어진 소켓도 fd_set에 추가하기 
     		}
     		else {
     			// 수신 데이터가 클라이언트와 연결된 소켓에 있다는 뜻으로 데이터 읽어서 처리 
     		}
     	}
     }
     ```

- select 함수 호출 예시

  ```c
  int main(int argc, char *argv[]){
      fd_set reads, temps;
      int result, str_len;
      char buf[BUF_SIZE];
      struct timeval timeout;
  
      FD_ZERO(&reads); // 쓰기 변화에 관심있는 파일 디스크립터를 0으로 모두 초기화
      FD_SET(0,&reads); // 파일 디스크립터0 관찰 대상으로 추가
  
      while(1){
          temps = read; // select 함수 이후 값 바뀌니 복사본 생성 
          timeout.tv_sec = 5;
          timeout.tv_usec = 5000; //select 함수 호출마다 타임아웃을 명시 
          
          result = select(1,&temps,0,0,&timeout);
          if(result == -1) // select 함수 오류 발생 시 
          {
              puts('select() error');
              break;
          } else if(result == 0){ // 타임 아웃 시
              puts('time out');
          } else {
              if(FD_ISSET(0,&temps)){ // 파일 디스크립터0 의 값이 0이 아니면 수신 데이터 있다고 판단  
                  str_len = read(0,buf,BUF_SIZE); // 수신 데이터 읽기
                  buf[str_len]=0;
                  printf("message from console:%s".buf);
              }
          }
      }
      return 0;
  }
  ```

### Epoll 모델

- select 모델은 모든 소켓의 변화를 검사하는 반면. epoll 에서는 관심있는 소켓들만 이벤트 풀에 등록하고, 만약 이 풀에 있는 소켓에 데이터 변화가 생기면 이벤트를 발생시킨다. → 검사대상 줄임

- **커널에서 상태정보 유지해줌**. 관찰 대상 정보를 매번 전달해줄 필요가 없다. 파일 디스크립터 반복문도 필요 X

- epoll_event : 디스크립터의 등록 및 이벤트 발생의 확인에 사용되는 구조체

  ```c
  typedof union epoll_data {
  	void *ptr;
  	int fd; // 소켓 파일 디스크립터
  	__unit32_t u32; 
  	__unit64_t u64;
  } epoll_data_t;
  
  struct epoll_event {
  	__unit32_t events; // 어떤 이벤트를 관찰할지?
  	epoll_data_t data;
  }
  ```

- epoll_create() : epoll 인스턴스 라는 파일 디스크립터 저장소 생성

  ```c
  #include <sys/epoll.h>
  
  /**
  * @param size: epoll 인스턴스 크기
  * @return 성공시 epoll 파일 디스크립터. 실패시 -1
  */
  int epoll_create(int size);
  ```

- epoll_ctl() : epoll 인스턴스에 파일 디스크립터 등록 및 삭제

  ```c
  #include <sys/epoll.h>
  
  /**
  * @param epfd: epoll 인스턴스의 파일 디스크립터 
  * @param op: 등록(EPOLL_CTL_ADD)/삭제(EPOLL_CTL_DEL)/변경(EPOLL_CTL_MOD) 선택
  * @param fd: 등록 대상 파일 디스크립터
  * @param event: 관찰 이벤트 유형
  * @return 성공시 0. 실패시 -1
  */
  int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event);
  ```

  - `epoll_ctl(A,EPOLL_CTL_ADD,B,C)` → 인스턴스 A에 파일 디스크립터 B 등록하되 이벤트 C의 관찰을 목적으로 한다.
  - `epoll_ctl(A,EPOLL_CTL_DEL,B,NULL)` → 인스턴스 A에서 파일 디스크립터 B를 삭제한다.

- epoll_wait() : select 함수처럼 디스크립터의 변화 대기

  ```c
  #include <sys/epoll.h>
  
  /**
  * @param epfd: epoll 인스턴스의 파일 디스크립터 
  * @param events: 관찰 이벤트 유형
  * @param maxevents: 버퍼에 등록 가능한 최대 이벤트 수
  * @param timeout: 대기시간. -1이면 이벤트 발생까지 무한 대기
  * @return 성공시 이벤트 발생한 파일 디스크립터 수. 실패시 -1
  */
  int epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout);
  ```

  - `epoll_wait(epfd, ep_events, EPOLL_SIZE, -1)` → 인스턴스 epfd 에 등록된 파일 디스크립터 중 ep_events 이벤트가 발생한 디스크립터 수

- Epoll 모델 기반 에코 서버

  1. 서버 소켓 등록과 연결 요청의 대기

     ```c
     event.events = EPOLLIN; // 수신 데이터 관찰 이벤트
     event.data.fd = serv_sock; // 근데 이제 서버 소켓 대상으로
     
     epoll_ctl(epfd, EPOLL_CTL_ADD, serv_sock, &event); //파일 디스크립터 등록
     while(1){
     	event_cnt = epoll_wait(epfd,ep_events,EPOLL_SIZE,-1); // 이벤트 등록
     	if(event_cnt == -1) puts("epoll_wait() error"); break;
     } 
     ```

  2. epoll_wait 함수 호출 이후

     ```c
     for(i=0; i<event_cnt,i++){
     	if(ep_events[i].data.fd == serv_sock){
     		// 연결 요청이 수락된 경우. 클라이언트와 연결하기 위해 만들어진 소켓도 epoll_ctl 통해 ㄷ
     	} 
     	else {
     		// 종료 요청의 경우, 디스크립터 해제 과정
     		epoll_ctl(epfd, EPOLL_CTL_DEL, ep_events[i].data.fd, NULL);
     		close(ep_events[i].data.fd);
     	}
     }
     ```

### Poll 모델

- select 와 비슷.
- select 는 애플리케이션이 비트의 배열을 전달하도록 요구하지만 poll은 구조 배열을 전달하도록 요구.
- Select와 다르게 관리할 수 있는 파일 디스크립터 개수가 무제한
- Low level의 처리로 시스템콜 호출이 select 보다 적음. 이식성 나쁨
- fd당 체크 마스크 크기가 select는 3bit. poll은 64bit로 양이 많아지면 성능이 select보다 더 떨어짐

### 소켓 입출력 모델 비교

- Select 모델
  - 장점 : 운영체제 간 이식성 및 호환성 높음
  - 단점 : 매번 socket set 설정해야하는 등 응용 프로그램에서 관리할 부분 많음
- Poll 모델
  - 장점 : Select 모델과 달리 ‘검사할 소켓의 최댓값?’ 을 직접 계산 X
  - 단점 : 소켓 개수 많아질수록 성능이 떨어짐
- Epoll 모델
  - 장점 : 커널이 직접 관리. 유저-커널 모드 전환 적으므로 성능 향상. 소켓 개수가 늘어날수록 성능이 비교적 더 우수
  - 단점 : 비교적 이식성이 좋지 않음