# Next/Image

https://nextjs.org/docs/app/api-reference/components/image

## Props

### fill

- 이미지 사이즈를 **부모 요소에 맞추고 싶을 때** 사용
- 사용시 주의사항
  - 해당 속성을 사용하려면 부모 요소의 `position`이 `relative`, `fixed`, `absolute` 중 하나여야 한다.
    - `fill` 속성이 true인 이미지에 자동으로 `position:absolute` 가 부여되기 때문.
  - 부모 요소의 `width` , `height` 가 설정되어 있어야 한다.

object-fit:contain vs object-fit:cover

### sizes

미디어 쿼리 관련?

### quality

### priority

