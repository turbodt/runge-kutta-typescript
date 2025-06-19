var RungeKutta = /** @class */ (function () {
    function RungeKutta(butcherTableau, f) {
        this.butcherTableau = butcherTableau;
        this.f = f;
    }
    Object.defineProperty(RungeKutta.prototype, "order", {
        get: function () {
            return this.butcherTableau.order;
        },
        enumerable: false,
        configurable: true
    });
    RungeKutta.prototype.stepInto = function (h, t, x, xNew) {
        var k = new Array(this.order);
        for (var i = 0; i < this.order; i++) {
            k[i] = this.k(i, h, t, x, k);
        }
        for (var j = 0; j < this.order; j++) {
            for (var l = 0; l < x.length; l++) {
                xNew[l] = h * this.butcherTableau.b[j] * k[j][l] + x[l];
            }
        }
        return this;
    };
    RungeKutta.prototype.step = function (h, t, x) {
        var xNew = new Float64Array(x.length);
        this.stepInto(h, t, x, xNew);
        return xNew;
    };
    RungeKutta.prototype.stepsInto = function (n, h, t, x, xNew) {
        for (var i = 0; i < this.order; i++) {
            xNew[i] = x[i];
        }
        for (var i = 0; i < n; i++) {
            this.stepInto(h, t, xNew, xNew);
        }
        return this;
    };
    RungeKutta.prototype.steps = function (n, h, t, x) {
        var xNew = new Float64Array(x.length);
        this.stepsInto(n, h, t, x, xNew);
        return xNew;
    };
    RungeKutta.prototype.k = function (i, h, t, x, k) {
        var xk = x.slice();
        for (var j = 0; j < i; j++) {
            for (var l = 0; l < x.length; l++) {
                xk[l] += h * this.butcherTableau.a[i][j] * k[j][l];
            }
        }
        return this.f(t + h * this.butcherTableau.c[i], xk);
    };
    return RungeKutta;
}());
export { RungeKutta };
//# sourceMappingURL=runge-kutta.js.map