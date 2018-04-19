'use strict'

const should = require('should');
const AVLTree = require("../AVLTree");

let avlt = null;

describe("AVL Tree", function () {
    beforeEach(() => {
        avlt = new AVLTree();
    });

    afterEach(() => {
        avlt.clear();
    });

    it('should initialized with no nodes', function () {
        should.not.exist(avlt.root);
    });

    it('should assign new node to root when tree is empty', function () {
        avlt.add(1);
        should.equal(avlt.root.val, 1);
    });

    it('should insert value and returen instance', function () {
        /**************************************** 
         * LL is like:
        *         O
        *        /
        *       O
        *      /
        *     O
         * LR is like:
         *         O
         *        /
         *       O
         *        \
         *         O
         * RR is like:
         *         O
         *          \
         *           O
         *            \
         *             O
         * RL is like:
         *         O
         *          \
         *           O
         *          /
         *         O
        ****************************************/
        // NO FIX
        avlt.add(3);
        [...avlt.levelOrder()].should.be.eql([3]);

        // NO FIX
        avlt.add(2);
        [...avlt.levelOrder()].should.be.eql([3, 2]);

        // LL
        avlt.add(1);
        [...avlt.levelOrder()].should.be.eql([2, 1, 3]);

        // NO FIX
        avlt.add(4);
        [...avlt.levelOrder()].should.be.eql([2, 1, 3, 4]);

        // RR
        avlt.add(5);
        [...avlt.levelOrder()].should.be.eql([2, 1, 4, 3, 5]);

        // RR
        avlt.add(6);
        [...avlt.levelOrder()].should.be.eql([4, 2, 5, 1, 3, 6]);

        // RR
        avlt.add(7);
        [...avlt.levelOrder()].should.be.eql([4, 2, 6, 1, 3, 5, 7]);

        // NO FIX
        avlt.add(16);
        [...avlt.levelOrder()].should.be.eql([4, 2, 6, 1, 3, 5, 7, 16]);

        // RL
        avlt.add(15);
        [...avlt.levelOrder()].should.be.eql([4, 2, 6, 1, 3, 5, 15, 7, 16]);

        // RL
        avlt.add(14);
        [...avlt.levelOrder()].should.be.eql([4, 2, 7, 1, 3, 6, 15, 5, 14, 16]);

        // RR
        avlt.add(13);
        [...avlt.levelOrder()].should.be.eql([7, 4, 15, 2, 6, 14, 16, 1, 3, 5, 13]);

        // LL
        avlt.add(12);
        [...avlt.levelOrder()].should.be.eql([7, 4, 15, 2, 6, 13, 16, 1, 3, 5, 12, 14]);

        // LL
        avlt.add(11);
        [...avlt.levelOrder()].should.be.eql([7, 4, 13, 2, 6, 12, 15, 1, 3, 5, 11, 14, 16]);

        // LL
        avlt.add(10);
        [...avlt.levelOrder()].should.be.eql([7, 4, 13, 2, 6, 11, 15, 1, 3, 5, 10, 12, 14, 16]);

        // NO FIX
        avlt.add(8);
        [...avlt.levelOrder()].should.be.eql([7, 4, 13, 2, 6, 11, 15, 1, 3, 5, 10, 12, 14, 16, 8]);

        // LR
        avlt.add(9);
        [...avlt.levelOrder()].should.be.eql([7, 4, 13, 2, 6, 11, 15, 1, 3, 5, 9, 12, 14, 16, 8, 10]);

    });

    it('should return true/false if exists/non-exists value', function () {
        // will reconstruct from [2,3,4,5] to [4,3,5,2] when insert 4, cuz tree is inbalanced.
        let arr = [2, 3, 4, 5, 6, 7, 8], non = [1, 11, 10, 12, 0, -2];
        arr.forEach(v => avlt.add(v));
        arr.every(v => avlt.has(v)).should.be.true();
        non.some(v => avlt.has(v)).should.be.false();
    });

    it('should delete the node with specified value', function () {
        /**************************************** 
         * LL-DELETON is like:
         *         O
         *        /
         *       O
         *      / \
         *     O   O
         * RR-DELETION is like:
         *         O
         *          \
         *           O
         *          / \
         *         O   O
         * This 2 situation will only be found when deleting
        ****************************************/
        let arr = [3, 2, 1, 4, 5, 6, 7, 16, 15, 14, 13, 12, 11, 10, 8, 9];;
        arr.forEach(v => avlt.add(v));

        // NO FIX
        avlt.delete(6);
        [...avlt.levelOrder()].should.be.eql([7, 4, 13, 2, 5, 11, 15, 1, 3, 9, 12, 14, 16, 8, 10]);

        // LL-DELETION
        avlt.delete(12);
        [...avlt.levelOrder()].should.be.eql([7, 4, 13, 2, 5, 9, 15, 1, 3, 8, 11, 14, 16, 10]);

        // NO FIX
        avlt.delete(1);
        [...avlt.levelOrder()].should.be.eql([7, 4, 13, 2, 5, 9, 15, 3, 8, 11, 14, 16, 10]);

        // RL
        avlt.delete(8);
        [...avlt.levelOrder()].should.be.eql([7, 4, 13, 2, 5, 10, 15, 3, 9, 11, 14, 16]);

        // NO FIX
        avlt.delete(11);
        [...avlt.levelOrder()].should.be.eql([7, 4, 13, 2, 5, 10, 15, 3, 9, 14, 16]);

        // LR
        avlt.delete(4);
        [...avlt.levelOrder()].should.be.eql([7, 3, 13, 2, 5, 10, 15, 9, 14, 16]);

        // NO FIX
        avlt.delete(9);
        [...avlt.levelOrder()].should.be.eql([7, 3, 13, 2, 5, 10, 15, 14, 16]);

        // NO FIX
        avlt.delete(2);
        [...avlt.levelOrder()].should.be.eql([7, 3, 13, 5, 10, 15, 14, 16]);

        // RR-DELETION
        avlt.delete(5);
        [...avlt.levelOrder()].should.be.eql([13, 7, 15, 3, 10, 14, 16]);

        // NO FIX
        avlt.delete(7);
        [...avlt.levelOrder()].should.be.eql([13, 10, 15, 3, 14, 16]);

        // NO FIX
        avlt.delete(10);
        [...avlt.levelOrder()].should.be.eql([13, 3, 15, 14, 16]);

        // NO FIX (delete root node)
        avlt.delete(13);
        [...avlt.levelOrder()].should.be.eql([14, 3, 15, 16]);

        // NO FIX
        avlt.delete(16);
        [...avlt.levelOrder()].should.be.eql([14, 3, 15]);

        // NO FIX (delete root node)
        avlt.delete(14);
        [...avlt.levelOrder()].should.be.eql([15, 3]);

        // NO FIX (delete root node)
        avlt.delete(15);
        [...avlt.levelOrder()].should.be.eql([3]);

        // NO FIX (delete root node)
        avlt.delete(3);
        [...avlt.levelOrder()].should.be.eql([]);
    });
});
