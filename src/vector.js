/**
 * A vector in an arbitrary number of dimensions, most typically in 2-space or 3-space. 
 * @typedef {number[]} Vector
 */

/**
 * The origin vector: `[0,0,0]`.
 */
export const ZERO = [ 0, 0, 0 ];

/**
 * Adds `u` and `v`. 
 *
 * Works in any dimension, but note that for performance reasons no check is performed to see that `u` and `v` have the same dimension.
 */
export function add(u, v) {
	let result = new Array(u.length);
	for (let i = 0; i < u.length; i++) 
		result[i] = u[i] + v[i];
	return result;
}

/**
 * Subtracts `v` from `u`.
 *
 * Works in any dimension, but note that for performance reasons no check is performed to see that `u` and `v` have the same dimension.
 */
export function subtract(u, v) {
	let result = new Array(u.length);
	for (let i = 0; i < u.length; i++) 
		result[i] = u[i] - v[i];
	return result;
}

/**
 * Multiplies vector `v` with scalar `a`. 
 *
 * Works in any dimension, but note that for performance reasons no check is performed to see that `u` and `v` have the same dimension.
 */
export function scale(v, a) {
	let result = new Array(v.length);
	for (let i = 0; i < v.length; i++) 
		result[i] = a * v[i];
	return result;
}

/**
 * Calculates the dot product of `u` and `v`. 
 *
 * Works in any dimension, but note that for performance reasons no check is performed to see that `u` and `v` have the same dimension.
 */
export function dot(u, v) {
	let result = 0;
	for (let i = 0; i < u.length; i++) 
		result += u[i] * v[i];
	return result;
}

/**
 * Calculates the cross product of `u` and `v`. 
 *
 * This only works in three dimensions, but note that for performance reasons no check is performed.
 */
export function cross(u, v) {
	return [
		u[1] * v[2] - u[2] * v[1],
		u[2] * v[0] - u[0] * v[2],
		u[0] * v[1] - u[1] * v[0]
	]
}

/**
 * Returns the length of the vector `v`.
 *
 * Works in any dimension.
 */
export function length(v) {
	return Math.sqrt(length2(v));
}

/**
 * Returns the square of the length of `v`. 
 *
 * `Math.sqrt` is an expensive operation, and many computations can just as well be performed with the squared length.
 *
 * Works in any dimension.
 */
export function length2(v) {
	let result = 0;
	for (let i = 0; i < v.length; i++) {
		result += v[i]**2;
	}
	return result;
}