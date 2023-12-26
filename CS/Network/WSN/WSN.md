# WSN

wireless sensor network

## Sensor Node Hardware

- hardware device that enable wireless sensor network research
- 보통 작고 저렴한 센서 (ex. Mote)

### 구성 요소
![](https://i.imgur.com/TzrFdKy.png)

- Microcontroller: CPU+RAM
- Sensors: 데이터 수집
- Radio: 이웃 노드에게 데이터 전송 
- Power supply: 배터리
- Peripherals: USB interface, Storage 

> 데이터 전송에 소모되는 에너지는 전송 거리의 2~4배. 
>

### 주요 특성 

- Small 
- **Low Power** 
- Low bit rate: 수십 kbps -> **802.15.4 (ex. zigbee)**
- High density -> 기기 자체가 작아서
- Lost cost(dispensable)
- Autonomous: 내가 탐색할 수 있는 범위 내에서 이웃 노드 정보를 저장한 후 네트워크를 알아서 구성해야 함(Ad-hoc)
- Adaptive: 보유한 에너지에 따라 센싱 범위나 전송 노드와의 거리 등을 조절해야 한다. 즉 energy adaptive

### Example

- MICAZ Mote: 8MHz. 128KB RAM. 512KB Flash. $125 미만. 14mW 미만
- TelosB 
- Dust 
- Stargate, IRIS

## Wireless Senspr Network(WSN)

- **Ad-hoc network** consisting of spatially **distributed, autonomous, and low-cost sensors**, to monitor physical or environmet
- 저가 센서 노드들이 배포되는 시점에 자율적으로 이웃 노드들과 네트워크를 구성하는 Ad-hoc 네트워크를 의미한다.
- 각 노드들은 이웃 노드들을 거쳐서 싱크 노드에 센싱한 데이터를 전달하고, 싱크 노드는 수집한 데이터를 gateway에 전달한다. 그래서 싱크 노드는 비교적 에너지 많이 소모.

> 성능 좋은데 비싼 센서 1개 뿌리기 vs 성능 구린데 저렴한 센서 여러개 뿌리기
>
> -> 네트워크의 정확도를 정확히 예측하는 것은 어렵지만, 센서가 여러개면 네트워크 범위가 넓어지므로 그 부분에서는 유리할 것. 또 아무리 비싼 센서여도 데이터 전송할 만큼의 거리가 되지 않으면 결국 데이터 못받음. 

## WSN을 쓰는 이유

- Extended range of sensing: 넓은 범위를 센싱 가능하다.
- Redundancy: 하나의 센서가 죽어도 다른 센서들 동작에 영향 적다.
- Improved accuracy: 넓은 범위를 센싱할 수 있기 때문에 데이터 정확도를 높일 수 있다.

## WSN Application
![](https://i.imgur.com/7Lc97Qd.png)


- Military, environmental monitoring, health monitoring, 농작물 관리, 건설물 부식 센서를 통한 안전 관리, 헬스 케어(USN)
- 각 센서들은 각 응용들에 독립적으로 사용되는 게 아니라. 빅데이터로서 모아져서 복합적으로 모든 응용에 적용된다.

> 헬스 케어 분야의 경우, 각 센서가 1-hop으로 데이터가 보내질 수 있기 때문에, 주로 multi-hop 센서를 다루는 WSN이랑은 거리가 멀수도.

### Military

- <u>랜덤하게 설치</u>된 음향 센서(PinPtr)를 통해 총소리 방향을 분석해서 스나이퍼의 위치를 판단
- 기지 근처에 압력 센서, 화생방 센서 등을 설치해서 적군의 침입 공격 감지 및 대응

### Environment

- 생태계 파악, 농작물 관리, 동물들의 움직임 추적 등
- <u>GPS와 온도 감지 센서</u>를 통해 어디서 화재가 발생했는지 파악 후 산불 대응 + 화재 발생 이후에도 재사용하기 위해 불이 나도 손상되지 않는 센서들로 구성하기도 함
- 땅 속에 묻어놓은 센서들로 산사태 감지 -> 땅 속에 묻는 센서들은 거리도 잘 안나가고 에러도 많이 나니 Link Layer에서 Error control 잘 해주어야 한다. 

### Disaster

- 구조대원 작업복에 센서를 부착하여 위치, 건강 상태 등 추적 
- 선박 오일 탱크에 센서를 부착하여 유출 사고 방지 

## WSN with mobile sink vs Mobile WSN 

- WSN with mobile sink: 센서 노드들은 고정되어 있고, 센서 노드들의 데이터를 취합하는 싱크 노드가 이동하는 형태의 네트워크
- Mobile WSN (Mobile Ad-hoc network): 센서 노드들이 이동하는 네트워크

## WSN Challenge

- 센서들이 데이터를 멀리 보내는 동시에. 에너지 소모를 최대한 줄일 수 있도록. 네트워크의 모든 계층에서 절약해야 한다. ![](https://i.imgur.com/0FUm5aD.png)

- Energy, 성능 등 모든 조건들은 **Trade off**이다. 그래서 모든 결정은 이를 적용하는 Application에 따라 결정되어야 한다. 

