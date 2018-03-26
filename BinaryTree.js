
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
		this._root = null;
    }

	static Node(value){
		return new BinaryTreeNode(value);
	}
	
	*inOrder(){
		yield* _inOrder(this._root);
	}

	*preOrder(){
		yield* _preOrder(this._root);
	}

	*postOrder(){
		yield* _postOrder(this._root);
	}

	*levelOrder(){
        if(!this._root){
            return;
		}
		
		let queue = new Queue(), node = null;
		queue.enqueue(this._root);
		
		while( queue.length ){
			node = queue.dequeue();
			if(node.left)
				queue.enqueue(node.left);

			if(node.right)
				queue.enqueue(node.right);

			yield node.val;
		}
	}

	/* The number of edges from the root to the node
	 * val - the value of the node
	 */
	depth(val){
		if(undefined === val || null === val){
			return 0;
		}

		let queue = new Queue(), e = null;
		queue.enqueue({depth:0, node: this._root});
		
		while( queue.length ){
			e = queue.dequeue();
			
			if(val === e.node.val){
				return e.depth;
			}
			
			if(e.node.left)
				queue.enqueue({node: e.node.left, depth:e.depth + 1});

			if(e.node.right)
				queue.enqueue({node: e.node.right, depth:e.depth + 1});
		}
	}
	
	/*
	 * [node] - is the root.val by default
	 */
	height(){
		
	}

	toArray(){
		return [..._inOrder(this._root)];
	}

    clear(){
		this._root = null;
    }

	get root(){
		return this._root;
    }

	set root(value){
		this._root = value;
	}
}

function *_inOrder(node){
	if(null === node)
		return;
	
	yield* _inOrder(node.left);
	yield node.val;
	yield* _inOrder(node.right);
}

function *_preOrder(node){
	if(null === node)
		return;

	yield node.val;
	yield* _preOrder(node.left);
	yield* _preOrder(node.right);
}

function *_postOrder(node){
	if(null === node)
		return;
	
	yield* _postOrder(node.left);
	yield* _postOrder(node.right);
	yield node.val;
}

