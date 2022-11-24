import normal from '../src/normal.js';
import * as Vector from '../src/vector.js';

describe('normal', function() {
	const polygon = [
		[ 1, 0, 0 ],
		[ 5, 5, 5 ],
		[ -2, 4, 4 ]
	];

	it('should be the same as the cross product for triangles', function() {
		let crossed = Vector.cross(Vector.subtract(polygon[1], polygon[0]), Vector.subtract(polygon[2], polygon[0]));
		let result = normal(polygon);

		expect(result).to.be.an('array').with.lengthOf(3);
		result.forEach((coord, i) => expect(coord).to.be.approximately(crossed[i], EPSILON))
	});

	it('should be undefined if there are less than three vertices', function() {
		for (let n = 0; n < 3; n++) {
			expect(normal(polygon.slice(0, n)), n).to.be.undefined;
		}
	});

	it('should calculate the normal for an arbitrary planar polygon', function() {
		const n = [ 2, 4, 7 ];

		const vertices = [
			[ 1, 0 ],
			[ 5, 5 ],
			[ 3, 6 ],
			[ -2, 3 ],
		].map(([x,y]) => [ x, y, -(n[0] * x + n[1] * y) / n[2] ]);

		const result = normal(vertices);
		expect(result).to.be.an('array').with.lengthOf(3);
		const a = result[0] / n[0];

		result.forEach((coord, index) => expect(coord).to.be.approximately(a * n[index], EPSILON));
	});
});