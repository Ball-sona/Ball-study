# Routing Using App Router

> 기본적으로 `app` 디렉토리 내에 있는 컴포넌트들은 서버 컴포넌트다.

## Nested Components and Hierarchy

아래와 같은 컴포넌트들은 Next.js에서 특별한 기능을 갖는 (기본) 컴포넌트들이다.

| 컴포넌트 이름                                                | 설명                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`layout`](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts) | 해당 폴더와 그 내부에 있는 자식 폴더들이 공유하는 UI         |
| [`page`](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages) | route에 접근했을 경우 보여지는 Unique UI                     |
| [`loading`](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming) | 해당 폴더와 자식 폴더들의 로딩 UI (React Suspense Boundary)  |
| [`not-found`](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) | 해당 폴더와 자식 폴더에서 Not Found 떴을 때 보여지는 UI (React Error Boundary) |
| [`error`](https://nextjs.org/docs/app/building-your-application/routing/error-handling) | 해당 폴더와 자식 폴더에서떴을 때 보여지는 UI (React Error Boundary) |
| [`global-error`](https://nextjs.org/docs/app/building-your-application/routing/error-handling) | Global Error UI                                              |
| [`route`](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) | 서버 사이드 API 생성 시 엔드포인트                           |
| [`template`](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#templates) | Specialized re-rendered Layout UI                            |
| [`default`](https://nextjs.org/docs/app/api-reference/file-conventions/default) | Parallel Routes를 위한 Fallback UI                           |

위 컴포넌트들은 렌더링 시 다음과 같은 Hierarchy를 갖는다. 

```html
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

## Page, Layout, Template

### Page

- 사용자가 특정 페이지(path)에 접근 시 보여지는 Unique UI 컴포넌트로, route subtree의 항상 leaf 컴포넌트다. 
- Data fetch가 가능하다.

### Layout

> Page Router 때 `_app.js` 와 `_document.js` 를 대체

- 여러 페이지가 공유하는 UI (현재 폴더 내에 있는 페이지들)
- 페이지 이동 시에도 Layout은 현재 state와 interactive한 기능들을 유지하고, 리렌더링되지 않는다. 
- `app` 디렉토리 바로 안에 위치한 Root Layout은 모든 페이지들이 공유하는 컴포넌트로, `html` 와 `body` 태그를 반드시 포함해야 한다. (다른 레이아웃은 포함 불가능)
- Data fetch가 가능하나, 레이아웃 내 자식 컴포넌트에게 데이터를 전달하는 것은 불가능하다. 한편, 한 route에서 데이터를 여러번 fetch하게 되면 리액트가 자동적으로 요청을 dedupe하여 한번만 데이터를 가져올 수 있게 한다. (성능 최적화)

### Template 

자식 layout or page 컴포넌트를 감싼다는 점에서 Layout 컴포넌트와 유사하지만, 라우트 시에도 state를 유지하는 Layout와 달리, Template은 그들의 자식과 네비게이션마다 새로운 인스턴스를 생성한다. 즉, 유저가 특정 템플릿이 감싸고 있는 여러 routes들 내에서 이동했다면, 컴포넌트의 새로운 인스턴스가 생성된 후 DOM 요소가 재생성되고 state가 유지되지 않으며, effect가 다시 동기화될 것이다. 

이는 다음과 같은 상황에 사용되면 적절할 것.

- `useEffect` (e.g logging page views) 나 `useState` (e.g a per-page feedback form) 에 의존하는 기능

- To change the default framework behavior. For example, Suspense Boundaries inside layouts only show the fallback the first time the Layout is loaded and not when switching pages. For templates, the fallback is shown on each navigation.

A template can be defined by exporting a default React component from a `template.js` file. The component should accept a `children` prop.

## Link and Navigation

- `next/link` 의 `<Link>` 사용 시 `prefetch` 와 client-side 페이지 이동을 제공할 수 있다. 
- 서버 컴포넌트에서는 `useRouter` 사용이 불가능하다. (참고로 `next/navigation` 꺼임)

### 서버 컴포넌트에서 어떻게 라우팅이 가능한가?

The App Router uses a hybrid approach for routing and navigation. On the server, your application code is automatically code-split by route segments. And on the client, Next.js [prefetches](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#1-prefetching) and [caches](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-caching) the route segments. This means, when a user navigates to a new route, the browser doesn't reload the page, and only the route segments that change re-render - improving the navigation experience and performance.

### [1. Prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#1-prefetching)

Prefetching is a way to preload a route in the background before the user visits it.

There are two ways routes are prefetched in Next.js:

- **`<Link>` component**: Routes are automatically prefetched as they become visible in the user's viewport. Prefetching happens when the page first loads or when it comes into view through scrolling.
- **`router.prefetch()`**: The `useRouter` hook can be used to prefetch routes programmatically.

The`<Link>`'s prefetching behavior is different for static and dynamic routes:

- [**Static Routes**](https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default): `prefetch` defaults to `true`. The entire route is prefetched and cached.
- [**Dynamic Routes**](https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering): `prefetch` default to automatic. Only the shared layout down until the first `loading.js` file is prefetched and cached for `30s`. This reduces the cost of fetching an entire dynamic route, and it means you can show an [instant loading state](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#instant-loading-states) for better visual feedback to users.

You can disable prefetching by setting the `prefetch` prop to `false`.

See the [`` API reference](https://nextjs.org/docs/app/api-reference/components/link) for more information.

> **Good to know**:
>
> - Prefetching is not enabled in development, only in production.

### [2. Caching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-caching)

Next.js has an **in-memory client-side cache** called the [Router Cache](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#caching-data#router-cache). As users navigate around the app, the React Server Component Payload of [prefetched](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#1-prefetching) route segments and visited routes are stored in the cache.

This means on navigation, the cache is reused as much as possible, instead of making a new request to the server - improving performance by reducing the number of requests and data transferred.

Learn more about how the [Router Cache](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#caching-data) works and how to configure it.

### [3. Partial Rendering](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#3-partial-rendering)

Partial rendering means only the route segments that change on navigation re-render on the client, and any shared segments are preserved.

For example, when navigating between two sibling routes, `/dashboard/settings` and `/dashboard/analytics`, the `settings` and `analytics` pages will be rendered, and the shared `dashboard` layout will be preserved.

![How partial rendering works](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fpartial-rendering.png&w=3840&q=75&dpl=dpl_BgDMtkMC7Ys3CBykeL1toqez4tqp)

Without partial rendering, each navigation would cause the full page to re-render on the server. Rendering only the segment that changes reduces the amount of data transferred and execution time, leading to improved performance.

### [4. Soft Navigation](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#4-soft-navigation)

By default, the browser performs a hard navigation between pages. This means the browser reloads the page and resets React state such as `useState` hooks in your app and browser state such as the user's scroll position or focused element. However, in Next.js, the App Router uses soft navigation. This means React only renders the segments that have changed while preserving React and browser state, and there is no full page reload.

### [5. Back and Forward Navigation](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#5-back-and-forward-navigation)

By default, Next.js will maintain the scroll position for backwards and forwards navigation, and re-use route segments in the [Router Cache](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#caching-data).