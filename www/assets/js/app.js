'use strict';
var app = angular.module('80consult', ['angular-storage']);
if (document.location.hostname == "bonneroutetravels.com")
{
  var baseurl = "http://bonneroutetravels.com/api/";

}
else if (document.location.hostname == "www.bonneroutetravels.com")
{
  var baseurl = "http://bonneroutetravels.com/api/";

}else{

  var baseurl = "http://localhost:6008/api/";
}

app.config(['storeProvider', function (storeProvider) {
  storeProvider.setStore('sessionStorage');
}]);
