module.exports=function($scope,config,$location,rest,save,$document,modalService, $controller){
	
	if(angular.isUndefined(config.activeBeer)){
		$location.path("beers/");
	}
	
	//on ramène les objets actifs
	$scope.activeBeer=config.activeBeer;
	$scope.activeBrewery=config.activeBrewery;
	
	$scope.afficherBrasseur = function(){
		config.activeBrewery=angular.copy($scope.activeBrewery);
		config.activeBrewery.reference=$scope.activeBrewery;
		$location.path("breweries/show");
	}
};