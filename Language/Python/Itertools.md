# itertools

## Permutation

- 배열에서 n개의 요소를 뽑아 '순열' 생성
- 순서 고려!

```py
from itertools import permutations

arr = ['A', 'B', 'C']
pers = permutations(arr, 2)
print(list(pers)) # [('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]
```

### 직접 구현하기

```python
def permutation(arr, c):
  arr = sorted(arr)
  used = [0 for _ in range(len(arr))]
  res = []

  def generate(chosen, used):
    if len(chosen) == c:
    	res.append(chosen)
      return

    for i in range(len(arr)):
      if not used[i]:
        chosen.append(arr[i])
        used[i] = 1
        generate(chosen, used)
        used[i] = 0
        chosen.pop()
  generate([], used)
```

## Combination

- 배열에서 n개의 요소를 뽑아 '조합' 생성
- 순서 고려하지 않음!

```py
from itertools import combination

arr = ['A', 'B', 'C']
comb = combination(arr, 2)
print(list(comb)) # [('A', 'B'), ('A', 'C'), ('B', 'C')]
```

### 직접 구현하기

```py
def combination(arr, c):
  arr = sorted(arr)
  res = []

  def generate(chosen):
    if len(chosen) == c:
    	res.append(chosen)
      return

    s = arr.index(chosen[-1])+1 if chosen else 0 # 순열이므로, 들어있는 숫자보다 큰 것만 넣기.
    for i in range(s, len(arr)):
      chosen.append(arr[i])
      generate(chosen)
      chosen.pop()

  generate([])
```
