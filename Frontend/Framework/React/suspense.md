# Suspense

컴포넌트를 동적으로 가져올 수 있게 도와주는 기능 

> 리액트 16버전에서는 React.lazy와 함께 단순히 코드 스플리팅을 위해 출시되었으나, 18버전에서는 데이터 패칭까지 확장할 수 있도록 업데이트되었따.

```jsx
<Suspense fallback={<Loading />}>
	<ChildComponent />
</Suspense>
```

- React does not preserve any state for renders that got suspended before they were able to mount for the first time. When the component has loaded, React will retry rendering the suspended tree from scratch.
- If Suspense was displaying content for the tree, but then it suspended again, the `fallback` will be shown again unless the update causing it was caused by [`startTransition`](https://react.dev/reference/react/startTransition) or [`useDeferredValue`](https://react.dev/reference/react/useDeferredValue).
- If React needs to hide the already visible content because it suspended again, it will clean up [layout Effects](https://react.dev/reference/react/useLayoutEffect) in the content tree. When the content is ready to be shown again, React will fire the layout Effects again. This ensures that Effects measuring the DOM layout don’t try to do this while the content is hidden.
- React includes under-the-hood optimizations like *Streaming Server Rendering* and *Selective Hydration* that are integrated with Suspense. Read [an architectural overview](https://github.com/reactwg/react-18/discussions/37) and watch [a technical talk](https://www.youtube.com/watch?v=pj5N-Khihgc) to learn more.

## Traditional Approach vs Suspense

- Fetch-on-render/Fetch-then-render은 `useEffect` 내에서 데이터 비동기 호출 이후. 데이터 받으면 렌더링을 (재)시작하는 방법
- Render-as-you-fetch, 즉 `Suspense`를 사용하는 방법은 컴포넌트 렌더링과 비동기 호출을 동시에 시작한다. 데이터를 받기 전까지는 fallback 컴포넌트를 보여주다가, 데이터를 받으면 완성된 컴포넌트를 보여준다. 

https://fe-developers.kakaoent.com/2021/211127-211209-suspense/

## Suspense-enabled data

Suspense를 도입한 데이터 소스에서만 Suspense 컴포넌트를 활성화할 수 있다. 

1. Relay나 Next.js와 같은 Suspense 도입 프레임워크를 사용한 data fetch
   - `useEffect`나 이벤트 핸들러 내부에서 fetching하는 경우 감지하지 않는다.
2. React.lazy 사용한 지연 로딩 컴포넌트 
3. Reading the value of a Promise with [`use`](https://react.dev/reference/react/use)

## Revealing content together at once

```jsx
<Suspense fallback={<Loading />}>
  <Biography />
  <Panel>
    <Albums />
  </Panel>
</Suspense>
```

- Suspense 내부 전체 트리를 단일 단위로 취급한다. 
- 즉, 위 코드에서 `Suspense` 내 컴포넌트들 중 하나만 데이터 대기를 위해 suspend 되더라도 모든 컴포넌트가 `<Loading />`으로 대체된다.





## 서버 사이드 렌더링

```jsx
async function BlogPosts() {
  const posts = await db.posts.findAll();
  return '...';
}
 
export default function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <BlogPosts />
    </Suspense>
  )
}
```

