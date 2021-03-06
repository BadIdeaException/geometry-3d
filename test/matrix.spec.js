import Matrix from '../src/matrix.js';

describe('Matrix', function() {
	it('.determinant', function() {
		const m = new Matrix(
			1, 2, 3,
			3, 2, 1,
			2, 1, 3
		);
		expect(m.determinant()).to.equal(-12);
	});
});