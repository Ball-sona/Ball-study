# Browser Event

[이벤트 핸들러](#이벤트-핸들러)

[이벤트 객체](#이벤트-객체)

## 주요 DOM 이벤트

### 마우스 이벤트

- `click` : 요소 위에서 마우스 왼쪽 버튼 클릭
- `contextmenu` : 요소 위에서 마우스 오른쪽 버튼 클릭
- `mouseover`  : 마우스 커서 요소 위로 이동
- `mouseout` : 마우스 커서 요소 밖으로 이동
- `mousedown` : 요소 위에서 마우스 왼쪽 버튼 누르고 있을때
- `mouseup` : 요소 위에서 마우스 버튼 뗄 때
- `mousemove` : 마우스 움직일때

### 폼 이벤트

- `submit` : 사용자가 <form> 을 제출할때.
- `focus` : 사용자가 <input> 같은 요소에 포커스 할때
- `blur` : 요소에서 포커스가 해제될때 
- `input` : <input> 이나 <textarea> 요소 값이 변경되었을 때
- `change` : select-box, check-box, radio-button 등의 값이 변경되었을 때

### 키보드 이벤트

- `keydown` , `keypress` : 사용자가 키보드 버튼 누를때 
  - `keydown`은 모든 키보드 버튼을 인식. 버튼 누르고 있으면 계속 이벤트 발생

  - `keypress`는 enter, shift를 제외한 텍스트 입력 버튼 인식. 버튼 누르고 있으면 한번만 이벤트 발생. -> deprecated 됨!

- `keyup` : 사용자가 키보드 버튼 뗄 때

- 이벤트 발생 순서는 `keydown` -> `keypress` -> `keyup`

### 문서 및 UI 이벤트

- `DOMContentLoaded` : HTML이 전부 로드되어 DOM 트리 생성이 완료되었을 때

- `load` : DOM 트리 생성되고, 외부 리소스(이미지, 외부 script 등) 도 모두 로드되었을 때
  - 항상 `DOMContentLoaded` -> `load`
  
- `unload` : 페이지에서 이탈할 때 (새로운 페이지로 이동)
- `resize` : 브라우저 창의 크기를 조절할때 
- `scroll` : 사용자가 페이지를 위 아래로 스크롤할때

### CSS 이벤트

- `transitioned` : CSS 에니메이션이 종료되었을 때 

### Clipboard 이벤트

- `copy` : 컨텐츠를 복사할때
- `paste` : 컨텐츠를 붙여넣기할때

> https://www.w3schools.com/jsref/dom_obj_event.asp 

## 이벤트 핸들러

HTML 요소에 이벤트를 할당하는 방법

### 1. HTML 요소의 on[event] 속성

```html
<input onclick="console.log('클릭')" type='button' />
```

### 2. DOM 프로퍼티 


```html
<input id='btn' type='button' />
<script>
  btn = document.getElementById('btn');
  btn.onclick = function(){
    console.log("클릭");
  }
  // 이벤트 제거
  btn.onClick = null;
</script>	
```

### 3. addEventListener

HTML 속성과 DOM 프로퍼티를 이용한 이벤트 핸들러 할당 방식에는 복수의 핸들러를 할당할 수 없다는 단점이 있다. 따라서 여러 개의 이벤트를 할당하고 싶다면 `addEventListener` 라는 특별한 메서드를 이용하면 된다. 

```js
element.addEventListener(event, handler, [options]);
```

- event : 요소에 할당할 이벤트 이름 (click, mouseoever 등)
- handler : 이벤트 발생 시 실행할 핸들러 함수
- options
  - `once` : true이면 이벤트가 트리거될때 리스너가 자동으로 삭제
  - `capture` : 어느 단계에서 이벤트를 다뤄야하는지 알려주는 프로퍼티
  - `passive` : true면 리스너에서 지정한 함수가 `preventDefault()` 를 호출하지 않음

### 이벤트 객체

이벤트가 발생하면 브라우저는 Event Object를 생성한다. 이 객체에는 이벤트에 관한 상세한 정보가 담겨지고, 이를 핸들러에 인수 형태로 전달한다. 

```js
element.addEventListener('click',function(event){
  console.log(event.type); 
})
```

<img width="529" alt="스크린샷 2022-11-07 15 27 45" src="https://user-images.githubusercontent.com/67703882/200240272-abbd9749-81b3-4e5e-a1bb-25fb27fde49b.png" style="zoom:70%;" >

event 객체를 console에 찍어보면 객체 내에 다양한 정보가 담겨있음을 알 수 있다. 

다음은 자주 사용되는 이벤트 객체의 프로퍼티들이다. 

- `event.type` : 이벤트 종류를 '문자열'로 나타냄
- `event.target` : 이벤트를 발생시킨 요소
- `event.currentTarget` : 이벤트에 바인딩된 DOM 요소 (= this)
  - div > button 인데 둘다 클릭 이벤트 걸려있음. button 클릭하여 div의 클릭이벤트가 발생되었다면 target은 button이고 currentTarget은 div
- `event.bubbles` : 버블링 전파되는지 여부
- `event.cancelable` : 이벤트 기본 동작 취소할 수 있는지 여부 
- `event.defaultPrevented` : preventDefault 메서드 호출하여 이벤트 취소했는지 여부
- `event.isTrusted` : 사용자 행위에 의해 발생한 이벤트인지 여부
  - click이나 dispatchEvent 메서드를 통해 인위적으로 발생시킨 메서드는 false
- `key` : 키보드 이벤트를 사용했을 경우, 어떤 키보드 버튼을 눌렀는지. 아래 링크에서 키 정보를 자세히 알 수 있다. https://www.toptal.com/developers/keycode 

