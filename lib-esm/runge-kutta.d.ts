import { ODEFunction } from "./types";
import { ButcherTableau } from "./butcher-tableaux";
export declare class RungeKutta {
    protected butcherTableau: ButcherTableau;
    f: ODEFunction;
    constructor(butcherTableau: ButcherTableau, f: ODEFunction);
    get order(): number;
    stepInto(h: number, t: number, x: Float64Array, xNew: Float64Array): RungeKutta;
    step(h: number, t: number, x: Float64Array): Float64Array;
    stepsInto(n: number, h: number, t: number, x: Float64Array, xNew: Float64Array): RungeKutta;
    steps(n: number, h: number, t: number, x: Float64Array): Float64Array;
    private k;
}
