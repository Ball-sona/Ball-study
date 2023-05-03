# Computer Vision

컴퓨터 비전 정리

## Otsu's segmentation algorithm

Otsu's segmentation algorithm 는 이미지 처리에 사용되는 기법 중 하나로, 이미지의 히스토그램을 이용해서 이미지를 두 개의 클래스로 가장 잘 분할하는 intensity 값이 얼마인지 찾는 작업이다. 

이 알고리즘은 영상의 픽셀 값 분포를 이용하여 임계 값을 선택함으로써 두 클래스(전경과 배경) 간의 분산이 최소화되거나 클래스 간의 분산 비율이 최대화되도록 한다. 이로써 이미지의 전경과 배경을 가장 잘 구분할 수 있는 최적의 임계값을 찾아내는 것이 목표이다.

다음은 segmentation algorithm에 관한 공식이다. 이를 풀이 과정을 통해 살펴보자.

![스크린샷 2023-05-01 23 02 30](https://user-images.githubusercontent.com/67703882/235463004-448a6111-ab59-426d-aef9-b7600a0cb594.png)



총 255개의 intensity level(1~254) 값을 갖고 있는 이미지가 있다. 

우리는 해당 값들 중 특정 값을 역치값으로 정한 후, 그 값을 기준으로 이 이미지를 두개의 클래스(C0, C1)로 분할할 것이다. 

<img width="1337" alt="스크린샷 2023-05-01 23 56 59" src="https://user-images.githubusercontent.com/67703882/235472124-8d01cedf-e1d1-407e-a9cb-585939a8bb9c.png">

이를 구현한 c 코드는 다음과 같다.

```
int find_otsu_threshold(const Mat& img) {
    int best_threshold;
    double max_variance = 0;
    long int histogram[256] = 0;

    for(int i=0;i<img.rows;i++) {
        for(let j=0;j<img.cols;i++){
            histogram[img[i][j]]++;
        }
    }

    double w0 = 0, m0 = 0; // w = weight, m = mean
    double w1 = 0, m1 = 0;
    double variance;

    // Compute m1
    for(int i=0; i<255; i++) {
        m1 += i*histogram[i];
        m1 /= img.rows * img.cols;
    }

    // find T
    for(int t=1;t<254;t++){
        double change = (double)histogram[t] / img.rows / img.cols;
        w0 += change;
        w1 -= change;
        m0 += t*change;
        m1 -= t*change;
        variance = w0*w1*(m0/w0 - m1/w1)*(m0/w0 - m1/w1);
        if(variance > max_variance) {
            max_variance = variance;
            best_threshold = t;
        }   
    }
    return best_threshold;
}
```

## Mophological filtering  

모폴로지 필터링은 영상에서 객체의 형태를 변경하거나 객체 주변의 불필요한 잡음을 제거하는데 사용되는 기법이다. 모폴로지 필터링에는 Erosion, Dilatation, Opening, Closing 연산 등이 있다.

### Erosion(침식)

침식 연산은 이미지를 깎아 내는 연산이다. 침식 연산을 위해서는 구조화된 요소 커널(structuring element kernel)이라는 0과 1로 구성된 커널이 필요하다. 이는 1이 채워진 모양에 따라 사각형, 타원형, 십자형 등으로 사용할 수 있다.

![image](https://user-images.githubusercontent.com/67703882/235476041-f9b53ba7-c5f7-4847-9ec0-8b95f5bade2f.png)

십자형 구조화 요소 커널인 B를 A 이미지의 파란 부분(1)을 한 칸씩 훑는다. 이때 구조화 요소 커널이 A 이미지의 하늘색 부분과 완전히 겹치지 않을 때는 0로 변경하고, 겹칠때는 1로 그대로 둔다. 오른쪽 이미지를 보면 이러한 연산을 통해 원본보다 조금 깎인 것을 볼 수 있다.

침식 연산은 큰 물체의 주변을 깎는 기능을 한다. 또 작은 물체는 아예 제거하므로 노이즈 제거 효과도 있고, 원래 떨어져 있는 물체인데 겹쳐 있는 것을 떼어내는 데에도 효과적이다.

### Dilatation(팽창)

팽창 연산은 침식과 반대로 물체의 주변을 확장하는 연산이다. 

![image](https://user-images.githubusercontent.com/67703882/235477007-7c81d42e-2cf3-48ab-8f19-a41e88fe033b.png)

침식 연산와 달리, 팽창 연산에서는 입력 영상에서 1로 채워진 영역과 완전히 겹치지 않으면 1로 변경한다. 

### Opening(열림)

열림 연산은 **침식 연산 후 팽창 연산을 적용하는 것**을 말한다. 

![image](https://user-images.githubusercontent.com/67703882/235480065-403f5b8f-b885-4c21-8718-8fdf8cf8c751.png)

- 주변보다 밝은 노이즈를 제거하는 데 효과적이고, 객체의 윤곽을 부드럽게 만드는데 사용된다.
- 맞닿아 있는 것처럼 보이는 독립된 객체를 분리하거나 돌출된 모양을 제거하는 데 효과적이다.

### Closing(닫힘)

닫힘 연산은 **팽창 연산 후 침식 연산을 적용하는 것**을 말한다.

![image](https://user-images.githubusercontent.com/67703882/235480233-f423addc-7b36-4cd5-9cb4-428262e1d029.png)

- 주변보다 어두운 노이즈를 제거하는 데 효과적이다.
- 끊어져 보이는 개체를 연결(객체의 모양 복원)하거나 구멍을 메우는데 효과적이다.

### Gradient

그레디언트 연산은 팽창 연산을 적용한 이미지에서 침식 연산을 적용한 이미지를 빼서 경계 픽셀만 추출하는 연산이다.

### 연산 예시

다음은 erosion, dilation, opening, closing 연산에 대한 예시이다.

![스크린샷 2023-05-03 00 26 40](https://user-images.githubusercontent.com/67703882/235712378-8084b3f9-e65f-47e4-a49f-359cd89656b8.png)

### Boundary Extraction 

위에서 알아본 연산들을 통해 특정 이미지의 경계를 추출하는 방법을 알아보자. 경계 추출 수식은 다음과 같다.

![스크린샷 2023-05-03 00 29 44](https://user-images.githubusercontent.com/67703882/235713176-3d5d6dc1-7bc0-46b9-b915-6f5cd2efc0d2.png)

위 수식에서 A는 원본 이미지이고, B는 구조화 요소(structuring element) 이다. 먼저 B를 이용하여 A에 대한 침식(erosion) 연산을 진행한다. 이후 원본 이미지에서 침식 연산 결과를 제외시켜주면 이미지의 경계값만 남게 된다.

### Gray-Scale Morphology

명암값을 가진 이미지에 대한 Morphology 연산들은 다음과 같을 수 있다. (1차원 이미지 한정)

- Gray-scale dilation of f by b

  <img src="https://user-images.githubusercontent.com/67703882/235724214-1619e456-229e-495d-b942-3e97e2606a4c.png" alt="스크린샷 2023-05-03 01 14 19" style="zoom:67%;" />

  b의 값들이 양수라면 연산 결과 이미지는 전체적으로 밝아질 것이다. 어두운 노이즈들은 제거되거나 감소된다.

- Gray-scale erosion of f by b

  <img src="https://user-images.githubusercontent.com/67703882/235724263-06fa7cec-c3f3-45b9-b6fc-e8e7d5af76f1.png" alt="스크린샷 2023-05-03 01 14 38" style="zoom:80%;" />

  b의 값들이 양수라면 연산 결과 이미지는 전체적으로 어두워질 것이다. 밝은 노이즈들은 제거되거나 감소된다.

- Morphological Smoothing : `Closing` -> `Opening`

  밝은 노이즈와 어두운 노이즈를 동시에 제거하거나 얇게 만들어 영상을 smooth하게 만든다.

- Morphological Gradient : `Delation - Erosion`

  입력 이미지에서 sharp한 부분만 강조한다. 

- Top-hat transformation : `원본 - Opening`

  shading의 존재를 부각시킨다.?

## Boundary Tracing(경계 추적)

경계 추적이란 이진화된 이미지에서 객체의 외곽선 또는 경계를 추출하는 작업이다. 이는 주로 객체 인식, 객체 검출, 객체 추적 등에 활용된다. 

일반적으로 8방향 또는 4방향으로 이웃하는 픽셀을 검사하여 경계를 따라 이동하면서 객체의 외곽선을 추적한다. 이웃하는 픽셀의 값을 확인하여 경계 픽셀을 식별하고, 경계를 따라 이동하면서 외곽선을 생성한다. 

## Connected Component Labeling(연결 영역 레이블링)

연결 영역 레이블링은 이진화된 이미지에서 연결된 객체의 영역을 식별하는 작업이다. 연결된 객체의 픽셀을 같은 그룹 또는 레이블로 표시하여 객체를 구분한다. 

주로 4방향 또는 8방향의 이웃 픽셀을 검사하면서 연결된 픽셀을 찾고, 같은 객체로 간주하여 동일한 레이블을 할당한다. 이 과정은 모든 픽셀을 탐색하며 연결된 객체의 영역을 식별한다.

연결 영역 레이블링 알고리즘을 설명하면 다음과 같다. 이미지 픽셀들을 총 2번 탐색할 건데, 첫번째 탐색 때는 mask를 이용하여 이웃하는지 판별하여 레이블을 생성하고, label collisions 된 것은 Equivalence table을 만든다. 두번째 탐색때는 Equivalence table을 이용해 label collisions를 해결하고 최종 결과를 만들어낸다. 

## Connected Component Labeling(CCL)

Connected Component Labeling(Region Labeling) 에 대해 알아보자.

- 연결 영역 레이블이란, 좌표들 중 연결되어 있는 지역에 동일한 라벨을 할당하며, 결과적으로 binary image를 symbolic image로 변환하는 기법이다.
- 연결 영역에 라벨링을 하는 것은 패턴 분석 및 인지, 컴퓨터 및 로봇 비전, 머신러닝 등에 있어서 가장 기초적인 연산이다. 이는 거의 모든 이미지 기반 애플리케이션(지문 인식, 얼굴 인식 등) 에 요구된다고 할 수 있다.

- 4가지 접근 방식
  1. Recursively labeling method(Grass-fire)
  2. Contour-tracing-based method(boundary tracing)
  3. Raster-scan-based method(two-scan)
  4. Run-based method(Label-equivalence-resolving)

LCS는 영상의 지역적인 윤곽 또는 경계 정보를 나타내는 순서열을 의미한다. LCS는 영상의 픽셀 강도 변화를 나타내며, 영상 내 객체의 형태나 경계를 파악하는 데 사용된다.

## Interpolation(보간법)

보간법이란 알려진 값을 가진 두 점 사이 어느 지점의 값이 얼마인지 추정하는 기법이다.  우리가 어떤 값 a, b와 f(a), f(b)의 값을 알고 있을 때, a와 b 사이에 위치한 x에 대하여 f(x) 값이 무엇일지 추정하는 것이다. 

보간법에는 다양한 접근법들이 존재한다. 

### linear interpolation(선형 보간법)

<img src="https://user-images.githubusercontent.com/67703882/235603350-e3b7b8d3-24b1-4388-93ee-3f73d20a0454.png" alt="image" style="zoom:67%;" />

선형 보간법은 여러 접근법 중 가장 간단하다. 값을 알고 있는 두 점 사이에 직선을 그리고, 그 선을 이용해 f(x)값을 추정한다. 

### cubic interpolation(삼차 보간법)

<img src="https://user-images.githubusercontent.com/67703882/235603370-faac17ca-e9a2-441b-a68a-1da7fc668b74.png" alt="image" style="zoom:67%;" />

선형 보간법이 1차 함수를 이용했다면, 삼차 보간법은 3차 함수를 활용하는 방식이다. 직선이 아닌 곡선을 이용하므로 훨씬 더 부드러운 결과를 생성할 수 있다.

### bilinear interpolation(양선형 보간법)

<img width="453" alt="스크린샷 2023-05-02 16 16 59" src="https://user-images.githubusercontent.com/67703882/235603461-b7656f88-ed26-4e34-bad3-9db6313a4910.png">

양선형 보간법은 선형 보간법을 2차원으로 확장시킨 기법이다. 값을 알고 있는 4개의 인접한 점들과 그에 따른 면적을 가중치로 하여 값을 구한다. 

### 보간법은 어떻게 활용될까

특정 이미지를 N배 만큼 확대하는 경우, 새로 만들어지는 이미지에는 원 이미지의 값을 그대로 받지 못하는 픽셀들이 존재하게 될 것이다. 따라서 (양선형) 보간법을 이용하여 원 이미지로부터 값을 받게 된 부분을 이용하여 비어있는 픽셀 값을 추정하게 된다. 

<img width="537" alt="스크린샷 2023-05-02 16 15 29" src="https://user-images.githubusercontent.com/67703882/235603219-b7fa6d27-c38a-4822-91d1-7973eb9c5e6c.png" style="zoom:67%;" >

## 참고 자료

- 숭실대학교 소프트웨어학부 4-1 [컴퓨터비전] 전공 수업 
- [Otsu 방법을 사용해서 이미지 이진화하기 (matlab 소스코드 포함)](https://bskyvision.com/entry/Otsu-방법을-사용해서-이미지-이진화하기-matlab-소스코드-포함)

- [OpenCV - 19. 모폴로지(Morphology) 연산 (침식, 팽창, 열림, 닫힘, 그레디언트, 탑햇, 블랙햇)](https://bkshin.tistory.com/entry/OpenCV-19-%EB%AA%A8%ED%8F%B4%EB%A1%9C%EC%A7%80Morphology-%EC%97%B0%EC%82%B0-%EC%B9%A8%EC%8B%9D-%ED%8C%BD%EC%B0%BD-%EC%97%B4%EB%A6%BC-%EB%8B%AB%ED%9E%98-%EA%B7%B8%EB%A0%88%EB%94%94%EC%96%B8%ED%8A%B8-%ED%83%91%ED%96%87-%EB%B8%94%EB%9E%99%ED%96%87#:~:text=%EC%B9%A8%EC%8B%9D%20%EC%97%B0%EC%82%B0%20%ED%9B%84%20%ED%8C%BD%EC%B0%BD%20%EC%97%B0%EC%82%B0,(closing)%20%EC%97%B0%EC%82%B0%EC%9D%B4%EB%9D%BC%EA%B3%A0%20%ED%95%A9%EB%8B%88%EB%8B%A4.)
- [선형 보간법과 삼차 보간법](https://bskyvision.com/789)
- [Morphology 연산](https://swkdn.tistory.com/entry/7-Morphology-%EC%97%B0%EC%82%B0)

- [Connected-component labeling](https://jstar0525.tistory.com/2)

- [영상 처리 Billinear interpolation(양선형 보간법) : 과정](https://m.blog.naver.com/dic1224/220841161411)
