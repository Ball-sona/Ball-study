# WSN Routing

- `flat-based`: 노드가 sensing 과 routing 역할을 동시에 한다.
- `hierachical-based`: 센싱 담당 노드와 라우팅 담당 노드가 따로 나누어져 있음. 센서 노드가 헤더 노드(라우팅) 에 데이터를 보내고, 헤드 노드가 통신하다가 싱크에 데이터 전송
  - 헤더 노드의 할일이 많으니 에너지 소모가 커.
  - 에너지 용량이 제일 큰 노드에게 헤더를 맞기거나, Round robin 방식으로 노드들이 번갈아가면서 헤더를 담당해.
- `location-based`: 각각의 노드들은 GPS 를 통해 위치 정보를 가지고 있고, 이를 다른 노드들이랑 공유 -> 주변 노드의 위치를 알고 있기 때문에 가까운 노드에 라우팅할 확률이 높아져.

## Flat-based

- flooding: 여러 노드가 싱크 노드에 같은 패킷을 보낸다.
- gossiping: 랜덤하게 하나 선택해서 하나의 노드에게만 패킷 전달. flooding 보다는 속도랑 안전성 낮아. 에너지 효율은 높음.
- minimum latency forwarding algorithm: 받은 패킷 중에 가장 빨리 도착한 패킷을 보낸 노드의 정보를 기억하고. 그 노드에게 ack를 보내.
  - 경로가 정해짐
- energy-aware forwarding algorithm

## Hierarchical-based

- 클러스터 헤더랑 멤버가 한 hop(cluster)에 속해있을 수 있지만, 너무 먼 애들은 다른 노드를 통해서 헤더에게 데이터 보내
- 클러스터 헤더는 멤버에 비해 통신이 많아서 에너지 소비가 많음 -> 주기적으로 다른 노드에게 넘겨야함

- stepup
  - advertisement: 헤더는 다른 클러스터에게 자신이 노드라고 알려야해. 받은 애들은 이 메세지들을 전파(flooding)
  - cluster setup: 멤버 입장에서는 나한테 가장 메세지 빨리 보낸 헤더가 나의 헤더가 됨.
  - schedule creation: 헤더는 멤버들에게 데이터 전송할 수 있는 시간을 할당해줘
- steady state

  - 멤버는 자기에게 할당된 시간에 헤더에 센싱 데이터 전송
  - 헤더는 받은 데이터들 모아서 싱크에 전송

- 헤더는 계속 active 상태
- 멤버는 할당된 시간과 setup 단계에서만 active

- LEACH
- PEGASIS: 에너지 효율 높이기 위해 헤더에게 바로 안보내고 다른 노드 통해서 보내는 경로를 더 우선시 ->왜?

## Location-based

- geographical
- MECN: 내 주변 위치만 아는 것이기 때문에, global optimazation을 할 수는 없어. -> 내가 싱크 노드로 가는 최적화된 경로는 모르기 때문에.
  - local optimzation만 보장 가능 -> 이게 근데 global 최적화를 보장할 순 없어. greedy 생각.
  - feasible area 방향: 싱크 노드쪽으로 가는 방향 -> 적어도 여기로 가야 유리하겠구나.

### 거리 고려한 방법

![](https://i.imgur.com/FVURte3.png)

A를 어디로 보내야 유리할까?

- forward within radius metric: A랑 싱크를 연결한 선을 기준으로 가장 앞으로 전진한 노드로 보내버리기 -> node M
- nearest forward progress metric: 에너지 아끼기 위해 가장 가까운 노드 보내기 -> node N
  - 노드 에너지를 고려해서 보내기도 함.
- greedy routing scheme: 싱크랑 가장 가까운 노드로 보내기 -> node G
- compass metric: A와 싱크를 연결한 직선 경로와 가장 가까운 노드로 보내기 -> node C

- Best Reception neigbor forwarding: 수신률 가장 높은 노드를 선택. 보통 가장 가까운 노드임

  - 채널 상태가 어느정도 괜찮은 애들 중에서 거리가 가장 긴 애를 선택
  - best PRR x distacne

- topology knowledge 의 tradeoff: 정보를 많이 알면 알수록 좋기는 한데, 그럼 소모 에너지가 늘어나는 tradeoff가 존재. 따라서 주변 노드의 정보들만 저장하는 방식으로...
