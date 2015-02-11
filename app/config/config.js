/**
 * _cetTable
 * @type {Object} _cetTable - config Object
 * @private
 */

var _cetTable = {};
// config type of data service
_cetTable.dataOptions = {
    'localData': false, // mode 1
    'fireBase': true, // mode 2
    'apiRest': false   // mode 3
};
// localData url
_cetTable.localDataUrl = 'localData/tableData.json';
// fireBase url
_cetTable.fireBaseUrl = 'https://frametable.firebaseio.com/';
// apiRest url
_cetTable.apiRestUrl = '';
// display table effects
_cetTable.effects = true;
// sort table
_cetTable.sortable = true;
// div container
_cetTable.container = document.getElementById('tableContainer');

createTable(_cetTable);


