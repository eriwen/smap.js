describe('smap.js', function() {
    describe('Map::clear', function() {
        it ('should remove all items', function() {
            var map = new Map();
            map.set('foo', 'bar');
            map.set(5, 43);
            expect(map.keys().length).toEqual(2);
            map.clear();
            expect(map.keys().length).toEqual(0);
        });

        it('should not disturb empty Map', function() {
            var map = new Map();
            expect(map.keys().length).toEqual(0);
            map.clear();
            expect(map.keys().length).toEqual(0);
        });
    });

    describe('Map::filter', function() {
        it('should return a new Map', function() {
            var map = new Map();
            map.set('foo', 'bar');
            var filteredMap = map.filter(function(k, v) {
                return false;
            });
            expect(filteredMap.keys().length).toBe(0);
            expect(filteredMap.has('foo')).toBeFalsy();
            expect(map.keys().length).toBe(1);
        });

        it('should return an empty Map if given function excludes all keys', function() {
            var map = new Map();
            map.set('foo', 'bar');
            var filteredMap = map.filter(function(k, v) {
                return false;
            });
            expect(filteredMap.keys().length).toEqual(0);
        });

        it('should return a Map with a subset of items', function() {
            var map = new Map();
            map.set('foo', 'bar');
            map.set('baz', 99);
            var filteredMap = map.filter(function(k, v) {
                return k === 'foo';
            });
            expect(filteredMap.keys().length).toEqual(1);
            expect(filteredMap.has('foo')).toBeTruthy();
            expect(filteredMap.has('baz')).toBeFalsy();
        });
    });

    describe('Map::fetch', function() {
        it('should return default if given item does not exist', function() {
            var map = new Map();
            expect(map.fetch('foo', 42)).toEqual(42);
            expect(map.fetch('foo')).toBeUndefined();
        });

        it('should return value if given item does exist', function() {
            var map = new Map();
            map.set(null, 'baz');

            expect(map.fetch(null, undefined)).toEqual('baz');
        })
    });

    describe('Map::merge', function() {
        it('should throw an Error if input is not a Map', function() {
            var expectedError = new TypeError('Cannot merge with objects that are not Maps');
            expect(function() { new Map().merge() }).toThrow(expectedError);
            expect(function() { new Map().merge([1, 2]) }).toThrow(expectedError);
            expect(function() { new Map().merge(5) }).toThrow(expectedError);
            expect(function() { new Map().merge({'foo': 'bar'}) }).toThrow(expectedError);
        });

        it('should handle empty maps', function() {
            var map = new Map();
            var mergedMap = map.merge(new Map());
            expect(mergedMap.keys().length).toBe(0);
        });

        it('should merge maps with disjoint key sets', function() {
            var map = new Map();
            map.set('foo', 'bar');

            var other = new Map();
            other.set('baz', 'thing');

            var mergedMap = map.merge(other);
            expect(mergedMap.keys().length).toBe(2);
        });
    });

    describe('Map::invert', function() {
        it('should do nothing to an empty Map', function() {
            var map = new Map();
            expect(map.invert()).toEqual(new Map());
        });
    });

    describe('Map::reject', function() {
        it('should throw error if given non-function', function() {
            var expectedError = new TypeError('Expecting function of arity 2 for input');
            expect(function() { new Map().reject() }).toThrow(expectedError);
            expect(function() { new Map().reject(42) }).toThrow(expectedError);
            expect(function() { new Map().reject(function(a){}) }).toThrow(expectedError);
            expect(function() { new Map().reject({'foo': 'bar'}) }).toThrow(expectedError);
        });

        it('should remove items in place', function() {
            var map = new Map();
            map.set('foo', 'bar');
            map.set(1, 2);
            map.set('baz', 6);

            map.reject(function(k, v) {
                return !isNaN(parseFloat(v)) && isFinite(v);
            });

            expect(map.keys().length).toBe(1);
            expect(map.has('foo')).toBe(true);
        });
    });

    describe('Map::isEmpty', function() {
        it('should report maps with no items as empty', function() {
            expect((new Map()).isEmpty()).toBe(true);
        });

        it('should reports maps with >0 items as non-empty', function() {
            var map = new Map();
            map.set('foo', 'bar');
            expect((map).isEmpty()).toBe(false);
        });
    });
});
