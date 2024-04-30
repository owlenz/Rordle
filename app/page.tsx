"use client";
import HealthBar from "@/components/healthBar";
import Button from "@/components/button";
import data from "@/ror.json";
import { useEffect, useState } from "react";
import Image from "next/image";
import Edge from "@/components/edge";

interface Item {
	name: string;
	desc: string;
	stack: string;
	imageLink: string;
	release: string;
	rarity: string;
	oneTimeUse: boolean;
}

const Home = () => {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState<Array<Item>>([]);
	const [focus, setFocus] = useState(false);
	const [hp, setHp] = useState(2000);
	const [answers, setAnswers] = useState<Array<Item>>([]);
	const [realAnswer, setRealAnswer] = useState(
		data[Math.floor(Math.random() * data.length)],
	);
	console.log(realAnswer);

	useEffect(() => {
		const ls = localStorage.getItem("stats");

		if (ls) {
			const Storage = JSON.parse(ls);
			setHp(Storage.hp);
		}
	});

	useEffect(() => {
		const result = data.filter((entry) => {
			return entry.name.toLowerCase().includes(search.toLowerCase());
		});
		const finalResult = result.filter((entry) => {
			return !answers.includes(entry);
		});
		setResults(finalResult.slice(0, 10));
		// console.log({ result, results });
	}, [search]);

	const submitAnswer = (name: string) => {
		setFocus(false);
		setSearch("");
		const aloo = answers.concat(results.filter((xdd) => xdd.name == name));
		setAnswers(aloo);
		setResults(results.filter((xdd) => xdd.name != name));

		if (aloo[aloo.length - 1] == realAnswer) {
			console.log("Winner");
		}

		localStorage.setItem("userAnswers", JSON.stringify(aloo));
		console.log(aloo);
	};

	return (
		<main className="flex flex-col w-[800px] items-center p-16 font-bombard">
			<div className="bg-black bg-opacity-70 p-6 text-white z-30 box w-full flex flex-col items-center gap-4 relative">
				<h2 className="text-4xl text-center">Guess Today's Item</h2>
				<HealthBar value={hp} />

				<div className="w-full flex flex-col items-center relative">
					<input
						tabIndex={0}
						placeholder="xdd"
						value={search}
						onFocus={() => setFocus(true)}
						onBlur={() => setFocus(false)}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						className="w-[60%] cursor-default border-t-2 border-l-2 border-[#5C5D5D] focus:bg-[#CDD191] hover:bg-[#CDD191] outline-offset-0 outline-2 outline-[#B4B4B4] px-2 h-8 text-lg text-black bg-[#8B8B8C] appearance-none outline-none placeholder:text-[#6A6A6B] placeholder:italic"
					/>
					{search && focus ? (
						<div className="absolute top-[110%] w-[57%] z-30 bg-black overflow-y-auto max-h-56">
							{results.map((entry) => {
								return (
									<button
										tabIndex={0}
										key={entry.name}
										role="button"
										onMouseDown={(e) => {
											e.preventDefault();
											submitAnswer(entry.name);
										}}
										className="w-full flex items-center gap-4 px-2 py-1"
									>
										<Image
											alt="xdd"
											src={entry.imageLink}
											width={50}
											height={50}
										/>
										{entry.name}
									</button>
								);
							})}
						</div>
					) : null}
				</div>
			</div>
			{answers.length ? (
				<div className="bg-black bg-opacity-70 p-2 text-white  box w-full flex flex-col gap-3 relative mt-10">
					<div className="flex gap-4 font-bold text-[20px]">
						<span className="w-24 text-center">Item</span>
						<span className="w-24 text-center">Rarity</span>
						<span className="w-24 text-center">Modifiers</span>
						<span className="w-24 text-center">Stacking</span>
						<span className="w-24 text-center">Release</span>
					</div>
					{answers.map((entry) => {
						return (
							<div
								key={entry.name}
								className="flex gap-4 text-[18px] text-center"
							>
								<div className="w-24 h-24 bg-[url('/BgCommon.webp')] bg-no-repeat bg-cover relative flex items-center justify-center">
									<Image
										alt={entry.name}
										height={70}
										width={70}
										src={entry.imageLink}
									/>
									<Edge />
								</div>
								<div className="w-24 h-24 bg-no-repeat bg-cover relative flex items-center justify-center">
									<span className="z-10"> {entry.rarity}</span>
									<Edge />
								</div>
								<div className="w-24 h-24  bg-no-repeat bg-cover relative flex items-center justify-center">
									<span className="h-full w-full z-10 overflow-hidden text-ellipsis leading-4 flex items-center justify-center ">
										{entry.modifiers}
									</span>
									<Edge />
								</div>
								<div className="w-24 h-24  bg-no-repeat bg-cover relative flex items-center justify-center">
									<span className="z-10 "> {entry.stack}</span>
									<Edge />
								</div>
								<div className="w-24 h-24  bg-no-repeat bg-cover relative flex items-center justify-center">
									<span className="z-10 "> {entry.release}</span>
									<Edge />
								</div>
								<div className="w-24 h-24  bg-no-repeat bg-cover relative flex items-center justify-center">
									<span className="z-10 "> {entry.oneTimeUse}</span>
								</div>
							</div>
						);
					})}
				</div>
			) : null}

			<div className="flex gap-10 mt-10">
				<Button type={"button"}>Back</Button>
				<Button
					className="bg-[#9A00C7] hover:brightness-150 hover:border-white hover:bg-opacity-100"
					type={"button"}
					style={{ border: "2px solid #B600EB" }}
				>
					Back
				</Button>
			</div>
		</main>
	);
};

export default Home;
