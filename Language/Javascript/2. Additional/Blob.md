# Blob

- Binary Large Object의 약자로, 이진 데이터를 저장하는 용량이 큰 객체를 의미
- 주로 이미지, 오디오, 영상 등 멀티미디어 데이터를 저장할 때 사용하고, HTML 문서나 텍스트 등 데이터도 저장 가능
- Blob은 크게 2가지로 구성
  - blobParts: Blob/BufferSource/String 값들이 연속적으로 나열된 배열
  - type: MIME-type (optional)

## Blob 생성하기

```js
const blob = new Blob(blobParts, { type: MIME 타입 });
```

> `blob.slice`를 통해 Blob 객체를 복사할 수 있지만, 직접적으로 조작할 수는 없다. -> immutable

## Blob URL

Blob 객체를 download/upload하기 위해 이를 URL 형태로 변환할 수 있다.

### URL.createObjectURL

- Blob 객체를 참조하는 URL을 포함한 DOMString을 생성한다.
- URL은 현재 문서에서만 유효하다.
- `blob:<origin>/<uuid>`

### URL.revokeObjectURL

- `createObjectURL` 을 통해 생성한 URL을 폐기한다.
- 문서가 unload되지 않는 이상 Blob 객체가 메모리 영역을 계속 차지하고 있기 때문에, 메모리 누수를 방지하기 위해서 더이상 사용되지 않는 Blob 객체에 대한 URL을 해제해야 한다.

## Blob to base64

- Blob 객체를 base64 기반 문자열로도 변환 가능하다.
- 이러한 인코딩된 문자열을 data url 형태로 사용할 수 있다. -> `data:[<mediatype>];baes64,<data>`
- FileReader 객체를 통해 base64로 변환 가능하다.

```js
const reader = new FileReader();
reader.readAsDataURL(blob);

reader.onload() = () => {
  link.href = reader.result; // data url
  link.click();
}
```

- `URL.createObjectURL` 와 달리 따로 revoke 해줄 필요 없다.
- 용량이 큰 Blob 객체를 인코딩하는데 시간이나 메모리를 많이 잡아먹을 수 있다.

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
