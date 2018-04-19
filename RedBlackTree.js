
'use strict'

const BinaryTree = require("./BinaryTree");
const Queue = require("./LinkedQueue");

const BLACK = 'black';
const RED = 'red';

function RedBlackTreeNode(value) {
    this.val = value;
    this.color = null;
    this.right = this.left = null;
    this.parent = null;
}

module.exports = class RedBlackTree extends BinaryTree {
    static Node(value) {
        return new RedBlackTreeNode(value);
    }

    add(value) {
        let valueRoot = this._root;
        let nodeToInsert = RedBlackTree.Node(value);

        if (!valueRoot) {
            this._root = nodeToInsert;
            this._root.color = BLACK;
        }
        else {
            this._root = _insert(valueRoot, nodeToInsert);
        }

        return this;
    }

    delete(value) {
        let valueRoot = this._root;

        let res = _remove(valueRoot, value);
        if (res.isSeccess) {
            this.root = res.treeRoot;
            return res.isSeccess;
        }
        else {
            return res.isSeccess;
        }
    }

    has(value) {
        let cNode = this._root;

        while (cNode) {
            if (value === cNode.val) {
                return true;
            } else if (value < cNode.val) {
                cNode = cNode.left;
            } else if (value > cNode.val) {
                cNode = cNode.right;
            }
        }

        return false;
    }

    *inOrder() {
        yield* _inOrder(this._root);
    }

    *preOrder() {
        yield* _preOrder(this._root);
    }

    *postOrder() {
        yield* _postOrder(this._root);
    }

    *levelOrder() {
        if (!this._root) {
            return;
        }

        let queue = new Queue(), node = null;
        queue.enqueue(this._root);

        while (queue.length) {
            node = queue.dequeue();
            if (node.left)
                queue.enqueue(node.left);

            if (node.right)
                queue.enqueue(node.right);

            yield node.val;
        }
    }

    *levelOrderColor() {
        if (!this._root) {
            return;
        }

        let queue = new Queue(), node = null;
        queue.enqueue(this._root);

        while (queue.length) {
            node = queue.dequeue();
            if (node.left)
                queue.enqueue(node.left);

            if (node.right)
                queue.enqueue(node.right);

            yield node.color;
        }
    }

    depth(val) {
        if (undefined === val || null === val) {
            return 0;
        }

        let queue = new Queue(), e = null;
        queue.enqueue({ depth: 0, node: this._root });

        while (queue.length) {
            e = queue.dequeue();

            if (val === e.node.val) {
                if (e.node.exist) {
                    return e.depth;
                }
                else {
                    return 0;
                }
            }

            if (e.node.left)
                queue.enqueue({ node: e.node.left, depth: e.depth + 1 });

            if (e.node.right)
                queue.enqueue({ node: e.node.right, depth: e.depth + 1 });
        }
    }

    toArray() {
        return [..._inOrder(this._root)];
    }

    clear() {
        this._root = null;
    }

    get root() {
        return this._root;
    }

    set root(value) {
        this._root = value;
    }
}

function _leftRotate(currentRoot, treeRoot) {
    let tmpNode = currentRoot.right;
    currentRoot.right = tmpNode.left;

    if (tmpNode.left) {
        tmpNode.left.parent = currentRoot;
    }
    tmpNode.parent = currentRoot.parent;

    if (currentRoot.parent === null) {
        treeRoot = tmpNode;
    }
    else if (currentRoot === currentRoot.parent.left) {
        currentRoot.parent.left = tmpNode;
    }
    else {
        currentRoot.parent.right = tmpNode;
    }

    tmpNode.left = currentRoot;
    currentRoot.parent = tmpNode;

    return treeRoot;
}

function _rightRotate(currentRoot, treeRoot) {
    let tmpNode = currentRoot.left;
    currentRoot.left = tmpNode.right;

    if (tmpNode.right) {
        tmpNode.right.parent = currentRoot;
    }
    tmpNode.parent = currentRoot.parent;

    if (currentRoot.parent === null) {
        treeRoot = tmpNode;
    }
    else if (currentRoot === currentRoot.parent.left) {
        currentRoot.parent.left = tmpNode;
    }
    else {
        currentRoot.parent.right = tmpNode;
    }

    tmpNode.right = currentRoot;
    currentRoot.parent = tmpNode;

    return treeRoot;
}

