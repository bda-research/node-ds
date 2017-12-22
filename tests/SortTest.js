'use strict';

function randomArray(length, lo, hi) {
    var a = [];
    for (var i = 0; i < length; i++) {
        a.push(Math.floor(Math.random() * (hi - lo) + lo));
    }
    return a;
}

function almostReverseArray(length, numOfRandom) {
    var a = [], i;
    for (i = length; i > 0; i--) {
        a.push(i);
    }
    for (i = 0; i < numOfRandom; i++) {
        swap(a, i, length - 1 - i);
    }
    return a;
}

function almostSortedArray(length, numOfRandom) {
    var a = [], i;
    for (i = 0; i < length; i++) {
        a.push(i);
    }
    for (i = 0; i < numOfRandom; i++) {
        swap(a, i, length - 1 - i);
    }
    return a;
}

function swap(a, i, j) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

function isSorted(a) {
    for (var i = 1; i < a.length; i++) {
        if (a[i] < a[i - 1]) {
            return false;
        }
    }
    return true;
}

function test(type, numOfTestCases, length, sortFn) {
    var result = {
        total: numOfTestCases,
        failed: 0,
        succeed: 0,
        elapsedTime: 0
    };
    var getArray;
    switch (type) {
        case 'random':
            getArray = function(length) {
                return randomArray(length, 0, length * 10);
            };
            break;
        case 'almostSorted':
            getArray = function(length) {
                return almostSortedArray(length, Math.floor(length * 0.01));
            }
            break;
        case 'almostReverse':
            getArray = function(length) {
                return almostReverseArray(length, Math.floor(length * 0.01));
            }
            break;
        default:
            break;
    }
    var start = Date.now();
    for (var i = 0; i < numOfTestCases; i++) {
        var a = getArray(length);
        sortFn(a);
        var sorted = isSorted(a);
        if (sorted) {
            result.succeed++;
        } else {
            result.failed++;
        }
    }
    var end = Date.now();
    result.elapsedTime = end - start;
    return result;
}

module.exports = test;