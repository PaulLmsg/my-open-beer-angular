module.exports=function($scope,config,$location,rest,save,$document,modalService, $controller){
	
	if(angular.isUndefined(config.activeBeer)){
		$location.path("beers/");
	}
	$scope.activeBeer=config.activeBeer;
	
	$scope._update=function(beer,force,callback){
		var result=false;
		if($scope.frmBeer.$dirty){
			if(angular.isUndefined(beer)){
				beer=$scope.activeBeer;
			}else{
				config.activeBeer=angular.copy(beer);
				config.activeBeer.reference=beer;
			}
			$scope.data.posted={ "beer" : {
			    "name" : beer.name,
			    "description"  : beer.description,
			    "abv"  : beer.abv,
			    "photo"  : beer.photo,
			    "idBrewery"  : beer.idBrewery
			  }
			};
			
			if (!config.breweries.loaded){
				rest.getAll($scope.data,"breweries");
				config.breweries.loaded=true;
				$scope.brasseries = $scope.data["breweries"];
			} else {
				$scope.data["breweries"]=config.breweries.all;
				$scope.brasseries = $scope.data["breweries"];
			}
			
			config.activeBeer.reference.name=$scope.activeBeer.name;
			config.activeBeer.reference.url=$scope.activeBeer.url;
			config.activeBeer.reference.updated_at=new Date();
			
		}else{
			result=true;
		}
		return result;
	}
};