import * as Vector from './vector.js';
import normal from './normal.js';

/**
 * Checks whether `point` is inside `polygon` according to the even-odd rule. Points on an edge are considered inside.
 * 
 * @param  {Vector[]} polygon The polygon to check for.
 * @param  {Vector} point   The point to check for containment.
 * @return {boolean}         `true` if the point is inside the polygon, `false` otherwise.
 */
export function contains2D(polygon, point) {
	// Basically implements the winding number check by Dan Summer, 2001.
	// (https://web.archive.org/web/20210504233957/http://geomalgorithms.com/a03-_inclusion.html)

	// Helper function that tests if R is left/on/right of the line through P and Q. 
	// If R is right of that line, result is < 0.
	// If R is on that line, result is === 0.
	// If R is left of that line, result is > 0.
	const isLeft = (P, Q, R) => (Q[0] - P[0]) * (R[1] - P[1]) - (Q[1] - P[1]) * (R[0] - P[0]);
		

	// Iterate through all edges and check them against a horizontal ray	
	let wn = polygon.reduce((wn, vertex, index) => {
		let a = vertex;
		let b = polygon[(index + 1) % polygon.length];

		if (a[1] <= point[1]) { // edge starts below  the point
			if (b[1] > point[1] // edge ends above the point => it is an upward crossing
				&& isLeft(a, b, point) >= 0) // point is left of the edge, or on it
					return wn + 1; // Ray intersects an upward edge
		} else // edge starts above the point
			if (b[1] <= point[1] // edge ends below the point => it is a downward crossing
				&& isLeft(a, b, point) <= 0) // point is right of the edge, or on it
					return wn - 1; // Ray intersects a downward edge
		return wn;
	}, 0);

	// Here we differ from Summer, who considers any point with a non-zero winding number to be "inside".
	// We will however comply with the even-odd rule, meaning a point is inside if it has an odd winding number.
	return (wn % 2) === 1;
}

/**
 * Checks whether `point` is inside `polygon` according to the even-odd rule. Points on an edge are considered inside.
 * Points that are not on `polygon`'s plane are considered outside.
 * 
 * @param  {Vector[]} polygon A planar polygon to check containment for. No check is performed whether `polygon` is actually planar.
 * If it isn't, points will be considered on the polygon's plane if they lie on the best-fit plane of the polygon's vertices.
 * @param  {Vector} point   The point to check.
 * @return {boolean}        `true` if `point` lies on `polygon`'s plane and is contained within its boundaries, `false` otherwise.
 */
export function contains3D(polygon, point) {
	// Check that the point is on the polygon's plane
	const n = normal(polygon);
	const d = Vector.dot(n, polygon[0]);

	if (!Math.abs(Vector.dot(n, point) - d) < EPSILON)
		return false;

	// Find axis-aligned projection that will result in biggest area, then solve problem in 2D on that projection
	const axis = [0,1,2].reduce((prev, curr) => Math.abs(n[curr]) >= Math.abs(n[prev]) ? curr : prev);

	return contains2D(
		polygon.map(vertex => vertex.filter((_, index) => index !== axis)),
		point.filter((_, index) => index !== axis)
	)
}