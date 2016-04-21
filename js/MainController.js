/* 
https://br.api.pvp.net/api/lol/br/v1.4/summoner/by-name/pannh?api_key=20eee516-2bf6-46e8-995a-e19e4d8d1fab
https://br.api.pvp.net/api/lol/br/v1.4/summoner/by-name/
?api_key=20eee516-2bf6-46e8-995a-e19e4d8d1fab
*/
var app = angular.module('myApp', []);

//Service 'versionLol' injetada no controller
app.controller('myController', ['$scope','$http','versionLol', function ($scope,$http, versionLol) {

//Chamando o serviço dentro do controller
	versionLol.success(function(data) {
    $scope.version = data[0];
  });

$scope.buscaInvocador = function() { 
	//removendo espaço usando regex e deixando tudo minusculo
	var nome = $scope.nomeInvocador.replace(/\s/g, '').toLowerCase();
	
	return $http.get('https://br.api.pvp.net/api/lol/br/v1.4/summoner/by-name/' + nome + '?api_key=20eee516-2bf6-46e8-995a-e19e4d8d1fab')
			.success(function(response) {
				$scope.resposta = (response[nome]);

				console.log($scope.resposta);
			})
			 .error(function(err) { 
              return err; 
 
            });
}
  
}]);

// Service para pegar a versão do CDN DDRAGON
app.factory('versionLol', ['$http', function($http) { 
  return $http.get('https://ddragon.leagueoflegends.com/api/versions.json') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);