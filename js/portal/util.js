requirejs.config({
    "paths": {
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min"
    }
});
define(["require", "jquery"], function (require, jquery) {

    return {
        arrayToString: function (array) {
            // Convert an array to a comma separated string.
            var arrayString;
            jquery.each(array, function (index, arrayValue) {
                if (index === 0) {
                    arrayString = arrayValue;
                } else if (index > 0) {
                    arrayString = arrayString + "," + arrayValue;
                }
            });
            return arrayString;
        },
        fixUrl: function (url) {
            var deferred = jquery.Deferred();
            if (portalUrl === "") {
                // Default to ArcGIS Online.
                portalUrl = "https://www.arcgis.com/";
            } else if (portalUrl.search("/home/") > 0) {
                // Strip the /home endpoint.
                portalUrl = portalUrl.substr(0, portalUrl.search("/home/")) + "/";
            } else if (portalUrl.search("/sharing/") > 0) {
                // Strip the /home endpoint.
                portalUrl = portalUrl.substr(0, portalUrl.search("/sharing/")) + "/";
            } else if (portalUrl.charAt(portalUrl.length - 1) !== "/") {
                // Add the trailing slash.
                portalUrl = portalUrl + "/";
            }
            jquery(el).val(portalUrl);
            deferred.resolve(portalUrl);
            return deferred.promise();
        }
    };
});