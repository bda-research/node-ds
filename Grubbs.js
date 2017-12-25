let CriticalTable = require('./lib/grubbsCriticalTable.js');

module.exports = class Grubbs {
    constructor(data, alpha) {
        if (!(data instanceof Array)) {
            throw new Error('data must be an array');
        }
        this.data = data;
        this.alpha = alpha || 0.05;
        this._preprocess();
    }
    _preprocess() {
        if (this.data.length > 100) {
            this.data = this.data.slice(this.data.length - 100);
        }
        [this.average, this.stdev] = _stdev(this.data);
        this.criticalValue = _getCriticalValue(this.data.length, this.alpha);
    }
    getOutliers() {
        let rst = [];
        for (let i = 0; i < this.data.length; i++) {
            if (Math.abs((this.data[i] - this.average) / this.stdev) > this.criticalValue) {
                rst.push(i);
            }
        }
        return rst;
    }
}


function _average(data) {
    let rst = data.reduce((pre, cur) => pre + cur);
    return rst / data.length;
}

function _stdev(data) {
    let ave = _average(data);
    let rst = data.reduce((pre, cur) => pre + Math.pow(cur - ave, 2), 0);
    return [ave, Math.sqrt(rst / data.length)];
}

function _getCriticalValue(length, alpha) {
    return CriticalTable[alpha][length];
}
