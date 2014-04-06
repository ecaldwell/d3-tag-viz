requirejs.config({
    "paths": {
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min",
        util: "./portal/util"
    }
});
define(["require", "jquery", "util"], function (require, jquery, util) {

    return {
        itemDescription: function (portal, id, token) {
            // 
            return jquery.ajax({
                type: "GET",
                url: portal + "sharing/rest/content/items/" + id + "?",
                data: {
                    token: token,
                    f: "json"
                },
                dataType: "json"
            });
        },
        itemData: function (portal, id, token) {
            // 
            return jquery.ajax({
                type: "GET",
                url: portal + "sharing/rest/content/items/" + id + "/data?",
                data: {
                    token: token,
                    f: "json"
                },
                dataType: "json"
            });
        },
        addItem: function (portal, username, folder, description, data, thumbnailUrl, token) {
            // Create a new item on the specified portal.

            // Clean up description items for posting.
            // This is necessary because some of the item descriptions (e.g. tags and extent)
            // are returned as arrays, but the post operation expects comma separated strings.
            jquery.each(description, function (item, value) {
                if (value === null) {
                    description[item] = "";
                } else if (value instanceof Array) {
                    description[item] = util.arrayToString(value);
                }
            });

            // Create a new item in a user's content.
            var params = {
                item: description.title,
                text: JSON.stringify(data), // Stringify the Javascript object so it can be properly sent.
                overwrite: false, // Prevent users from accidentally overwriting items with the same name.
                thumbnailurl: thumbnailUrl,
                f: "json",
                token: token
            };
            return jquery.ajax({
                type: "POST",
                url: portal + "sharing/rest/content/users/" + username + "/" + folder + "/addItem?",
                data: jquery.extend(description, params), // Merge the description and params JSON objects.
                dataType: "json"
            });
        },
        updateWebmapData: function (portal, username, folder, id, data, token) {
            // Update the content in a web map.
            return jquery.ajax({
                type: "POST",
                url: portal + "sharing/rest/content/users/" + username + "/" + folder + "/items/" + id + "/update?",
                data: {
                    text: JSON.stringify(data), // Stringify the Javascript object so it can be properly sent.
                    token: token,
                    f: "json"
                },
                dataType: "json"
            });
        },
        updateUrl: function (portal, username, folder, id, url, token) {
            // Update the URL of a registered service or web application.
            return $.ajax({
                type: "POST",
                url: portal + "sharing/rest/content/users/" + username + "/" + folder + "/items/" + id + "/update?",
                data: {
                    url: url,
                    token: token,
                    f: "json"
                },
                dataType: "json"
            });
        }
    };
});