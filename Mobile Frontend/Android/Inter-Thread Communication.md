# Inter-Thread Communication

- MainActivity에 Send Thread, Recv Thread를 생성
- Send 스레드는 메인 스레드로부터 받은 키를 외부 서버에 전송한다. (소켓 통신)
- Recv 스레드는 외부 서버로부터 받은(읽은) 키를 메인 스레드에 전송한다. 
- 메인 스레드는 myTetris에서 받은 키를 에코 서버에 보냈다가, 그대로 다시 에코 서버에게 키를 받아서 peerTetris에 적용

## Socket Communication

- IPC API: 프로세스 간 통신을 위한 API
- Socket은 프로세스와 프로토콜 스택 사이의 API 인터페이스로서, 프로세스 사이의 가상 연결을 표현하는 엔드 포인트
  - TCP: 연결성 있음. stream service
  - UDP: 연결성 없음. datagram service

<img src="/Users/gongsona/Library/Application Support/typora-user-images/스크린샷 2023-12-15 18.21.19.png" alt="스크린샷 2023-12-15 18.21.19" style="zoom:40%;" />

- 보내는 자
  - sd = socket() 으로 소켓 생성 
  - coonect(sd) 로 받는 자에게 연결 신청 `socket.connect`
  - 연결 완료시 send/write(sd), recv/read(sd) `outStream.writeByte` and `inStream.readByte`
  - close(sd) 로 연결 해제 `socket.close()`

- 받는 자 
  - sd = socket() 으로 소켓 생성
  - bind(sd) -> listen(sd) 로 연결 신청을 기다림
  - 연결 요청 오면 sd2 = accpet(sd) 통해 연결 위한 새로운 소켓 생성
  - 연결 완료시 send/write(sd), recv/read(sd)
  - close(sd) 로 연결 해제

## Send Thread and Recv Thread

- Send Thread: 서버 연결 요청

  ```java
  private boolean connectServer() {
      synchronized (socketReady) {
          try {
           	// reconnect을 시도 방지
            if(socket != null) _disconnectServer();
              socket = new Socket();
              socket.connect(new InetSocketAddress(serverHostName, serverPortNumber), maxWaitingTime);
              outStream = new DataOutputStream(socket.getOutputStream()); // by send thread
              inStream = new DataInputStream(socket.getInputStream()); // by recv thread
              synchronized (inStreamReady) {
                // recv thread에게 instream.readByte 가능함을 알림
                  inStreamReady.notify();
              };
              return true;
          } catch(Exception e) {
              _disconnectServer();
              e.printStackTrace();
              return false;
          }
      }
  };
  ```

- Recv Thread: 서버 연결 요청을 대기

  ```java
  private Runnable runnableForRecvThread = new Runnable() {
    @Override
    public void run() {
        while(true) {
           try {
               char key;
             // SendThread가 notify() 호출해주면 그때되서야 접근 가능: wait
               synchronized (inStreamReady) {
                   while(inStream == null) inStreamReady.wait();
               }
               // stream에서 오는 key가 Q가 아닐때까지 계속 메인 스레드에 전달
               while((key = (char) inStream.readByte()) != 'Q') {
                   if(key != '\n') sendToMain(key);
               }
               // key = Q -> quit
               sendToMain(key);
           } catch(Exception e) {
               e.printStackTrace();
           }
           disconnectServer();
        }
    };
  };
  ```


## Thread Synchronization

왜 동기화를 해야하나?

- SendThread가 `connectServer()` 통해서 `socket.connect()` 호출 후 intStream 객체 생성하는 동안. RecvThread는 `inStream.readByte()` 통해 접근해서는 안된다.
- 두 스레드가 connectServer, disconnectServer 동시에 호출 가능하다. 

### 동기화 메서드

- notify, wait 함수 사용 -> `inStream`에 두 스레드가 동시에 접근하지 못하도록. 

```java
// by sendThread 
synchronized(inStreamReady) {
	inStreamReady.notify(); // inStream 사용할 수 있음을 알림 
}
// by recvThread 
synchronized(inStreamReady) {
	while(intStream == null) inStreamReady.wait();  // notify 호출까지 대기
}
```

- socketReady -> 한번에 하나의 스레드만 연결 시도 혹은 종료를 할 수 있도록.

```java
// connectServer by sendThread
synchronized(socketReady) {
	socket = new Socket();
	socket.connect(new InetSocketAddress(hostName, hostPort), wt);
	outStream = new DataOutputStream(socket.getOutputStream());
	inStream = new DataInputStream(...);
}
// disconnectServer by any thread
synchronized(socketReady) {
  if (outStream != null) outStream.close();
  if (inStream != null) inStream.close();
  if (socket != null) socket.close();
}
```

## Communication

- main thread -> send thead -> echo server
- echo server -> recv thread -> main thread

## Access 

외부 서버와 통신하려면 Access 설정 필요 

```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.INTERNET"/>
```

