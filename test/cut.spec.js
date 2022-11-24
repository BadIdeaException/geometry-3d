import cut from '../src/cut.js';
import * as Vector from '../src/vector.js';

describe('cut', function() {
	let tri;
	beforeEach(function() {
		tri = [
			[ 1, 0, 0 ],
			[ 5, 5, 5 ],
			[ -2, 4, 4 ]
		]
	});

	it('should not cut the triangle if it does not intersect the cut plane', function() {
		[
			[ 1, 0, 0 ],
			[ 0, 1, 0 ],
			[ 0, 0, 1 ],
			[ 1, 1, 1 ]
		].forEach(normal => {
			expect(cut(tri, normal, -20)).to.be.an('object').with.property('above').that.deep.equals(tri);
			expect(cut(tri, normal, +20)).to.be.an('object').with.property('below').that.deep.equals(tri);
		});
	});

	it('should have the triangle in both above and below if it is co-planar with the cut plane', function() {			
		const normal = Vector.cross(Vector.subtract(tri[1], tri[0]), Vector.subtract(tri[2], tri[0]));
		const offset = Vector.dot(normal, tri[0]);
		
		let result = cut(tri, normal, offset);
		expect(result).to.be.an('object').with.all.keys('above', 'below');
		expect(result.above).to.deep.equal(tri);
		expect(result.below).to.deep.equal(tri);
	});

	it('should cut the triangle into two triangles if one of its vertices is on the cut plane and the other two are on opposite sides', function() {
		const normal = [ 1, 1, 1 ];
		const offset = Vector.dot(normal, tri[2]);
		let result = cut(tri, normal, offset);

		expect(result).to.be.an('object').with.keys('above', 'below');
		expect(result.above).to.have.lengthOf(3);
		expect(result.below).to.have.lengthOf(3);
		// Above should contain the vertex that is on the cut plane
		expect(result.above).to.contain(tri[2]);
		// Above should contain the vertex that is on the positive side of the cut plane
		expect(result.above).to.contain(tri[1]);
		// The remaining vertex should be on the cut plane as well
		expect(result.above.find(v => !tri.includes(v))).to.satisfy(v => Vector.dot(normal, v) === offset);
		
		// Below should contain the vertex that is on the cut plane
		expect(result.below).to.contain(tri[2]);
		// Below should contain the vertex that is on the negative side of the cut plane
		expect(result.below).to.contain(tri[0]);
		// The remaining vertex should be on the cut plane as well
		expect(result.below.find(v => !tri.includes(v))).to.satisfy(v => Vector.dot(normal, v) === offset);
	});

	it('should cut the triangle into above and below parts if it intersects the cut plane', function() {			
		const EPSILON = 1.0e-8;

		const normal = [ 1, 1, 1 ];
		const offset = 2;
		let result = cut(tri, normal, offset);

		expect(result).to.be.an('object').with.keys('above', 'below');
		expect(result.above.length + result.below.length).to.equal(7);
		// All of tri's vertices should be present
		expect(result.above.concat(result.below)).to.include.members(tri);

		let intersections = result.above.filter(v => !tri.includes(v));
		// There should be two new vertices in above
		expect(intersections).to.have.lengthOf(2);
		intersections.forEach(isect => {
			// Each of them should also be in below
			expect(result.below).to.contain(isect);
			// Each of them should be on the cut plane
			expect(Vector.dot(normal, isect)).to.be.approximately(offset, EPSILON);
		});

		result.above.forEach(vertex => expect(Vector.dot(normal, vertex)).to.be.at.least(offset - EPSILON));
		result.below.forEach(vertex => expect(Vector.dot(normal, vertex)).to.be.at.most(offset + EPSILON));
	});
});