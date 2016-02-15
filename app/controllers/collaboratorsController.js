function collaboratorsController($scope, collaboratorService) {
    var ctrl = this;
    ctrl.collaborators = [];

    ctrl.getCollaborators = function() {
        collaboratorService.getCollaborators().then(function(response) {
            ctrl.collaborators = response;
        }, function(error) {
            ctrl.handleError(error);
        });
    }
    
    ctrl.activate = function() {
        // Load Collaborators
        ctrl.getCollaborators();
    }();
}

collaboratorsController.$inject = ['$scope', 'collaboratorService'];

angular.module('manageLiteApp').controller('collaboratorsController', collaboratorsController);