---
title: JavaScript 语音合成
categories:
  - JavaScript
contributors:
  - BAI
---

### SpeechSynthesisUtterance

实验属性，不兼容 IE 所有版本

```js
function speak(message) {
  var msg = new SpeechSynthesisUtterance(message);
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[0];
  window.speechSynthesis.speak(msg);
}
```

```js
speak("Hello, world");
```

详见: [SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance) _(developer.mozilla.org)_
