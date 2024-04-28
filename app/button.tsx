import React from "react";

const Button = ({ children, onClick = "", type, className = "" }) => {
	return (
		<button
			onClick={onClick}
			type={type || "button"}
			className={`${className} px-[60px] cursor-pointer py-1 border-2 border-white duration-[60ms] hover:border hover:border-gray-400 hover:ring-2 hover:ring-white hover:ring-offset-2 ring-offset-black transition-all hover:bg-white hover:bg-opacity-20`}
		>
			{children}
		</button>
	);
};

export default Button;
