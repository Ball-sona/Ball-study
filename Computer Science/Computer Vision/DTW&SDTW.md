# DTW&SDTW

매칭 알고리즘 

## DTW(Dynamic Time Warping)

- DTW 란 두개의 sequence의 비유사도를 측정하는 알고리즘을 말한다. 
- 음성 인식, 온라인 서명 인식 등에 사용된다.
- DTW의 장점은 두개의 sequence의 길이가 달라도 유사도를 측정할 수 있다는 것이다. 

### DTW 제한 및 규칙

- End-point alignment : 시작과 끝은 정해져 있다.
- Monotonicity : 일정하게 값이 증가해야한다.
- Continuity : 증가하는 값이 1보다 작아야한다 = 갑자기 큰 값으로 튀면 안된다?

### DTW 알고리즘 

- 입력 : 배열 길이가 각각 n,m인 배열 A,B
- 출력 : 비유사도 disSim

````
````



## SDTW(Sequential Dynamic Time Warping)