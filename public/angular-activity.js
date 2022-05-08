angular.module('app', [])
    .controller('details', function ($scope, $http) {
        $http.get('http://localhost:7500/view')
            .success(function (response) {
                $scope.data = response;
                
            })
            $scope.delete = function (deletingId) {
                $http.get("http://localhost:7500/delact/" + deletingId)
                    .success(function (data) {
                        $http.get('http://localhost:7500/view')
                            .success(function (response) {
                                $scope.data = response;
                            })
                    })
            }
    
    
            $scope.edit = function (editId) {
    
                let name = prompt("Please re-enter the name:");
                let workflow_id = prompt("Please re-enter the workflow id:");
                if(name!=null && workflow_id!=null)
                {
                    $http.get("http://localhost:7500/editact/" + editId+"/"+name+"/"+workflow_id)
                    .success(function (data) 
                    {
                        $http.get('http://localhost:7500/view')
                        .success(function (response) 
                        {
                            $scope.data = response;
                        })
                    })
                }
            }
        })