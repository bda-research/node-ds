
'use strict'

const SortFamily = require('../SortFamily.js');
const Random = require('../Random.js');

let a = [6,3,12,1,24,4,7,9,6,6,6,6,9,9];
console.log('Before insertionSort:');
console.log(a);
SortFamily.insertionSort(a);
console.log('After insertionSort');
console.log(a);

Random.shuffle(a);
console.log('Before mergeSort:');
console.log(a);
SortFamily.mergeSort(a);
console.log('After mergeSort');
console.log(a);

Random.shuffle(a);
console.log('Before quickSort:');
console.log(a);
SortFamily.quickSort(a);
console.log('After quickSort');
console.log(a);

Random.shuffle(a);
console.log('Before heapSort:');
console.log(a);
SortFamily.heapSort(a);
console.log('After heapSort');
console.log(a);	

let b = ['在','某','些','场','景','中','这','的','确','就','是','足','够','了','但','是','现','在','我','需','要','的','是','全','拼','音','排','序'];
console.log('Before insertionSort:');
console.log(b.join());
SortFamily.insertionSort(b);
console.log('After insertionSort');
console.log(b.join());

Random.shuffle(b);
console.log('Before mergeSort:');
console.log(b.join());
SortFamily.mergeSort(b);
console.log('After mergeSort');
console.log(b.join());

Random.shuffle(b);
console.log('Before quickSort:');
console.log(b.join());
SortFamily.quickSort(b);
console.log('After quickSort');
console.log(b.join());

Random.shuffle(b);
console.log('Before heapSort:');
console.log(b.join());
SortFamily.heapSort(b);
console.log('After heapSort');
console.log(b.join());

let c = ['胡宇征','吴雨航','周行健','陈远洲','杨向谦','夏晨曦','谢卓凡','薛彦钊','林挺','任秋宇','何天成','卜辰璟','顾树锴','赵振华','迟舒乘','姚睿','魏昕','黄楚昊','刘鹏飞','赵子源','徐行知','吴金泽','张騄','刘哲成','仝方舟','谢添乐','尹龙晖','丁力煌','朱心一','高轶寒','彭展翔'];
console.log('Before insertionSort:');
console.log(c.join());
SortFamily.insertionSort(c);
console.log('After insertionSort');
console.log(c.join());

Random.shuffle(c);
console.log('Before mergeSort:');
console.log(c.join());
SortFamily.mergeSort(c);
console.log('After mergeSort');
console.log(c.join());

Random.shuffle(c);
console.log('Before quickSort:');
console.log(c.join());
SortFamily.quickSort(c);
console.log('After quickSort');
console.log(c.join());

Random.shuffle(c);
console.log('Before heapSort:');
console.log(c.join());
SortFamily.heapSort(c);
console.log('After heapSort');
console.log(c.join());

let d = ['During','his','visit','he','met','with','Ri','Yong','Ho','the','North','Korean','minister','for','foreign','affairs','Their','meeting','came','at','a','particularly','tense','time','a','week','after','North','Korea','tested','an','advance','long-range','missile','and','South','Korea','conducted','military','drills','with','its','ally','the','United','States'];
console.log('Before insertionSort:');
console.log(d.join());
SortFamily.insertionSort(d);
console.log('After insertionSort');
console.log(d.join());

Random.shuffle(d);
console.log('Before mergeSort:');
console.log(d.join());
SortFamily.mergeSort(d);
console.log('After mergeSort');
console.log(d.join());

Random.shuffle(d);
console.log('Before quickSort:');
console.log(d.join());
SortFamily.quickSort(d);
console.log('After quickSort');
console.log(d.join());

Random.shuffle(d);
console.log('Before heapSort:');
console.log(d.join());
SortFamily.heapSort(d);
console.log('After heapSort');
console.log(d.join());

let e = ['F','e','l','t','m','a','n','s','t','r','e','s','s','e','d','t','h','e','n','e','e','d','f','o','r','r','e','l','e','v','a','n','t'];
console.log('Before insertionSort:');
console.log(e.join());
SortFamily.insertionSort(e);
console.log('After insertionSort');
console.log(e.join());

Random.shuffle(e);
console.log('Before mergeSort:');
console.log(e.join());
SortFamily.mergeSort(e);
console.log('After mergeSort');
console.log(e.join());

Random.shuffle(e);
console.log('Before quickSort:');
console.log(e.join());
SortFamily.quickSort(e);
console.log('After quickSort');
console.log(e.join());

Random.shuffle(e);
console.log('Before heapSort:');
console.log(e.join());
SortFamily.heapSort(e);
console.log('After heapSort');
console.log(e.join());
