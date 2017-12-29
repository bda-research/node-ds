
"use strict"

const Stack = require("../LinkedStack");
const BinaryTree = require("../BinaryTree");
const should = require('should');

const construct = function(tree){
	tree.root = BinaryTree.Node(5);
	tree.root.left = BinaryTree.Node(3);
	tree.root.right = BinaryTree.Node(7);
	tree.root.left.left = BinaryTree.Node(2);
	tree.root.left.right = BinaryTree.Node(4);
	tree.root.right.left = BinaryTree.Node(6);
	tree.root.right.right = BinaryTree.Node(8);
}

function mock(n){
	let stack = new Stack(), result = 0;
	stack.push({num:n, status:0});
	
	while(stack.length){
		let cur = stack.peek();
		let status = cur.status++;
		
		if(status === 0){
			if(cur.num===1){
				result = 1;
				stack.pop();
			}
		}else if (status === 1){
			stack.push({num: cur.num -1, status:0});
		}else if(status === 2){
			result = result + cur.num;
			stack.pop();
		}
	}
	
	return result;
}

function *mockTraverse(tree){
	let stack = new Stack(), cur = null;
	
	stack.push({node: tree.root, status: 0});// calling function
	let status = 0;
	while(stack.length){
		cur = stack.peek(); // executing function
		status= cur.status ++;

		if(status === 0){
			if(!cur.node){
				stack.pop();// remove context
			}
		}else if(status === 1){
			stack.push({node: cur.node.left, status: 0});
		}else if(status === 2){
			yield cur.node.val;
		}else if(status === 3){
			stack.push({node: cur.node.right, status: 0});
		}else{
			stack.pop(); // remove context
		}
		//mock function stack end
	}
}

function recursion(n){
	if(n===1) return 1;

	return n + recursion(n-1);
}

describe("Mock recursion", function(){
	beforeEach(() => {
		
	});

	afterEach(() => {
		
	});

	it('should execute recursively', function(){
		let n = 10;
		recursion(n).should.be.equal(55);
	});

	it('should have same result with recursion using stack', function(){
		let n = 10;
		mock(n).should.be.equal(55);
	});

	it('should work without recursion', function(){
		let tree = new BinaryTree(), arr = [ 2, 3, 4, 5, 6, 7, 8 ];
		construct(tree);
		[...tree.inOrder()].should.be.eql(arr);
		[...mockTraverse(tree)].should.be.eql(arr);
	});
});
