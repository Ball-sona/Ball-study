# 최소 공배수, 최소 공약수

## 최소 공약수 (GCD: Greatest Common Divisor)

```js
function gcd(a,b) {
	if(b == 0) return a;
	else return gcb(b, a%b)
}
```

## 최소 공배수 (LCM: Least Common Multiple)

```js
function lcm(a,b) {
  return (a*b) / gcb(a,b)
}
```