"use client";

import HealthBar from "@/components/healthBar";
import Button from "@/components/button";
import data from "@/ror.json";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Item } from "./types";
import AnswersBox from "./answers";
import { compareObjects } from "@/utils/xdd";
import deathMessages from "@/deathMessages.json";
type gameStateT = "won" | "lost" | "playing" | undefined;
import { IoSkullSharp } from "react-icons/io5";
import Time from "@/components/time";

const Home = () => {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState<Array<Item>>([]);
	const [focus, setFocus] = useState(false);
	const [hp, setHp] = useState<number>(120);
	const [answers, setAnswers] = useState<Array<Item>>([]);
	const [realAnswer, setRealAnswer] = useState<Item>();
	const [gameState, setGameState] = useState<gameStateT>();
	const inputRef = useRef(null);

	useEffect(() => {
		const ls = localStorage.getItem("userStats");

		if (ls) {
			const Storage = JSON.parse(ls);
			setAnswers(Storage.answers);
			setHp(Storage.hp);
			setGameState(Storage.gameState);
		} else {
			setGameState("playing");
		}
		const getTodayItem = async () => {
			const item = await fetch("/api").then(xdd => xdd.json())
			console.log(item)
			setRealAnswer(item);
			if (ls) {
				const storage = JSON.parse(ls)
				if (storage.date !== item.date) {
					localStorage.removeItem("userStats")
					setAnswers([]);
					setHp(120);
					setGameState("playing");
				}
			}
		}
		getTodayItem()

	}, []);

	useEffect(() => {
		const result = data.filter((entry) => {
			return entry.name.toLowerCase().includes(search.toLowerCase());
		});

		const finalResult = result.filter((entry) => {
			return !answers.some(
				(obj) => JSON.stringify(entry) === JSON.stringify(obj),
			);
		});

		setResults(finalResult.slice(0, 10));
	}, [search]);

	const submitAnswer = (name: string) => {
		setFocus(false);
		//@ts-ignore
		inputRef.current?.blur();
		setSearch("");
		const newAnswers = answers.concat(
			results.filter((xdd) => xdd.name == name),
		);
		setAnswers(newAnswers);
		setResults(results.filter((xdd) => xdd.name != name));
		let newHP = hp;
		let newGameState: gameStateT = gameState;

		if (compareObjects(newAnswers[newAnswers.length - 1], realAnswer as Item)) {
			newGameState = "won";
			setGameState(newGameState);
			// win login
		} else {
			newHP -= 15;
		}

		if (newHP === 0) {
			newGameState = "lost";
			setGameState(newGameState);
		}

		setHp(newHP);

		let stats
		const dateToday = new Date().toDateString()
		if (newGameState == "playing")
			stats = { hp: newHP, answers: newAnswers, gameState: newGameState, date: dateToday };
		else
			stats = { hp: newHP, answers: newAnswers, gameState: newGameState, date: dateToday };

		localStorage.setItem("userStats", JSON.stringify(stats));
		console.log(newAnswers);
	};

	return realAnswer ? (
		<main className="flex flex-col w-[800px] items-center p-16 font-bombard">
			{gameState === "playing" ? (
				<div className="bg-black bg-opacity-50 p-6 text-white z-30 box w-full flex flex-col items-center gap-4 relative">
					<h2 className="text-4xl text-center">Guess Today's Item</h2>
					<HealthBar value={hp} />
					<div className="w-full flex flex-col items-center relative">
						<input
							tabIndex={0}
							ref={inputRef}
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
			) : gameState === "won" ? (
				<div className="bg-black bg-opacity-70 p-6 text-white z-30 box w-full flex flex-col items-center gap-4 relative">
					<h2 className="text-3xl">You guessed it right</h2>
					<div className="flex flex-col items-center gap-2"><h2 className="text-2xl">Today's Item is {realAnswer.name}</h2><Image alt={realAnswer.name} width={60} height={60} src={realAnswer.imageLink} /></div>
					<div className="text-2xl text-center">Next Item in <br /><Time /></div>
				</div>
			) : gameState === "lost" ? (
				<div className="bg-black bg-opacity-70 text-center p-6 text-white z-30 box w-full flex flex-col items-center gap-4 relative">
					<h2 className="text-2xl font-bold text-[#DC3939] flex gap-1 items-center">
						<IoSkullSharp />{deathMessages[Math.floor(Math.random() * deathMessages.length)]}
						<IoSkullSharp />
					</h2>
					<div className="flex flex-col items-center gap-2"><h2 className="text-2xl">Today's Item was {realAnswer.name}</h2><Image alt={realAnswer.name} width={60} height={60} src={realAnswer.imageLink} /></div>
					<div>Next Item in <br /><Time /></div>
				</div>
			) : null}
			<AnswersBox answers={answers} realAnswer={realAnswer} />
			{true ? null : (
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
			)}
		</main>
	) : null
};

export default Home;
