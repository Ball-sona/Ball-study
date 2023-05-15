### Next/Image 사용시 

### ![스크린샷 2022-08-16 00.05.20](/Users/gongsona/Library/Application Support/typora-user-images/스크린샷 2022-08-16 00.05.20.png)

- Next/Image를 사용하려면 `<Image layout='fill'/>`를 감싸는 부모 요소에게 `position:relative`를 주자. 그러면 이미지의 사이즈가 자동으로 부모 요소에 fit 해진다.
-  그런데 Image와 전혀 관련없는 컴포넌트에 전혀 관련없는 스타일을 주게되면 갑자기 위 같은 에러가 뜨면서 이미지 크기가 망가진다. 원인을 모르겠다. 
- 다른 부분에서 해결했다