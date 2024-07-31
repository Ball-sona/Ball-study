# 이미지 미리보기 처리

```html
<input type="file" onChange="{handleImgUpload}" />
```

```javascript
const [imgSrc, setImgSrc] = useState(null);

const handleImgUpload = (e) => {
  const reader = new FileReader();
  reader.readeAsDataUrl(e.target.files[0]);
  reader.onLoad = () => {
    setImgSrc(reader.result);
  };
};
```

#### FileReader ?
