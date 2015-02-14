/**
 * prepare the data for print the graph
 * @param cet
 * @param selecteds
 * @param modalContainer
 */

function prepareGraphData (cet, selecteds, modalContainer) {
    var graphType = selecteds.type,
        xAxis = selecteds.xAxis,
        yAxis = selecteds.yAxis,
        tableHead = cet.tableData[0].head,
        tableBody = cet.tableData[0].body,
        xNum = null,
        yNum = null,
        xData = [],
        yData = [],
        compareArrays = {};

    // tableHead

    $.each(tableHead, function (key, val) {
       if (val === xAxis) {
           xNum = key.slice(-1);
       }
        if (val === yAxis) {
            yNum = key.slice(-1);
        }
    });

    // tableBody

    $.each(tableBody, function (key, val) {
        $.each(val, function (k, v) {
            var tdNumX = 'td'+xNum,
                tdNumY = 'td'+yNum;

            // save xAxis data
            if (tdNumX === k) {
                xData.push(v.data);
            }
            // save yAxis data
            if (tdNumY === k) {
                yData.push(v.data);
            }
        });
    });

    // compare arrays
    // array length
    if (xData.length > 0 && xData.length === yData.length) {
        compareArrays.sameLength = true;
    }
    // text or number
    var i = 0,
        j = 0,
        num = /^\d+$/;
    // xData
    for (i; i < xData.length; i++) {
        if (num.test(xData[i])) {
            compareArrays.xAxisIsNum = true;
        } else {
            compareArrays.xAxisIsNum = false;
            break;
        }
    }
    // yData
    for (j; j < yData.length; j++) {
        if (num.test(yData[j])) {
            compareArrays.yAxisIsNum = true;
        } else {
            compareArrays.yAxisIsNum = false;
            break;
        }
    }

    /**
     * error data
     * @param cont
     */

    function showError (cont) {
        var errLabel = document.createElement('label');
            errLabel.className = 'errLabel';
            errLabel.innerHTML = 'Impossible to construct a graph of the selected data, try another selection.';
        cont.appendChild(errLabel);
        setTimeout(function () {
            cont.removeChild(errLabel);
        }, 5000);
    }

    // check if everything is ok
    if (compareArrays.sameLength) {
        if (compareArrays.xAxisIsNum !== compareArrays.yAxisIsNum) {
            console.log('OOOOKKK');
        } else {
            showError(modalContainer);
        }
    }
}
