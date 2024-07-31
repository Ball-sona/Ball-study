# 브라우저 렌더링 최적화

## Reflow, Repaint 줄이기

- Reflow, Repaint가 모두 발생하지 않는 `transform`, `opacity` 속성 사용
- `position: absolute or fixed`를 사용하면 영향을 받는 주변 노드를 줄일 수 있어 Reflow 과정을 줄일 수 있다.
