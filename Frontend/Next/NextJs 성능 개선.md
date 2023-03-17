# 성능 관련

### TTFB(Time to First Byte) : 서버 응답 시간 

사용자가 페이지 콘텐츠의 첫번째 바이트를 수신하는데 걸리는 시간 

- TTFB가 600ms 이상 넘어가면 서버 응답 시간이 느리다고 판단한다. 
- 개선 방법 
  - 서버 애플리케이션 로직 최적화 
  - 데이터베이스 최적화
  - React -> `renderToNodeStream()` 



### TTI(Time to Interactive) : 사용자 반응 시간



### Lazy Loading

- 이미지 로드하는 시점을 필요할 때까지 지연하는 기술 
- 스크린에 보여지는 이미지을 빠르게 로드하고, 스크린 밖의 이미지들은 로딩을 지연시키는 기술.



- Next 쓸때는 Next/Image 사용 시 알아서 lazy-loading 이 적용된다. 
  - 끄고 싶을 땐, 속성에 `priority=True` 나 `loading=eager` 부여하면 된다.  



Next의 Image를 사용하여 이미지 최적화를 했는데도, 이미지 로딩에 시간이 꽤 오래걸려 알아보니 priority 라는 속성을 

Image 에다가 주고 있었는데, 이 속성이 Next/Image가 제공하는 lazy loading 기능을 끄는 속성이었다. 사실 내가 언제 왜 
저 속성을 부여한건지 기억이 안나지만.. 확실한 건 이런 이유 때문에 혼자 하는 개발이 위험한 건 가보다. 
