## Input 태그

### 이미지 미리보기 처리 

<input type='file' /> 을 통해 이미지 파일을 입력받고 미리보기를 보여주는 로직.

```html
<input type='file' onChange={handleImgUpload} />
```

```javascript
const [imgSrc, setImgSrc] = useState(null);

const handleImgUpload = (e) => {
	const reader = new FileReader();
	reader.readeAsDataUrl(e.target.files[0]);
	reader.onLoad = () => {
		setImgSrc(reader.result);
	}
} 
```



#### FileReader ?

`FileReader` 객체는 