angular.module('manageLiteApp').factory('roleService', [ '$http', '$q', function($http, $q) {
    
    var roleService = {

        getRoles : function() {
            var deferred = $q.defer();
            // Mock
            deferred.resolve([{id: 1, name: 'Role 1'}, {id: 2, name: 'Role 2'}]);
            
            return deferred.promise;
        }
    }

    return roleService;
} ]);