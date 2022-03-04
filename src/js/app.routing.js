app.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'app/Home/home.html',
        controller: 'HomeController'
    }).otherwise({
        redirectTo: "/"
    });
});