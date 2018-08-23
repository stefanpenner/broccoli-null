# broccoli-null [![Build Status](https://travis-ci.org/stefanpenner/broccoli-null.svg?branch=master)](https://travis-ci.org/stefanpenner/broccoli-null)

Sometimes (but rarely), one wants to return a broccoli tree which does nothing.
Rather then relying on private API, this plugins achieves this with public API.

It also ensures all NULL trees are the same;

```js
yarn add broccoli-null
```

```js
const Null = require('broccoli-null');
const funnel = require('broccoli-funnel');
const merge = require('broccoli-merge-trees');

merge([
  funnel(__dirname + '/some/folder'),
  Null.NULL,
  new Null()
]);
```


```js
Null.NULL === new Null() // => true
```
