/*
{"11871399": [{
   "queue": "RANKED_SOLO_5x5",
   "name": "Vayne's Patriots",
   "entries": [{
      "leaguePoints": 44,
      "isFreshBlood": false,
      "isHotStreak": false,
      "division": "II",
      "isInactive": false,
      "isVeteran": false,
      "losses": 54,
      "playerOrTeamName": "Pannh",
      "playerOrTeamId": "11871399",
      "wins": 54
   }],
   "tier": "BRONZE"
}]}

.entries.losses + .entries.wins / entries.wins * 100 usando math_ceil() pra aredondar pra cima

entries.division
tier


https://br.api.pvp.net/api/lol/br/v2.5/league/by-summoner/
11871399
/entry
*/
//usar um servidor depois para nao expor a key
//preciso ver se precisa esconder a key no app
var api_key = "?api_key=20eee516-2bf6-46e8-995a-e19e4d8d1fab";

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
	
	return $http.get('https://br.api.pvp.net/api/lol/br/v1.4/summoner/by-name/' + nome + api_key)
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