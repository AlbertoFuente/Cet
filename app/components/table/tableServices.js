/**
 * get local data
 * @param cet
 */

var getLocalData = (cet) => {
    if (cet !== undefined) {
        if (localStorage.getItem("_tableData")) {

            cet.tableData = JSON.parse(localStorage.getItem("_tableData"));
            cet.tableConstructor(cet);
        } else {
            let xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState === 4) {
                    if (xmlhttp.status === 200) {
                        cet.tableData = JSON.parse(xmlhttp.responseText);
                        cet.tableConstructor(cet);
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

var fireBaseData = (cet) => {
    if (cet !== undefined) {
        let myFirebaseRef = new Firebase(cet.fireBaseUrl);

        myFirebaseRef.on("value", function(response) {
            cet.tableData = response.val();
            cet.tableConstructor(cet);
        }, function (errorObject) {
            throw new Error("The read failed: " + errorObject.code);
        });
    }

};

/**
 * API REST DATA
 * @param url
 */

var apiRestData = (url) => {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                cet.tableData = JSON.parse(xmlhttp.responseText);
                cet.tableConstructor(cet);
            } else {
                throw new Error("Could not load the data inside the " + url + " file");
            }
        }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
};
