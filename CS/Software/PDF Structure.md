# PDF 

PDF(Portable Document Fomat)은 어도비가 개발한 문서 형식으로, 운영체제 및 플랫폼 관계없이 사용할 수 있다. 

## 구조

PDF 파일은 4가지의 요소로 구성된다.

1. Object
2. File Structure
3. Document Structure
4. Content Streams

### Object 

PDF 파일은 작은 오브젝트들로 구성되어 있다.

- 오브젝트는 boolean, integer, string, names(심볼), arrays, dictionary(key-value), stream 으로 총 8개의 타입을 갖는다.
- 다른 오브젝트를 참조하는 Indriect 오브젝트도 있다.

### File Structure

PDF 파일은 크게 4파트로 나눌 수 있다.

1. Header: PDF 명세 버전을 알리는 한줄 (총 8바이트)
2. Body: PDF 문서를 구성하는 오브젝트들을 포함 -> 문서 내용, 폰트, 페이지, 이미지 등 
3. Xref Table: 참조하고 있는 오브젝트에 대한 정보 = 전역참조테이블
4. Trailer: 전역 참조의 위치와 Body 내 특정 오브젝트의 위치 정보를 포함

## 참고 문서

https://blog.forensicresearch.kr/4