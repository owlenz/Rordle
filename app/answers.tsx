import Edge from "@/components/edge";
import Image from "next/image";
import React from "react";
import { Color, Item, goodEntry } from "./types";
import { compareArrays, compareObjects } from "@/utils/xdd";


const Answers = ({ entry, realAnswer }: { entry: Item; realAnswer: Item }) => {
	const xdd: goodEntry = Object.assign({}, entry);
	delete xdd.desc;
	delete xdd.imageLink;
	delete xdd.name;
	delete xdd.stack;
	return (
		<div className="flex gap-4 text-[18px] text-center">
			<div className={`w-24 h-24 bg-[url('/Bg${entry.rarity}.webp')]  bg-no-repeat bg-cover relative flex items-center justify-center`}>
				<Image alt={entry.name} height={70} width={70} src={entry.imageLink} />
				<Edge />
			</div>
			{Object.entries(xdd).map(([key, value]) => {
				let color: Color;
				// @ts-ignore
				const answerKey = realAnswer[key].toString()
				if (key === "modifiers" || key === "colors") {
					color = compareArrays<string>(xdd[key], realAnswer.modifiers)
				} else {
					if (value.toString() == answerKey) {
						color = "green";
					} else {
						color = "red";
					}
				}

				return (
					<div
						className={
							"w-24 h-24 bg-no-repeat bg-cover relative flex items-center justify-center " +
							color
						}
					>
						{key === "modifiers" || key === "colors" ? <span>{value.map((element: string) => {
							return element + " "
						})}</span> : <span className="z-10">{value.toString()}</span>}
						<Edge />
					</div>
				);
			})}
		</div>
	);
};

const AnswersBox = ({
	answers,
	realAnswer,
}: {
	answers: Item[];
	realAnswer: Item;
}) => {
	return answers.length &&
		!compareObjects(answers[answers.length - 1], realAnswer) ? (
		<div className="bg-black bg-opacity-70 p-2 text-white box w-full flex flex-col gap-5 relative mt-10">
			<div className="flex gap-4 font-bold text-[18px]">
				<span className="w-24 text-center">Item</span>
				<span className="w-24 text-center">Release</span>
				<span className="w-24 text-center">Rarity</span>
				<span className="w-24 text-center">One Time</span>
				<span className="w-24 text-center">Modifiers</span>
				<span className="w-24 text-center">Colors</span>
			</div>
			{answers.map((entry, index) => {
				return (
					<Answers key={index} realAnswer={realAnswer} entry={entry} />
				)
			})}
		</div>
	) : null;
};
export default AnswersBox;
