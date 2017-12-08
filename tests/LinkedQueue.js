
'use strict'

const assert = require('assert');
const LinkedQueue = require('../LinkedQueue.js')

let ts = function(){return this.name;};
let ll = new LinkedQueue();
ll
    .enqueue({name:"a", toString:ts})
    .enqueue({name:"b", toString:ts})
    .enqueue({name:"c", toString: ts})
    .enqueue({name:"d", toString: ts});

console.log(ll.toString());

assert.equal(ll.length, 4, "incorrect length");

assert.equal(ll.dequeueNode().val.name, "a");
assert.equal(ll.dequeueNode().val.name, "b");

assert.equal(ll.length, 2, "incorrect length");

ll.enqueue({name:"e", toString: ts});
ll.enqueue({name:"f", toString: ts});

assert.equal(ll.length, 4, "incorrect length");


ll.dequeueNode();
ll.dequeueNode();
ll.dequeueNode();
ll.dequeueNode();

assert.equal(ll.length, 0, "incorrect length");

ll.enqueue({name:"x", toString: ts});
ll.enqueue({name:"y", toString: ts});

assert.equal(ll.length, 2, "incorrect length");

ll.clear();
assert.equal(ll.length, 0);
console.log("[LinkedQueue] All test cases passed!");
