const AbstractSort = require('./AbstractSort.js');

class MergeSort extends AbstractSort {
    constructor() {
        throw new Error('MergeSort - do not instantiate, use MergeSort.sort(arguments) instead');
    }

    static sortImpl(a, from, to) {
        let aux = new Array(a.length);
        this._sort(a, aux, from, to);
    }

    static _sort(a, aux, from, to) {
        if (to === from) return;
        let mid = from + Math.floor((to - from) / 2);
        this._sort(a, aux, from, mid);
        this._sort(a, aux, mid + 1, to);
        this._merge(a, aux, from, mid, to);
    }

    static _merge(a, aux, from, mid, to) {
        for (let i = from; i <= to; i++) {
            aux[i] = a[i];
        }

        let i = from, j = mid + 1, k = from;
        while (k <= to) {
            if (i > mid) {
                a[k++] = aux[j++];
            } else if (j > to) {
                a[k++] = aux[i++];
            } else if (this.less(aux[j], aux[i])) {
                a[k++] = aux[j++];
            } else {
                a[k++] = aux[i++];
            }
        }
    }
}

module.exports = MergeSort;