/**
 * _cetTable
 * @type {Object} _cetTable - config Object
 * @private
 */

var _cetTable = {};
// add header title
_cetTable.header = true;
_cetTable.title = "Table Title";
// add options to header
_cetTable.options = true;
// config type of data service
_cetTable.dataOptions = {
    'localData': true, // mode 1
    'fireBase': false, // mode 2
    'apiRest': false   // mode 3
};
// localData url
_cetTable.localDataUrl = 'localData/tableData.json';
// fireBase url
_cetTable.fireBaseUrl = '';
// apiRest url
_cetTable.apiRestUrl = '';
// display table effects
_cetTable.effects = true;
// sort table
_cetTable.sortable = true;
// div container
_cetTable.container = document.getElementById('tableContainer');

createTable(_cetTable);


