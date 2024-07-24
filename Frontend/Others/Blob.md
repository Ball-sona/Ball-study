# Blob

- Binary Large Object의 약자로, 이진 데이터를 저장하는 용량이 큰 객체를 의미
- 주로 이미지, 오디오, 영상 등 멀티미디어 데이터를 저장할 때 사용하고, HTML 문서나 텍스트 등 데이터도 저장 가능

## Blob 생성하기

```js
const blob = new Blob([저장할 데이터], { type: MIME 타입 });
```

## Blob URL

### URL.createObjectURL

- Blob 객체를 참조하는 URL을 포함한 DOMString을 생성한다.
- `blob:URL`

### URL.revokeObjectURL

- `createObjectURL` 을 통해 생성한 URL을 폐기한다.
- 이를 통해 폐기하지 않으면 자바스크립트 엔진 Garbage Collector는 해당 URL이 유효하다고 판단하기 때문에, 메모리 누수를 방지하기 위해 DOM과 바인딩한 이후에는 URL을 해제하는 것이 좋다.

## 파일 다운로드 기능 구현하기

1. 다운받을 데이터를 담은 Blob 객체를 생성한다.
2. `URL.createObjectURL` 통해 해당 Blob 객체를 참조하는 URL을 DOMString으로 변환한다.
3. a 태그를 생성하여 href 값에는 위에서 만든 URL을, download값에는 파일명을 넣어준다.
4. 해당 a 태그를 DOM 트리에 삽입한 후 클릭 처리한다.
5. 저장이 완료되었다면 a 태그를 DOM 트리에서 제거한다.

```js
const downloadFile = (data: unknown, filename: string, mimeType?: string) => {
  const blob = new Blob([data], { type: mimeType });
  const a = document.createElement("a");

  a.href = URL.createObjectURL(blob);
  a.download = filename;

  a.click();
  a.remove();
};
```
