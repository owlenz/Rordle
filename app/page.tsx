"use client";
import HealthBar from "@/components/healthBar";
import Button from "@/components/button";
import data from "@/ror.json";
import { useEffect, useState } from "react";
import Image from "next/image";
import fs from "fs";
const Home = () => {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState([{}]);
	const [focus, setFocus] = useState(false);
	const [hp, setHp] = useState(2000);

	useEffect(() => {
		const ls = localStorage.getItem("stats");
		if (ls) {
			const Storage = JSON.parse(ls);
			setHp(Storage.hp);
		}
	});

	useEffect(() => {
		const result = data.filter((entry) => {
			console.log(search);
			return entry.name.toLowerCase().includes(search.toLowerCase());
		});
		setResults(result.slice(0, 10));
		console.log({ result, results });
	}, [search]);

	return (
		<main className="flex flex-col w-[800px] items-center p-16 font-bombard">
			<div className="bg-black bg-opacity-50 p-6 text-white z-10 box w-full flex flex-col items-center gap-4 relative">
				<h2 className="text-4xl text-center">Guess Today's Item</h2>
				<HealthBar value={hp} />

				<div className="w-full flex flex-col items-center relative">
					<input
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
						<div className="absolute top-[110%] w-[57%] bg-black overflow-y-auto max-h-56">
							{results.map((entry) => {
								return (
									<div className="w-full flex items-center gap-4 px-2 py-1">
										<Image
											alt="xdd"
											src={entry.imageLink}
											width={50}
											height={50}
										/>
										{entry.name}
									</div>
								);
							})}
						</div>
					) : null}
				</div>
			</div>

			<h2 className=" text-white">sdsaads</h2>
			<div className="flex gap-10">
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
