define(["jquery"], function (jquery) {

  return {
    version: function (portal) {
      // Returns the version of the portal.
      return jquery.ajax({
        type: "GET",
        url: portal + "sharing/rest?f=json",
        dataType: "json"
      });
    },
    self: function (portal, token) {
      // Return the view of the portal as seen by the current user, anonymous or logged in.
      return jquery.ajax({
        type: "GET",
        url: portal + "sharing/rest/portals/self?" + jquery.param({
          token: token,
          f: "json"
        }),
        dataType: "json"
      });
    },
    generateToken: function (portal, username, password) {
      // Generates an access token in exchange for user credentials that can be used by clients when working with the ArcGIS Portal API.
      return jquery.ajax({
        type: "POST",
        url: portal + "sharing/rest/generateToken?",
        data: {
          username: username,
          password: password,
          referer: jquery(location).attr("href"), // URL of the sending app.
          expiration: 60, // Lifetime of the token in minutes.
          f: "json"
        },
        dataType: "json"
      });
    },
    search: function (portal, query, numResults, start, sortField, sortOrder, token) {

      var total,
        nextStart = 101,
        deferred = jquery.Deferred(),
        allResults = [],
        x = 1,
        searchIt = jquery.ajax({
          type: "GET",
          url: portal + "sharing/rest/search?",
          data: {
            q: query,
            num: numResults || 100,
            start: start || 1,
            sortField: sortField || "numViews",
            sortOrder: sortOrder || "desc",
            token: token,
            f: "json"
          },
          dataType: "json"
        });

      jquery.ajax({
          type: "GET",
          url: portal + "sharing/rest/search?",
          data: {
            q: query,
            num: numResults || 100,
            start: start || 1,
            sortField: sortField || "numViews",
            sortOrder: sortOrder || "desc",
            token: token,
            f: "json"
          },
          dataType: "json"
        })
        .done(function (search) {
          allResults.push.apply(allResults, search.results);
          total = search.total;
          do {
            jquery.ajax({
                type: "GET",
                url: portal + "sharing/rest/search?",
                data: {
                  q: query,
                  num: numResults || 100,
                  start: nextStart || 1,
                  sortField: sortField || "numViews",
                  sortOrder: sortOrder || "desc",
                  token: token,
                  f: "json"
                },
                dataType: "json"
              })
              .done(function (search) {
                quickResults = search;
                allResults.push.apply(allResults, search.results);
                if (allResults.length === total) {
                  deferred.resolve(allResults);
                }
              });
            x = x + 1;
            nextStart = nextStart + 100;
          }
          while (nextStart < total);
        });

      return deferred.promise();
    }
  };
});