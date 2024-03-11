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

## Combination

- 배열에서 n개의 요소를 뽑아 '조합' 생성
- 순서 고려하지 않음!

```py
from itertools import combination

arr = ['A', 'B', 'C']
comb = combination(arr, 2)
print(list(comb)) # [('A', 'B'), ('A', 'C'), ('B', 'C')]
```

