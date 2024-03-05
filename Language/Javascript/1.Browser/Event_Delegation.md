# 이벤트 위임

이벤트 위임(event delegation)은 캡처링과 버블링 과정을 이용하는 것으로, 여러 엘리먼트마다 각각의 이벤트 핸들러를 할당하지 않고, 공통되는 부모에 이벤트 핸들러를 할당하여 이벤트를 관리하는 방식이다.

```html
<div id='menu'>
  <button>버튼 1</button>
  <button>버튼 2</button>
  <button>버튼 3</button>
</div>
```

위 코드에서 총 3개의 버튼에 같은 클릭 이벤트를 할당해야한다고 가정해보자. 모든 버튼에 대해 이벤트 리스너를 등록하는 건 너무 비효율적이다. 따라서 버튼들의 공통 부모인 `div` 에만 이벤트를 할당하여 버튼들을 한꺼번에 다룰 수 있도록 하는 것이 '이벤트 위임' 방식이다. 

## Example

```html
<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
</ul>
```

각 `li` 태그를 클릭하면 특정 이벤트가 발생하도록 해보자.

```js
const $menu = document.getElementById("id");

$menu.onclick = function(event) {
	// 이벤트를 발생시킨 요소가 menu의 자식 요소가 아니라면 해당 이벤트는 무시 
	if(!event.target.matches("$menu > li")) return;
	console.log(event.target.getAttribute("href"));
	// 브라우저 동작 취소(URL 이동하지 않도록)
	return false;
}
```

- `matches` 함수를 활용하여 인수로 전달된 선택자에 의해 특정 노드를 탐색 가능한지 확인
- `a` 태그를 누르면 `href`에 지정한 URL로 이동하는 것이 브라우저의 기본 동작이기 때문에, 이를 원치 않다면 `return false`를 통해 이를 취소시켜주어야 한다.

## 주의할 점

- 만약 하위 레벨의 리스너에 `event.stopPropagation()` 가 존재한다면 이벤트 위임이 정상적으로 동작하지 않는다. 해당 메서드는 부모 요소로의 이벤트 전파를 막는 메서드이기 때문에, 상위 요소에 이벤트 위임이 되어있더라도 상위 요소에서 이벤트를 제대로 캐치할 수 없다. 
- 이벤트 중에서 기본적으로 버블링되지 않는 이벤트들이 존재한다. 이러한 이벤트들도 마찬가지로 이벤트 위임이 정상적으로 작동하지 않는다.
  - focus/blur
  - load/unload/abort/error
  - mouseenter/mouseleave
- 컨테이너 수준에 할당된 핸들러가 응답할 필요 유무와 상관없이 모든 하위 컨테이너에서 발생하는 이벤트에 응답해야하므로, CPU 작업 부하가 늘어날 수 있다. 실제로는 이러한 부하는 무시할만한 수준이므로 크게 고려하지 않아도 된다.
