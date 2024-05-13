import data from '@/ror.json'
import { setInterval } from 'timers';
import { Item } from '../types';

let answer: Item

const todayAnswer = () => {
	answer = data[Math.floor(Math.random() * data.length)];
}

todayAnswer()

console.log("xdd")

const dayMS = 24 * 60 * 60 * 1000
setInterval(todayAnswer, dayMS)

export const GET = async () => {
	return new Response(JSON.stringify(answer))
}
