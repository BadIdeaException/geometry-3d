/**
 * Projects `polygon` onto the plane defined by `normal` and `distance` along the `axis`.
 *
 * Intuitively, this can be though of as following each vertex of `polygon` in the direction of `axis` until it intersects with
 * the projection plane.
 * @param  {Vector[]} polygon  The polygon to project.
 * @param  {Vector} normal   The normal vector of the plane to project onto.
 * @param  {number} distance The distance of the plane to the origin.
 * @param  {number} axis     The axis along which to project. Can be `0` for the x axis, `1` for the y axis, or `2` for the z axis.
 * @return {Vector[]}        The polygon, projected onto the plane.
 */
export default function project(polygon, normal, distance, axis) {
	const [dim1,dim2] = [0,1,2].filter(dim => dim !== axis);
	polygon = polygon.map(vertex => Object.assign([], {
		[dim1]: vertex[dim1], 
		[dim2]: vertex[dim2],
		[axis]: -(normal[dim1] * vertex[dim1] + normal[dim2] * vertex[dim2] - distance) / normal[axis]
	}));
	return polygon;	
}