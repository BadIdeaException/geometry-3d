import triangulate from '../src/triangulate.js';

describe('triangulate', function() {
	const z = ([ x, y ]) => 2 * x + 3 * y + 4;
	const extrude = vertex => [ ...vertex, z(vertex) ];
	// eslint-disable-next-line mocha/no-setup-in-describe
	const polygon = [
		[ 1, 1 ],
		[ 5, 5 ],
		[ 4, 8 ],
		[ 0, 5 ],
		[ 1, 3 ]
	].map(extrude);

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