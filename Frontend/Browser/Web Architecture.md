# Web Architecture

## MPA

- Multi Page Application. SSR
- LAMP 스택

## SPA

- Single Page Application. CSR
- 서버는 그냥 정적인 데이터인 자바스크립트와 HTML 파일만 전달해주면 끝이다.

## MPA vs SPA

## CSR

- Client Side Rendering

## SSR

- Server Side Rendering
- 서버는 페이지를 렌더링한 후에 브라우저에 전송도 해줘야하고, 외부 API에 데이터 요청도 해야하고,, 등 맡은 역할이 늘어난다.

### 현대 SSR

- 최초 웹사이트 진입 시에는 SSR 방식으로 서버에서 완성된 HTML 파일을 제공받고. 이후 라우팅에서는 서버에서 내려받은 자바스크립트를 바탕으로 마치 SPA처럼 작동한다.
- Next.js , Remix
