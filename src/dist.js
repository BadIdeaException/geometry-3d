import { length, length2, subtract } from './vector.js';

export function dist(p, q) {
	return length(subtract(p, q));
}

export function dist2(p, q) {
	return length2(subtract(p, q));
}