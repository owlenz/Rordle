import { Color, Item } from "@/app/types";

export function compareObjects(x: object, y: Item) {
	const xdd = Object.assign({}, y);
	delete xdd.date
	return JSON.stringify(x) === JSON.stringify(xdd);
}

function arraysEqual<T>(x: Array<T>, y: Array<T>): boolean {
	return x.length === y.length && x.every((value, key) => y[key] === value);
}

export function compareArrays<T>(x: Array<T>, y: Array<T>): Color {
	x.sort()
	y.sort()

	if (arraysEqual<T>(x, y))
		return "green"
	else if (y.some(value => x.includes(value)))
		return "yellow"
	else
		return "red"
}
