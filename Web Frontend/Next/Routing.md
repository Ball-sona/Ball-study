# Routing

## API Routes

Next.js를 통해 구축한 웹 서버를 API 서버로 사용할 수도 있다. API Routes 기능을 이용해 API를 구축해보자.

`/pages/api` 폴더는 페이지 파일이 아닌 `/api/*` 로 매핑되어 API 엔드포인트로 간주된다. 예를 들어 `/pages/api/user.ts` 파일을 생성했다면 `/api/user` 로 API 요청을 보낼 수 있는 것이다.

이들은 서버 사이드에서만 번들링되어 클라이언트측 번들 사이즈에 영향을 주지 않는다. 

json 데이터를 반환하는 간단한 API를 만들어보자.

```tsx
// page/api/user.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json({name:'sona'})
}
```

- `req.method` 를 통해 특정 HTTP 메서드에 대한 처리를 핸들링할 수 있다.
- 이밖에도 `req.cookies` , `req.query` , `req.body` 등을 이용한 작업들을 수행할 수 있다. 