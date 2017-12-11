const MergeSort = require('../MergeSort.js');

let a = [6,3,12,1,4,7,9,9,9];

MergeSort.sort(a, 0, a.length - 1);

console.log(a);

let b = ['我','爱','北','京','天','安','门',',','天','安','门','上','太','阳','升'];

MergeSort.sort(b);

console.log(b);

let c = ['陈惊雷','陈金鱼','怕崔克','张晓康','秋光会','防霉亲'];

MergeSort.sort(c);

console.log(c);