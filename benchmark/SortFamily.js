'use strict'

const SortFamily = require('../SortFamily.js');
const SortTest = require('../tests/SortTest.js');

const padding = '  ';

let result;

/* SortFamily.insertionSort */
console.log('\nSortFamily.insertionSort\n');
console.log(padding + '1. T=100, N=500, Type=random');
result = SortTest('random', 100, 500, SortFamily.insertionSort);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));
console.log(padding + '2. T=100, N=1000, Type=random');
result = SortTest('random', 100, 1000, SortFamily.insertionSort);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));
console.log(padding + '3. T=100, N=2000, Type=random');
result = SortTest('random', 100, 2000, SortFamily.insertionSort);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));
console.log(padding + '3. T=100, N=2000, Type=almostSorted');
result = SortTest('almostSorted', 100, 2000, SortFamily.insertionSort);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));

/* SortFamily.mergeSort */
console.log('\nSortFamily.mergeSort\n');
console.log(padding + '1. T=100, N=1000, Type=random');
result = SortTest('random', 100, 1000, SortFamily.mergeSort);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));
console.log(padding + '2. T=100, N=10000, Type=random');
result = SortTest('random', 100, 10000, SortFamily.mergeSort);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));
console.log(padding + '3. T=100, N=100000, Type=random');
result = SortTest('random', 100, 100000, SortFamily.mergeSort);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));
console.log(padding + '4. T=100, N=100000, Type=almostSorted');
result = SortTest('almostSorted', 100, 100000, SortFamily.mergeSort);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));
console.log(padding + '5. T=100, N=100000, Type=almostReverse');
result = SortTest('almostReverse', 100, 100000, SortFamily.mergeSort);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));

/* SortFamily.quickSort */
console.log('\nSortFamily.quickSort\n');
console.log(padding + '1. T=100, N=1000, Type=random');
result = SortTest('random', 100, 1000, SortFamily.quickSort);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));
console.log(padding + '2. T=100, N=10000, Type=random');
result = SortTest('random', 100, 10000, SortFamily.quickSort);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));
console.log(padding + '3. T=100, N=100000, Type=random');
result = SortTest('random', 100, 100000, SortFamily.quickSort);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));
console.log(padding + '4. T=100, N=100000, Type=almostSorted');
result = SortTest('almostSorted', 100, 100000, SortFamily.quickSort);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));
console.log(padding + '5. T=100, N=100000, Type=almostReverse');
result = SortTest('almostReverse', 100, 100000, SortFamily.quickSort);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));

/* SortFamily.heapSort */
console.log('\nSortFamily.heapSort\n');
console.log(padding + '1. T=100, N=1000, Type=random');
result = SortTest('random', 100, 1000, SortFamily.heapSort);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));
console.log(padding + '2. T=100, N=10000, Type=random');
result = SortTest('random', 100, 10000, SortFamily.heapSort);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));
// console.log(padding + '3. T=100, N=100000, Type=random');
// result = SortTest('random', 100, 100000, SortFamily.heapSort);
// console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));
// console.log(padding + '4. T=100, N=100000, Type=almostSorted');
// result = SortTest('almostSorted', 100, 100000, SortFamily.heapSort);
// console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));
// console.log(padding + '5. T=100, N=100000, Type=almostReverse');
// result = SortTest('almostReverse', 100, 100000, SortFamily.heapSort);
// console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));

/* built-in Array.sort */
console.log('\nbuilt-in Array.sort\n');
let fn = function(a) {
    a.sort(function(a, b) {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });
}
console.log(padding + '1. T=100, N=1000, Type=random');
result = SortTest('random', 100, 1000, fn);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));
console.log(padding + '2. T=100, N=10000, Type=random');
result = SortTest('random', 100, 10000, fn);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));
console.log(padding + '3. T=100, N=100000, Type=random');
result = SortTest('random', 100, 100000, fn);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));
console.log(padding + '4. T=100, N=100000, Type=almostSorted');
result = SortTest('almostSorted', 100, 100000, fn);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));
console.log(padding + '5. T=100, N=100000, Type=almostReverse');
result = SortTest('almostReverse', 100, 100000, fn);
console.log(padding + 'successRate: %s/%s, elapsedTime: %s ms, average: %s ms\n', result.succeed, result.total, result.elapsedTime, Math.round(result.elapsedTime/result.total));
