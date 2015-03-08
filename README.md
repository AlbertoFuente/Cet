# Cet
Cet (Custom editable table) is a library that creates editable and customizable table, the table is dynamically created from a JSON file locally, from Firebase (https://www.firebase.com/) or from an API, also allows you to save the changes you make to it. To configure it you have to do it in the app/config/config.js file, by default comes with almost every option to 'false'.

##Install
To install, clone the repository and:
- Install bower dependencies:
```
bower install
```
- Install node dependencies:
```
node install
```
- Run gulp:
```
gulp
gulp watch
```
And start config all the options inside app/config/config.js.
##Options
In app/config/config.js you can find all the table default options:
- Container: Here you must insert the identifier of the box where you want to insert the table.
```js
cet.defaultConfig.container = document.getElementById('tableContainer');
```
- Data: Here configure where you get the JSON with table data, configurable to obtain and store locally on Firebase (https://www.firebase.com/) or an API set for you. Set by default to localData. You can find the sample inside app/sample.
```js
// config type of data service
cet.defaultConfig.dataOptions = {
    'localData': true, 
    'fireBase': false, 
    'apiRest': false   
};
// localData url
cet.defaultConfig.localDataUrl = 'localData/tableData.json';
// fireBase url
cet.defaultConfig.fireBaseUrl = '';
// apiRest url
cet.defaultConfig.apiRestGetUrl = '';
cet.defaultConfig.apiRestPostUrl = '';
```
- Table Design: By default the table came with materialize (http://materializecss.com/) to 'true', but you can change it to boostrap (http://getbootstrap.com/) if you like or leave both 'false' and give your own design.
```js
cet.defaultConfig.materialize = true;
cet.defaultConfig.bootstrap = false;
```
- Header: Adds a header to the table and add a title. By default is 'false'.
```js
cet.defaultConfig.header = false;
cet.defaultConfig.title = "Table Title";
```
- Header options: If we set the header option to true, we can add a menu of options header. By default is 'false'.
  Options: Graphs, downloads and Column data sum.
  These options appear in the drop-down menu of the header, when you click on any of them will display a modal with their     choices. 
```js
cet.defaultConfig.options = false;
cet.defaultConfig.listOptions = {
    // Allow show table data in diferents graphs: Bar chart, line chart, pie chart and polar area chart.
    'graphs': false,
    // Allow download the table data in diferents formats.
    'downloads': false,
    // Allow make the sum selectign one numeric column
    'column_data_sum': false
};
// Download options:
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
```
- Tooltip: Allows to add tooltips to the table, they will appear in each field of the table showing the value, now operated with Materialize. By default is 'false'.
```js
cet.defaultConfig.tooltips = false;
```
- Search: Allows a search box on the table. By default comes 'false'.
```js
cet.defaultConfig.search = false;
```
- Limit rows: Default is 0, leaving the table 0 show all rows that we add to the table, if we change the value, automatically calculate the number of pages to add by the number of rows that have the table.
```js
cet.defaultConfig.limitRows = 0;
```
- Sortable: Allows sort the data in each column. By default is 'false'.
```js
cet.defaultConfig.sortable = false;
```
- Table effects: Allows show hover table effects. By default is 'false'. 
```js
cet.defaultConfig.effects = false;
```
  
