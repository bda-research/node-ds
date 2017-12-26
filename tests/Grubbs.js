const should = require('should');
const Grubbs = require('../Grubbs');

let data = null;

describe("Grubbs", function () {
    it('data must be an array', function () {
        try {
            new Grubbs(data);
        } catch (e) {
            e.should.be.instanceof(Error);
        }
    });

    it('data length must be at least 3', function () {
        data = [1, 100];
        try {
            new Grubbs(data);
        } catch (e) {
            e.should.be.instanceof(Error);
        }
    });

    it('unable to tell outliers when data is distributed in two extremes', function () {
        data = [1, 1, 100, 100];
        let grubbs1 = new Grubbs(data);
        let outliers1 = grubbs1.getOutliers();

        data = [1, 1, 1, 100, 100];
        let grubbs2 = new Grubbs(data);
        let outliers2 = grubbs2.getOutliers();

        data = [1, 1, 100, 100, 100];
        let grubbs3 = new Grubbs(data);
        let outliers3 = grubbs3.getOutliers();

        should.equal(outliers1.length, 0);
        should.equal(outliers2.length, 0);
        should.equal(outliers3.length, 0);
    });

    it('20 should be outlier', function () {
        data = [7, 9, 2, 6, 3, 5, 7, 2, 4, 20];
        let grubbs = new Grubbs(data);
        let outliers = grubbs.getOutliers();
        outliers.should.be.instanceof(Array);
        should.equal(outliers.length, 1);
        should.equal(outliers[0], 9);
        should.equal(data[outliers[0]], 20);
    });
})