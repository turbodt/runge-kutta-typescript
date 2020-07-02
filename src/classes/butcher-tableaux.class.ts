type T = Float32Array | Float64Array;
type TT = Float32ArrayConstructor | Float64ArrayConstructor;

export default class ButcherTableau {
	private data: T;

	constructor(public readonly order: number, Type: TT = Float32Array) {
		this.data = new Type(this.order * this.order + this.order + this.order);
	}

	get a(): T[] {
		const a = [];
		for (let i = 0; i < this.order; i++) {
			a.push(this.data.subarray(i * this.order, (i + 1) * this.order));
		}
		return a;
	}

	get b(): T {
		return this.data.subarray(
			this.order * this.order,
			this.order * (1 + this.order)
		);
	}

	get c(): T {
		return this.data.subarray(
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

export const rk4ButcherTableau = new ButcherTableau(4);
rk4ButcherTableau.a[1][0] = 0.5;
rk4ButcherTableau.a[2][1] = 0.5;
rk4ButcherTableau.a[3][2] = 1.0;
rk4ButcherTableau.makeItConsistent();

rk4ButcherTableau.b[0] = 0.3333333333333333;
rk4ButcherTableau.b[1] = 0.1666666666666666;
rk4ButcherTableau.b[2] = 0.1666666666666666;
rk4ButcherTableau.b[3] = 0.3333333333333333;
