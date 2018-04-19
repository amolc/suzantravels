'use strict';
var app = angular.module('80consult', ['angular-storage']);
if (document.location.hostname == "www.suzantravels.com")
{
  var baseurl = "https://www.suzantravels.com/api/"; 

}else{

  var baseurl = "http://localhost:6008/api/";
}

app.config(['storeProvider', function (storeProvider) {
  storeProvider.setStore('sessionStorage');
}]);
