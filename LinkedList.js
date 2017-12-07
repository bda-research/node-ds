
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
	return this.insertStartNode( _node(val) );
    }

    insertEnd(val){
	return this.insertEndNode( _node(val) );
    }
    
    get length(){
	return this._size;
    }

    traverse(fn){
	let tmp = this.head, rstArray = [];
	while(tmp){
            rstArray.push( fn?fn(tmp):tmp );
            tmp = tmp.next;
	}
	
	return rstArray;
    }
    
    toString(){
	return this.traverse(n=>n.val).join(" -> ");
    }
}

function _node(value){
    let n = Object.create(null);
    n.next = null;
    n.val = value;

    return n;
}
