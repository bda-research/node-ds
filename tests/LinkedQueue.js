
'use strict'

const should = require('should');

const LinkedQueue = require('../LinkedQueue.js');

let ts = function(){return this.name;};
let q = null;

describe("Linked Queue", function(){
	beforeEach(() => {
		q = new LinkedQueue();
	});

	afterEach(() => {
		q.clear();
	});

	it('should initialized with no nodes', function(){
		q.length.should.be.equal(0);
	});

	it('should have length equal to that queued', function(){
		let eles = [{name:"a", toString:ts}, {name:"b", toString:ts}, {name:"c", toString: ts}, {name:"d", toString: ts}];
		for(let ele of eles)
			q.enqueue(ele);
			
		q.length.should.be.equal(eles.length);
	});

	it('should add node at the end of the queue when enqueue() is called', function(){
		q.enqueue(1);
		q.peek().should.be.equal(1);
		q.enqueue(2);
		q.peek().should.be.equal(1);
	});
	
	it('should delete and return node at the beginning of the queue when dequeue() is called ', function(){
		q.enqueue(1);
		q.enqueue(2);

		q.peek().should.be.equal(1);
		q.dequeue().should.be.equal(1);
		q.peek().should.be.equal(2);
		q.dequeue().should.be.equal(2);
		q.length.should.be.equal(0);
	});

	it('should delete all nodes when clear() is called', function(){
		q.enqueue(1);
		q.enqueue(2);

		q.clear();
		q.length.should.be.equal(0);
	});

	it('should throw "InvalidOperation" error when dequeue() is called upon an empty queue', function(){
		q.dequeue.bind(q).should.throw(Error, {message: "InvalidOperation, the list is empty."});
	});
	
	it('should add/delete node of queue when enqueueNode()/dequeueNode() is called', function(){
		q.enqueue(1);
		q.enqueue(2);

		let n = q.dequeueNode();
		q.enqueueNode(n);
		q.peek().should.be.equal(2);
	});

	it('should return array of return value of fn(element) according to the enqueue order when traverse() is called', function(){
		let eles = [{name:"a", toString:ts}, {name:"b", toString:ts}, {name:"c", toString: ts}, {name:"d", toString: ts}];
		for(let ele of eles)
			q.enqueue(ele);

		q.traverse(e => e.name).should.be.eql(eles.map(e => e.name));// should deep equal because it is an array
	});

	it('should get string with "<->" between elements when toString() is called', function(){
		let eles = ["m", "n", "o", "p"];
		for(let ele of eles)
			q.enqueue(ele);

		q.toString().should.be.eql(eles.join(" <-> "));// should deep equal because it is an array
	});

	it('should return itself to support calling chain when enqueue() is called', function(){
		q.enqueue(1).should.be.eql(q);
	});
});
