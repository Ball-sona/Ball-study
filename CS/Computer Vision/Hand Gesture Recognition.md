# Hand Gesture Recognition(Hand GR)

Hand GR은 10종류의 손 모양 이미지를 인식시켜 자동으로 분류할 수 있는 시스템을 만드는 프로젝트(과정)이다.

## Main Approach

Hand GR에서 주요하게 사용되는 접근법이다.

1. Gloved-based Technique

   - 손과 손가락의 position을 실시간으로 감지할 수 있는 센서를 이용한다.

2. Vision-based Technique
   - 2D Approach : 모델이 단순하여 실시간 처리 가능. 복잡하고 동적인 제스처 사용 불가. **well-fined 정적 제스처** 사용
   - 3D Approach : 모델이 매우 복잡하여 계산 시간 매우 소요

## 절차 및 방법

1. Image Acquisition : 회색 혹은 색상 영상 획득
2. Segmentation : 논리 단순화. 배경과 전경 분리
3. Filtering : Morphological operator (배경과 노이즈 제거)
4. Labelling : 인식 대상 영역 선택
5. Contour : 특징 추출
6. Linear alignment & Nonlinear alignment : 분류(인식). DTW/SDTW

## 관련 및 사용 기법들

1. Binarization(Segmentation)

   - 영상의 배경에서 가능한 **정확하게 손모양을 추출**해내는 것이 목표다.
   - Otsu's segmentation algorithm을 이용해 구현해낸다.

2. Otsu's segmentation algorithm

   - discriminant analysis(구분력 분석)에 근거하여 하나의 임계 명암값을 선택한다. 해당 임계값 T를 이용해 2개의 클래스로 분할한다. 하나의 클래스는 0, 즉 배경값으로 판별되고 다른 클래스는 1, 즉 대상값(손)으로 판별된다.
   - 이 알고리즘은 클래스를 명확하게 구분할 수 있는 **최적의 임계값 T를 구하는 것**이 목표다.
   - 전체 분산에서 between-class 분산의 비율을 최대화시키는 T를 구하는 방식으로 이루어진다.

3. Morphological Filtering

   - Erosion(침식)와 Dilation(팽창) 연산을 이용해 객체를 좀 더 부드럽고 완성도 있게 만들 수 있다.

4. Labeling

   - 그냥 최대 영역을 선택하자?

5. Contour Representation(Boundary-based object representation)

   - Global representation
   - Local representation

6. Segmentation of Arcs and Segmentation

7. Localized Contour Sequence(LCS)
