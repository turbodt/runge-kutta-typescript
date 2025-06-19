export class ButcherTableau {
    public a: Float64Array[];
    public b: Float64Array;
    public c: Float64Array;
    protected data: Float64Array;

    constructor(
        public readonly order: number
    ) {
        this.data = new Float64Array(
            this.order * this.order + this.order + this.order
        );

        this.a = [];
        for (let i = 0; i < this.order; i++) {
            this.a.push(
                this.data.subarray(i * this.order, (i + 1) * this.order)
            );
        }

        this.b = this.data.subarray(
            this.order * this.order,
            this.order * (1 + this.order)
        )

        this.c = this.data.subarray(
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

    public makeItConsistent(): ButcherTableau {
        this.a.forEach((row, i) => {
            this.c[i] = 0;
            for (let j = 0; j < this.order; j++) {
                this.c[i] += row[j];
            }
        });
        return this;
    }
}
