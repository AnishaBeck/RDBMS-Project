angular.module('myapp', [])
    .controller('ctrldetails', function ($scope, $http) {
        $http.get('http://localhost:7500/getjson')
            .success(function (response) {
                $scope.table = response;
            })

        $scope.delete = function (deletingId, index) {
            $http.get("http://localhost:7500/del/" + deletingId)
                .success(function (data) {
                    $http.get('http://localhost:7500/getjson')
                        .success(function (response) {
                            $scope.table = response;
                        })
                })
        }


        $scope.edit = function (editId, index) {

            let title = prompt("Please re-enter the title");
            if(title!=null)
            {
                $http.get("http://localhost:7500/edit/" + editId+"/"+title)
                .success(function (data) {
                    $http.get('http://localhost:7500/getjson')
                        .success(function (response) {
                            $scope.table = response;
                        })
                })
            }
            
        }
    })