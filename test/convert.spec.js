import { convertUp, convertDown } from '../src/convert.js';

describe('convert', function() {
	describe('down', function() {
		const vertices = [
			[ 1, 0, 0 ],
			[ 2, 3, 4 ],
			[ 5, 5, 5 ],
			[ -3, -4, 0 ],
			[ -2, -2, 3 ]
		];

		it('should have all vertices\' coordinates except the one specified by axis', function() {
			for (let axis = 0; axis < vertices[0].length; axis++) {
				const expected = vertices.map(vertex => vertex.filter((_, index) => index !== axis));
				
				expect(convertDown(vertices, axis)).to.deep.equal(expected);
			}
		});

		it('should have no effect if axis is larger than the current number of dimensions', function() {
			const axis = vertices[0].length + 1;
			expect(convertDown(vertices, axis)).to.deep.equal(vertices);
		});
	});

	describe('up', function() {
		const vertices = [
			[ 1, 0 ],
			[ 2, 3 ],
			[ 5, 5 ],
			[ -3, -4 ],
			[ -2, -2 ]
		];

		it('should insert a new dimension as specified by axis', function() {
			for (let axis = 0; axis < vertices[0].length + 1; axis++) {
				const result = convertUp(vertices, axis);
				expect(result).to.be.an('array').with.lengthOf(vertices.length);

				for (let i = 0; i < result.length; i++) {
					const vertex = result[i];
					const expected = vertices[i];
					expect(vertex.length).to.equal(expected.length + 1);
					vertex.forEach((coord, dim) => {
						if (dim !== axis)
							expect(coord).to.equal(expected[dim < axis ? dim : dim - 1]);
					});
				}
			}
		});

		it('should set the new coordinate\'s value to the provided one, defaulting to zero', function() {
			const axis = 1;
			[ 1, undefined ].forEach(coord => 
				convertUp(vertices, axis, coord).forEach(vertex => expect(vertex[axis]).to.equal(coord ?? 0))
			);
		});
	});
});