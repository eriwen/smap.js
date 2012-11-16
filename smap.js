//! Copyright 2012 Eric Wendelin - MIT License
(function() {
    'use strict';

    /**
     * Given a filtering function, return a new Map of items matching that
     * function.
     *
     * @param filterFn {Function} that takes up to 3 arguments and returns a Boolean.
     * @return {Map} a new Map that is the subset of this map's items
     * that match the given filter function.
     */
    Map.prototype.filter = function(filterFn) {
        if (typeof filterFn != 'function') {
            throw new TypeError('Expected a function argument');
        }
        var _map = new Map();
        this.forEach(function(value, key, map) {
            if(filterFn(key, value, map)) {
                _map.set(key, value);
            }
        });
        return _map;
    };

    /**
     * Return a new Map that is the union of this Map and the given other Map.
     * If there are conflicting keys, the item in the Map argument overrides.
     *
     * @param otherMap {Map}
     * @return {Map} with all non-conflicting items
     */
    Map.prototype.merge = function(otherMap) {
        if (!(otherMap instanceof Map)) {
            throw new TypeError('Cannot merge with objects that are not Maps');
        }

        function setAll(value, key) {
            _map.set(key, value);
        }
        var _map = new Map();

        this.forEach(setAll);
        otherMap.forEach(setAll);
        return _map;
    };

    /**
     * Get entry for given key, or if it doesn't exist the default value.
     *
     * @param key {Object} anything, including primitives
     * @param defaultValue {Object}
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
     *
     * @return a new Map, this map inverted
     */
    Map.prototype.invert = function() {
        var _map = new Map();
        this.forEach(_map.set);
        return _map;
    };

    /**
     * Remove items from this Map as designated by a filtering function.
     *
     * @param filterFn {Function} using key, value and/or index and returning a Boolean
     */
    Map.prototype.reject = function(filterFn) {
        if (typeof filterFn != 'function') {
            throw new TypeError('Expected a function argument');
        }
        this.forEach(function(value, key, map) {
            if(filterFn(key, value, map)) {
                map['delete'](key);
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
