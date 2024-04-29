const HealthBar = () => {
	return (
		<div className="w-96 h-8 bg-black bg-opacity-55 p-0 flex items-center justify-normal relative">
			<div className=" w-[50%] mx-1 h-[90%] bg-[#7C0102] flex justify-center items-center absolute"></div>
			<span className="z-10 w-full text-center">1000/2000</span>
		</div>
	);
};

export default HealthBar;
