function rolesController($scope, roleService) {
    var ctrl = this;
    ctrl.currentRole = {};
    //ctrl.baseRoles = Restangular.all('roles');
    ctrl.roles = [];

    ctrl.getRoles = function() {
        roleService.getRoles().then(function(response) {
            ctrl.roles = response;
        }, function(error) {
            ctrl.handleError(error);
        });
        
        /*ctrl.baseRoles.getList().then(function(roles) {
            ctrl.roles = roles;
        });*/
    }
    
    ctrl.activate = function() {
        // Load roles
        ctrl.getRoles();
    }();
}

rolesController.$inject = ['$scope', 'roleService'];

angular.module('manageLiteApp').controller('rolesController', rolesController);