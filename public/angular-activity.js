angular.module('app', [])
    .controller('details', function ($scope, $http) {
        $http.get('http://localhost:7500/view')
            .success(function (response) {
                $scope.data = response;
                
            })

    })