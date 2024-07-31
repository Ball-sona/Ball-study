# Emotion

Css-in-Js 라이브러리

## @emotion/css

- 프레임워크에 구애받지 않고 Emotion을 사용하고 싶을 때
- SSR을 위해서는 추가적인 설정 필요

```jsx
/** Object Styles **/
<div css={{ backgroundColor: 'hotpink' }}>This has a hotpink background.</div>;

/** String Styles **/
import { css } from '@emotion/css';
<div
  css={css`
    background-color: hotpink;
  `}
>
  This has a hotpink background.
</div>;
```

## @emotion/react

- 리액트 프레임워크를 사용할 때 사용
- `css` props 지원. but `@emotion/css` 와는 내부적으로 다르게 동작함
- 별도 설정 없이 SSR 지원 및 Theme 기능 제공

## @emotion/styled

- `styled.div` 방식으로 스타일 적용된 리액트 컴포넌트 생성하고 싶을 때 사용
- `@emotion/react` 의존

> css props와 styled를 함께 쓰지 않도록 할 것. 둘 중 하나를 고르라면 css props 선택할 것.

## @emotion/eslint-plugin

- ESlint Rules for `@emotion/css`, `@emotion/react` and `@emotion/styled`
