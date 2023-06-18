# Otsu's segmentation algorithm

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

## 참고 자료

- 숭실대학교 소프트웨어학부 4-1 [컴퓨터비전] 전공 수업 

- [Otsu 방법을 사용해서 이미지 이진화하기 (matlab 소스코드 포함)](https://bskyvision.com/entry/Otsu-방법을-사용해서-이미지-이진화하기-matlab-소스코드-포함)

  
