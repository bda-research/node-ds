'use strict';

function randomArray(length, lo, hi) {
	let a = [];
	for (let i = 0; i < length; i++) {
		a.push(Math.floor(Math.random() * (hi - lo) + lo));
	}
	return a;
}

function isSorted(a) {
	for (let i = 1; i < a.length; i++) {
		if (a[i] < a[i-1]) {
			return false;
		}
	}
	return true;
}

function test(numOfTestCases, length, sortFn) {
	let result = {
		total: numOfTestCases,
		failed: 0,
		succeed: 0,
		elapsedTime: 0
	};
	let lo = 0, hi = length * 10;
	let start = Date.now();
	for (let i = 0; i < numOfTestCases; i++) {
		let a = randomArray(length, lo, hi);
		sortFn(a);
		let sorted = isSorted(a);
		if (sorted) {
			result.succeed++;
		} else {
			result.failed++;
		}
	}
	let end = Date.now();
	result.elapsedTime = end - start;
	return result;
}

module.exports = test;