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

entries.wins / .entries.losses + .entries.wins * 100 usando math_ceil() pra aredondar pra cima

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
        var resp = $scope.resposta.id;
        
        return $http.get('https://br.api.pvp.net/api/lol/br/v2.5/league/by-summoner/' + resp + '/entry' + api_key)
      .success(function(dataC) {
        $scope.perform = dataC[resp];
        $scope.perform.tier = $scope.perform[0].tier;
        $scope.perform.division = $scope.perform[0].entries[0].division;
        $scope.perform.leaguePoints = $scope.perform[0].entries[0].leaguePoints;
        $scope.perform.wins = $scope.perform[0].entries[0].wins;
        $scope.perform.losses = $scope.perform[0].entries[0].losses;

        //funcao para calcular taxa de vitórias, ainda falta função para colocar as casas decimais exemplo 51.9
        $scope.perform.winRate =  Math.floor(($scope.perform[0].entries[0].wins / ($scope.perform[0].entries[0].wins + $scope.perform[0].entries[0].losses)) * 100);

        console.log($scope.perform.winRate);
      })
       .error(function(err) { 
              return err; 
 
            });

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