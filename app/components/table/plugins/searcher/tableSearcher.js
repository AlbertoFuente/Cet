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
                for (let j in tableBody.childNodes) {
                    if (obj[i].tr !== tableBody.childNodes[j].className) {
                        if (tableBody.childNodes[j].tagName === 'TR') {
                            if (!tableBody.childNodes[j].hasAttribute('style')) {
                                tableBody.childNodes[j].style.opacity = '0.3'; //For real browsers;
                                tableBody.childNodes[j].style.filter = "alpha(opacity=30)"; //For IE;
                            }
                        }
                    } else {
                        tableBody.childNodes[j].style.opacity = '1'; //For real browsers;
                        tableBody.childNodes[j].style.filter = "alpha(opacity=100)"; //For IE;
                    }
                }
            }
        };

        var cleanTable = () => {
            let table = document.getElementById('cetTable'),
                tableBody = table.childNodes[1];
            for (let i in tableBody.childNodes) {
                if (tableBody.childNodes[i].tagName === 'TR') {
                    if (tableBody.childNodes[i].hasAttribute('style')) {
                        tableBody.childNodes[i].removeAttribute('style');
                    }
                }
            }
        };

        let lowerVal = val.toLowerCase();

        if (val !== '') {
            for (let i in obj.defaultData) {
                if (obj.defaultData.hasOwnProperty(i)) {
                    for (let f in obj.defaultData[i]) {
                        if (obj.defaultData[i].hasOwnProperty(f)) {
                            var data = obj.defaultData[i][f].data.toLowerCase();
                            if (data.search(lowerVal) !== -1) {
                                obj.newData.push({
                                    'tr': i,
                                    'tds': obj.defaultData[i]
                                });
                            }
                        }
                    }
                }
            }
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
