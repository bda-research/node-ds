const should = require('should');
const Grubbs = require('../Grubbs');

let data = null;

describe("Grubbs", function () {
    beforeEach(() => {
        data = [7, 9, 2, 6, 3, 5, 7, 2, 4, 20];
    });
    it('20 should be outlier', function () {
        let grubbs = new Grubbs(data);
        let outliers = grubbs.getOutliers();
        console.log(outliers)
        outliers.should.be.instanceof(Array);
        should.equal(outliers.length, 1);
        should.equal(outliers[0], 9);
        should.equal(data[outliers[0]], 20);
    });
})