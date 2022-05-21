angular.module('app', [])
    .controller('details', function ($scope, $http,$window) {
        $http.get('http://localhost:5000/view')
            .success(function (response) {
                $scope.dat= response;
                     var count = 0;
                     for (var i = 0; i < $scope.dat.length; i++) {
                         if ($scope.dat[i].status == 1)
                             count++;
                         //console.log(count)
                     }
                     var percentage=0;
                     if($scope.dat.length>0)
                     {
                          percentage = (count * 100) / $scope.dat.length;
                          $http.get('http://localhost:5000/updatepercentage/' + percentage)
                         .success(function (data) {
                            //  alert("success")
                         })
                     }
                     else
                     {
                        $http.get('http://localhost:5000/updatepercentage/' + percentage)
                        .success(function (data) {
                            // alert("success")
                        })
                     }
                
            $http.get('http://localhost:5000/view')
            .success(function (response) {
                $scope.data = response;
            })
            })
        $scope.delete = function (deletingId) {
            $http.get("http://localhost:5000/delact/" + deletingId)
                .success(function (data) {
                    $http.get('http://localhost:5000/view')
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
                              $http.get('http://localhost:5000/updatepercentage/' + percentage)
                             .success(function (data) {
                             })
                         }
                         else
                         {
                            $http.get('http://localhost:5000/updatepercentage/' + percentage)
                            .success(function (data) {
                            })
                         }
                        })
                    
                })
        }


        $scope.edit = function (editId) {

            let name = prompt("Please re-enter the name:");
            let workflow_id = prompt("Please re-enter the workflow id:");
            if (name != null && workflow_id != null) {
                $http.get("http://localhost:5000/editact/" + editId + "/" + name + "/" + workflow_id)
                    .success(function (data) {
                        $http.get('http://localhost:5000/view')
                            .success(function (response) {
                                $scope.data = response;
                            })
                    })
            }
        }

        $scope.status = function (id, stat) {
            //alert("clicked")    
            $http.get("http://localhost:5000/completeact/" + id + '/' + stat)
                .success(function (data) {
                    $http.get('http://localhost:5000/view')
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
                              $http.get('http://localhost:5000/updatepercentage/' + percentage)
                             .success(function (data) {
                                 alert("success")
                             })
                         }
                         else
                         {
                            $http.get('http://localhost:5000/updatepercentage/' + percentage)
                            .success(function (data) {
                                alert("success")
                            })
                         }
                    })
                })
        }
    })  