# Vanilla-extract

zero-runtime stylesheets in Typescript

### Install

```shell
npm install @vanilla-extract/css
```

### Bundler Integration

vanilla-extracts를 사용하여 CSS를 다루기 위해서는 번들러를 설치 및 세팅해야한다. 이를 통해 우리는 스타일 코드를 다른 종속성과 동일하게 처리하여 필요한 항목만 가져오고 묶을 수 있다. 

Vite, Esbuild, Webpack, Next, Parcel, Rollup, Gatsby 중 하나를 선택하여 설치한다. 

### 특징 

- Type-safe static CSS

  SaSS, LESS 등 모든 스타일들이 빌드 타임에 생성된다. with TS

- First-class theming

  type-safe token contracts 를 가지고 하나 또는 여러개의 글로벌 테마들을 생성 가능하다.

- Framework agnostic
  - 특정 프레임워크의 지식 없이도 사용 가능하다.
  - 번들러 필요 : webpack, esbuild, Vite, Next.js, Rollup, Gatsby

- Built for extension
- 파일 형식 `*.css.ts`

### How to use

- Styling

  ```tsx
  import {style, globalStyle} from '@vanilla-extract/css';
  
  export const myStyle = style({
    display:'flex',
    paddingTop:'3px',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', // -webkit-tap-highlight-color
    
    '@media':{
      'screen and (min-width:100px)':{ padding:10 }
    },
    
    selectors: {
      '&:hover:not(:active)':{
        border:'2px solid black';
      }
    }
  
  });
  
  globalStyle('body',{ margin:0 })
  ```

  - 기본적으로 `camelCase` 사용
  - vendor specific property 는 `PascalCase` 사용
  - 미디어 쿼리를 항상 마지막에 렌더링하므로 다른 CSS 룰보다 higher precedence를 가진다.

- Theming

  ```tsx
  import {createTheme} from '@vanilla-extract/css';
  
  export const [themeClass, vars] = createTheme({
    color: {
      brand: 'blue'
    },
    font: {
      body: 'arial'
    }
  });
  
  export const otherThemeClass = createTheme(vars, {
    color: {
      brand: 'red'
    },
    font: {
      body: 'helvetica'
    }
  });
  ```

  - createTheme 의 인자로 기존에 있는 vars를 제공하면, 기존에 존재하고 있는 CSS 변수들을 재사용해서 새로운 CSS 클래스를 만들어낸다.

  ```tsx
  import { createThemeContract } from '@vanilla-extract/css';
  
  export const vars = createThemeContract({
    color: {
      brand: ''
    },
    font: {
      body: ''
    }
  });
  
  export const blueThemeClass = createTheme(vars, {
    color: {
      brand: 'blue'
    },
    font: {
      body: 'arial'
    }
  });
  ```

  - `createThemeContract` 를 통해 CSS 변수들을 미리 정의해준 후, 이를 재사용하여 다양한 테마를 만들어낼 수 있다. 

- Style Composition

  ```tsx
  import { style } from '@vanilla-extract/css';
  
  const base = style({ padding: 12 });
  
  const primary = style([base, { background: 'blue' }]);
  const secondary = style([base, { background: 'aqua' }]);
  ```

- Style Variants

  ```tsx
  import {style, styleVariants} from '@vanilla-extract/css';
  
  const base = style({color:'red'})
  
  export const background = styleVariants({
    primary:[base,{background:'blue'}],
    secondary:[base,{background:'aqua'}]
  })
  
  // mapping variants 가능 
  const palette = {primary:'blue', secondary:'aqua'};
  
  export const variant = styleVariants(
  	palette,
    (paletteColor) => [base, {background: paletteColor}]
  )
  ```

