# Cet
Cet (Custom editable table) is a library that creates editable and customizable table, the table is dynamically created from a JSON file locally, from Firebase (https://www.firebase.com/) or from an API, also allows you to save the changes you make to it. To configure it you have to do it in the app/config/config.js file.

![alt tag](https://cloud.githubusercontent.com/assets/6747489/6547670/199ab132-c5df-11e4-8169-efc78cb2003e.png)

![alt tag](https://cloud.githubusercontent.com/assets/6747489/6547672/1de6df9a-c5df-11e4-9fa5-44f99686e3b6.png)

![alt tag](https://cloud.githubusercontent.com/assets/6747489/6547674/2018ac76-c5df-11e4-80ac-bdefb5ba4f25.png)

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
Once set the options you want in the table, to launch it you must add the following to the end of the body:
```js
CET.init();
```
##Options
In app/config/config.js you can find all the table default options:
- Container: Here you must insert the identifier of the box where you want to insert the table.
```js
cet.defaultConfig.container = document.getElementById('tableContainer');
```
- Data: Here configure where you get the JSON with table data, configurable to obtain and store locally, on Firebase (https://www.firebase.com/), on pouchDB (http://pouchdb.com/), or an API set for you. Set by default to localData. You can find the sample inside app/sample.
```js
// config type of data service
cet.defaultConfig.dataOptions = {
    'localData': true, 
    'fireBase': false, 
    'apiRest': false, 
    'pouchdb': false   
};
// localData url
cet.defaultConfig.localDataUrl = 'localData/tableData.json';
// fireBase url
cet.defaultConfig.fireBaseUrl = '';
// apiRest url
cet.defaultConfig.apiRestGetUrl = '';
cet.defaultConfig.apiRestPostUrl = '';
// pouchDB url
cet.defaultConfig.pouchDbUrl = 'localData/tableData.json';
```
- Table Design: By default the table came with materialize (http://materializecss.com/) to 'true', but you can change it to boostrap (http://getbootstrap.com/) if you like or leave both 'false' and give your own design.
```js
cet.defaultConfig.materialize = true;
cet.defaultConfig.bootstrap = false;
```
- Header: Adds a header to the table and add a title. 
```js
cet.defaultConfig.header = false;
cet.defaultConfig.title = "Table Title";
```
- Header options: If we set the header option to true, we can add a menu of options header. 
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
- Tooltip: Allows to add tooltips to the table, they will appear in each field of the table showing the value, now operated with Materialize. 
```js
cet.defaultConfig.tooltips = false;
```
- Search: Allows a search box on the table. 
```js
cet.defaultConfig.search = false;
```
- Limit rows: Default is 0, leaving the table 0 show all rows that we add to the table, if we change the value, automatically calculate the number of pages to add by the number of rows that have the table.
```js
cet.defaultConfig.limitRows = 0;
```
- Sortable: Allows sort the data in each column. 
```js
cet.defaultConfig.sortable = false;
```
- Table effects: Allows show hover table effects. 
```js
cet.defaultConfig.effects = false;
```
## JSON data structure
The structure of the JSON file must be like this example:
```json
[
  {
    "head": {
      "th1": "column1", 
      "th2": "column2"
    },
    "body": {
      "tr1": {
        "td1": {
          "data": "data1",
          "type": "text",
          "edit": false
        },
        "td2": {
          "data": "data2",
          "type": "text",
          "edit": false
        },
        "td3": {
          "data": "data3",
          "type": "text",
          "edit": false
        },
        "td4": {
          "data": "data4",
          "type": "text",
          "edit": true
        }
      },
      "tr2": {
        "td1": {
          "data": "data1",
          "type": "text",
          "edit": false
        },
        "td2": {
          "data": "data2",
          "type": "text",
          "edit": false
        },
        "td3": {
          "data": "data3",
          "type": "text",
          "edit": false
        },
        "td4": {
          "data": "data4",
          "type": "text",
          "edit": true
        }
      }
    }
  }
]
```
Inside all tds you can find three parameters:
- data: the text of the filed you want to show.
- type: the type of field if it is editable (text, date, ...).
- edit: If it is an editable field set it to 'true'.

## Store Data Options
- Firebase:
To store and sync your table data with your firebase server you only have to create new app in your firebase server, then store the JSON data with a similar structure like the one you can find inside Cet/app/sample/localData, then inside config.js file you have to configure it like this:
```js
// config type of data service
dataOptions: {
    'localData': false, 
    'fireBase': true, 
    'apiRest': false, 
    'pouchdb': false 
},
// fireBase url
fireBaseUrl: 'Standard Fireabse url where your data is stored'
```
Once configured, your data appear in the table if the json file has the appropriate structure, if you have editable fields, once you make changes to them, they sync with your server data firebase.

- PouchDB:
You have two options if the database is not created, simply by creating a file JSON following the appropriate structure and enter the url pointing to that file, into the file config.js and putting pouchDB option to 'true':
```js
// config type of data service
dataOptions: {
    'localData': false, 
    'fireBase': false, 
    'apiRest': false, 
    'pouchdb': true 
},
// pouchDB url
pouchDbUrl: 'localData/tableData.json'
```
If the database is yet created, then it must have this structure:
table header data:
```json
{
  "_id": "th1",
  "part": "head",
  "title": "Name",
  "_rev": "1-ba8bfeed1a56f587914a9d9f678f55fa"
}
```
table body data:
```json
{
  "_id": "39A73F6A-84FB-0931-82E7-5D9E67C4CF77",
  "tdId": "td2",
  "part": "body",
  "parentId": "tr3",
  "title": "Javascript Framework",
  "edit": false,
  "type": "text",
  "_rev": "1-f159e19262919ff434cd3c6b41f97b7f"
}
```
If the database is created and with the correct structure, then the table should appear correctly and if you make changes in editable fields, it must be sync with your pouchDB database.
