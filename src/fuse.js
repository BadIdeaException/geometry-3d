import { dist2 } from './dist.js';

/**
 * Fuses any vertices in `vertices` that are closer together than specified by the threshold. Specifically, for any consecutive pair of vertices 
 * `u` and `v`, if the square of the length of `u - v` is less than `threshold`, `u` will be removed from the result.
 * 
 * @param  {Vector[]} vertices      The list of vertices
 * @param  {[type]} threshold The **square** of the minimum distance between vertices.
 * @return {Vector[]}           The input with vertices that were close together fused.
 */
export default function fuse(vertices, threshold) {
	return vertices.filter((vertex, index) => dist2(vertex, vertices[(index + 1) % vertices.length]) >= threshold);
}