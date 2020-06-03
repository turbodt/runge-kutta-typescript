var ButcherTableaux = /** @class */ (function () {
    function ButcherTableaux(order, Type) {
        if (Type === void 0) { Type = Float32Array; }
        this.order = order;
        this.data = new Type(this.order * this.order + this.order + this.order);
    }
    Object.defineProperty(ButcherTableaux.prototype, "a", {
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
    Object.defineProperty(ButcherTableaux.prototype, "b", {
        get: function () {
            return this.data.subarray(this.order * this.order, this.order * (1 + this.order));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButcherTableaux.prototype, "c", {
        get: function () {
            return this.data.subarray(this.order * (1 + this.order), this.order * (2 + this.order));
        },
        enumerable: false,
        configurable: true
    });
    ButcherTableaux.prototype.toString = function () {
        var s = "";
        for (var i = 0; i < this.order; i++) {
            s += this.c[i] + " : ";
            s += "" + this.a[i].join(" ");
            s += "\n";
        }
        s += "\t : " + this.b.join(" ") + "\n";
        return s;
    };
    ButcherTableaux.prototype.makeItConsistent = function () {
        var _this = this;
        this.a.forEach(function (row, i) {
            _this.c[i] = 0;
            for (var j = 0; j < _this.order; j++) {
                _this.c[i] += row[j];
            }
        });
        return this;
    };
    return ButcherTableaux;
}());
export default ButcherTableaux;
export var rk4ButcherTableaux = new ButcherTableaux(4);
rk4ButcherTableaux.a[1][0] = 0.5;
rk4ButcherTableaux.a[2][1] = 0.5;
rk4ButcherTableaux.a[3][2] = 1.0;
rk4ButcherTableaux.makeItConsistent();
rk4ButcherTableaux.b[0] = 0.3333333333333333;
rk4ButcherTableaux.b[1] = 0.1666666666666666;
rk4ButcherTableaux.b[2] = 0.1666666666666666;
rk4ButcherTableaux.b[3] = 0.3333333333333333;
//# sourceMappingURL=butcher-tableaux.class.js.map