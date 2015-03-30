((cet) => {

    // CET.table object
    cet.table = {};

    /**
     * table design assigning classes
     * - materializecss (m)
     * - bootstrap (b)
     * @param {string} elementType - element type (button, input, span, ...).
     */

    cet.table.assignClasses = (elementType) => {
        let design = null,
            designClass = null;
        /**
         * Assign class to elements
         * materializeccs classes and bootstrap classes
         * @param {string} design - 'm': materializecss, 'b': bootstrap.
         */

        var classifyElement = (design) => {
            const materialzeClasses = {
                    searchDiv: 'input-field col s6',
                    searchIcon: 'mdi-action-search prefix',
                    headerButton: 'mdi-navigation-menu',
                    tableStriped: 'striped',
                    sortIconDown: 'mdi-hardware-keyboard-arrow-down',
                    sortIconUp: 'mdi-hardware-keyboard-arrow-up',
                    tooltip: 'tooltipped',
                    datePicker: ' datepicker picker__input',
                    buttonLeft: 'mdi-hardware-keyboard-arrow-left',
                    buttonRight: 'mdi-hardware-keyboard-arrow-right',
                    closeButton: 'mdi-content-clear',
                    normalButton: 'waves-effect waves-light btn'
                },
                bootstrapClasses = {
                    searchDiv: '',
                    searchIcon: 'glyphicon glyphicon-search',
                    headerButton: 'glyphicon glyphicon-align-justify',
                    tableStriped: 'table table-striped',
                    sortIconDown: 'glyphicon glyphicon-menu-down',
                    sortIconUp: 'glyphicon glyphicon-menu-up',
                    tooltip: '',
                    datePicker: ' date',
                    buttonLeft: 'glyphicon glyphicon-menu-left',
                    buttonRight: 'glyphicon glyphicon-menu-right',
                    closeButton: 'glyphicon glyphicon-remove',
                    normalButton: 'btn btn-primary'
                };

            var setClasses = (mode) => {
                for (let key in mode) {
                    if (key === elementType) {
                        designClass = materialzeClasses[key];
                    }
                }
            };

            switch (design) {
                case 'm':
                    setClasses(materialzeClasses);
                    break;
                case 'b':
                    setClasses(bootstrapClasses);
                    break;
            }
        };

        if (cet.defaultConfig.materialize) {
            design = 'm'; // materilize
            classifyElement(design);
        } else if (cet.defaultConfig.bootstrap) {
            design = 'b'; // bootstrap
            classifyElement(design);
        } else {
            return false;
        }
        return designClass; // return class
    };

    /**
     * Create Table
     * @param _cetTable {object}
     */

    cet.table.createTable = (_cetTable) => {

        /**
         * Print New table Body
         * @param val
         * @param column
         * @param table
         */

        _cetTable.printNewBody = (val, column, table) => {
            let tableBody = table.childNodes[1],
                newColumn = [];

            tableBody.innerHTML = null;

            for (let i = 0; i < val.length; i++) {
                for (let j = 0; j < column.length; j++) {
                    if (val[i] === column[j].value) newColumn.push(column[j].tr);
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
            let trClass = element.parentNode.parentNode.className,
                tdClass = element.parentNode.className;
            CET.effects.tableEffects(trClass, tdClass, eventName, null, null);
        };

        /**
         * input change
         * @param element
         */

        _cetTable.inputChange = (element) => {
            let parentClass = element.parentNode.className,
                val = element.value,
                trClass = element.parentNode.parentNode.className;
            CET.services.modifyData(trClass, parentClass, val, _cetTable.mode);
        };

        /**
         * Show pager
         * @param obj
         */

        _cetTable.showPager = (obj) => {
            // calc num of panels
            let calcPages = (num) => Math.round(num.length / _cetTable.limitRows);

            // create pager container
            let container = document.createElement('div');
            container.className = 'pagerContainer';
            // btn left
            let btnLeft = document.createElement('button');
            btnLeft.className = cet.table.assignClasses('buttonLeft') + ' directionBtn';
            container.appendChild(btnLeft);
            // number buttons
            let number = calcPages(obj.tr);
            let numBtn = null;
            obj.numPages = number;

            for (let i = 1; i <= number; i++) {
                numBtn = document.createElement('button');
                numBtn.innerText = i.toString();
                numBtn.className = 'numberBtn';
                container.appendChild(numBtn);
                numBtn.onclick = (e) => {
                    let num = 'num',
                        old = oldView(),
                        page = actualPage(old, num, e);
                };
            }
            // btn right
            let btnRight = document.createElement('button');
            btnRight.className = cet.table.assignClasses('buttonRight') + ' directionBtn';
            container.appendChild(btnRight);

            _cetTable.container.appendChild(container);

            // new table structure
            let count = 0;

            for (let j = 0; j < obj.tr.length; j++) {
                let m = j % _cetTable.limitRows;
                if (m === 0) count++;
                obj.pages.push({
                    'page': count,
                    'tr': obj.tr[j]
                });
            }
            // buttons events
            // get actual trs
            let oldView = () => {
                for (let i in _cetTable.container.childNodes) {
                    if (typeof _cetTable.container.childNodes[i] === 'object') {
                        if (_cetTable.container.childNodes[i].id === 'cetTable') return _cetTable.container.childNodes[i].childNodes[1].childNodes;
                    }
                }
            };
            // remove body
            let removeBody = (old) => {
                for (let i = 0; i < old.length;) {
                    old[i].remove();
                }
            };
            // get actual page
            let actualPage = (oldTrs, direction, ev) => {
                let page = null;

                for (let i = 0; i < oldTrs.length; i++) {
                    obj.pages.map((a) => {
                        if (a.tr.className === oldTrs[i].className) page = a.page;
                    });
                }

                let insertTrs = (a, cont) => {
                    if (typeof cont === 'object' && cont.tagName === 'TABLE') cont.childNodes[1].appendChild(a.tr);
                };

                switch (direction) {
                    case 'prev':
                        if (page !== 1) {
                            removeBody(oldTrs);
                            let newPage = page - 1;
                            obj.pages.map((a) => {
                                if (newPage === a.page) {
                                    for (let i in _cetTable.container.childNodes) {
                                        insertTrs(a, _cetTable.container.childNodes[i]);
                                    }
                                }
                            });
                        }
                        break;
                    case 'next':
                        if (page !== obj.numPages) {
                            removeBody(oldTrs);
                            let newPage = page + 1;
                            obj.pages.map((a) => {
                                if (newPage === a.page) {
                                    for (let i in _cetTable.container.childNodes) {
                                        insertTrs(a, _cetTable.container.childNodes[i]);
                                    }
                                }
                            });
                        }
                        break;
                    case 'num':
                        let num = parseInt(ev.srcElement.innerHTML);
                        removeBody(oldTrs);
                        obj.pages.map((a) => {
                            if (num === a.page) {
                                for (let i in _cetTable.container.childNodes) {
                                    insertTrs(a, _cetTable.container.childNodes[i]);
                                }
                            }
                        });
                        break;
                }

            };
            // direction buttons
            btnLeft.onclick = () => {
                let direction = 'prev',
                    old = oldView(),
                    page = actualPage(old, direction);
            };
            btnRight.onclick = () => {
                let direction = 'next',
                    old = oldView(),
                    page = actualPage(old, direction);
            };
            _cetTable.pager = {
                'numberPages': obj.numPages,
                'pages': obj.pages
            };
        };

        /**
         * table constructor
         * @param _cetTable {Object}
         */

        cet.table.tableConstructor = (_cetTable) => {

            if (_cetTable !== undefined) {
                if (_cetTable.header) {

                    let tableHeader = document.createElement('div');
                    tableHeader.className = 'tableHeader';

                    let tableHeaderTitle = document.createElement('label');
                    tableHeaderTitle.className = 'tableHeaderTitle';
                    tableHeaderTitle.innerHTML = _cetTable.title;

                    if (_cetTable.search) {

                        let searchDiv = document.createElement('div');
                        searchDiv.className = cet.table.assignClasses('searchDiv') + ' searchTable';

                        let icon = document.createElement('i');
                        icon.className = cet.table.assignClasses('searchIcon');
                        let searchInput = document.createElement('input');
                        searchInput.className = 'validate';
                        searchInput.type = 'text';
                        searchInput.id = 'icon_prefix';
                        let inputLabel = document.createElement('label');
                        inputLabel.setAttribute('for', 'icon_prefix');

                        searchDiv.appendChild(icon);
                        searchDiv.appendChild(searchInput);
                        searchDiv.appendChild(inputLabel);

                        tableHeader.appendChild(searchDiv);

                        searchInput.onchange = () => {
                            CET.search.tableSearcher(searchInput.value, _cetTable.tableData);
                        }
                    }

                    if (_cetTable.options) {
                        let tableHeaderOptions = document.createElement('button');
                        tableHeaderOptions.className = 'normalButton ' + cet.table.assignClasses('headerButton');
                        tableHeader.appendChild(tableHeaderOptions);

                        let optionsContainer = document.createElement('div');
                        optionsContainer.className = 'optionsContainer';
                        optionsContainer.id = 'optionsContainer';
                        optionsContainer.style.display = 'none';

                        if (_cetTable.listOptions !== undefined && typeof _cetTable.listOptions === 'object') {
                            CET.options.listTableOptions(CET, optionsContainer, tableHeader);
                        }

                        tableHeaderOptions.onclick = () => {

                            let elementPosition = tableHeaderOptions.getBoundingClientRect();

                            optionsContainer.style.top = (elementPosition.top + 38) + 'px';
                            optionsContainer.style.left = (elementPosition.left - 164) + 'px';

                            if (tableHeaderOptions.className === 'normalButton ' + cet.table.assignClasses('headerButton')) {
                                tableHeaderOptions.className = 'clickedButton ' + cet.table.assignClasses('headerButton');
                                if (document.getElementById('optionsContainer')) {
                                    optionsContainer.style.display = 'block';
                                } else {
                                    document.body.appendChild(optionsContainer);
                                    optionsContainer.style.display = 'block';
                                }
                            } else {
                                tableHeaderOptions.className = 'normalButton ' + cet.table.assignClasses('headerButton');
                                optionsContainer.style.display = 'none';
                            }
                        }
                    }

                    tableHeader.appendChild(tableHeaderTitle);
                    _cetTable.container.appendChild(tableHeader);
                    _cetTable.container.className = 'cet-table-cnt';
                }

                let childLength = 0;

                if (_cetTable.header) childLength = 1;

                if (_cetTable.container.childNodes.length === childLength) {
                    // table
                    let table = document.createElement('table');
                    table.id = 'cetTable';
                    table.className = cet.table.assignClasses('tableStriped');

                    // HEAD

                    let tableHead = document.createElement('tHead'),
                        headContent = _cetTable.tableData.head || _cetTable.tableData[0].head;

                    for (let k in headContent) {
                        if (headContent.hasOwnProperty(k) && typeof headContent[k] !== 'function') {
                            let th = document.createElement('th');
                            th.className = k;
                            let thLabel = document.createElement('span');
                            thLabel.innerHTML = headContent[k];
                            thLabel.value = headContent[k];
                            th.setAttribute('data-field', headContent[k]);
                            th.appendChild(thLabel);

                            if (_cetTable.sortable) {
                                let sortIcon = document.createElement('i');
                                sortIcon.className = cet.table.assignClasses('sortIconDown') + ' sortIcon';
                                th.appendChild(sortIcon);
                            }
                            tableHead.appendChild(th);
                        }
                    }
                    table.appendChild(tableHead);

                    // END HEAD

                    // BODY

                    let tableBody = document.createElement('tBody'),
                        bodyContent = _cetTable.tableData.body || _cetTable.tableData[0].body,
                        pager = false,
                        trObj = {},
                        tdObjSorted = {};

                    trObj.tr = [];
                    trObj.pages = [];

                    _cetTable.limitRows > 0 ? pager = true : pager = false;

                    let bodyKeys = Object.keys(bodyContent).sort(),
                        newBody = {};

                    bodyKeys.map((a) => {
                        newBody[a] = bodyContent[a];
                    });

                    for (let key in newBody) {
                        if (newBody.hasOwnProperty(key) && typeof newBody[key] !== 'function') {
                            let tr = document.createElement('tr');
                            tr.className = key;

                            let tdKeys = Object.keys(newBody[key]).sort();

                            tdKeys.map((a) => {
                                tdObjSorted[a] = newBody[key][a];
                            });

                            for (let p in tdObjSorted) {
                                let td = document.createElement('td');
                                td.className = p;
                                if (tdObjSorted[p].data !== undefined && tdObjSorted[p].type !== undefined) {
                                    if (tdObjSorted[p].edit) {
                                        let input = document.createElement('input'),
                                            span = document.createElement('span');
                                        span.style.display = 'none';
                                        if (_cetTable.tooltips) {
                                            input.className = 'input_edit ' + cet.table.assignClasses('tooltip');
                                            input.setAttribute('data-position', 'bottom');
                                            input.setAttribute('data-delay', '30');
                                            input.setAttribute('data-tooltip', 'Edit field: ' + tdObjSorted[p].data);
                                            input.setAttribute('value', tdObjSorted[p].data);
                                            span.innerHTML = tdObjSorted[p].data;
                                            span.setAttribute('value', tdObjSorted[p].data);
                                        } else {
                                            input.className = 'input_edit';
                                            input.setAttribute('value', tdObjSorted[p].data);
                                            span.innerHTML = tdObjSorted[p].data;
                                            span.setAttribute('value', tdObjSorted[p].data);
                                        }
                                        if (tdObjSorted[p].type === 'date') {
                                            input.className = input.className + cet.table.assignClasses('datePicker');
                                            input.type = 'text';
                                            input.setAttribute('value', tdObjSorted[p].data);
                                            input.setAttribute('placeholder', tdObjSorted[p].data);
                                            span.innerHTML = tdObjSorted[p].data;
                                            span.setAttribute('value', tdObjSorted[p].data);
                                        } else {
                                            input.type = tdObjSorted[p].type;
                                            input.setAttribute('value', tdObjSorted[p].data);
                                            span.innerHTML = tdObjSorted[p].data;
                                            span.setAttribute('value', tdObjSorted[p].data);
                                        }

                                        td.appendChild(input);
                                        td.appendChild(span);
                                    } else {
                                        let noEditLabel = document.createElement('span');
                                        noEditLabel.className = 'noEditableField';
                                        noEditLabel.innerHTML = tdObjSorted[p].data;
                                        noEditLabel.value = tdObjSorted[p].data;
                                        if (_cetTable.tooltips) {
                                            noEditLabel.className = noEditLabel.className + ' ' + cet.table.assignClasses('tooltip');
                                            noEditLabel.setAttribute('data-position', 'bottom');
                                            noEditLabel.setAttribute('data-delay', '30');
                                            td.appendChild(noEditLabel);
                                            let labelParent = noEditLabel.parentNode.className,
                                                sliceNum = labelParent.slice(-1),
                                                thClass = 'th' + sliceNum,
                                                thText = tableHead.getElementsByClassName(thClass)[0].innerText;
                                            noEditLabel.setAttribute('data-tooltip', thText + ': ' + tdObjSorted[p].data);
                                        } else {
                                            td.appendChild(noEditLabel);
                                        }
                                    }
                                }
                                tr.appendChild(td);
                            }
                            if (pager) {
                                trObj.tr.push(tr);
                                trObj.tbBody = tableBody;
                                let num = tr.className.slice(-1);
                                if (num <= _cetTable.limitRows) tableBody.appendChild(tr);
                            } else {
                                tableBody.appendChild(tr);
                            }
                        }
                    }

                    table.appendChild(tableBody);

                    // END BODY

                    _cetTable.container.appendChild(table);

                    if (pager) _cetTable.showPager(trObj);

                    /**
                     * Events
                     * @type {NodeList}
                     */

                    let inputs = table.getElementsByTagName('input'),
                        icons = table.getElementsByTagName('i'),
                        spans = table.getElementsByTagName('span');
                    // inputs events
                    for (let i = 0; i < inputs.length; i++) {
                        // change
                        inputs[i].onchange = () => _cetTable.inputChange(inputs[i]);

                        if (_cetTable.effects) {
                            // hover
                            inputs[i].onmouseover = () => _cetTable.mouseEffects(inputs[i], 'hover');
                            inputs[i].parentNode.onmouseover = () => _cetTable.mouseEffects(inputs[i], 'hover');

                            // out
                            inputs[i].parentNode.onmouseout = () => _cetTable.mouseEffects(inputs[i], 'out');
                        }
                    }
                    // spans events
                    for (let i = 0; i < spans.length; i++) {
                        if (_cetTable.effects) {
                            // hover
                            spans[i].onmouseover = () => _cetTable.mouseEffects(spans[i], 'hover');
                            spans[i].parentNode.onmouseover = () => _cetTable.mouseEffects(spans[i], 'hover');

                            // out
                            spans[i].parentNode.onmouseout = () => _cetTable.mouseEffects(spans[i], 'out');
                        }
                    }
                    // icons events
                    for (let i = 0; i < icons.length; i++) {
                        // click
                        icons[i].onclick = () => {
                            let thClass = icons[i].parentNode.className,
                                tdNum = thClass.slice(-1),
                                tdClass = 'td' + tdNum,
                                eventName = 'sort',
                                downClass = cet.table.assignClasses('sortIconDown') + ' sortIcon',
                                upClass = cet.table.assignClasses('sortIconUp') + ' sortIcon',
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
                            CET.effects.tableEffects(thClass, tdClass, eventName, table, status);
                        }
                    }
                    // datepicker
                    if (_cetTable.materialize) $('.datepicker').pickadate();

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
                    CET.services.getLocalData(_cetTable);
                } else {
                    alert('You must add _cetTable.localDataUrl in config.js');
                }
            } else if (_cetTable.dataOptions.fireBase) {
                if (_cetTable.fireBaseUrl !== '') {
                    _cetTable.mode = 2;
                    CET.services.fireBaseData(_cetTable);
                } else {
                    alert('You must add _cetTable.fireBaseUrl in config.js');
                }
            } else if (_cetTable.dataOptions.apiRest) {
                if (_cetTable.apiRestUrl !== '') {
                    _cetTable.mode = 3;
                    CET.services.apiRestData(_cetTable.apiRestGetUrl);
                } else {
                    alert('You must add _cetTable.apiRestUrl in config.js');
                }
            } else if (_cetTable.dataOptions.pouchdb) {
                _cetTable.mode = 4;
                CET.services.pouchDB(_cetTable, _cetTable.pouchDbUrl);
            }
        }
    };

    /**
     * init table
     * @param config
     */

    cet.init = (config) => {
        config = config || CET.defaultConfig;
        cet.table.createTable(config);
    };
})(CET || {});