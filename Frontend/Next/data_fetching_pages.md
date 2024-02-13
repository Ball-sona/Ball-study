# Data Fetching in Pages Router

## getStaticProps

https://nextjs.org/docs/pages/api-reference/functions/get-static-props

빌드 시점에 페이지를 렌더링한다.

```tsx
import type { InferGetStaticPropsType, GetStaticProps } from 'next';

export const getStaticProps = (async (context) => {
  const data = await getData('external-url');
  return {
    props: { data },
    fallback: false,
    revalidate: 10,
  };
}) satisfies GetStaticProps<{ data: TData }>;

export default function Page({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div>{data}</div>;
}
```

- 해당 함수는 클라이언트 사이드에서 번들링된 코드에서는 제거된다.
- 클라이언트 사이드에서 번들링된 js 코드에서 해당 함수는 제거된다.
- `next build` 가 실행되는 동안 호출 및 실행된다.
- 정적 HTML 파일 뿐만 아니라, 클라이언트 사이드에서의 라우팅에 필요한 JSON 파일을 생성.

> `next dev` 실행 시, 즉 개발 모드에서는 매 요청마다 호출된다.

### fallback

- fallback 옵션? -> 서버에서 미리 페이지를 만들어둘지. 아님 ??

### revalidate

- ISR 관련

## getStaticPaths

https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths

동적 라우팅을 한다는건, 빌드 시점에서는 사이트가 어떤 path를 갖게 될지 정확히 모른다는 것을 의미한다. 하지만 `getStaticProps` 를 사용해서 가능한 모든 페이지를 미리 렌더링해두고 싶다면? 우리는 필요한 path들을 모두 알아놔야한다.

이때 사용하는 게 `getStaticPaths` 다. 동적 라우팅을 하는 애플리케이션에서 사용할 모든 path들을 빌드시점에 미리 알아내서 저장해두는 것이다. SSG와 동적 라우팅을 동시에 하고 싶을 때 사용한다.

```tsx
import type { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next';

export const getStaticPaths = (async () => {
  return {
    paths: [{ params: { name: 'next.js' } }],
  };
}) satisfies GetStaticPaths;
```

- 반드시 `getStaticProps` 와만 사용할 것. `getServerSideProps` 랑 안돼.
- `getStaticProps` 와 마찬가지로, 빌드 시점에 호출되고 클라이언트 사이드의 js 번들에는 해당 함수 제거되어있을 것.

### fallback

- 만약 미리 빌드해야 할 페이지가 너무 많은 경우. paths에 미리 빌드해 둘 몇개의 페이지만 리스트로 반환하고, 나머지 페이지는 
  - `fallback:true` : 사용자가 미리 빌드하지 않은 페이지에 접근할 경우, 빌드되기 전까지는 fallback 컴포넌트를 보여주다가 빌드 완료되면 해당 페이지를 보여준다.
  - `fallback:"blocking"` : 별도의 로딩 처리를 하지 않고, 단순히 빌드가 완료될때까지 사용자를 기다리게 한다. 

- fallback 옵션?
- 미리 만들어두면 성능 떨어진다고? 먼말인질 모르겠네...

> `next dev` 실행 시, 즉 개발 모드에서는 매 요청마다 호출된다.

## Forms and Mutations

https://nextjs.org/docs/pages/building-your-application/data-fetching/forms-and-mutations

Next.js provides a powerful way to handle form submissions and data mutations using **API Routes**.

### 왜 API Routes ?

- api route 사용해서 데이터 변경하면 보안적으로 굳.

## getServerSideProps

https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props

사용자가 페이지에 접속할 때마다, 페이지를 새로 렌더링하고 싶은 경우 사용

```tsx
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

export const getServerSideProps = (async () => {
  const data = await getData('...');
  return { props: { data } };
}) satisfies GetServerSideProps<{ data: TData }>;
```

- `getServerSideProps` 는 JSON 객체를 반환.
  - JSON.stringify로 직렬화할 수 없는 Date 객체 등은 props에 담을 수 없다. 

- props 속성은 클라이언트 사이드에서 페이지가 정확히 hydrate 될 수 있도록 해?
- 만약 함수 내에서 에러 발생하면 `pages/500.js` 보여준다. 에러 페이지로 리다이렉트

### 호출 시점

- `next/link` 나 `next/router` 를 통해 유저가 해당 페이지를 방문한 경우. 클라이언트에서 서버에 API을 요청하는 순간. 함수 호출.
- 함수 실행이 끝나기 전까지는 사용자에게 어떠한 HTML도 보여줄 수 없다. -> 최대한 간결하게!

### Edge Cases

- 서버리스나 엣지 런타임 에서 사용 가능?

### Caching

함수 내부에서 캐싱 헤더인 `Cache-Control` 을 사용하면 동적인 결과를 캐싱할 수 있다.

```tsx
export async function getServerSideProps({ req, res }) {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

  return {
    props: {},
  };
}
```

- 최초 요청시 서버에서 데이터를 가져와서 페이지 렌더링. 해당 응답은 공유 캐시에 저장 `public`
- 공유 캐시에 저장된 응답은 최대 10초 동안 유효. `s-maxage=10`
- 응답이 10초 안에 반복되면. 캐시된 값은 여전히 fresh 상태.
- 응답이 59초 안에 반복되면. 캐시된 값은 stale 하지만, 여전히 해당 값으로 렌더링된다? `stale-while-revalidate`

## getInitialProps

- 서버와 클라이언트 모두에서 실행 가능한 메서드 
- 사용이 제한되어있는 페이지애만 사용하도록 권장



## SSR vs CSR

- SSR
  - 페이지 단에서. runtime 시점에 데이터 요청
  - 데이터 변경되면 페이지가 업데이트
- CSR
  - 컴포넌트 단에서. 컴포넌트가 mount 되면서 데이터 요청
  - 데이터 변경되면 컴포넌트가 업데이트

## 총정리

- 공식 문서 등 데이터가 자주 바뀌지 않는 페이지다? getStaticProps 사용해서 빌드 시점에 페이지 만들어놓고 계속 꺼내다 사용
- 근데 페이지 업데이트를 한번도 안하는건 너무한 것 같다? getStaticProps에 revalidate 옵션 사용해서 일정 시간 지나면 서버에서 페이지 다시 만들도록 설정
- 페이지 만들어두고 계속 재사용할건데 블로그 처럼 동적 라우팅도 하고싶다?getStaticPaths 사용해서 빌드 시점에 path 정보 미리 저장
- 이번엔 쇼핑몰 등 사용자가 페이지에 접속할때마다 데이터가 업데이트가 되었음 좋겠다? getServerSideProps 사용해서 요청마다 페이지 생성
- 근데 그렇다고 접속할때마다 데이터 요청하는건 또 너무한 것 같다? getServerSideProps 안에서 cache-control 사용해서 캐싱
- SNS 처럼 데이터 업데이트가 아주 잦고, 데이터 업데이트시 페이지 일부분만 업데이트하고 싶다면? 그냥 useEffect 사용해서 클라이언트 단에서 데이터 요청
- 근데 useEffect 쓰기 싫기도 하고 데이터 캐싱이나 업데이트 간격 등 설정을 편하게 하고 싶다면? SWR이나 react-query 라이브러리 사용
