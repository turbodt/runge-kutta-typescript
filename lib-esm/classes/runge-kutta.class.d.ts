import ButcherTableau from "./butcher-tableaux.class";
declare type _T = Float32Array | Float64Array | number[];
declare type F<T> = (t: number, x: T) => T;
export default class RungeKutta<T extends _T> {
    private butcherTableau;
    f: F<T>;
    constructor(butcherTableau: ButcherTableau, f: F<T>);
    get order(): number;
    k(i: number, h: number, t: number, x: T, k: T[]): T;
    stepInto(h: number, t: number, x: T, xNew: T): RungeKutta<T>;
    step(h: number, t: number, x: T): T;
    stepsInto(n: number, h: number, t: number, x: T, xNew: T): RungeKutta<T>;
    steps(n: number, h: number, t: number, x: T): T;
}
export {};
