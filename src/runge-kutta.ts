import { DataArray, ODEFunction, Constructor } from "./types";
import { ButcherTableau } from "./butcher-tableaux";
import { getCopy } from "./utils";


export class RungeKutta<T extends DataArray> {
    constructor(
        protected butcherTableau: ButcherTableau<T>,
        public f: ODEFunction<T>
    ) {}

    get order(): number {
        return this.butcherTableau.order;
    }

    get Type(): Constructor<T> {
        return this.butcherTableau.Type;
    }

    public k(i: number, h: number, t: number, x: T, k: T[]): T {
        const xk = getCopy(x);
        for (let j = 0; j < i; j++) {
            for (let l = 0; l < xk.length; l++) {
                xk[l] += h * this.butcherTableau.a[i][j] * k[j][l];
            }
        }
        return this.f(t + h * this.butcherTableau.c[i], xk);
    }

    public stepInto(h: number, t: number, x: T, xNew: T): RungeKutta<T> {
        const k: T[] = [];
        for (let i = 0; i < this.order; i++) {
            k.push(this.k(i, h, t, x, k));
        }
        for (let j = 0; j < this.order; j++) {
            for (let l = 0; l < x.length; l++) {
                xNew[l] = h * this.butcherTableau.b[j] * k[j][l] + x[l];
            }
        }
        return this;
    }

    public step(h: number, t: number, x: T): T {
        const xNew = new this.Type(x.length);
        this.stepInto(h, t, x, xNew);
        return xNew;
    }

    public stepsInto(
        n: number,
        h: number,
        t: number,
        x: T,
        xNew: T
    ): RungeKutta<T> {
        for (let l = 0; l < x.length; l++) {
            xNew[l] = x[l];
        }
        for (let i = 0; i < n; i++) {
            this.stepInto(h, t, xNew, xNew);
        }
        return this;
    }

    public steps(n: number, h: number, t: number, x: T): T {
        const xNew = new this.Type(x.length);
        this.stepsInto(n, h, t, xNew, xNew);
        return xNew;
    }
}
