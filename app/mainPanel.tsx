import HealthBar from "@/components/healthBar";
import React from "react";

const MainPanel = ({ hp }) => {
	return (
		<div className="bg-black bg-opacity-70 p-6 text-white z-30 box w-full flex flex-col items-center gap-4 relative">
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
	);
};

export default MainPanel;
