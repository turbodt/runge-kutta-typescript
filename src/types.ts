export type Constructor<T extends {} = {}> = new (...args: any[]) => T;

export type DataArray = Float32Array | Float64Array | number[];

export type ODEFunction<T extends DataArray> = (t: number, x: T) => T;
