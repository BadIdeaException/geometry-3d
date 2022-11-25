import fuse from '../src/fuse.js';

describe('fuse', function() {
	const vertices = [
		[ 1, 1 ],
		[ 2, 5 ],
		[ 3, 3 ],
		[ 0, -1 ]
	];
	const THRESHOLD = 0.1 ** 2;

	it('should leave the input unchanged if all vertices are more than threshold**2 apart', function() {
		expect(fuse(vertices, THRESHOLD)).to.deep.equal(vertices);
	});

	it('should delete any vertex whose successor is less than threshold**2 away', function() {
		// Insert a vertex that has less distance than threshold
		vertices.splice(1, [
			vertices[0][0] + Math.sqrt(THRESHOLD) / 2,
			vertices[0][1] + Math.sqrt(THRESHOLD) / 2,
		]);
		
		expect(fuse(vertices, THRESHOLD)).to.deep.equal(vertices);
	});
});