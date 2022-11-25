import * as two from '../src/index-2d.js';
import * as three from '../src/index-3d.js';
import * as Vector from '../src/vector.js';
import * as all from '../src/index.js';

describe('exports', function() {
	const expected2 = [
		'contains',
		'dist', 'dist2',
		'convertUp', 'convertDown',
		'triangulate'
	];
	const expected3 = [
		'contains',
		'cut',
		'normal',
		'project',
		'dist', 'dist2',
		'convertUp', 'convertDown',
		'triangulate'
	];

	it(`namespace /2d should have exports ${expected2.join(', ')}`, function() {
		expect(Object.keys(two)).to.have.members(expected2);
	});

	it(`namespace /3d should have exports ${expected3.join(', ')}`, function() {
		expect(Object.keys(three)).to.have.members(expected3);
	});

	it('should have exports from /3d and /2d at root, exports from /vector as "Vector" in the default namespace', function() {
		expect(Object.keys(all)).to.include.members(expected3);
		expect(Object.keys(all)).to.include.members(expected2);
		expect(all).to.have.property('Vector', Vector);

		expect(all).to.have.property('contains2D', two.contains);
		expect(all).to.have.property('contains3D', three.contains);
		expect(all).to.have.property('contains', three.contains);
	});
});