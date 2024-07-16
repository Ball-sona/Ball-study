# Performance

## TTFB(Time to First Byte)

사용자가 페이지 콘텐츠의 첫번째 바이트를 수신하는데 걸리는 시간 

- TTFB가 600ms 이상 넘어가면 서버 응답 시간이 느리다고 판단한다. 
- 개선 방법 
  - 서버 애플리케이션 로직 최적화 
  - 데이터베이스 최적화
  - React -> `renderToNodeStream()` 

## TTI(Time to Interactive)

사용자 반응 시간