function _insertFix(fixStartNode, treeRoot) {
    let currentNode = fixStartNode;

    while (currentNode && currentNode !== treeRoot && currentNode.parent.color === RED) {
        if (currentNode.parent === currentNode.parent.parent.left) {
            let uncleNode = currentNode.parent.parent.right;

            if (uncleNode && uncleNode.color === RED) {
                currentNode.parent.color = BLACK;
                uncleNode.color = BLACK;
                currentNode.parent.parent.color = RED;
                currentNode = currentNode.parent.parent;
            }

            else {
                if (currentNode === currentNode.parent.right) {
                    currentNode = currentNode.parent;
                    treeRoot = _leftRotate(currentNode, treeRoot);
                }

                currentNode.parent.color = BLACK;
                currentNode.parent.parent.color = RED;
                treeRoot = _rightRotate(currentNode.parent.parent, treeRoot)
            }
        }

        else {
            let uncleNode = currentNode.parent.parent.left;

            if (uncleNode && uncleNode.color === RED) {
                currentNode.parent.color = BLACK;
                uncleNode.color = BLACK;
                currentNode.parent.parent.color = RED;
                currentNode = currentNode.parent.parent;
            }

            else {
                if (currentNode === currentNode.parent.left) {
                    currentNode = currentNode.parent;
                    treeRoot = _rightRotate(currentNode, treeRoot);
                }

                currentNode.parent.color = BLACK;
                currentNode.parent.parent.color = RED;
                treeRoot = _leftRotate(currentNode.parent.parent, treeRoot)
            }
        }
    }

    treeRoot.color = BLACK;

    return treeRoot;
}

function _insert(valueRoot, nodeToInsert) {
    let tmpNode = valueRoot;
    let tmpNodeParent = null;
    // find the position to insert
    while (tmpNode) {
        tmpNodeParent = tmpNode;
        if (nodeToInsert.val > tmpNode.val) {
            tmpNode = tmpNode.right;
        }
        else if (nodeToInsert.val < tmpNode.val) {
            tmpNode = tmpNode.left;
        }
        else {
            return valueRoot;
        }
    }

    nodeToInsert.parent = tmpNodeParent;
    if (nodeToInsert.val > tmpNodeParent.val) {
        tmpNodeParent.right = nodeToInsert;
    }
    else if (nodeToInsert.val < tmpNodeParent.val) {
        tmpNodeParent.left = nodeToInsert;
    }

    nodeToInsert.color = RED;

    valueRoot = _insertFix(nodeToInsert, valueRoot);

    return valueRoot;
}

function _findCandidate(currentNode) {
    if (currentNode.left) {
        return _findCandidate(currentNode.left);
    }
    else {
        return currentNode;
    }
}

function _replaceForRemove(valueRoot, nodeToRemove, candidate) {
    if (!nodeToRemove.parent) {
        valueRoot = candidate;
        candidate.parent = null;
    }
    else {
        if (nodeToRemove === nodeToRemove.parent.left) {
            nodeToRemove.parent.left = candidate;
        }
        else if (nodeToRemove === nodeToRemove.parent.right) {
            nodeToRemove.parent.right = candidate;
        }
        candidate.parent = nodeToRemove.parent;
    }

    nodeToRemove.left = nodeToRemove.right = nodeToRemove.parent = null;

    return valueRoot;
}

