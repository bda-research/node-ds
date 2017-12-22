
'use strict'

const DoublyLinkedList = require('../DoublyLinkedList.js')

function insertionSortLinked(a){
	var cur = a.head.next;
	
	while(cur){
		var sl = cur.prev;
		while(sl && cur.val < sl.val){
			sl = sl.prev;
		}

		var t = cur;
		cur = cur.next;

		a.delete(t);

		if(!sl){
			a.insertStartNode(t);
		}else{
			a.insertAfter(sl, t);
		}
	}
}

function insertionSort(a) {
    for (let i = 0; i <= a.length; i++) {
        for (let j = i; j > 0; j--) {
            if (a[j] < a[j - 1]) {
                [a[j], a[j-1]] = [a[j-1], a[j]];
            } else {
                break;
            }
        }
    }
}

function randomArray(length, lo, hi) {
	let a = [];
	for (let i = 0; i < length; i++) {
		a.push(Math.floor(Math.random() * (hi - lo) + lo));
	}
	return a;
}

function randomLinked(length, lo, hi) {
	var a = new DoublyLinkedList();
	
	for (let i = 0; i < length; i++) {
		//a.push(Math.floor(Math.random() * (hi - lo) + lo));
		a.insertEnd(Math.floor(Math.random() * (hi - lo) + lo));
	}
	return a;
}

// console.log(new Date(), "random case sort with array");
// let a = randomArray(10000, 1, 999999);

// insertionSort(a);
// console.log(new Date(), "sorted case sort with array");

// insertionSort(a);
console.log(new Date(), "random case sort with DoublyLinkedList");

var list = randomLinked(10000, 100, 100000);
//console.log(list.toString());
insertionSortLinked(list);
console.log(new Date(), "sorted case sort with DoublyLinkedList");
insertionSortLinked(list);
console.log(new Date(), "finished");
