import project from '../src/project.js';
import * as Vector from '../src/vector.js';

describe('project', function() {
	const polygon = [
		[ 1, 0, 0 ],
		[ 5, 5, 5 ],
		[ -2, 4, 4 ]
	];
	const normal = [ 1, 2, 3 ];
	const distance = 5;

	it('should return a polygon where all vertices are on the projection plane', function() {
		let result = project(polygon, normal, distance, 0);
		expect(result).to.be.an('array').with.lengthOf(polygon.length);

		// All vertices should be on the projection plane
		result.forEach(vertex => expect(Vector.dot(vertex, normal) - distance).to.be.approximately(0, EPSILON));
	});

	it('shoud project along any axis', function() {
		for (let axis = 0; axis <= 2; axis++) {
			const [dim1,dim2] = [0,1,2].filter(dim => dim !== axis);

			let result = project(polygon, normal, distance, axis);
			expect(result).to.be.an('array').with.lengthOf(polygon.length);
			result.forEach((vertex, index) => {
				// vertex[axis] may have changed, but the other dimensions should have stayed the same
				expect(vertex[dim1]).to.equal(polygon[index][dim1]);
				expect(vertex[dim2]).to.equal(polygon[index][dim2]);
				// If the vertex wasn't already on the projection plane, vertex[axis] should have changed
				if (Math.abs(Vector.dot(vertex, normal) - distance) > EPSILON)
					expect(vertex[axis]).to.not.equal(polygon[index][axis])
			});
		}
	});
});
