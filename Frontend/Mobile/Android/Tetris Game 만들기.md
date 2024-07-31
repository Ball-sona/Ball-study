# Battle Tetris Game for Android

테트리스 게임을 안드로이드 앱으로 만들어보자!

## 프로젝트 구상 단계

1. 설계 로드맵 구상
   - 1인용 흑백 콘솔 테트리스
   - 1인용 흑백 콘솔 테트리스 + duplicated screen
   - 1인용 컬러 테트리스 + duplicated screen
   - 1인용 컬러 테트리스 + Echo Server -> 멀티 스레딩/소켓
   - 2인용 컬러 테트리스 + Tetris Server
2. Source Tree 구상
   - deterministic 요소 : 데이터 모델 -> 키 입력, 화면 출력, 타이머 구동 등
   - non-deterministic 요소 : 외부 인터페이스 -> 블록 출현, 충돌, 행 삭제 등
3. 데이터 모델 구상
   - 시나리오들이 집합화된 결과물인 순서도
   - 시나리오들이 연산화된 결과물인 객체간 연산 정의
4. 데이터 모델 코딩
   - 단순 시나리오에서 점진적으로 확장하기
   - 데이터 모델의 단순성 추구 : 경계 조건의 중요성 인식

## 정적 변수와 동적 변수 분리

- 정적 변수

  - 테트리스 게임 시작 후 변하지 않는 값. 모든 게임에서 동일한 값 사용
  - ex. 블록 데이터를 담은 행렬 배열 및 Matrix 배열, 해당 배열을 통해 결정한 테트리스 화면 벽 두께 등
  - `Tetris.init()` 을 통해 초기화

- 동적 변수
  - `Tetris board = new Tetris(dy,dx);`

## 프로젝트 아키텍처

### Basic Model

- Matrix 클래스: 2차원 배열로 표현된 행렬을 다루는 기능을 제공하는 클래스 (clip, mulc 등)
- Tetris 클래스: 테트리스 게임의 핵심 로직을 담당하는 클래스로, 현재 블록 및 전체 화면에 대한 Matrix를 관리하고 사용자의 입력에 따라 데이터를 업데이트하는 역할을 담당한다.

### MVC

- MainActivity(Controller): 버튼 클릭 이벤트를 감지 후 적절한 key 혹은 새로 그릴 block 번호를 Model에 전달한다. 이후 Model에 의해 업데이트된 block 혹은 screen matrix 데이터를 View에 전달하여 앱 화면이 새롭게 렌더링 될 수 있도록 한다.
- TetrisModel: Activity로부터 받은 key를 바탕으로 새로운 block을 생성하거나 기존 block을 이동시키고, 전체 screen matrix도 업데이트한다.
- TetrisView/BlockView: Activity로부터 전달받은 matrix 데이터를 안드로이드 화면에 맞게 출력한다. TetrisView는 block들을 포함한 전체 screen을 출력하고, BlockView는 전달 받은 하나의 block을 출력한다.

## State 관리

### ver1. TetrisState

하나의 Tetris 객체는 하나의 TetrisState(`Running`,`Newblock`,`Finished` 중 하나)를 가질 수 있다. 하나의 TetrisModel은 하나의 Tetris 객체를 가지고 전체 테트리스 화면을 관리하게 되므로, 결론적으로 1개의 게임(싱글 플레이어 기준)은 1개의 `TetrisState`를 가지게 되는 것이다.

TetrisModel에서는 MainActivity로부터 전달받은 key값을 가지고 screen, block 데이터와 TetrisState를 업데이트 후, 현재 TetrisState를 반환한다. MainActivity는 Model로부터 받은 TetrisState를 가지고 게임 상태를 판단 후 적절한 작업을 수행한다.

> 게임 시작 및 종료는 `boolean gameStarted` 로 관리

### ver2. GameState 추가

안드로이드 액티비티의 생태주기를 고려하여 좀 더 정교한 상태 관리를 위해 현재 앱의 UI 상태를 나타내는 `GameState` 와 이들의 전이를 유발하는 `GameCommand`를 생성한다.

click 이벤트 발생시 매번 호출되는 `executeCommand` 함수에서 전달 받은 command와 key를 통해 적절한 작업을 수행하게 되고, gameState와 tetrisStater가 적절하게 업데이트 된다.

## SettingActivity 추가하기

- MainActivity -> SettingActivity: `registerForActivityResult` 통해 SettingActivity 호출 후 return 값(ip 주소와 포트번호) 받아오기
- SettingActivity -> MainActivity: `resIntent.putExtra` 와 `setResult` 통해 MainActivity에 return 값 전달

## Timer

```java
private final Handler handlerForTimer = new Handler(Looper.getMainLooper());
private Runnable runnableTimer = new Runnable() {
    @Override
    public void run() {
        if(gameState == GameState.Running) {
            updateModel('s');
            Log.d("MainActivity", "ondraws="+myTetrisView.ondraw_calls);
            handlerForTimer.postDelayed(this, 1000);
        }
    }
};
private void launchTimer() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) // P means 'Android Pie', aka Android 9.0
        handlerForTimer.postDelayed(runnableTimer, 0, 1000);
};
```

## Mirror Mode(ver.1)

- peerTetrisView, peerTetrisModel 생성
- 메인 스레드는 Loopback 스레드에 키 전송 -> Loopback 스레드는 받은 키를 다시 메인 스레드에 전달
- 메인 스레드는 Loopback 스레드로부터 받은 키를 PeerTetris에 반영

UI 업데이트는 결국 무조건 메인 스레드에서만 처리해야한다는 것 주의! Loopback 스레드에 키를 보내는 이유는 그냥 스레드 통신을 공부하기 위함...

## Mirror Mode(ver.2)

- Loopback 스레드는 지우고. 대신 Send, Recv 스레드 생성
- Send 스레드는 메인 스레드로부터 키를 전달 받아서 echo server에 전송 (소켓 통신)
- echo server는 이를 그대로 다시 앱에 전송
- Recv 스레드는 echo server로부터 키 읽어서 메인 스레드에 키를 전달
- 메인 스레드는 Recv 스레드로부터 전달 받은 키를 PeerTetris에 반영

현재는 서버가 앱으로부터 받은 키를 단순히 다시 반환하는 역할만 하고 있지만, 이를 다른 앱에 보내거나 승패 판정을 하는 등 기능 확장을 할 필요가 있다!
