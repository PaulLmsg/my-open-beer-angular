module.exports=function($scope,$log,rest,$location,save){
	$scope.connecte = false;
	$scope.afficherChamps = false;
	
	$scope.mail = "";
	$scope.password = "";
	
	$scope.connexion = function(){
		if ($scope.afficherChamps){
			if ($scope.identifiant != null && $scope.motDePasse != null){
				$scope.afficherChamps = false;
				$scope.mail = $scope.identifiant;
				$scope.identifiant = "";
				$scope.password = $scope.motDePasse;
				$scope.motDePasse = "";
				if ($scope.testCompte($scope.mail, $scope.password)){
					$scope.connecte = true;
					return true;
				}
				return false;
			} else {
				$scope.afficherChamps = false;
			}
			
		} else {
			$scope.afficherChamps = true;
		}
		
	}
	
	$scope.deconnexion = function(){
		$scope.connecte = false;
		
		$scope.mail = "";
		$scope.password = "";
	}
	
	$scope.testCompte = function(id, password){
		return true;
	}
	
	$scope.messageEtatConnexion = function(){
		if ($scope.connecte){
			return $scope.mail;
		} else {
			return "non connecté";
		}		
	}
};