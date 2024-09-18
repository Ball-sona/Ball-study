# Chapter8. 자바스크립트 MV* 패턴

애플리케이션 아키텍처 패턴인 MVC, MP, MVVM에 대해 알아보자.

## MVC 패턴

- Model - View - Controller
- 도메인 객체와 사용자 화면에 렌더링하는 프레젠테이션 객체 사이를 구분하기 위한 '분리된 프레젠테이션' 개념 등장 -> 이를 발전시킨게 MVC로 **비즈니스 로직과 UI를 분리**하는 것을 목표로 함.
- 애플리케이션의 일부분을 분리함으로써 모델을 애플리케이션의 다른 인터페이스에서도 재사용할 수 있다. 
- MVC 패턴을 지원하는 자바스크립트 프레임워크에는 Backbone.js, Ember.js, AngularJS 등이 있고, 리액트, 앵귤러, Vue.js에서도 MV* 패턴을 변형해서 구현 가능하다.

> MVC는 관찰자, 전략, 컴포지트의 3가지 전통적인 디자인 패턴의 '변형'이다. MVC가 구현된 방식에 따라 팩토리, 템플릿 패턴도 사용될 수 있다. 

### 구조

![MVC pattern](https://www.oreilly.com/api/v2/epubs/9781449334840/files/httpatomoreillycomsourceoreillyimages1547821.png)

### Model

- 도메인 관련 데이터를 관리하는 역할
- 모델이 변경되면 관찰자에게 이를 알려서 -> 뷰가 이를 반영할 수 있도록 함.
- 모델의 속성을 검증하는 기능, 모델의 데이터를 지속적으로 유지하는 기능 등 내장 기능 
- 한 가지 모델을 여러 뷰가 관찰할 수도 있다. 
- 모델을 컬렉션으로 그룹화하는 기능 -> 그룹 내 특정 모델이 변경되면 알림 울려서 개별 모델 인스턴스 직접 관찰할 필요 없음 ⚠️
  - `Backbone.Collection.extend({})`

### View

- 여러 DOM 요소의 집합을 생성하고 정리하는 역할 
- 뷰는 모델을 관찰하고, 모델에 변화가 생기면 알림을 받아 스스로를 업데이트해서 <u>최신 상태를 유지</u>
- 뷰는 사용자와 상호작용하고, 모델의 데이터를 읽고 수정하는 기능 -> 수정 시 업데이트는 '컨트롤러'에 전달된다.
- Template 
  - 뷰 객체의 일부나 전체를 선언적으로 지정하는 '방법'
  - 태그 템플릿 리터럴 -> 동적인 HTML 컨텐츠 생성, 간결하고 유지보수 용이 (ex. styled-components)

### Controller

- 모델과 뷰 사이의 중재자 역할 = 모델과 뷰 모두 알고 있어야 하고, 이들의 업데이트를 모니터링하고 있어야 한다.
  - 모델과 뷰는 다른 애들한테 관심 안갖고 자기 역할만 충실하면 되지만, 컨트롤러는 모델과 뷰의 흐름을 잘 제어해야 할 의무 가짐.

- 사용자가 뷰를 조작해서 특정 값의 업데이트가 필요할 때. <u>모델을 업데이트하는 역할</u> 

```js
class UserModel(name, email) {}

class UserView {
  function displayUserInfo(name, email) {
    console.log(name, email)
  }
}

class UserController {
  private const userModel = new UserModel('name', 'mail@naver.com');
	private const userView = new UserView();

	function displayUserInfo() {
    const [name, email] = [userModel.name, userModel.email];
    userView.displayUserInfo(name, email);
  }
}

const userController = new UserController();
userController.displayUserInfo();
```

### MVC 패턴을 사용했을 때 이점은?

- '관심사 분리'
- Model, View, Controller라는 3개의 컴포넌트로 명확하게 나누기 때문에 서로 간의 결합도를 낮출 수 있다.
- 코드의 재사용성과 확장성을 높일 수 있다.
- 서비스 유지보수가 편리해지고 단위 테스트 작성이 간단해진다.

### 그렇다면 한계점은?

- 모델과 뷰의 의존성을 완전히 분리시킬 수 없다. 위 예시 코드만 봐도 `userView` 가 `displayUserInfo` 함수를 실행하기 위해 `userModel` 의 데이터를 직접적으로 참조해서 사용하고 있다. 이는 뷰와 모델이 결합되어있다고 볼 수 있음. 
- 애플리케이션 커질수록 컨트롤러의 크기나 개수가 비대해진다. 복잡성도 증가함 
  - Massive-View-Controller

-> 이런 한계점을 극복하기 위해 파생된 패턴들이 MVP, MVVM, Flux 등

## MVP 패턴

- Model - View - Presenter
- 뷰와 모델이 강하게 결합된다는 MVC 패턴을 보완하여 만들어짐 -> **뷰가 모델에 직접 접근하지 않고** 프레젠터를 통해 모델과 상호작용한다.

### 구조

![MVP pattern](https://www.oreilly.com/api/v2/epubs/9781449334840/files/httpatomoreillycomsourceoreillyimages1547823.png)

뷰에 사용자 요청이 발생하면, 뷰는 프레젠터에 이를 전달한다. 프레젠터는 이를 처리하기 위해 모델에 접근해 데이터를 가져오고 이를 가공해 뷰에 전달한다. 뷰는 프레젠터로부터 받은 데이터를 사용자에 전달한다.

### Presenter

```ts
interface Model<D> {
  fetchData : () => D;
}

interface View<D> {
  showData: (data:D) => void;
  shwoError: (error:Error) => void;
}

class Presenter(model: Model, view: View) {
  function fetchData() {
    try {
      const data = model.fetchData();
      view.showData(data);
    } catch(e) {
      view.showError(e);
    }
  }
}
```

- MVC와 마찬가지로 프레젠터가 중개자 역할을 함으로써 **뷰와 모델을 분리**할 수 있다. 그러나 MVC의 컨트롤러와 달리 뷰와 모델이 서로를 참조하지 않아서 결합을 낮출 수 있다.
- 일반적으로 뷰와 프레젠터는 1:1 관계를 맺는다.  -> **뷰와 프레젠터의 강한 의존성** + 뷰 많아지면 프레젠터도 많아짐 

## MVVM 패턴

- Model - View - View Model

### 구조

![MVVM pattern](https://www.oreilly.com/api/v2/epubs/9781449334840/files/httpatomoreillycomsourceoreillyimages1547825.png)

뷰모델은 필요한 데이터를 모델로부터 가공 후 뷰에 전달한다. 뷰는 뷰모델로부터 받은 UI를 구성하고, 사용자 이벤트가 발생하면 이를 뷰모델에 전달한다. <u>뷰는 뷰모델에 대한 참조를 가지고 있지만, 뷰모델은 뷰에 대한 참조를 가지고 있지 않다. ⚠️</u>

뷰는 모델이 어떻게 처리되고 있는지 관심 없고 그냥 뷰모델이 주는 데이터만 보고 있다가 만약 데이터 업데이트 시 이에 따라 UI 업데이트해주면 됨. 

### ViewModel

- **뷰와 '데이터 바인딩'을 통해 연결**되어 있음. = 뷰모델에서 모델의 데이터가 변경되면 이를 감지 후 자동으로 UI를 업데이트
- **뷰와 뷰모델의 느슨한 결합을 구현**할 수 있다. 뷰는 그냥 데이터바인딩을 통해 뷰모델이 업데이트해주는 데이터를 그리기만 하면 되고 뷰모델은 데이터를 모델에서 불러와 적절하게 가공만 해놓으면 되기 때문. 

### 어떻게 데이터 바인딩 구현하나?

간단하게 구현해보면 다음과 같다

```js
class Observable {
  constructor(value) {
    this.callbacks = [];
    this.value = value;
  }
  subscribe(callback) {
    this.callbacks.push(callback);
  }
  notify() {
		this.callbacks.forEach((callback) => callback(this.value));
  }
  setValue(value) {
    this.value = value;
    this.notify();
  }
}

class Model extends Observable {}

class ViewModel {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    // model 값이 변경되면 view의 display 함수들이 자동으로 호출!
    this.model.subscribe(this.view.displayTodoList); 
    this.model.subscribe(this.view.displayLastTodo);
    this.render();
}
```

## 결론

- MV* 패턴 모두 결국 핵심 목적은 **비즈니스 로직과 UI를 적절하게 분리**해서 애플리케이션의 코드 복잡성을 낮추기 이다. 여기서 중요한 건 '자신의 역할만 충실히 다하는' 뷰와 모델을 분리해놓고, 이 둘 사이를 중개하고 흐름을 제어하는 어떤 장치를 두어야 한다. 
- 처음 나온 MVC는 모델과 뷰 사이에 '컨트롤러'를 하나 두고 뷰의 이벤트를 처리하고 모델/뷰를 적절히 업데이트. 근데 이 과정에서 뷰가 모델을 간접적으로 참조할 수 있게 되어 둘 사이의 의존성이 생겨버리게 되고, 컨트롤러의 역할이 점점 커져 비대해짐. 이러한 뷰와 모델의 의존성을 제거해보고자 한 게 MVP로, 뷰에 프레젠터를 하나씩 두고 뷰는 프레젠터랑만 소통. MVVM은 뷰와 모델 사이에 뷰모델을 두고, 뷰는 '데이터 바인딩'을 통해 뷰모델 데이터를 관찰하다가 데이터 변하면 그것만 UI에 업데이트하기만 하면 돼. 모델의 데이터를 관찰하게 됨.

- 어떤 프레임워크가 어떤 패턴을 기반으로 설계되었다해서 그 패턴을 꼭 따라가야하는건 아님.

## 리액트와 MVC

- 일단 서버 프레임워크에서 MVC 패턴이 적절한 이유는 DB 등 데이터는 모델이, 라우팅은 컨트롤러가, 클라이언트 요청 핸들링은 뷰가 맡으면 되기 때문에 관심사 분리를 하는데 적절함. 리액트는 따지고보면 UI 렌더링 라이브러리. 즉 리액트는 '뷰' 레이어를 만드는 도구 자체이기 때문에 MVC를 적용하기 어려워.

- 하지만 일종의 MVC 패턴이라고도 할 수 있음. -> 컴포넌트를 뷰로, 훅을 컨트롤러로 보면 됨.
- 리액트는 **MVC를 수직으로 분할**한거다! 각 컴포넌트가 상태(모델), 렌더링(뷰), 제어 흐름 로직(컨트롤러)를 담고 있으니까.

>  https://stackoverflow.com/questions/53729411/why-isnt-react-considered-mvc

## 참조

- [한 번의 글로 이해하는 소프트웨어 아키텍처 패턴 ( MVC, MVP, MVVM )](https://dev-musa.tistory.com/entry/%ED%95%9C-%EB%B2%88%EC%9D%98-%EA%B8%80%EB%A1%9C-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8A%94-%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98-%ED%8C%A8%ED%84%B4-MVC-MVP-MVVM)

- https://github.com/tastejs/todomvc/tree/master/examples/react



VAC 패턴

- 리액트에서 뷰 컴포넌트와 비즈니스 로직 컴포넌를 분리