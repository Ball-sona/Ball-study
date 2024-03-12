# Image

https://nextjs.org/docs/app/api-reference/components/image

## Props

### fill

- 이미지 사이즈를 **부모 요소에 맞추고 싶을 때** 사용
- 해당 속성 사용하려면, 부모 요소의 `position`이 `relative`, `fixed`, `absolute` 중 하나여야 한다 -> `fill` 속성이 true 인 이미지에 자동으로 `position:absolute` 가 부여되기 때문.
- 해당 속성 사용하려면, 부모 요소의 `width` , `height` 가 설정되어 있어야 한다.

### sizes

- `srcset` 에서 다운로드할 이미지 크기를 결정하는 데 사용 
- 만약 `fill` 속성 사용시 브라우저는 다운로드할 이미지의 크기를 정확히 모르니 뷰포트 전체 크기나 그보다 좀 더 큰 크기로 리소스를 다운로드하지만, `sizes` 속성을 지정하면 다운할 리소스 크기를 정확히 지정해줄 수 있다.
- 또한 뷰포트 너비에 따라 `srcset` 을 동적으로 변경해줄 수도 있다.

```
 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
```

### quality

- 이미지 압축 정도를 지정. 1-100 중 선택할 수 있고, 낮은 값을 선택할 수록 이미지를 더 많이 압축한다. (기본값 75)
- quality가 높을수록 이미지는 선명해지지만 파일의 크기가 커진다.

### priority

- 이미지에 높은 우선순위를 두고, pre-loading을 할지 유무
  -  스크롤해서 볼 수 있는 이미지에는 설정하지 말 것
- priority값을 true로 설정한 이미지는 자동으로 lazy loading 되지 않는다. (next/image는 기본적으로 이미지를 lazy loading함!)
  - preload은 브라우저가 페이지를 초기 로드할때 이미지를 우선적으로 다운로드하라고 지시하는 것. 이미지가 뷰포트에 나타나지 않아도 우선적으로 리소스를 다운로드한다.
  - 반대로 lazy loading은 이미지가 뷰포트에 나타날 때까지 리소스 로딩을 지연시키는 것. 초기 페이지 로드에 필요하지 않은 리소스들을 다운로드하지 않음으로써 초기 페이지 로딩 시간을 단축시킨다.

### loading

- 이미지 로딩을 어떻게 할지. 기본값은 `lazy` 로 이미지가 뷰포트와 일정 거리에 있을 때 불러오고, `eager` 로 설정시 이미지를 즉시 불러온다.
- `loading=eager` 은 `priority={true}` 와 동일하게 이미지 preloading을 할 수 있다. 차이점은 `loading=eager` 설정 시 `<img>` 태그의 `loading` 속성값에 `eager` 를 추가한다는 것이고, `priority` 설정 시 `<link preload>` 태그를 페이지 HTML 상단에 추가한다는 것이다.

## 이미지 최적화

1. 이미지 압축하기 -> 선명도가 중요하지 않은 이미지라면 낮은 `quality` 값 부여해서 이미지 파일 크기 줄이기 
2. 리소스 크기 줄이기 -> 적절한 `sizes` 지정해서 불필요하게 큰 이미지 다운하지 않도록 하기
3. 최대한 빨리 보여줘야하는 이미지라면 `priority` 설정하고, 스크롤해야만 볼 수 있거나 최대한 늦게 보여줘도 되는 이미지라면 (기본적으로 적용되는) lazy loading 되도록 하기
