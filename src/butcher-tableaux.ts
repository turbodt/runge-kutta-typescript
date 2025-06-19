import { DataArray, Constructor } from "./types";
import { subarray, Subarray } from "./utils";


export class ButcherTableau<T extends DataArray> {
    public a: T[];
    public b: T;
    public c: T;
    protected data: T;
    protected subarray: Subarray<T>;

    constructor(
        public readonly Type: Constructor<T>,
        public readonly order: number
    ) {
        this.data = new this.Type(
            this.order * this.order + this.order + this.order
        );
        this.subarray = subarray(this.data);

        this.a = [];
        for (let i = 0; i < this.order; i++) {
            this.a.push(this.subarray(i * this.order, (i + 1) * this.order));
        }

        this.b = this.subarray(
            this.order * this.order,
            this.order * (1 + this.order)
        )

        this.c = this.subarray(
            this.order * (1 + this.order),
            this.order * (2 + this.order)
        );
    }

    public toString(): string {
        let s = "";
        for (let i = 0; i < this.order; i++) {
            s += `${this.c[i]} : `;
            s += `${this.a[i].join(" ")}`;
            s += `\n`;
        }
        s += `\t : ${this.b.join(" ")}\n`;
        return s;
    }

    public makeItConsistent(): ButcherTableau<T> {
        this.a.forEach((row, i) => {
            this.c[i] = 0;
            for (let j = 0; j < this.order; j++) {
                this.c[i] += row[j];
            }
        });
        return this;
    }
}
