[![npm package](https://nodei.co/npm/node-ds.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/node-ds/)

[![build status](https://secure.travis-ci.org/bda-research/node-ds.png)](https://travis-ci.org/bda-research/node-ds)
[![Coverage Status](https://coveralls.io/repos/github/bda-research/node-ds/badge.svg?branch=master)](https://coveralls.io/github/bda-research/node-ds?branch=master)
[![Dependency Status](https://david-dm.org/bda-research/node-ds/status.svg)](https://david-dm.org/bda-research/node-ds)
[![NPM download][download-image]][download-url]
[![NPM quality][quality-image]][quality-url]

[quality-image]: http://npm.packagequality.com/shield/node-ds.svg?style=flat-square
[quality-url]: http://packagequality.com/#?package=node-ds
[download-image]: https://img.shields.io/npm/dm/node-ds.svg?style=flat-square
[download-url]: https://npmjs.org/package/node-ds


# node-ds
A common data-structure and basic algorithm implemention in javascript

# Table of Contents

* [Quick Start](#quick-start)
  * [Installation](#installation)
* [Data Structures](#data-structures)
  * [Linear](#linear)
    * [Array](#array)
    * [Linked List](#linked-list)
	* [Doubly Linked List](#doubly-linked-list)
	* [Linked Queue](#linked-queue)
	* [Linked Stack](#linked-stack)
  * Binary Tree
    * Binary Tree
    * Binary Search Tree
    * Scapegoat Tree
    * Red-Black Tree
    * Heap
  * Graph
* [Algorithms](#algorithms)
  * [Sorting Algorithms](#sorting-algorithms)
    * [Insertion-Sort](#sorting-algorithms)
    * [Merge-Sort](#sorting-algorithms)
    * [Quick-Sort](#sorting-algorithms)
    * [Heap-Sort](#sorting-algorithms)
  * [Statistics Algorithms](#Grubbs)
    * [Grubbs](#Grubbs)
* [Test](#test)
* [Contributing to node-ds](#contributing-to-node-ds)

## Quick Start

### Installation
Installation is done using the npm install command:

```bash
$ npm install node-ds
```

## Data Structures

### Linear

#### Array

#### Linked List

##### insertStart(val)
 * `val` any

##### insertEnd(val)
 * `val` any
 
##### deleteFirst()
Returns the deleted node.

##### deleteLast()
Returns the deleted node.

##### traverse(fn)
 * `fn` Function
Apply fn to each node, and returns an array of elements returned by fn.

##### length
The number of nodes contained in the list.

##### head
Gets the first element of the LinkedList.

```javascript
	

```

#### Doubly Linked List
Same with LinkedList

```javascript


```

#### Linked Queue
Queue implemented by DoublyLinkedList

##### enqueueNode(node)
 * `node` [DoublyNode](#DoublyNode)
 Adds a node to the end of the Queue.
 
##### enqueue(val)
 * `val` any
 Adds an element to the end of the Queue.

##### dequeueNode()
Removes and returns the node<[DoublyNode](#DoublyNode)> at the beginning of the Queue.

##### dequeue()
Removes and returns the element at the beginning of the Queue.

##### traverse(fn)
* `fn` Function
Apply fn to each node, and returns an array of elements returned by fn.

##### peek()
Returns the element at the beginning of the Queue without removing it.

##### clear()
Removes all elements from the Queue.

##### length
The number of elements contained in the Queue

```javascript


```

#### Linked Stack
Stack implemented by DoublyLinkedList

##### pushNode(node)
 * `node` [DoublyNode](#DoublyNode)
 
##### push(val)
 * `val` any
 
##### popNode()
Removes and returns the node<[DoublyNode](#DoublyNode)> at the top of the Stack.

##### pop()
Removes and returns the element at the top of the Stack.

##### peek()
Returns the element at the top of the Stack without removing it.

##### clear()
Removes all elements from the Stack.

##### length
The size of queue

#### Others
##### DoublyNode
 * `prev` DoublyNode
 * `next` DoublyNode
 * `val` any

##### Node
 * `next` Node
 * `val` any


## Algorithms

### Sorting Algorithms

Sort the given array in ascending order, which is numerical order for number, alphabetic order for string. For array consisting of other data types, or if a customed order is prefered, a compare funtion must be specified. All sorting algorithms follow the same API. Check it out below.

* SortFamily
  * SortFamily.insertionSort(array[, compare[, lo, hi]]) or SortFamily.insertionSort(array[, lo, hi])
  * SortFamily.mergeSort(array[, compare[, lo, hi]]) or SortFamily.mergeSort(array[, lo, hi])
  * SortFamily.quickSort(array[, compare[, lo, hi]]) or SortFamily.quickSort(array[, lo, hi])
  * SortFamily.heapSort(array[, compare[, lo, hi]]) or SortFamily.heapSort(array[, lo, hi])
  * `options`:
    * array: array to sort, must be javascript `Array` object
    * compare: optional, a function(@return 1 or -1 or 0) telling in what order an element should be sorted. If `compare(a, b) > 0`, a will be placed after b, vice versa. If `compare(a, b) = 0`, the order of a and b will depend on the sorting algorithm. If `compare` is not specified, numbers will be sorted in numerical order, strings will be sorted in alphabetic order(according to gb2312 code point, if string cannot be encoded with gb2312, an error will be thrown)
    * lo: optional, default `0`
    * hi: optional, default `array.length - 1`

Check some examples out below:

<pre><code>
const SortFamily = require('node-ds/SortFamily.js');
const Random = require('node-ds/Random.js');

let a = [5,7,8,9,1,3,2,4,6];
function compare(a, b) {
    if (a > b) return -1;
    if (b > a) return 1;
    return 0;
}

SortFamily.insertionSort(a); // outputs [1, 2, 3, 4, 5, 6, 7, 8, 9]

SortFamily.insertionSort(a, compare); // outputs [9, 8, 7, 6, 5, 4, 3, 2, 1]

Random.shuffle(a); // say [6, 7, 9, <b>2, 3, 5, 1</b>, 8, 4]
SortFamily.insertionSort(a, 3, 6); // outputs [6, 7, 9, <b>1, 2, 3, 5</b>, 8, 4]

Random.shuffle(a); // say [6, 9, 3, <b>1, 4, 2, 8</b>, 5, 7]
SortFamily.insertionSort(a, compare, 3, 6); // outputs [6, 9, 3, <b>8, 4, 2, 1</b>, 5, 7]
</code></pre>

### Statistics Algorithms

Find out outliers from the given data array based on some basic mathematical calculation(average、stdev).

* Grubbs

<pre><code>
const Grubbs = require('node-ds/Grubbs.js');

let data = [7, 9, 2, 6, 3, 5, 7, 2, 4, 20];
let grubbs = new Grubbs(data);
grubbs.getOutliers();//outputs [9], means the number 20 is outlier

</code></pre>

## Test
Like most other packages, just run test suite and check code coverage by following commands:

```bash
$ npm test
$ npm run cover
```

## Contributing to node-ds
