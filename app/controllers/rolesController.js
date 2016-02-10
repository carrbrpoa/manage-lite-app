angular.module('manageLiteApp').controller('rolesController', [ '$scope', 'roleService', function($scope, roleService) {
    var ctrl = this;
    ctrl.roles = [];

    ctrl.getRoles = function() {
        roleService.getRoles().then(function(response) {
            ctrl.roles = response;
        }, function(error) {
        });
    }
    
    ctrl.activate = function() {
        // Load roles
        ctrl.getRoles();
        //alert('init');
    }();
} ]);