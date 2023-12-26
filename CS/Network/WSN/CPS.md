# CPS

- System in which the cyber world and physical world are tightly integrated at all scales and levels
- Integrates computation and communication capabilities with monitoring and control entities in the physical world
- 물리 세계에서 센서 등을 통해 특정 데이터 가져와서 데이터 저장 및 가공, 연산 후 결과를 물리세계에 반영하는 시스템

### Example

- 의료용 수술 로봇, Remote Robotic Surgery
- Air traffic control system, Authomatic pilot avionics 
- intelligent transportation system(ITSs)
- Smart Power grid

## Advanced CPS

- 일반 CPS는 자신이 가지고 있는 단독 센서의 데이터만 가지고 연산했다면, Advanced CPS에서는 외부 센서 데이터들도 함께 가져와 연산 -> many WSN!
- 저가부터 고가의 센서들이 구성된 네트워크 - USN
- 여러 레벨의 센서를 가져와 복합적으로 구성 
- 다양한 응용 전문가들이 협력해야함. (건설, 토목 등)

### Example

- 기상예측시스템
- 빅데이터 활용한 도시내수 침수 전조감지시스템

### Why Advanced CPS?

- Moore's Law (Device proliferation): 반도체 값이 저렴해지면서 가격 낮고 성능 좋은 센서들의 등장
- Integration at Scale: 센서들이 독립적으로 동작이 아니라. 빅데이터 시스템 이용해서 이런 센서 데이터들을 복합적으로 사용 가능. 비용이 줄어.
- Biological Evolution: 인간이 이 많은 데이터를 처리하기엔 속도가 느려.

> IoT 와 Advanced CPS는 거의 같은 의미이다.

## USN, WSN

- USN: Advanced CPS의 데이터 수집 부분, 모든 센서들의 네트워크
- WSN: USN 중 **저가 소형 센서로 구성**된 네트워크

## 정리 

CPS는 물리 세계와 사이버 세계를 연결하는 시스템이다. **CCTV, 사람들의 스마트폰 데이터, 저가 소형 센서들로 구성되어 있는 WSN 등 다양한 센서들로 구성된 USN** 을 통해서 물리 세계의 데이터를 수집하고, 이렇게 수집한 빅데이터를 가지고 cloud computing 해서 특정 결과를 도출해낸다. 이렇게 도출한 결과는 물리 세계에서 참고되는 데이터로 사용되거나 actuator를 통해 실제 어떤 행위를 하기도 한다.







