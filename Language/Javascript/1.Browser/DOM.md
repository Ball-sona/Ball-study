# DOM 조작

DOM에 수행하는 모든 연산은 `document` 객체에서 시작한다.

## DOM 트리 상단 노드

- `document.documentElement`: `<html>`
- `document.body`: `<body>`
- `document.head`: `<head>`

## 부모 노드

- `parentNode`: 부모 노드를 반환하는 프로퍼티
- `parentElement`: 부모 '요소' 노드를 반환하는 프로퍼티

```js
console.log(document.documentElement.parentNode); // document
console.log(document.documentElement.parentElement); // null
```

## 자식 노드

- `childNodes`: 텍스트 노드, 주석 노드를 포함한 모든 자식 노드를 반환하는 프로퍼티
  - 이터러블한 유사 배열 객체인 컬렉션(collection) 반환 -> `NodeList`
  - 읽기 전용 (수정 불가)
- `children` : **요소 노드만 포함**하여 자식 노드를 반환하는 프로퍼티
- `firstChild`, `lastChild`: 각각 첫번째, 마지막 자식 노드에 접근하는 프로퍼티
- `firstElementChild`, `lastElementChild`: 첫 번째 자식 요소 노드와 마지막 자식 요소 노드
- `hasChildNodes()`: 자식 노드 존재 여부 검사하는 함수
- `elemA.contains(elemB)`: `elemB` 가 `elemA` 의 자식/후손 노드이거나, 혹은 둘이 같은 노드일 때 참 반환

## 형제 노드

- `nextSibling`: 다음 형제 노드
- `previousSibling`: 이전 형제 노드
- `previousElementSibling`, `nextElementSibling`: 형제 '요소' 노드

## 요소 노드 검색

- `document.getElementById(id)`: 요소의 id 속성
- `elem.querySelectorAll(css)`: `elem`의 자식 요소 중 주어진 CSS 선택자에 대응하는 요소 모두를 반환
  - 가상 클래스 사용 가능
- `elem.querySelector(css)`: `elem`의 자식 요소 중 주어진 CSS 선택자에 대응하는 '첫번째' 요소
  - 해당 요소를 찾으면 탐색을 멈춘다.
- `elem.matches(css)`: `elem`이 주어진 CSS 선택자와 일치하는지 여부를 판단
- `elem.closest(css)`: `elem` 자기 자신을 포함하여 CSS 선택자와 일치하는 가장 가까운 조상 요소 반환
  - 해당 요소에서 시작해 DOM 트리를 한단계씩 거슬러 올라가면서 탐색
  - 해당 요소를 찾으면 이를 반환하고 탐색 멈춘다.
- `elem.getElementsByTagName`, `elem.getElementsByClassName`, `document.getElementsByName(name)`
  - '살아있는' 컬렉션 반환 = 문서 변경이 발생하면 컬렉션이 자동으로 갱신되어 최신 상태 유지

## DOM 노드 클래스

DOM 노드는 프로토타입을 기반으로 상속 관계를 갖는 일반 자바스크립트 객체이다.

> EventTarget > Node > 모든 DOM 노드

- `EventTarget`: 루트에 존재하는 추상 클래스
  - 모든 DOM 노드의 베이스에 있기 때문에, 노드에 '이벤트' 적용 가능
  - `Node` 클래스를 상속
- `Node`: 모든 DOM 노드의 베이스인 추상 클래스
  - `parentNode` 등 노드 탐색 기능 제공
  - `Text`, `Element`, `Comment` 등 클래스들을 상속 받는다.
- `Element`: DOM '요소'를 위한 베이스 클래스
  - `children` 등 요소 노드 전용 탐색 기능 제공
  - `SVGElement`, `XMLElement`, `HTMLElement` 클래스의 베이스 역할 -> 브라우저는 HTML, SVG, XML 모두 지원
- `HTMLElement`: HTML 요소 노드의 베이스 클래스
  - `HTMLInputElement`, `HTMLBodyElement ` 등

### 상속 관계

`<input>` 요소에 대응하는 DOM 객체의 상속 관계 파악하면 다음과 같다.

- `HTMLInputElement` > `HTMLElement` > `Element` > `Node` > `EventTarget` > `Object`

## DOM 프로퍼티

### 노드 정보

- `nodeType` : 요소 타입
- `nodeName`, `tagName` : 요소의 태그 이름. `tagName`은 요소 노드에만 사용 가능

### HTML 정보

- `elem.innerHTML` : `elem` 안의 HTML을 문자열 형태로 반환. '요소 노드'에만 사용 가능
  - 새로운 값 할당하여 요소 안의 HTML 수정 가능
- `elem.outerHTML`: `elem` 전체의 HTML을 문자열 형태로 반환
  - 요소 자기 자신을 포함한 HTML 내용
  - 새로운 값 할당하면 외부 컨텍스트에서 HTML이 새롭게 만들어지고, `elem`이 삭제된 자리를 채운다?

