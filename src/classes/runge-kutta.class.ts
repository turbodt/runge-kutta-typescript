import ButcherTableau from "./butcher-tableaux.class";

type _T = Float32Array | Float64Array | number[];
const getNewT = <K extends _T>(x: K, ...args: any[]): K => {
	if (x instanceof Float32Array) {
		const newArgs = args as [any?, any?, any?];
		return new Float32Array(...newArgs) as K;
	} else if (x instanceof Float64Array) {
		const newArgs = args as [any?, any?, any?];
		return new Float64Array(...newArgs) as K;
	} else if (x instanceof Array) {
		return new Array(...args) as K;
	}
	return new Array() as K;
};

const getNewCopyOfT = <K extends _T>(x: K): K => {
	if (x instanceof Float32Array) {
		return getNewT(x, x);
	} else if (x instanceof Float64Array) {
		return getNewT(x, x);
	} else if (x instanceof Array) {
		return x.slice() as K;
	}
	return new Array() as K;
};

type F<T> = (t: number, x: T) => T;

export default class RungeKutta<T extends _T> {
	constructor(private butcherTableau: ButcherTableau, public f: F<T>) {}

	get order(): number {
		return this.butcherTableau.order;
	}

	public k(i: number, h: number, t: number, x: T, k: T[]): T {
		const xk = getNewCopyOfT(x);
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
		const xNew = getNewT(x, x.length);
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
		const xNew = getNewCopyOfT(x);
		this.stepsInto(n, h, t, xNew, xNew);
		return xNew;
	}
}
