# GUI Architecture

안드로이드 애플리케이션의 GUI는 보통 MVC 패턴으로 구성된다.

## MVC Pattern

Model-View-Controller 

<img src="https://i.imgur.com/zjzahBI.png" style="zoom:30%;" />

### Model

- 앱의 코어 부분으로서 데이터 모델 구성

### View 

- Model의 visualization 담당하는 부분으로, 화면에 그래픽 정보를 렌더링한다.
- View class들은 **트리 구조로 정의**되어 있고, 트리의 root를 **application window** 라고 부른다. 
- UI 프레임워크는 이러한 트리를 preorder 순으로 순회하면서 스크린을 그리게 된다. 즉, 각 view들은 자신을 먼저 그린 후 자신의 자식 view들을 그릴 것을 요청하는 방식이다.

### Controller 

- 사용자의 입력을 포함한 외부 이벤트를 감지하고, 이에 대한 적절한 액션을 수행한다. (ex. 키 입력, 스크립 탭, 전화 수신 등)
- 발생한 이벤트들은 **Event Queue**에 쌓이게 되고, UI 프레임워크가 이를 순서대로 처리한다. 
- <u>event가 in-focus view에 dispatch 되면 해당 view는 프로그램 내부 상태를 변화시키는 적절한 액션을 수행해야 한다.</u> 

