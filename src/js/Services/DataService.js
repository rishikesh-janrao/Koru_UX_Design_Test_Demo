app.factory("DataService", function ($http) {
    var data = {}
  
    return {
      load: async function (path) {
        return $http.get(path);
      },
      get: function () {
        return data;
      },
      set: function (dt) {
        data = dt;
      },
      insert: function (alert) {
        var chunk;
        chunk = angular.copy(alert, chunk);
        chunk.id = data[data.length - 1].id++;
        return data.push(chunk);
      },
      delete: function (id) {
        var index = data.findIndex(function (o) {
          return o.id == id;
        })
        if (index !== -1) data.splice(index, 1);
        return data[data.findIndex(function (o) {
          return o.id == id;
        })];
      }
    }
  });