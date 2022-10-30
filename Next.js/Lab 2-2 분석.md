## Lab 2-2 분석 

20192942 공소나

*echo_client.c* 는 TCP를 기반으로 소켓 통신이 이루어진다. 따라서 connect 함수를 통해 서버 소켓과 연결을 시도한 후, 성공 시 데이터 송수신이 이루어지는 것을 볼 수 있다.

<img src="/Users/gongsona/Library/Application Support/typora-user-images/스크린샷 2022-10-20 06.04.30.png" alt="스크린샷 2022-10-20 06.04.30" style="zoom:50%;" />

이와 달리 *uecho_client.c* 에서는 UDP을 기반으로 소켓 통신을 한다. UDP 통신은 소켓 간 연결 없이 데이터 송수신이 진행되므로 echo_client.c 에서 보았던 connect 함수는 볼 수가 없다. 그러나 UDP 통신은 데이터를 전송할 때마다 목적지에 대한 정보를 전달해야하므로 이 부분을 sendto 함수에서 진행한다. 아래 코드에서 sendto 함수 인자로 serv_addr를 담아 메세지를 전송하는 것을 알 수 있다. 

![스크린샷 2022-10-20 06.07.29](/Users/gongsona/Library/Application Support/typora-user-images/스크린샷 2022-10-20 06.07.29.png)

마지막으로 *echo_con_client.c* 에서는 connected UDP를 기반으로 통신을 한다. connected UDP 는 TCP 처럼 소켓 간의 연결을 하는 것이 아니라 소켓에 목적지 정보를 등록하는 것을 의미한다. ![스크린샷 2022-10-20 06.10.42](/Users/gongsona/Library/Application Support/typora-user-images/스크린샷 2022-10-20 06.10.42.png)

이렇게 목적지 정보를 미리 등록하게 되면 sendto, recvfrom 함수가 아닌 write, read 함수를 이용하여 데이터 송수신을 할 수 있게 된다. 

<img src="/Users/gongsona/Library/Application Support/typora-user-images/스크린샷 2022-10-20 06.11.56.png" alt="스크린샷 2022-10-20 06.11.56" style="zoom: 50%;" />

