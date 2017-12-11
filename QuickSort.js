const AbstractSort = require('./AbstractSort.js');
const Random = require('./Random.js');

class Quick3waySort extends AbstractSort {
    constructor() {
        throw new Error('Quick3waySort - do not instantiate, use Quick3waySort.sort(arguments) instead');
    }

    static sortImpl(a, from, to) {
        Random.shuffle(a, from, to);
        this._sort(a, from, to);
    }

    static _sort(a, from, to) {
        if (from >= to) return;
        let [lt, gt] = this._partition(a, from, to);
        this._sort(a, from, lt);
        this._sort(a, gt, to);
    }

    static _partition(a, from, to) {
        let median = this._getMedianOfThree(a, from, from + Math.floor((to - from) / 2), to);
        this.swap(a, from, median);

        let lt = from + 1,
            eq = from + 1,
            gt = to;
        while (gt >= eq) {
            if (this.less(a[eq], a[from])) {
                this.swap(a, lt++, eq++)
            } else if (this.less(a[from], a[eq])) {
                this.swap(a, eq, gt--);
            } else {
                eq++;
            }
        }
        this.swap(a, from, --lt);
        return [lt - 1, eq]
    }

    static _getMedianOfThree(a, i, j, k) {
        if (this.less(a[i], a[j])) {
            if (this.less(a[k], a[j])) {
                if (this.less(a[k], a[i])) {
                    return i;
                } else {
                    return k;
                }
            } else {
                return j;
            }
        } else {
            if (this.less(a[k], a[i])) {
                if (this.less(a[k], a[j])) {
                    return j;
                } else {
                    return k;
                }
            } else {
                return i;
            }
        }
    }
}

module.exports = Quick3waySort;