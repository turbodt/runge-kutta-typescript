import { ODEFunction } from "./types";
import { ButcherTableau } from "./butcher-tableaux";


export class RungeKutta {
    private k: Float64Array[];
    constructor(
        protected butcherTableau: ButcherTableau,
        public f: ODEFunction
    ) {
        this.k = new Array(this.order);
    }

    get order(): number {
        return this.butcherTableau.order;
    }

    public stepInto(
        h: number,
        t: number,
        x: Float64Array,
        xNew: Float64Array
    ): RungeKutta {
        this.updateK(h,t,x);

        // This loop ordering allows xNew and x to reference the same array
        // without conflicts
        for (let l = 0; l < x.length; l++) {
            xNew[l] = x[l];
            for (let j = 0; j < this.order; j++) {
                xNew[l] += h*this.butcherTableau.b[j] * this.k[j][l];
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
        for (let l = 0; l < x.length; l++) {
            xNew[l] = x[l];
        }

        for (; n > 0; n--) {
            this.stepInto(h, t, xNew, xNew);
            t += h;
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

    private updateK(h: number, t: number, x: Float64Array): void {
        const xk = new Float64Array(x.length);
        for (let i = 0; i < this.order; i++) {
            for (let l = 0; l < x.length; l++) {
                xk[l] = 0;
                for (let j = 0; j < i; j++) {
                    xk[l] += this.butcherTableau.a[i][j] * this.k[j][l];
                }
                xk[l] *= h;
                xk[l] += x[l];
            }
            this.k[i] = this.f(t + h * this.butcherTableau.c[i], xk);
        }
    }

}
