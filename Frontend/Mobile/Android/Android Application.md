# Android Application

## 안드로이드 앱이란

- apk 확장자의 패키지 파일, 앱 컴포넌트들의 집합

- 하나의 앱을 구성하는 앱 컴포넌트들은 일반적으로 **하나의 프로세스 안**에 존재하고, **각각의 생명주기**를 가지고 관리된다.
- 앱들은 `intent` 또는 `AIDL` 통해 통신
- 최소 특권 원칙(the principle of least privilege)에 의해 앱은 필요 이상의 권한을 가질 수 없다.

### 앱 컵포넌트

<img src="https://i.imgur.com/n7Y303E.png" style="zoom:60%;" />

- Activity: 하나의 앱 화면에 대응되는 앱 컴포넌트
- Broadcast Receiver: Broadcast intents에 반응하는 앱 컴포넌트
- Content Provider: 앱 간 데이터 공유를 가능하게 하는 앱 컴포넌트
- Service: 백그라운드에서 실행하는 앱 컴포넌트

## 프로젝트 폴더 구조

- manifests: 애플리케이션 권한 설정 및 구성 요소 열거하는 파일
  - AnroidManifest.xml
- java/[package]: 안드로이드 플랫폼에 의존적인 자바 소스 파일들
- res: 이미지, 사운드 등 리소스 파일들
  - layout: Activity별 화면 배치 파일들(ex. activity_main.xml)

## AnroidManifest.xml

- 앱 컴포넌트 선언
- 앱이 필요로 하는 permission 기술 (데이터 네트워크 사용 여부, 주소록 사용 여부 등)
- 앱이 요구하는 최소 API 레벨, H/W 기능, API 라이브러리 선언 등

## Activity

- 사용자 인터페이스를 가지는 하나의 screen
  - ex. 이메일 앱은 `EmilListActivity` , `EmailDetailActivity` , `EmailEditorActivity` 등 여러 액티비티로 구성
  - screen : activity = 1 : 1
- 각각의 activity들은 독립적인 컴포넌트이지만, 일관성 있는 UX를 구성하기 위해 함께 작동하기도 함
  - ex. 카메라 앱은 방금 찍은 사진을 확인하기 위해 갤러리 앱의 액티비티를 호출
- 각 activity들은 플랫폼이 제공하는 `Activity` 클래스 상속 받아서 개발자가 작성
- 각 activity들은 해당하는 screen을 정의하기 위해 적어도 하나의 `View` or `Viewgroup`을 설정해야 한다.

### Task

- 하나의 앱은 intent를 통해 다른 앱의 기능을 빌려쓸 수 있다.
- 이렇게 만들어진 Activity stack은 Task
- Task는 여러 프로세스 걸쳐 있을 수 있음

## View

- View는 앱 화면에 공간을 차지하는 visible한 그래픽 컴포넌트로, 사용자와 상호작용이 가능하다.
  - ex. `Button` , `TextView` , `RadioButton` 등
  - widget or control 이라고도 부름
- 한 앱의 화면, 즉 <u>하나의 Activity는 하나 이상의 View들로 구성</u>된다.
- View group은 앱 화면에 공간은 차지하되 **invisible**한 그래픽 컴포넌트로, <u>다른 view들을 담는 컨테이너 역할</u>을 수행한다.

<img src="https://i.imgur.com/AInTC3f.png" style="zoom:40%;" />

> 배치된 view들의 트리구조는 깊이가 얕을수록 성능에 유리하다.

### View 배치 방법

1. XML로 정의: 모든 view class와 subclass에 대응하는 XML 정의
   - UI 변경 시 자바 코드를 건들이지 않아도 됨
   - 스크린 방향, 크기, 사용 국가 등에 따라 XML 각기 생성하고 실행 시점에 불러와 사용 가능
2. 앱 실행 시점에 생성: view or viewGroup 인스턴스를 런타임에 생성

위 두가지 방법은 섞어서 사용 가능하다.

## 자주 사용되는 UI 배치

### Layout

- LinearLayout: 가로/세로 설정. 스크린 길이 초과시 스크롤 생성 가능
- RelativeLayout: view 위치를 부모 혹은 다른 자식의 view의 상대적인 위치로 정의
- WebView: 웹 페이지 디스플레이

### AdaptorView

사용될 컨텐츠가 동적으로 결정될 때 사용된다. 이때 `Adaptor` 클래스와 함께 사용되는데, `Adaptor` 클래스는 `AdaptorView` 와 데이터 사이의 중간 매개체 역할을 수행하는 클래스로, 각 데이터 항목을 `AdaptorView` 안에 포함될 수 있도록 view로 변환해준다.

- ListView: a scrolling single column list
- GridView: a scrolling grid of columns and rows
