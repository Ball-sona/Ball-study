# Dataset 사용법

#### html

```html
<div id="drum" data-code="Enter" data-key="81" />
<div id="clap" data-code="Backspace" />
<audio data-code="Enter" />
<audio data-code="Backspace" />
```

#### javascript

```javascript
window.addEventListener('keydown', (e) => {
  const sound = document.querySelector(`audio[data-key=${e.code}]`);
  const div = document.querySelector(`div[data-key=${e.code}]`);
  sound.play();
  div.classList.add('playing');

  console.log(sound.dataset); // DOMStringMap {code:'Enter', key:81}
});
```

#### css

```css
div[data-code='Enter'] {
  background-color: red;
}
```
