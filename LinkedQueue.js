
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

    enqueue(val){
		this._list.insertEnd(val);
		return this;
    }

    dequeueNode(){
		return this._list.deleteFirst();
    }

    dequeue(){
		return this._list.deleteFirst().val;
    }

    peek(){
		return this._list.head.val;
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
