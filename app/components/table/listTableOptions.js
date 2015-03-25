((cet) => {
    // CET.options object
    cet.options = {};
    /**
     * close modal
     * @param modal
     */

    cet.options.closeModal = (modal) => {
        let modalId = document.getElementById(modal.id);
        modalId.remove();
    };

    /**
     * open modal
     * @param type - type of modal content
     * @param cet
     */

    cet.options.openModal = (type, cet) => {
        // create modal container
        let modal = document.createElement('div');
        modal.id = '_cetTableModal';
        // modal header
        let modalHeader = document.createElement('div');
        modalHeader.className = '_cetTableModalHeader';
        // modal header title
        let modalHeaderTitle = document.createElement('label');
        // close modal button
        let closeButton = document.createElement('button');
        closeButton.className = 'closeButton ' + cet.table.assignClasses('closeButton');
        closeButton.onclick = () => {
            cet.options.closeModal(modal);
        };
        // content container
        let modalContainer = document.createElement('div');
        modalContainer.className = '_cetTableContent';

        switch (type) {
            case 'graph':
                modalHeaderTitle.innerHTML = 'Config graph options';

                var createConfigOption = (selectTitle, options, parent, selectId, select) => {
                    // options
                    let selectTypeLabel = document.createElement('label');
                    selectTypeLabel.innerHTML = selectTitle;
                    parent.appendChild(selectTypeLabel);
                    select.id = selectId;

                    for (let i = 0; i < options.length; i++) {
                        let op = document.createElement('option');
                        op.value = options[i];
                        op.innerHTML = options[i];
                        select.appendChild(op);
                    }
                    parent.appendChild(select);
                };

                let table = cet.defaultConfig.tableData[0].head;

                // select graph
                let selectTitle = 'Select graph type: ',
                    selectType = document.createElement('select'),
                    selectTypeId = 'selectType',
                    optionsGraphs = ['Bar chart', 'Line chart', 'Pie chart', 'Polar Area chart'];
                createConfigOption(selectTitle, optionsGraphs, modalContainer, selectTypeId, selectType);
                // select x Axis option
                let selectXaxisTitle = 'Select X axis: ',
                    selectXType = document.createElement('select'),
                    selectXId = 'selectXaxis',
                    xOptions = [];

                for (let k in table) {
                    xOptions.push(table[k]);
                }

                createConfigOption(selectXaxisTitle, xOptions, modalContainer, selectXId, selectXType);
                // select y Axis option
                let selectYaxisTitle = 'Select Y axis: ',
                    selectYType = document.createElement('select'),
                    selectYId = 'selectYaxis',
                    yOptions = [];

                for (let k in table) {
                    yOptions.push(table[k]);
                }

                createConfigOption(selectYaxisTitle, yOptions, modalContainer, selectYId, selectYType);

                // done button
                let doneButton = document.createElement('a');
                doneButton.className = 'doneButton ' + cet.table.assignClasses('normalButton');
                doneButton.innerHTML = 'DONE';
                modalContainer.appendChild(doneButton);

                doneButton.onclick = () => {
                    let selecteds = {};
                    selecteds.xAxis = selectXType.value;
                    selecteds.yAxis = selectYType.value;
                    selecteds.type = selectType.value;
                    if (cet.graphs !== undefined) {
                        cet.graphs.prepareGraphData(cet, selecteds, modalContainer);
                    }
                };
                break;
            case 'downloads':
                // table downloads function
                if (CET.downloads) {
                    CET.downloads.tableDownloads();
                }

                modalHeaderTitle.innerHTML = 'Config downloads options';
                let sDownloadLabel = document.createElement('label');
                sDownloadLabel.innerHTML = 'Download Options: ';
                let selectDownload = document.createElement('select');

                if (typeof cet.defaultConfig.downloadOptions === 'object') {
                    for (let k in cet.defaultConfig.downloadOptions) {
                        if (cet.defaultConfig.downloadOptions[k]) {
                            let option = document.createElement('option');
                            option.value = k;
                            option.innerHTML = k;
                            selectDownload.appendChild(option);
                        }
                    }
                }
                let downButton = document.createElement('button');
                downButton.className = 'doneButton ' + cet.table.assignClasses('normalButton');
                downButton.innerHTML = 'DOWNLOAD';

                downButton.onclick = () => {
                    let selected = selectDownload.value;
                    CET.downloads.selectedOption(selected);
                };

                modalContainer.appendChild(sDownloadLabel);
                modalContainer.appendChild(selectDownload);
                modalContainer.appendChild(downButton);
                break;
            case 'column_data_sum':
                modalHeaderTitle.innerHTML = 'Config sum options';

                // text or number
                const num = /^\d+$/;
                let obj = {};

                let container = cet.defaultConfig.container.childNodes;

                for (let i = 0; i < container.length; i++) {
                    if (container[i].tagName === 'TABLE') {
                        let contChilds = container[i].childNodes;
                        for (let j = 0; j < contChilds.length; j++) {
                            if (contChilds[j].tagName === 'THEAD') {
                                for (let p = 0; p < contChilds[j].childNodes.length; p++) {
                                    obj[p] = {
                                        'name': contChilds[j].childNodes[p].innerText,
                                        'data': [],
                                        'sum': ''
                                    }
                                }
                            }
                            if (contChilds[j].tagName === 'TBODY') {
                                for (let p = 0; p < contChilds[j].childNodes.length; p++) {
                                    let trChilds = contChilds[j].childNodes[p].childNodes;
                                    for (let c = 0; c < trChilds.length; c++) {
                                        obj[c].data.push(trChilds[c].lastChild.innerText);
                                        obj[c].sum = !!num.test(trChilds[c].lastChild.innerText);
                                    }
                                }
                            }
                        }
                    }
                }

                let colLabel = document.createElement('label');
                colLabel.innerHTML = 'Select column to get the sum:';
                let colSelect = document.createElement('select');

                for (let op in obj) {
                    if (obj[op].sum) {
                        let colOption = document.createElement('option');
                        colOption.value = obj[op].name;
                        colOption.innerHTML = obj[op].name;
                        colSelect.appendChild(colOption);
                    }
                }

                let result = document.createElement('label');
                result.className = 'resultLabel';

                colSelect.onchange = () => {
                    let res = colSelect.value,
                        total = 0;

                    for (let i in obj) {
                        if (res === obj[i].name) {
                            for (let j = 0; j < obj[i].data.length; j++) {
                                total += obj[i].data[j] << 0;
                            }
                        }
                    }
                    result.innerHTML = 'Total: ' + total;
                };

                let colDone = document.createElement('button');
                colDone.className = 'doneButton ' + cet.table.assignClasses('normalButton');
                colDone.style.cssFloat = 'right';
                colDone.innerHTML = 'DONE';

                colDone.onclick = () => {
                    cet.options.closeModal(modal);
                };

                modalContainer.appendChild(colLabel);
                modalContainer.appendChild(colSelect);
                modalContainer.appendChild(result);
                modalContainer.appendChild(colDone);

                break;
        }

        modalHeader.appendChild(closeButton);
        modalHeader.appendChild(modalHeaderTitle);
        modal.appendChild(modalHeader);
        modal.appendChild(modalContainer);
        document.body.appendChild(modal);
    };

    /**
     * close menu
     * @param container
     * @param tableHeader
     */

    cet.options.closeMenu = (container, tableHeader) => {
        container.style.display = 'none';
        let button = tableHeader.childNodes;
        for (let i in button) {
            if (button[i].tagName === 'BUTTON') {
                button[i].className = 'normalButton ' + cet.table.assignClasses('headerButton');
            }
        }
    };

    /**
     * list table options
     * @param cet - _cetTable {object}
     * @param container - _cetTable.container
     * @param tableHeader - table header
     */

    cet.options.listTableOptions = (cet, container, tableHeader) => {
        // options menu list
        let ul = document.createElement('ul');
        ul.className = 'optionsList';
        let selectedType = null,
            optionText = null;

        /**
         * create menu option
         * @param type
         * @param text
         * @param parent
         */

        var createOption = (type, text, parent) => {
            let li = document.createElement('li');
            li.className = 'optionsLi';
            li.innerHTML = text;
            parent.appendChild(li);

            li.onclick = () => {
                CET.options.openModal(type, cet);
                CET.options.closeMenu(container, tableHeader);
            }
        };

        // graphs
        if (cet.defaultConfig.listOptions.graphs) {
            selectedType = 'graph';
            optionText = 'Show graph panel';
            createOption(selectedType, optionText, ul);
        }

        // downloads
        if (cet.defaultConfig.listOptions.downloads) {
            selectedType = 'downloads';
            optionText = 'Show downloads panel';
            createOption(selectedType, optionText, ul);
        }

        // column data aount
        if (cet.defaultConfig.listOptions.column_data_sum) {
            selectedType = 'column_data_sum';
            optionText = 'Show column data sum panel';
            createOption(selectedType, optionText, ul);
        }

        container.appendChild(ul);
    };
})(CET || {});