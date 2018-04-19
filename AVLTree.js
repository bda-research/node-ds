
'use strict'

const BinaryTree = require("./BinaryTree");
const Queue = require("./LinkedQueue");

function AVLTreeNode(value) {
    this.val = value;
    this.height = 0;
    this.right = this.left = null;
    this.parent = null;
}

module.exports = class AVLTree extends BinaryTree {
    static Node(value) {
        return new AVLTreeNode(value);
    }

    add(value) {
        let valueRoot = this._root;
        let nodeToInsert = AVLTree.Node(value);

        if (!valueRoot) {
            this._root = nodeToInsert;
            this._root.height = 1;
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

function _calTmpHeight(currentNode) {
    let leftHeight = currentNode.left ? currentNode.left.height : 0;
    let rightHeight = currentNode.right ? currentNode.right.height : 0;

    return Math.max(leftHeight, rightHeight) + 1;
}

function _fixHeight(startNode, treeRoot) {
    let tmpNode = startNode;
    while (tmpNode) {
        let tmpHeight = _calTmpHeight(tmpNode);

        if (tmpNode.height === tmpHeight) {
            break;
        }
        else {
            tmpNode.height = tmpHeight;
            tmpNode = tmpNode.parent;
        }
    }

    return treeRoot;
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

    // the order cannot be changed, cuz currentRoot is child, its change will affect tmpNode (new root)
    currentRoot.height = _calTmpHeight(currentRoot);
    tmpNode.height = _calTmpHeight(tmpNode);
    treeRoot = _fixHeight(tmpNode.parent, treeRoot);

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

    // the order cannot be changed, cuz currentRoot is child, its change will affect tmpNode (new root)
    currentRoot.height = _calTmpHeight(currentRoot);
    tmpNode.height = _calTmpHeight(tmpNode);
    treeRoot = _fixHeight(tmpNode.parent, treeRoot);

    return treeRoot;
}

function _fix(startNode, treeRoot) {
    let tmpNode = startNode;
    let imbalanceType = 0; // 0 for balance, -1 for left higher, 1 for right higher
    while (tmpNode) {
        let leftHeight = tmpNode.left ? tmpNode.left.height : 0;
        let rightHeight = tmpNode.right ? tmpNode.right.height : 0;

        if (leftHeight - rightHeight > 1) {
            // LL
            if (imbalanceType === -1) {
                treeRoot = _rightRotate(tmpNode, treeRoot);
            }
            // LR
            else if (imbalanceType === 1) {
                treeRoot = _leftRotate(tmpNode.left, treeRoot);
                treeRoot = _rightRotate(tmpNode, treeRoot);
            }
            // when inserting, wont exist imbalanceType === 0, cuz if leftHeight - rightHeight > 1, there has already existed an imbalance case.

            // for delete case
            // LL-DELETION
            else {
                treeRoot = _rightRotate(tmpNode, treeRoot);
            }
            tmpNode = tmpNode.parent;
            leftHeight = tmpNode.left ? tmpNode.left.height : 0;
            rightHeight = tmpNode.right ? tmpNode.right.height : 0;
        }
        else if (rightHeight - leftHeight > 1) {
            // RL
            if (imbalanceType === -1) {
                treeRoot = _rightRotate(tmpNode.right, treeRoot);
                treeRoot = _leftRotate(tmpNode, treeRoot);
            }
            // RR
            else if (imbalanceType === 1) {
                treeRoot = _leftRotate(tmpNode, treeRoot);
            }

            // for delete case
            // RR-DELETION
            else {
                treeRoot = _leftRotate(tmpNode, treeRoot);
            }
            tmpNode = tmpNode.parent;
            leftHeight = tmpNode.left ? tmpNode.left.height : 0;
            rightHeight = tmpNode.right ? tmpNode.right.height : 0;
        }

        // right now there wont exsit the case of |leftHeight - rightHeight| > 1
        if (leftHeight > rightHeight) {
            imbalanceType = -1;
        }
        else if (leftHeight < rightHeight) {
            imbalanceType = 1;
        }
        else {
            imbalanceType = 0;
        }

        tmpNode = tmpNode.parent;
    }

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

    valueRoot = _fixHeight(nodeToInsert, valueRoot);
    valueRoot = _fix(nodeToInsert, valueRoot);

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
        if (currentNode.parent) {
            if (currentNode === currentNode.parent.left) {
                currentNode.parent.left = null;
            }
            else if (currentNode === currentNode.parent.right) {
                currentNode.parent.right = null;
            }
            valueRoot = _fixHeight(currentNode.parent, valueRoot);
            // digging to the deepest node
            let startNode = currentNode.parent;
            while (true && startNode) {
                let leftHeight = startNode.left ? startNode.left.height : 0;
                let rightHeight = startNode.right ? startNode.right.height : 0;

                if (leftHeight === 0 && rightHeight === 0) {
                    break;
                }

                if (leftHeight > rightHeight) {
                    startNode = startNode.left;
                }
                else {
                    startNode = startNode.right;
                }
            }
            valueRoot = _fix(startNode, valueRoot);

        }
        else {
            valueRoot = null;
        }
    }

    // only has right child
    else if (!currentNode.left) {
        let tmpNode = currentNode.right;
        valueRoot = _replaceForRemove(valueRoot, currentNode, currentNode.right);
        currentNode = tmpNode;
        tmpNode = null;

        valueRoot = _fixHeight(currentNode.parent, valueRoot);
        // digging to the deepest node
        let startNode = currentNode.parent;
        while (true && startNode) {
            let leftHeight = startNode.left ? startNode.left.height : 0;
            let rightHeight = startNode.right ? startNode.right.height : 0;

            if (leftHeight === 0 && rightHeight === 0) {
                break;
            }

            if (leftHeight > rightHeight) {
                startNode = startNode.left;
            }
            else {
                startNode = startNode.right;
            }
        }
        valueRoot = _fix(startNode, valueRoot);
    }

    // only has left child
    else if (!currentNode.right) {
        let tmpNode = currentNode.left;
        valueRoot = _replaceForRemove(valueRoot, currentNode, currentNode.left);
        currentNode = tmpNode;
        tmpNode = null;

        valueRoot = _fixHeight(currentNode.parent, valueRoot);
        // digging to the deepest node
        let startNode = currentNode.parent;
        while (true && startNode) {
            let leftHeight = startNode.left ? startNode.left.height : 0;
            let rightHeight = startNode.right ? startNode.right.height : 0;

            if (leftHeight === 0 && rightHeight === 0) {
                break;
            }

            if (leftHeight > rightHeight) {
                startNode = startNode.left;
            }
            else {
                startNode = startNode.right;
            }
        }
        valueRoot = _fix(startNode, valueRoot);
    }

    //has both
    else {
        let candidate = _findCandidate(currentNode.right);

        // exchange the value
        let val = candidate.val;
        candidate.val = currentNode.val;
        currentNode.val = val;

        valueRoot = _deleteNode(valueRoot, candidate);
    }

    return valueRoot;
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