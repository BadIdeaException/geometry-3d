/**
 * Reduces `vertices` to a lower number of dimensions by discarding the `axis` coordinate. 
 * Mathematically this is a projection to the axis-aligned plane that is perpendicular to `axis`, but to avoid confusion
 * with the `project` function, this function avoids the term in its name.
 * @param  {Vector[]} vertices The vertices to bring to a lower dimensionality.
 * @param  {number} axis    The coordinate to remove. If this is larger than the current number of dimensions of `vertices`,
 * this function will return `vertices` unchanged.
 * @return {Vector[]}         A list of vertices, with each vertex having all coordinates except `axis`.
 */
export function convertDown(vertices, axis) {
	return vertices.map(vertex => vertex.filter((_, index) => index !== axis));
}

/**
 * Raises `vertices` to a higher number of dimensions by introducing an `axis` coordinate. 
 * @param  {Vector[]} vertices The vertices to bring to a higher dimensionality.
 * @param  {number} axis    The zero-based index of the dimension to add. Setting `axis` to 0, for
 * instance, would insert the new dimension at the beginning. If this is larger than the current number
 * of dimensions of `vertices`, one new dimension will be added at the end, i.e. `axis` in that case will be
 * treated as if it is the current number of dimensions plus one.
 * @param  {Number} [coord = 0]   The initial value to set the new coordinate to.
 * @return {Vector[]}         A list of vertices, with each vertex having all coordinates of its
 * original as well as a new dimension set to `coord`.
 */
export function convertUp(vertices, axis, coord = 0) {
	return vertices.map(vertex => [ ...vertex.slice(0, axis), coord, ...vertex.slice(axis) ]);
}