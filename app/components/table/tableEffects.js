((cet) => {

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
            th = document.getElementsByClassName(thClass);

        switch (eventName) {
            case "hover":
                for (let i = 0; i < th.length; i++) {
                    th[i].setAttribute('style', 'background: rgb(15, 151, 249); color: white');
                }
                for (let i = 0; i < tr.length; i++) {
                    tr[i].setAttribute('style', 'background: rgba(15, 151, 249, 0.21)');
                }
                for (let i = 0; i < td.length; i++) {
                    td[i].setAttribute('style', 'background: rgba(15, 151, 249, 0.21)');
                }
                break;
            case "out":
                for (let i = 0; i < th.length; i++) {
                    if (th[i].hasAttribute('style')) {
                        th[i].removeAttribute('style');
                    }
                }
                for (let i = 0; i < tr.length; i++) {
                    if (tr[i].hasAttribute('style')) {
                        tr[i].removeAttribute('style');
                    }
                }
                for (let i = 0; i < td.length; i++) {
                    if (td[i].hasAttribute('style')) {
                        td[i].removeAttribute('style');
                    }
                }
                break;
            case "sort":
                let tds = table.getElementsByClassName(tdClass),
                    column = [],
                    val = [],
                    isNumeric = false,
                    obj = CET || CET.defaultConfig;
                const num = /^\d+$/;

                for (let i = 0; i < tds.length; i++) {
                    isNumeric = !!num.test(tds[i].childNodes[0].value);

                    column.push({
                        "tr": tds[i].parentNode,
                        "value": tds[i].childNodes[0].value
                    });
                    val.push(tds[i].childNodes[0].value);
                }

                if (status === "down") {
                    if (isNumeric) val.sort((a, b) => a - b);
                    else val.reverse();

                    obj.printNewBody(val, column, table);
                } else {
                    if (isNumeric) val.sort((a, b) => b - a);
                    else val.sort();

                    obj.printNewBody(val, column, table);
                }

                // hover & mouse out
                let inputs = table.getElementsByTagName('input'),
                    spans = table.getElementsByTagName('span');
                // inputs events
                for (let i = 0; i < inputs.length; i++) {
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
                for (let i = 0; i < spans.length; i++) {
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