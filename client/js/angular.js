var myapp = angular.module('hdfcRed', ['ui.router', 'ngMessages']);
myapp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/main");
  $stateProvider
    .state('main', {
      url: "/main",
      templateUrl: "partials/main.html"
    })
    .state('result', {
      url: "/result",
      templateUrl: "partials/result.html"
    })
});

myapp.directive("amount", function () {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function (scope, element, attributes, ngModel) {
            ngModel.$validators.amount = function (modelValue) {
                if (modelValue > 10000) {
                    // console.log("true")
                    return true;
                }
                else return false;
            };
        }
    };
});

myapp.directive("tenure", function () {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function (scope, element, attributes, ngModel) {
            ngModel.$validators.tenure = function (modelValue) {
                if (modelValue > 2 && modelValue < 21) {
                    // console.log("true")
                    return true;
                }
                else return false;
            };
        }
    };
});

myapp.factory('mainFactory', function() {
        var factory = {};
        factory.calculate = function(info, callback) {
            var R = 9.9/(12 * 100);
            var P = info.amount;
            var N = info.tenure * 12;
            var minusN = N-1;
            var plusR = 1 + R;
            var plusRn = Math.pow(plusR, N);
            var step1 = P * R * plusRn;
            var step2 = plusRn - 1;
            var result = step1/step2
            var emi = parseFloat(Math.round(result * 100) / 100).toFixed(3);
            // console.log(emi);
            callback(emi);
        }
        return factory;
    });

myapp.controller('mainController', function($scope, mainFactory, $rootScope) {
        $scope.calculate = function(){
            var data_repack = {
                amount: $scope.calc.amount,
                tenure: $scope.calc.tenure
            }
            mainFactory.calculate(data_repack, function (data){
                console.log(data);
                $rootScope.emi = data;
            })
        }
})