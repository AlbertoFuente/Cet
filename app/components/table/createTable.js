/**
 * create table function
 * @param _cetTable {Object}
 */

function createTable(_cetTable) {

    /**
     * modify data
     * @param trParent - tr parent class
     * @param tdParent - td parent class
     * @param val - value
     * @param mode - mode {1, 2, 3}
     */

    _cetTable.modifyData = (trParent, tdParent, val, mode) => {

        _cetTable.tableData[0].body[trParent][tdParent].data = val;

        switch (mode) {
            case 1:
                // mode 1 - localData
                // save it in localStorage
                if (window.localStorage) {
                    localStorage.setItem('_tableData', JSON.stringify(_cetTable.tableData));
                } else {
                    throw new Error("Your browser don't support LocalStorage!");
                }
                break;
            case 2:
                // mode 2 - fireBase
                if (_cetTable.fireBaseUrl !== '') {
                    var fireUrl = new Firebase(_cetTable.fireBaseUrl);

                    fireUrl.set(_cetTable.tableData);
                }
                break;
            case 3:
                // mode 3 - apiRest
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", _cetTable.apiRestPostUrl);
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xmlhttp.send(JSON.stringify(_cetTable.tableData));
                break;
        }
    };

    /**
     * Print New table Body
     * @param val
     * @param column
     * @param table
     */

    _cetTable.printNewBody = (val, column, table) => {
        var tableBody = table.childNodes[1],
            newColumn = [];

        tableBody.innerHTML = null;

        for (let i = 0; i < val.length; i++) {
            for (let j = 0; j < column.length; j++) {
                if (val[i] === column[j].value) {
                    newColumn.push(column[j].tr);
                }
            }
        }
        for (let i = 0; i < newColumn.length; i++) {
            tableBody.appendChild(newColumn[i]);
        }
    };

    /**
     * mouse effects
     * @param element
     * @param eventName
     */

    _cetTable.mouseEffects = (element, eventName) => {
        var trClass = element.parentNode.parentNode.className,
            tdClass = element.parentNode.className;
        tableEffects(trClass,tdClass,eventName, null, null);
    };

    /**
     * input change
     * @param element
     */

    _cetTable.inputChange = (element) => {
        var parentClass = element.parentNode.className,
            val = element.value,
            trClass = element.parentNode.parentNode.className;
        _cetTable.modifyData(trClass,parentClass, val, _cetTable.mode);
    };

    /**
     * table constructor
     * @param _cetTable {Object}
     * @returns {_cetTable.container|*}
     */

    _cetTable.tableConstructor = (_cetTable) => {

        if (_cetTable !== undefined) {
            if (_cetTable.header) {

                var tableHeader = document.createElement('div');
                    tableHeader.className = 'tableHeader';

                var tableHeaderTitle = document.createElement('label');
                    tableHeaderTitle.className = 'tableHeaderTitle';
                    tableHeaderTitle.innerHTML = _cetTable.title;

                if (_cetTable.search) {

                    var searchDiv = document.createElement('div');
                        searchDiv.className = 'input-field col s6 searchTable';

                    var icon = document.createElement('i');
                        icon.className = 'mdi-action-search prefix';
                    var searchInput = document.createElement('input');
                        searchInput.className = 'validate';
                        searchInput.type = 'text';
                        searchInput.id = 'icon_prefix';
                    var inputLabel = document.createElement('label');
                        inputLabel.setAttribute('for', 'icon_prefix');

                    searchDiv.appendChild(icon);
                    searchDiv.appendChild(searchInput);
                    searchDiv.appendChild(inputLabel);

                    tableHeader.appendChild(searchDiv);

                    searchInput.onchange = () => {
                        tableSearcher(searchInput.value, _cetTable.tableData);
                    }
                }

                if (_cetTable.options) {
                    var tableHeaderOptions = document.createElement('button');
                        tableHeaderOptions.className = 'normalButton mdi-navigation-menu';
                    tableHeader.appendChild(tableHeaderOptions);

                    var optionsContainer = document.createElement('div');
                        optionsContainer.className = 'optionsContainer';
                        optionsContainer.id = 'optionsContainer';
                        optionsContainer.style.display = 'none';

                    if (_cetTable.listOptions !== undefined && typeof _cetTable.listOptions === 'object') {
                        listTableOptions(_cetTable, optionsContainer, tableHeader);
                    }

                    tableHeaderOptions.onclick = () => {

                        var elementPosition = tableHeaderOptions.getBoundingClientRect();

                        optionsContainer.style.top = (elementPosition.top + 38) + 'px';
                        optionsContainer.style.left = (elementPosition.left - 164) + 'px';

                        if (tableHeaderOptions.className === 'normalButton mdi-navigation-menu') {
                            tableHeaderOptions.className = 'clickedButton mdi-navigation-menu';
                            if (document.getElementById('optionsContainer')) {
                                optionsContainer.style.display = 'block';
                            } else {
                                document.body.appendChild(optionsContainer);
                                optionsContainer.style.display = 'block';
                            }
                        } else {
                            tableHeaderOptions.className = 'normalButton mdi-navigation-menu';
                            optionsContainer.style.display = 'none';
                        }
                    }
                }

                tableHeader.appendChild(tableHeaderTitle);
                _cetTable.container.appendChild(tableHeader);
                _cetTable.container.className = 'cet-table-cnt';
            }

            if (_cetTable.container.childNodes.length === 1) {
                // table
                var table = document.createElement('table');
                table.id = 'cetTable';
                table.className = 'striped';

                // HEAD

                var tableHead = document.createElement('tHead'),
                    headContent = _cetTable.tableData.head || _cetTable.tableData[0].head;

                for (let k in headContent) {
                    if (headContent.hasOwnProperty(k) && typeof headContent[k] !== 'function') {
                        var th = document.createElement('th');
                        th.className = k;
                        var thLabel = document.createElement('span');
                        thLabel.innerHTML = headContent[k];
                        thLabel.value = headContent[k];
                        th.setAttribute('data-field', headContent[k]);
                        th.appendChild(thLabel);

                        if (_cetTable.sortable) {
                            var sortIcon = document.createElement('i');
                            sortIcon.className = 'mdi-hardware-keyboard-arrow-down sortIcon';
                            th.appendChild(sortIcon);
                        }
                        tableHead.appendChild(th);
                    }
                }
                table.appendChild(tableHead);

                // END HEAD

                // BODY

                var tableBody = document.createElement('tBody'),
                    bodyContent = _cetTable.tableData.body || _cetTable.tableData[0].body,
                    pager = false;

                _cetTable.limitRows > 0 ? pager = true : pager = false;

                for (let key in bodyContent) {
                    if (bodyContent.hasOwnProperty(key) && typeof bodyContent[key] !== 'function') {
                        var tr = document.createElement('tr');
                        tr.className = key;

                        for (let p in bodyContent[key]) {
                            var td = document.createElement('td');
                            td.className = p;
                            if (bodyContent[key][p].data !== undefined && bodyContent[key][p].type !== undefined) {
                                if (bodyContent[key][p].edit) {
                                    var input = document.createElement('input');
                                    if (_cetTable.tooltips) {
                                        input.className = 'input_edit tooltipped';
                                        input.setAttribute('data-position', 'bottom');
                                        input.setAttribute('data-delay', '30');
                                        input.setAttribute('data-tooltip', 'Edit field: ' + bodyContent[key][p].data);
                                    } else {
                                        input.className = 'input_edit';
                                    }
                                    if (bodyContent[key][p].type === 'date') {
                                        input.className = input.className + ' datepicker picker__input';
                                        input.type = 'text';
                                        input.value = bodyContent[key][p].data;
                                        input.setAttribute('placeholder', bodyContent[key][p].data);
                                    } else {
                                        input.type = bodyContent[key][p].type;
                                        input.value = bodyContent[key][p].data;
                                    }
                                    td.appendChild(input);
                                } else {
                                    var noEditLabel = document.createElement('span');
                                    noEditLabel.className = 'noEditableField';
                                    noEditLabel.innerHTML = bodyContent[key][p].data;
                                    noEditLabel.value = bodyContent[key][p].data;
                                    if (_cetTable.tooltips){
                                        noEditLabel.className = noEditLabel.className + ' tooltipped';
                                        noEditLabel.setAttribute('data-position', 'bottom');
                                        noEditLabel.setAttribute('data-delay', '30');
                                        td.appendChild(noEditLabel);
                                        var labelParent = noEditLabel.parentNode.className,
                                            sliceNum = labelParent.slice(-1),
                                            thClass = 'th' + sliceNum,
                                            thText = tableHead.getElementsByClassName(thClass)[0].innerText;
                                        noEditLabel.setAttribute('data-tooltip', thText + ': ' + bodyContent[key][p].data);
                                    } else {
                                        td.appendChild(noEditLabel);
                                    }
                                }
                            }
                            tr.appendChild(td);
                        }
                        if (pager) {
                            let num = tr.className.slice(-1);
                            if (num <= _cetTable.limitRows) {
                                tableBody.appendChild(tr);
                            }
                        } else {
                            tableBody.appendChild(tr);
                        }
                    }
                }

                table.appendChild(tableBody);

                // END BODY

                _cetTable.container.appendChild(table);

                /**
                 * Events
                 * @type {NodeList}
                 */

                var inputs = table.getElementsByTagName('input'),
                    icons = table.getElementsByTagName('i'),
                    spans = table.getElementsByTagName('span');
                // inputs events
                for (let i = 0; i < inputs.length; i++) {
                    // change
                    inputs[i].onchange = () => {
                        _cetTable.inputChange(inputs[i]);
                    };
                    // hover
                    inputs[i].onmouseover = () => {
                        _cetTable.mouseEffects(inputs[i], 'hover');
                    };
                    // out
                    inputs[i].onmouseout = () => {
                        _cetTable.mouseEffects(inputs[i], 'out');
                    }
                }
                // spans events
                for (let i = 0; i < spans.length; i++) {
                    // hover
                    spans[i].onmouseover = () => {
                        _cetTable.mouseEffects(spans[i], 'hover');
                    };
                    // out
                    spans[i].onmouseout = () => {
                        _cetTable.mouseEffects(spans[i], 'out');
                    }
                }
                // icons events
                for (let i = 0; i < icons.length; i++) {
                    // click
                    icons[i].onclick = () => {
                        var thClass = icons[i].parentNode.className,
                            tdNum = thClass.slice(-1),
                            tdClass = 'td' + tdNum,
                            eventName = 'sort',
                            downClass = 'mdi-hardware-keyboard-arrow-down sortIcon',
                            upClass = 'mdi-hardware-keyboard-arrow-up sortIcon',
                            ics = table.getElementsByTagName('i'),
                            status = 'down';
                        // check class
                        if (icons[i].className === downClass) {
                            for (let i = 0; i < ics.length; i++) {
                                ics[i].className = upClass;
                                status = 'up';
                            }
                        } else {
                            for (let i = 0; i < ics.length; i++) {
                                ics[i].className = downClass;
                                status = 'down';
                            }
                        }
                        tableEffects(thClass, tdClass, eventName, table, status);
                    }
                }

                // datepicker
                $('.datepicker').pickadate();

                // return table
                return _cetTable.container;
            } else {
                return false;
            }
        }
    };

    if (_cetTable !== undefined) {
        // Detect type of data service
        if (_cetTable.dataOptions.localData) {
            if (_cetTable.localDataUrl !== '') {
                _cetTable.mode = 1;
                getLocalData(_cetTable);
            } else {
                alert('You must add _cetTable.localDataUrl in config.js');
            }
        } else if (_cetTable.dataOptions.fireBase) {
            if (_cetTable.fireBaseUrl !== '') {
                _cetTable.mode = 2;
                fireBaseData(_cetTable);

            } else {
                alert('You must add _cetTable.fireBaseUrl in config.js');
            }
        } else if (_cetTable.dataOptions.apiRest) {
            if (_cetTable.apiRestUrl !== '') {
                _cetTable.mode = 3;
                apiRestData(_cetTable.apiRestGetUrl);
            } else {
                alert('You must add _cetTable.apiRestUrl in config.js');
            }
        }
    }
}