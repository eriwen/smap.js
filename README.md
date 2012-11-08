# smap.js - A forward polyfill for ES6 Maps
Given a browser with ES6 Map partially implemented
(or one polyfilled with [es6-collections](https://github.com/WebReflection/es6-collections) et al), smap.js adds
utility methods to Map.prototype like these:

```js
var map = new Map();
map.set('foo', 'bar');
map.set(0, 42);

// Filter map by a function
map.filter(function(key, value) {
   return typeof key == 'string';
});
=> new Map([[0, 42]])

// Merge Maps
map.merge(new Map([['baz', 'thing']]));
=> new Map([[0, 42], ['baz', 'thing']])

// map.get with a default
map.fetch('NON_EXISTANT', 'default');
=> 'default'

// Invert map (makes keys->values and vice versa)
map.invert();
=> new Map([[42, 0], ['thing', 'baz']])

// Destructive filter (inline map delete)
map.reject(function(key, value) {
  return typeof key == 'string';
});
map.has('thing');
=> false

// Remove all items
map.clear();

// Check if Map has no items
map.isEmpty();
=> true
```

## Installation

You can use this in [node.js](http://nodejs.org) v0.8+
```shell
npm install smap [-g]
```

## Why this project exists


## Environment Support
Currently, this library works in:

* Polyfilled browsers (including Google Chrome 21+ if "Experimental JavaScript Features" are NOT on)
* Firefox 18+
* Node.js 0.8+
