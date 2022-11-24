import { contains2D, contains3D } from '../src/contains.js';

describe('contains', function() {
	const vertices = [
		[ 1, 1 ],
		[ 5, 5 ],
		[ 4, 8 ],
		[ 0, 5 ],
		[ 1, 3 ]
	];

	describe('contains2D', function() {
		const polygon = vertices;
		const contains = contains2D;

		it('should return true for a point inside the polygon', function() {
			const p = [ 4, 5 ];

			expect(contains(polygon, p)).to.be.true;
		});

		it('should return false for a point outside the polygon', function() {
			const p = [ 12, 2 ];

			expect(contains(polygon, p)).to.be.false;			
		});

		it('should return true for a point on one of the polygon\'s edges', function() {
			const p = [ 3, 3 ];

			expect(contains(polygon, p)).to.be.true;
		});
	});

	describe('contains3D', function() {
		const z = ([ x, y ]) => 2 * x + 3 * y + 4;
		const extrude = vertex => [ ...vertex, z(vertex) ];
		const polygon = vertices.map(extrude);
		const contains = contains3D;

		it('should return false for a point that is not on the polygon\'s plane', function() {
			[ [ 4, 5 ], [ 12, 2 ] ]
				.map(vertex => [ ...vertex, z(vertex) + 1 ]) // Force the point to be off the plane by adding 1
				.forEach(point => expect(contains(polygon, point)).to.be.false);
		});

		it('should return true for a point inside the polygon', function() {
			const p = extrude([ 4, 5 ]);

			expect(contains(polygon, p)).to.be.true;
		});

		it('should return false for a point outside the polygon', function() {
			const p = extrude([ 12, 2 ]);

			expect(contains(polygon, p)).to.be.false;			
		});

		it('should return true for a point on one of the polygon\'s edges', function() {
			const p = extrude([ 3, 3 ]);
			expect(contains(polygon, p)).to.be.true;
		});
	});
});