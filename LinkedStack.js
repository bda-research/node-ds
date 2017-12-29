
'use strict'

const LinkedList = require('./LinkedList.js')

module.exports = class LinkedStack{
    constructor(){
		this._list = new LinkedList();
    }

    pushNode(node){
		this._list.insertStartNode(node);
		return this;
    }

    push(val){
		this._list.insertStart(val);
		return this;
    }

    popNode(){
		return this._list.deleteFirst();
    }

    pop(){
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
