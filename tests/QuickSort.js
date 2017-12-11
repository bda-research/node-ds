const QuickSort = require('../QuickSort.js');

let a = [6,3,12,1,24,4,7,9,6,6,6,6,9,9];

QuickSort.sort(a, 0, a.length - 1);

console.log(a);

let b = ['我','爱','北','京','天','安','门',',','天','安','门','上','太','阳','升'];

QuickSort.sort(b);

console.log(b);

let c = ['陈惊雷','陈金鱼','怕崔克','张晓康','秋光会','防霉亲'];

QuickSort.sort(c);

console.log(c);