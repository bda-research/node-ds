'use strict'

const should = require('should');
const ScapegoatTree = require("../ScapegoatTree");

let st = null;

describe("Scapegoat Tree", function(){
	beforeEach(() => {
		st = new ScapegoatTree();
	});

	afterEach(() => {
		st.clear();
	});

	it('should initialized with no nodes', function(){
		should.not.exist(st.root);
	});
	
	it('should assign new node to root when tree is empty', function(){
		st.add(1);
		should.equal(st.root.val, 1 );
	});

	it('should insert value and returen instance', function(){
		let arr = [5,3,7,2,4,6,8,1,9];
		let rtInstance = arr.map(v => st.add(v) ).every(r => r === st);
		should.equal(rtInstance, true);

		[...st.inOrder()].should.be.eql(arr.slice().sort());
		[...st.levelOrder()].should.be.eql(arr);
	});

	it('should return true/false if exists/non-exists value', function(){
		// will reconstruct from [2,3,4,5] to [4,3,5,2] when insert 4, cuz tree is inbalanced.
		let arr = [2,3,4,5,6,7,8], non = [1, 11, 10, 12, 0, -2];
		arr.forEach(v => st.add(v));
		arr.every(v => st.has(v)).should.be.true();
		non.some(v => st.has(v)).should.be.false();
	});

	it('should delete the node with specified value', function(){
		let arr = [5,3,7,2,4,6,8,1,9];
		arr.forEach(v => st.add(v));

		//case: root and has right.left child
		st.delete(5);
		[...st.levelOrder()].should.be.eql([3,7,2,4,6,8,1,9]);
		
		//case: root and has no right.left child
		st.delete(6);
		[...st.levelOrder()].should.be.eql([3,7,2,4,8,1,9]);
		st.delete(7);
		[...st.levelOrder()].should.be.eql([3,2,4,8,1,9]);
		st.delete(8);
		[...st.levelOrder()].should.be.eql([3,2,4,1,9]);
		
		//case: delete number over a half
		st.delete(2);
		[...st.levelOrder()].should.be.eql([4,3,9,1]);
		
		//case: is not root and has no right child
		st.delete(9);
		[...st.levelOrder()].should.be.eql([4,3,1]);
		
		//case: is not root and has right child but has no right.left child
		st.add(5);
		st.delete(4);
		[...st.levelOrder()].should.be.eql([3,1,5]);
		
		//case: delete number over a half
		st.delete(3);
		[...st.levelOrder()].should.be.eql([5,1]);
		st.delete(1);
		[...st.levelOrder()].should.be.eql([5]);
		
		// will reconstruct from [5,7,6,9] to [7,6,9,5] when inserting 9, cuz tree is inbalanced. same to when inserting 4
		st.add(7).add(6).add(9).add(2).add(1).add(4).add(3);
		[...st.levelOrder()].should.be.eql([5,2,7,1,4,6,9,3]);

		//case: is not root and has right.left child
		st.delete(2);
		[...st.levelOrder()].should.be.eql([5,7,1,4,6,9,3]);
	});
});
