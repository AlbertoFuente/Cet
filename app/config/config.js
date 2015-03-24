/**
 * defaultConfig
 * @type {Object} defaultConfig - config Object
 * @private
 */
var CET = ((cet) => {
    // cet object
    cet.defaultConfig = {
        // table design
        materialize: true,
        bootstrap: false,
        // add header title
        header: false,
        title: "Table Title",
        // add options to header
        options: false,
        listOptions: {
            'graphs': false,
            'downloads': false,
            'column_data_sum': false
        },
        // tooltips
        tooltips: false,
        // download options
        downloadOptions: {
            'json': true,
            'xml': true,
            'sql': true,
            'txt': true,
            'csv': true,
            'xsl': true,
            'doc': true,
            'pdf': true
        },
        // search
        search: false,
        // limit rows and add pager
        limitRows: 0,
        // config type of data service
        dataOptions: {
            'localData': true, // mode 1
            'fireBase': false, // mode 2
            'apiRest': false, // mode 3
            'pouchdb': false // mode 4
        },
        // localData url
        localDataUrl: 'localData/tableData.json',
        // fireBase url
        fireBaseUrl: '',
        // pouchDB url
        pouchDbUrl: 'localData/tableData.json',
        // apiRest url
        apiRestGetUrl: '',
        apiRestPostUrl: '',
        // display table effects
        effects: false,
        // sort table
        sortable: false,
        // div container
        container: document.getElementById('tableContainer')
    }

    return cet;
})(CET || {});