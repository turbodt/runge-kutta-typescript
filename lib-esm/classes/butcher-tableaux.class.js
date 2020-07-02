var ButcherTableau = /** @class */ (function () {
    function ButcherTableau(order, Type) {
        if (Type === void 0) { Type = Float32Array; }
        this.order = order;
        this.data = new Type(this.order * this.order + this.order + this.order);
    }
    Object.defineProperty(ButcherTableau.prototype, "a", {
        get: function () {
            var a = [];
            for (var i = 0; i < this.order; i++) {
                a.push(this.data.subarray(i * this.order, (i + 1) * this.order));
            }
            return a;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButcherTableau.prototype, "b", {
        get: function () {
            return this.data.subarray(this.order * this.order, this.order * (1 + this.order));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButcherTableau.prototype, "c", {
        get: function () {
            return this.data.subarray(this.order * (1 + this.order), this.order * (2 + this.order));
        },
        enumerable: false,
        configurable: true
    });
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
export default ButcherTableau;
export var rk4ButcherTableau = new ButcherTableau(4);
rk4ButcherTableau.a[1][0] = 0.5;
rk4ButcherTableau.a[2][1] = 0.5;
rk4ButcherTableau.a[3][2] = 1.0;
rk4ButcherTableau.makeItConsistent();
rk4ButcherTableau.b[0] = 0.3333333333333333;
rk4ButcherTableau.b[1] = 0.1666666666666666;
rk4ButcherTableau.b[2] = 0.1666666666666666;
rk4ButcherTableau.b[3] = 0.3333333333333333;
//# sourceMappingURL=butcher-tableaux.class.js.map