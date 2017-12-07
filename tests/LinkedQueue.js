
'use strict'

const assert = require('assert');
const LinkedQueue = require('../LinkedQueue.js')

let ts = function(){return this.name;};
let ll = new LinkedQueue();
ll
    .enqueueValue({name:"a", toString:ts})
    .enqueueValue({name:"b", toString:ts})
    .enqueueValue({name:"c", toString: ts})
    .enqueueValue({name:"d", toString: ts});

console.log(ll.toString());

assert.equal(ll.length, 4, "incorrect length");

assert.equal(ll.dequeueNode().val.name, "a");
assert.equal(ll.dequeueNode().val.name, "b");

assert.equal(ll.length, 2, "incorrect length");

ll.enqueueValue({name:"e", toString: ts});
ll.enqueueValue({name:"f", toString: ts});

assert.equal(ll.length, 4, "incorrect length");


ll.dequeueNode();
ll.dequeueNode();
ll.dequeueNode();
ll.dequeueNode();

assert.equal(ll.length, 0, "incorrect length");

ll.enqueueValue({name:"x", toString: ts});
ll.enqueueValue({name:"y", toString: ts});

assert.equal(ll.length, 2, "incorrect length");
console.log("[LinkedQueue] All test cases passed!");
