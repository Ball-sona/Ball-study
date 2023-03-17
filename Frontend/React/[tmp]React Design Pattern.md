# React Design Pattern

## 1. Presentational and Container Component Pattern

데이터 처리와 데이터 출력을 분리하는 패턴

- Presentational Components
  - 화면에 보여지는 것(UI) 만을 담당
  - Dom markup 와 css 스타일 가지고 있음
  - props 통해서 데이터나 함수를 받아온다
  - stateless한 컴포넌트(뷰에 필요한 state를 가지고 있을 수 있음)
- Container Components
  - 데이터 fetch 를 담당하거나 다른 컴포넌트들에게 함수나 데이터를 전달하는 역할
  - 연관 있는 서브 컴포넌트들을 렌더링
  - Dom Markup 이나 css 스타일 없음
  - stateful한 컴포넌트

## 2. Atomic Design Pattern

디자인 요소를 나누어 파악하고 이 요소들이 조합되는 과정을 통해 디자인을 구성하는 방식

![image](https://user-images.githubusercontent.com/67703882/214756129-ed55d274-e035-462a-9ac2-23b65e7fdb2b.png)

총 5개의 구분된 단계가 존재한다.

- Atoms
  - 하나의 구성 요소
  - 본인 자체의 스타일만 가지고 있고 다른 곳에 영향을 미치는 스타일은 적용되지 않는다.
  - basic html element 
  - ex) form labels, inputs, buttons
- Molecules 
  - Atom이 모여서 만들어지는 하나의 구성 요소
  - 실제로 무언가 동작을 할 수 있는 단위
  - ex) form
- Organisms
  - 분자들의 모음으로 비교적 복잡한 구조
  - 동일하거나 다른 molecules들로 구성 
  - ex) logo, navigation, search bar 등 컴포넌트
- Templates
  - organisms들을 모아 페이지의 최종 구조를 구성한 단위 
  - 페이지의 데이터 보다는 내용 구조에 초점을 맞춘다.
  - ex) LoginTemplate
- Pages
  - 실제 콘텐츠가 배치된 UI의 모습을 보여주는 인스턴스
  - 어플리케이션 상태 관리가 이루어진다.

## 3. VAC Pattern

​	

컴포지션과 컴파운드 패턴 
