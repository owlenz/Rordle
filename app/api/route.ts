import data from '@/ror.json'
import { setInterval } from 'timers';
import { Item } from '../types';

let answer: Item

const todayAnswer = () => {
	answer = data[Math.floor(Math.random() * data.length)];
}


todayAnswer();
const twentyFourHours = 86400000;
const now: any = new Date();
let eta_ms: number = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 24, 0, 0, 0).getTime() - now;

if (eta_ms < 0) {
	eta_ms += twentyFourHours;
}

setTimeout(function() {
	todayAnswer();
	setInterval(todayAnswer, twentyFourHours);
}, eta_ms);

export const GET = async () => {
	const dateToday = new Date().toDateString()
	return new Response(JSON.stringify({ ...answer, date: dateToday }))
}

