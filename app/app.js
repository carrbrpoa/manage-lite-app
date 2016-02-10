angular.module("manageLiteApp", [ 'ui.router' ]);

angular.module("manageLiteApp").config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /projects
    $urlRouterProvider.otherwise("/projects");
    // Now set up the states
    $stateProvider.state('projects', {
        url : "/projects",
        templateUrl : "app/views/projects.html"
    }).state('collaborators', {
        url : "/collaborators",
        templateUrl : "app/views/collaborators.html"
    }).state('roles', {
        url : "/roles",
        abstract: true,
        templateUrl : "app/views/roles.html"
    }).state('roles.list', {
        url : "",
        templateUrl : "app/views/listRoles.html"
    }).state('roles.edit', {
        url : "/edit",
        templateUrl : "app/views/editRole.html"
    }).state('settings', {
        url : "/settings",
        templateUrl : "app/views/settings.html"
    });
} ]);