angular.module("manageLiteApp", [ 'ui.router', 'ui.bootstrap', 'restangular', 'ngAnimate', 'toaster', 'angularSpinner', 'ui.router.tabs', angularDragula(angular) ]);

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
                abstract : true,
                templateUrl : "app/views/projects.html"
            }).state('projects.list', {
                url : "",
                templateUrl : "app/views/listProjects.html"
            }).state('projects.edit', {
                url : "/:projectId/edit",
                templateUrl : "app/views/editProject.html",
                params: {
                    projectId: {squash: true, value: null}
                }
            }).state('projects.backlog', {
                url : "/:projectId/backlog",
                templateUrl : "app/views/backlog.html",
                params : { sprints: null, projectName: null }
            }).state('sprint', {
                url : "/projects/:projectId/sprints/:sprintId",
                templateUrl : "app/views/viewSprint.html",
                params : { projectName: null, sprintName: null }
            }).state('sprint.board', {
                url : "/board",
                templateUrl : "app/views/sprintBoard.html"
            }).state('sprint.status', {
                url : "/status",
                templateUrl : "app/views/sprintStatus.html"
            }).state('projects.backlog-item-edit', {
                url : "/:projectId/backlog/:storyId/edit",
                templateUrl : "app/views/editStory.html"
            }).state('collaborators', {
                url : "/collaborators",
                abstract : true,
                templateUrl : "app/views/collaborators.html"
            }).state('collaborators.list', {
                url : "",
                templateUrl : "app/views/listCollaborators.html"
            }).state('collaborators.edit', {
                url : "/:collaboratorId/edit",
                templateUrl : "app/views/editCollaborator.html",
                params: {
                    collaboratorId: {squash: true, value: null}
                }
            }).state('roles', {
                url : "/roles",
                abstract : true,
                templateUrl : "app/views/roles.html"
            }).state('roles.list', {
                url : "",
                templateUrl : "app/views/listRoles.html"
            }).state('roles.edit', {
                url : "/:roleId/edit",
                templateUrl : "app/views/editRole.html",
                params: {
                    roleId: {squash: true, value: null}
                }
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
            });
            
            // add a response interceptor
            /*RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
              var extractedData;
              // .. to look for getList operations
              if (operation === "getList") {
                // .. and handle the data and meta data
                extractedData = data.data || data;
                //extractedData.meta = data.data.meta;
              } else {
                extractedData = data.data || data;
              }
              return extractedData;
            });*/
            
            $httpProvider.interceptors.push('httpInterceptor');
            
            usSpinnerConfigProvider.setTheme('flatly', {color: '#000'});
            usSpinnerConfigProvider.setTheme('darkly', {color: '#fff'});
        } ]);

angular.module("manageLiteApp").directive('bindEnterEsc', function ($timeout) {
    return function (scope, element, attrs) {
        element.bind("keydown", function (event) {
            if (event.which === 13 && attrs.bindEnter) { // 13 = enter key
                $timeout(function() {
                    scope.$eval(attrs.bindEnter);
                    event.preventDefault();
                });
            }
            else if(event.which === 27 && attrs.bindEsc) { // 27 = esc key
                $timeout(function() {
                    scope.$eval(attrs.bindEsc);
                    event.preventDefault();
                });
            }
        });
    };
});

/*angular.module("manageLiteApp").directive('bindEsc', function () {
    return function (scope, element, attrs) {
        element.bind("keypress", function (event) {
            if(event.which === 27) { // 27 = esc key
                //scope.$apply(function (){
                    scope.$eval(attrs.bindEsc);
                //});

                event.preventDefault();
            }
        });
    };
});*/

angular.module("manageLiteApp").directive('focus', [ '$timeout', function($timeout) {
    return {
        restrict : 'A',

        link : function(scope, element, attrs) {
            $timeout(function() {
                element[0].focus();
            });
        }
    };
} ]);