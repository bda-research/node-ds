const AbstractSort = require('./AbstractSort.js');

class InsertionSort extends AbstractSort {
    constructor() {
        throw new Error('InsertionSort - do not instantiate, use InsertionSort.sort(arguments) instead');
    }

    static sortImpl(a, from, to) {
        for (let i = from; i <= to; i++) {
            for (let j = i; j > 0; j--) {
                if (this.less(a[j], a[j - 1])) {
                    this.swap(a, j, j - 1);
                } else {
                    break;
                }
            }
        }
    }
}

module.exports = InsertionSort;