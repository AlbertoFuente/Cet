/**
 * Show modal
 */

function showModal () {
    var gModal = document.createElement('div');
    gModal.className = 'gModal';
    gModal.id = 'gModal';
    var gHeader = document.createElement('div');
    gHeader.className = 'gHeader';
    var closeButton = document.createElement('button');
    closeButton.className = 'closeButton mdi-content-clear';

    closeButton.onclick = () => {
        closeModal(gModal);
    };

    var gContent = document.createElement('canvas');
    gContent.className = 'gContent';
    gContent.id = 'chart';
    gContent.width = '700';
    gContent.height = '350';
    var svgContent = document.createElement('svg');

    gContent.appendChild(svgContent);
    gHeader.appendChild(closeButton);
    gModal.appendChild(gHeader);
    gModal.appendChild(gContent);

    document.body.appendChild(gModal);
}

/**
 * Show modal graph
 * @param graphType
 * @param xData
 * @param yData
 */

function showGraph(graphType, xData, yData) {

    switch (graphType) {
        case 'Bar chart':
            // prepare data
            var data = {
                'labels': [],
                'datasets': [{
                    'data': [],
                    'label': 'title A',
                    'fillColor': 'rgba(220,220,220,0.5)',
                    'strokeColor': 'rgba(220,220,220,0.8)',
                    'highlightFill': 'rgba(220,220,220,0.75)',
                    'highlightStroke': 'rgba(220,220,220,1)'
                }]
            };
            for (let i in xData) {
                data.labels.push(xData[i]);
            }
            for (let i in yData) {
                data.datasets[0].data.push(parseInt(yData[i]));
            }

            // print graph
            var bar = document.getElementById("chart").getContext("2d");
            var BarChart = new Chart(bar).Bar(data);

            break;
        case 'Line chart':
            // prepare data
            var dataLine = {
                'labels': [],
                'datasets': [{
                    'data': [],
                    'label': 'title A',
                    'fillColor': 'rgba(220,220,220,0.5)',
                    'strokeColor': 'rgba(220,220,220,0.8)',
                    'highlightFill': 'rgba(220,220,220,0.75)',
                    'highlightStroke': 'rgba(220,220,220,1)'
                }]
            };
            for (let i in xData) {
                dataLine.labels.push(xData[i]);
            }
            for (let i in yData) {
                dataLine.datasets[0].data.push(parseInt(yData[i]));
            }

            // print graph
            var line = document.getElementById("chart").getContext("2d");
            var LineChart = new Chart(line).Line(dataLine);

            break;
        case 'Pie chart':

            break;
        case 'Scatter chart':

            break;
    }
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
    for (let key in tableHead) {
        if (tableHead[key] === xAxis) {
            xNum = key.slice(-1);
        }
        if (tableHead[key] === yAxis) {
            yNum = key.slice(-1);
        }
    }

    // tableBody
    for (let key in tableBody) {
        for (let k in tableBody[key]) {
            var tdNumX = 'td'+xNum,
                tdNumY = 'td'+yNum;
            // save xAxis data
            if (tdNumX === k) {
                xData.push(tableBody[key][k].data);
            }
            // save yAxis data
            if (tdNumY === k) {
                yData.push(tableBody[key][k].data);
            }
        }
    }

    // compare arrays
    // array length
    if (xData.length > 0 && xData.length === yData.length) {
        compareArrays.sameLength = true;
    }
    // text or number
    const num = /^\d+$/;
    // xData
    for (let i = 0; i < xData.length; i++) {
        if (num.test(xData[i])) {
            compareArrays.xAxisIsNum = true;
        } else {
            compareArrays.xAxisIsNum = false;
            break;
        }
    }
    // yData
    for (let j = 0; j < yData.length; j++) {
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

    var showError = (cont) => {
        var errLabel = document.createElement('label');
            errLabel.className = 'errLabel';
            errLabel.innerHTML = 'Impossible to construct a graph of the selected data, try another selection.';
        cont.appendChild(errLabel);
        setTimeout(function () {
            cont.removeChild(errLabel);
        }, 5000);
    };

    // check if everything is ok
    if (compareArrays.sameLength) {
        if (compareArrays.xAxisIsNum !== compareArrays.yAxisIsNum) {
            modalContainer.parentNode.style.display = 'none';
            showModal();
            showGraph(graphType, xData, yData);
        } else {
            showError(modalContainer);
        }
    }
}
