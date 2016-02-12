angular.module("manageLiteApp", [ 'ui.router', 'restangular', 'ngAnimate', 'toaster', 'angularSpinner' ]);

angular.module("manageLiteApp").run([ '$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    
    $rootScope.showSpinner = false;
    $rootScope.theme = 'flatly';
} ]);

angular.module("manageLiteApp").factory('httpInterceptor', [ '$rootScope', '$q', 'toaster', function($rootScope, $q, toaster) {  
    var httpInterceptor = {
        request: function(config) {
            $rootScope.showSpinner = true;
            return config;
        },
        requestError: function(response) {
            $rootScope.showSpinner = false;
            return response;
        },
        response: function(response) {
            $rootScope.showSpinner = false;
            return response;
        },
        responseError: function(response) {
            $rootScope.showSpinner = false;
            if (response.status < 0) {
                toaster.pop('error', 'Error', 'The server seems to be unavailable, please try again later');
                return response;
            }
            //return response;
            return $q.reject(response);
        }
    };
    return httpInterceptor;
}]);

angular.module("manageLiteApp").config(
        [ '$stateProvider', '$urlRouterProvider', '$httpProvider', 'RestangularProvider', 'usSpinnerConfigProvider', function($stateProvider, $urlRouterProvider, $httpProvider, RestangularProvider, usSpinnerConfigProvider) {
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
                abstract : true,
                templateUrl : "app/views/roles.html"
            }).state('roles.list', {
                url : "",
                templateUrl : "app/views/listRoles.html"
            }).state('roles.edit', {
                url : "/edit/:roleId",
                templateUrl : "app/views/editRole.html"
            }).state('settings', {
                url : "/settings",
                templateUrl : "app/views/settings.html"
            });

            RestangularProvider.setBaseUrl('http://localhost:3131');
            // RestangularProvider.setDefaultRequestParams({ apiKey:
            // '4f847ad3e4b08a2eed5f3b54' })
            /*RestangularProvider.setRestangularFields({
                id : '_id.$oid'
            });*/

            RestangularProvider.setRequestInterceptor(function(elem, operation, what) {

                if (operation === 'put') {
                    elem._id = undefined;
                    return elem;
                }
                return elem;
            })
            
            $httpProvider.interceptors.push('httpInterceptor');
            
            usSpinnerConfigProvider.setTheme('flatly', {color: '#000'});
            usSpinnerConfigProvider.setTheme('darkly', {color: '#fff'});
        } ]);