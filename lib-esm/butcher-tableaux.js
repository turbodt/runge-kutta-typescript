var ButcherTableau = /** @class */ (function () {
    function ButcherTableau(order) {
        this.order = order;
        this.data = new Float64Array(this.order * this.order + this.order + this.order);
        this.a = [];
        for (var i = 0; i < this.order; i++) {
            this.a.push(this.data.subarray(i * this.order, (i + 1) * this.order));
        }
        this.b = this.data.subarray(this.order * this.order, this.order * (1 + this.order));
        this.c = this.data.subarray(this.order * (1 + this.order), this.order * (2 + this.order));
    }
    ButcherTableau.prototype.toString = function () {
        var s = "";
        for (var i = 0; i < this.order; i++) {
            s += this.c[i] + " : ";
            s += "" + this.a[i].join(" ");
            s += "\n";
        }
        s += "\t : " + this.b.join(" ") + "\n";
        return s;
    };
    ButcherTableau.prototype.makeItConsistent = function () {
        var _this = this;
        this.a.forEach(function (row, i) {
            _this.c[i] = 0;
            for (var j = 0; j < _this.order; j++) {
                _this.c[i] += row[j];
            }
        });
        return this;
    };
    return ButcherTableau;
}());
export { ButcherTableau };
//# sourceMappingURL=butcher-tableaux.js.map