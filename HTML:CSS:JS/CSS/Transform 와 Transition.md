# Tranform and Transition

### transition

- transition-delay
- transition-duration
- transition-property
- transition-timing-function

### transform

transform 은 HTML 요소에 이동, 회전, 확대 및 축소, 비틀기 효과를 부여하기 위한 함수를 제공한다. 단, 애니메이션 효과를 제공하지는 않기 때문에 효과가 적용된 결과가 화면에 보여진다. 따라서 애니메이션 효과를 부여하고 싶다면 transition이나 animation 과 함께 사용하면 된다. 

어떻게 transform 효과를 사용할 수 있을지 알아보자. 

- **tranzlate : 이동**

  `translate(x,y)` 는 요소를 x축으로 x만큼, y축으로 y만큼 이동시킨다. 만약 x/y 축으로만 n만큼 이동하고 싶다면 `translateX(n)`, `translateY(n)` 를 사용하면 된다.  

  ```css
  tranform: translate(50px,100px); 
  ```

- **scale : 확대/축소**

  `scale(x,y)` 는 요소를 x축으로 x배, y축으로 y배 확대 또는 축소시킨다. 이때 인자 값이 양수라면 확대되고 음수라면 축소가 되는 것이다. 만약 x/y 축으로만 n배 확배/축소하고 싶다면 `scaleX(n)`, `scaleY(n)` 를 사용하면 된다.  

  ```css
  transform: scale(2,3)
  transform : scaleX(2) scaleY(3) //X축 2배 Y축 3배
  ```

- **rotate : 회전**

  `rotate(n)`은 요소를 n만큼 회전시킨다. 

  ```css 
  transform: rotate(20deg);
  ```

- **skew : 축 기준 회전** 

  `skew(x,y)` 는 요소를 x축으로 x 각도만큼, y축으로 y각도만큼 기울인다. 만약 x/y 축으로만 n 각도만 기울이고 싶다면 `skewX(n)`, `skewY(n)` 를 사용하면 된다.  

  ```css
  transform : skew(20deg, 30deg)  //X축 기준 20deg 회전, Y축 기준 30deg 회전
  ```

- **matrix**

  ```css 
  matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY())
  ```

