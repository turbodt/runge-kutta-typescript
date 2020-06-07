import { rk4ButcherTableaux, RungeKutta } from "./src/index";

test("Basic ODE with number[]", () => {
	const f = (t: number, x: [number, number]): [number, number] => {
		const dx = new Array(2) as [number, number];
		dx[0] = -x[1];
		dx[1] = x[0];
		return dx;
	};

	const r2 = (x: [number, number]) => x[0] * x[0] + x[1] * x[1];

	const rk4 = new RungeKutta(rk4ButcherTableaux, f);
	const x = new Array(2) as [number, number];
	x[0] = 1;
	x[1] = 0;
	for (let i = 0; i < 50; i++) {
		rk4.stepsInto(10, 0.01, 0, x, x);
		expect(r2(x)).toBeCloseTo(1, 5);
	}
});

test("Basic ODE with Float32Array", () => {
	const f = (t: number, x: Float32Array) => {
		const dx = new Float32Array(2);
		dx[0] = -x[1];
		dx[1] = x[0];
		return dx;
	};

	const r2 = (x: Float32Array) => x[0] * x[0] + x[1] * x[1];

	const rk4 = new RungeKutta(rk4ButcherTableaux, f);
	const x = new Float32Array(2);
	x[0] = 1;
	x[1] = 0;
	for (let i = 0; i < 50; i++) {
		rk4.stepsInto(10, 0.01, 0, x, x);
		expect(r2(x)).toBeCloseTo(1.0, 5);
	}
});

test("Basic ODE with Float64Array", () => {
	const f = (t: number, x: Float64Array) => {
		const dx = new Float64Array(2);
		dx[0] = -x[1];
		dx[1] = x[0];
		return dx;
	};

	const r2 = (x: Float64Array) => x[0] * x[0] + x[1] * x[1];

	const rk4 = new RungeKutta(rk4ButcherTableaux, f);
	const x = new Float64Array(2);
	x[0] = 1;
	x[1] = 0;
	for (let i = 0; i < 50; i++) {
		rk4.stepsInto(10, 0.01, 0, x, x);
		expect(r2(x)).toBeCloseTo(1.0, 7);
	}
});
