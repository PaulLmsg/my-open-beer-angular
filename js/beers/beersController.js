module.exports=function($scope,rest,$timeout,$location,config,$route,save) {
	$scope.data={load:false};
	
	$scope.parBrasserie = false;
	
	$scope.modifGrouperPar = function(){
		if ($scope.parBrasserie){
			$scope.parBrasserie = false;
		} else {
			$scope.parBrasserie = true;
			$scope.data["bieresParBrasseries"] = new Array();
			for(var i = 0; i<$scope.data["beers"].length; i++){
				if (!($scope.data["beers"][i].idBrewery in $scope.data["bieresParBrasseries"]))
					$scope.data["bieresParBrasseries"][$scope.brasseries[i].idBrewery] = new Array();
				$scope.data["bieresParBrasseries"][$scope.brasseries[i].idBrewery].push($scope.data["beers"][i]);
			}
				
		}
	}

	$scope.sortBy={field:"name",asc:false};
	
	$scope.messages=rest.messages;
	
	if (!config.breweries.loaded){
		rest.getAll($scope.data,"breweries");
		config.breweries.loaded=true;
		$scope.brasseries = $scope.data["breweries"];
	} else {
		//$scope.data["breweries"]=config.breweries.all;
		$scope.brasseries = config.breweries.all;
	}
	
	if(config.beers.connected==="yes" || !config.beers.loaded){
		$scope.data.load=true;
		rest.getAll($scope.data,"beers");
		config.beers.loaded=true;
	}else{
		$scope.data["beers"]=config.beers.all;
	}
	$scope.allSelected=false;
	
	$scope.selectAll=function(){
		angular.forEach($scope.data.beers, function(value, key) {
			value.selected=$scope.allSelected;
		});
	};
	
	$scope.getNameBrewery = function(id){
		for(i=0;i<config.breweries.all.length;i++){
			if(config.breweries.all[i].id == id)
				return config.breweries.all[i].name;
		}
	}
	
	$scope.refresh=function(){
		save.executeAll();
	}
	
	$scope.showUpdate=function(){
		return angular.isDefined($scope.activeBeer);
	};
	
	$scope.showShow=function(){
		return angular.isDefined($scope.activeBeer);
	};
	
	$scope.refreshOnAsk=function(){
		return config.beers.connected == 'no';
	};
	
	$scope.defferedUpdate=function(){
		return config.beers.connected == 'no';
	};
	
	$scope.setActive=function(beer){
		if(beer!==$scope.activeBeer)
			$scope.activeBeer=beer;
		else
			$scope.activeBeer=undefined;
	};
	
	$scope.isActive=function(beer){
		return beer==$scope.activeBeer;
	};
	
	$scope.hasMessage=function(){
		return rest.messages.length>0;
	};
	
	$scope.readMessage=function(message){
		$timeout(function(){
			message.deleted=true;
		},5000);
		return true;
	}
	
	$scope.countSelected=function(){
		var result=0;
		angular.forEach($scope.data.beers, function(value, key) {
			if(value.selected && !value.deleted)
				result++;
		});
		return result;
	};
	
	$scope.hideDeleted=function(){
		$scope.mustHideDeleted=!$scope.mustHideDeleted;
		angular.forEach($scope.data.beers, function(value, key) {
			if($scope.mustHideDeleted){
				if(value.flag==='Deleted')
					value.deleted=true;
			}else{
				value.deleted=false;
			}
		});
	};
	
	$scope.edit=function(beer){
		if(angular.isDefined(beer))
			$scope.activeBeer=beer;
		config.activeBeer=angular.copy($scope.activeBeer);
		config.activeBeer.reference=$scope.activeBeer;
		$location.path("beers/update");
	}
	
	$scope.show=function(beer){
		if(angular.isDefined(beer))
			$scope.activeBeer=beer;
		config.activeBeer=angular.copy($scope.activeBeer);
		config.activeBeer.reference=$scope.activeBeer;
		$location.path("beers/show");
	}
	
	$scope.update=function(beer,force,callback){
		if(angular.isUndefined(beer)){
			beer=$scope.activeBeer;
		}
		$scope.data.posted={ "beer" : {
		    "name" : beer.name,
		    "description"  : beer.description,
		    "abv"  : beer.abv,
		    "photo"  : beer.photo,
		    "idBrewery"  : beer.idBrewery
		  }
		};
		$scope.data.beers.push(beer);
		beer.created_at=new Date();
			if(config.beers.connected==="yes" || force){
				rest.post($scope.data,"beers",beer.name,callback);
			}else{
				save.addOperation("New",$scope.update,beer);
				$location.path("beers");
			}
	}
	
	$scope.remove=function(){
		angular.forEach($scope.data.beers, function(value, key) {
			if(value.selected){
				$scope.removeOne(value);
			}
		});
		return true;
	};
	$scope.removeOne=function(beer,force,callback){
		if(config.beers.connected==="yes" || force){
			beer.deleted=true;
			rest.remove(beer,"beers",callback);
		}else{
			save.addOperation("Deleted",$scope.removeOne,beer);
			beer.deleted=$scope.hideDeleted;
		}
	}
};