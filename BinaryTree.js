
'use strict'

/* BinaryTree
 *
 *     root
 *    /        \
 *  left    right
 *
 *
 */

const Queue = require("./LinkedQueue");

function BinaryTreeNode(value){
	this.val = value;
	this.right = this.left = null;
}

module.exports = class BinaryTree{
    constructor(){
		this.root = null;
    }

	static Node(value){
		return new BinaryTreeNode(value);
	}
	
	static inOrder(tree, fn){
		return _inOrder(tree.root, fn);
	}

	static preOrder(tree, fn){
		return _preOrder(tree.root, fn);
	}

	static postOrder(tree, fn){
		return _postOrder(tree.root, fn);
	}

	static levelOrder(tree, fn){
		let queue = new Queue(), node = null;
		queue.enqueue(tree.root);
		
		while( queue.length > 0 ){
			node = queue.dequeue();
			if(node.left)
				queue.enqueue(node.left);

			if(node.right)
				queue.enqueue(node.right);

			fn(node);
		}
	}

	/* The number of edges from the root to the node
	 * val - the value of the node
	 */
	depth(val){
		if(undefined === val || null === val){
			return 0;
		}

		
	}
	
	/*
	 * [node] - is the root.val by default
	 */
	height(){
		
	}
	
    toString(){

    }

	toArray(){
		
	}

	toList(){
		
	}
	
    clear(){
		this.root = null;
    }
}

function _inOrder(node, fn){
	if(null === node)
		return;
	
	_inOrder(node.left, fn);
	fn(node);
	_inOrder(node.right, fn);
}

function _preOrder(node, fn){
	if(null === node)
		return;

	fn(node);
	_preOrder(node.left, fn);
	_preOrder(node.right, fn);
}

function _postOrder(node, fn){
	if(null === node)
		return;
	
	_postOrder(node.left, fn);
	_postOrder(node.right, fn);
	fn(node);
}

