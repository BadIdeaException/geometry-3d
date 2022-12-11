import { length, length2, subtract } from './vector.js';

/**
 * Returns the distance between points `p` and `q`.
 */
export function dist(p, q) {
	return length(subtract(p, q));
}

/**
 * Returns the **square** of the distance between points `p` and `q`.
 */
export function dist2(p, q) {
	return length2(subtract(p, q));
}