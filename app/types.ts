export interface Item {
	name: string;
	date?: string
	desc: string;
	stack: string;
	imageLink: string;
	release: string;
	rarity: string;
	oneTimeUse: boolean;
	modifiers: Array<string>;
}

export interface goodEntry {
	name?: string;
	desc?: string;
	stack: string;
	imageLink?: string;
	release: string;
	rarity: string;
	oneTimeUse: boolean;
	modifiers: Array<string>;
}

export type Color = "red" | "yellow" | "green"

