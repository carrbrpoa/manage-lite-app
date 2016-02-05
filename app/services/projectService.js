angular.module('manageLiteApp').factory('projectService', [ '$http', '$q', function($http, $q) {
    
    var projectService = {

        getProjects : function() {
            var deferred = $q.defer();
            //
            // Mock
            deferred.resolve([{name: 'Project 1'}, {name: 'Project 2'}, {name: 'Project 3'}]);
            
            return deferred.promise;
        }
    }

    return projectService;
} ]);