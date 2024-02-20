# Data Fetching in App Router

1. 서버에서 fetch 한다.
2. 서버에서 라이브러리 쓴다.
3. 클라이언트에서 API Route 쓴다.
4. 클라이언트에서 라이브러리 쓴다.

## 1. 서버에서 데이터 요청하기

- Fetch api 사용.

```tsx
async function getData() {
  const res = await fetch('https://api.example.com/...');

  if (!res.ok) {
    // 가장 가까운 error.js 보여줘
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <div></div>;
}
```

### Caching

- 일단 기본적으로 데이터 캐싱함.
- `fetch(url, { cache: 'force-cache' })` 가 기본값이거든.
- post 도 캐싱된다? 어떻게?
- 이렇게 캐싱한 데이터는 주기적으로 업데이트하도록 하거나, 특정 이벤트에 따라 업데이트하도록 설정.

### Time-based Revalidation

캐싱 데이터 정해진 시간 마다 주기적 업데이트.

- `fetch(url, {next: {revalidate:3600}})`

- 모든 요청에 동일한 시간? -> `export const revalidate = 3600`

### On-demand Revalidation

특정 이벤트에 따라 업데이트.

- fetch 할 때 태그 설정 후 revalidateTag 함수에 넘겨
- revalidatePath 나 revalidateTag 에 따라.
- 실패시. 캐시된 데이터 계속 보여주고. 다음 요청에서 다시 시도

### 그냥 캐싱 안하고 싶다면?

- cache: no-cache
- revalidate:0
- dynamic = force-dynamic
- api route

## 2. 서버에서 라이브러리 사용해서 데이터 요청하기

- 만약 `fetch` 지원하지 않는 라이브러리 사용해서 데이터 요청하고 싶다면?
- 캐싱이랑 업데이트는 Route Segment Config Option 이랑 리액트 cache 함수 사용해서 가능
-
