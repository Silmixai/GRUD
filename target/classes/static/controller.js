var app = angular.module('usersList', []);


app.controller('usersCtrl', function ($scope, $http) {

    $scope.base_url = "http://localhost:8080";
    $scope.search_name = "";
    $scope.from = 0;
    $scope.step = 10;
    $scope.page = 1;

    $http.get($scope.base_url + "/users?from=" + $scope.from + "&step=" + $scope.step + "&name=" + $scope.search_name)
        .success(function (response) {
            $scope.users = response;
        });

    $scope.add = function (user) {
        $http.post($scope.base_url + "/add", user).then(function () {
            $http.get($scope.base_url + "/users?from=" + $scope.from + "&step=" + $scope.step + "&name=" + $scope.search_name)
                .success(function (response) {
                    $scope.users = response;
                });
        })
    };

    $scope.edit = function (user) {
        $scope.user1 = user;
    };

    $scope.update = function (id, user) {
        $http.put($scope.base_url + "/update/" + id, user).then(function () {
            $http.get($scope.base_url + "/users?from=" + $scope.from + "&step=" + $scope.step + "&name=" + $scope.search_name)
                .success(function (response) {
                    $scope.users = response;
                });
        })
    };

    $scope.delete = function (id) {
        $http.delete($scope.base_url + "/delete/" + id).then(function () {
            $http.get($scope.base_url + "/users?from=" + $scope.from + "&step=" + $scope.step + "&name=" + $scope.search_name)
                .success(function (response) {
                    $scope.users = response;
                });
        })
    };

    $scope.prevPage = function () {
        if ($scope.page > 1) {
            $scope.page--;
            $scope.from -= $scope.step;
            $http.get($scope.base_url + "/users?from=" + $scope.from + "&step=" + $scope.step + "&name=" + $scope.search_name)
                .success(function (response) {
                    $scope.users = response;
                });
        }
    };

    $scope.nextPage = function () {
        $http.get($scope.base_url + "/size?name=" + $scope.search_name)
            .success(function (response) {
                $scope.size = response;
                if ($scope.size > $scope.from + $scope.step) {
                    $scope.page++;
                    $scope.from += $scope.step;
                    $http.get($scope.base_url + "/users?from=" + $scope.from + "&step=" + $scope.step + "&name=" + $scope.search_name)
                        .success(function (response) {
                            $scope.users = response;
                        });
                }
            });
    };

    $scope.search = function (name) {
        $scope.search_name = name;
        $scope.page = 1;
        $scope.from = 0;
        $http.get($scope.base_url + "/users?from=" + $scope.from + "&step=" + $scope.step + "&name=" + $scope.search_name)
            .success(function (response) {
                $scope.users = response;
            });
    };

    $scope.clearsearch = function () {
        $scope.page = 1;
        $scope.from = 0;
        $scope.search_name = "";
        $http.get($scope.base_url + "/users?from=" + $scope.from + "&step=" + $scope.step + "&name=" + $scope.search_name)
            .success(function (response) {
                $scope.users = response;
            });
    };
});