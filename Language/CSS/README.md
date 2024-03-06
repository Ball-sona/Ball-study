# CSS

## mouse accordinate

<img src="https://user-images.githubusercontent.com/67703882/213360144-c715de77-aa62-4925-8dda-bba038c0cbb9.png" alt="image" style="zoom: 50%;" />

- clientX, clientY
  - 클라이언트 영역, 즉 브라우저 창을 기준으로 계산한 x,y 좌표
  - (브라우저 창 크기를 중간에 변경하지 않는다고 가정하면) 브라우저가 보여지는 영역의 크기는 고정되어 있으므로, 스크롤바의 이동과 해당 좌표는 무관하다. 브라우저 창의 왼쪽 상단 모서리 좌표가 (0,0)으로 고정되어 있다.
- offsetX, offsetY
  - 이벤트 걸려있는 **DOM Node를 기준**으로 계산한 x,y 좌표
  - 만약 위 예시 이미지에서 노란색 박스에 클릭 이벤트가 걸려있다고 했을 때, 해당 박스를 클릭 시 박스의 왼쪽 모서리 좌표가 (0.0)가 된다.
- pageX, pageY
  - 현재 브라우저에 띄워져 있는 페이지 내에서 계산한 x,y 좌표
  - 페이지의 왼쪽 상단 모서리를 (0,0)으로 잡고 이를 기준으로 좌표를 계산한다. 현재 페이지의 영역이 넓어 스크롤을 더 많이 한 상태일수록 해당 값이 더 커질 것이다.
- screenX, screenY
  - 사용자의 모니터 화면을 기준으로 계산한 x,y 좌표
  - 브라우저 창 크기나 스크롤 상태와 상관 없이 무조건 고정되어 있는 값이다. 모서리 왼쪽 상단 모서리를 (0,0) 기준으로 한다.

## ellipsis(...)

- 한 줄로 줄이고 싶을 때

  ```css
  div {
    overflow: hidden;
    text-overflow: ellipsis; /** 말줄임(ellipsis) 효과 */
    white-space: nowrap; /** 줄바꿈 제거 */
  }
  ```

- 여러 줄로 줄이고 싶을 때

  ```css
  div {
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /** 2줄까지만 보여주고 나머지 내용은 말줄임으로 표시 */
  }
  ```

## position

- `static` : 기본값. HTML의 요소들은 별다른 설정이 없다면 왼쪽에서 오른쪽으로, 위쪽에서 아래쪽으로 순서대로 보여진다.

근데 어떤 요소의 위치를 또다른 어떤 요소를 기준으로 직접 설정해주고 싶다면?

- `relative`: position 속성이 해당 값이 설정되어 요소들은 <u>`static` 상태였을 때의 위치를 기준으로</u> top, left, right, bottom 속성을 통해 위치를 이동할 수 있다.

  > 만약 position만 설정하고 위치값은 따로 설정하지 않으면(or 위치값을 0으로 설정하면) static일 때와 동일한 위치에 있게 된다.

- `absolute`: 해당 값이 설정된 요소는 <u>`static` 상태가 아닌 조상들 중 가장 가까운 조상을 기준으로</u> 위치 이동을 할 수 있다. 즉 부모 요소의 position 값이 `fixed` or `relative` or `absolute` 가 설정되어 있다면, 자식 요소는 해당 요소(의 왼쪽 상단 모서리)를 기준으로 top, left, right, bottom 이동을 하게 된다.

  > 만약 조상 요소 중에 static 상태가 아닌 요소가 하나도 없다면, document.body을 기준으로 위치가 결정된다.

- `fixed`: <u>브라우저 창의 왼쪽 상단 모서리를 기준으로</u> 요소 위치가 설정된다. 즉 해당 값이 설정된 요소는 스크롤 상태와 무관하게 브라우저 내 위치가 고정되어 있다.

- inherite : 부모 요소의 position 값을 상속 받는다.

이렇게 부모 요소 내 정해진 위치에서 벗어나 독립적인 위치를 가지게 된 요소들은, 크기 역시 부모 요소와 무관해진다는 것을 주의하자. 즉 `width:100%` 를 통해 부모 요소의 너비를 상속 받던 요소가 position이 `absolute`가 되면 너비값 역시 독립적이게 되므로 따로 설정해주어야 한다.

## box-shadow

```css
/* <color> | <length> | <length> */
box-shadow: red 60px -16px;

/* <length> | <length> | <length> | <color> */
box-shadow: 10px 5px 5px black;

/* <length> | <length> | <length> | <length> | <color> */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

/* <inset> | <length> | <length> | <color> */
box-shadow: inset 5em 1em gold;
```

- 첫번째, 두번째 length는 각각 `offset-x` , `offset-y`
- 세번째 length는 `blur-radius`
- 네번째 length는 `spread-radius`
- `inset` 는 박스 내부에 그림자 설정. `color` 는 맨 앞 or 맨 끝에 설정

