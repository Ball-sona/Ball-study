# Routing in App Router

## 라우팅 정의

- 앱 라우터에서는 '파일명'은 무시된다. 즉, 폴더명까지만 주소로 변환된다.
- app 내부에서 가질 수 있는 파일명은 아래와 같은 예약어들로 제한된다.

```jsx
<Layout>
  <Template>
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<NotFound />}>
          <Page />
        </ErrorBoundary>
      </Suspense>
    </ErrorBoundary>
  </Template>
</Layout>
```

## layout.js

페이지의 기본적인 레이아웃을 구성하는 요소로, 하위 폴더 및 주소에 모두 영향을 미친다.

### root layout

**루트에 위치한 레이아웃 파일**은 웹 페이지를 만드는데 필요한 공통적인 내용을 다룬다. 

- 페이지 라우터의 `_app.js` 와 `_document.js` 를 대체한다.
- `html` 와 `body` 태그를 반드시 포함해야 한다.
- SSR 환경에서 css-in-js 라이브러리를 사용하는 경우 `_document.js`에서 이를 초기화했었지만, 앱 라우터에서는 이를 루트 레이아웃에서 처리해야 한다.

### rules 

- 반드시 props로 `children`을 받아야 하고, `export default` 로 내보내는 컴포넌트가 있어야 한다.
- API 요청 등 비동기 작업을 수행할 수 있다.

## page.js

layout을 기반으로 리액트 컴포넌트를 노출한다.

### props

- params: `[...id]` 처럼 동적 라우트 파라미터를 사용할 경우 해당 파라미터 값이 들어온다.
- searchParams: `?a=1&b=2` 와 같은 URLSearchParams 가 `{a:'1', b:'2'}` 처럼 객체 형태로 들어온다. 

> 같은 페이지에서 search parameter만 다르게 라우팅을 시도하는 경우 layout 컴포넌트는 리렌더링되지 않는다. 따라서 searchParams 값은 page에서만 접근할 수 있다.

### rules

- layout과 마찬가지로, `export default` 로 내보내는 컴포넌트가 있어야 한다.

## error.js

해당 라우팅 영역에서 사용되는 공통 에러 컴포넌트이다. 특정 라우팅 별로 다른 에러 UI를 렌더링할 수 있다.

### props

- error: 에러 정보를 담고 있는 `Error` 객체
- reset: 에러 바운더리를 초기화하는 함수 (`()=>void`)

### rules

- error 컴폰넌트는 클라이언트 컴포넌트(`use client`)여야 한다. (에러 바운더리가 클라이언트에서만 작동하기 때문) 
- 같은 수준의 layout에서 에러가 발생할 경우 해당 error 컴포넌트로 이동하지 않는다. 이는 레이아웃 컴포넌트가 에러 컴포넌트를 감싸고 있기 때문이다. 
- 따라서 layout에서 발생한 에러는 상위 error 컴포넌트에서 처리하거나, 루트 에러 처리를 담당하는 `app/global-error.js` 페이지를 생성하여 처리할 수 있다.

## not-found.js

특정 라우팅 하위 주소를 찾을 수 없는 404 페이지를 렌더링할 때 사용된다. '서버 컴포넌트'로 구성한다.

## loading.js

리액트 Suspense 기반으로 해당 컴포넌트가 불러오는 중임을 나타낼 때 사용된다.

## route.js

`/app/api` 의 디렉터리 라우팅 지원하는 파일

```jsx
// /api/hello/route.js
import {NextRequest} from 'next/server';

// GET /api/hello 요청 시
export async function GET(request: NextRequest) {
	return new Response(...);
}
```

### parameter

- request: fetch의 Request를 확장한 `NextRequest` 객체. cookie, headers 뿐만 아니라 nextUrl 같은 주소 객체도 담겨 있다.
- context: params 만 가지고 있는 객체. `/api/users/[id]/route.js` 처럼 동적 라우팅할 경우 해당 파라미터 값이 담겨 있다.

