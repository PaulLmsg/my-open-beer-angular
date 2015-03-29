var appBeers=angular.module("BeersApp", []).
controller("BeersController", ["$scope","rest","$timeout","$location","config","$route","save","$log",require("./beersController")]).
controller("BeerAddController",["$scope","config","$location","rest","save","$document","modalService",require("./beerAddController")]).
controller("BeerUpdateController",["$scope","config","$location","rest","save","$document","modalService","$controller",require("./beerUpdateController")]).
controller("BeerShowController",["$scope","config","$location","rest","save","$document","modalService","$controller",require("./beerShowController")]);
module.exports=angular.module("BeersApp").name;