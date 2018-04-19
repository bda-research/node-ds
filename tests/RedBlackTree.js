'use strict'

const should = require('should');
const RedBlackTree = require("../RedBlackTree");

let rbt = null;

describe("Red Black Tree", function () {
	beforeEach(() => {
		rbt = new RedBlackTree();
	});

	afterEach(() => {
		rbt.clear();
	});

	it('should initialized with no nodes', function () {
		should.not.exist(rbt.root);
	});

	it('should assign new node to root when tree is empty', function () {
		rbt.add(1);
		should.equal(rbt.root.val, 1);
	});

	it('should insert value and returen instance', function () {
		// INSERT SITUATION
		// 	1		newNode is the treeRoot
		// 	2		newNode's parent is BLACK
		// 	3		newNode's parent and uncle is both RED
		// 	4		newNode's parent is RED and newNode's uncle is BLACK or null, newNode is parent's right and parent is parent's parent's left
		// 	5		newNode's parent is RED and newNode's uncle is BLACK or null, newNode is parent's left and parent is parent's parent's left

		// INSERT SITUATION 1
		rbt.add(12);
		[...rbt.levelOrder()].should.be.eql([12]);

		// INSERT SITUATION 2
		rbt.add(1);
		[...rbt.levelOrder()].should.be.eql([12, 1]);

		// INSERT SITUATION 1
		rbt.add(9);
		[...rbt.levelOrder()].should.be.eql([9, 1, 12]);

		// INSERT SITUATION 3
		rbt.add(2);
		[...rbt.levelOrder()].should.be.eql([9, 1, 12, 2]);

		// INSERT SITUATION 2
		rbt.add(0);
		[...rbt.levelOrder()].should.be.eql([9, 1, 12, 0, 2]);

		// INSERT SITUATION 2
		rbt.add(11);
		[...rbt.levelOrder()].should.be.eql([9, 1, 12, 0, 2, 11]);

		// INSERT SITUATION 3
		rbt.add(7);
		[...rbt.levelOrder()].should.be.eql([9, 1, 12, 0, 2, 11, 7]);

		// INSERT SITUATION 2
		rbt.add(19);
		[...rbt.levelOrder()].should.be.eql([9, 1, 12, 0, 2, 11, 19, 7]);

		// INSERT SITUATION 4
		rbt.add(4);
		[...rbt.levelOrder()].should.be.eql([9, 1, 12, 0, 4, 11, 19, 2, 7]);

		// INSERT SITUATION 2
		rbt.add(15);
		[...rbt.levelOrder()].should.be.eql([9, 1, 12, 0, 4, 11, 19, 2, 7, 15]);

		// INSERT SITUATION 4
		rbt.add(18);
		[...rbt.levelOrder()].should.be.eql([9, 1, 12, 0, 4, 11, 18, 2, 7, 15, 19]);

		// INSERT SITUATION 3
		rbt.add(5);
		[...rbt.levelOrder()].should.be.eql([9, 1, 12, 0, 4, 11, 18, 2, 7, 15, 19, 5]);

		// INSERT SITUATION 3
		rbt.add(14);
		[...rbt.levelOrder()].should.be.eql([9, 1, 12, 0, 4, 11, 18, 2, 7, 15, 19, 5, 14]);

		// INSERT SITUATION 5
		rbt.add(13);
		[...rbt.levelOrder()].should.be.eql([9, 1, 12, 0, 4, 11, 18, 2, 7, 14, 19, 5, 13, 15]);

		// INSERT SITUATION 2
		rbt.add(10);
		[...rbt.levelOrder()].should.be.eql([9, 1, 12, 0, 4, 11, 18, 2, 7, 10, 14, 19, 5, 13, 15]);

		// INSERT SITUATION 3
		rbt.add(16);
		[...rbt.levelOrder()].should.be.eql([9, 1, 14, 0, 4, 12, 18, 2, 7, 11, 13, 15, 19, 5, 10, 16]);

		// INSERT SITUATION 4
		rbt.add(6);
		[...rbt.levelOrder()].should.be.eql([9, 1, 14, 0, 4, 12, 18, 2, 6, 11, 13, 15, 19, 5, 7, 10, 16]);

		// INSERT SITUATION 2
		rbt.add(3);
		[...rbt.levelOrder()].should.be.eql([9, 1, 14, 0, 4, 12, 18, 2, 6, 11, 13, 15, 19, 3, 5, 7, 10, 16]);

		// INSERT SITUATION 3
		rbt.add(8);
		[...rbt.levelOrder()].should.be.eql([9, 4, 14, 1, 6, 12, 18, 0, 2, 5, 7, 11, 13, 15, 19, 3, 8, 10, 16]);

		// INSERT SITUATION 4
		rbt.add(17);
		[...rbt.levelOrder()].should.be.eql([9, 4, 14, 1, 6, 12, 18, 0, 2, 5, 7, 11, 13, 16, 19, 3, 8, 10, 15, 17]);

	});

	it('should return true/false if exists/non-exists value', function () {
		// will reconstruct from [2,3,4,5] to [4,3,5,2] when insert 4, cuz tree is inbalanced.
		let arr = [2, 3, 4, 5, 6, 7, 8], non = [1, 11, 10, 12, 0, -2];
		arr.forEach(v => rbt.add(v));
		arr.every(v => rbt.has(v)).should.be.true();
		non.some(v => rbt.has(v)).should.be.false();
	});

	it('should delete the node with specified value', function () {
		// DELETE SITUATION
		// 	1		nodeToDelete is the treeRoot
		// 	2		nodeToDelete's brother is RED
		// 	3		nodeToDelete's brother is BLACK and both its children is BLACK and nodeToDelete's parent is BLACK
		// 	4		nodeToDelete's brother is BLACK and both its children is BLACK and nodeToDelete's parent is RED
		// 	5		nodeToDelete's brother is BLACK and its left is RED and its right is BLACK and nodeToDelete is nodeToDelete's parent's left
		// 	6		nodeToDelete's brother is BLACK and its right is RED and nodeToDelete is nodeToDelete's parent's left

		let arr = [12, 1, 9, 2, 0, 11, 7, 19, 4, 15, 18, 5, 14, 13, 10, 16, 6, 3, 8, 17];
		arr.forEach(v => rbt.add(v));

		// DELETE SITUATION 2
		rbt.delete(12);
		[...rbt.levelOrder()].should.be.eql([9, 4, 14, 1, 6, 11, 18, 0, 2, 5, 7, 10, 13, 16, 19, 3, 8, 15, 17]);

		// DELETE SITUATION 2
		rbt.delete(1);
		[...rbt.levelOrder()].should.be.eql([9, 4, 14, 2, 6, 11, 18, 0, 3, 5, 7, 10, 13, 16, 19, 8, 15, 17]);

		// DELETE SITUATION 1
		rbt.delete(9);
		[...rbt.levelOrder()].should.be.eql([10, 4, 14, 2, 6, 11, 18, 0, 3, 5, 7, 13, 16, 19, 8, 15, 17]);

		// DELETE SITUATION 2
		rbt.delete(2);
		[...rbt.levelOrder()].should.be.eql([10, 4, 14, 3, 6, 11, 18, 0, 5, 7, 13, 16, 19, 8, 15, 17]);

		// DELETE SITUATION 4
		rbt.delete(0);
		[...rbt.levelOrder()].should.be.eql([10, 4, 14, 3, 6, 11, 18, 5, 7, 13, 16, 19, 8, 15, 17]);

		// DELETE SITUATION 2
		rbt.delete(11);
		[...rbt.levelOrder()].should.be.eql([10, 4, 14, 3, 6, 13, 18, 5, 7, 16, 19, 8, 15, 17]);

		// DELETE SITUATION 4
		rbt.delete(7);
		[...rbt.levelOrder()].should.be.eql([10, 4, 14, 3, 6, 13, 18, 5, 8, 16, 19, 15, 17]);

		// DELETE SITUATION 6
		rbt.delete(19);
		[...rbt.levelOrder()].should.be.eql([10, 4, 14, 3, 6, 13, 16, 5, 8, 15, 18, 17]);

		// DELETE SITUATION 6
		rbt.delete(4);
		[...rbt.levelOrder()].should.be.eql([10, 5, 14, 3, 6, 13, 16, 8, 15, 18, 17]);

		// DELETE SITUATION 5
		rbt.delete(15);
		[...rbt.levelOrder()].should.be.eql([10, 5, 14, 3, 6, 13, 17, 8, 16, 18]);

		// DELETE SITUATION 4
		rbt.delete(18);
		[...rbt.levelOrder()].should.be.eql([10, 5, 14, 3, 6, 13, 17, 8, 16]);

		// DELETE SITUATION 3
		rbt.delete(5);
		[...rbt.levelOrder()].should.be.eql([10, 6, 14, 3, 8, 13, 17, 16]);

		// DELETE SITUATION 3
		rbt.delete(14);
		[...rbt.levelOrder()].should.be.eql([10, 6, 16, 3, 8, 13, 17]);

		// DELETE SITUATION 3
		rbt.delete(13);
		[...rbt.levelOrder()].should.be.eql([10, 6, 16, 3, 8, 17]);

		// DELETE SITUATION 1
		rbt.delete(10);
		[...rbt.levelOrder()].should.be.eql([16, 6, 17, 3, 8]);

		// DELETE SITUATION 1
		rbt.delete(16);
		[...rbt.levelOrder()].should.be.eql([6, 3, 17, 8]);

		// DELETE SITUATION 1
		rbt.delete(6);
		[...rbt.levelOrder()].should.be.eql([8, 3, 17]);

		// DELETE SITUATION 3
		rbt.delete(3);
		[...rbt.levelOrder()].should.be.eql([8, 17]);

		// DELETE SITUATION 1
		rbt.delete(8);
		[...rbt.levelOrder()].should.be.eql([17]);

		// DELETE SITUATION 1
		rbt.delete(17);
		[...rbt.levelOrder()].should.be.eql([]);
	});
});
