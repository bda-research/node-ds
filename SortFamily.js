
'use strict'

const Random = require('./Random.js');

function silent() {}

function parseArguments(args) {
    var a = args[0], compare, from, to;

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

    compare = getCompareFn(compare, a[0]);

    return [a, compare, from, to];
}

function getCompareFn(compare, comparable) {
    if ('function' === typeof compare) {
        return compare;
    }
    silent('no compare function passed, will sort numbers in ascending order, strings in alphabetic order, chinese in pinyin order');
    switch (typeof comparable) {
        case 'number':
            return numberCompareFn;
        case 'string':
            return stringCompareFn;
        default:
            throw new Error('IllegalArgument: must specify compare function when elements of array are neither number nor string');
    }
}

function numberCompareFn(a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
}

function stringCompareFn(a, b) {
    const iconv = require('iconv-lite');
    var minLength = Math.min(a.length, b.length);
    for (var i = 0; i < minLength; i++) {
        var ca = gb2312Buf2Int(iconv.encode(a.charAt(i), 'gb2312'));
        if (ca === null) {
            silent(`unexpected character ${a.charAt(i)}`);
            throw new Error('Sort - IllegalArgument: default string compare function only supports characters that can be encoded with gb2312');
        }
        var cb = gb2312Buf2Int(iconv.encode(b.charAt(i), 'gb2312'));
        if (cb === null) {
            silent(`unexpected character ${b.charAt(i)}`);
            throw new Error('Sort - IllegalArgument: default string compare function only supports characters that can be encoded with gb2312');
        }
        if (ca > cb) return 1;
        if (cb > ca) return -1;
        continue;
    }
    if (a.length > b.length) return 1;
    if (b.length > a.length) return -1;
    return 0;
}

function gb2312Buf2Int(buf) {
    if (buf.length > 2 || (buf.length > 1 && buf[0] < 0xa1)) return null;
    if (buf.length === 1) return buf[0];
    return buf[0] * 0x100 + buf[1];
}

function swap(a, i, j) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

var insertionSort = (function() {
    function _sort(a, compare, from, to) {
        for (var i = from; i <= to; i++) {
            for (var j = i; j > from; j--) {
                if (compare(a[j], a[j - 1]) < 0) {
                    swap(a, j, j - 1);
                } else {
                    break;
                }
            }
        }
    }

    return function() {
        var [a, compare, from, to] = parseArguments(arguments);
        _sort(a, compare, from, to);
    }
})();

var mergeSort = (function() {
    /* sort the recursive way 
    function _sort(a, aux, compare, from, to) {
        if (to === from) return;
        var mid = from + Math.floor((to - from) / 2);
        _sort(a, aux, compare, from, mid);
        _sort(a, aux, compare, mid + 1, to);
        _merge(a, aux, compare, from, mid, to);
    }
    */

    function _merge(a, aux, compare, from, mid, to) {
        var i;
        for (i = from; i <= to; i++) {
            aux[i] = a[i];
        }

        i = from;
        var j = mid + 1, k = from;
        while (k <= to) {
            if (i > mid) {
                a[k++] = aux[j++];
            } else if (j > to) {
                a[k++] = aux[i++];
            } else if (compare(aux[j], aux[i]) < 0) {
                a[k++] = aux[j++];
            } else {
                a[k++] = aux[i++];
            }
        }
    }

    /* sort the bottom up way */
    function _sortBottomUp(a, aux, compare, from, to) {
        var batch = 1;
        while (batch < to - from + 1) {
            var i = from;
            while (i + batch - 1 < to) {
                _merge(a, aux, compare, i, i+batch-1, Math.min(i+2*batch-1, to));
                i = i+2*batch;    
            }
            batch = batch * 2;
        }
    }

    return function() {
        var [a, compare, from, to] = parseArguments(arguments);
        var aux = new Array(a.length);
        _sortBottomUp(a, aux, compare, from, to);
    }
})();

