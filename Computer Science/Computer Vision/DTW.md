# DTW&SDTW

매칭 알고리즘 DTW

## DTW(Dynamic Time Warping)

- DTW 란 두개의 sequence의 비유사도(or 유사도)를 측정하는 알고리즘을 말한다. 
- 음성 인식, 온라인 서명 인식 등에 사용된다.
- DTW의 장점은 두개의 sequence의 길이가 달라도 유사도를 측정할 수 있고, 과거의 값을 고려하여 만들 수 있다는 것이다.

### DTW 제한 및 규칙

- End-point alignment : 두 시퀀스의 첫번째와 마지막 인덱스는 일치해야 한다. 
- Monotonicity : 시퀀스는 일정하게 값이 증가(단조 증가)해야한다.
- Continuity : 증가하는 값이 1보다 작아야한다 = 갑자기 큰 값으로 튀면 안된다?

### DTW 알고리즘 

두 패턴을 변경하지 않고 최적대응경로와 경로의 길이를 찾고, 비유사도를 산출하기

- 입력 : 배열 길이가 각각 n,m인 배열 A,B 그리고 대응 경로 길이인 np
- 출력 : 비유사도 disSim

````c
number DTW(int n, int m, number A[], number B, int &np) {
	number DTW[n][m] = {0}
  // DTW 첫번째 열 무한대 처리하기
  for(j=0..n) {
  	for(i=0..m) {
  		DTW[i][j] = 0
  	}
  }
  // Iteration
  for(j=1..n) {
  	for(i=1..m) {
  		DTW[j][i] = abs(A[i]-B[j]) + min(DTW[j-1][i], DTW[j][i-1], DTW[j-1][i-1])
  		Pt[j][i] = arg min(DTW[j-1][i], DTW[j][i-1], DTW[j-1][i-1])
  	}
  }
  while(Pt[j][i] != 0) {
  	np++
  	// Backtracking and Termination : 최적의 경로 이동 횟수
  	switch(Pt[j][i]) {
  		case1 : i=i-1 and j=j-1
  		case2 : i=i-1
  		case3 : j=j-1
  	}
  }
  disSim = DTW[n][m] / np
  return disSim
}
````

## Distance

### Vector to Vector

> 직선을 구하는 방법을 일반화시킨 것을 norm 이라고 한다. 

<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/67703882/246880805-b6a0a956-90ff-4547-b57b-4c137ef9ecd2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20230619%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230619T160151Z&X-Amz-Expires=300&X-Amz-Signature=d30fa7942ac25af3fa56f8295c649cf101b707d278326f31b6b982641f28d01d&X-Amz-SignedHeaders=host&actor_id=67703882&key_id=0&repo_id=400976668" />

- L1 norm : 두 벡터 차의 절댓값 합(Manhattan Distance)

- L2 norm : Euclidean Distance(유클리디언 거리)를 통해 측정하는 방식으로 두 점간의 거리를 측정 

### Cluster to Vector

- Mahalanobis Distance :공분산이 활용되는 거리 측정 방식

### Cluster to Clutser

- Bhattacharyya Distance : (평균과 공분산을 갖는) 두 군집 간의 거리를 구하는 방식

## SDTW(Statistical Dynamic Time Warping)

- 길이가 다른 n개의 시계열(시간의 흐름이 존재하는) 패턴들이 주어질 때, 이 패턴들의 평균 패턴과 주어진 패턴들 각각과의 대응경로를 찾기
- SDTW 수행 방법
  1. 중간 길이를 가지는 패턴을 임의로 선택해 평균 패턴으로 정해
  2. DTW 이용해서 평균 페턴과 n-1개의 패턴들에 대해 대응 경로를 산출
  3. 대응 경로 사용해 새로운 평균 패턴 산출
  4. 새로운 평균 패턴을 가지고 다시 2번 수행

## 참고자료

- 숭실대학교 소프트웨어학부 4-1 [컴퓨터비전] 전공 수업 

- [L1 norm, L2 norm 란?](https://hyungbinklm.tistory.com/39#:~:text=%3A%20L1%20norm%EC%9D%80%20%EB%8B%A4%EC%9D%8C%EA%B3%BC%20%EA%B0%99%EC%9D%B4%20%EC%A0%95%EC%9D%98%EB%90%A9%EB%8B%88%EB%8B%A4.&text=p%2C%20q%EB%9D%BC%EB%8A%94%20%EB%B2%A1%ED%84%B0%EA%B0%80,distance%EB%A1%9C%20%ED%91%9C%ED%98%84%ED%95%A0%20%EC%88%98%20%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4.)
- [DTW](https://hwa-a-nui.tistory.com/2)