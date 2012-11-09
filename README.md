# smap.js - A forward polyfill for ES6 Maps
Given a browser with ES6 Map partially implemented
(or one polyfilled with [harmony-collections](https://github.com/Benvie/harmony-collections)), smap.js adds
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
You can install this via npm for [node.js](http://nodejs.org) v0.8+

```shell
npm install smap
```

Currently, no browser has implemented enough of the spec to support this library without a shim,
therefore I recommend including [harmony-collections.js](https://raw.github.com/Benvie/harmony-collections/master/harmony-collections.js)
or [harmony-collections.min.js](https://raw.github.com/Benvie/harmony-collections/master/harmony-collections.min.js)
before including [smap.js](https://github.com/eriwen/smap.js/downloads):

```html
<script type="text/javascript" src="https://raw.github.com/Benvie/harmony-collections/master/harmony-collections.js"></script>
<script type="text/javascript" src="https://raw.github.com/eriwen/smap.js/master/smap.js"></script>
```

### Environment Support
If you also use the [es5-shim](https://github.com/kriskowal/es5-shim), you can use this in:

 * IE9+
 * Google Chrome 21+
 * Safari 4+
 * Opera 12+
 * Node.js 0.8+
 * PhantomJS

## Why this project exists
Boris Smus [makes an excellent suggestion](http://smus.com/how-the-web-should-work/) for moving the web forward: *forward polyfills*.
I hope this project can be the basis for a future proposal to TC39. Please gratuitously [discuss Map and WeakMap workings in issues](https://github.com/eriwen/smap.js/issues), and add methods/tests with pull requests.

This is for *everyone*, not just JavaScript gurus. Standards bodies want feedback from developers like you.
