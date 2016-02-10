angular.module('manageLiteApp').controller('editRoleController', [ '$scope', 'roleService', function($scope, roleService) {
    var ctrl = this;
    ctrl.role = {};
    
    ctrl.submit = function(role) {
        
    };
    
    ctrl.activate = function() {
        var role = ctrl.role;
        ctrl.title = role.id > 0 ? ('Edit Role ' + role.name) : 'New Role'; 
    }();
} ]);