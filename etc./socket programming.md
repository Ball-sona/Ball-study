

## Socket Programming

##### 소켓 프로그래밍 과정

<img src="./스크린샷 2022-10-08 23.03.44.png" alt="스크린샷 2022-10-08 23.03.44" style="zoom: 50%;" /> 

##### socket 생성 함수

```c
#include <sys/socket.h>

/**
* @param domain : 프로토콜 체계(Protocol Family) 
* @param type : 데이터 전송방식 (TCP:SOCK_STREAM, UDP: SOCK_DGRAM)
* @param protocol : 두 컴터간 통신에 사용되는 프로토콜 정보
*/
int socket(int domain, int type, int protocol);
```

- TCP 소켓 생성: `int tcp_socket = socket(PF_INET, SOCK_STREAM, IPROTO_TCP);`
- UDP 소켓 생성: `int udp_socket = socket(PF_INET, SOCK_DGRAM, IPROTO_UDP);`



> ##### 바이트 순서 변환
>
> ```c
> unsigned short htons(unsigned short) // h to n (호스트 -> 네트워크 바이트 순서)
> unsigned short ntohs(unsigned short) // n to h (네트워크 -> 호스트 바이트 순서)
> unsigned long htonl(unsigned long) // htons 와 동일. 자료형이 long
> unsigned short ntohl(unsigned long) // ntohs 와 동일. 자료형이 long
> ```
>
> ##### 문자열 IP주소 → 네트워크 바이트 순서
>
> ```c
> #include <arpa/inet.h>
> 
> in_addr_t inet_addr(const char* string); 
> // ex. "211.214.107.99" -> 32bit 정수(빅엔디안)
> // 성공시 정수값. 실패시 INADDR_NONE 반환.
> 
> int inet_aton(const char* string, const char* string, struct in_addr* addr);
> // 문자열을 32bit 정수로 변환한 후 in_addr 구조체에 주소값 전달. 
> // 성공시 1, 실패시 0 반환. 
> 
> char* inet_ntoa(struct in_addr adr);
> // 네트워크 바이크 순서로 정렬된 정수형 ip주소를 문자열 형태로 반환
> // 성공시 문자열 주소값. 실패시 -1 반환.
> ```



##### 연결 요청 대기 상태

```c
/**
* @param sock 소켓 디스크립터. 즉, 서버 소켓(리스닝 소켓)
* @param backlog 연결요청 대기큐의 크기정보 전달. 5라면 클라이언트 요청을 5개까지 대기시킬 수 있음.
* @return 성공 시 0, 실패시 -1
**/
int listen(int sock, int backlog);
```



##### 클라이언트의 연결 요청 수락

```c
/**
* @param sock 서버 소켓 디스크립터
* @param addr 클라이언트 주소 담을 변수의 주소값 
* @param addrlen 클라이언트 주소 담을 변수의 크기 바이트 단위.
* @return 성공 시 별도 생성된 소켓 디스크립터. 실패시 -1
**/
int accept(int sock, struct sockaddr* addr, socklen_t* addrlen);
```



##### 클라이언트의 연결 요청

```c
/**
* @param sock 클라이언트 소켓 디스크립터
* @param servaddr 클라이언트 주소 담을 변수의 주소값 (연결할 서버 주소 정보)
* @param addrlen 클라이언트 주소 담을 변수의 크기. 바이트 단위.
* @return 성공 시 생성된 소켓 디스크립터. 실패시 -1
**/
int connect(int sock, const struct sockaddr* servaddr, socklen_t addrlen);
```

- 서버의 listen 함수 호출 이후에 클라이언트 connect 함수 호출이 유효해진다.



>  **C언어 함수**
>
> puts : 문자열 출력함수 ( ↔ printf는 문자열, 정수 등 다 출력가능. puts만 자동 줄바꿈)
>
> ```
> int puts(const char* str)
> ```
>
> fputs : 스트림에 문자열 쓰는 함수
>
> ```
> int fputs(const char* str, FILE* stream)
> ```
>
> putchar : 문자 출력함수
>
> ```
> int putchar(int character)
> ```
>
> fputc : 스트림에 문자 쓰는 함수
>
> ```
> int fputc(int character, FILE* stream)
> ```
>
> fgets : 스트림에서 문자 읽어서 string에 저장하는 함수 (\n까지. 혹은 문자수가 n-1개일때까지 읽어)
>
> ```
> char* fgets(char *string, int n, FILE* stream)
> ```



