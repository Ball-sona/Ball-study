# Handler and Looper

- 테트리스 블록이 1초에 한칸씩 자동으로 아래로 이동할 수 있도록 타이머 설정
- mirror mode 선택 시 메인 스레드의 UI를 그대로 복사해서 자신의 UI를 업데이트하는 새로운 스레드 생성

## UI Single Thread

- 안드로이드의 UI 처리는 **싱글 스레드 모델**로 동작한다.
- 여러 스레드에서 UI를 업데이트하려고 하면 어떤 결과를 발생시킬 지 미지수이기 때문에, 오직 메인 스레드만 UI 관련 처리 가능하다.
- 따라서 오래 걸리는 연산이나 무거운 작업은 되도록 메인 스레드에서 돌리지 않고, 다른 스레드에서 처리 후 메인 스레드에 전송하도록 설계하는 것이 좋다.

스레드 간 통신을 구현하기 위해서 Looper와 Handler를 사용한다.

## Looper

- 하나의 스레드는 하나의 Looper를 가진다. 기본적으로 `MainActivity` 가 실행되면 자동으로 메인 스레드의 `Looper` 가 돌기 시작한다.
- Looper 내부에는 **Message Queue**가 존재하는데, 여기에는 해당 스레드가 처리해야 할 동작이 담긴 Message가 쌓이게 된다.
- Looper는 이러한 메세지 큐에서 메세지를 하나씩 꺼내서 적절한 Handler에 전달(dispatch) 하는 역할을 한다.

### Message

메세지는 두가지 종류의 내용물을 가질 수 있다.

- Runnable 객체: 메세지에 `Runnable` 객체가 담겨있으면 Looper는 이를 Handler에 전달하지 않고 Runnable 객체 내 `run()`를 바로 수행한다.
- Message 객체: `Message` 객체 내부에 명시되어 있는 Handler의 `handleMessage()` 를 수행한다.

## Handler

- Handler는 특정 메세지를 Looper의 메세지 큐에 넣거나, Looper가 전달하는 특정 메세지를 처리하는 기능을 수행한다.

### Looper에게 메세지 전달

- `sendMessage` 메서드 사용하여 Message 객체를 메세지 큐에 넣기
- `post*` 메서드 사용하여 Runnable 객체를 메세지 큐에 넣기

### Looper로부터 메세지 수신

- Runnable 객체가 담겨있다면 해당 객체의 `run()` 수행
- Message 객체가 담겨있다면 메세지 내부의 Handler가 갖고 있는 `handleMessage()` 호출 후 메세지 전달 받음.

## Handler, Looper 활용해서 Timer 만들기

```java
// 메인 스레드의 Looper의 메세지 큐에 접근하는 핸들러 생성
private final Handler timerHandler = new Handler(Looper.getMainLooper());

// Runnable 객체
private Runnable runnableTimer = new Runnable() {
    @Override
    public void run() {
        if(gameState == GameState.Running) {
            updateModel('s');
            timerHandler.postDelayed(this, 1000);
        }
    }
};

// 게임 시작 시 호출되는 함수로, Handler가 Runnable 객체를 Looper에 전달
private void launchTimer() {
	timerHandler.postDelayed(runnableTimer, 0, 1000);
};
```

1. 게임 시작 시 `launchTimer` 함수가 호출되면서, timerHandler가 `runnableTimer` 라는 Runnable 객체를 메인 Looper의 메세지 큐에 넣는다. 이때 `postDelayed` 함수를 호출함으로써 해당 Runnable 객체의 `run()` 가 1초의 delay 후 실행되도록 한다.
2. 메인 Looper가 해당 메세지를 꺼내게 되면, (1초의 지연 시간 후) `run()` 함수가 호출된다.
3. `run()` 는 현재 게임이 실행 중이라면, `updateModel('s')`를 호출하고, 즉 블록의 위치를 한칸 아래로 업데이트 한 후 timerHandler가 메인 Looper의 메세지 큐에 해당 Runnable 객체(`this`)를 전달하도록 한다.
4. 즉 게임 실행이 시작되고 `launchTimer` 함수가 정상적으로 호출되었다면, `runnableTimer` 객체가 담긴 메세지는 메인 Looper의 메세지 큐에 1초 간격으로 계속 쌓이게 되는 것이다.
5. 이런 방식으로 자동으로 테트리스 블록이 1초 간격으로 아래로 떨어질 수 있도록 한다.

## 새로운 Thread 생성

메인 스레드 외 새로운 스레드를 생성하는 방법은 2가지가 있다.

- Thread 클래스 상속한 후 `run()` 메서드 override
- Runnable 인터페이스 구현한 클래스 선언 후 `run()` 메서드 작성

여기서 두번째 방법을 통한 스레드 생성에 대해 알아보자.

```java
private Runnable runnableForNewThread = new Runnable() {
    @Override
    public void run() {
 	     // Looper 및 메세지 큐 준비
        Looper.prepare();
       // Handler 연결
        handlerForNewThread = new Handler(Looper.myLooper()) {
            @Override
            public void handleMessage(@NonNull Message msg) {
               // ...
            }
        };
       // Looper 동작 시작 (메세지 큐 관찰 시작)
        Looper.loop();
    }
};

```

