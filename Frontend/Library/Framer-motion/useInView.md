# useInView

특정 요소가 뷰포트 내에 위치하고 있는지 여부를 알 수 있는 훅 

```tsx
const Section = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '0px 0px -60px 0px', once: true });

  return (
		<div ref={ref}>
    	<div class={`title ${isInView ? 'active-title': ''}`}>Title1</div>
      <div class={`title ${isInView ? 'active-title': ''}`}>Title2</div>
      <div class={`title ${isInView ? 'active-title': ''}`}>Title3</div>
    </div>
  );
};
```

```css
.title {
  opacity:0;
   transform: translateY(30px);
}

.active-title {
  opacity: 1;
  transform: none;
  transition: all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s;
}
```

## options

- `once:true/false` : 한번 뷰포트에 보여진 뒤에는 더이상 해당 요소를 관찰하지 말지 여부
- `root` : root 속성에 부모 컨테이너 요소를 설정 시, 뷰포트 대신 부모 컨테이너 내에 enter/leave하는지 관찰
- `margin` : root or 뷰포트에 마진을 부여해서 영역 확장