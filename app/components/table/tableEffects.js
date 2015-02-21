function tableEffects(trClass, tdClass, eventName, table, status) {
    var tr = $('.'+trClass),
        td = $('.'+tdClass),
        char = tdClass.slice(-1),
        th = $('.th'+char);

    switch (eventName) {
        case "hover":
            tr.attr('style', 'background: rgba(15, 151, 249, 0.21)');
            td.attr('style', 'background: rgba(15, 151, 249, 0.21)');
            th.attr('style', 'background: rgb(15, 151, 249); color: white');
            break;
        case "out":
            tr.removeAttr('style');
            td.removeAttr('style');
            th.removeAttr('style');
            break;
        case "sort":
            var tds = table.getElementsByClassName(tdClass),
                column = [],
                val = [],
                isNumeric = false;
            const num = /^\d+$/;

            for (let i = 0; i < tds.length; i++) {
                isNumeric = !!num.test(tds[i].childNodes[0].value);

                column.push({
                   "tr":  tds[i].parentNode,
                    "value": tds[i].childNodes[0].value
                });
                val.push(tds[i].childNodes[0].value);
            }

            if (status === "down") {
                if (isNumeric) {
                    val.sort((a, b) => a-b);
                } else {
                    val.reverse();
                }
                _cetTable.printNewBody(val, column, table);
            } else {
                if (isNumeric) {
                    val.sort((a, b) => b-a);
                } else {
                    val.sort();
                }
                _cetTable.printNewBody(val, column, table);
            }

            // hover & mouse out
            var inputs = table.getElementsByTagName('input'),
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

            // datepicker
            $('.datepicker').pickadate();

            break;
    }
}