위와 같이 Runnable 객체의 `run` 메서드에서 다음과 같은 작업을 반드시 해야한다.

1. Looper.prepare()
2. Handler 할당
3. Looper.loop()

이렇게 생성한 Runnable 객체를 가지고 새로운 스레드를 생성 후 시작한다. 이 작업은 Activity의 `onCreate` 에서 이루어져야한다.

```java
Thread thread = new Thread(runnable);
thread.setDaemon(true);
thread.start();
```

### User thread vs Daemon thread

- User thread: foreground에서 실행되는 높은 우선순위 가진 스레드. 사용자 스레드들이 모두 종료 시 프로그램 종료
- Daemon thread: background에서 실행되는 낮은 우선순위 가진 스레드. 보조적인 역할 담당. 데몬 스레드가 실행되고 있어도 사용자 스레드 모두 종료시 프로그램 종료

## Inter-thread commnunication

게임이 현재 mirror mode일 경우, `myTetrisView` 가 업데이트될 때마다 동일한 UI로 `peerTetrisView` 가 업데이트되어야 한다. 이때 메인 스레드에서 받은 key를 peer에게 전달하고, 이에 대한 업데이트 내용을 다시 메인 스레드에게 전달하는 background 스레드를 만들어보자.

> 원래 새로운 스레드에서는 key를 peer에게 전달 후, peerTetrisView의 업데이트를 메인 스레드에게 전달해야 한다. 근데 지금은 미러 모드를 구현하는 단계로, peerTetrisView는 myTetrisView와 동일하게 복사만 하면 되므로, 새로운 스레드에서는 전달 받은 key를 그대로 다시 메인 스레드에게 전달하는 역할만 우선 구현한다. = loopback

<img src="https://i.imgur.com/6PF4M5d.png" style="zoom: 25%;" />

1. 메인 스레드에서 `handlerForMainThread` 생성한다. 이때 `handleMessage` 함수도 같이 선언하는데, 해당 함수는 다른 스레드에서

   ```java
   private Handler handlerForMainThread = new Handler(Looper.getMainLooper()) {
       @Override
       public void handleMessage(@NonNull Message msg) {
           try {
              // LB 스레드로부터 받은 key를 가지고 peerTetrisView, peerTetrisModel 업데이트
               mirrorPeer((char) msg.arg1);
           } catch (Exception e) {
               e.printStackTrace();
           }
       };
   };
   ```

2. `peerTetrisView` 의 업데이트를 담당할 Loopback 스레드를 새로 생성한다.

   ```java
   private Handler handlerForLBThread;
   private Runnable runnableForLBThread = new Runnable() {
       @Override
       public void run() {
           Looper.prepare();
           handlerForLBThread = new Handler(Looper.myLooper()) {
               @Override
               public void handleMessage(@NonNull Message msg) {
                   try {
                     // 메인 스레드로부터 받은 key를 그대로 메인 스레드에 다시 전달
                       sendToMain((char) msg.arg1);
                   } catch(Exception e) {
                       e.printStackTrace();
                   }
               }
           };
           Looper.loop();
       }
   };
   ```

3. MainActivity의 `onCreate` 함수에서 새로운 스레드를 생성하고 실행 시작시킨다.

   ```java
   private void startThread(Runnable runnable) {
       Thread thread = new Thread(runnable);
       thread.setDaemon(true);
       thread.start();
   };

   // in onCreate of MainActivity
   startThread(runnableForLBThread);
   ```

4. 메인 스레드에서 새로운 키를 받아 Model 및 View를 업데이트시킬 때마다, `sendToPeer(key)` 를 통해 loopback 스레드에게 이를 전달한다.

   ```java
   private void sendMessage(Handler handler, int type, char key) {
       Message msg = Message.obtain(handler, type); // 메세지 객체 생성
       msg.arg1 = key; // 메세지 내용물로 key 추가
       handler.sendMessage(msg); // 지정한 handler와 연결된 looper 메세지 큐에 메세지 적재
   };
   // handlerForMainThread -> handlerForLBThread
   public void sendToPeer(char key) {
       sendMessage(handlerForLBThread, 0, key);
   }
   // handlerForLBThread -> handlerForMainThread
   public void sendToMain(char key) {
       sendMessage(handlerForMainThread, 0, key);
   }
   ```

5. `sendToPeer` 에서 `handlerForLBThread.sendMessage(msg)` 가 실행되었으므로, handlerForLBThread 내 `handleMessage` 함수가 호출된다 -> `sendToMain`
6. `sendToMain` 함수에서 `handlerForMainThread.sendMessage(msg)` 가 실행되었으므로, handlerForMainThread 내 `handleMessage` 함수가 호출된다 -> `mirrorPeer`

7. `mirrorPeer` 함수에서는 `peerTetrisView` 와 `peerTetrisModel` 을 생성하고 전달받은 key에 따라 업데이트된다.

> 안드로이드의 UI 처리는 **싱글 스레드 모델**이기 때문에 UI 업데이트는 모두 메인 스레드에서 처리하고 있는 것을 볼 수 있다. 백그라운드 스레드에서는 메인 스레드로부터 동일한 키를 전달 받아서 peerTetrisView에 반영될 업데이트 작업을 진행할 것!
