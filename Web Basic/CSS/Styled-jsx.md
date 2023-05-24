# Styled-jsx

Full. scoped and component-friendly CSS support for JSX(SSR or CSR)

vercel에서 만든 CSS 라이브러리이다. 

## 설치 및 설정

- 패키지 설치

  ```
  npm install --save styled-jsx
  ```

- babel 설정

  ```
  {
  	"plugins" : ["styled-jsx/babel"]
  }
  ```

  > Next.js 사용시 알아서 babel or swc 관련 설정을 해주므로 따로 설정할 필요가 없다!

## 사용법 

컴포넌트 내에서 `<styled jsx>` 태그를 추가하여 그 안에 css를 넣어주는 방식이다. (태그 내부에 일반 css 스타일 코드를 넣어줘도 무방하다.)

```js
export default () => (
	<div>...</div>
	<style jsx>{`
		div { color: red }
	`}
	</style>
)
```

위 코드는 트랜스파일 후 다음과 같아진다.

```js
export default () => (
	<div className='jsx-123'>...</div>
	<_JSXStyle id='123'>{`
		div.jsx-123 {color:red}
	`}</_JSXStyle>
)
```

위처럼 unique className을 설정해줌으로써 스타일 캡슐화가 이루어지고, `_JSXStyle` 은 다음과 같은 특성들을 위해 최적화되어있다.

- 렌더링 이후에 스타일 주입
- 특정 컴포넌트 스타일은 한번만 주입 
- 사용하지 않는 스타일은 제거
- 서버 사이드 렌더링을 위해 스타일을 계속 추적 

전역 스타일을 지정해주고 싶다면 `<style jsx global>` 태그를 사용하면 된다.

반대로 특정 selector에는 전역 스타일을 붙여주고 싶다면 `:global()` 을 사용하여 이를 global class로 생성할 수 있다.

### 컴포넌트 밖에서 스타일 지정해주고 싶다면

`styled-jsx/css` 을 이용해 스타일을 분리할 수 있다.

 ```
 import css from 'styled-jsx/css';
 ...
 <style jsx>{button}</style>
 ... 
 const button = css`button{color:red}`;
 ```

> emotion이나 styled-components 처럼 css에 props를 넘겨주는 건 불가능한 것 같다. style 태그는 여러개 세팅해도 무관하므로, state에 영향을 받지 않는 스타일 정보들을 css로 빼고, 영향을 받는 스타일 정보는 컴포넌트 내부에 넣어줘도 될 것 같다.

특정 스타일의 범위를 제한하고 싶다면 `resolve` 태그를 이용하면 된다.

```
import css from 'styled-jsx/css';

const {className, styles} = css.resolve`
	a { color: green }
`;
exprot default () => (
  <div>
    <Link className={className}>About<Link>
    {styles}
  </div>
)
```

## ❗️Server-side rendering

우리가 Next.js 등을 이용해 SSR 애플리케이션을 만들 때 주의해야할 사항 중 하나가 'FOUC 현상'이다.

**FOUC**(Flash of Unstyled Content )이란, 페이지가 렌더링되는 시점에 아직 스타일시트 정보가 로드되지 않아 잠시 스타일이 적용되지 않은 페이지가 보여지는 현상이다. 

### 다시 한번 정리하는 서버-사이드 렌더링 동작(pre-rendering)

Server Side Rendering이나 Static Generation은 모두 Pre-rendering 방식으로, 서버에서 data-fetching 과 HTML Content 렌더링을 수행한 후 이 데이터를 클라이언트에게 전송한다. 이를 통해 클라이언트는 non-interactive한 페이지를 빠르게 받을 수 있다.

이후 이벤트 리스너 등 컴포넌트에 필요한 interactive 속성들은 별도의 번들로 전달받아 client에서 **hydration**을 시행하고, 이 동작도 완료가 되면 비로소 사용자와 상호작용할 수 있는 애플리케이션이 생성된다. 

여기서 문제는 `styled-component` 나 `emotion` 등 CSS-in-JS 라이브러리를 사용시 발생한다. 이들은 Javascript로 작성된 스타일 정보로 client 단에서 hydration을 거쳐 스타일이 주입되는데. 이로 인해 render - hydration 간 시차가 생기는 것이다. 물론 그 시차가 길지는 않겠지만, 그래도 이는 사용자에게 좋은 UX를 제공하지는 않는다. 

> 현재는 styled-component, emotion 모두 SSR 될 수 있도록 지원해주고 있다. 

서론이 길었으나, 본론은 styled-jsx 역시 SSR를 지원한다는 것이다. `StyledRegistery` 컴포넌트와 `useStyledRegistry` 훅을 통해 scope 스타일들을 concurrent-safe하게 서버 사이드 렌더링 될 수 있도록 한다. 

```
import React from 'react'
import ReactDOM from 'react-dom/server'
import { StyleRegistry, useStyleRegistry } from 'styled-jsx'
import App from './app'

function Styles() {
  const registry = useStyleRegistry()
  const styles = registry.styles()
  return <>{styles}</>
}

export default (req, res) => {
  const app = ReactDOM.renderToString(<App />)
  const html = ReactDOM.renderToStaticMarkup(
    <StyleRegistry>
      <html>
        <head>
          <Styles />
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: app }} />
        </body>
      </html>
    </StyleRegistry>
  )
  res.end('<!doctype html>' + html)
}	
```

## 참고 자료

- https://www.npmjs.com/package/styled-jsx
