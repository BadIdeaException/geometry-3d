import * as Vector from './vector.js';

/**
 * Cuts the triangle `tri` along the plane defined by `normal` and `distance`. The result is an object containing
 * an array for all vertices above-or-on the cut plane and below-or-on the cut plane, respectively. For edges crossing
 * the cut plane, the edge's intersection point with the cut plane is added. 
 *
 * If the triangle does not intersect with the cut plane, one of `above` or `below` will be empty.
 * If the triangle is co-planar with the cut plane, it will be returned in both `above` and `below`.
 * @param  {Vector[]} tri 		The triangle to cut.
 * @param  {Vector} normal 		The normal vector of the cut plane.
 * @param  {Number} distance    The distance of the cut plane from the origin.
 * @param  {Number} [epsilon]	The tolerance to use in floating point comparisons. Any vertex closer than `epsilon`
 * to the cut plane will be considered on the cut plane. Default is 1.0e-8.
 * @return {Object}           An object containing two arrays of Vertices making up the results of the cut: those
 * one the greater-than-or-equal side of the cut plane (`above`), and those on the less-than-or-equal side (`below`). 
 */
export default function cut(tri, normal, distance, epsilon = 1.0e-8) {
	// Helper function that calculates the intersection point of the line given by P1 and P2 with the
	// plane given by normal and distance
	// It is assumed that the line is not parallel to the plane
	function linePlaneIntersect(normal, distance, P1, P2) {
		let a = (distance - Vector.dot(normal, P1)) / (Vector.dot(normal, P2) - Vector.dot(normal, P1));
		return Vector.add(P1, Vector.scale(Vector.subtract(P2, P1), a));
	}

	// Calculate the signed distances of the triangle from the cut plane
	const distances = tri.map(vertex => Vector.dot(normal, vertex) - distance);
	if (distances.every(d => Math.abs(d) < epsilon)) {
		// The triangle is co-planar with the cut plane. 
		// Assign it to both above and below.
		return { above: tri, below: tri };
	} else if (distances.every(d => d > -epsilon)) {
		// The triangle is completely on the greater-or-equal side of the cut plane. 
		// Assign it to above and an empty polygon to below.
		return { above: tri, below: [] };				
	} else if (distances.every(d => d < epsilon)) {
		// The triangle is completely on the less-than-or-equal side of the cut plane.
		// Assign it to below and an empty polygon to above.
		return { above: [], below: tri };				
	} else if (distances.some(d => d > -epsilon) && distances.some(d => d < epsilon)) {
		// The triangle crosses the cut plane. 

		// Initialize the lists that will hold vertices above and below the cut plane, resp.
		// Initialize the variable for a vertex that is right on the cut plane.
		let above = [];
		let below = [];
		let on = null;
		distances.forEach((d, index) => {
			if (Math.abs(d) < epsilon)
				on = tri[index];
			else if (d > epsilon)
				above.push(tri[index]);
			else 
				below.push(tri[index]);
		});

		if (on) {
			// If one vertex is right on the cut plane, above and below will each contain one remaining vertex each.
			// The edge between them crosses the cut plane. Calculate this edge's intersection point with the cut
			// plane. 
			// Above and below are each triangles.
			let P = linePlaneIntersect(normal, distance, below[0], above[0]);
			return {
				above: [ above[0], P, on ],
				below: [ P, below[0], on ]
			};					
		} else {
			// At this point we know none of the vertices are directly on the cut plane. This means there is one
			// vertex on the one side and two on the other. 
			// Therefore, cutting will result in one triangle and one trapezoid. 
			// 
			// Calculate the two intersection points with the cut plane.
			const triangular = above.length === 1 ? above : below;
			const trapezoidal = above.length === 2 ? above : below;

			let intersections = trapezoidal.map(vertex => linePlaneIntersect(normal, distance, vertex, triangular[0])).reverse();
			above = above.concat(intersections);
			below = below.concat(intersections);
			return { above, below };
		}
	}
}