function _deleteNode(valueRoot, currentNode) {
    // dont have children
    if (!currentNode.left && !currentNode.right) {
        if (currentNode.color === BLACK) {
            valueRoot = _removeFix(currentNode, valueRoot);
        }

        if (currentNode.parent) {
            if (currentNode === currentNode.parent.left) {
                currentNode.parent.left = null;
            }
            else if (currentNode === currentNode.parent.right) {
                currentNode.parent.right = null;
            }
        }
        else {
            valueRoot = null;
        }
    }

    // only has right child
    else if (!currentNode.left) {
        let tmpNode = currentNode.right;
        let tmpColor = currentNode.color;
        valueRoot = _replaceForRemove(valueRoot, currentNode, currentNode.right);
        currentNode = tmpNode;
        tmpNode = null;

        if (tmpColor === BLACK) {
            valueRoot = _removeFix(currentNode, valueRoot);
        }
    }

    // only has left child
    else if (!currentNode.right) {
        let tmpNode = currentNode.left;
        let tmpColor = currentNode.color;
        valueRoot = _replaceForRemove(valueRoot, currentNode, currentNode.left);
        currentNode = tmpNode;
        tmpNode = null;

        if (tmpColor === BLACK) {
            valueRoot = _removeFix(currentNode, valueRoot);
        }
    }

    //has both
    else {
        let candidate = _findCandidate(currentNode.right);

        // exchange the value without exchanging the color
        let val = candidate.val;
        candidate.val = currentNode.val;
        currentNode.val = val;

        valueRoot = _deleteNode(valueRoot, candidate);
    }

    return valueRoot;
}

function _removeFix(fixStartNode, treeRoot) {
    let currentNode = fixStartNode;

    while (currentNode !== treeRoot && currentNode.color === BLACK) {
        if (currentNode === currentNode.parent.left) {
            // if a node is black, it must have a brother
            let brother = currentNode.parent.right;

            if (brother.color === RED) {
                brother.color = BLACK;
                currentNode.parent.color = RED;
                treeRoot = _leftRotate(currentNode.parent, treeRoot);
                brother = currentNode.parent.right;
            }

            if ((!brother.left || brother.left.color === BLACK) && (!brother.right || brother.right.color === BLACK)) {
                brother.color = RED;
                currentNode = currentNode.parent;
            }

            else {
                if (!brother.right || brother.right.color === BLACK) {
                    brother.left.color = BLACK;
                    brother.color = RED;
                    treeRoot = _rightRotate(brother, treeRoot);
                    brother = currentNode.parent.right;
                }

                brother.color = currentNode.parent.color;
                currentNode.parent.color = BLACK;
                brother.right.color = BLACK;

                treeRoot = _leftRotate(currentNode.parent, treeRoot);
                currentNode = treeRoot;
            }
        }

        else {
            let brother = currentNode.parent.left;

            if (brother.color === RED) {
                brother.color = BLACK;
                currentNode.parent.color = RED;
                treeRoot = _rightRotate(currentNode.parent, treeRoot);
                brother = currentNode.parent.left;
            }

            if ((!brother.left || brother.left.color === BLACK) && (!brother.right || brother.right.color === BLACK)) {
                brother.color = RED;
                currentNode = currentNode.parent;
            }

            else {
                if (!brother.left || brother.left.color === BLACK) {
                    brother.right.color = BLACK;
                    brother.color = RED;
                    treeRoot = _leftRotate(brother, treeRoot);
                    brother = currentNode.parent.left;
                }

                brother.color = currentNode.parent.color;
                currentNode.parent.color = BLACK;
                brother.left.color = BLACK;

                treeRoot = _rightRotate(currentNode.parent, treeRoot);
                currentNode = treeRoot;
            }
        }
    }

    currentNode.color = BLACK;

    return treeRoot;
}

function _remove(valueRoot, removeValue) {
    let currentNode = valueRoot;
    while (currentNode) {
        if (removeValue === currentNode.val) {
            break;
        }
        else if (removeValue < currentNode.val) {
            currentNode = currentNode.left;
        }
        else {
            currentNode = currentNode.right;
        }
    }

    if (!currentNode) {
        return { 'treeRoot': null, 'isSeccess': false };
    }

    else {
        valueRoot = _deleteNode(valueRoot, currentNode);

        return { 'treeRoot': valueRoot, 'isSeccess': true };
    }
}

function* _inOrder(node) {
    if (null === node)
        return;

    yield* _inOrder(node.left);
    yield node.val;
    yield* _inOrder(node.right);
}

function* _preOrder(node) {
    if (null === node)
        return;

    yield node.val;
    yield* _preOrder(node.left);
    yield* _preOrder(node.right);
}

function* _postOrder(node) {
    if (null === node)
        return;

    yield* _postOrder(node.left);
    yield* _postOrder(node.right);
    yield node.val;
}