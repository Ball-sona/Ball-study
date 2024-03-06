# API Route 활용해서 토큰 관리

Next.js API Route, Cookie를 활용하여 '유저 인증'하기

## API Route

`/pages/api/token.ts` 에서 쿠키에 토큰 값 저장, 확인, 제거

```tsx
import { NextApiRequest, NextApiResponse } from 'next';

export default function tokenHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body, cookies } = req;
  switch (method) {
      
    // GET /api/token 요청 시 토큰 값 반환
    case 'GET': {
      const { accessToken, refreshToken } = cookies;
      return res.status(200).json({
        code: 200,
        data: {
          accessToken,
          refreshToken,
        },
      });
    }

    // POST /api/token 요청 시 쿠키에 토큰 저장
    case 'POST': {
      const { accessToken, refreshToken } = body;

      if (!accessToken || !refreshToken) {
        return res.status(400).json({
          code: 400,
          message: '토큰 값을 받지 못했어요',
        });
      }

      res.setHeader('Set-Cookie', [
        `accessToken=${accessToken}; path=/; Max-Age=5400;`,  // 1.5시간 유효
        `refreshToken=${refreshToken}; path=/; Max-Age=86400;`, // 24시간 유
      ]);
      return res.status(200).json({
        code: 200,
        message: '토큰 값을 성공적으로 저장했어요',
      });
    }

    // DELETE /api/token 요청 시 쿠키 값 제거 
    case 'DELETE': {
      res.setHeader('Set-Cookie', [
        `accessToken=null; path=/; Max-Age=0;`,
        `refreshToken=null; path=/; Max-Age=0;`,
      ]);
      return res.status(200).json({
        code: 200,
        message: '토큰 값을 성공적으로 제거했어요',
      });
    }
    default:
      return res.status(400).json({
        code: 400,
        message: '유효하지 않은 요청이에요',
      });
  }
}
```

## API 함수 작성

`/api/auth.ts` 에서 `/api/token`에 API 요청하는 함수 작성 

```ts
const NEXT_API: AxiosInstance = axios.create({
  baseURL: 'https://www.soyoueatsyours.com/api',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// 토큰 값을 쿠키에서 가져오는 함수
export const getTokenAsync = async () => {
  const response = await NEXT_API.get('/auth/token');
  const { data } = response.data;
  return data;
};
// 토큰을 쿠키에 저장하는 함수
export const setTokenInCookieAsync = async (
  accessToken: string,
  refreshToken: string,
) => {
  const response = await NEXT_API.post('/auth/token', {
    accessToken,
    refreshToken,
  });
  return response.status;
};
```

## Axios Interceptors 활용 토큰 확인 및 리프레쉬

엑세스 토큰이 유효하지 않아 API 요청에 실패했다면, `getTokenAsync` 함수 호출해서 토큰 불러와서 업데이트하고, 업데이트된 토큰으로 API 재요청

```ts
API.interceptors.response.use(
  (res: AxiosResponse) => res, 	// 응답 정상 
  async (error) => { 						 // 응답 실패
    // 액세스 토큰이 유효하지 않을 경우
    if (error.response.status === 401) {
      try {
        const { accessToken, refreshToken } = await getTokenAsync();

        const res = await getAsync('/api/user/refresh', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'x-refresh-token': refreshToken,
          },
        });

        if (res.isSuccess) {
          const { accessToken, refreshToken } = res.result.response;

          // 갱신된 토큰을 쿠키에 저장
          setTokenInCookieAsync(accessToken, refreshToken);

          // 갱신된 토큰을 가지고 API 요청 재시도
          return axios.request({
            ...error.config,
            headers: {
              ...error.config?.headers,
              Authorization: `Bearer ${accessToken}`,
            },
          });
        }
      } catch (error) {
        window.location.href = '/user/login';
      }
    }
    return Promise.reject(error);
  },
);
```

## 서버 사이드에서 로그인 안한 유저 접근 막기 

`getServerSideProps` 가 실행되기 이전에 만약 쿠키에 토큰이 없는 유저, 즉 로그인 안한 유저의 페이지 접근을 막는 고차함수 `withAuth`

```tsx
const AUTH_URL = [
  '/user/login',
  '/user/register',
];

export function withAuth(getServerSideProps: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    const { accessToken, refreshToken } = context.req.cookies;
    const url = context.resolvedUrl;

    // 토큰 없으면 로그인 페이지로 리다이렉트 시키기
    if ((!accessToken || !refreshToken) && !AUTH_URL.includes(url)) {
      return {
        redirect: {
          destination: '/user/login',
          statusCode: 302,
        },
      };
    }
  
    return await getServerSideProps(context);
  };
}
```

## 결론

- 유저가 로그인에 성공하면 서버로부터 받은 엑세스/리프레쉬 토큰을 `/api/token`에 전달하여 브라우저 쿠키(퍼스트사이드 쿠키)에 저장 
- 토큰이 필요한 API 요청 시, 쿠키에서 토큰 값을 가져와 사용
- 만약 엑세스 토큰이 만료되어 API 요청 실패 시, 리프레시 토큰과 함께 토큰 재발급을 서버에 요청하고, 새로운 토큰을 쿠키에 업데이트한 후 재요청
