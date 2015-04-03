/**
 * testing CET
 */

describe('Test CET.defaultConfig vars', function() {
	// CET
	var global = CET,
		globalDC = global.defaultConfig, // CET.defaultCongig
		mat = globalDC.materialize, // CET.defaultCongig.materailize
		bot = globalDC.bootstrap, // CET.defaultCongig.bootstrap
		head = global.defaultConfig.header, // CET.defaultConfig.header
		headOptions = global.defaultConfig.options, // CET.defaultConfig.options
		tooltips = global.defaultConfig.tooltips, // CET.defatultConfig.tooltips
		search = global.defaultConfig.search, // CET.defaultConfig.search
		limitRows = global.defaultConfig.limitRows, // CET.defaultConfig.limitRows
		effects = global.defaultConfig.effects, // CET.defaultConfig.effects
		sort = global.defaultConfig.sortable, // CET.defaultConfig.sortable

		listOptions = global.defaultConfig.listOptions, // CET.defaultConfig.listOptions
		graphs = global.defaultConfig.listOptions.graphs, // CET.defaultConfig.listOptions.graphs
		downloads = global.defaultConfig.listOptions.downloads, // CET.defaultConfig.listOptions.downloads
		sum = global.defaultConfig.listOptions.column_data_sum, // CET.defaultConfig.listOptions.column_data_sum

		dataOptions = global.defaultConfig.dataOptions, // CET.defaultConfig.dataOptions
		dataOptionsLocalUrl = global.defaultConfig.localDataUrl, // CET.defaultConfig.localDataUrl
		dataOptionsFireUrl = global.defaultConfig.fireBaseUrl, // CET.defaultConfig.fireBaseUrl
		dataOptionsPouchUrl = global.defaultConfig.pouchDbUrl, // CET.defaultConfig.pouchDbUrl
		dataOptionsApiGetUrl = global.defaultConfig.apiRestGetUrl, // CET.defaultConfig.apiRestGetUrl
		dataOptionsApiPostUrl = global.defaultConfig.apiRestPostUrl, // CET.defaultConfig.apiRestPostUrl

		container = global.defaultConfig.container, // CET.defaultConfig.container

		cetInit = global.init, // CET.init

		cetDownloads = global.downloads, // CET.downloads
		cetDownloadsSelectedOption = global.downloads.selectedOption, // CET.downloads.selectedOption
		cetDownloadsTableDownloads = global.downloads.tableDownloads, // CET.downloads.tableDownloads

		cetEffects = global.effects, // CET.effects
		cetEffectsTableEffects = global.effects.tableEffects, // CET.effects.tableEffects

		cetGraphs = global.graphs, // CET.graphs
		cetGraphsPrepareGraphData = global.graphs.prepareGraphData, // CET.graphs.prepareGraphData
		cetGraphsShowGraph = global.graphs.showGraph, // CET.graphs.showGraph
		cetGraphsShowModal = global.graphs.showModal; // CET.graphs.showModal

	it('Test if CET.defaultCongig.materailize and CET.defaultCongig.bootstrap are be Booleans', function() {
		expect(mat).toMatch(/true|false/);
		expect(bot).toMatch(/true|false/);
	});

	it('Test if CET.defaultConfig.materialize is true, CET.defaultConfig.bootstrap must be false and upside down', function() {
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

	it('Test if CET.defaultConfig.options is boolean and if it is true, CET.defaultConfig.header must be true too', function() {
		expect(headOptions).toMatch(/true|false/);

		if (headOptions) {
			expect(head).toBe(true);
		}
	});

	it('Test if CET.defaultConfig.tooltips is boolean', function() {
		expect(tooltips).toMatch(/true|false/);
	});

	it('Test if CET.defaultConfig.search is boolean and if it is true, CET.defaultConfig.header must be true too', function() {
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

		if (downloads) {
			expect(head).toBe(true);
			expect(headOptions).toBe(true);
		}
	});

	it('Test if CET.defaultConfig.listOptions.column_data_sum is boolean and if is true, check if CET.defaultConfig.listOptions & CET.defaultConfig.header are true too', function() {
		expect(sum).toMatch(/true|false/);

		if (sum) {
			expect(head).toBe(true);
			expect(headOptions).toBe(true);
		}
	});

	it('Test if CET.defaultConfig.dataOptions is an object and more...', function() {
		expect(dataOptions).toEqual(jasmine.any(Object));

		if (dataOptions.localData) {
			expect(dataOptionsLocalUrl).toBeTruthy();
		}

		if (dataOptions.fireBase) {
			expect(dataOptionsFireUrl).toBeTruthy();
		}

		if (dataOptions.apiRest) {
			expect(dataOptionsApiGetUrl).toBeTruthy();
			expect(dataOptionsApiPostUrl).toBeTruthy();
		}

		if (dataOptions.pouchDbUrl) {
			expect(dataOptionsPouchUrl).toBeTruthy();
		}
	});

	it('Test if CET.defaultConfig.container is not empty', function() {
		expect(container).toBeNull;
	});

	it('Test if CET.init is a function', function() {
		expect(cetInit).toEqual(jasmine.any(Function));
	});

	it('Test if CET.downloads is a object', function() {
		expect(cetDownloads).toEqual(jasmine.any(Object));
	});

	it('Test if CET.downloads.selectedOption is a function', function() {
		expect(cetDownloadsSelectedOption).toEqual(jasmine.any(Function));
	});

	it('Test if CET.downloads.tableDownloads is a function', function() {
		expect(cetDownloadsTableDownloads).toEqual(jasmine.any(Function));
	});

	it('Test if CET.effects is a object', function() {
		expect(cetEffects).toEqual(jasmine.any(Object));
	});

	it('Test if CET.effects.tableEffects is a function', function() {
		expect(cetEffectsTableEffects).toEqual(jasmine.any(Function));
	});

	it('Test if CET.graphs is a object', function() {
		expect(cetGraphs).toEqual(jasmine.any(Object));
	});

	it('Test if CET.graphs.prepareGraphData is a function', function() {
		expect(cetGraphsPrepareGraphData).toEqual(jasmine.any(Function));
	});

	it('Test if CET.graphs.showGraph is a function', function() {
		expect(cetGraphsShowGraph).toEqual(jasmine.any(Function));
	});

	it('Test if CET.graphs.showModal is a function', function() {
		expect(cetGraphsShowModal).toEqual(jasmine.any(Function));
	});

});