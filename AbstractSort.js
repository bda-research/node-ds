/*
 * API is listed as below:
 * Sort.sort(array)
 * Sort.sort(array, compare)
 * Sort.sort(array, from, to)
 * Sort.sort(array, compare, from, to)
 */
class Sort {
    constructor() {
        throw new Error('Sort - do not instantiate, use xxxSort.sort(arguments) instead');
    }

    static sort() {
        let a = arguments[0], compare, from, to;

        if (!Array.isArray(a)) throw new Error('Sort - IllegalArgument: argument must be an array');
        if (1 >= a.length) return;

        switch (arguments.length) {
            case 1:
                from = 0, to = a.length - 1;break;
            case 2:
                compare = arguments[1], from = 0, to = a.length - 1;break;
            case 3:
                from = arguments[1], to = arguments[2];break;
            case 4:
                compare = arguments[1], from = arguments[2], to = arguments[3];break;
            default:
                throw new Error('Sort - IllegalArgument: please follow Sort(array(, compare)?(, from, to)?');
        }

        if ('number' !== typeof from || 'number' !== typeof to) throw new Error('Sort - IllegalArgument: invalid from and to');
    
        this.compare = compare = this.getCompareFn(compare, a[0]);

        this.less = function(a, b) {
            if (compare(a, b) < 0) return true;
            return false;
        }
        this.swap = function(a, i, j) {
            [a[i], a[j]] = [a[j], a[i]];
        }

        this.sortImpl(a, from, to);
    }

    static sortImpl() {
        throw new Error('Sort - Sort.sortImpl must be implemented');
    }

    static getCompareFn(compare, comparable) {
        if ('function' === typeof compare) {
            return compare;
        }
        this.log('no compare function passed, will sort numbers in ascending order, strings in alphabetic order, chinese in pinyin order');
        switch (typeof comparable) {
            case 'number':
                return this.numberCompareFn.bind(this);
            case 'string':
                return this.stringCompareFn.bind(this);
            default:
                throw new Error('Sort - IllegalArgument: must specify compare function when elements of array are neither number nor string');
        }
    }

    static numberCompareFn(a, b) {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    }

    static stringCompareFn(a, b) {
        const iconv = require('iconv-lite');
        let minLength = Math.min(a.length, b.length);
        for (let i = 0; i < minLength; i++) {
            let ca = this.gb2312Buf2Int(iconv.encode(a.charAt(i), 'gb2312'));
            if (ca === null) {
                log(`unexpected character ${a.charAt(i)}`);
                throw new Error('InsertionSort - IllegalArgument: default string compare function only supports characters that can be encoded with gb2312');
            }
            let cb = this.gb2312Buf2Int(iconv.encode(b.charAt(i), 'gb2312'));
            if (cb === null) {
                log(`unexpected character ${b.charAt(i)}`);
                throw new Error('InsertionSort - IllegalArgument: default string compare function only supports characters that can be encoded with gb2312');
            }
            if (ca > cb) return 1;
            if (cb > ca) return -1;
            continue;
        }
        if (a.length > b.length) return 1;
        if (b.length > a.length) return -1;
        return 0;
    }

    static gb2312Buf2Int(buf) {
        if (buf.length > 2 || (buf.length > 1 && buf[0] < 0xa1)) return null;
        if (buf.length === 1) return buf[0];
        return buf[0] * 0x100 + buf[1];
    }

    static log(message) {
        // console.log(`Sort - ${message}`);
    }
}

module.exports = Sort;