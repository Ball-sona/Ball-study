# Runtime

Next로 생성한 애플리케이션을 배포할 때, Edge vs Node.js 중 런타임 옵션을 선택한다.

https://nextjs.org/docs/pages/building-your-application/rendering/edge-and-nodejs-runtimes

## Edge Runtime

- 빠른 전송을 위해 글로벌 네트워크 노드를 활용하는 환경
- 글로벌 CDN에서 제공하는 노드로, 클라이언트에 가까운 위치에 있는 노드에서 페이지를 사전에 렌더링하고 캐싱 가능
- CDN이 미리 페이지 렌더링해놓고 있으므로. 로딩 속도가 더 빠름.

## Node.js Runtime

- 서버 코드를 실행하는데 사용되는 런타임 환경

## Serverless Node.js
