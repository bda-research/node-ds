
'use strict'

const should = require('should');
const BinaryTree = require('../BinaryTree');

let tree = null;

const construct = function(tree){
	tree.root = BinaryTree.Node(5);
	tree.root.left = BinaryTree.Node(3);
	tree.root.right = BinaryTree.Node(7);
	tree.root.left.left = BinaryTree.Node(2);
	tree.root.left.right = BinaryTree.Node(4);
	tree.root.right.left = BinaryTree.Node(6);
	tree.root.right.right = BinaryTree.Node(8);
}

describe("Binary Tree", function(){
	beforeEach(() => {
		tree = new BinaryTree();
	});

	afterEach(() => {
		tree.clear();
	});

	it('should initialized with no nodes', function(){
		should.not.exist(tree.root);
	});

	it('should allow set root', function(){
		tree.root = BinaryTree.Node(1);
		should.exist(tree.root);
		tree.root.val.should.be.equal(1);
	});

	/*                 1
	 *               /    \
	 *             2       3
	 *                    /    \
	 *                  4       5
	 *                         /     \
	 *	                      6        7
	 *                               /    \
	 *                            8         9
	 *
	 */
	it('should traverse `current`, `left` and `right` order when preOrder() is called', function(){
		construct(tree);
		let arr = [5, 3, 2, 4, 7, 6, 8];
		
		[...tree.preOrder()].should.be.eql(arr);
		
		for(let ele of tree.preOrder()){
			should.equal(ele, arr.shift());
		}
	});

	/*                 1
	 *               /    \
	 *             2       3
	 *           /  \     /   \
	 *         4     5  6     7
	 *       /   \
	 *     8      9
	 *
	 */
	it('should construct from root with level-order and be same with levelOrder() output', function(){
		let arr = [1,2,3,4,5,6,7,8,9], queue = [];
		let buildFullBinaryTree = function(arr){
			tree.root = BinaryTree.Node(arr[0]);
			queue.push(tree.root);
			let parent = queue.shift();
			for(let i=1; i < arr.length; i++){
				let n = BinaryTree.Node(arr[i]);
				if(!parent.left){
					parent.left = n;
					queue.push(parent.left);
				}else if(!parent.right){
					parent.right = n;
					queue.push(parent.right);
				}else{// full
					parent = queue.shift();
					parent.left = n;
				}
			}
		}

		buildFullBinaryTree(arr);
		
		[...tree.levelOrder()].should.be.eql(arr);// support extended function
		
		for(let ele of tree.levelOrder()){// support for...of loop
			should.equal(ele, arr.shift());
		}
	});

	it('should traverse `left`, `current` and `right` order when inOrder() is called', function(){
		construct(tree);

		let arr = [2,3,4,5,6,7,8];
		
		[...tree.inOrder()].should.be.eql(arr);
		
		for(let ele of tree.inOrder()){
			ele.should.be.equal(arr.shift());
		}
	});

	it('should traverse `left`, `right` and `current` order when postOrder() is called', function(){
		construct(tree);
		
		let arr = [2,4,3,6,8,7,5];
		
		[...tree.postOrder()].should.be.eql(arr);
		
		for(let ele of tree.postOrder()){
			ele.should.be.equal(arr.shift());
		}
	});

	it('should return the number of edges from the root to the node', function(){
		construct(tree);

		tree.depth(tree.root.val).should.be.equal(0);
		tree.depth(tree.root.left.val).should.be.equal(1);
		tree.depth(tree.root.right.val).should.be.equal(1);
		tree.depth(tree.root.left.left.val).should.be.equal(2);
		tree.depth(tree.root.left.right.val).should.be.equal(2);
		tree.depth(tree.root.right.left.val).should.be.equal(2);
		tree.depth(tree.root.right.right.val).should.be.equal(2);
	});
	
	it('should delete when clear() is called', function(){
		tree.root = BinaryTree.Node(1);
		should.exist(tree.root);
		tree.root.val.should.be.equal(1);
		tree.clear();
		should.not.exist(tree.root);
	});
});
