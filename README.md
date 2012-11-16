# smap.js - A forward polyfill for ES6 Maps
Use ES6 Maps with a bunch of convenience methods. Help improve the ES6 spec!

```js
var map = new Map([['foo', 'bar']]);
map.set(0, 42);

// Filter map by a function
map.filter(function(key, value, map) {
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
map.reject(function(key, value, map) {
  return index < 3;
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
In browsers, include [smap-shim.js](https://github.com/eriwen/smap.js/downloads) in your page:

```html
<script type="text/javascript" src="https://raw.github.com/eriwen/smap.js/master/smap-shim.js"></script>
```

You can install this via:

 * npm for [node.js](http://nodejs.org) v0.8+: `npm install smap`
 * [component(1)](https://github.com/component/component): `component install eriwen/smap.js`
 * [bower](http://twitter.github.com/bower/): `bower install smap`

### Environment Support
If you also use the [es5-shim](https://github.com/kriskowal/es5-shim), you can use this in:

 * IE9+
 * Firefox 13+
 * Google Chrome 21+
 * Safari 4+
 * Opera 12+
 * Node.js 0.8+
 * PhantomJS

## Why this project exists
Boris Smus [makes an excellent suggestion](http://smus.com/how-the-web-should-work/) for moving the web forward: *forward polyfills*.
I hope this project can be the basis for a future proposal to TC39. Please gratuitously [discuss Map and WeakMap workings in issues](https://github.com/eriwen/smap.js/issues), and add methods/tests with pull requests.

This is for *everyone*, not just JavaScript gurus. Standards bodies want feedback from developers like you.
