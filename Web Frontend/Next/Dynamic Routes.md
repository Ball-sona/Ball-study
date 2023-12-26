# Dynamic Routes

### Catch All Routes

- Catch All Routes
  - `pages/search/[...keyword].js` 는  /search/a, /search/a/b 까지 모두 작동 가능. 
- Optional catch All Routes 
  - `pages/search/[[...keyword]].js` 는 /search와 /search/a, /search/a/b 까지 모두 작동 가능. 
- 위 두 방식의 차이점은 /search 지원 여부임. 

https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes

### Caveats

아래 3개의 파일이 동시에 있을 때.. 

- `page/search/all.js`  -> /search/all 만 매치
- `page/search/[keyword].js` -> /search/abc 매치. /search/all 매치X
- `page/search/[...slug].js`  -> /search/abc/12, /search/abc/1/2 등 매치. /search/all, /search/abc 불가능. 

