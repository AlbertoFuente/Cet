/**
 * create table function
 * @param _cetTable {Object}
 */

function createTable(_cetTable) {
    var thisHolder = this;

    /**
     * modify data
     * @param trParent - tr parent class
     * @param tdParent - td parent class
     * @param val - value
     * @param mode - mode {1, 2, 3}
     */

    this.modifyData = function (trParent, tdParent, val, mode) {

        _cetTable.tableData[0].body[trParent][tdParent].data = val;

        switch (mode) {
            case 1:
                // mode 1 - localData
                // save it in localStorage
                if (window.localStorage) {
                    localStorage.setItem("_tableData", JSON.stringify(_cetTable.tableData));
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
                // TODO: APIREST MODE
                break;
        }
    };

    /**
     * Print New table Body
     * @param val
     * @param column
     * @param table
     */

    this.printNewBody = function (val, column, table) {
        var tableBody = table.childNodes[1],
            newColumn = [],
            i = 0;

        $(tableBody).empty();

        for (i; i < val.length; i++) {
            for (var j = 0; j < column.length; j++) {
                if (val[i] === column[j].value) {
                    newColumn.push(column[j].tr);
                }
            }
        }

        $(tableBody).append(newColumn);
    };

    /**
     * mouse effects
     * @param element
     * @param eventName
     */

    this.mouseEffects = function (element, eventName) {
        var trClass = element.parentNode.parentNode.className,
            tdClass = element.parentNode.className;
        tableEffects(trClass,tdClass,eventName);
    };

    /**
     * input change
     * @param element
     */

    this.inputChange = function (element) {
        var parentClass = element.parentNode.className,
            val = element.value,
            trClass = element.parentNode.parentNode.className;
        thisHolder.modifyData(trClass,parentClass, val, _cetTable.mode);
    };

    /**
     * table constructor
     * @param _cetTable {Object}
     * @returns {_cetTable.container|*}
     */

    this.tableConstructor = function (_cetTable) {

        if (_cetTable !== undefined) {
            if (_cetTable.header) {

                var tableHeader = document.createElement('div');
                    tableHeader.className = 'tableHeader';

                var tableHeaderTitle = document.createElement('label');
                    tableHeaderTitle.className = 'tableHeaderTitle';
                    tableHeaderTitle.innerHTML = _cetTable.title;

                if (_cetTable.options) {
                    var tableHeaderOptions = document.createElement('button');
                        tableHeaderOptions.className = 'normalButton mdi-navigation-menu';
                    tableHeader.appendChild(tableHeaderOptions);

                    var optionsContainer = document.createElement('div');
                        optionsContainer.className = "optionsContainer";
                        optionsContainer.style.display = "none";

                    if (_cetTable.listOptions !== undefined && typeof _cetTable.listOptions === 'object') {
                        listTableOptions(_cetTable, optionsContainer, tableHeader);
                    }

                    tableHeaderOptions.onclick = function () {

                        var elementPosition = this.getBoundingClientRect();

                        optionsContainer.style.top = (elementPosition.top + 38) + "px";
                        optionsContainer.style.left = (elementPosition.left - 164) + "px";

                        if (this.className === 'normalButton mdi-navigation-menu') {
                            this.className = 'clickedButton mdi-navigation-menu';
                            if ($(document).find('optionsContainer')) {
                                document.body.appendChild(optionsContainer);
                                optionsContainer.style.display = "block";
                            } else {
                                optionsContainer.style.display = "block";
                            }
                        } else {
                            this.className = 'normalButton mdi-navigation-menu';
                            optionsContainer.style.display = "none";
                        }
                    }
                }

                tableHeader.appendChild(tableHeaderTitle);
                _cetTable.container.appendChild(tableHeader);
            }

            if (_cetTable.container.childNodes.length === 1) {
                // table
                var table = document.createElement('table');
                table.id = 'cetTable';
                table.className = 'striped';

                // HEAD

                var tableHead = document.createElement('tHead'),
                    headContent = _cetTable.tableData.head || _cetTable.tableData[0].head;

                $.each(headContent, function (key, val) {
                    var th = document.createElement('th');
                    th.className = key;
                    th.innerHTML = val;
                    th.setAttribute('data-field', val);

                    if (_cetTable.sortable) {
                        var sortIcon = document.createElement('i');
                        sortIcon.className = 'mdi-hardware-keyboard-arrow-down sortIcon';
                        th.appendChild(sortIcon);
                    }
                    tableHead.appendChild(th);
                });
                table.appendChild(tableHead);

                // END HEAD

                // BODY

                var tableBody = document.createElement('tBody'),
                    bodyContent = _cetTable.tableData.body || _cetTable.tableData[0].body;

                $.each(bodyContent, function (key, val) {
                    var tr = document.createElement('tr');
                    tr.className = key;
                    $.each(val, function (k, v) {
                        var td = document.createElement('td');
                        td.className = k;

                        if (v.data !== undefined && v.type !== undefined) {
                            var input = document.createElement('input');
                            input.className = "input_"+k;

                            if (v.type === "date") {
                                $(input).addClass('datepicker picker__input');
                                input.type = "text";
                                input.value = v.data;
                                input.setAttribute('placeholder', v.data);
                            } else {
                                input.type = v.type;
                                input.value = v.data;
                            }
                            if (!v.edit) {
                                input.setAttribute('disabled', 'disabled');
                            }
                            td.appendChild(input);
                        }
                        tr.appendChild(td);
                    });
                    tableBody.appendChild(tr);
                });
                table.appendChild(tableBody);

                // END BODY

                _cetTable.container.appendChild(table);

                /**
                 * Events
                 * @type {NodeList}
                 */

                var inputs = table.getElementsByTagName('input'),
                    icons = table.getElementsByTagName('i');
                //  change
                $(inputs).change(function () {
                    thisHolder.inputChange(this);
                });
                // hover
                $(inputs).hover(function () {
                    thisHolder.mouseEffects(this, "hover");
                });
                // mouse out
                $(inputs).mouseout(function () {
                    thisHolder.mouseEffects(this, "out");
                });
                // icon sort
                $(icons).click(function() {
                    var thClass = this.parentNode.className,
                        tdNum = thClass.slice(-1),
                        tdClass = "td" + tdNum,
                        eventName = "sort",
                        downClass = "mdi-hardware-keyboard-arrow-down sortIcon",
                        upClass = "mdi-hardware-keyboard-arrow-up sortIcon",
                        ics = table.getElementsByTagName('i'),
                        i = 0,
                        status = "down";

                    // check class
                    if (this.className === downClass) {
                        for (i; i < ics.length; i++) {
                            ics[i].className = upClass;
                            status = "up";
                        }
                    } else {
                        for (i; i < ics.length; i++) {
                            ics[i].className = downClass;
                            status = "down";
                        }
                    }

                    tableEffects(thClass, tdClass, eventName, table, status, thisHolder);
                });

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
                getLocalData(_cetTable, thisHolder);
            } else {
                alert('You must add _cetTable.localDataUrl in config.js');
            }
        } else if (_cetTable.dataOptions.fireBase) {
            if (_cetTable.fireBaseUrl !== '') {
                _cetTable.mode = 2;
                fireBaseData(_cetTable, thisHolder);

            } else {
                alert('You must add _cetTable.fireBaseUrl in config.js');
            }
        } else if (_cetTable.dataOptions.apiRest) {
            if (_cetTable.apiRestUrl !== '') {
                _cetTable.mode = 3;
                apiRestData(_cetTable.apiRestUrl);
            } else {
                alert('You must add _cetTable.apiRestUrl in config.js');
            }
        }
    }
}

/**
 *  import config.js
 * @type {HTMLElement}
 */

var imported = document.createElement('script');
imported.src = '../config/config.js';
document.head.appendChild(imported);

