function tableEffects(trClass, tdClass, eventName, table, status, thisHolder) {
    var tr = $("."+trClass),
        td = $("."+tdClass),
        char = tdClass.slice(-1),
        th = $(".th"+char);

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
                i = 0,
                column = [],
                val = [],
                num = /^\d+$/,
                isNumeric = false;

            for (i; i < tds.length; i++) {
                isNumeric = !!num.test(tds[i].childNodes[0].value);

                column.push({
                   "tr":  tds[i].parentNode,
                    "value": tds[i].childNodes[0].value
                });
                val.push(tds[i].childNodes[0].value);
            }

            if (status === "down") {
                if (isNumeric) {
                    val.sort(function(a, b){return a-b});
                } else {
                    val.reverse();
                }
                thisHolder.printNewBody(val, column, table);
            } else {
                if (isNumeric) {
                    val.sort(function(a, b){return b-a});
                } else {
                    val.sort();
                }
                thisHolder.printNewBody(val, column, table);
            }
            break;
    }
}