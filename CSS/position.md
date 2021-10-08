### Position
- static : 기본값. 다른 태그와의 관계에 의해 자동 배치
- absolute : 절대 좌표로 위치 지정
- relative : 원래 있던 위치(static..?)를 기준으로 좌표 지정
- fixed : 스크롤과 상관없이 문서 최 좌측상단을 기준으로 좌표 고정.
- inherite : 부모 태그의 속성값을 상속
<br>
- relative인 컨테이너 내부에 absolute인 객체가 있으면 절대 좌표를 계산할때, relative 컨테이너를
기준점으로 잡게 된다. 