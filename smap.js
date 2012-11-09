//! Copyright 2012 Eric Wendelin - MIT License
// Partial ES6 Map polyfill adapted from https://github.com/WebReflection/es6-collections
("Map" in this && typeof Map.prototype.forEach == 'function') || (function (module) {"use strict";
    //!(C) WebReflection - Mit Style License
    // size and performances oriented polyfill for ES6
    // compatible with node.js, Rhino, any browser

    // Map(void):Map
    function Map() {

        // private references holders
        var
            keys = [],
            values = []
            ;

        // returns freshly new created
        // instanceof Map in any case
        return create(MapPrototype, {
            // Map#delete(key:void*):boolean
            "delete": {value: bind.call(sharedDel, NULL, FALSE, keys, values)},
            // Map#get(key:void*):void*
            get:      {value: bind.call(sharedGet, NULL, FALSE, keys, values)},
            // Map#has(key:void*):boolean
            has:      {value: bind.call(sharedHas, NULL, FALSE, keys, values)},
            // Map#set(key:void*, value:void*):void
            set:      {value: bind.call(sharedSet, NULL, FALSE, keys, values)},
            // Map#size(void):number === Mozilla only so far
            size:     {value: bind.call(sharedSize, NULL, keys)},
            // Map#keys(void):Array === not in specs
            keys:     {value: boundSlice(keys)},
            // Map#values(void):Array === not in specs
            values:   {value: boundSlice(values)},
            // Map#iterate(callback:Function, context:void*):void ==> callback.call(context, key, value, index) === not in specs
            iterate:  {value: bind.call(sharedIterate, NULL, FALSE, keys, values)}
        });
    }

    // common shared method recycled for all shims through bind
    function sharedDel(objectOnly, keys, values, key) {
        if (sharedHas(objectOnly, keys, values, key)) {
            keys.splice(i, 1);
            values.splice(i, 1);
        }
        // Aurora here does it while Canary doesn't
        return -1 < i;
    }

    function sharedGet(objectOnly, keys, values, key/*, d3fault*/) {
        return sharedHas(objectOnly, keys, values, key) ? values[i] : undefined; //d3fault;
    }

    function sharedHas(objectOnly, keys, values, key) {
        if (objectOnly && key !== Object(key))
            throw new TypeError("not a non-null object")
                ;
        i = betterIndexOf.call(keys, key);
        return -1 < i;
    }

    function sharedSet(objectOnly, keys, values, key, value) {
        /* return */sharedHas(objectOnly, keys, values, key) ?
            values[i] = value
            :
            values[keys.push(key) - 1] = value
        ;
    }

    function boundSlice(values) {
        return function () {
            return slice.call(values);
        };
    }

    function sharedSize(keys) {
        return keys.length;
    }

    function sharedIterate(objectOnly, keys, values, callback, context) {
        for (var
            k = slice.call(keys), v = slice.call(values),
            i = 0, length = k.length;
            i < length; callback.call(context, k[i], v[i], i++)
            );
    }

    // a more reliable indexOf
    function betterIndexOf(value) {
        if (value != value || value === 0) {
            for (i = this.length; i-- && !is(this[i], value););
        } else {
            i = indexOf.call(this, value);
        }
        return i;
    }

    // need for an empty constructor ...
    function Constructor(){}  // GC'ed if !!Object.create
    // ... so that new WeakMapInstance and new WeakMap
    // produces both an instanceof WeakMap

    var
    // shortcuts and ...
        NULL = null, TRUE = true, FALSE = false,
        notInNode = module == "undefined",
        window = notInNode ? this : global,
        module = notInNode ? {} : exports,
        Object = window.Object,
        MapPrototype = Map.prototype,
        defineProperty = Object.defineProperty,
        slice = [].slice,

    // Object.is(a, b) shim
        is = Object.is || function (a, b) {
            return a === b ?
                a !== 0 || 1 / a == 1 / b :
                a != a && b != b
                ;
        },

    // partial polyfill for this aim only
        bind = Map.bind || function bind(context, objectOnly, keys, values) {
            // partial fast ad-hoc Function#bind polyfill if not available
            var callback = this;
            return function bound(key, value) {
                return callback.call(context, objectOnly, keys, values, key, value);
            };
        },

        create = Object.create || function create(proto, descriptor) {
            // partial ad-hoc Object.create shim if not available
            Constructor.prototype = proto;
            var object = new Constructor, key;
            for (key in descriptor) {
                object[key] = descriptor[key].value;
            }
            return object;
        },

        indexOf = [].indexOf || function indexOf(value) {
            // partial fast Array#indexOf polyfill if not available
            for (i = this.length; i-- && this[i] !== value;);
            return i;
        },

        undefined,
        i // recycle ALL the variables !
        ;

    // used to follow FF behavior where WeakMap.prototype is a WeakMap itself
    Map.prototype = MapPrototype = Map();

    // assign it to the global context
    // if already there, e.g. in node, export native
    window.Map = module.Map = window.Map || Map;
}.call(
    this,
    typeof exports
));

(function() {
    'use strict';

    /**
     * Remove all items from this Map.
     */
    Map.prototype.clear = function() {
        this.iterate(function(key) {
            this['delete'](key);
        }.bind(this));
    };

    /**
     * Given a filtering function, return a new Map of items matching that
     * function.
     *
     * @param filterFn [Function] that takes 2 arguments and returns a Boolean.
     * @return [Map] a new Map that is the subset of this map's items
     * that match the given filter function.
     */
    Map.prototype.filter = function(filterFn) {
        if (typeof filterFn != 'function' || filterFn.length !== 2) {
            throw new TypeError('Expecting function of arity 2 for input');
        }
        var _map = new Map();
        this.iterate(function(key, value) {
            if(filterFn(key, value)) {
                _map.set(key, value);
            }
        });
        return _map;
    };

    /**
     * Return a new Map that is the union of this Map and the given other Map.
     * If there are conflicting keys, the item
     * @param otherMap
     */
    Map.prototype.merge = function(otherMap) {
        if (!(otherMap instanceof Map)) {
            throw new TypeError('Cannot merge with objects that are not Maps');
        }

        function setAll(key, value, index) {
            _map.set(key, value);
        }
        var _map = new Map();

        this.iterate(setAll);
        otherMap.iterate(setAll);
        return _map;
    };

    /**
     * Get entry for given key, or if it doesn't exist the default value.
     * @param key [Object]
     * @param defaultValue [Object]
     * @return item at key or default
     */
    Map.prototype.fetch = function(key, defaultValue) {
        if (this.has(key)) {
            return this.get(key);
        }
        return defaultValue;
    };

    /**
     * Return a new Map whose keys are the values of this Map, and values are keys.
     */
    Map.prototype.invert = function() {
        var _map = new Map();
        this.iterate(function(key, value) {
            _map.set(value, key);
        });
        return _map;
    };

    /**
     * In-place delete
     */
    Map.prototype.reject = function(filterFn) {
        if (typeof filterFn != 'function' || filterFn.length !== 2) {
            throw new TypeError('Expecting function of arity 2 for input');
        }
        this.iterate(function(key, value) {
            if(filterFn(key, value)) {
                this['delete'](key);
            }
        }.bind(this));
    };

    /**
     * @return true if there are no entries in this Map.
     */
    Map.prototype.isEmpty = function() {
        return this.keys().length === 0;
    };
})();
