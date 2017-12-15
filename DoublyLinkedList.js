
'use strict'

module.exports = class DoublyLinkedList{
    constructor(){
		this._size = 0;
		this.head = this.tail = null;
    }

    insertStartNode(node){
		if(null === this.head){
            this.head = this.tail = node;
		}else{
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
		}

		++this._size;
		return this;
    }
    
    insertEndNode(node){
		if(null === this.head){
			this.head = this.tail = node;
		}else{
			this.tail.next = node;
			node.prev = this.tail;
			this.tail = node;
		}

		++this._size;
		return this;
    }

    insertStart(val){
		return this.insertStartNode( _node(val) );
    }

    insertEnd(val){
		return this.insertEndNode( _node(val) );
    }

    deleteLast(){
		if(null === this.tail){
			throw new Error("InvalidOperation, the list is empty.");
		}

		let n = this.tail;
		this.tail = this.tail.prev;
		if(this.tail){
            this.tail.next = null;
		}else{
            this.head = null;
		}
		
		n.prev = null;
		--this._size;
		return n;
    }

    deleteFirst(){
		if(null === this.head){
			throw new Error("InvalidOperation, the list is empty.");
		}

		let n = this.head;
		this.head = this.head.next;
		if(this.head){
			this.head.prev = null;
		}else{
			this.tail = null;
		}

		n.next = null;
		--this._size;
		return n;
    }
    
    traverse(fn){
		let tmp = this.head, rstArray = [];
		while(tmp){
            rstArray.push( fn?fn(tmp.val):tmp.val );
            tmp = tmp.next;
		}
		
		return rstArray;
    }

    // [Symbol.iterator]() {
    // 	let tmp = this.head;
    // 	return {
    // 	    next:()=>{
	
    // 		return {done: true}
    // 	    }
    // 	};
    // }
    
    get length(){
		return this._size;
    }
    
    toString(){
		return this.traverse().join(" <-> ");
    }

    clear(){
		while(this._size){
			this.deleteLast();
		}
    }
}

function _node(value){
    let n = Object.create(null);
    n.next = null;
    n.prev = null;
    n.val = value;

    return n;
}
