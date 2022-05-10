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
            if (name != null && workflow_id != null) {
                $http.get("http://localhost:7500/editact/" + editId + "/" + name + "/" + workflow_id)
                    .success(function (data) {
                        $http.get('http://localhost:7500/view')
                            .success(function (response) {
                                $scope.data = response;
                            })
                    })
            }
        }

        $scope.status = function (id, stat) {
            //alert("clicked")    
            $http.get("http://localhost:7500/completeact/" + id + '/' + stat)
                .success(function (data) {
                    $http.get('http://localhost:7500/view')
                    .success(function (response) {
                         $scope.data = response;
                         var count = 0;
                         for (var i = 0; i < $scope.data.length; i++) {
                             if ($scope.data[i].status == 1)
                                 count++;
                             //console.log(count)
                         }
                         var percentage=0;
                         if($scope.data.length>0)
                         {
                              percentage = (count * 100) / $scope.data.length;
                              $http.get('http://localhost:7500/updatepercentage/' + percentage)
                             .success(function (data) {
                                 alert("success")
                             })
                         }
                    })
                })
        }
    })