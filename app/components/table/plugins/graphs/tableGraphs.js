/**
 * Show modal graph
 * @param graphType
 * @param xData
 * @param yData
 */

function showGraphModal(graphType, xData, yData) {
    var gModal = document.createElement('div');
        gModal.className = 'gModal';
    var gHeader = document.createElement('div');
        gHeader.className = 'gHeader';
    var closeButton = document.createElement('button');
        closeButton.className = 'closeButton mdi-content-clear';

    closeButton.onclick = function () {
        closeModal(gModal);
    };

    var gContent = document.createElement('div');
        gContent.className = 'gContent';
        gContent.id = 'chart';
    var svgContent = document.createElement('svg');

    gContent.appendChild(svgContent);
    gHeader.appendChild(closeButton);
    gModal.appendChild(gHeader);
    gModal.appendChild(gContent);

    switch (graphType) {
        case 'Bar chart':
            // prepare data
            var data = [];
                data.push({'key': 'Table Bar Chart', 'values': []});

            $.each(xData, function(i) {
                data[0].values.push({
                    'label': xData[i],
                    'value': parseInt(yData[i])
                });
            });

            // print graph
            nv.addGraph(function() {
                var chart = nv.models.discreteBarChart()
                        .x(function(d) { return d.label })
                        .y(function(d) { return d.value })
                        .staggerLabels(true)
                        //.staggerLabels(historicalBarChart[0].values.length > 8)
                        .tooltips(true)
                        .showValues(true)
                        .duration(250);

                d3.select('#chart svg')
                    .datum(data)
                    .call(chart);

                nv.utils.windowResize(chart.update);
                return chart;
            });

            break;
        case 'Line chart':
            break;
        case 'Pie chart':
            var dataDonut = [];
            $.each(xData, function(i) {
                dataDonut.push({
                    'label': xData[i],
                    'value': parseInt(yData[i])
                });
            });
            console.log(dataDonut);
            //Donut chart example
            nv.addGraph(function() {
                var chart = nv.models.pieChart()
                        .x(function(d) { return d.label })
                        .y(function(d) { return d.value })
                        .showLabels(true)     //Display pie labels
                        .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
                        .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
                        .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
                        .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
                    ;

                d3.select("#chart svg")
                    .datum(dataDonut)
                    .transition().duration(350)
                    .call(chart);

                return chart;
            });
            break;
        case 'Scatter chart':
            break;
    }
    document.body.appendChild(gModal);
}

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
            modalContainer.parentNode.style.display = 'none';
            showGraphModal(graphType, xData, yData);
        } else {
            showError(modalContainer);
        }
    }
}
