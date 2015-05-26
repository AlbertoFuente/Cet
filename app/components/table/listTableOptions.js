((cet) => {
	'use strict';
	// CET.options object
	cet.options = {};
	/**
	 * close modal
	 * @param modal
	 */

	cet.options.closeModal = (modal) => {
		let modalId = document.getElementById(modal.id);
		modalId.remove();
	};

	/**
	 * open modal
	 * @param type - type of modal content
	 * @param cet
	 */

	cet.options.openModal = (type, cet) => {
		// create modal container
		let modal = document.createElement('div');
		modal.id = '_cetTableModal';
		// modal header
		let modalHeader = document.createElement('div');
		modalHeader.className = '_cetTableModalHeader';
		// modal header title
		let modalHeaderTitle = document.createElement('label');
		// close modal button
		let closeButton = document.createElement('button');
		closeButton.className = 'closeButton ' + cet.table.assignClasses('closeButton');
		closeButton.onclick = () => {
			cet.options.closeModal(modal);
		};
		// content container
		let modalContainer = document.createElement('div');
		modalContainer.className = '_cetTableContent';

		switch (type) {
			case 'graph':
				modalHeaderTitle.innerHTML = 'Config graph options';

				var createConfigOption = (selectTitle, options, parent, selectId, select) => {
					// options
					let selectTypeLabel = document.createElement('label');
					selectTypeLabel.innerHTML = selectTitle;
					parent.appendChild(selectTypeLabel);
					select.id = selectId;

					for (let i = 0; i < options.length; i++) {
						let op = document.createElement('option');
						op.value = options[i];
						op.innerHTML = options[i];
						select.appendChild(op);
					}
					parent.appendChild(select);
				};

				let tData = cet.tableData || cet.defaultConfig.tableData,
					table = tData[0].head;

				// select graph
				let selectTitle = 'Select graph type: ',
					selectType = document.createElement('select'),
					selectTypeId = 'selectType',
					optionsGraphs = ['Bar chart', 'Line chart', 'Pie chart', 'Polar Area chart'];
				createConfigOption(selectTitle, optionsGraphs, modalContainer, selectTypeId, selectType);
				// select x Axis option
				let selectXaxisTitle = 'Select X axis: ',
					selectXType = document.createElement('select'),
					selectXId = 'selectXaxis',
					xOptions = [];

				Object.keys(table).forEach(function(key) {
					xOptions.push(table[key]);
				});

				createConfigOption(selectXaxisTitle, xOptions, modalContainer, selectXId, selectXType);
				// select y Axis option
				let selectYaxisTitle = 'Select Y axis: ',
					selectYType = document.createElement('select'),
					selectYId = 'selectYaxis',
					yOptions = [];

				Object.keys(table).forEach(function(key) {
					yOptions.push(table[key]);
				});

				createConfigOption(selectYaxisTitle, yOptions, modalContainer, selectYId, selectYType);

				// done button
				let doneButton = document.createElement('a');
				doneButton.className = 'doneButton ' + cet.table.assignClasses('normalButton');
				doneButton.innerHTML = 'DONE';
				modalContainer.appendChild(doneButton);

				doneButton.onclick = () => {
					let selecteds = {};
					selecteds.xAxis = selectXType.value;
					selecteds.yAxis = selectYType.value;
					selecteds.type = selectType.value;
					if (cet.graphs !== undefined) {
						cet.graphs.prepareGraphData(cet, selecteds, modalContainer);
					}
				};
				break;
			case 'downloads':
				// table downloads function
				if (cet.downloads) {
					cet.downloads.tableDownloads();
				}

				modalHeaderTitle.innerHTML = 'Config downloads options';
				let sDownloadLabel = document.createElement('label');
				sDownloadLabel.innerHTML = 'Download Options: ';
				let selectDownload = document.createElement('select');

				if (typeof cet.downloadOptions === 'object' || typeof cet.defaultConfig.downloadOptions === 'object') {
					let down = cet.downloadOptions || cet.defaultConfig.downloadOptions;

					Object.keys(down).forEach(function(key) {
						if (down[key]) {
							let option = document.createElement('option');
							option.value = key;
							option.innerHTML = key;
							selectDownload.appendChild(option);
						}
					});
				}
				let downButton = document.createElement('button');
				downButton.className = 'doneButton ' + cet.table.assignClasses('normalButton');
				downButton.innerHTML = 'DOWNLOAD';

				downButton.onclick = () => {
					let selected = selectDownload.value;
					cet.downloads.selectedOption(selected);
				};

				modalContainer.appendChild(sDownloadLabel);
				modalContainer.appendChild(selectDownload);
				modalContainer.appendChild(downButton);
				break;
			case 'column_data_sum':
				modalHeaderTitle.innerHTML = 'Config sum options';

				// extend String Class with isNumeric fucntion
				if (!String.prototype.isNumeric) {
					String.prototype.isNumeric = function() {
						return !isNaN(parseFloat(this));
					};
				}

				let obj = {},
					cont = cet.container || cet.defaultConfig.container,
					container = cont.childNodes,
					contChilds = null;

				for (let i = 0; i < container.length; i++) {
					if (container[i].tagName === 'TABLE') {
						contChilds = container[i].childNodes;
						for (let j = 0; j < contChilds.length; j++) {
							if (contChilds[j].tagName === 'THEAD') {
								for (let p = 0; p < contChilds[j].childNodes.length; p++) {
									obj[p] = {
										'name': contChilds[j].childNodes[p].innerText,
										'data': [],
										'sum': ''
									};
								}
							}
							if (contChilds[j].tagName === 'TBODY') {
								for (let p = 0; p < contChilds[j].childNodes.length; p++) {
									let trChilds = contChilds[j].childNodes[p].childNodes;
									for (let c = 0; c < trChilds.length; c++) {
										obj[c].data.push(trChilds[c].lastChild.innerText);
										obj[c].sum = trChilds[c].lastChild.innerText.isNumeric();
									}
								}
							}
						}
					}
				}

				let colLabel = document.createElement('label');
				colLabel.innerHTML = 'Select column to get the sum:';
				let colSelect = document.createElement('select');

				Object.keys(obj).forEach(function(key) {
					if (obj[key].sum) {
						let colOption = document.createElement('option');
						colOption.value = obj[key].name;
						colOption.innerHTML = obj[key].name;
						colSelect.appendChild(colOption);
					}
				});

				let result = document.createElement('label');
				result.className = 'resultLabel';

				colSelect.onchange = () => {
					let res = colSelect.value,
						total = 0;

					Object.keys(obj).forEach(function(key) {
						if (res === obj[key].name) {
							for (let j = 0; j < obj[key].data.length; j++) {
								total += obj[key].data[j] << 0;
							}
						}
					});
					result.innerHTML = 'Total: ' + total;
				};

				let colDone = document.createElement('button');
				colDone.className = 'doneButton ' + cet.table.assignClasses('normalButton');
				colDone.style.cssFloat = 'right';
				colDone.innerHTML = 'DONE';

				colDone.onclick = () => {
					cet.options.closeModal(modal);
				};

				modalContainer.appendChild(colLabel);
				modalContainer.appendChild(colSelect);
				modalContainer.appendChild(result);
				modalContainer.appendChild(colDone);

				break;
		}

		modalHeader.appendChild(closeButton);
		modalHeader.appendChild(modalHeaderTitle);
		modal.appendChild(modalHeader);
		modal.appendChild(modalContainer);
		document.body.appendChild(modal);
	};

	/**
	 * close menu
	 * @param container
	 * @param tableHeader
	 */

	cet.options.closeMenu = (container, tableHeader) => {
		container.style.display = 'none';
		let button = tableHeader.childNodes;
		Object.keys(button).forEach(function(key) {
			if (button[key].tagName === 'BUTTON') {
				button[key].className = 'normalButton ' + cet.table.assignClasses('headerButton');
			}
		});
	};

	/**
	 * list table options
	 * @param cet - _cetTable {object}
	 * @param container - _cetTable.container
	 * @param tableHeader - table header
	 */

	cet.options.listTableOptions = (cet, container, tableHeader) => {
		// options menu list
		let ul = document.createElement('ul');
		ul.className = 'optionsList';
		let selectedType = null,
			optionText = null;

		/**
		 * create menu option
		 * @param type
		 * @param text
		 * @param parent
		 */

		var createOption = (type, text, parent) => {
			let li = document.createElement('li');
			li.className = 'optionsLi';
			li.innerHTML = text;
			parent.appendChild(li);

			li.onclick = () => {
				cet.options.openModal(type, cet);
				cet.options.closeMenu(container, tableHeader);
			};
		};
		let type = null;

		if (cet.listOptions) {
			type = cet.listOptions;
		} else {
			type = cet.defaultConfig.listOptions;
		}

		// graphs
		if (type.graphs) {
			selectedType = 'graph';
			optionText = 'Show graph panel';
			createOption(selectedType, optionText, ul);
		}

		// downloads
		if (type.downloads) {
			selectedType = 'downloads';
			optionText = 'Show downloads panel';
			createOption(selectedType, optionText, ul);
		}

		// column data aount
		if (type.column_data_sum) {
			selectedType = 'column_data_sum';
			optionText = 'Show column data sum panel';
			createOption(selectedType, optionText, ul);
		}

		container.appendChild(ul);
	};
})(CET || {});
