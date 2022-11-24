/** 
 * The normal of the polygon. If the polygon is not planar, it will return the normal of a "best fit" plane
 * to the polygon's vertices. If the polygon has less than three vertices, the normal is undefined.
 */
export default function normal(polygon) {
	if (polygon.length < 3) return undefined;

	/*
		This computes the polygon's normal with Newell's method for computing the plane equation.			
		See e.g. http://cs.haifa.ac.il/~gordon/plane.pdf
	 */
	let x = 0;
	let y = 0;
	let z = 0;

	for (let i = 0; i < polygon.length; i++) {
		let u = polygon[i];
		let v = polygon[(i + 1) % polygon.length];
		x += (u[1] - v[1]) * (u[2] + v[2]);
		y += (u[2] - v[2]) * (u[0] + v[0]);
		z += (u[0] - v[0]) * (u[1] + v[1]);
	}
	return [ x, y, z ];
}
