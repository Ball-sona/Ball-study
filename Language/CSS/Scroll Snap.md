# Scroll Snap

웹페이지에서 스크롤을 하다가 중간에 멈췄을 때, 스크롤이 특정 위치로 자동으로 스냅되도록 하는 CSS 속성이다. 이를 통해 Fullpage Scroll을 JS 라이브러리 사용하지 않고 css로만으로 구현할 수 있다.

## 예제

```html
<div class="container">
  <div class="section">Section1</div>
  <div class="section">Section2</div>
  <div class="section">Section2</div>
</div>
```

```css
.container {
	overflow:auto;
  scroll-snap-type: y mandatory;
}

.section {
  scroll-snap-align: start;
}
```

## scroll-snap-type

```
scroll-snap-type: [snap-axis] [snap strictness]
```

- axis : 스크롤이 적용될 축
  - x, y, block, inline, both 
- strictness: 스냅 적용 방식 
  - mandatory: 스크롤 위치가 스냅 위치와 정확하게 일치해야만 스냅
  - proximity: 스크롤 위치가 스냅 위치와 가까워지면 자연스럽게 스냅

## scroll-snap-align

스크롤 스냅 위치를 section의 어느 부분에 맞출지 지정

- start, end, center

## scroll-padding

- 스크롤 영역의 패딩 설정
- 요소의 실제 패딩값이 변경되는 것은 아니고, 뷰포트에 가짜 패딩이 적용되는 것

## scroll-margin

- 스크롤 영역의 마진 설정
- 마찬가지로 뷰포트에 가짜 마진이 적용되는 것

## 참고 문헌

https://inpa.tistory.com/entry/CSS-%F0%9F%93%9A-%EC%B5%9C%EC%8B%A0-CSS-%EA%B8%B0%EB%8A%A5-%F0%9F%8E%A8-CSS-Scroll-snap

