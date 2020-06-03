import ButcherTableaux from "./butcher-tableaux.class";
declare type _T = Float32Array | Float64Array | number[];
declare type F<T> = (t: number, x: T) => T;
export default class RungeKutta<T extends _T> {
    private butcherTableaux;
    f: F<T>;
    constructor(butcherTableaux: ButcherTableaux, f: F<T>);
    get order(): number;
    k(i: number, h: number, t: number, x: T, k: T[]): T;
    stepInto(h: number, t: number, x: T, xNew: T): RungeKutta<T>;
    step(h: number, t: number, x: T): T;
    stepsInto(n: number, h: number, t: number, x: T, xNew: T): RungeKutta<T>;
    steps(n: number, h: number, t: number, x: T): T;
}
export {};
