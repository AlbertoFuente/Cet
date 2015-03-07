/**
 * defaultConfig
 * @type {Object} defaultConfig - config Object
 * @private
 */
var CET = ((cet) => {
    // cet object
    cet.defaultConfig = {};
    // table design
    cet.defaultConfig.materialize = true;
    cet.defaultConfig.bootstrap = false;
    // add header title
    cet.defaultConfig.header = false;
    cet.defaultConfig.title = "Table Title";
    // add options to header
    cet.defaultConfig.options = false;
    cet.defaultConfig.listOptions = {
        'graphs': false,
        'downloads': false
    };
    // tooltips
    cet.defaultConfig.tooltips = false;
    // download options
    cet.defaultConfig.downloadOptions = {
        'json': true,
        'xml': true,
        'sql': true,
        'txt': true,
        'csv': true,
        'xsl': true,
        'doc': true,
        'pdf': true
    };
    // search
    cet.defaultConfig.search = false;
    // limit rows and add pager
    cet.defaultConfig.limitRows = 0;
    // config type of data service
    cet.defaultConfig.dataOptions = {
        'localData': true, // mode 1
        'fireBase': false, // mode 2
        'apiRest': false   // mode 3
    };
    // localData url
    cet.defaultConfig.localDataUrl = 'localData/tableData.json';
    // fireBase url
    cet.defaultConfig.fireBaseUrl = '';
    // apiRest url
    cet.defaultConfig.apiRestGetUrl = '';
    cet.defaultConfig.apiRestPostUrl = '';
    // display table effects
    cet.defaultConfig.effects = false;
    // sort table
    cet.defaultConfig.sortable = false;
    // div container
    cet.defaultConfig.container = document.getElementById('tableContainer');

    return cet;
})(CET || {});
