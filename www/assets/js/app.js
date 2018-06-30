'use strict';
var app = angular.module('80consult', ['angular-storage']);
if (document.location.hostname == "suzantravels.80startups.com")
{
  var baseurl = "https://suzantravels.80startups.com/api/";

}
else if (document.location.hostname == "www.fountaintours.com")
{
  var baseurl = "https://www.fountaintours.com/api/";

}else if (document.location.hostname == "fountaintours.com")
{
  var baseurl = "https://www.fountaintours.com/api/";

}else{

  var baseurl = "http://localhost:6010/api/";
}

app.config(['storeProvider', function (storeProvider) {
  storeProvider.setStore('sessionStorage');
}]);
