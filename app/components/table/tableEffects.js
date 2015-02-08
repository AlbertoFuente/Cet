function tableEffects(trClass, tdClass, event) {
    var tr = $("."+trClass),
        td = $("."+tdClass),
        char = tdClass.slice(-1),
        th = $(".th"+char);

    switch (event) {
        case "hover":
            tr.addClass('blueBackgroundAlpha');
            td.addClass('blueBackgroundAlpha');
            th.addClass('blueBackground');
            break;
        case "out":
            tr.removeClass('blueBackgroundAlpha');
            td.removeClass('blueBackgroundAlpha');
            th.removeClass('blueBackground');
            break;

    }
}

