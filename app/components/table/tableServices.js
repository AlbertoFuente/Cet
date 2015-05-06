((cet) => {
	'use strict';
	// CET.services object
	cet.services = {};

	// Error Tokens
	const tokenError = "Problems to find the JSON file in this url: ",
		tokenErrorBrowser = "Your browser don't support LocalStorage!",
		tokenErrorRead = "The read failed: ";

	/**
	 * Get local JSON data
	 * @param  {string} url - url from local file
	 * @return Promise
	 */

	const getJsonData = (url) => {
		return new Promise((resolve, reject) => {
			let req = new XMLHttpRequest();
			req.open('GET', url);

			req.onload = () => {
				if (req.status === 200) {
					resolve(req.response);
				} else {
					reject(Error(req.statusText));
				}
			};
			req.onerror = () => {
				reject(Error(req.statusText));
			};
			req.send();
		});
	};

	/**
	 * Post JSON Data
	 * @param {string} url - url to post the data
	 * @param {json} data
	 * @return Promise
	 */

	const postJsonData = (url, data) => {
		return new Promise((resolve, reject) => {
			let req = new XMLHttpRequest();
			req.open('POST', url);
			req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			req.onload = () => {
				if (req.status === 200) {
					resolve(req.response);
				} else {
					reject(Error(req.statusText));
				}
			};
			req.onerror = () => {
				reject(Error(req.statusText));
			};
			req.send(JSON.stringify(data));
		});
	};

	/**
	 * get local data
	 * @param cet
	 */

	cet.services.getLocalData = (cet) => {
		let CET = CET,
			data = CET.tableData || CET.defaultConfig.tableData,
			dataConf = CET || CET.defaultConfig;
		if (cet !== undefined) {
			if (localStorage.getItem("_tableData")) {
				cet.tableData = JSON.parse(localStorage.getItem("_tableData"));
				CET.table.tableConstructor(cet);
			} else {
				getJsonData(cet.localDataUrl).then((response) => {
					data = JSON.parse(response);
					CET.table.tableConstructor(dataConf);
				}, (error) => {
					throw new Error(tokenError + cet.localDataUrl);
				});
			}
		}
	};

	/**
	 * get firebase data
	 * @param cet
	 */

	cet.services.fireBaseData = (cet) => {
		if (cet !== undefined) {
			let myFirebaseRef = new Firebase(cet.fireBaseUrl),
				CET = CET;

			myFirebaseRef.on("value", (response) => {
				cet.tableData = response.val();
				CET.table.tableConstructor(cet);
			}, (errorObject) => {
				throw new Error(tokenErrorRead + errorObject.code);
			});
		}
	};

	/**
	 * API REST DATA
	 * @param url
	 */

	cet.services.apiRestData = (url) => {
		let CET = CET,
			data = CET.tableData || CET.defaultConfig.tableData,
			dataConf = CET || CET.defaultConfig;
		if (cet !== undefined) {
			getJsonData(url).then((response) => {
				data = JSON.parse(response);
				CET.table.tableConstructor(dataConf);
			}, (error) => {
				throw new Error(tokenError + url);
			});
		}
	};

	/**
	 * POUCHDB DATA
	 */

	cet.services.pouchDB = (cet, url) => {
		var db = new PouchDB('cet_database'),
			CET = CET;

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
			let data = CET.tableData || CET.defaultConfig.tableData;
			if (url !== undefined) {
				getJsonData(cet.pouchDbUrl).then((response) => {
					data = JSON.parse(response);
					let cetHead = cet.tableData[0].head,
						cetBody = cet.tableData[0].body;

					for (let i in cetHead) {
						if (cetHead.hasOwnProperty(i)) {
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
					}

					for (let i in cetBody) {
						if (cetBody.hasOwnProperty(i)) {
							let trInfo = cetBody[i];
							for (let j in trInfo) {
								if (trInfo.hasOwnProperty(j)) {
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
						}
					}
					dbFetch(db);
				}, (error) => {
					throw new Error(tokenError + url);
				});
			}
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

		let data = cet.tableData || cet.defaultConfig.tableData,
			firebaseUrl = cet.fireBaseUrl || cet.defaultConfig.fireBaseUrl,
			apiUrl = cet.apiRestPostUrl || cet.defaultConfig.apiRestPostUrl;

		data[0].body[trParent][tdParent].data = val;

		switch (mode) {
			case 1:
				// mode 1 - localData
				// save it in localStorage
				if (window.localStorage) {
					localStorage.setItem('_tableData', JSON.stringify(data));
				} else {
					throw new Error(tokenErrorBrowser);
				}
				break;
			case 2:
				// mode 2 - fireBase
				if (firebaseUrl !== '') {
					var fireUrl = new Firebase(firebaseUrl);

					fireUrl.set(data);
				}
				break;
			case 3:
				// mode 3 - apiRest
				postJsonData(apiUrl, data).then((response) => {
					throw response;
				}, (error) => {
					throw new Error(tokenError + apiUrl);
				});
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