## transform

transform 은 HTML 요소에 이동, 회전, 확대 및 축소, 비틀기 효과를 부여하기 위한 함수를 제공한다. 단, 애니메이션 효과를 제공하지는 않기 때문에 효과가 적용된 결과가 화면에 보여지게 된다. 따라서 애니메이션 효과를 부여하고 싶다면 transition이나 animation과 함께 사용하면 된다.

- translate (이동)

  `translate(x,y)` 는 요소를 x축으로 x만큼, y축으로 y만큼 이동시킨다. 만약 x or y 축으로만 n만큼 이동하고 싶다면 `translateX(n)`,`translateY(n)` 를 사용하면 된다.

  ```css
  tranform: translate(50px, 100px);
  ```

- scale (확대 및 축소)

  `scale(x,y)` 는 요소를 x축으로 x배, y축으로 y배 확대 또는 축소시킨다. 이때 인자 값이 양수라면 확대되고 음수라면 축소가 되는 것이다. 만약 x/y 축으로만 n배 확배/축소하고 싶다면 `scaleX(n)`, `scaleY(n)` 를 사용하면 된다.

  ```css
  transform: scale(2, 3);
  transform: scaleX(2) scaleY(3); /** X축 2배 && Y축 3배*/
  ```

- rotate (회전)

  `rotate(n)`은 요소를 n만큼 회전시킨다.

  ```css 
  transform: rotate(20deg);
  ```

- skew (축 기준 회전)

  `skew(x,y)` 는 요소를 x축으로 x 각도만큼, y축으로 y각도 만큼 기울인다. 만약 x/y 축으로만 n 각도만 기울이고 싶다면 `skewX(n)`, `skewY(n)` 를 사용하면 된다.

  ```css
  transform: skew(20deg, 30deg); /** X축 기준 20deg 회전 && Y축 기준 30deg 회전 */
  ```

- matrix (여러개 함수 동시 실행)

  ```css 
  transform: matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY());
  ```

## transition

transform 함수를 통해 요소의 크기, 회전도 등 값이 변경되거나 top, left 속성 값 자체가 변경되어 요소가 위치를 이동하는 경우, transition 속성을 통해 이러한 업데이트에 딜레이를 부여하거나 속도를 조절할 수 있다.

- `transition-duration`:트랜지션이 실행되는 시간. 해당 속성을 설정하지 않으면 자동으로 0이 설정되므로, 다른 transition 관련 속성들이 실행 자체가 되지 않는다.

- `transition-delay`: 트랜지션이 실행되기 전 딜레이시킬 시간. 예를 들어 해당 값을 1s로 설정하면 1초 후에 transition이 시작된다.

- `transition-timing-function`: 트랜지션 속도 변화를 제어하는 함수

  ![](https://i.imgur.com/ITQ1jRi.png)

  위 그래프에서 기울기가 가파를수록 변경 속도가 빠르다고 생각하면 된다. 즉 `ease` 함수를 보면 기울기가 원만했다가 가파랐다가 다시 원만해진다. 즉 설정된 `duration` 시간 동안 요소의 업데이트가 느리게 시작되었다가 중간에 빨라졌다가 다시 느려지면 종료되는 것이다.

이러한 변화를 더 커스텀하고 싶다면 `cubic-bezier(n,n,n,n)` 함수를 사용하거나 `animation` 속성을 사용해야한다.

- `transition-property`: 어떤 값의 업데이트에 트랜지션을 줄 지 정할 수 있다. 예를 들어 `transition-property:width` 라면 요소 너비의 변화에 대해서만 트랜지션을 설정한다.

아래는 트랜지션을 설정한 간단한 예시이다. div 요소에 마우스를 올리면 너비가 300px에서 500px으로 증가한다. 이때 마우스를 올리고 1초 후에 증가가 시작되고, 증가하는데 걸리는 시간은 2초이다. 이때 증가 속도는 2초 동안 일정하게 유지된다.

```css
div {
  width: 300px;
  transition-property: width;
  transition-duration: 2s;
  transition-timing-function: linear;
  transition-delay: 1s;
}
div: hover {
  width: 500px;
}
```

위 예시를 아래처럼 짧게 설정할 수도 있다.

```css
div {
  transition: width 2s linear 1s; /** <property> <duration> <timing-function> <delay> **/
}
```

## variables

`--` 와 `var()` 를 통해 css 파일 내에서도 스타일 값들을 상수 및 변수화하여 재사용할 수 있다. 아래처럼 `:root` 를 통해 전역 관리도 가능하다.

```css
:root {
  --white: '#fff';
  --black: '#000';
  --primary: '#353535';
}

div {
  color: var(--white);
  background-color: var(--primary);
}
```

## Remove Link Styles

```css
a {
  text-decoration: none;
}
```
