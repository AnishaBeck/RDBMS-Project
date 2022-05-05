angular.module('myapp', [])
    .controller('ctrldetails', function ($scope, $http,$window) {
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

<<<<<<< HEAD
        $scope.edit = function (editId, index) {
=======

        $scope.edit = function (editId) {
>>>>>>> e0536afc6bfe2b4e816f501dda23c2ce01769476

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


        $scope.activity= function(viewid){
            $window.location.href = '/activities/'+viewid;
     }
    })