var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var getNewT = function (x) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (x instanceof Float32Array) {
        var newArgs = args;
        return new (Float32Array.bind.apply(Float32Array, __spreadArrays([void 0], newArgs)))();
    }
    else if (x instanceof Float64Array) {
        var newArgs = args;
        return new (Float64Array.bind.apply(Float64Array, __spreadArrays([void 0], newArgs)))();
    }
    else if (x instanceof Array) {
        return new (Array.bind.apply(Array, __spreadArrays([void 0], args)))();
    }
    return new Array();
};
var RungeKutta = /** @class */ (function () {
    function RungeKutta(butcherTableaux, f) {
        this.butcherTableaux = butcherTableaux;
        this.f = f;
    }
    Object.defineProperty(RungeKutta.prototype, "order", {
        get: function () {
            return this.butcherTableaux.order;
        },
        enumerable: false,
        configurable: true
    });
    RungeKutta.prototype.k = function (i, h, t, x, k) {
        var xk = getNewT(x, x);
        for (var j = 0; j < i; j++) {
            for (var l = 0; l < xk.length; l++) {
                xk[l] += h * this.butcherTableaux.a[i][j] * k[j][l];
            }
        }
        return this.f(t + h * this.butcherTableaux.c[i], xk);
    };
    RungeKutta.prototype.stepInto = function (h, t, x, xNew) {
        var k = [];
        for (var i = 0; i < this.order; i++) {
            k.push(this.k(i, h, t, x, k));
        }
        for (var j = 0; j < this.order; j++) {
            for (var l = 0; l < x.length; l++) {
                xNew[l] = h * this.butcherTableaux.b[j] * k[j][l] + x[l];
            }
        }
        return this;
    };
    RungeKutta.prototype.step = function (h, t, x) {
        var xNew = getNewT(x, x.length);
        this.stepInto(h, t, x, xNew);
        return xNew;
    };
    RungeKutta.prototype.stepsInto = function (n, h, t, x, xNew) {
        for (var l = 0; l < x.length; l++) {
            xNew[l] = x[l];
        }
        for (var i = 0; i < n; i++) {
            this.stepInto(h, t, xNew, xNew);
        }
        return this;
    };
    RungeKutta.prototype.steps = function (n, h, t, x) {
        var xNew = getNewT(x, x);
        this.stepsInto(n, h, t, xNew, xNew);
        return xNew;
    };
    return RungeKutta;
}());
export default RungeKutta;
//# sourceMappingURL=runge-kutta.class.js.map