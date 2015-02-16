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

            // options
            var selectTypeLabel = document.createElement('label');
                selectTypeLabel.className = 'selectTypeLabel';
                selectTypeLabel.innerHTML = 'Select graph type: ';
            modalContainer.appendChild(selectTypeLabel);

            var selectType = document.createElement('select');
                selectType.className = 'browser-default';
            var options = ['Bar chart', 'Line chart', 'Pie chart', 'Scatter chart'],
                xOptions = [],
                i = 0,
                j = 0,
                p = 0;

            for (i; i < options.length; i++) {
                var op = document.createElement('option');
                    op.value = options[i];
                    op.innerHTML = options[i];
                selectType.appendChild(op);
            }
            modalContainer.appendChild(selectType);

            var selectXaxisLabel = document.createElement('label');
                selectXaxisLabel.className = 'selectXaxisLabel';
                selectXaxisLabel.innerHTML = 'Select X axis: ';
            modalContainer.appendChild(selectXaxisLabel);

            var selectXType = document.createElement('select');
            selectXType.className = 'browser-default';

            var table = cet.tableData[0].head;

            $.each(table, function (key,val) {
                xOptions.push(val);
            });

            for (j; j < xOptions.length; j++) {
                var xOp = document.createElement('option');
                xOp.value = xOptions[j];
                xOp.innerHTML = xOptions[j];
                selectXType.appendChild(xOp);
            }
            modalContainer.appendChild(selectXType);

            var selectYaxisLabel = document.createElement('label');
            selectYaxisLabel.className = 'selectYaxisLabel';
            selectYaxisLabel.innerHTML = 'Select Y axis: ';
            modalContainer.appendChild(selectYaxisLabel);

            var selectYType = document.createElement('select');
            selectYType.className = 'browser-default';

            for (p; p < xOptions.length; p++) {
                var yOp = document.createElement('option');
                yOp.value = xOptions[p];
                yOp.innerHTML = xOptions[p];
                selectYType.appendChild(yOp);
            }
            modalContainer.appendChild(selectYType);

            // done button
            var done = document.createElement('a');
                done.className = 'doneButton waves-effect waves-light btn';
                done.innerHTML = 'DONE';
            modalContainer.appendChild(done);

            done.onclick = function () {
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
    if (cet.listOptions.downloads) {
        selectedType = 'downloads';
        optionText = 'Show Downloads Panel';
        createOption(selectedType, optionText, ul);

    }
    container.appendChild(ul);
}
