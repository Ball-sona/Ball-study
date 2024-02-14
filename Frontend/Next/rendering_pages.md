# Rendering in Pages Router

## SSR

- Server-side Rendering or Dynamic Rendering
- 매 요청마다 HTML 파일이 서버에서 렌더링되어 클라이언트로 전송되는 방식
- **자주 업데이트되는 데이터**를 서버에서 미리 렌더링해서 페이지를 보여주고 싶을 때 사용

### 사용 방법

- `getServerSideProps` 호출

## SSG

- Static Site Generation
- HTML 파일이 빌드 타임에 생성되어 저장된 후, 요청마다 재사용되는 방식
- CDN에 의해 캐싱 가능
- 공식 문서, 포트폴리오 페이지 등 데이터가 자주 업데이트되지 않아도 되서, 매 요청마다 데이터를 매번 불러오지 않아도 될 때.

### 사용 방법

- 만약 페이지 컴포넌트에서 외부 데이터를 요청하고 있지 않은 상태이면, 기본적으로 SSG 된다.
- 만약 contents에 의존하여 외부 데이터 요청하고 싶다면 `getStaticProps`
  - ex. CMS에서 블로그 글 데이터를 미리 요청하고 싶다면
- 만약 url paths에 의존하여 외부 데이터 요청하고 싶다면 `getStaticPaths`
  - ex. url이 `/posts/1` 인 페이지에 접근했을 때 해당 id 값을 이용해서 페이지를 렌더링하고 싶다면

## CSR

- Client-side Rendering
- `useEffect` 및 SWR, React-query 등 라이브러리 통해 외부 데이터 요청

### SWR

Next가 만든 클라이언트 사이드 data fetching 관련 라이브러리. caching, revalidation, focus tracking, refetching on intervals 등 핸들링 가능

```jsx
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Profile() {
  const { data, error } = useSWR('/api/user', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return <div>{data.name}</div>;
}
```

- 자동으로 데이터 캐싱해주고. 데이터가 stale해지면

## Automatic Static Optimization(ASO)

Next는 정적 최적화 한다.

- 만약 페이지에 `getServerSideProps` 나 `getInitialProps` 가 있다면. 페이지를 SSR 하기 시작. 이때 라우터의 query 객체는 요청에 따라 동적으로 생성.
- 만약 위 두 함수가 없다면. 자동으로 정적인 페이지로 최적화. 이후 페이지가 클라이언트로 전송되면 클라이언트 측에서 'hydration' 되는데, 이때, query 객체는 빈 상태일 것.
- 만약 클라이언트에서 라우팅 발생하면, Next는 페이지를 업데이트하고 query 객체를 업데이트.

- hybrid application : SSR + SSG -> 일부 페이지는 SSR을 사용하고, 일부 페이지는 SSG를 사용

## ISR

- Incremental Static Regeneration
- SSG 하되. 특정 페이지만 렌더링을 다시 할 수 있도록 하는 방식.
- Edge Runtime에서는 사용 불가

### 사용방법

- `getStaticProps` + `revalidate` 옵션

### Revalidation

만약 `revalidate: 10` 설정했다해보자.

1. 페이지는 빌드 시점에 생성된다. = pre-rendered
2. 페이지가 최초로 만든 시점부터 10초 동안은 해당 페이지를 접속하는 모든 사람들에게 캐싱된 페이지가 계속 보여진다.
3. 10초가 지난 시점에 누군가가 해당 페이지에 접속했다. 일단 10초후에 최초로 접속한 그 사람에게는 마찬가지로 캐싱된 페이지 보여줌.
4. 동시에 백그라운드에서 해당 페이지가 재생성됨.
5. 페이지가 성공적으로 생성되었다면. next는 캐시 데이터를 제거하고 이후부터는 사람들에게 업데이트된 페이지를 보여준다.
6. 만약 페이지를 다시 생성하는데 실패했다면 캐시되어있는 이전 페이지를 계속 보여준다. 그리고 바로 다음 호출에서 `getStaticProps` 를 재시도

### On-demand Revalidation

- 앞서 보다시피. `revalidate` 값으로 설정한 시간 이후 누군가가 페이지에 접속해야 페이지 업데이트가 시행됨.
- 만약 `revalidate` 생략하면? 기본값 `false` -> `revalidate()` 가 호출된 경우에만 업데이트. 그 외에는 절대 업데이트 안함.
- 미들웨어는 ISR를 촉진시키지 않아? => 따라서 `res.revalidate('url')` 해야한다는데. 먼말이야.

### Revalidation API Route

인증되지 않은 접근을 막기 위해 secret_token 사용

```js
export default async function handler(req, res) {
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    await res.revalidate('/path-to-revalidate');
    return res.json({ revalidated: true });
  } catch (err) {
    //  캐시된 페이지 그대로 계속 보여줄 것
    return res.status(500).send('Error revalidating');
  }
}
```
