# node-ds
A common data-structure and basic algorithm implemention in javascript

# Table of Contents

* [Data Structures](#data-structures)
  * [Linear](#linear)
    * [Linked List](#linked-list)
	* [Doubly Linked List](#doubly-linked-list)
	* [Linked Queue](#linked-queue)
	* [Linked Stack](#linked-stack)
  * Tree
  * Graph
* [Algorithms](#algorithms)
* [Contributing to node-ds](#contributing-to-node-ds)

## Data Structures

### Linear

#### Linked List

##### insertStart(val)
 * `val` any

##### insertEnd(val)
 * `val` any
 
##### deleteFirst()
Returns the deleted node.

##### deleteLast()
Returns the deleted node.

##### traverse(fn)
 * `fn` Function
Apply fn to each node, and returns an array of elements returned by fn.

##### length
The number of nodes contained in the list.

##### head
Gets the first element of the LinkedList.

```javascript
	

```

#### Doubly Linked List
Same with LinkedList

```javascript


```

#### Linked Queue
Queue implemented by DoublyLinkedList

##### enqueueNode(node)
 * `node` [DoublyNode](#DoublyNode)
 Adds a node to the end of the Queue.
 
##### enqueue(val)
 * `val` any
 Adds an element to the end of the Queue.

##### dequeueNode()
Removes and returns the node<[DoublyNode](#DoublyNode)> at the beginning of the Queue.

##### dequeue()
Removes and returns the element at the beginning of the Queue.

##### traverse(fn)
* `fn` Function
Apply fn to each node, and returns an array of elements returned by fn.

##### peek()
Returns the element at the beginning of the Queue without removing it.

##### clear()
Removes all elements from the Queue.

##### length
The number of elements contained in the Queue

```javascript


```

#### Linked Stack
Stack implemented by DoublyLinkedList

##### pushNode(node)
 * `node` [DoublyNode](#DoublyNode)
 
##### push(val)
 * `val` any
 
##### popNode()
Removes and returns the node<[DoublyNode](#DoublyNode)> at the top of the Stack.

##### pop()
Removes and returns the element at the top of the Stack.

##### peek()
Returns the element at the top of the Stack without removing it.

##### clear()
Removes all elements from the Stack.

##### length
The size of queue

#### Others
##### DoublyNode
 * `prev` DoublyNode
 * `next` DoublyNode
 * `val` any

##### Node
 * `next` Node
 * `val` any