var quickSort = (function() {
    /* 3way quick sort(less swap version)
     * ==<<<<????>>>>==
    function _3waysort(a, compare, from, to) {
        if (from >= to) return;
        var i = _3waypartition(a, compare, from, to);
        _3waysort(a, compare, from, i[0]);
        _3waysort(a, compare, i[1], to);
    }

    function _3waypartition(a, compare, from, to) {
        var pivot = a[to];
        var lt = from, i = from, gt = to - 1, j = to - 1;
        while (true) {
            while (compare(a[lt], pivot) < 0) {lt++;}
            while (compare(a[gt], pivot) > 0 && gt >= from) {gt--;}
            if (lt >= gt) break;
            swap(a, lt, gt);
            if (compare(a[lt], pivot) === 0) {
                swap(a, lt++, i++);
            }
            if (compare(a[gt], pivot) === 0) {
                swap(a, gt--, j--);
            }
        }
        lt--;
        gt++;
        var k;
        for (k = from; k < i; k++) {
            swap(a, k, lt--);
        }
        for (k = to; k > j; k--) {
            swap(a, k, gt++);
        }
        return [lt, gt];
    }*/

    /* 3way quick sort
     * <<<<<==?????>>>
    function _sort(a, compare, from, to) {
        if (from >= to) return;
        var i = _partition(a, compare, from, to);
        _sort(a, compare, from, i[0]);
        _sort(a, compare, i[1], to);
    }

    function _partition(a, compare, from, to) {
        var median = _getMedianOfThree(a, compare, from, from + Math.floor((to - from) / 2), to);
        swap(a, from, median);

        var pivot = a[from],
            lt = from,
            eq = from,
            gt = to;
        var cmp;
        while (gt >= eq) {
            cmp = compare(a[eq], pivot);
            if (cmp < 0) {
                swap(a, lt++, eq++)
            } else if (cmp > 0) {
                swap(a, eq, gt--);
            } else {
                eq++;
            }
        }
        return [lt - 1, eq]
    }

    function _getMedianOfThree(a, compare, i, j, k) {
        if (compare(a[i], a[j]) < 0) {
            if (compare(a[k], a[j]) < 0) {
                if (compare(a[k], a[i]) < 0) {
                    return i;
                } else {
                    return k;
                }
            } else {
                return j;
            }
        } else {
            if (compare(a[k], a[i]) < 0) {
                if (compare(a[k], a[j]) < 0) {
                    return j;
                } else {
                    return k;
                }
            } else {
                return i;
            }
        }
    }*/
    
    function _dualPivotSort(a, compare, from, to) {
        if (from >= to) return;
        var i = _dualPivotPartition(a, compare, from, to);
        _dualPivotSort(a, compare, from, i[0] - 1);
        if (i[1] - i[0] > 1) _dualPivotSort(a, compare, i[0] + 1, i[1] - 1);
        _dualPivotSort(a, compare, i[1] + 1, to);
    }

    function _dualPivotPartition(a, compare, from, to) {
        if (compare(a[to], a[from]) < 0) swap(a, from, to);
        var pivot1 = a[from], pivot2 = a[to];
        var lt = from + 1, i = from + 1, gt = to - 1;
        while (i <= gt) {
            if (compare(a[i], pivot1) < 0) {
                swap(a, i++, lt++);
            } else if (compare(pivot2, a[i]) < 0) {
                swap(a, i, gt--);
            } else {
                i++;
            }
        }
        swap(a, to, i);
        swap(a, from, --lt);
        return [lt,i];
    }

    return function() {
        var [a, compare, from, to] = parseArguments(arguments);
        Random.shuffle(a, from, to);
        _dualPivotSort(a, compare, from, to);
    }
})();

var heapSort = (function() {
    function buildHeap(a, compare, from, to) {
        for (var i = Math.floor((from + to - 1) / 2); i >= from; i--) {
            sink(a, compare, i, from, to);
        }
    }

    function sink(a, compare, i, from, to) {
        var leftChild = from + ((i - from + 1) * 2 - 1);
        while (leftChild <= to) {
            if (leftChild + 1 <= to && compare(a[leftChild], a[leftChild + 1]) < 0) leftChild++;
            if (compare(a[i], a[leftChild]) >= 0) break;
            swap(a, i, leftChild);
            i = leftChild;
            leftChild = from + ((i - from + 1) * 2 - 1);
        }
    }

    return function() {
        var [a, compare, from, to] = parseArguments(arguments);

        buildHeap(a, compare, from, to);
        for (var i = to; i >= from;) {
            swap(a, from, i);
            sink(a, compare, from, from, --i);
        }
    }
})();

module.exports = {
    numberCompareFn: numberCompareFn,
    stringCompareFn: stringCompareFn,
    insertionSort: insertionSort,
    mergeSort: mergeSort,
    quickSort: quickSort,
    heapSort: heapSort
};