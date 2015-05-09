((cet) => {
    'use strict';
    // CET.graphs object
    cet.graphs = {};

    // Error Tokens
    const tokenErrorCreateGraph = 'Impossible to construct a graph of the selected data, try another selection.';

    /**
     * Show modal
     */

    cet.graphs.showModal = () => {
        let gModal = document.createElement('div');
        gModal.className = 'gModal';
        gModal.id = 'gModal';
        let gHeader = document.createElement('div');
        gHeader.className = 'gHeader';
        let closeButton = document.createElement('button');
        closeButton.className = 'closeButton ' + cet.table.assignClasses('closeButton');

        closeButton.onclick = () => cet.options.closeModal(gModal);

        let gContent = document.createElement('canvas');
        gContent.className = 'gContent';
        gContent.id = 'chart';
        gContent.width = '700';
        gContent.height = '350';

        gHeader.appendChild(closeButton);
        gModal.appendChild(gHeader);
        gModal.appendChild(gContent);

        document.body.appendChild(gModal);
    };

    /**
     * Show modal graph
     * @param graphType
     * @param xData
     * @param yData
     */

    cet.graphs.showGraph = (graphType, xData, yData) => {

        var colors = (index) => {
            let colors = [
                'rgba(244, 67, 54, 0.5)',
                'rgba(233, 30, 99, 0.5)',
                'rgba(156, 39, 176, 0.5)',
                'rgba(103, 58, 183, 0.5)',
                'rgba(63, 81, 181, 0.5)',
                'rgba(33, 150, 143, 0.5)',
                'rgba(3, 169, 244, 0.5)',
                'rgba(0, 188, 212, 0.5)',
                'rgba(0, 150, 136, 0.5)',
                'rgba(76, 175, 80, 0.5)',
                'rgba(139, 195, 74, 0.5)',
                'rgba(205, 220, 57, 0.5)',
                'rgba(255, 235, 59, 0.5)',
                'rgba(255, 193, 7, 0.5)',
                'rgba(255, 152, 0, 0.5)',
                'rgba(255, 87, 34, 0.5)',
                'rgba(121, 85, 72, 0.5)'
            ],
            colorsLenght = colors.length;

            if (index > colorsLenght) return colors[Math.floor(Math.random() * colorsLenght)];
            else return colors[index];
        };

        switch (graphType) {
            case 'Bar chart':
                // prepare data
                let data = {
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
                    if (xData.hasOwnProperty(i)) {
                        data.labels.push(xData[i]);
                    }
                }
                for (let i in yData) {
                    if (yData.hasOwnProperty(i)) {
                        data.datasets[0].data.push(parseInt(yData[i]));
                    }
                }

                // print graph
                let bar = document.getElementById("chart").getContext("2d"),
                    barChart = new Chart(bar).Bar(data);

                for (let i in xData) {
                    if (xData.hasOwnProperty(i)) {
                        barChart.datasets[0].bars[i].fillColor = colors(i);
                        barChart.datasets[0].bars[i].strokeColor = colors(i);
                    }
                }
                barChart.update();

                break;
            case 'Line chart':
                // prepare data
                let dataLine = {
                    'labels': [],
                    'datasets': [{
                        'data': [],
                        'label': 'title A',
                        'fillColor': 'rgba(244, 67, 54, 0.5)',
                        'strokeColor': 'rgba(244, 67, 54, 0.8)',
                        'highlightFill': 'rgba(220,220,220,0.75)',
                        'highlightStroke': 'rgba(220,220,220,1)'
                    }]
                };
                for (let i in xData) {
                    if (xData.hasOwnProperty(i)) {
                        dataLine.labels.push(xData[i]);
                    }
                }
                for (let i in yData) {
                    if (yData.hasOwnProperty(i)) {
                        dataLine.datasets[0].data.push(parseInt(yData[i]));
                    }
                }

                // print graph
                let line = document.getElementById("chart").getContext("2d"),
                    LineChart = new Chart(line).Line(dataLine);

                break;
            case 'Pie chart':
                let dataPie = [];
                for (let i in xData) {
                    if (xData.hasOwnProperty(i)) {
                        dataPie.push({
                            'label': xData[i],
                            'value': parseInt(yData[i]),
                            'color': colors(i),
                            'highlight': colors(i)
                        });
                    }
                }
                // print graph
                let pie = document.getElementById("chart").getContext("2d"),
                    myPieChart = new Chart(pie).Doughnut(dataPie);
                break;
            case 'Polar Area chart':
                let dataPolar = [];
                for (let i in xData) {
                    if (xData.hasOwnProperty(i)) {
                        dataPolar.push({
                            'label': xData[i],
                            'value': parseInt(yData[i]),
                            'color': colors(i),
                            'highlight': colors(i)
                        });
                    }
                }
                // print graph
                let polar = document.getElementById("chart").getContext("2d"),
                    myPolarChart = new Chart(polar).PolarArea(dataPolar);
                break;
        }
    };

    /**
     * prepare the data for print the graph
     * @param cet
     * @param selecteds
     * @param modalContainer
     */

    cet.graphs.prepareGraphData = (cet, selecteds, modalContainer) => {
        let graphType = selecteds.type,
            xAxis = selecteds.xAxis,
            yAxis = selecteds.yAxis,
            tData = cet.tableData || cet.defaultConfig.tableData,
            tableHead = tData[0].head,
            tableBody = tData[0].body,
            xNum = null,
            yNum = null,
            xData = [],
            yData = [],
            compareArrays = {};

        // tableHead
        for (let key in tableHead) {
            if (tableHead.hasOwnProperty(key)) {
                if (tableHead[key] === xAxis) xNum = key.slice(-1);

                if (tableHead[key] === yAxis) yNum = key.slice(-1);
            }
        }

        // tableBody
        for (let key in tableBody) {
            if (tableBody.hasOwnProperty(key)) {
                for (let k in tableBody[key]) {
                    if (tableBody[key].hasOwnProperty(k)) {
                        let tdNumX = 'td' + xNum,
                            tdNumY = 'td' + yNum;
                        // save xAxis data
                        if (tdNumX === k) xData.push(tableBody[key][k].data);
                        // save yAxis data
                        if (tdNumY === k) yData.push(tableBody[key][k].data);
                    }
                }
            }
        }

        // compare arrays
        // array length
        let xDataLength = xData.length,
            yDataLength = yData.length;
        if (xDataLength > 0 && xDataLength === yDataLength) compareArrays.sameLength = true;

        // extend String Class with isNumeric fucntion
        if (!String.prototype.isNumeric) {
            String.prototype.isNumeric = function() {
                return !isNaN(parseFloat(this));
            };
        }

        // xData
        for (let i = 0; i < xDataLength; i++) {
            if (xData[i].isNumeric()) {
                compareArrays.xAxisIsNum = true;
            } else {
                compareArrays.xAxisIsNum = false;
                break;
            }
        }
        // yData
        for (let j = 0; j < yDataLength; j++) {
            if (yData[j].isNumeric()) {
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
            let errLabel = document.createElement('label');
            errLabel.className = 'errLabel';
            errLabel.innerHTML = tokenErrorCreateGraph;
            cont.appendChild(errLabel);
            setTimeout(() => {
                cont.removeChild(errLabel);
            }, 5000);
        };

        // check if everything is ok
        if (compareArrays.sameLength) {
            if (compareArrays.xAxisIsNum !== compareArrays.yAxisIsNum) {
                modalContainer.parentNode.style.display = 'none';
                cet.graphs.showModal();

                if (compareArrays.xAxisIsNum) {
                    cet.graphs.showGraph(graphType, yData, xData);
                } else {
                    cet.graphs.showGraph(graphType, xData, yData);
                }
            } else {
                showError(modalContainer);
            }
        }
    };
})(CET || {});
