import earcut from 'earcut';

/**
 * Breaks the two-dimensional polygon up into triangles.
 * @param  {Vector[]} polygon The polygon to break up into triangles.
 * @return {Vector[][]}         An array of non-overlapping triangles that together would cover the polygon.
 * @throws If `polygon` has less than three vertices, or is not two-dimensional.
 */
export default function triangulate(polygon) {
	if (polygon.length < 3) 
		throw new TypeError(`Cannot triangulate a polygon with only ${polygon.length} vertices`);
	// Although earcut (the library used to perform triangulation) has a parameter "dimensions", it actually only
	// triangulates reliably in two dimensions. We will throw if the polygon is not two-dimensional.
	// 
	// See https://github.com/mapbox/earcut/issues/21
	if (polygon[0].length !== 2)
		throw new TypeError(`Wrong number of dimensions while triangulating: expected 2 but got ${polygon[0].length}`);

	let vertices = polygon.flat();
	let indices = earcut(vertices, null, 2);
	let triangles = [];
	for (let i = 0; i < indices.length; i+=3) {
		let tri = [
			polygon[i],
			polygon[i + 1],
			polygon[i + 2]
		]
		triangles.push(tri);
	}
	return triangles;
}

