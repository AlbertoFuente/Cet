/**
 * close modal
 * @param modal
 */

function closeModal (modal) {
    $(modal).remove();
}

/**
 * open modal
 * @param type - type of modal content
 * @param cet
 */

function openModal(type, cet) {
    // create modal container
    var modal = document.createElement('div');
        modal.id = '_cetTableModal';
    // modal header
    var modalHeader = document.createElement('div');
        modalHeader.className = '_cetTableModalHeader';
    // modal header title
    var modalHeaderTitle = document.createElement('label');
    // close modal button
    var closeButton = document.createElement('button');
        closeButton.className = 'closeButton mdi-content-clear';
    closeButton.onclick = function () {
        closeModal(modal);
    };
    // content container
    var modalContainer = document.createElement('div');
        modalContainer.className = '_cetTableContent';

    switch (type) {
        case 'graph':
            modalHeaderTitle.innerHTML = 'Config graph options';

            function createConfigOption (selectTitle, options, parent, selectId, select) {
                // options
                var selectTypeLabel = document.createElement('label');
                selectTypeLabel.innerHTML = selectTitle;
                parent.appendChild(selectTypeLabel);

                var i = 0;
                    select.id = selectId;

                for (i; i < options.length; i++) {
                    var op = document.createElement('option');
                    op.value = options[i];
                    op.innerHTML = options[i];
                    select.appendChild(op);
                }
                parent.appendChild(select);
            }
            
            var table = cet.tableData[0].head;
            
            // select graph
            var selectTitle = 'Select graph type: ',
                selectType = document.createElement('select'),
                selectTypeId = 'selectType',
                optionsGraphs = ['Bar chart', 'Line chart', 'Pie chart', 'Scatter chart'];
            createConfigOption(selectTitle, optionsGraphs, modalContainer, selectTypeId, selectType);
            // select x Axis option
            var selectXaxisTitle = 'Select X axis: ',
                selectXType = document.createElement('select'),
                selectXId = 'selectXaxis',
                xOptions = [];

            $.each(table, function (key,val) {
                xOptions.push(val);
            });
            createConfigOption(selectXaxisTitle, xOptions, modalContainer, selectXId, selectXType);
            // select y Axis option
            var selectYaxisTitle = 'Select Y axis: ',
                selectYType = document.createElement('select'),
                selectYId = 'selectYaxis',
                yOptions = [];

            $.each(table, function (key,val) {
                yOptions.push(val);
            });
            createConfigOption(selectYaxisTitle, yOptions, modalContainer, selectYId, selectYType);

            // done button
            var doneButton = document.createElement('a');
                doneButton.className = 'doneButton waves-effect waves-light btn';
                doneButton.innerHTML = 'DONE';
            modalContainer.appendChild(doneButton);

            doneButton.onclick = function () {
                var selecteds = {};
                    selecteds.xAxis = selectXType.value;
                    selecteds.yAxis = selectYType.value;
                    selecteds.type = selectType.value;
              prepareGraphData(cet, selecteds, modalContainer);
            };

            break;
    }

    modalHeader.appendChild(closeButton);
    modalHeader.appendChild(modalHeaderTitle);
    modal.appendChild(modalHeader);
    modal.appendChild(modalContainer);
    document.body.appendChild(modal);
}

/**
 * close menu
 * @param container
 * @param tableHeader
 */

function closeMenu(container, tableHeader) {
    container.style.display= 'none';
    var button = tableHeader.childNodes[0];
    button.className = 'normalButton mdi-navigation-menu';
}

/**
 * list table options
 * @param cet - _cetTable {object}
 * @param container - _cetTable.container
 * @param tableHeader - table header
 */

function listTableOptions(cet, container, tableHeader) {
    // options menu list
    var ul = document.createElement('ul');
        ul.className = 'optionsList';
    var selectedType = null,
        optionText = null;

    /**
     * create menu option
     * @param type
     * @param text
     * @param parent
     */

    function createOption(type, text, parent) {
        var li = document.createElement('li');
            li.className = 'optionsLi';
            li.innerHTML = text;
        parent.appendChild(li);

        li.onclick = function () {
            openModal(type, cet);
            closeMenu(container, tableHeader);
        }
    }

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
}
