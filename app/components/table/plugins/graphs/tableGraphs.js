((cet) => {
    // CET.graphs object
    cet.graphs = {};
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

        closeButton.onclick = () => CET.options.closeModal(gModal);

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
            ];

            if (index > colors.length) {
                return colors[Math.floor(Math.random() * colors.length)];
            } else {
                return colors[index];
            }
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
                    data.labels.push(xData[i]);
                }
                for (let i in yData) {
                    data.datasets[0].data.push(parseInt(yData[i]));
                }

                // print graph
                let bar = document.getElementById("chart").getContext("2d"),
                    BarChart = new Chart(bar).Bar(data);

                for (let i in xData) {
                    BarChart.datasets[0].bars[i].fillColor = colors(i);
                    BarChart.datasets[0].bars[i].strokeColor = colors(i);
                }
                BarChart.update();

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
                    dataLine.labels.push(xData[i]);
                }
                for (let i in yData) {
                    dataLine.datasets[0].data.push(parseInt(yData[i]));
                }

                // print graph
                let line = document.getElementById("chart").getContext("2d"),
                    LineChart = new Chart(line).Line(dataLine);

                break;
            case 'Pie chart':
                let dataPie = [];
                for (let i in xData) {
                    dataPie.push({
                        'label': xData[i],
                        'value': parseInt(yData[i]),
                        'color': colors(i),
                        'highlight': colors(i)
                    });
                }
                // print graph
                let pie = document.getElementById("chart").getContext("2d"),
                    myPieChart = new Chart(pie).Doughnut(dataPie);
                break;
            case 'Polar Area chart':
                let dataPolar = [];
                for (let i in xData) {
                    dataPolar.push({
                        'label': xData[i],
                        'value': parseInt(yData[i]),
                        'color': colors(i),
                        'highlight': colors(i)
                    });
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
            tableHead = cet.defaultConfig.tableData[0].head,
            tableBody = cet.defaultConfig.tableData[0].body,
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
                let tdNumX = 'td' + xNum,
                    tdNumY = 'td' + yNum;
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
            let errLabel = document.createElement('label');
            errLabel.className = 'errLabel';
            errLabel.innerHTML = 'Impossible to construct a graph of the selected data, try another selection.';
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