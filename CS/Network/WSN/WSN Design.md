# WSN Design

WSN을 설계할 때 고려해야 할 요소들을 살펴보자.

1. Hareware Constraints
2. Fault Toloerance
3. Scalability
4. Production Costs
5. Sensor Network Topology
6. Operating Environment
7. Transmission Media
8. Power Consumption

## Hardware Constraints

![](https://i.imgur.com/iU7CsOS.png)

WSN 센서 하드웨어는 대부분 소형이고, 적은 에너지 용량과 짧은 전송 범위 등 여러 제약을 가지고 있다. 이러한 특성을 고려해서 라우팅 알고리즘 및 네트워크 토폴로지를 설계할 필요가 있다.

## Fault Tolerance(Reliability)

- WSN 센서들은 적은 에너지 용량, 열악한 환경으로 인한 물리 손상 등 여러 요인으로 인해 정상적으로 동작하지 않을 확률이 높다.
- 일부 센서가 동작하지 않을 때에도 <u>전체 네트워크는 안정적으로 동작할 수 있는지</u>를 의미한다.

> 어떤 센서 노드가 산불을 감지했는데도 제대로 동작하고 있는 이웃 노드가 하나도 없어서 싱크 노드로 데이터를 보내지 못한다고 해보자. 이는 안정성이 매우 낮은 심각한 네트워크이다.

### 시간과 노드 안정성의 관계

<img src="https://i.imgur.com/QtqciwA.png" style="zoom:67%;" />

(0,t) 사이의 시간 동안 부터 t시간 까지의 시간 동안, 노드 k가 정상적으로 동작하지 않을 확률을 lamda라고 하자. 이때 위 식을 보면 t 값이 커질수록 음수 제곱을 하게 되면서 R 값이 작아지게 된다. 즉 시간이 지날수록 특정 노드의 안정성이 줄어드는 것을 의미한다.

### 시간과 네트워크 안정성의 관계

<img src="https://i.imgur.com/KSxsmJJ.png" style="zoom:67%;" />

노드 k의 이웃 노드의 개수가 N개라고 하자. 해당 노드의 입장에서 누구에게도 데이터를 전송하지 못할 확률은 각 이웃 노드들이 동작하지 않을 확률을 모두 곱한 값이다. 결론적으로 <u>특정 노드 입장에서의 네트워크 안정성은 1에서 '주변 노드가 죽어있을 확률을 모두 곱한 값'을 뺀 값</u>이다.

> 만약 이웃 노드가 2개가 있고 99%의 안정성을 요구하고 있다면, 각 이웃 노드가 죽어 있을 확률은 0.1이어야 한다. 반면 이웃 노드들의 죽어 있을 확률이 모두 0.9라면? 노드를 2개만 둔다면 네트워크의 안정성은 19% (= 1-0.9\*0.9) 밖에 안된다. 그러므로 만약 안정성을 높이고 싶다면 0.9인 이웃 노드의 개수가 엄청나게 늘어나야 한다.

### 결론

- WSN을 응용하는 각 상황에서 요구하는 Fault Tolerance(Reliability)는 정해져있다. 예를 들어 군대에서 WSN을 활용하는 상황이라면 센서 데이터가 반드시 싱크 노드로 데이터가 보내져야 하니 Reliability는 매우 높아야 하지만, 가정집에서 활용하는 상황이라면 군대에 비해서는 낮아도 된다.
- Reliability는 <u>각 노드가 정상적으로 동작할 확률과 이웃 노드의 개수 등에 의해 결정</u>된다. 각 노드의 안정성이 높다면 노드 개수가 적어도 될 것이고, 각 노드의 안정성이 낮다면 노드 개수가 아주 많아야 할 것이다.
- 만약 통신에 방해를 주는 장애물이 많은 환경이라면 안정성을 위해서는 노드가 더 필요할 것이다 (ex. house vs battlefield)
- 결론적으로 각 응용에서 요구하는 안정성을 갖추기 위해 노드의 개수, 라우팅 알고리즘 등을 결정하는 것이 중요하다.

## Scalability

- 노드 개수가 너무 많아지면 안정성 측면에서는 좋아질 수 있겠으나, 각 노드들의 데이터 전송 지연 시간이 길어진다.

> 무선 통신들은 공기라는 매체로 데이터를 전송하기 때문에 한번에 하나의 노드만 전송할 수 있다. 따라서 특정 노드가 데이터를 전송하고 있다면 다른 노드들은 대기하고 있어야 한다. 만약 노드 개수가 많다면 이러한 대기 시간이 더 길어질 것이다.

- Realibility와 마찬가지로, 각 응용에서 요구하는 센서 개수가 정해져 있다.
- 노드들의 밀도가 높아져도 잘 작동할 수 있게끔 MAC 프로토콜을 설계해야 한다.

## Production Costs

- 센서 네트워크에 요구되는 비용이 최대한 줄여야 한다.
- 한번 센서를 뿌리면 동작 안할 확률이 높아서 잃는 비용이 많기 때문..

## Sensor Network Topology

- 싱크 노드로 데이터를 보내는 노드들을 관리하는 방법을 network topology
  - flat: 노드가 다 싱크 노드로 데이터 전송
  - cluster: 노드 개수가 많으면 특정 노드끼리 클러스터로 묶어서 head에게 데이터 보내고, head가 싱크 노드로 데이터 전송
- 노드 개수에 따라 topology 구성을 다르게 해야 한다.
- 배포 방법에 따라 topology 유동적으로 바뀔 수가 있다.
  - random or regular
  - mobile sensor nodes -> 센서 노드들이 움직이는 경우
- position, reachability, available energy, malfunctioning 등에 의해 계속 바꿔주어야 한다.
  - reachability: 이웃 노드가 하나도 없어서 추가로 센서를 배치해야 하는 경우

## Operating Environment

네트워크가 운영되는 환경을 고려해야 한다. (Application)

## Transmission media

- radio(공기), infrared, optical, acoustic(물 속), magnetic media 등이 통신 매체가 될 수 있다.
- 각 매체에는 특성이 있고, 그 특성에 맞게 노드들을 잘 배치해야 한다. 예를 들어 데이터를 멀리 보내지 못하는 매체인 경우 노드들의 간격을 짧게 배치해야 한다.

## Power Consumption(Lifetime)

- 센서 노드들은 대부분 limited power source를 가지고 있고, 각 노드들이 에너지를 모두 소모해서 죽기 시작하면 전체 네트워크가 죽는 시점이 빨라진다.
- 따라서 WSN에서 최대한 노드들의 에너지를 절약하고, 또 모든 센서 노드의 에너지를 골고루 사용하는 것이 중요하다.

[WSN Power Consumption.md](WSN Power Consumption.md)
