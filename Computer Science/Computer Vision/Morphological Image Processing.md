# Morphological Image Processing

Morphology Filtering은 영상에서 객체의 형태를 변경하거나 객체 주변의 불필요한 잡음을 제거하는데 사용되는 기법이다. 모폴로지 필터링에는 Erosion, Dilatation, Opening, Closing 연산 등이 있다.

## Erosion(침식)

침식 연산은 이미지를 깎아 내는 연산이다. 침식 연산을 위해서는 구조화된 요소 커널(structuring element kernel)이라는 0과 1로 구성된 커널이 필요하다. 이는 1이 채워진 모양에 따라 사각형, 타원형, 십자형 등으로 사용할 수 있다.

![image](https://user-images.githubusercontent.com/67703882/235476041-f9b53ba7-c5f7-4847-9ec0-8b95f5bade2f.png)

십자형 구조화 요소 커널인 B를 A 이미지의 파란 부분(1)을 한 칸씩 훑는다. 이때 구조화 요소 커널이 A 이미지의 하늘색 부분과 완전히 겹치지 않을 때는 0로 변경하고, 겹칠때는 1로 그대로 둔다. 오른쪽 이미지를 보면 이러한 연산을 통해 원본보다 조금 깎인 것을 볼 수 있다.

침식 연산은 큰 물체의 주변을 깎는 기능을 한다. 또 작은 물체는 아예 제거하므로 노이즈 제거 효과도 있고, 원래 떨어져 있는 물체인데 겹쳐 있는 것을 떼어내는 데에도 효과적이다.

## Dilation(팽창)

팽창 연산은 침식과 반대로 물체의 주변을 확장하는 연산이다. 

![image](https://user-images.githubusercontent.com/67703882/235477007-7c81d42e-2cf3-48ab-8f19-a41e88fe033b.png)

침식 연산와 달리, 팽창 연산에서는 입력 영상에서 1로 채워진 영역과 완전히 겹치지 않으면 1로 변경한다. 

> Erosion 연산은 작은 값은 크게, 큰 값은 작게하여 전체적으로 평평하게 만드는 연산이라면, Dilation 연산은 큰 값은 더 크게, 작은 값은 더 작게 하여 픽셀 값 간의 차이를 극대화시키는 연산이라고 할 수 있다.

## Opening(열림)

열림 연산은 **침식 연산 후 팽창 연산을 적용하는 것**을 말한다. 

![image](https://user-images.githubusercontent.com/67703882/235480065-403f5b8f-b885-4c21-8718-8fdf8cf8c751.png)

- 주변보다 밝은 노이즈를 제거하는 데 효과적이고, 객체의 윤곽을 부드럽게 만드는데 사용된다.
- 맞닿아 있는 것처럼 보이는 독립된 객체를 분리하거나 돌출된 모양을 제거하는 데 효과적이다.

## Closing(닫힘)

닫힘 연산은 **팽창 연산 후 침식 연산을 적용하는 것**을 말한다.

![image](https://user-images.githubusercontent.com/67703882/235480233-f423addc-7b36-4cd5-9cb4-428262e1d029.png)

- 주변보다 어두운 노이즈를 제거하는 데 효과적이다.
- 끊어져 보이는 개체를 연결(객체의 모양 복원)하거나 구멍을 메우는데 효과적이다.

## 연산 예시

다음은 erosion, dilation, opening, closing 연산에 대한 예시이다.

![스크린샷 2023-05-03 00 26 40](https://user-images.githubusercontent.com/67703882/235712378-8084b3f9-e65f-47e4-a49f-359cd89656b8.png)

## Boundary Extraction 

위에서 알아본 연산들을 통해 특정 이미지의 경계를 추출하는 방법을 알아보자. 경계 추출 수식은 다음과 같다.

![스크린샷 2023-05-03 00 29 44](https://user-images.githubusercontent.com/67703882/235713176-3d5d6dc1-7bc0-46b9-b915-6f5cd2efc0d2.png)

위 수식에서 A는 원본 이미지이고, B는 구조화 요소(structuring element) 이다. 먼저 B를 이용하여 A에 대한 침식(erosion) 연산을 진행한다. 이후 원본 이미지에서 침식 연산 결과를 제외시켜주면 이미지의 경계값만 남게 된다.

## Gray-Scale Morphology

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

## 참고 자료

- [[Tutorial] Morphology](https://medipixel.github.io/post/2020-06-30-morphology/)

- [Morphology 연산](https://swkdn.tistory.com/entry/7-Morphology-%EC%97%B0%EC%82%B0)

- [OpenCV - 19. 모폴로지(Morphology) 연산 (침식, 팽창, 열림, 닫힘, 그레디언트, 탑햇, 블랙햇)](https://bkshin.tistory.com/entry/OpenCV-19-%EB%AA%A8%ED%8F%B4%EB%A1%9C%EC%A7%80Morphology-%EC%97%B0%EC%82%B0-%EC%B9%A8%EC%8B%9D-%ED%8C%BD%EC%B0%BD-%EC%97%B4%EB%A6%BC-%EB%8B%AB%ED%9E%98-%EA%B7%B8%EB%A0%88%EB%94%94%EC%96%B8%ED%8A%B8-%ED%83%91%ED%96%87-%EB%B8%94%EB%9E%99%ED%96%87#:~:text=%EC%B9%A8%EC%8B%9D%20%EC%97%B0%EC%82%B0%20%ED%9B%84%20%ED%8C%BD%EC%B0%BD%20%EC%97%B0%EC%82%B0,(closing)%20%EC%97%B0%EC%82%B0%EC%9D%B4%EB%9D%BC%EA%B3%A0%20%ED%95%A9%EB%8B%88%EB%8B%A4.)
