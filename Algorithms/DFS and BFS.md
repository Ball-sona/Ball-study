# DFS/BFS

DFS와 BFS 알고리즘을 살펴보자.

## 그래프

그래프는 노드(node)와 간선(edge)으로 표현되며, 이때 노드를 정점(vertex)라고도 말한다. **그래프 탐색**이란 하나의 노드를 시작으로 다수의 노드를 탐색하는 것을 말하고, 두 노드가 간선으로 연결되어 있다면 이를 '두 노드가 **인접(Adjacent)하다**' 라고 말한다. 

그래프를 코드로 표현하는 방식은 크게 2가지가 있을 수 있다.

1. 인접 행렬(Adjacency Matrix) : 2차원 배열로 그래프의 연결 관계를 표현한다.
2. 인접 리스트(Adjacency List) : 리스트로 그래프의 연결 관계를 표현한다.

<img width="198" alt="스크린샷 2023-03-14 22 46 49" src="https://user-images.githubusercontent.com/67703882/225021219-8a7f6a06-76d4-44de-a7a5-7d0b2cee33a3.png">

다음과 같은 그래프가 있다고 할때 이를 각각의 방식으로 표현하면 다음과 같다.

```js
// 1. 인접 행렬
const graph = [[0,7,5],[7,0,INF],[5,INF,0]];

// 2. 인접 리스트
const graph = [[{1:7,2:5}], [{0:7}],[{0:5}]];
```

두 방식을 메모리와 속도 측면에서 비교해보자. 인접 행렬 방식은 모든 관계를 저장하므로 노드의 개수가 많을수록 메모리가 불필요하게 낭비된다. 반면 인접 리스트 방식은 연결된 정보만을 저장하기 때문에 메모리를 효율적으로 사용한다. 하지만 이는 인접 행렬 방식에 비해 특정한 두 노드가 연결되어 있는지에 대한 정보를 얻는 속도가 느리다는 단점이 있다. 

## DFS(Dept-First Search)

DFS는 그래프에서 깊이 부분을 우선적으로 탐색하는 알고리즘이다. 이는 특정한 경로로 탐색하다가 특정한 상황에서 최대한 깊숙이 들어가서 노드를 방문한 후, 다시 돌아가 다른 경로로 탐색하는 알고리즘이다. 

DFS는 스택 자료구조에 기초하기에 구현이 간단하지만, 실제로 스택을 사용하여 구현하지는 않아도 된다. 탐색을 수행함에 있어서 데이터 개수가 N개인 경우, O(N)의 시간이 소요된다.

**재귀함수**를 이용하여 DFS를 구현해보면 다음과 같다.

```js
function dfs(graph, v, visited) {
  visited[v] = true; // 방문 완료
  console.log(v);
  graph[v].forEach((node) => {
    // 현재 노드와 인접된 노드 중 아직 방문하지 않은 노드를 인자로 넣고 dfs 함수 호출
    if (!visited[node]) {
      dfs(graph, node, visited);
    }
  });
}
```

## BFS(Breadth-First Search)

BFS는 가까운 노드부터 탐색하는 알고리즘이다. DFS가 최대한 멀리 있는 노드를 우선으로 탐색하는 방식으로 동작하는 것과 달리, BFS는 그 반대로 동작한다. 

BFS는 **큐 자료구조**를 이용하여 구현하는 것이 정석이다. 인접한 노드를 반복적으로 큐에 넣도록 알고리즘을 작성하면 자연스럽게 먼저 들어온 것이 먼저 나가게 되어 가까운 노드부터 탐색을 진행하게 된다. 일반적인 경우 실제 수행 시간이 DFS 보다 좋은 편이다. 

큐를 이용해 BFS를 구현해보면 다음과 같다. (단, Javascript에서 큐를 구현하는 것은 꽤나 제약이 있으므로 이를 고려해야한다.)

```js
let Queue = [];

function bfs(graph, v, visited) {
  visited[v] = true;
  Queue.push(v);
  
  while (Queue.length) { // Queue에 더이상 노드가 추가되지 않을때.
    let out = Queue[0];
    res.push(out);
    graph[out].forEach((node) => {
      if (!visited[node]) {
        Queue.push(node);
        visited[node] = true; // 방문 완료
      }
    });
    Queue.shift();
    v++;
  }
}
```

## DFS vs BFS

<img width="502" alt="스크린샷 2023-03-15 00 43 15" src="https://user-images.githubusercontent.com/67703882/225056347-08b577ec-77f8-46d4-981a-4e149953f397.png">

### BFS를 언제, 왜 사용하는가?

- BFS는 루트 노드에서 시작해 가까운 노드부터 탐색한다.
- Queue를 사용하여 구현하고, 탐색속도가 DFS보다 빠르다.
- 주로 **최단거리**나, node간 거리가 같을 때 경로 구하는 케이스에서 사용한다.

### DFS는 언제, 왜 사용하는가?

- DFS는 해당 분기(branch)를 완벽하게 탐색(최대한 깊이 탐색)한 후 다음 branch로 넘어간다.
- Stack, 재귀함수를 사용한다.
- 각 경로마다 특징이 있을 경우(ex. node간 거리가 다른 경우) 사용한다.



알고리즘 풀어서 올리기

Gdsc-web 무조건 코드리뷰!!

REACT 공식문서 공부

---

컴포넌트 개발

리액트 공부