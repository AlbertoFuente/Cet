((cet) => {
    'use strict';
    // CET.search object
    cet.search = {};

    /**
     * table searcher
     * @param val
     * @param tableData
     */

    cet.search.tableSearcher = (val, tableData) => {
        let obj = {};
        obj.defaultData = tableData[0].body;
        obj.newData = [];

        var refreshTable = (obj) => {
            let table = document.getElementById('cetTable'),
                tableBody = table.childNodes[1];

            for (let i = 0; i < obj.length; i++) {
                Object.keys(tableBody.childNodes).forEach(function(key) {
                    if (obj[i].tr !== tableBody.childNodes[key].className) {
                        if (tableBody.childNodes[key].tagName === 'TR') {
                            if (!tableBody.childNodes[key].hasAttribute('style')) {
                                tableBody.childNodes[key].style.opacity = '0.3'; //For real browsers;
                                tableBody.childNodes[key].style.filter = "alpha(opacity=30)"; //For IE;
                            }
                        }
                    } else {
                        tableBody.childNodes[key].style.opacity = '1'; //For real browsers;
                        tableBody.childNodes[key].style.filter = "alpha(opacity=100)"; //For IE;
                    }
                });
            }
        };

        var cleanTable = () => {
            let table = document.getElementById('cetTable'),
                tableBody = table.childNodes[1];
            Object.keys(tableBody.childNodes).forEach(function(key) {
                if (tableBody.childNodes.hasOwnProperty(key)) {
                    if (tableBody.childNodes[key].tagName === 'TR') {
                        if (tableBody.childNodes[key].hasAttribute('style')) {
                            tableBody.childNodes[key].removeAttribute('style');
                        }
                    }
                }
            });
        };

        let lowerVal = val.toLowerCase();

        if (val !== '') {
            Object.keys(obj.defaultData).forEach(function(key) {
                if (obj.defaultData.hasOwnProperty(key)) {
                    Object.keys(obj.defaultData[key]).forEach(function(k) {
                        if (obj.defaultData[key].hasOwnProperty(k)) {
                            var data = obj.defaultData[key][k].data.toLowerCase();
                            if (data.search(lowerVal) !== -1) {
                                obj.newData.push({
                                    'tr': key,
                                    'tds': obj.defaultData[key]
                                });
                            }
                        }
                    });
                }
            });
            try {
                cleanTable();
            } finally {
                refreshTable(obj.newData);
            }
        } else {
            try {
                cleanTable();
            } finally {
                refreshTable(obj.defaultData);
            }
        }
    };
})(CET || {});
