(function (angular) {
    'use strict';

    angular.module('ITWeather.controllers', [])

    .controller('MainCtrl', [
        '$scope', '$ionicLoading', '$http', '$filter', '$window', '$cordovaGeolocation', '$ionicPlatform', 'AppConfig',
        function ($scope, $ionicLoading, $http, $filter, $window, $cordovaGeolocation, $ionicPlatform, AppConfig) {

            function getWeather(force) {
                $ionicLoading.show({
                    template: 'Loading...'
                });
                var posOptions = {timeout: 10000, enableHighAccuracy: $scope.acc};
                $cordovaGeolocation.getCurrentPosition(posOptions).then(function (pos) {
                    $scope.message = 'Getting coords';
                    var lat = $filter('number')(pos.coords.latitude);
                    var lon = $filter('number')(pos.coords.longitude);
                    var saved = JSON.parse($window.localStorage['weather'] || '{}');
                    var config = AppConfig.openweathermap;
                    var now = new Date().getTime();
                    if (!force && saved && saved.lat === lat && saved.lon === lon && now - saved.date < 60000) {
                        $ionicLoading.hide();
                        showWeather(saved);
                    } else {
                        $http({
                            url: config.APIURL + '?' +
                            'lat=' + lat + '&lon=' + lon +
                            '&units=' + $scope.unit.value +
                            '&APPID=' + config.APPID +
                            '',
                            method: 'GET',
                            cache: false
                        }).success(function (data) {
                            data.lat = lat;
                            data.lon = lon;
                            data.date = new Date().getTime();
                            $window.localStorage['weather'] = JSON.stringify(data);
                            $ionicLoading.hide();
                            showWeather(data);
                        }).error(function () {
                            $scope.error = 'Could not get the weather data from the service. ' +
                                'Please try again later';
                            $ionicLoading.hide();
                        });
                    }
                },
                function () {
                    $ionicLoading.hide();
                    $scope.error = 'Cannot determine your position. ' +
                        'Do you have location settings enabled? Also try changing the accuracy.';
                });
            }

            function showWeather(data) {
                var unitSign, windUnit;
                if ($scope.unit.value === 'imperial') {
                    unitSign = 'F';
                    windUnit = 'ft/s';
                } else {
                    unitSign = 'C';
                    windUnit = 'm/s';
                }
                var sunrise = new Date(data.sys.sunrise * 1000);
                var sunset = new Date(data.sys.sunset * 1000);
                sunrise = sunrise.getHours() + ':' + sunrise.getMinutes();
                sunset = sunset.getHours() + ':' + sunset.getMinutes();
                $scope.data = {
                    'city': data.name,
                    'condition': data.weather[0].main + ': ' + data.weather[0].description,
                    'temp': $filter('number')(data.main.temp, 1) + '&deg;' + unitSign,
                    'humidity': data.main.humidity,
                    'pressure': data.main.pressure,
                    'sunrise': sunrise,
                    'sunset': sunset,
                    'wind': 'speed: ' + data.wind.speed + ' ' + windUnit + ', deg: ' + data.wind.deg,
                    'lastUpdated': Math.round((new Date().getTime() - data.date) / 1000)
                };
            }

            function getUnitsSetting() {
                if ($window.localStorage['unit']) {
                    return JSON.parse($window.localStorage['unit']);
                }
                return $scope.units[0];
            }

            function setUnitsSettings(val) {
                $window.localStorage['unit'] = JSON.stringify(val);
            }

            function getAcc() {
                if ($window.localStorage['acc']) {
                    return JSON.parse($window.localStorage['acc']);
                }
                //No by default
                return $scope.accs[1];
            }

            function setAcc(val) {
                $window.localStorage['acc'] = JSON.stringify(val);
            }

            $scope.data = {
                'city': '',
                'temp': '',
                'temp_min': '',
                'temp_max': '',
                'humidity': '',
                'pressure': ''
            };

            $scope.units = [
                {name: 'Metric', value: 'metric'},
                {name: 'Imperial', value: 'imperial'}
            ];

            $scope.accs = [
                {name: 'Yes', value: true},
                {name: 'No', value: false}
            ];

            $scope.unit = getUnitsSetting();
            $scope.acc = getAcc();

            $scope.changeUnit = function () {
                setUnitsSettings($scope.unit);
                getWeather(true);
            };

            $scope.changeAcc = function () {
                setAcc($scope.acc);
                getWeather(true);
            };

            //on start of the app:
            $ionicPlatform.ready(function() {
                getWeather();
            });
            //

        }
    ]);
})(angular);
