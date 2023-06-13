# Middleware

Next 미들웨어는 API의 요청이 완료되기 전에 특정 코드를 실행할 수 있게 해준다. 이를 통해 우리는 rewrite 하거나 리다이렉트 하거나 요청이나 응답 헤더를 수정하거나 요청을 다이렉트로 받는 등 응답에 대한 수정을 할 수가 있다. 

프로젝트 루트에 `middleware.ts` 를 생성해주고, 예시를 살펴보자.

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server';

export function middleware(request:NextRequest){
	return NextResponse.redirect(new URL('/home', request.url));
}

// Matching Paths
export const config = {
	matcher:'/about/:path*'
}
```

## Matching Paths

우리는 어떤 path에서 미들웨어가 동작해야할지 정의해줘야 한다. 이를 정의하는 방법은 크게 2가지이다.

- Custom Matcher Config
- Conditional Statements

### Custom Matcher Config

위 예시처럼 Matching Paths를 직접 지정해주면 해당 path에서만 미들웨어가 동작하게 된다. matcher는 하나만 지정해줄 수 있고, 여러 paths를 배열로 묶어 지정해줄 수도 있다.

또한 정규식을 사용하여 특정 path를 제외한 모든 path에서 미들웨어가 동작하도록 지정해줄 수도 있다.

```
matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
```

Custom Matcher의 조건 및 특징은 다음과 같다.

- `/` 로 시작해야한다.
- named parameter(ex. :path) 를 사용할 수 있다. (ex. `/about/:path` 는 `/about/a` 나 `/about/b` 는 가능하지만 `/about/a/c` 는 매치되지 않는다)
- named parameter는 modifier를 사용할 수 있다. 
  - `*` 는 0개거나 여러개 가능 (ex. /about/:path*)
  - `?` 는 0개거나 하나 가능 (ex. /about/:path?)
  - `+` 는 하나거나 여러개 가능 (ex. /about/:path+)

### Conditional Statements

```ts
export function middleware(request: NextRequest) {
	if(request.nextUrl.pathname.startsWith('/about')) {
		return NextResponse.rewrite(new URL('/about-2', request.url));
	}
}
```

`request.nextUrl.pathname` 으로 path 명을 알아낸 후 이를 이용해 미들웨어 내에서 조건문을 걸 수 있다. 

## NextResponse

- 들어오는 요청을 다른 URL로 redirect
- 주어진 URL을 표시하여 응답을 rewrite

- API 라우트나, `getServerSideProps` 나, `rewrite` 목적지에 요청 헤더를 설정

- 요청 쿠키 설정

- 응답 헤더 설정

  