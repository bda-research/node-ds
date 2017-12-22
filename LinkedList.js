
'use strict'

module.exports = class LinkedList{
    constructor(){
		this._size = 0;
		this.head = null;
    }

    insertStartNode(node){
        node.next = this.head;
        this.head = node;
		
		++this._size;
		return this;
    }
    
    insertEndNode(node){
		if(null === this.head){
			this.head = node;
			++this._size;
			return this;
		}
		
		let tmp = this.head;
		while(tmp.next){
			tmp = tmp.next;
		}

		tmp.next = node;
		++this._size;
		return this;
    }

    insertStart(val){
		return this.insertStartNode( new Node(val) );
    }

    insertEnd(val){
		return this.insertEndNode( new Node(val) );
    }

    deleteFirst(){
		if(null === this.head){
			throw new Error("InvalidOperation, the list is empty.");
		}

		let n = this.head;
		this.head = this.head.next;

		n.next = null;
		--this._size;
		return n;
    }

    deleteLast(){
		if(null === this.head){
			throw new Error("InvalidOperation, the list is empty.");
		}

		let p1 = this.head, p2 = p1.next;
		
		if(null === p2){
			this.head = null;
			--this._size;
			return p1;
		}
		
		while(p2.next){
			p1= p2;
			p2 = p2.next;
		}

		p1.next = null;
		--this._size;
		return p2;
    }
    
    get length(){
		return this._size;
    }

    traverse(fn){
		let tmp = this.head, rstArray = [];
		while(tmp){
            rstArray.push( fn?fn(tmp.val):tmp.val );
            tmp = tmp.next;
		}
		
		return rstArray;
    }
    
    toString(){
		return this.traverse().join(" -> ");
    }

    clear(){
		while(this._size){
			this.deleteFirst();
		}
    }
}

function Node(value){
	this.next = null;
	this.val = value;
}
