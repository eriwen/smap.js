'Map' in this && (function(module) {'use strict';

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

    // TODO: destructive mergeInPlace()?

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
}.call(this, typeof exports));