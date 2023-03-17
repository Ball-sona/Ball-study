# module.exports vs export default

export const A = 'A'

export default A

At first glance, you might think that `A` has been exported twice, so you might want to remove one of these exports.

But it wasn’t exported twice. In the ES6 module world, this rigs it up so you can both do `import A from './a'` and get the default export bound to `A`, or do `import { A } from './a'` and get the named export bound to `A`.

```js
// a.js
export const A = 'a';
export default A;
```

위같은 코드가 있을 때, 과연 A는 두번 export가 되는 것일까?

그렇지 않다. ES module은 이를 잘 조작한 후 우리가 `import A from './a'` 이나 `import { A } from './a'` 를 



https://bignerdranch.com/blog/default-exports-or-named-exports-why-not-both/