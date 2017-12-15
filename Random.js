class Random {
    constructor() {
        throw new Error('Random - do not instantiate, all methods are static in Random.js');
    }
    static shuffle() {
        let a = arguments[0],
            from, to;

        if (!Array.isArray(a)) throw new Error('Random.shuffle - IllegalArgument: argument must be an array');
        if (1 >= a.length) return;

        switch (arguments.length) {
            case 1:
                from = 0;
                to = a.length - 1;
                break;
            case 3:
                from = arguments[1];
                to = arguments[2];
                break;
            default:
                throw new Error('Random.shuffle - IllegalArgument: please follow Random.shuffle(array(, from, to)?');
        }

        if ('number' !== typeof from || 'number' !== typeof to) throw new Error('Random.shuffle - IllegalArgument: invalid from and to');

        function swap(a, i, j) {
            let swap = a[i];
            a[i] = a[j];
            a[j] = swap;
        }

        for (let i = from; i <= to; i++) {
            let r = i + Math.floor(Math.random()*(to + 1 - i));
            swap(a, i, r);
        }
    }
}

module.exports = Random;
