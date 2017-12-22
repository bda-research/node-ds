
'use strict'

const should = require('should');
const BinaryTree = require('../BinaryTree');

let tree = null;

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
	it('should construct from root with pre-order and be same with preOrder() output', function(){
		let prev = null, arr = [1,2,3,4,5,6,7,8,9];
		for( let n of arr){
			let node = BinaryTree.Node(n);
			
			if(!prev){
				tree.root = node;
				prev = node;
			}else if(!prev.left){
				prev.left = node;
			}else if(!prev.left){
				prev.right = node;
				prev = node;
			}
		}
		
		BinaryTree.preOrder(tree, n=>{
			should.equal(arr.shift(), n.val);
		});
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
		BinaryTree.levelOrder(tree, n=>{
			should.equal(arr.shift(), n.val);
		});
	});

	it('should delete when clear() is called', function(){
		tree.root = BinaryTree.Node(1);
		should.exist(tree.root);
		tree.root.val.should.be.equal(1);
		tree.clear();
		should.not.exist(tree.root);
	});
});
