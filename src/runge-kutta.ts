import { ODEFunction } from "./types";
import { ButcherTableau } from "./butcher-tableaux";


export class RungeKutta {
    constructor(
        protected butcherTableau: ButcherTableau,
        public f: ODEFunction
    ) {}

    get order(): number {
        return this.butcherTableau.order;
    }

    public stepInto(
        h: number,
        t: number,
        x: Float64Array,
        xNew: Float64Array
    ): RungeKutta {
        const k: Float64Array[] = new Array(this.order);
        for (let i = 0; i < this.order; i++) {
            k[i] = this.k(i, h, t, x, k);
        }
        for (let j = 0; j < this.order; j++) {
            for (let l = 0; l < x.length; l++) {
                xNew[l] = h * this.butcherTableau.b[j] * k[j][l] + x[l];
            }
        }
        return this;
    }

    public step(h: number, t: number, x: Float64Array): Float64Array {
        const xNew = new Float64Array(x.length);
        this.stepInto(h, t, x, xNew);
        return xNew;
    }

    public stepsInto(
        n: number,
        h: number,
        t: number,
        x: Float64Array,
        xNew: Float64Array
    ): RungeKutta {
        for (let i = 0; i < this.order; i++) {
            xNew[i] = x[i];
        }
        for (let i = 0; i < n; i++) {
            this.stepInto(h, t, xNew, xNew);
        }
        return this;
    }

    public steps(
        n: number,
        h: number,
        t: number,
        x: Float64Array
    ): Float64Array {
        const xNew = new Float64Array(x.length);
        this.stepsInto(n, h, t, x, xNew);
        return xNew;
    }

    private k(
        i: number,
        h: number,
        t: number,
        x: Float64Array,
        k: Float64Array[]
    ): Float64Array {
        const xk = x.slice();
        for (let j = 0; j < i; j++) {
            for (let l = 0; l < x.length; l++) {
                xk[l] += h * this.butcherTableau.a[i][j] * k[j][l];
            }
        }
        return this.f(t + h * this.butcherTableau.c[i], xk);
    }

}
