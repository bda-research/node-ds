
'use strict'

const Random = require('./Random.js');

module.exports = {
    insertionSort: function() {
        let [a, less, from, to] = this.parseArguments(arguments);
        for (let i = from; i <= to; i++) {
            for (let j = i; j > from; j--) {
                if (less(a[j], a[j - 1])) {
                    this.swap(a, j, j - 1);
                } else {
                    break;
                }
            }
        }
    },
    mergeSort: function() {
        let [a, less, from, to] = this.parseArguments(arguments);

        let aux = new Array(a.length);
        _sort(a, aux, from, to);

        function _sort(a, aux, from, to) {
            if (to === from) return;
            let mid = from + Math.floor((to - from) / 2);
            _sort(a, aux, from, mid);
            _sort(a, aux, mid + 1, to);
            _merge(a, aux, from, mid, to);
        }

        function _merge(a, aux, from, mid, to) {
            for (let i = from; i <= to; i++) {
                aux[i] = a[i];
            }

            let i = from, j = mid + 1, k = from;
            while (k <= to) {
                if (i > mid) {
                    a[k++] = aux[j++];
                } else if (j > to) {
                    a[k++] = aux[i++];
                } else if (less(aux[j], aux[i])) {
                    a[k++] = aux[j++];
                } else {
                    a[k++] = aux[i++];
                }
            }
        }
    },
    quickSort: function() {
        let self = this;
        let [a, less, from, to] = this.parseArguments(arguments);

        Random.shuffle(a, from, to);
        _sort(a, from, to);

        function _sort(a, from, to) {
            if (from >= to) return;
            let [lt, gt] = _partition(a, from, to);
            _sort(a, from, lt);
            _sort(a, gt, to);
        }

        function _partition(a, from, to) {
            let median = _getMedianOfThree(a, from, from + Math.floor((to - from) / 2), to);
            self.swap(a, from, median);

            let lt = from + 1,
                eq = from + 1,
                gt = to;
            while (gt >= eq) {
                if (less(a[eq], a[from])) {
                    self.swap(a, lt++, eq++)
                } else if (less(a[from], a[eq])) {
                    self.swap(a, eq, gt--);
                } else {
                    eq++;
                }
            }
            self.swap(a, from, --lt);
            return [lt - 1, eq]
        }

        function _getMedianOfThree(a, i, j, k) {
            if (less(a[i], a[j])) {
                if (less(a[k], a[j])) {
                    if (less(a[k], a[i])) {
                        return i;
                    } else {
                        return k;
                    }
                } else {
                    return j;
                }
            } else {
                if (less(a[k], a[i])) {
                    if (less(a[k], a[j])) {
                        return j;
                    } else {
                        return k;
                    }
                } else {
                    return i;
                }
            }
        }
    },
    heapSort: function() {
        let [a, less, from, to] = this.parseArguments(arguments);

        buildHeap(a, from, to);
        for (let i = to; i >= from;) {
            [a[from], a[i]] = [a[i], a[from]];
            sink(a, from, from, --i);
        }

        function buildHeap(a, from, to) {
            for (let i = Math.floor((from + to - 1) / 2); i >= from; i--) {
                sink(a, i, from, to);
            }
        }

        function sink(a, i, from, to) {
            let leftChild = from + ((i - from + 1) * 2 - 1);
            while (leftChild <= to) {
                if (leftChild + 1 <= to && less(a[leftChild], a[leftChild + 1])) leftChild++;
                if (!less(a[i], a[leftChild])) break;
                [a[i], a[leftChild]] = [a[leftChild], a[i]];
                i = leftChild;
                leftChild = from + ((i - from + 1) * 2 - 1);
            }
        }
    },
    parseArguments: function(args) {
        let a = args[0], compare, from, to;

        if (!Array.isArray(a)) throw new Error('IllegalArgument: argument must be an array');
        if (1 >= a.length) return;

        switch (args.length) {
            case 1:
                from = 0;
                to = a.length - 1;
                break;
            case 2:
                compare = args[1];
                from = 0;
                to = a.length - 1;
                break;
            case 3:
                from = args[1]; 
                to = args[2];
                break;
            case 4:
                compare = args[1]; 
                from = args[2];
                to = args[3];break;
            default:
                throw new Error('IllegalArgument: please follow sort(array(, compare)?(, from, to)?');
        }

        if ('number' !== typeof from || 'number' !== typeof to) throw new Error('IllegalArgument: invalid from and to');
    
        compare = this.getCompareFn(compare, a[0]);

        let less = function(a, b) {
            if (compare(a, b) < 0) return true;
            return false;
        }
        return [a, less, from, to];
    },
    swap: function(a, i, j) {
        [a[i], a[j]] = [a[j], a[i]];
    },
    getCompareFn: function(compare, comparable) {
        if ('function' === typeof compare) {
            return compare;
        }
        this.log('no compare function passed, will sort numbers in ascending order, strings in alphabetic order, chinese in pinyin order');
        switch (typeof comparable) {
            case 'number':
                return this.numberCompareFn;
            case 'string':
                return this.stringCompareFn.bind(this);
            default:
                throw new Error('IllegalArgument: must specify compare function when elements of array are neither number nor string');
        }
    },
    numberCompareFn: function(a, b) {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    },
    stringCompareFn(a, b) {
        const iconv = require('iconv-lite');
        let minLength = Math.min(a.length, b.length);
        for (let i = 0; i < minLength; i++) {
            let ca = this.gb2312Buf2Int(iconv.encode(a.charAt(i), 'gb2312'));
            if (ca === null) {
                this.log(`unexpected character ${a.charAt(i)}`);
                throw new Error('Sort - IllegalArgument: default string compare function only supports characters that can be encoded with gb2312');
            }
            let cb = this.gb2312Buf2Int(iconv.encode(b.charAt(i), 'gb2312'));
            if (cb === null) {
                this.log(`unexpected character ${b.charAt(i)}`);
                throw new Error('Sort - IllegalArgument: default string compare function only supports characters that can be encoded with gb2312');
            }
            if (ca > cb) return 1;
            if (cb > ca) return -1;
            continue;
        }
        if (a.length > b.length) return 1;
        if (b.length > a.length) return -1;
        return 0;
    },
    gb2312Buf2Int(buf) {
        if (buf.length > 2 || (buf.length > 1 && buf[0] < 0xa1)) return null;
        if (buf.length === 1) return buf[0];
        return buf[0] * 0x100 + buf[1];
    },
    log: function(message) {
        console.log(message);
    }
}
