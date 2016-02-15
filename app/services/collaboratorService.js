angular.module('manageLiteApp').factory('collaboratorService', [ 'Restangular', function(Restangular) {
    
    var baseCollaborators = Restangular.all('collaborators');
    
    var collaboratorService = {
        getCollaborators: function() {
            return baseCollaborators.getList().then(function(collaborators) {
                return collaborators;
            }, function(error) {
                return error;
            });
        },
        saveCollaborator: function(collaborator) {
            if (collaborator.id > 0) {
                return collaborator.save();
            }
            else {
                return baseCollaborators.post(collaborator);
            }
        },
        getCollaborator: function(id) {
            return baseCollaborators.get(id).then(function(collaborator) {
                return collaborator;
            }, function(error) {
                return error;
            });
        }
    }

    return collaboratorService;
} ]);