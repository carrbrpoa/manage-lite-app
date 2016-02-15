function rolesController($scope, roleService) {
    var ctrl = this;
    ctrl.roles = [];

    ctrl.getRoles = function() {
        roleService.getRoles().then(function(response) {
            ctrl.roles = response;
        }, function(error) {
            ctrl.handleError(error);
        });
    }
    
    ctrl.activate = function() {
        // Load roles
        ctrl.getRoles();
    }();
}

rolesController.$inject = ['$scope', 'roleService'];

angular.module('manageLiteApp').controller('rolesController', rolesController);