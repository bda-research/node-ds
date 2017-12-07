
'use strict'

const DoublyLinkedList = require('./DoublyLinkedList.js')

module.exports = class LinkedQueue{
    constructor(){
	this._list = new DoublyLinkedList();
    }

    enqueueNode(node){
	this._list.insertEndNode(node);
	return this;
    }

    enqueueValue(val){
	this._list.insertEnd(val);
	return this;
    }

    dequeueNode(){
	return this._list.deleteFirst();
    }

    dequeueValue(){
	return this._list.deleteFirst().val;
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
}
