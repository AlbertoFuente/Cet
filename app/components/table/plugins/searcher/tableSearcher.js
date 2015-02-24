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

        for (let i in tableBody.childNodes) {
            if (typeof tableBody.childNodes[i] === 'object') {
                if (obj[i] !== undefined) {
                    console.log(tableBody.childNodes[i].className + " = " + obj[i].tr);
                    if (tableBody.childNodes[i].className === obj[i].tr) {
                        tableBody.childNodes[i].style.background = 'rgb(15, 151, 249)';
                    }
                }
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
        refreshTable(obj.newData);
    } else {
        refreshTable(obj.defaultData);
    }
}
