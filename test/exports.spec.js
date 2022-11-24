import * as two from '../src/index-2d.js';
import * as three from '../src/index-3d.js';
import * as Vector from '../src/vector.js';
import * as all from '../src/index.js';

describe('exports', function() {
	const expected2 = [
		'contains',
		'dist', 'dist2',
		'convert'
	];
	const expected3 = [
		'contains',
		'cut',
		'normal',
		'project',
		'dist', 'dist2',
		'convert'
	];

	it(`namespace /2d should have exports ${expected2.join(', ')}`, function() {
		expect(Object.keys(two)).to.have.members(expected2);
	});

	it(`namespace /3d should have exports ${expected3.join(', ')}`, function() {
		expect(Object.keys(three)).to.have.members(expected3);
	});

	it('should have exports from /3d at root, exports from /2d at "2D" and exports from /vector as "Vector" in the default namespace', function() {
		expect(Object.keys(all)).to.include.members(expected3);
		expect(all).to.have.property('Vector', Vector);

		expect(all).to.have.property('2D', two);
	});
});