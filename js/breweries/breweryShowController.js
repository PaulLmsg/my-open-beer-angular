module.exports=function($scope,config,$location,rest,save,$document,modalService, $controller){
	$controller('BreweryAddController', {$scope: $scope});

	if(angular.isUndefined(config.activeBrewery)){
		$location.path("breweries/");
	}
	$scope.activeBrewery=config.activeBrewery;
};