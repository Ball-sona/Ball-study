# Hash

해쉬에 대해 알아보자.

## Hash Table

- Hash table 이란 연관배열 구조(associative array)를 이용하여 키에 결과값을 저장하는 자료구조
  즉, 키(Key)와 값(Value)가 1:1로 연관되어 있는 구조.
- 키, 해시 함수, 해시, 값, 저장소
  - 키(Key): 고유한 값. 길이는 다양할 수 있다. 하지만 다양한 길이의 값을 그대로 최종 저장소에 저장하게 되면 다양한 길이 만큼의 저장소를 구성해두어야하기 때문에 해시 함수를 통해 특정 값으로 바꾸어 저장이 되어야 공간의 효율성을 추구할 수 있다.
  - 해시 함수(Hash function): 다양한 길이의 **키**를 일정한 길이의 **해시**로 바꾸는 역할. 저장소를 효율적으로 운영할 수 있게 해준다. 다만, 다른 키가 같은 해시가 되는 **해시 충돌**(Hash Collision)을 일으키는 확률을 줄이는 함수를 만드는 게 중요하다.
  - 해시(Hash): 저장소(bucket,slot)에서 값과 매칭되어 저장
  - 값(Value): 저장소에 최종적으로 저장되는 값. 키와 매칭

## Hash의 시간 복잡도

Hash의 시간 복잡도는 O(1)이다. 값을 저장하는 경우, 키를 가지고 해시 함수를 통해 만든 해시와 값을 저장소에 넣으면 끝이며, 삭제와 검색은 저장소에서 해당 Key를 찾기만 하면 되기 때문. (이때 해시 함수의 시간 복잡도는 고려하지 않는다.) 다만 해시 충돌을 해결하는 과정에서 최악의 경우 O(n)이 될 수도 있다.

## Hash 의 단점

평균적으로 Hash의 시간 복잡도가 O(1)이기 때문에 다른 자료 구조에 비해 효율성 측면에서 우수하지만, 단점 역시 존재한다.

1. 순서가 있는 배열에는 어울리지 않는다. (얘는 단점보다는 사용 목표?가 안맞는달까..)
2. 데이터가 저장되기 전에 저장 공간을 미리 확보해놔야한다.
3. 해시 함수에 대한 의존도가 높다.
4. 필연적으로 나타날 수 밖에 없는 문제는 **해시 충돌**이다.

## 해시 충돌(Hash Collision)?

key값은 무한히 가질 수 있는 반면, 저장소의 크기는 한정되어 있고 표현될 수 있는 hash 값의 개수는 유한하다. 때문에 서로 다른 2개 이상의 유한한 값이 동일한 출력 값(hash)를 가지게 될 수 있다.

## 해시 충돌은 어떻게 해결할건데?

(추후 수정)

## Hash In Python

1. `dictionary` 사용하기

```python
dict = {'One':1,'Two':2,'Three':3}
# Get
dict['One'] # 1
dict.get('Two',0) # get(key,x)는 key에 해당하는 값을 반환하되, 값이 없다면 x를 반환해주는 메서드
# Set
dict['Four'] = 4
# Delete
del dict['One'] # One이라는 키가 없다면 에러남
dict.pop('One',0) # 삭제한 값을 리턴('One'에 대한 값). 값 없다면 0을 반환
# Iterate
for key,value in dict.items():
  print(key,value)
# key 유무 확인
print('Four' in dict) # True
```

2. `hash()` 메서드
   직접 hash값 만들 수 있다. 정수는 사용 불가
3. `Counter` 클래스
   - data 개수를 셀 때 보통 dictionary를 사용하지만 `Counter`는 알아서 데이터 개수 세어준다.
   - `most_common(n)` : n개의 상위 요소(개수)를 출력
   - `elements()` : 카운트된 숫자만큼 요소를 list로 리턴
   - 카운터끼리 더하기, 빼기 연산 가능 -> value 값을 대상으로
   - 카운터끼리 교집합, 합집합 연산 가능 -> key 값을 기준으로
   - Counter.substract(Counter2)

```py
from collections import Counter
data = Counter('aabb') # Counter({'a':2,'b':2})
data.elements() # ['a','a','b','b']
list[data] # ['a','b']
```

#### 출처

https://velog.io/@cyranocoding/Hash-Hashing-Hash-Table%ED%95%B4%EC%8B%9C-%ED%95%B4%EC%8B%B1-%ED%95%B4%EC%8B%9C%ED%85%8C%EC%9D%B4%EB%B8%94-%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%9D%98-%EC%9D%B4%ED%95%B4-6ijyonph6o
https://yunaaaas.tistory.com/46
https://docs.python.org/3/library/collections.html#collections.Counter
https://dongdongfather.tistory.com/70