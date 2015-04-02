/**
 * testing CET
 */

var global = CET;

describe('Choose only one design or none', function() {
	// CET.defaultCongig
	var globalDC = global.defaultConfig,
		// CET.defaultCongig.materailize
		mat = globalDC.materialize,
		// CET.defaultCongig.bootstrap
		bot = globalDC.bootstrap;

	it('The two vars must be Booleans', function() {
		expect(mat).toMatch(/true|false/);
		expect(bot).toMatch(/true|false/);
	});
	
	it('If CET.defaultConfig.materialize is true, CET.defaultConfig.bootstrap must be false and upside down', function() {
		if (mat) {
			expect(bot).toMatch(/false/);
		} else if (bot) {
			expect(mat).toMatch(/false/);
		} else {
			expect(mat).toMatch(/false/);
			expect(bot).toMatch(/false/);
		}
	});
});