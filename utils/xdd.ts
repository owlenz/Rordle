import { Color } from "@/app/types";

export function compareObjects(x: object, y: object) {
	return JSON.stringify(x) === JSON.stringify(y);
}

function arraysEqual<T>(x: Array<T>, y: Array<T>): boolean {
	return x.length === y.length && x.every((value, key) => y[key] === value);
}

export function compareArrays<T>(x: Array<T>, y: Array<T>): Color {
	console.log(typeof x, x)
	x.sort()
	y.sort()

	if (arraysEqual<T>(x, y))
		return "green"
	else if (y.some(value => x.includes(value)))
		return "yellow"
	else
		return "red"
}
