export declare class ButcherTableau {
    readonly order: number;
    a: Float64Array[];
    b: Float64Array;
    c: Float64Array;
    protected data: Float64Array;
    constructor(order: number);
    toString(): string;
    makeItConsistent(): ButcherTableau;
}
