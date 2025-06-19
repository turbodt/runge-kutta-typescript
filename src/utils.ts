import { DataArray, Constructor } from "./types";

export const getConstructorOfSameTypeAs = <T extends DataArray>(
  x: T
): Constructor<T> => {
  if (x instanceof Float32Array) {
    return (Float32Array as unknown) as Constructor<T>;
  } else if (x instanceof Float64Array) {
    return (Float64Array as unknown) as Constructor<T>;
  } else if (x instanceof Array) {
    return (Array as unknown) as Constructor<T>;
  }
  throw Error("Instance example has not a valid type.");
};

export const getCopy = <T extends DataArray>(x: T): T => {
  if (x instanceof Float32Array) {
    return new (getConstructorOfSameTypeAs(x))(x);
  } else if (x instanceof Float64Array) {
    return new (getConstructorOfSameTypeAs(x))(x);
  } else if (x instanceof Array) {
    return x.slice() as T;
  }
  throw Error("Instance to copy has not a valid type.");
};

export type Subarray<T extends DataArray> = (begin?: number, end?: number) => T;

export const subarray = <T extends DataArray>(x: T): Subarray<T> => {
  if (x instanceof Float32Array || x instanceof Float64Array) {
    return (begin?: number, end?: number): T => x.subarray(begin, end) as T;
  } else if (x instanceof Array) {
    return (begin?: number, end?: number): T => x.slice(begin, end) as T;
  }
  throw Error("Instance to subarray has not a valid type.");
};
