### **clientX, offsetX, pageX, screenX 차이**

- clientX,clientY

  클라이언트 영역 내에서 X,Y 좌표를 제공. 여기서 클라이언트 영역은 **현재 보이는** **브라우저를 기준**으로 한다. **스크롤바가 움직여도 변함 없음**

- offsetX,offsetY

  이벤트 걸려있는 **DOM Node를 기준**으로 X,Y 좌표 제공. 만약 화면 중간의 박스 내부를 클릭한다면 그 박스의 왼쪽 모서리 좌표가 0,0이 된다.

- pageX,pageY

  브라우저 페이지에서의 X,Y 좌표. 전체 문서 기준. **스크롤바가 움직이면 pageY 값도 변화**

- screenX, screenY

  브라우저 화면이 아니라 사용자 모니터 화면 기준 X,Y 좌표.

https://hianna.tistory.com/493

