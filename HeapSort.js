const AbstractSort = require('./AbstractSort.js');

class HeapSort extends AbstractSort {
    constructor() {
        throw new Error('HeapSort - do not instantiate, use HeapSort.sort(arguments) instead');
    }

    static sortImpl(a, from, to) {
        this.buildHeap(a, from, to);
        for (let i = to; i >= from;) {
            [a[from], a[i]] = [a[i], a[from]];
            this.sink(a, from, from, --i);
        }
    }

    static buildHeap(a, from, to) {
        for (let i = Math.floor((from + to - 1) / 2); i >= from; i--) {
            this.sink(a, i, from, to);
        }
    }

    static sink(a, i, from, to) {
        let leftChild = from + ((i - from + 1) * 2 - 1);
        while (leftChild <= to) {
            if (leftChild + 1 <= to && this.less(a[leftChild], a[leftChild + 1])) leftChild++;
            if (!this.less(a[i], a[leftChild])) break;
            [a[i], a[leftChild]] = [a[leftChild], a[i]];
            i = leftChild;
            leftChild = from + ((i - from + 1) * 2 - 1);
        }
    }
}

module.exports = HeapSort;