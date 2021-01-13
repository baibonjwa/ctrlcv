---
title: Web worker
categories:
  - JavaScript
---

## Web worker

### Client

```js
var worker = new Worker('worker.js')

worker.onmessage = function (message) {
  alert(JSON.stringify(message.data))
})

worker.postMessage('hello!')
```

### Worker

```js
self.onmessage = function (message) {
  ···
}

self.postMessage({ msg: 'hello' })
```

### Message data

#### [MessageEvent]

```js
bubbles: false
cancelBubble: false
cancelable: false
clipboardData: undefined
currentTarget: Worker
data: "Hello"             ← the data
defaultPrevented: false
eventPhase: 0
lastEventId: ""
origin: ""
ports: Array[0]
returnValue: true
source: null
srcElement: Worker
target: Worker
timeStamp: 1344821022383
type: "message"
```
