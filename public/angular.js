angular.module('myapp', [])
    .controller('ctrldetails', function ($scope, $http,$window) {
        $http.get('http://localhost:5000/getjson')
            .success(function (response) {
                $scope.table = response;
            })

        $scope.delete = function (deletingId) {
            $http.get("http://localhost:5000/del/" + deletingId)
                .success(function (data) {
                    $http.get('http://localhost:5000/getjson')
                        .success(function (response) {
                            $scope.table = response;
                        })
                })
        }


        $scope.edit = function (editId) {

            let title = prompt("Please re-enter the title");
            if(title!=null)
            {
                $http.get("http://localhost:5000/edit/" + editId+"/"+title)
                .success(function (data) {
                    $http.get('http://localhost:5000/getjson')
                        .success(function (response) {
                            $scope.table = response;
                        })
                })
            }
            else{
                alert("Title cannot be null!!");
            }
            
        }


        $scope.activity= function(viewid){
            $window.location.href = '/activities/'+viewid;
     }
    })