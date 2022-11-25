import earcut from 'earcut';

/**
 * Breaks the polygon up into triangles.
 * @param  {Vector[]} polygon The polygon to break up into triangles.
 * @return {Vector[][]}         An array of non-overlapping triangles that together would cover the polygon.
 * @throws If `polygon` has less than three vertices.
 */
export default function triangulate(polygon) {
	if (polygon.length < 3) 
		throw new TypeError(`Cannot triangulate a polygon with only ${polygon.length} vertices`)

	const dims = polygon[0].length;

	let vertices = polygon.flat();
	let indices = earcut(vertices, null, dims);
	let triangles = [];
	for (let i = 0; i < indices.length; i = i + dims) {
		let tri = new Array(dims);
		for (let j = 0; j < dims; j++)
			tri[j] = polygon[indices[i + j]];
		tri.id = polygon.id;
		triangles.push(tri);
	}
	return triangles;
}