### 노드 내용

- `nodeValue`, `data`: 노드의 내용 반환. 텍스트 노드, 주석 노드 등 모든 노드에 사용 가능
- `textContent`: 요소 내 텍스트 접근

### 기타

- `hidden`: 요소 보여줄지 말지 지정
  - `style="display:none"` 와 동일하다.

## HTML 속성과 DOM 프로퍼티

```html
<body id="test" something="non-standard">
  <script>
    console.log(document.body.id); // test
    console.log(document.body.something); // undefined -> 표준 속성만 가능!
  </script>
</body>
```

### 표준 속성

- 요소 노드의 HTML '표준' 속성은 자동으로 DOM 객체의 프로퍼티가 된다.
- 표준 속성 값이 변경되면 이에 대응하는 프로퍼티 값도 자동 갱신된다.
- HTML 속성과 DOM 프로퍼티 값이 다른 경우도 있다. (ex. `href`)
  - 원본 접근하고 싶으면 속성 사용할 것

### 비표준 속성

- 커스텀 속성이 클래스보다 다루기 편리하기 때문에 이를 이용해 스타일 변경
- 이후 추가될 표준 속성과 충돌될 여지를 방지하고자 한다면 `data-*` 형태의 dataset 프로퍼티 사용. 수정도 가능

```html
<body data-my-name="sona">
  <script>
    console.log(document.body.dataset.myName); // sona
  </script>
</body>
```

### 메서드

- `elem.hasAttribute(name)`: 속성 존재 여부 확인
- `elem.getAttribute(name)`: 속성값 접근
- `elem.setAttribute(name, value)`: 속성값 수정
- `elem.removeAttribute(name)`: 속성값 제거
- `elem.attributes`: 모든 속성값 접근. 내장 클래스 `Attr`를 구현한 객체를 담은 컬렉션 반환

## 문서 조작

### 요소 생성

- `document.createElement(tag)`
- `document.createTextNode(text)`

### 요소 삽입 및 삭제

- `document.body.append(div)`
- `node.append(노드나 문자열)` ,`node.prepend` , `node.before`, `node.after` : 노드 추가 및 위치 변경
- `node.replaceWith(노드나 문자열)` : `node`를 새로운 노드나 문자열로 대체
- `node.remove()`
- `elem.cloneNode(true)`: true면 후속 노드까지 포함하는 `elem`의 깊은 복제본 생성. false면 후손 노드 복사 없이 `elem`만 복제

문자열 형태의 HTML를 인자로 전달하면, 특수문자는 이스케이프 처리되어 '문자열' 그대로 삽입된다.

### HTML 삽입

- `elem.insertAdjacentHTML(where, html)`
  - 원하는 위치에 'HTML'를 그대로 삽입한다.
  - where: `beforebegin`(요소 앞), `afterbegin`(요소 첫번째 자식 앞), `beforeend`(요소 마지막 자식 앞), `afterend`(요소 다음)
- `elem.insertAdjacentText(where, text)` : 문자 그대로 삽입
- `elem.insertAdjacentElement(where, elem)` : 요소 그대로 삽입
- `document.write(html)`: 페이지 로딩이 끝나기 전에 HTML 삽입
  - 페이지 로드 완료 후 호출시 페이지 덮어씀. 구식 메서드!

### DocumentFragment

여러 노드로 구성된 그룹을 감싸 다른 곳으로 전달하게 해주는 wrapper

```html
<ul id="ul"></ul>

<script>
  function getListContent() {
    const fragment = new DocumentFragment();
    fragment.append(document.createElement('li').append(1));
    fragment.append(document.createElement('li').append(2));
    return fragment;
  }
  ul.append(getListContent()); // DocumentFragment는 사라지고 <li> 노드들만 남는다.
</script>
```

## 클래스와 스타일

### 클래스 접근

- `elem.className`
- `elem.classList`
  - `add/remove`, `toggle`, `contains` 통해 개별 클래스 접근 및 조작
  - 이터러블 객체로 `for..of` 사용 가능

### 스타일 접근

- `elem.style.*`
- `elem.cssText` : 스타일 전체 교체
  - `elem.setAttribute('style', 'color: red...')` 동일
- `getComputedStyle(element,[pseudo])` : 전체 CSS 클래스 정보를 담은 객체 반환. 스타일 '결정 값'이 반환

> **Computed-Style Value vs Resolved-Style Value**
>
> - 계산값(computed style value) : CSS 규칙과 CSS 상속이 모두 적용된 후의 값 (ex. `height:1em `나 `font-size:125%`)
> - 결정 값(resolved style value) : 요소에 최종적으로 적용되는 값. 브라우저가 `1em` 같은 상대 단위를 `20px` 같이 고정 단위를 사용하는 절댓값으로 변환한 값이다.
