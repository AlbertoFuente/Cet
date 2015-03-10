((cet) => {
    // CET.services object
    cet.services = {};
    /**
     * get local data
     * @param cet
     */

    cet.services.getLocalData = (cet) => {
        if (cet !== undefined) {
            if (localStorage.getItem("_tableData")) {

                cet.tableData = JSON.parse(localStorage.getItem("_tableData"));
                CET.table.tableConstructor(cet);
            } else {
                let xmlhttp = new XMLHttpRequest();

                xmlhttp.onreadystatechange = () => {
                    if (xmlhttp.readyState === 4) {
                        if (xmlhttp.status === 200) {
                            cet.tableData = JSON.parse(xmlhttp.responseText);
                            CET.table.tableConstructor(cet);
                        } else {
                            throw new Error("Could not load the data inside the " + cet.localDataUrl + " file");
                        }
                    }
                };
                xmlhttp.open("GET", cet.localDataUrl, false);
                xmlhttp.send();
            }
        }
    };

    /**
     * get firebase data
     * @param cet
     */

    cet.services.fireBaseData = (cet) => {
        if (cet !== undefined) {
            let myFirebaseRef = new Firebase(cet.fireBaseUrl);

            myFirebaseRef.on("value", function(response) {
                cet.tableData = response.val();
                CET.table.tableConstructor(cet);
            }, function(errorObject) {
                throw new Error("The read failed: " + errorObject.code);
            });
        }

    };

    /**
     * API REST DATA
     * @param url
     */

    cet.services.apiRestData = (url) => {
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    cet.tableData = JSON.parse(xmlhttp.responseText);
                    CET.table.tableConstructor(cet);
                } else {
                    throw new Error("Could not load the data inside the " + url + " file");
                }
            }
        };
        xmlhttp.open("GET", url, false);
        xmlhttp.send();
    };

    /**
     * modify data
     * @param trParent - tr parent class
     * @param tdParent - td parent class
     * @param val - value
     * @param mode - mode {1, 2, 3}
     */

    cet.services.modifyData = (trParent, tdParent, val, mode) => {

        cet.defaultConfig.tableData[0].body[trParent][tdParent].data = val;

        switch (mode) {
            case 1:
                // mode 1 - localData
                // save it in localStorage
                if (window.localStorage) {
                    localStorage.setItem('_tableData', JSON.stringify(cet.defaultConfig.tableData));
                } else {
                    throw new Error("Your browser don't support LocalStorage!");
                }
                break;
            case 2:
                // mode 2 - fireBase
                if (cet.defaultConfig.fireBaseUrl !== '') {
                    var fireUrl = new Firebase(cet.defaultConfig.fireBaseUrl);

                    fireUrl.set(cet.defaultConfig.tableData);
                }
                break;
            case 3:
                // mode 3 - apiRest
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", cet.defaultConfig.apiRestPostUrl);
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xmlhttp.send(JSON.stringify(cet.defaultConfig.tableData));
                break;
        }
    };
})(CET || {});