'use strict';

app.factory('beyondCalorieService', ['$q', '$http', function($q, $http) {
  
  var search_results = [
    {id: 1, name: "Cucumber Salad", image: "http://yummly-recipeimages-compressed.s3.amazonaws.com/Delicious-Ham-and-Potato-Soup-AllRecipes-37414-94815.s.png"},
    {id: 2, name: "Delicious Ham and Potato Soup", image: "http://yummly-recipeimages-compressed.s3.amazonaws.com/Delicious-Ham-and-Potato-Soup-AllRecipes-37414-94815.s.png"},
    {id: 3, name: "Honey-Roasted Pork", image: "http://yummly-recipeimages-compressed.s3.amazonaws.com/Honey_roasted-Pork-My-Recipes-121703.s.png"}
  ];
  var search_cache = {};  
  var last_search = { key: null, search_type: null };

  var make_search_key = function(q, type) {
    return [q, "-", type].join();  
  };

  return {

    get_factory_foods: function() {
      return search_results;
    },    

    get_last_search: function() {
      return (last_search.key == null ? 
              search_results : 
              search_cache[make_search_key(last_search.key, last_search.search_type)]);
    },

    food_search: function(q, type) {
      console.log("beyondCalorieService::search");

      var deferred_search = $q.defer(),
          search_key = make_search_key(q, type);

      if (search_cache[search_key]) {
        console.log("beyondCalorieService::search - from cache");
        deferred_search.resolve(search_cache[search_key]);  
      }
      else {

        // Save this as last search
        last_search.key = q;
        last_search.search_type = type;

        // var url = "http://localhost:3002/api/v1/search.json?search=burger&search_food=food&max_result=10"
        var base_url = "http://192.168.1.2:3002/api/v1/search.json?max_result=10", 
            url = base_url;

        // Search
        url = url + "&search=" + encodeURIComponent(q);

        if (type == "food") {
          url = url + "&search_food=food";
        }    

        $http.get(url).then(function(response){

          search_cache[search_key] = $.map(response.data, function(item) { 
                              return angular.fromJson(item) 
                            });;
          deferred_search.resolve(search_cache[search_key]);        

        }, function(error) {
          
          deferred_search.resolve([]);        

        });

      }

      return deferred_search.promise;
    }
  };

}]);

//app.service('beyondCalorieService', function ($http, $q) {
  
//  this.food_search = function(q, type) {
    
      
//  }
  // this.getAlarms = function () {
  //   console.log('beyondCalorieService getAlarms');
  //   return alarms;
  // };

  // this.addAlarm = function (d, t, m) {
  //   console.log('beyondCalorieService addAlarm')
  //   var i = alarms.length + 1;
  //   alarms.push({
  //     id: i,
  //     date: d,
  //     time:t,
  //     msg:m
  //   });
  // };

  // this.deleteAlarm = function (id) {
  //   console.log('beyondCalorieService deleteAlarm ' + id);
  //   for (var i = alarms.length - 1; i >= 0; i--) {
  //     if (alarms[i].id === id) {
  //       alarms.splice(i, 1);
  //       break;
  //     };
  //   };
  // };

  // this.getAlarm = function (id) {
  //   console.log('beyondCalorieService getAlarm ' + id);
  //   for (var i = 0; i < alarms.length; i++) {
  //     if (alarms[i].id === id) {
  //       return alarms[i];
  //     }
  //   };
  // };

  // var alarms = [
  //   { id : 0, date : '01/01/2013', time : '01:00', msg : 'Happy Birthday A'},
  //   { id : 1, date : '02/02/2013', time : '02:00', msg : 'Happy Birthday B'},
  //   { id : 2, date : '03/03/2013', time : '03:00', msg : 'Happy Birthday C'},
  //   { id : 3, date : '04/04/2013', time : '04:00', msg : 'Happy Birthday D'}
  // ];

  
//});