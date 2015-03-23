module.exports=function($scope,config,$location,rest,save,$document,modalService, $controller){
	$controller('BeerAddController', {$scope: $scope});

	if(angular.isUndefined(config.activeBeer)){
		$location.path("beers/");
	}
	$scope.activeBeer=config.activeBeer;
	
	if (!config.breweries.loaded){
		rest.getAll($scope.data,"breweries");
		config.breweries.loaded=true;
		$scope.brasseries = $scope.data["breweries"];
	} else {
		//$scope.data["breweries"]=config.breweries.all;
		$scope.brasseries = config.breweries.all;
	}
	
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
			
			config.activeBeer.reference.name=$scope.activeBeer.name;
			config.activeBeer.reference.url=$scope.activeBeer.url;
			config.activeBeer.reference.updated_at=new Date();
			
			if(config.beers.connected==="yes" || force)
				rest.put(config.activeBeer.id,$scope.data,"beers",config.activeBeer.name,callback);
			else{
				config.activeBeer.reference.flag="Updated";
				save.addOperation("Updated",$scope.update,config.activeBeer.reference);
				result=true;
			}
		}else{
			result=true;
		}
		return result;
	}
};