/**
 * table searcher
 * @param val
 * @param tableData
 */

function tableSearcher (val, tableData) {
    var obj = {};
        obj.defaultData = tableData[0].body;
        obj.newData = [];

    var refreshTable = (obj) => {
        var table = document.getElementById('cetTable'),
            tableBody = table.childNodes[1];
        console.log(obj);
        for (let i  = 0; i < obj.length; i++) {
            for (let j in tableBody.childNodes) {
                if (obj[i].tr !== tableBody.childNodes[j].className) {
                    if (typeof tableBody.childNodes[j] === 'object') {
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

    var cleanTable  = () => {
        var table = document.getElementById('cetTable'),
            tableBody = table.childNodes[1];
        for (let i in tableBody.childNodes) {
            if (typeof tableBody.childNodes[i] === 'object') {
                tableBody.childNodes[i].removeAttribute('style');
            }
        }
    };

    var lowerVal = val.toLowerCase();

    if (val != '') {
        for (let i in obj.defaultData) {

            for (let f in obj.defaultData[i]) {
                var data = obj.defaultData[i][f].data.toLowerCase();
                if (data.search(lowerVal) != -1) {
                    obj.newData.push({'tr': i,'tds': obj.defaultData[i]});
                }
            }
        }
        cleanTable();
        refreshTable(obj.newData);
    } else {
        cleanTable();
        refreshTable(obj.defaultData);
    }
}
