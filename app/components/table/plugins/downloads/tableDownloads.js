/**
 * table downloads
 */

var tableDownloads = () => {
    // import table Export
    let importTbExport = document.createElement('script');
    importTbExport.src = '../../bower_components/table-export/tableExport.js';
    document.head.appendChild(importTbExport);
    // import base64
    let b64 = document.createElement('script');
    b64.src = '../../bower_components/table-export/jquery.base64.js';
    document.head.appendChild(b64);
    // html 2 canvas
    let html2Canvas = document.createElement('script');
    html2Canvas.src = '../../bower_components/table-export/html2canvas.js';
    document.head.appendChild(html2Canvas);
    // jspdf
    let jspdf = document.createElement('script');
    jspdf.src = '../../bower_components/table-export/jspdf/jspdf.js';
    document.head.appendChild(jspdf);
    // jspdf base64
    let jspdfB64 = document.createElement('script');
    jspdfB64.src = '../../bower_components/table-export/jspdf/libs/base64.js';
    document.head.appendChild(jspdfB64);
    // jspdf sprintf
    let sprintF = document.createElement('script');
    sprintF.src = '../../bower_components/table-export/jspdf/libs/sprintf.js';
    document.head.appendChild(sprintF);
};

/**
 * selected option to download
 * @param selected
 */

var selectedOption = (selected) => {
    let tableId = $('#cetTable');
    switch (selected) {
        case 'json':
            tableId.tableExport({type:selected,escape:'false'});
            break;
        case 'xml':
            tableId.tableExport({type:selected,escape:'false'});
            break;
        case 'sql':
            tableId.tableExport({type:selected});
            break;
        case 'txt':
            tableId.tableExport({type:selected,escape:'false'});
            break;
        case 'csv':
            tableId.tableExport({type:selected,escape:'false'});
            break;
        case 'xsl':
            tableId.tableExport({type:'excel',escape:'false'});
            break;
        case 'doc':
            tableId.tableExport({type:selected,escape:'false'});
            break;
        case 'ppt':
            tableId.tableExport({type:'powerpoint',escape:'false'});
            break;
        case 'png':
            tableId.tableExport({type:selected,escape:'false'});
            break;
        case 'pdf':
            tableId.tableExport({type:selected,pdfFontSize:'7',escape:'false'});
            break;
    }

};
