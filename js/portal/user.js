requirejs.config({
    "paths": {
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min"
    }
});
define(["require", "jquery"], function (require, jquery) {

    return {
        user: function (portal, username, token) {
            // 
            return jquery.ajax({
                type: "GET",
                url: portal + "sharing/rest/community/users/" + username + "?",
                data: {
                    token: token,
                    f: "json"
                },
                dataType: "json"
            });
        },
        content: function (portal, username, folder, token) {
            // 
            return jquery.ajax({
                type: "GET",
                url: portal + "sharing/rest/content/users/" + username + "/" + folder + "?",
                data: {
                    token: token,
                    f: "json"
                },
                dataType: "json"
            });
        }
    };
});