//Define angular app
var app = angular.module('app', ['templatescache', 'ngRoute', 'ngAnimate', 'ngTouch', 'wu.masonry'])

app.run(function($http) {
	$http.defaults.headers.common;
});
//configure application routes, 
//note: this is using gulp-angular-template-cache so only template names are needed
app.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider

			.when('/', {
				templateUrl: 'home.html',
				controller: 'main-controller'
			})

			.when('/view1', {
				templateUrl: 'view1.html',
				controller: 'main-controller'
			})

			.when('/view2', {
				templateUrl: 'view2.html',
				controller: 'main-controller'
			})

			.when('/view3/:id', {
				templateUrl: 'view3.html',
				controller: 'view3-controller'
			})

			.when('/view3', {
				templateUrl: 'view3.html',
				controller: 'view3-controller'
			})

			.otherwise({
				redirectTo: '/#'
			});

		$locationProvider.html5Mode(false);
}])

//The main controller
app.controller('main-controller', function($scope, $http){

 var getBears = function(){
		$http.get('/api/bears').success(function(data){
		$scope.bears = data;
	 });
	}
	getBears();

	$scope.addBear = function(){
		var newBear = {"name":$scope.bearName, "color": $scope.bearColor, "link": $scope.bearLink};
		$http.post('/api/bears', newBear).success(function(data, status){
			console.log('successfully added '+data.name);
		}).error(function(data, status){
			console.log('error adding '+data+", "+status);
		});
	};

	$scope.updateBear = function(bear_id){
		var object = {"name": $scope.bearName, "color": $scope.bearColor, "link": $scope.bearLink};
		$http.put('/api/bears/'+bear_id, object)
			.success(function(data, status){
				console.log("updated successfully");
			})
			.error(function(data, status){
				console.log('error updating'+data+", "+status);
			});

	};

	$scope.deleteBear = function(bear_id){
		$http.delete('api/bears/'+bear_id).success(function(data, status){
				console.log('successfully deleted '+data.name, status);
			}).error(function(data, status){
				console.log('error deleting'+data.name, status)
			});

	};

	$scope.editThis = function(data){
		$scope.bearID = data.bear._id;
		$scope.bearName = data.bear.name;
		$scope.bearColor = data.bear.color;
		$scope.bearLink = data.bear.link;
	};

//end of main-ctrl
});

app.controller('view3-controller', function($scope, $routeParams){
	$scope.routeId = $routeParams.id;
})
