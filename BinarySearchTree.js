
'use strict'

const BinaryTree = require("./BinaryTree");

module.exports = class BinarySearchTree extends BinaryTree{
	add(value){
		let c = this._root, p = null, n = BinaryTree.Node(value);
		
		if(!c){
			this._root = n;
			return this;
		}
		
		_insert(c, p, n);
		return this;
	}

	delete(value){
		let cur = this._root, parent = null;
		while(cur){
			if(value === cur.val){
				break;
			}else if(value < cur.val){
				parent = cur;
				cur = cur.left;
			}else{
				parent = cur;
				cur = cur.right;
			}
		}

		if(!cur)
			return false;

		let isLeft = parent && parent.left === cur;
		
		if(!cur.right){// has no right sub-tree
			if(!parent){
				this._root = cur.left;
			}else if(isLeft){
				parent.left = cur.left;
			}else{
				parent.right = cur.left;
			}
		}else if(!cur.right.left){
			if(!parent){
				this._root = cur.right;
				cur.right.left = cur.left;
			}else if(isLeft){
				parent.left = cur.right;
			}else{
				parent.right = cur.right;
			}
		}else{
			let n = cur.right.left, pp = cur.right;
			while(n.left){
				pp = n;
				n = n.left;
			}

			pp.left = null;

			if(!parent){
				this._root = n;
				n.right = cur.right;
				n.left = cur.left;
			}else if(isLeft){
				parent.left = n;
				n.left = cur.left;
				n.right = cur.right;
			}else{
				parent.right = n;
				n.left = cur.left;
				n.right = cur.right;
			}
		}
	}
	
	has(value){
		let cur = this._root;
		
		while(cur){
			if(value === cur.val){
				return true;
			}else if(value < cur.val){
				cur = cur.left;
			}else if(value > cur.val){
				cur = cur.right;
			}
		}

		return false;
	}
}

function _insert(c, p, n){
	if(!c){
		if(n.val < p.val){
			p.left = n;
		}else{
			p.right = n;
		}
		return;
	}

	if(n.val < c.val){
		_insert(c.left, c, n);
	}else if(n.val > c.val){
		_insert(c.right, c, n);
	}

	// discard the duplicate value
}
