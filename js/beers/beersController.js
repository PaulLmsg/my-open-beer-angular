module.exports=function($scope,rest,$timeout,$location,config,$route,save,$log) {
	$scope.data={load:false};
	
	$scope.parBrasserie = false;
	
	$scope.sortBy={field:"name",asc:false};
	
	$scope.messages=rest.messages;
	
	$scope.afficher = new Array();
	$scope.afficher['name'] = true;
	$scope.afficher['description'] = true;
	$scope.afficher['abv'] = true;
	$scope.afficher['photo'] = true;
	$scope.afficher['idBrewery'] = true;
	$scope.afficherFormChoixColonnes = false;
	
	if(config.beers.connected==="yes" || !config.beers.loaded){
		$scope.data.load=true;
		rest.getAll($scope.data,"beers");
		config.beers.loaded=true;
	}else{
		$scope.data["beers"]=config.beers.all;
	}
	
	/*On a besoin des brasseries*/
	
	if(config.breweries.connected==="yes" || !config.breweries.loaded){
		$scope.data.load=true;
		rest.getAll($scope.data,"breweries");
		config.breweries.loaded=true;
	} else {
		$scope.data["breweries"]=config.breweries.all;
	}
	
	if (config.activeBrewery !== undefined){
		$scope.activeBrewery = config.activeBrewery;
		$scope.parBrasserie = true;
		$scope.data["bieresParBrasseries"] = new Array();
		$log.info($scope.activeBrewery.id + "lolII");
		if($scope.data["beers"] !== undefined){
			//C'est cette boucle qu'il ne passe pas, d'où le non affichage des bières par brasserie si l'on vient de l'affichage d'une brasserie
			$log.info($scope.activeBrewery.id + "lol");
			for(var i = 0; i<$scope.data["beers"].length; i++){
				if ($scope.data["beers"][i].idBrewery == $scope.activeBrewery.id){
					if (!($scope.data["beers"][i].idBrewery in $scope.data["bieresParBrasseries"]))
						$scope.data["bieresParBrasseries"][$scope.data["beers"][i].idBrewery] = new Array();	
					$scope.data["bieresParBrasseries"][$scope.data["beers"][i].idBrewery].push($scope.data["beers"][i]);
				}
			}
		}
		config.activeBrewery = undefined;
	}
	
	$scope.modifAfficher = function(){
		if ($scope.afficherFormChoixColonnes){
			$scope.afficherFormChoixColonnes = false;
		} else {
			$scope.afficherFormChoixColonnes = true;
		}
	}
	
	$scope.modifGrouperPar = function(){
		if ($scope.parBrasserie){
			$scope.parBrasserie = false;
		} else {
			$scope.parBrasserie = true;
			$scope.data["bieresParBrasseries"] = new Array();
			if($scope.data["beers"] !== undefined)
			for(var i = 0; i<$scope.data["beers"].length; i++){
				if (!($scope.data["beers"][i].idBrewery in $scope.data["bieresParBrasseries"]))
					$scope.data["bieresParBrasseries"][$scope.data["beers"][i].idBrewery] = new Array();
				$scope.data["bieresParBrasseries"][$scope.data["beers"][i].idBrewery].push($scope.data["beers"][i]);
			}
			$log.info($scope.data["bieresParBrasseries"]);
				
		}
	}

	$scope.allSelected=false;
	
	$scope.selectAll=function(){
		angular.forEach($scope.data.beers, function(value, key) {
			value.selected=$scope.allSelected;
		});
	};
	
	$scope.getNameBrewery = function(id){
		if($scope.data["breweries"] !== undefined)
		for(i=0;i<$scope.data["breweries"].length;i++){
			if($scope.data["breweries"][i].id == id)
				return $scope.data["breweries"][i].name;
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
		$scope.activeBrewery = $scope.getBrewery($scope.activeBeer.idBrewery);
		config.activeBrewery=angular.copy($scope.activeBrewery);
		config.activeBrewery.reference=$scope.activeBrewery;
		$location.path("beers/show");
	}
	
	$scope.getBrewery = function(id){
		if($scope.data["breweries"] !== undefined)
		for(i=0;i<$scope.data["breweries"].length;i++){
			if($scope.data["breweries"][i].id == id)
				return $scope.data["breweries"][i];
		}
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