# node-ds
A common data-structure and basic algorithm implemention in javascript

# Table of Contents

* [Data Structures](#data-structures)
  * [Linear](#linear)
    * [Linked List](#linked-list)
	* [Doubly Linked List](#doubly-linked-list)
	* [Linked Queue](#linked-queue)
	* [Stack](#stack)
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
The size of the list.

```javascript
	

```

#### Doubly Linked List
Same with LinkedList

```javascript


```

#### Linked Queue
Queue implemented by DoublyLinkList

##### enqueueNode(node)
 * `node` [DoublyNode](#DoublyNode)
 
##### enqueueValue(val)
 * `val` any

##### dequeueNode(node)
 * `node` [DoublyNode](#DoublyNode)

##### dequeueValue(val)
 * `val` any

##### traverse(fn)
* `fn` Function
Apply fn to each node, and returns an array of elements returned by fn.

##### length
The size of queue

```javascript


```

#### Stack


#### Others
##### DoublyNode
 * `prev` DoublyNode
 * `next` DoublyNode
 * `val` any

##### Node
 * `next` Node
 * `val` any
