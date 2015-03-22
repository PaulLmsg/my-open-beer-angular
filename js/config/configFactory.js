module.exports=function() {
	var factory={breweries:{},beers:{},server:{}};
	
	//Reglages pour les brasseries
	factory.activeBrewery=undefined;
	factory.breweries.loaded=false;
	factory.breweries.connected="no"; //yes|no
	
	//Reglages pour les bières
	factory.activeBeer=undefined;
	factory.beers.loaded=false;
	factory.beers.connected="yes"; //yes|no
	
	//Reglages de connexion
	factory.server.privateToken="";
	factory.server.restServerUrl="http://127.0.0.1/rest-open-beer-master/";
	factory.server.force=true;
	
	return factory;
};