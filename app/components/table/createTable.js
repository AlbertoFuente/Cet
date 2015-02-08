(function () {

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

            switch (mode) {
                case 1:
                    // mode 1 - localData
                    _cetTable.tableData[0].body[trParent][tdParent].data = val;
                    // save it in localStorage
                    if (window.localStorage) {
                        localStorage.setItem("_tableData", JSON.stringify(_cetTable.tableData));
                    } else {
                        throw new Error("Your browser don't support LocalStorage!");
                    }
                    break;
                case 2:
                    // mode 2 - fireBase
                    // TODO: FIREBASE MODIFY
                    break;
                case 3:
                    // mode 3 - apiRest
                    // TODO: APIREST MODE
                    break;
            }
        };

        /**
         * table constructor
         * @param _cetTable {Object}
         * @returns {_cetTable.container|*}
         */

        this.tableConstructor = function (_cetTable) {
            if (_cetTable !== undefined) {
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

                // events
                var inputs = table.getElementsByTagName('input');
                //  change
                $(inputs).change(function () {
                    var parentClass = this.parentNode.className,
                        val = $(this).val(),
                        trClass = this.parentNode.parentNode.className;
                    thisHolder.modifyData(trClass,parentClass, val, _cetTable.mode);
                });
                // hover
                $(inputs).hover(function () {
                    var trClass = this.parentNode.parentNode.className,
                        tdClass = this.parentNode.className,
                        event = "hover";
                    tableEffects(trClass,tdClass,event);
                });
                // mouse out
                $(inputs).mouseout(function () {
                    var trClass = this.parentNode.parentNode.className,
                        tdClass = this.parentNode.className,
                        event = "out";
                    tableEffects(trClass,tdClass,event);
                });

                // datepicker
                $('.datepicker').pickadate();

                // return table
                return _cetTable.container;
            }
        };

        /**
         * get local data
         * @param url - url local data
         */

        this.getLocalData = function (url) {
            if (url !== undefined) {
                if (localStorage.getItem("_tableData")) {

                    _cetTable.tableData = JSON.parse(localStorage.getItem("_tableData"));
                    thisHolder.tableConstructor(_cetTable);

                } else {
                    $.ajax({
                        url: url,
                        method: 'GET',
                        dataType: 'json',
                        success: function (response) {
                            if (response !== undefined) {
                                _cetTable.tableData = response;
                                thisHolder.tableConstructor(_cetTable);
                            }
                        },
                        error: function () {
                            throw new Error("Could not load the data inside the " + url + " file");
                        }
                    });
                }
            }
        };
        // TODO: get fireBase data
        this.fireBaseData = function (url) {

        };
        // TODO: get api rest data
        this.apiRestData = function (url) {

        };

        if (_cetTable !== undefined) {
            // Detect type of data service
            if (_cetTable.dataOptions.localData) {
                if (_cetTable.localDataUrl !== '') {
                    _cetTable.mode = 1;
                    this.getLocalData(_cetTable.localDataUrl);
                } else {
                    alert('You must add _cetTable.localDataUrl in config.js');
                }
            } else if (_cetTable.dataOptions.fireBase) {
                if (_cetTable.fireBaseUrl !== '') {
                    _cetTable.mode = 2;
                    this.fireBaseData(_cetTable.fireBaseUrl);
                } else {
                    alert('You must add _cetTable.fireBaseUrl in config.js');
                }
            } else if (_cetTable.dataOptions.apiRest) {
                if (_cetTable.apiRestUrl !== '') {
                    _cetTable.mode = 3;
                    this.apiRestData(_cetTable.apiRestUrl);
                } else {
                    alert('You must add _cetTable.apiRestUrl in config.js');
                }
            }
        }
    }

    /**
     * Import config.js (table {object} configuration)
     */

    $.getScript("../../app/config/config.js", function(data, textStatus, jqxhr){
        if (textStatus === "success" && jqxhr.status === 200) {
            createTable(_cetTable);
        }
    });
})();
