/**
 * defaultConfig
 * @type {Object} defaultConfig - config Object
 * @private
 */
var CET = (function(cet){

    cet.defaultConfig = {};
    // add header title
    cet.defaultConfig.header = true;
    cet.defaultConfig.title = "Table Title";
    // add options to header
    cet.defaultConfig.options = true;
    cet.defaultConfig.listOptions = {
        'graphs': true,
        'downloads': true
    };
    // tooltips
    cet.defaultConfig.tooltips = true;
    // download options
    cet.defaultConfig.downloadOptions = {
        'json': true,
        'xml': true,
        'sql': true,
        'txt': true,
        'csv': true,
        'xsl': true,
        'doc': true,
        'ppt': true,
        'png': true,
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
    cet.defaultConfig.effects = true;
    // sort table
    cet.defaultConfig.sortable = true;
    // div container
    cet.defaultConfig.container = document.getElementById('tableContainer');

    return cet;
})(CET || {});
