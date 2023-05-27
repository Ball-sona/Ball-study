# Next Settings

Next 프로젝트를 빠르게 세팅해보자.

## Getting Started

### Automatic Install

리액트의 CRA처럼 Next도 CNA를 지원한다. 

```
npx create-next-app@latest
```

프롬트에서 typescript, eslint 등 관련 설정을 할 수 있다. 

![스크린샷 2023-05-25 11.32.56](/Users/gongsona/Library/Application Support/typora-user-images/스크린샷 2023-05-25 11.32.56.png)

###  Manual Install

```
npm install next@latest react@latest react-dom@latest
```

package.json

```
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## Eslint

typescript

```
 yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

recommended rule-sets from next

```
 yarn add -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-next
```

airbnb

```
yarn add -D eslint-config-airbnb
```

etc

```
yarn add -D eslint-plugin-jsx-a11y eslint-plugin-import 
```

prettier

```
yarn add -D eslint-config-prettier
```

## Prettier

```
{
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": true,
  "printWidth": 80,
  "arrowParens": "always",
  "useTabs": false,
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "quoteProps": "as-needed"
}
```

## Emotion

```
yarn add @emotion/react @emotion/styled
```

- `@emotion/react` : 리액트 환경에서 emotion을 사용하고자 할 때 설치를 권장하는 패키지. css props , 서버 사이드 렌더링, theme를 지원
- `@emotion/styled` : `styled.div` 형식의 문법을 사용하여 컴포넌트를 생성하고자 할 때 설치하는 패키지.

## SVG 

SVG 파일을 컴포넌트로 사용하기 위해 `@svgr/webpack` 을 설치해준다.

```
yarn add -D @svgr/webpack
```

next.config.js 

```js
module.exports = {
  ...nextConfig,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
```

