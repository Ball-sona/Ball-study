## Union and Intersection Type

#### Union Types(유니언 타입)

```ts
function padLeft(value: string, padding: string | number) {
  // ...
}
```

padding 의 타입이 string 와 number 둘 중 하나여야한다. 

#### Intersection Types(교차 타입)

```ts
interface ErrorHandling {
  success:boolean;
  error?:{message:string};
}
interface ArtworksData {
  artworks: {title:string}[];
}
interface ArtistsData {
  artists: {name:string}[];
}

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;
```

일관된 에러를 다루는 네트워크 요청 API 가 있다면 해당 에러 핸들링을 분리하여 하나의 응답 타입에 대응하는 자체 타입을 만든다.  