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
                _cetTable.printNewBody(val, column, table);
            } else {
                if (isNumeric) {
                    val.sort(function(a, b){return b-a});
                } else {
                    val.sort();
                }
                _cetTable.printNewBody(val, column, table);
            }

            // hover & mouse out
            var inputs = table.getElementsByTagName('input');
            //  change
            $(inputs).change(function () {
                _cetTable.inputChange(this);
            });
            // hover
            $(inputs).hover(function () {
                _cetTable.mouseEffects(this, "hover");
            });
            // mouse out
            $(inputs).mouseout(function (){
                _cetTable.mouseEffects(this, "out");
            });

            // datepicker
            $('.datepicker').pickadate();

            break;
    }
}