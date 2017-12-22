
'use strict'

const should = require('should');
const LinkedList = require('../LinkedList.js');

let ll = null
, ts = function(){return this.name;}
, numElements = [24, 34, 21, 35]
, strElements = ["mark", "bbc", "john", "lucas"]
, objElements = strElements.map( (str, i)=>{ return {name: str, age: i}});

function initLL(ll, type){
	let eles = null;
	
	switch(type){
	case "string":
		eles = strElements;
		break;
	case "number":
		eles = numElements
		break;
	case "object":
		eles = objElements
		break;
	default:
		eles = numElements
		break;
	}

	eles.forEach( e => ll.insertStart(e) );
}

describe("Linked List", function(){
	beforeEach(() => {
		ll = new LinkedList();
	});

	afterEach(() => {
		ll.clear();
	});

	it('should initialized with no nodes', function(){
		ll.length.should.be.equal(0);
		should.not.exist(ll.head);
	});

	it('should add element at the end of the list when insertEnd() is called', function(){
		for(let i = 0; i < strElements.length; i++){
			let ele = strElements[i];
			
			ll.insertEnd(ele);
			ll.length.should.be.equal(i+1);
			let cur = ll.head;
			while(cur.next)
				cur = cur.next;

			cur.val.should.be.equal(ele);
		}
	});
	
	it('should add element at the beginning of the list when insertStart() is called', function(){
		for(let i = 0; i < strElements.length; i++){
			let ele = strElements[i];
			
			ll.insertStart(ele);
			ll.length.should.be.equal(i+1);
			ll.head.val.should.be.equal(ele);
		}
	});

	it('should delete and return node at the beginning of the list when deleteFirst() is called', function(){
		let arr = numElements;
		
		for(let ele of arr){
			ll.insertStart(ele);
		}

		for(let i=0; i<arr.length; i++){
			let n = ll.deleteFirst();
			n.val.should.be.equal(arr[arr.length -1 - i]);
			should.not.exist(n.next);
			
			if(i < arr.length - 1){
				ll.head.val.should.be.equal( arr[arr.length - 2 - i] );
			}
			
			ll.length.should.be.equal(arr.length - 1 - i);
		}
	});
	
	it('should delete and return node at the end of the list when deleteLast() is called ', function(){
		let arr = ["mike", "bbc", "john", "lucas"], idx = arr.length - 1;
		for(let ele of arr){
			ll.insertStart(ele);
		}
		
		for(let i=0; i<arr.length; i++){
			ll.deleteLast().val.should.be.equal(arr[i]);
			if(i < arr.length - 1){
				let cur = ll.head;
				
				while(cur.next) // the next pointer of previous node should be null
					cur=cur.next;

				cur.val.should.be.equal(arr[i+1]);
			}

			ll.length.should.be.eql(idx -i);
		}
	});

	it('should add node at the end of the list when insertEndNode() is called', function(){
		initLL(ll);
		let nodes = [];
		while(ll.length)
			nodes.push(ll.deleteFirst());

		for(let i=0; i < nodes.length; i++){
			ll.insertEndNode(nodes[i]);
			let cur = ll.head;
			while(cur.next)
				cur = cur.next;

			cur.should.be.equal(nodes[i]);
			ll.length.should.be.equal(i + 1);
		}
	});
	
	it('should add node at the beginning of the list when insertStartNode() is called', function(){
		initLL(ll);
		let nodes = [];
		while(ll.length)
			nodes.push(ll.deleteFirst());

		for(let i=0; i < nodes.length; i++){
			ll.insertStartNode(nodes[i]);
			ll.head.should.be.equal(nodes[i]);
			ll.length.should.be.equal(i + 1);
		}
	});

	it('should delete all nodes when clear() is called', function(){
		initLL(ll, "string");
		ll.length.should.be.equal(strElements.length);
		
		ll.clear();
		ll.length.should.be.equal(0);
		should.not.exist(ll.head);
	});

	it('should throw "InvalidOperation" error when deleteFirst()/deleteLast() is called upon an empty list', function(){
		ll.deleteLast.bind(ll).should.throw(Error, {message: "InvalidOperation, the list is empty."});
		ll.deleteFirst.bind(ll).should.throw(Error, {message: "InvalidOperation, the list is empty."});
	});
	
	it('should return array of return value of fn(element) according to the enqueue order when traverse() is called', function(){
		let eles = [{name:"a", toString:ts}, {name:"b", toString:ts}, {name:"c", toString: ts}, {name:"d", toString: ts}];
		for(let ele of eles)
			ll.insertEnd(ele);

		ll.traverse(e => e.name).should.be.eql(eles.map(e => e.name));// should deep equal because it is an array
	});

	it('should get string with "<->" between elements when toString() is called', function(){
		let eles = ["m", "n", "o", "p"];
		for(let ele of eles)
			ll.insertEnd(ele);

		ll.toString().should.be.eql(eles.join(" -> "));// should deep equal because it is an array
	});

	it('should return itself to support calling chain when insertStart[Node]()/insertEnd[Node]() is called', function(){
		strElements.forEach(ele => {
			ll.insertEnd(ele).should.be.equal(ll);
			let n = ll.deleteLast();
			ll.insertEndNode(n).should.be.equal(ll);
			ll.clear();
			
			ll.insertStart(ele).should.be.equal(ll);
			n = ll.deleteFirst();
			ll.insertStartNode(n).should.be.equal(ll);
		});
	});
});
