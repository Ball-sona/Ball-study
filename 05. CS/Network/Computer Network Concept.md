# Computer Network 개론

## Computer Network 용어

- Host 는 애플리케이션 동작시켜. → 컴퓨터
- Router 는 정보 전달.
- Packet 은 bytes의 단위. 목적지 host 주소 등 정보 담겨있음.
- Protocol 은 패킷 사이즈나 구조 등에 관한 규약

## Host 간 패킷 전송 과정

- 네트워크 계층

  : Application > transport > network > link > Physical

  - Application

    - 네트워크 애플리케이션 support
    - 웹 - HTTP. 파일 - FTP. 이메일 - SMTP. 호스트config - DHCP. Name System - DNS
    - 전송 데이터 = Message(M)

  - Transport

     (L4)

    - 프로세스 간 데이터 전송 (TCP.UDP)
    - 전송 데이터 = TCP면 segment UDP면 datagram

  - Network

     (L3)

    - 목적지까지 datagram 라우팅 (IP. routing protocol)
    - 전송 데이터 = packet

  - Link

     (L2)

    - 근접 네트워크끼리 데이터 전달 (Ethernet. Wifi. PPP)
    - 전송 데이터 = Frame (Message + Hi + Hn + Ht)

  - **Physical** : “on the wire”

- 전송할 데이터 → 패킷으로 나눠 전송 → 패킷 = Header + Data → Header에는 IP, Port, Mac 주소

- **패킷 캡슐화** : 패킷이 상위 계층에서 하위 계층으로 내려올때마다 헤더 추가됨

- **패킷 캡슐해제** : 패킷이 하위 계층에서 상위 계층으로 올라갈때마다 헤더 삭제

- 패킷 전송 과정

  1. Host 가 패킷 캡슐화 과정 거쳐서 패킷 생성 후 전달
  2. Switch가 Link 계층에서 MAC 주소 확인해서 Router에 전달
  3. Router가 Network 계층에서 IP 주소 확인해서 목적지 호스트에 전달
  4. Host 는 Transport 계층에서 Port 주소 확인해서 Application 에 Message 전달

## Computer Network 에서의 주소

- I**P주소**

  - 인터넷 상에서의 고유 주소
  - Network 계층에서 사용
  - IPv4 - 32bit(=4byte) / IPv6 - 128bit(=6byte)

  - 공인 IP vs 사설 IP
    - 공인 IP : 인터넷에서 사용 가능
    - 사설 IP : 내부 네트워크(ex. 공유기) 안에서만 사용되는 주소 → 인터넷에서 사용 불가
  - NAT(Network Address Translation)
    - 공유기 내부에서 외부로 패킷 나가는 경우 공유기가 사설 IP → 공인 IP 로 변환해준다.

- **Port 주소**

  - 호스트 안에서의 고유 주소
  - Transport 계층에서 사용
  - 16bit (=2byte)

- **MAC 주소**

  - Link 네트워크 상(서브넷?)에서의 고유한 주소
  - Link 계층에서 사용
  - 48bit (=6byte) → 24bit (제조회사코드) +22bit (OUI) + 24bit (시리얼 넘버)

- 인터넷 구성 요소
  - Host(server/client)
    - 1개의 ip 주소 + 1개의 MAC 주소
  - Ethernet Swtich(L2스위치)
    - MAC 주소 ( ← Subnet 안 Host들과 Router의 MAC 주소?)
  - Router(L3스위치)
    - 1개의 ip 주소 + 1개의 MAC 주소
- Subnet = Host 간 network ID가 동일한 그룹

## IP/TCP/UDP/HTTP

- IP(Internet Protocol)
  - datagram service  → packets. IP 주소
  - best-effort → 보내긴 할건데 도착 보장 안해.
- TCP(Transmission Control Protocol)
  - Reliable byte-stream channel. Flow control. bidirectional
  - 데이터가 큰 서비스. 안정적으로 유지되는 연결
- UDP(User Datagram Protocol)
  - No Ack. 순서 없고 중복 가능. 연결성 X
  - 속도가 빠른 서비스
- HTTP(Hypertext Transfer protocol)
  - TCP 연결 후에 동작 시작. → non-persistent/persistent 가능
  - 과거 클라이언트 요청에 대한 기록을 남기지 않아 → stateless
  - Request Message
  - Response Message

## 인터넷 동작 설명 사례

1. 구글 검색을 해요
2. 브라우저는 Cache에서 DNS 조회를 한적 있는지 확인해요
3. 없다면 DNS server에 요청해서 해당 IP 주소를 받아내요
4. 브라우저는 IP 주소로 해당 서버와 TCP 연결을 시도해요
5. TCP 연결에 성공하면 웹서버에 HTTP 요청을 보내고 응답을 받아요
6. 브라우저는 응답에 기반해서 HTML 페이지를 보여줘요

## DHCP.ARP.DNS Protocol

- DHCP(Dynamic Host Configuration Protocol)
  - 노트북이 새로운 subnet과 연결 → subnet 안에 있는 DHCP 서버에 접속 하면..
  - new IP 주소 + subnet 안에 있는 첫번째 Router IP 주소 + DNS 서버 이름/IP주소 알려줘!
- ARP(Address Resolution Protocol)
  - 첫번째 Router MAC 주소 알려줘
  - 모든 라우터들에게 broadcast  → 응답한 라우터의 MAC주소 사용
- DNS(Domain Network System)
  - [www.google.com](http://www.google.com) 의 IP주소를 알려줘!

## TCP/UDP Protocol

- TCP
  - 3-way handshaking 연결 → data transfer 여러번 → 4-way handshaking 연결 해지.
  - data를 일정 단위로 쪼개서 byte stream 형식으로 송신 → 수신측은 이들을 조합
  - handshaking 방법으로 데이터 이동이 성공적인지 체크하고 실패했다면 재전송해.
  - 하나의 connection 안에서 양방향 통신 가능
  - Flow control → 수신 측 버퍼가 overflow 되지 않게 발신측 전송 속도 조절
  - Congestion control → 중간 라우터들 버퍼가 overflow 되지 않게 발신측 전송 속도 조절
  - SMTP(mail). Telnet. HTTP(web). FTP(file). HTTP/SIP(실시간)
- UDP
  - conenct 없이 데이터 전송
  - data 쪼개지 않고 datagram 한번에 전송
  - data 송수신 성공적인지 확인 안해. handshaking 따위 없음. 단방향 통신임
  - 발신측 전송 속도 조절 그런거 못함
  - 신뢰성 없지만 간단하고 빨라 → 실시간 화상 통신. DNS..
  - HTTP/SIP(실시간)

