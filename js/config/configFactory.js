module.exports=function() {
	var factory={breweries:{},beers:{},server:{}};
	
	//Reglages pour les brasseries
	factory.activeBrewery=undefined;
	factory.breweries.loaded=false;
	factory.breweries.refresh="all"; //all|ask
	factory.breweries.update="immediate"; //deffered|immediate
	
	//Reglages pour les bières
	factory.activeBeer=undefined;
	factory.beers.loaded=false;
	factory.beers.refresh="all"; //all|ask
	factory.beers.update="immediate"; //deffered|immediate
	
	//Reglages de connexion
	factory.server.privateToken="";
	factory.server.restServerUrl="http://127.0.0.1/rest-open-beer-master/";
	factory.server.force=true;
	
	return factory;
};