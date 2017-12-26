
'use strict'

const should = require('should');
const BinarySearchTree = require("../BinarySearchTree");

let bst = null;

describe("Binary Search Tree", function(){
	beforeEach(() => {
		bst = new BinarySearchTree();
	});

	afterEach(() => {
		bst.clear();
	});

	it('should initialized with no nodes', function(){
		should.not.exist(bst.root);
	});
	
	it('should assign new node to root when tree is empty', function(){
		bst.add(1);
		should.equal(bst.root.val, 1 );
	});

	it('should insert value and returen instance', function(){
		let arr = [5,3,7,2,4,6,8,1,9];
		let rtInstance = arr.map(v => bst.add(v) ).every(r => r === bst);
		should.equal(rtInstance, true);

		[...bst.inOrder()].should.be.eql(arr.slice().sort());
		[...bst.levelOrder()].should.be.eql(arr);
	});

	it('should return true/false if exists/non-exists value', function(){
		let arr = [2,3,4,5,6,7,8], non = [1, 11, 10, 12, 0, -2];
		arr.forEach(v => bst.add(v));
		arr.every(v => bst.has(v)).should.be.true();
		non.some(v => bst.has(v)).should.be.false();
	});

	it('should delete the node with specified value', function(){
		let arr = [5,3,7,2,4,6,8,1,9];
		arr.forEach(v => bst.add(v));

		//case: root and has right.left child
		bst.delete(5);
		[...bst.levelOrder()].should.be.eql([6,3,7,2,4,8,1,9]);
		
		//case: root and has no right.left child
		bst.delete(6);
		[...bst.levelOrder()].should.be.eql([7,3,8,2,4,9,1]);
		bst.delete(7);
		[...bst.levelOrder()].should.be.eql([8, 3, 9, 2, 4, 1]);
		bst.delete(8);
		[...bst.levelOrder()].should.be.eql([9,3,2,4,1]);
		
		//case: root and has no right child
		bst.delete(9);
		[...bst.levelOrder()].should.be.eql([3,2,4,1]);
		
		//case: is not root and has no right child
		bst.delete(2);
		[...bst.levelOrder()].should.be.eql([3,1,4]);
		
		//case: is not root and has right child but has no right.left child
		bst.add(5);
		bst.delete(4);
		[...bst.levelOrder()].should.be.eql([3, 1, 5]);
		
		bst.delete(3);
		[...bst.levelOrder()].should.be.eql([5, 1]);
		bst.delete(1);
		[...bst.levelOrder()].should.be.eql([5]);
		
		bst.add(7).add(6).add(9).add(2).add(1).add(4).add(3);
		[...bst.levelOrder()].should.be.eql([5,2,7,1,4,6,9,3]);

		//case: is not root and has right.left child
		bst.delete(2);
		[...bst.levelOrder()].should.be.eql([5,3,7,1,4,6,9]);
	});
});

