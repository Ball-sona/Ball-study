# Shadow DOM

원래의 DOM 트리에서 완전히 분리된 고유의 요소와 스타일을 가진 DOM 트리이다. 이전에는 전역 문서나 전역 CSS에 영향 받지 않은 요소를 만들기 위해 `<iframe>` 태그를 사용했지만, 이러한 태그에 의존할 필요 없이 Shadow DOM을 통해 캡슐화와 구성요소화를 허용할 수 있게 되었다.

- `attachShadow()` 메서드를 통해 특정 엘리먼트를 shadow DOM에 붙일 수 있다.

- `slot` : 사용자가 컴포넌트 내부에 원하는 마크업을 채울 수 있도록 미리 선언해놓은 자리 표시자 이다. 주로 사용자 커스텀 요소를 생성할 때 유용하다.

  ```html
  <!-- 렌더링할 템플릿 선언 -->
  <template id="my-template">
  	<p>hello shado Dom!</p>
  	<slot name="title"></slot>
  	<slot></slot>
  </template>
  <!-- 사용자 커스텀 요소마다 다른 요소를 삽입 -->
  <my-template>
  	<h1 slot="title">Hello World!</h1> <!-- Light DOM -->
  </my-template>
  <my-template>
  	<h1>asdf</h1> <!-- Light DOM -->
  </my-template>
  ```

- 스타일 지정 : `:host` , `:host-context(<selector>)` , `::slotted(<compound-selector>)` 등