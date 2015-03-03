/**
 * close modal
 * @param modal
 */

var closeModal = (modal) => {
    let modalId = document.getElementById(modal.id);
    modalId.remove();
};

/**
 * open modal
 * @param type - type of modal content
 * @param cet
 */

var openModal = (type, cet) => {
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
        closeButton.className = 'closeButton mdi-content-clear';
    closeButton.onclick = () => {
        closeModal(modal);
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
            
            let table = cet.tableData[0].head;
            
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
                doneButton.className = 'doneButton waves-effect waves-light btn';
                doneButton.innerHTML = 'DONE';
            modalContainer.appendChild(doneButton);

            doneButton.onclick = () => {
                let selecteds = {};
                    selecteds.xAxis = selectXType.value;
                    selecteds.yAxis = selectYType.value;
                    selecteds.type = selectType.value;
              prepareGraphData(cet, selecteds, modalContainer);
            };
            break;
        case 'downloads':
            // table downloads function
            tableDownloads();

            modalHeaderTitle.innerHTML = 'Config Downloads Options';
            let sDownloadLabel = document.createElement('label');
                sDownloadLabel.innerHTML = 'Download Options: ';
            let selectDownload = document.createElement('select');

            if (typeof cet.downloadOptions === 'object') {
                for (let k in cet.downloadOptions) {
                    if (cet.downloadOptions[k]) {
                        let option = document.createElement('option');
                        option.value = k;
                        option.innerHTML = k;
                        selectDownload.appendChild(option);
                    }
                }
            }
            let downButton = document.createElement('button');
                downButton.className = 'doneButton waves-effect waves-light btn';
                downButton.innerHTML = 'DOWNLOAD';

            downButton.onclick = () => {
                let selected = selectDownload.value;
                selectedOption(selected);
            };

            modalContainer.appendChild(sDownloadLabel);
            modalContainer.appendChild(selectDownload);
            modalContainer.appendChild(downButton);
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

var closeMenu = (container, tableHeader) => {
    container.style.display= 'none';
    let button = tableHeader.childNodes;
    for (let i in button) {
        if (button[i].tagName === 'BUTTON') {
            button[i].className = 'normalButton mdi-navigation-menu';
        }
    }
};

/**
 * list table options
 * @param cet - _cetTable {object}
 * @param container - _cetTable.container
 * @param tableHeader - table header
 */

var listTableOptions = (cet, container, tableHeader) => {
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
            openModal(type, cet);
            closeMenu(container, tableHeader);
        }
    };

    // graphs
    if (cet.listOptions.graphs) {
        selectedType = 'graph';
        optionText = 'Show graph panel';
        createOption(selectedType, optionText, ul);
    }

    // downloads
    if (cet.listOptions.downloads) {
        selectedType = 'downloads';
        optionText = 'Show Downloads Panel';
        createOption(selectedType, optionText, ul);
    }
    container.appendChild(ul);
};
