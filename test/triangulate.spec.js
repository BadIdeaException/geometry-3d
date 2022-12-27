import triangulate from '../src/triangulate.js';

describe('triangulate', function() {

	const polygon = [
		[ 1, 1 ],
		[ 5, 5 ],
		[ 4, 8 ],
		[ 0, 5 ],
		[ 1, 3 ]
	];

	it('should throw if polygon vertices are not two-dimensional', function() {
		expect(triangulate.bind(null, polygon.map(([ x, y ]) => [ x, y, 0 ]))).to.throw(/dimension/);
	});

	it('should throw if polygon has less than three vertices', function() {
		for (let length = 0; length < 3; length++) {
			expect(triangulate.bind(null, polygon.slice(0, length))).to.throw(/vertices/);
		}
		expect(triangulate.bind(null, polygon.slice(0, 3))).to.not.throw();
	});

	it('should return triangles', function() {
		const result = triangulate(polygon);
		expect(result).to.be.an('array').with.lengthOf(polygon.length - 2);
		result.forEach(tri => expect(tri).to.be.an('array').with.lengthOf(3));
	});

	it('should have all vertices of the original', function() {
		const result = triangulate(polygon).flat();
		polygon.forEach(vertex => expect(result).to.deep.include(vertex));
	});
});