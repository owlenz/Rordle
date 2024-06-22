import React from "react";

const Edge = () => {
	return (
		<svg
			viewBox="0 0 100 100"
			width="108px"
			className="absolute z-[1] -left-[6px] -top-[6px]"
		>
			<path d="M15,2 L2,2 L2,15" fill="none" stroke="white" strokeWidth="3" />
			<path d="M2,85 L2,98 L15,98" fill="none" stroke="white" strokeWidth="3" />
			<path
				d="M85,98 L98,98 L98,85"
				fill="none"
				stroke="white"
				strokeWidth="3"
			/>
			<path d="M98,15 L98,2 L85,2" fill="none" stroke="white" strokeWidth="3" />
		</svg>
	);
};

export default Edge;
