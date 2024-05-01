export function compareObjects(x: object, y: object) {
	return JSON.stringify(x) === JSON.stringify(y);
}
