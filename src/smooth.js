import { dist2 } from './dist.js';

/**
 * Smoothes `poly` by finding and removing aberrant chains. An aberrant chain is a series of vertices such that the first and the last 
 * vertex are very close together. After removal, only the start vertex will remain in the result.
 *
 * To improve efficiency, chain length is capped at `lookahead`. This is number is actually the _maximum_ lookahead. 
 * The actual lookahead may be lower if polygon length is less than `lookahead - 1`. This is necessary because traversing the entire polygon
 * will _always_ result in an aberrant chain, with the end vertex being the start vertex after a full circumnavigation.
 * @param  {Vector[]} poly      The polygon from which to remove aberrant chains.
 * @param  {Number} threshold  The **square** of the maximum distance between the start and the end of an aberrant chain. Vertices must
 * be at most the (square root of this) distance apart for the series to be considered aberrant and removed.
 * @param  {Number} lookahead The maximum number of vertices to look ahead to find a possible end vertex. 
 * @return {Vector[]}           The polygon, with aberrant chains removed after their first vertex.
 */
export default function smooth(poly, threshold, lookahead) {
	let result = [];
	let i = 0;
	while (i < poly.length) {
		result.push(poly[i]);
		// Limit the lookahead so we don't go around the entire polygon
		// Otherwise, we will compare the current vertex against itself, which will always
		// be less than the threshold, and falsely cut out the entire polygon.
		let j = Math.min(lookahead, poly.length - 1);
		while (j > 0) {
			if (dist2(poly[i], poly[(i + j) % poly.length]) < threshold) {
				i += j;
				break;
			}
			j--;
		}
		i++;
	}
	return result;
}