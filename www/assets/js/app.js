'use strict';
var app = angular.module('80consult', ['angular-storage']);
<<<<<<< Upstream, based on branch 'master' of https://github.com/amolc/suzantravels.git
if (document.location.hostname == "www.suzantravels.com")
=======
if (document.location.hostname == "suzantravels.80startups.com")
>>>>>>> 9ab427c changes in apis
{
<<<<<<< Upstream, based on branch 'master' of https://github.com/amolc/suzantravels.git
=======
  var baseurl = "https://www.suzantravels.com/api/";

}
else if (document.location.hostname == "www.suzantravels.80startups.com")
{
  var baseurl = "https://www.suzantravels.com/api/";

}else if (document.location.hostname == "www.suzantravels.com")
{
  var baseurl = "https://www.suzantravels.com/api/"; 

}else if (document.location.hostname == "suzantravels.com")
{
>>>>>>> 9ab427c changes in apis
  var baseurl = "https://www.suzantravels.com/api/"; 

}else{

  var baseurl = "http://localhost:6010/api/";
}

app.config(['storeProvider', function (storeProvider) {
  storeProvider.setStore('sessionStorage');
}]);
