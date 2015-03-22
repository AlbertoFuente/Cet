((cet) => {
    // CET.services object
    cet.services = {};

    /**
     * remove unused JS library
     */

    cet.services.removeLibrary = (libId) => {
        let docBody = document.body;
        for (let i in docBody.childNodes) {
            if (docBody.childNodes[i].tagName === 'SCRIPT' && docBody.childNodes[i].id === libId) {
                docBody.childNodes[i].remove();
            }
        }
    }

    /**
     * remove unused CSS library
     */

    cet.services.removeStyles = (cssId) => {
        let docHead = document.head;
        for (let i in docHead.childNodes) {
            if (docHead.childNodes[i].tagName === 'LINK' && docHead.childNodes[i].id === cssId) {
                docHead.childNodes[i].remove();
            }
        }
    }

    /**
     * get local data
     * @param cet
     */

    cet.services.getLocalData = (cet) => {
        CET.services.removeLibrary('pouchDb');
        CET.services.removeLibrary('firebaseDb');
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
        CET.services.removeLibrary('pouchDb');
        if (cet !== undefined) {
            let myFirebaseRef = new Firebase(cet.fireBaseUrl);

            myFirebaseRef.on("value", (response) => {
                cet.tableData = response.val();
                CET.table.tableConstructor(cet);
            }, (errorObject) => {
                throw new Error("The read failed: " + errorObject.code);
            });
        }
    };

    /**
     * API REST DATA
     * @param url
     */

    cet.services.apiRestData = (url) => {
        CET.services.removeLibrary('pouchDb');
        CET.services.removeLibrary('firebaseDb');
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
     * POUCHDB DATA
     */

    cet.services.pouchDB = (cet, url) => {
        CET.services.removeLibrary('firebaseDb');

        var db = new PouchDB('cet_database');

        // table constructor

        var constructTable = (result) => {
            if (typeof result.rows === 'object') {
                cet.tableData = [{}];
                cet.tableData[0].head = {};
                cet.tableData[0].body = {};

                let tr = [];

                var tdFilter = (element) => {
                    result.rows.map((a) => {
                        if (a.doc.part === 'body') {
                            if (a.doc.parentId === element) {
                                cet.tableData[0].body[element][a.doc.tdId] = {};
                                cet.tableData[0].body[element][a.doc.tdId].data = a.doc.title;
                                cet.tableData[0].body[element][a.doc.tdId].edit = a.doc.edit;
                                cet.tableData[0].body[element][a.doc.tdId].type = a.doc.type;
                            }
                        }
                    });
                };

                for (let i in result.rows) {
                    // head
                    if (result.rows[i].doc.part === 'head') {
                        cet.tableData[0].head[result.rows[i].doc._id] = result.rows[i].doc.title;
                        // body
                    } else {
                        tr.push(result.rows[i].doc.parentId);
                        cet.tableData[0].body[result.rows[i].doc.parentId] = {};
                    }
                }
                tr.filter(tdFilter);
            }
            CET.table.tableConstructor(cet);
        };

        // fetch all table data

        var dbFetch = (db) => {
            db.allDocs({
                include_docs: true,
                attachments: true
            }).then((result) => {
                constructTable(result);
            }).catch((err) => {
                throw new Error(err);
            });
        };

        /**
         * Create new dataBase
         */

        var createDB = (url) => {
            if (url != undefined) {
                if (localStorage.getItem("_tableData")) {
                    cet.tableData = JSON.parse(localStorage.getItem("_tableData"));
                    CET.table.tableConstructor(cet);
                } else {
                    let xmlhttp = new XMLHttpRequest();

                    xmlhttp.onreadystatechange = () => {
                        if (xmlhttp.readyState === 4) {
                            if (xmlhttp.status === 200) {
                                cet.tableData = JSON.parse(xmlhttp.responseText);
                            } else {
                                throw new Error("Could not load the data inside the " + cet.pouchDbUrl + " file");
                            }
                        }
                    };
                    xmlhttp.open("GET", cet.pouchDbUrl, false);
                    xmlhttp.send();
                }
            }
            let cetHead = cet.tableData[0].head,
                cetBody = cet.tableData[0].body;

            for (let i in cetHead) {
                db.put({
                    '_id': i,
                    'part': 'head',
                    'title': cetHead[i]
                }).then((response) => {
                    throw response;
                }).catch((err) => {
                    throw new Error(err);
                });
            }

            for (let i in cetBody) {
                let trInfo = cetBody[i];
                for (let j in trInfo) {
                    db.post({
                        'tdId': j,
                        'part': 'body',
                        'parentId': i,
                        'title': trInfo[j].data,
                        'edit': trInfo[j].edit,
                        'type': trInfo[j].type
                    }).then((response) => {
                        throw response;
                    }).catch((err) => {
                        throw new Error(err);
                    });
                }
            }
            dbFetch(db);
        };

        // db info

        db.info().then((result) => {
            if (result.update_seq === 0) {
                createDB(url);
            } else {
                dbFetch(db);
            }
        }).catch((err) => {
            throw new Error(err);
        });
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
            case 4:
                // mode 4 - pouchDB
                let db = new PouchDB('cet_database');

                db.allDocs({
                    include_docs: true,
                    attachments: true
                }).then((result) => {
                    if (result.total_rows > 0) {
                        result.rows.map((a) => {
                            if (a.doc.tdId === tdParent && a.doc.parentId === trParent) {
                                db.get(a.doc._id).then((doc) => {
                                    return db.put({
                                        '_id': a.doc._id,
                                        '_rev': doc._rev,
                                        'title': val,
                                        'tdId': tdParent,
                                        'part': 'body',
                                        'parentId': trParent,
                                        'edit': a.doc.edit,
                                        'type': a.doc.type
                                    });
                                }).catch((err) => {
                                    throw new Error(err);
                                });
                            }
                        });
                    }
                }).catch((err) => {
                    throw new Error(err);
                });
                break;
        }
    };
})(CET || {});