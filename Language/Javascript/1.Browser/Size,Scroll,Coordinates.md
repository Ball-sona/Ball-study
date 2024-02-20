# 사이즈와 스크롤, 좌표

## 기하 프로퍼티

<img src="https://i.imgur.com/zT90ZRi.png" style="zoom:40%;" />

### offset\*

'offset'은 요소가 화면에서 차지하는 영역 전체 크기를 나타내는데, 이때 마진은 포함되지 않는다.

- `offsetParent` : 해당 요소를 렌더링할 때 <u>좌표 계산에 사용되는 가장 가까운 조상 요소</u> 참조
- `offsetLeft`와 `offsetTop`: `offsetParent`를 기준으로 각각 요소가 오른쪽으로, 아래쪽으로 얼마나 떨어져 있는지
- `offsetWidth`와 `offsetHeight`: '가장 바깥 부분(outer)'이 차지하는 너비와 높이 정보

### client\*

- `clientLeft`와 `clientTop`: 테두리(border) 영역 사이즈 제공
  - 정확히는. 테두리 바깥을 기준으로 한 테두리 안 상대 좌표
- `clientWidth`와 `clientHeight`: 테두리 안 영역의 사이즈 정보를 제공. 컨텐츠 너비 + 패딩
  - **스크롤바 너비는 제외!** -> `window.innerWidth/innerHeight` 와의 차이점!

### scroll\*

- `scrollWidth`와 `scrollHeight`: `client*` 와 동일하되. 스크롤바에 의해 감춰진 영역도 포함
  - 스크롤 때문에 가려진 것과 관계 없이 '콘텐츠 전체 영역'을 의미.
- `scrollLeft`와 `scrollTop`: 가로 스크롤이 오른쪽, 세로 스크롤이 아래로 움직임에 따라 '가려진 영역'의 너비와 높이
  - 해당 값을 수정하면 자동으로 스크롤이 움직인다.
  - 해당 값을 0이나 아주 큰 값으로 설정하면, 페이지 최상단 혹은 최하단으로 스크롤을 옮길 수 있다. 유일하게 수정 가능한 프로퍼티!

> 기하 프로퍼티 쓸 때는 <!DOCTYPE HTML>를 꼭 명시하도록 하자!

## 사이즈

### 브라우저창 너비 및 높이

사용자 눈에 컨텐츠가 실제 보여지는 영역

- `window.innerWidth/innertHeight` : 스크롤바 영역 포함
- `document.documentElement.clientWidth/clientHeight` : 스크롤바 영역 제외

### 문서 너비 및 높이

스크롤에 의해 가려진 영역을 포함한 문서 전체 영역

```js
const 문서_전체_높이 = Math.max(
  document.body.scrollHeight,
  document.documentElement.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.offsetHeight,
  document.body.clientHeight,
  document.documentElement.clientHeight,
);
// 위 값들이 다를 수 있는 이유는 그다지 논리적이지 않다고 함..
```

## 스크롤

### 스크롤 위치 얻기

- `document.documentElement.scrollLeft/scrollTop` : 브라우저 종류에 영향 받음
- `window.pageXOffset/pageYOffset` : 브라우저에 상관없이 스크롤 정보 얻기

### 스크롤 위치 변경

- `document.documentElement.scrollLeft/scrollTop` 값 수정
  - Safari는 `document.body`
- `window.scrollBy(x,y)`:페이지의 스크롤 상태를 현재 포지션을 기준으로 상대적으로 조정
- `window.scrollTo(pageX,pageY)`
- `elem.scrollIntoView(top)`: 전체 페이지 스크롤이 움직여 `elem`이 눈에 보이는 상태로 변경
  - top이 `true`면 `elem`이 창 제일 위에 보이게. `false`면 창 가장 아래에 보이게.

### 스크롤 막기

- `document.body.style.overflow = "hidden"`

이를 사용하면 스크롤바가 갑자기 사라지면서 스크롤바가 차지하던 공간을 채우기 위해 컨텐츠가 이동하므로. 이때 `document.body` 에 패딩값 주는 등 작업 해야함.

## 좌표

- `clientX/clientY`: '창 맨 위 왼쪽 모서리'를 기준으로 좌표를 계산
- `pageX/pageY`: '문서 맨 위 왼쪽 모서리'를 기준으로 좌표 계산
- `elem.getBoundingClientRect()`: `elem`을 감싸는 가장 작은 네모의 창 기준 좌표를 `DomRect` 클래스의 객체 형태로 반환
  - x,y, width,height, top,bottom,left,right

<img src="https://i.imgur.com/hCyt1Xk.png" style="zoom:50%;" />

- `document.elementFromPoint(x, y)`: 창 기준 좌표 (x , y)에서 가장 가까운 중첩 요소 반환
