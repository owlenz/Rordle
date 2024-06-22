import React, { useEffect, useState } from 'react'

const Time = () => {
	const [eta, setEta] = useState<number>(0)
	useEffect(() => {
		const twentyFourHours = 86400000;

		const calculateEta = () => {
			const now = new Date();
			let eta_ms = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 24, 0, 0, 0).getTime() - now.getTime();

			if (eta_ms < 0) {
				eta_ms += twentyFourHours;
			}

			setEta(eta_ms);
		};

		calculateEta();
		const interval = setInterval(calculateEta, 1000);

		return () => clearInterval(interval);
	}, []);
	const formatTime = (milliseconds: number) => {
		const totalSeconds = Math.floor(milliseconds / 1000);
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};

	return (
		<div>{formatTime(eta)}</div>
	)
}

export default Time
