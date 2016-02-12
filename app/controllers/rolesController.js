function rolesController($scope, $rootScope, Restangular, roleService) {
    var ctrl = this;
    ctrl.currentRole = {};
    ctrl.baseRoles = Restangular.all('roles');
    ctrl.roles = [];

    ctrl.getRoles = function() {
        /*roleService.getRoles().then(function(response) {
            ctrl.roles = response;
        }, function(error) {
        });*/
        
        ctrl.baseRoles.getList().then(function(roles) {
            ctrl.roles = roles;
        });
    }
    
    ctrl.activate = function() {
        //$rootScope.theme = 'darkly';
        // Load roles
        ctrl.getRoles();
    }();
}

rolesController.$inject = ['$scope', '$rootScope', 'Restangular', 'roleService'];

angular.module('manageLiteApp').controller('rolesController', rolesController);