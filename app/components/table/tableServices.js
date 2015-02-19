/**
 * get local data
 * @param cet
 */

function getLocalData (cet) {
    if (cet !== undefined) {
        if (localStorage.getItem("_tableData")) {

            cet.tableData = JSON.parse(localStorage.getItem("_tableData"));
            cet.tableConstructor(cet);

        } else {
            $.ajax({
                url: cet.localDataUrl,
                method: 'GET',
                dataType: 'json',
                success: function (response) {
                    if (response !== undefined) {
                        cet.tableData = response;
                        cet.tableConstructor(cet);
                    }
                },
                error: function () {
                    throw new Error("Could not load the data inside the " + cet.localDataUrl + " file");
                }
            });
        }
    }
}

/**
 * get firebase data
 * @param cet
 */

function fireBaseData (cet) {
    if (cet !== undefined) {
        var myFirebaseRef = new Firebase(cet.fireBaseUrl);

        myFirebaseRef.on("value", function(response) {
            cet.tableData = response.val();
            cet.tableConstructor(cet);
        }, function (errorObject) {
            throw new Error("The read failed: " + errorObject.code);
        });
    }

}

// TODO: get api rest data
function apiRestData (url) {


}