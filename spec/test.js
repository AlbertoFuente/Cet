/**
 * testing CET
 */

describe('Test CET.defaultConfig vars', function() {
	// CET
	var global = CET,
		globalDC = global.defaultConfig, // CET.defaultCongig
		mat = globalDC.materialize, // CET.defaultCongig.materailize
		bot = globalDC.bootstrap, // CET.defaultCongig.bootstrap
		head = globalDC.header, // CET.defaultConfig.header
		headOptions = globalDC.options, // CET.defaultConfig.options
		tooltips = globalDC.tooltips, // CET.defatultConfig.tooltips
		search = globalDC.search, // CET.defaultConfig.search
		limitRows = globalDC.limitRows, // CET.defaultConfig.limitRows
		effects = globalDC.effects, // CET.defaultConfig.effects
		sort = globalDC.sortable, // CET.defaultConfig.sortable

		listOptions = globalDC.listOptions, // CET.defaultConfig.listOptions
		graphs = globalDC.listOptions.graphs, // CET.defaultConfig.listOptions.graphs
		downloads = globalDC.listOptions.downloads, // CET.defaultConfig.listOptions.downloads
		sum = globalDC.listOptions.column_data_sum, // CET.defaultConfig.listOptions.column_data_sum

		dataOptions = globalDC.dataOptions, // CET.defaultConfig.dataOptions
		dataOptionsLocalUrl = globalDC.localDataUrl, // CET.defaultConfig.localDataUrl
		dataOptionsFireUrl = globalDC.fireBaseUrl, // CET.defaultConfig.fireBaseUrl
		dataOptionsPouchUrl = globalDC.pouchDbUrl, // CET.defaultConfig.pouchDbUrl
		dataOptionsApiGetUrl = globalDC.apiRestGetUrl, // CET.defaultConfig.apiRestGetUrl
		dataOptionsApiPostUrl = globalDC.apiRestPostUrl, // CET.defaultConfig.apiRestPostUrl

		container = globalDC.container, // CET.defaultConfig.container

		cetInit = global.init, // CET.init

		cetDownloads = global.downloads, // CET.downloads
		cetDownloadsSelectedOption = cetDownloads.selectedOption, // CET.downloads.selectedOption
		cetDownloadsTableDownloads = cetDownloads.tableDownloads, // CET.downloads.tableDownloads

		cetEffects = global.effects, // CET.effects
		cetEffectsTableEffects = cetEffects.tableEffects, // CET.effects.tableEffects

		cetGraphs = global.graphs, // CET.graphs
		cetGraphsPrepareGraphData = cetGraphs.prepareGraphData, // CET.graphs.prepareGraphData
		cetGraphsShowGraph = cetGraphs.showGraph, // CET.graphs.showGraph
		cetGraphsShowModal = cetGraphs.showModal, // CET.graphs.showModal

		cetOptions = global.options, // CET.options
		cetOptionsCloseMenu = cetOptions.closeMenu, // CET.options.closeMenu
		cetOptionsCloseModal = cetOptions.closeModal, // CET.options.closeModal
		cetOptionsListTableOptions = cetOptions.listTableOptions, // CET.options.listTableOptions
		cetOptionsOpenModal = cetOptions.openModal, // CET.options.openModal

		cetSearch = global.search, // CET.search
		cetSearchTableSearcher = cetSearch.tableSearcher, // CET.search.tableSearcher

		cetServices = global.services, // CET.services
		cetServicesApiRestData = cetServices.apiRestData, // CET.services.apiRestData
		cetServicesFireBaseData = cetServices.fireBaseData, // CET.services.fireBaseData
		cetServicesGetLocalData = cetServices.getLocalData, // CET.services.getLocalData
		cetServicesModifyData = cetServices.modifyData, // CET.services.modifyData
		cetServicesPouchDB = cetServices.pouchDB, // CET.services.pouchDB

		cetTable = global.table, // CET.table
		cetTableAssignClasses = cetTable.assignClasses, // CET.table.assignClasses
		cetTableCreateTable = cetTable.createTable, // CET.table.createTable
		cetTableTableConstructor = cetTable.tableConstructor; // CET.table.tableConstructor

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

	it('Test if CET.options is a object', function() {
		expect(cetOptions).toEqual(jasmine.any(Object));
	});

	it('Test if CET.options.closeMenu is a function', function() {
		expect(cetOptionsCloseMenu).toEqual(jasmine.any(Function));
	});

	it('Test if CET.options.closeModal is a function', function() {
		expect(cetOptionsCloseModal).toEqual(jasmine.any(Function));
	});

	it('Test if CET.options.listTableOptions is a function', function() {
		expect(cetOptionsListTableOptions).toEqual(jasmine.any(Function));
	});

	it('Test if CET.options.openModal is a function', function() {
		expect(cetOptionsOpenModal).toEqual(jasmine.any(Function));
	});

	it('Test if CET.search is a object', function() {
		expect(cetSearch).toEqual(jasmine.any(Object));
	});

	it('Test if CET.search.tableSearcher is a function', function() {
		expect(cetSearchTableSearcher).toEqual(jasmine.any(Function));
	});

	it('Test if CET.services is a object', function() {
		expect(cetServices).toEqual(jasmine.any(Object));
	});

	it('Test if CET.services.apiRestData is a function', function() {
		expect(cetServicesApiRestData).toEqual(jasmine.any(Function));
	});

	it('Test if CET.services.fireBaseData is a function', function() {
		expect(cetServicesFireBaseData).toEqual(jasmine.any(Function));
	});

	it('Test if CET.services.getLocalData is a function', function() {
		expect(cetServicesGetLocalData).toEqual(jasmine.any(Function));
	});

	it('Test if CET.services.modifyData is a function', function() {
		expect(cetServicesModifyData).toEqual(jasmine.any(Function));
	});

	it('Test if CET.services.pouchDB is a function', function() {
		expect(cetServicesPouchDB).toEqual(jasmine.any(Function));
	});

	it('Test if CET.table is a object', function() {
		expect(cetTable).toEqual(jasmine.any(Object));
	});

	it('Test if CET.table.assignClasses is a function', function() {
		expect(cetTableAssignClasses).toEqual(jasmine.any(Function));
	});

	it('Test if CET.table.createTable is a function', function() {
		expect(cetTableCreateTable).toEqual(jasmine.any(Function));
	});

	it('Test if CET.table.tableConstructor is a function', function() {
		expect(cetTableTableConstructor).toEqual(jasmine.any(Function));
	});
});