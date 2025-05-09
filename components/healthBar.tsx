"use client";

const HealthBar = ({ value }: { value: number }) => {
	return (
		<div className="w-[30rem] h-8 bg-gradient-to-r from-[0.0001%] from-transparent via-black to-transparent to-[99.9999%] bg-opacity-55 flex items-center relative">
			<div
				className={` h-[77%] bg-[#7C0102] mx-7`}
				style={{ width: `${value}%` }}
			></div>
			<span className="z-1 w-full text-center absolute font-bold">
				{value}/120
			</span>
		</div>
	);
};

export default HealthBar;
