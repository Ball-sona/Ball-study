# Connected Component Labeling(CCL)

Connected Component Labeling(Region Labeling) 에 대해 알아보자.

# Connected Component Labeling이란?

- 연결 영역 레이블이란, 좌표들 중 연결되어 있는 지역에 동일한 라벨을 할당하며, 결과적으로 binary image를 symbolic image로 변환하는 기법이다.
- 연결 영역에 라벨링을 하는 것은 패턴 분석 및 인지, 컴퓨터 및 로봇 비전, 머신러닝 등에 있어서 가장 기초적인 연산이다. 이는 거의 모든 이미지 기반 애플리케이션(지문 인식, 얼굴 인식 등) 에 요구된다고 할 수 있다.

- 4가지 접근 방식
  1. Recursively labeling method(Grass-fire)
  2. Contour-tracing-based method(boundary tracing)
  3. Raster-scan-based method(two-scan)
  4. Run-based method(Label-equivalence-resolving)

## Recursively labeling method(Grass-fire Algorithm)

## Contour tracing based method

## Raster scan based method

## Label equivalence resolving