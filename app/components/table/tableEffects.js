function tableEffects(trClass, tdClass, eventName, table, status) {
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
                newColumn = [],
                num = /^\d+$/,
                isNumeric = false;

            function printNewBody(val, column) {
                var tableBody = table.childNodes[1],
                    i = 0;

                $(tableBody).empty();

                for (i; i < val.length; i++) {
                    for (var j = 0; j < column.length; j++) {
                        if (val[i] === column[j].value) {
                            newColumn.push(column[j].tr);
                        }
                    }
                }

                $(tableBody).append(newColumn);
            }

            for (i; i < tds.length; i++) {
                isNumeric = !!num.test(tds[i].childNodes[0].value);

                column.push({
                   "tr":  tds[i].parentNode,
                    "value": tds[i].childNodes[0].value
                });
                val.push(tds[i].childNodes[0].value);
                console.log(val);
            }

            if (status === "down") {
                if (isNumeric) {
                    val.sort(function(a, b){return a-b});
                } else {
                    val.sort();
                }
                console.log(val);
                printNewBody(val, column);
            } else {
                if (isNumeric) {
                    val.sort(function(a, b){return b-a});
                } else {
                    val.reverse();
                }
                console.log(val);
                printNewBody(val, column);
            }
            break;
    }
}