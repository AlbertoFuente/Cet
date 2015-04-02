/**
 * testing CET
 */

describe('Test CET.defaultConfig vars', function() {
	// CET
	var global = CET;
	// CET.defaultCongig
	var globalDC = global.defaultConfig,
		// CET.defaultCongig.materailize
		mat = globalDC.materialize,
		// CET.defaultCongig.bootstrap
		bot = globalDC.bootstrap,
		// CET.defaultConfig.header
		head = global.defaultConfig.header,
		// CET.defaultConfig.options
		headOptions = global.defaultConfig.options,
		// CET.defatultConfig.tooltips
		tooltips = global.defaultConfig.tooltips,
		// CET.defaultConfig.search
		search = global.defaultConfig.search,
		// CET.defaultConfig.limitRows
		limitRows = global.defaultConfig.limitRows,
		// CET.defaultConfig.effects
		effects = global.defaultConfig.effects,
		// CET.defaultConfig.sortable
		sort = global.defaultConfig.sortable,

		// CET.defaultConfig.listOptions
		listOptions = global.defaultConfig.listOptions,
		// CET.defaultConfig.listOptions.graphs
		graphs = global.defaultConfig.listOptions.graphs,
		// CET.defaultConfig.listOptions.downloads
		downloads = global.defaultConfig.listOptions.downloads,
		// CET.defaultConfig.listOptions.column_data_sum
		sum = global.defaultConfig.listOptions.column_data_sum;

	it('CET.defaultCongig.materailize and CET.defaultCongig.bootstrap must be Booleans', function() {
		expect(mat).toMatch(/true|false/);
		expect(bot).toMatch(/true|false/);
	});

	it('If CET.defaultConfig.materialize is true, CET.defaultConfig.bootstrap must be false and upside down', function() {
		if (mat) {
			expect(bot).toBe(false);
		} else if (bot) {
			expect(mat).toBe(false);
		} else {
			expect(mat).toBe(false);
			expect(bot).toBe(false);
		}
	});

	it('Test if CET.defaultConfig.header is boolean', function() {
		expect(head).toMatch(/true|false/);
	});

	it('Test CET.defaultConfig.options is boolean and if it is true, CET.defaultConfig.header must be true too', function() {
		expect(headOptions).toMatch(/true|false/);

		if (headOptions) {
			expect(head).toBe(true);
		}
	});

	it('Test if CET.defaultConfig.tooltips is boolean', function() {
		expect(tooltips).toMatch(/true|false/);
	});

	it('Test CET.defaultConfig.search is boolean and if it is true, CET.defaultConfig.header must be true too', function() {
		expect(search).toMatch(/true|false/);

		if (headOptions) {
			expect(head).toBe(true);
		}
	});

	it('Test if CET.defaultConfig.limitRows is numeric', function() {
		expect(limitRows).toEqual(jasmine.any(Number));
	});

	it('Test if CET.defaultConfig.sortable is boolean', function() {
		expect(sort).toMatch(/true|false/);
	});

	it('Test if CET.defaultConfig.effects is boolean', function() {
		expect(effects).toMatch(/true|false/);
	});

	it('Test if CET.defaultConfig.listOptions is object', function() {
		expect(listOptions).toEqual(jasmine.any(Object));
	});

	it('Test if CET.defaultConfig.listOptions.graphs is boolean and if is true, check if CET.defaultConfig.listOptions & CET.defaultConfig.header are true too', function() {
		expect(graphs).toMatch(/true|false/);

		if (graphs) {
			expect(head).toBe(true);
			expect(headOptions).toBe(true);
		}
	});

	it('Test if CET.defaultConfig.listOptions.downloads is boolean and if is true, check if CET.defaultConfig.listOptions & CET.defaultConfig.header are true too', function() {
		expect(downloads).toMatch(/true|false/);

		if (graphs) {
			expect(head).toBe(true);
			expect(headOptions).toBe(true);
		}
	});

	it('Test if CET.defaultConfig.listOptions.column_data_sum is boolean and if is true, check if CET.defaultConfig.listOptions & CET.defaultConfig.header are true too', function() {
		expect(sum).toMatch(/true|false/);

		if (graphs) {
			expect(head).toBe(true);
			expect(headOptions).toBe(true);
		}
	});
});