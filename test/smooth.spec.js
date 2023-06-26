import smooth from '../src/smooth.js';

describe('smooth', function() {
	const vertices = [
		[ 1, 1 ],
		[ 2, 5 ],
		[ 3, 3 ],
		[ 0, -1 ]
	];
	const THRESHOLD = 0.1 ** 2;

	it('should leave the input unchanged if all vertices are more than threshold**2 apart', function() {
		expect(smooth(vertices, THRESHOLD, 3)).to.deep.equal(vertices);
	});

	it('should delete any chain of vertices up to the lookahead length ending less than threshold**2 away', function() {
		const MAX_LOOKAHEAD = vertices.length;
		for (let lookahead = 1; lookahead <= MAX_LOOKAHEAD; lookahead++) {
			let fixture = vertices.slice(); // Shallow copy
			// Insert a vertex that has less distance than threshold	
			fixture.splice(lookahead, 0, [
				vertices[0][0] + Math.sqrt(THRESHOLD) / 2,
				vertices[0][1] + Math.sqrt(THRESHOLD) / 2,
			]);

			expect(smooth(fixture, THRESHOLD, lookahead), lookahead).to.deep.equal([ vertices[0], ...vertices.slice(lookahead) ]);
		}
	});

	it('should limit the lookahead to the length of the input', function() {
		// Checks that lookahead limiting works
		// Otherwise, if the lookahead is too large, smooth will circumnavigate the entire input.
		// This means it will eventually compare vertices against itself, thereby cutting everything.
		const lookahead = vertices.length + 1;

		expect(smooth(vertices, THRESHOLD, lookahead)).to.deep.equal(vertices);
	});
});