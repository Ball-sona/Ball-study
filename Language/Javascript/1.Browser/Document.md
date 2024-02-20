# 브라우저 문서

<img src="https://i.imgur.com/rSI9vw4.png" style="zoom:50%;" />

## window

- 자바스크립트 코드의 전역 객체

  ```js
  function sayHi() {
    console.log('hi!');
  } // 전역 함수
  window.sayHi(); // hi!
  ```

- '브라우저 창(browser window)'을 대변하고, 이를 제어할 수 있는 메서드를 제공

  ```js
  console.log(window.innerHeight);
  ```

## DOM(Document Object Model)

- DOM은 웹 페이지의 모든 컨텐츠를 객체로 나타낸다. -> `document` 객체
- `document` 객체를 이용해서 페이지 내 컨텐츠를 변경하고, 새로운 요소를 추가할 수도 있다,

> https://dom.spec.whatwg.org/

## CSSOM(CSS Object Model)

- CSS 규칙과 StyleSheet를 객체로 나타내고, 이 객체를 어떻게 읽고 쓸지 설명을 담는다.

## BOM(Browser Object Model)

- 브라우저 객체 모델은 문서 이외의 모든 것을 제어하기 위해 브라우저가 제공하는 추가 객체이다.
- `navigator` 객체: 브라우저와 운영체제 관련 정보 제공
- `location` 객체: 현재 URL 정보 및 URL redirect 기능 제공
- `alert`, `confirm`, `prompt` 등
