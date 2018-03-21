
'use strict'

const BinaryTree = require("./BinaryTree");
const Queue = require("./LinkedQueue");

function ScapegoatTreeNode(value) {
    this.val = value;
    this.exist = true;
    this.nodeNum = 1;
    this.deletedNodeNum = 0;
    this.right = this.left = null;
}

module.exports = class ScapegoatTree extends BinaryTree {
    constructor(alpha = 0.667) {
        super();
        this._alpha = alpha;
    }

    static Node(value) {
        return new ScapegoatTreeNode(value);
    }

    add(value) {
        let valueRoot = this._root;
        let valueParent = null;
        let nodeToInsert = ScapegoatTree.Node(value);
        let alpha = this._alpha;

        if (!valueRoot) {
            this._root = nodeToInsert;
            return this;
        }

        // if the entire tree is unbalanced
        let rootNeedReconstruct = _insert(valueRoot, valueParent, nodeToInsert, alpha);
        if (rootNeedReconstruct) {
            let res = _reconstruct(valueRoot);
            this._root = res;
        }

        return this;
    }

    delete(value) {
        let cNode = this._root;
        let valueRoot = this._root;

        // find the boolean node with value node
        if (this.has(value)) {
            while (cNode) {
                if (value === cNode.val) {
                    cNode.exist = false;
                    ++cNode.deletedNodeNum;
                    break;
                }
                else if (value < cNode.val) {
                    ++cNode.deletedNodeNum;
                    cNode = cNode.left;
                }
                else if (value > cNode.val) {
                    ++cNode.deletedNodeNum;
                    cNode = cNode.right;
                }
            }

            if (valueRoot.deletedNodeNum / valueRoot.nodeNum >= 0.5) {
                let res = _reconstruct(valueRoot);
                this._root = res;
            }

            return true;
        }

        else {
            return false;
        }
    }

    has(value) {
        let cNode = this._root;

        while (cNode) {
            if (value === cNode.val) {
                break;
            }
            else if (value < cNode.val) {
                cNode = cNode.left;
            }
            else if (value > cNode.val) {
                cNode = cNode.right;
            }
        }

        // need to ignore the node that turned into false (deleted)
        if (cNode && cNode.exist) {
            return true;
        }
        else {
            return false;
        }
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
        let queue = new Queue(), node = null;
        queue.enqueue(this._root);

        while (queue.length) {
            node = queue.dequeue();
            if (node.left)
                queue.enqueue(node.left);

            if (node.right)
                queue.enqueue(node.right);

            if (node.exist) {
                yield node.val;
            }
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

function _insert(valueRoot, valueParent, nodeToInsert, alpha) {
    // find the position to insert
    if (!valueRoot) {
        if (nodeToInsert.val < valueParent.val) {
            valueParent.left = nodeToInsert;
        }
        else {
            valueParent.right = nodeToInsert;
        }
        return false;
    }

    let childNeedReconstruct;
    // to find the subtree to insert, if find the same value, turn the boolean node into true (in case that it has been deleted)
    if (nodeToInsert.val < valueRoot.val) {
        ++valueRoot.nodeNum;
        childNeedReconstruct = _insert(valueRoot.left, valueRoot, nodeToInsert, alpha);
    }
    else if (nodeToInsert.val > valueRoot.val) {
        ++valueRoot.nodeNum;
        childNeedReconstruct = _insert(valueRoot.right, valueRoot, nodeToInsert, alpha);
    }
    else {
        valueRoot.exist = true;
        return false;
    }

    // calculate the root tree node num and two children tree node num
    let thisNum;
    let leftNum;
    let rightNum;
    if (valueRoot) {
        thisNum = valueRoot.nodeNum;
    }
    else {
        thisNum = 0;
    }
    if (valueRoot.left) {
        leftNum = valueRoot.left.nodeNum;
    }
    else {
        leftNum = 0;
    }
    if (valueRoot.right) {
        rightNum = valueRoot.right.nodeNum;
    }
    else {
        rightNum = 0;
    }

    // if children tree node num bigger than alpha*root tree node num, need to be reconstructed
    let thisNeedReconstruct = false;
    if (leftNum > alpha * thisNum || rightNum > alpha * thisNum) {
        thisNeedReconstruct = true;
    }

    // if child tree need and itself dont need, start reconstruct
    if (!thisNeedReconstruct && childNeedReconstruct) {
        let leftRes = _reconstruct(valueRoot.left);
        let rightRes = _reconstruct(valueRoot.right);

        valueRoot.left = leftRes;
        valueRoot.right = rightRes;

        return false;
    }
    // if neither need, still not need
    else if (!thisNeedReconstruct && !childNeedReconstruct) {
        return false;
    }
    // if itself need, stay need
    else if (thisNeedReconstruct) {
        return true;
    }
}

function _constructFromArray(valueArr) {
    let valueRoot;
    // return the empty node
    if (valueArr.length === 0) {
        valueRoot = null;
    }

    // return the node without children
    else if (valueArr.length === 1) {
        valueRoot = new ScapegoatTreeNode(valueArr[0]);
    }

    else {
        // find the middle point to keep balance
        let middlePoint = Math.floor(valueArr.length / 2);

        // get the middle value
        let currentRootVal = valueArr[middlePoint];

        // construct the root node
        valueRoot = new ScapegoatTreeNode(currentRootVal);
        valueRoot.nodeNum = valueArr.length;

        // slice the array into 2 pieces according to midddle point
        let leftValArr = valueArr.slice(0, middlePoint);
        let rightValArr = valueArr.slice(middlePoint + 1);

        // get the left and right children node
        valueRoot.left = _constructFromArray(leftValArr);
        valueRoot.right = _constructFromArray(rightValArr);
    }

    return valueRoot;
}

function _reconstruct(valueRoot) {
    // flatten the tree
    let valueArr = [..._inOrder(valueRoot)];

    let res = _constructFromArray(valueArr);

    return res;
}

function* _inOrder(node) {
    if (null === node)
        return;

    yield* _inOrder(node.left);
    if (node.exist) {
        yield node.val;
    }
    yield* _inOrder(node.right);
}

function* _preOrder(node) {
    if (null === node)
        return;

    if (node.exist) {
        yield node.val;
    }
    yield* _preOrder(node.left);
    yield* _preOrder(node.right);
}

function* _postOrder(node) {
    if (null === node)
        return;

    yield* _postOrder(node.left);
    yield* _postOrder(node.right);
    if (node.exist) {
        yield node.val;
    }
}