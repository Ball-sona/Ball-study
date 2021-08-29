### em, rem
em : 부모 요소의 크기와 비례
rem : 최상위 요소(html)의 크기에 비례
```html
<head>
 <style>
      html { font-size: 16px; }
      body { font-size: 1.5em; }
      .a { font-size: 2.0rem; }
 </style>
</head>
<body>
  <p class="a">Lorem Ipsum Dolor</p>
</body>
```
- body의 폰트크기 16*1.5px
- a의 폰트크기 16*2.0px
