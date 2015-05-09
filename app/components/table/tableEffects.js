((cet) => {
	'use strict';
	// CET.effect object
	cet.effects = {};

	/**
	 * Table effects
	 *
	 * @param trClass
	 * @param tdClass
	 * @param eventName
	 * @param table
	 * @param status
	 */

	cet.effects.tableEffects = (trClass, tdClass, eventName, table, status) => {
		let tr = document.getElementsByClassName(trClass),
			td = document.getElementsByClassName(tdClass),
			tdChar = tdClass.slice(-1),
			thClass = 'th' + tdChar,
			th = document.getElementsByClassName(thClass),
			thLength = th.length,
			trLength = tr.length,
			tdLength = td.length;

		switch (eventName) {
			case "hover":
				for (let i = 0; i < thLength; i++) {
					th[i].setAttribute('style', 'background: rgb(15, 151, 249); color: white');
				}
				for (let i = 0; i < trLength; i++) {
					tr[i].setAttribute('style', 'background: rgba(15, 151, 249, 0.21)');
				}
				for (let i = 0; i < tdLength; i++) {
					td[i].setAttribute('style', 'background: rgba(15, 151, 249, 0.21)');
				}
				break;
			case "out":
				for (let i = 0; i < thLength; i++) {
					if (th[i].hasAttribute('style')) {
						th[i].removeAttribute('style');
					}
				}
				for (let i = 0; i < trLength; i++) {
					if (tr[i].hasAttribute('style')) {
						tr[i].removeAttribute('style');
					}
				}
				for (let i = 0; i < tdLength; i++) {
					if (td[i].hasAttribute('style')) {
						td[i].removeAttribute('style');
					}
				}
				break;
			case "sort":
				let tds = table.getElementsByClassName(tdClass),
					column = [],
					val = [],
					isNum = false,
					obj = cet.defaultConfig,
					tdsLength = tds.length;

				if (!String.prototype.isNumeric) {
					String.prototype.isNumeric = function() {
						return !isNaN(parseFloat(this));
					};
				}

				for (let i = 0; i < tdsLength; i++) {
					isNum = tds[i].childNodes[0].value.isNumeric();

					column.push({
						"tr": tds[i].parentNode,
						"value": tds[i].childNodes[0].value
					});
					val.push(tds[i].childNodes[0].value);
				}

				if (status === "down") {
					if (isNum) val.sort((a, b) => a - b);
					else val.reverse();

					obj.printNewBody(val, column, table);
				} else {
					if (isNum) val.sort((a, b) => b - a);
					else val.sort();

					obj.printNewBody(val, column, table);
				}

				// hover & mouse out
				let inputs = table.getElementsByTagName('input'),
					spans = table.getElementsByTagName('span'),
					inputsLength = inputs.length,
					spansLength = spans.length;
				// inputs events
				for (let i = 0; i < inputsLength; i++) {
					// change
					inputs[i].parentNode.onchange = () => {
						obj.inputChange(inputs[i]);
					};
					if (obj.effects) {
						// hover
						inputs[i].onmouseover = () => obj.mouseEffects(inputs[i], 'hover');
						inputs[i].parentNode.onmouseover = () => obj.mouseEffects(inputs[i], 'hover');

						// out
						inputs[i].parentNode.onmouseout = () => obj.mouseEffects(inputs[i], 'out');
					}
				}
				// spans events
				for (let i = 0; i < spansLength; i++) {
					if (obj.effects) {
						// hover
						spans[i].onmouseover = () => obj.mouseEffects(spans[i], 'hover');
						spans[i].parentNode.onmouseover = () => obj.mouseEffects(spans[i], 'hover');

						// out
						spans[i].parentNode.onmouseout = () => obj.mouseEffects(spans[i], 'out');
					}
				}
				// datepicker
				if (obj.materialize) $('.datepicker').pickadate();

				break;
		}
	};
})(CET || {});
