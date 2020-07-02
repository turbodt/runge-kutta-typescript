declare type T = Float32Array | Float64Array;
declare type TT = Float32ArrayConstructor | Float64ArrayConstructor;
export default class ButcherTableau {
    readonly order: number;
    private data;
    constructor(order: number, Type?: TT);
    get a(): T[];
    get b(): T;
    get c(): T;
    toString(): string;
    makeItConsistent(): ButcherTableau;
}
export declare const rk4ButcherTableau: ButcherTableau;
export {};
