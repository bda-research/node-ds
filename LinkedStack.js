
'use strict'

const DoublyLinkedList = require('./DoublyLinkedList.js')

module.exports = class LinkedStack{
    constructor(){
	this._list = new DoublyLinkedList();
    }

    pushNode(node){
	this._list.insertEndNode(node);
	return this;
    }

    push(val){
	this._list.insertEnd(val);
	return this;
    }

    popNode(){
	return this._list.deleteLast();
    }

    pop(){
	return this._list.deleteLast().val;
    }

    peek(){
	return this._list.tail.val;
    }
    
    get length(){
	return this._list.length;
    }

    traverse(fn){
	return this._list.traverse(fn);
    }

    toString(){
	return this._list.toString();
    }

    clear(){
	this._list.clear();
    }
}
