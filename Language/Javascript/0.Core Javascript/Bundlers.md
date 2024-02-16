# 빌드 툴

컴파일 및 번들링 

## webpack

하나의 설정 파일에서 번들 설정 및 컨트롤. "확장"

```js
// webpack.config.js
module.exports = {
	entry,
	output,
	module: {
		rules: [
			// loader...
		],
		plugins: [],
	}
}
```

### HMR

- HMR(Hot Module Replacement) 통해 소스코드 변화를 감지해서 브라우저에 바로 반영 -> 신속하게 개발 

### Code Splitting

- 파일들을 여러 번들 파일로 분리한 후. 병렬로 스크립트 로드하여 페이지 로딩 속도 개선 
- 페이지 로드 초기에 필요 없는 코드는 분리하여 lazy loading -> 초기 로딩속도 개선

## rollup

같은 소스 코드를 다양한 환경에 맞춰 다르게 빌드하고 싶은 경우. 라이브러리 만들때.

```js
// rollup.config.js
export default {
	input,
	output,
	plugins: [],
}
```

### vs webpack

- webpack은 내부적으로 commonjs 를 사용하지만, rollup은 typescript(es6)를 사용한다. 
- 따라서 rollup은 ES6 모듈 형태로 빌드할 수 있다. (webpack은 원래 commons 형태로만 번들링 가능했찌만 v5부터 es6 번들도 지원한다)
- webpack은 모듈들을 함수로 감싸서 평가하는 방식. rollup은 모듈을 호이스팅하여 한번에 평가하는 방식 -> 따라서 rollup이 조금 더 빠르다.
- 사용되지 않는 코드를 제거하여 번들 크기를 줄이는 tree shaking은 기본적으로 es6 코드에서 더 제대로 동작하기 때문에. Rollup 이 더 가벼운 번들을 생성 가능
- Commonjs 코드를 es6 코드에서 사용할 수 있도록?

## esbuild

### Go 기반

- esbuild는 자바스크립트 기반이 아닌, Go로 작성된 번들러. 따라서 엄청 빠르다
  - 왜 빠른가?
- 번들러 주요 기능을 갖추고는 있지만, 아직 안정성 이슈 등으로 인해 메이저 버전이 릴리즈되지 못하고 있다.

## vite

- native es modules 기반 강력한 개발 서버?
- esbuild로 파일을 통합하고. rollup을 통해 번들링한다.

### 주요 특징

## Snowpack

## Turbopack

## Parcel

## Browserify

## SWC

## 

## 참고

- https://bepyan.github.io/blog/2023/bundlers