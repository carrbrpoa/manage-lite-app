function editCollaboratorController($scope, $stateParams, $state, $controller, toaster, collaboratorService, roleService) {
    var inherited = $controller('parentController', {$state: $state, toaster: toaster});
    angular.extend(this, inherited);
    
    var ctrl = this;
    
    ctrl.title = 'New Collaborator';
    ctrl.collaborator = { enabled: true };
    
    ctrl.submit = function() {
        collaboratorService.saveCollaborator(ctrl.collaborator).then(function(savedObject) {
            if (savedObject) {
                toaster.pop('success', 'Success', 'Save successful');
                ctrl.initializeCollaborator(savedObject);
                $state.transitionTo('collaborators.edit', {collaboratorId: savedObject.id}, { location: true, inherit: true, relative: $state.$current, notify: false });
            }
        }, function(error) {
            ctrl.handleError(error);
        });
    };
    
    ctrl.setCollaboratorTitle = function() {
        ctrl.title = !ctrl.isNewEntity(ctrl.collaborator) ? ('Edit Collaborator ' + (ctrl.collaborator.name || ctrl.collaborator.username)) : ctrl.title; 
    };
    
    ctrl.initializeCollaborator = function(collaborator) {
        ctrl.collaborator = collaborator;
        ctrl.editStamp(ctrl.collaborator);
        ctrl.setCollaboratorTitle();
    };
    
    ctrl.getRoles = function() {
        var query = ctrl.isNewEntity(ctrl.collaborator) ? { enabled: true } : undefined;
        roleService.getRoles(query).then(function(response) {
            ctrl.roles = response;
        }, function(error) {
            ctrl.handleError(error);
        });
    };
    
    ctrl.activate = function() {
        if ($stateParams.collaboratorId) {
            collaboratorService.getCollaborator($stateParams.collaboratorId).then(function(collaborator) {
                ctrl.initializeCollaborator(collaborator);
                ctrl.getRoles();
            }, function(error) {
                ctrl.handleError(error, 'collaborators.list');
            });
        }
        else {
            ctrl.getRoles();
        }
    }();
};

editCollaboratorController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'toaster', 'collaboratorService', 'roleService'];

angular.module('manageLiteApp').controller('editCollaboratorController', editCollaboratorController);