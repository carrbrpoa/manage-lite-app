function editRoleController($scope, $stateParams, $state, $controller, toaster, roleService) {
    var inherited = $controller('parentController', {$state: $state, toaster: toaster});
    angular.extend(this, inherited);
    
    var ctrl = this;
    
    ctrl.title = 'New Role';
    ctrl.role = { enabled: true };
    
    ctrl.submit = function() {
        roleService.saveRole(ctrl.role).then(function(savedObject) {
            if (savedObject) {
                toaster.pop('success', 'Success', 'Save successful');
                ctrl.initializeRole(savedObject);
                $state.transitionTo('roles.edit', {roleId: savedObject.id}, { location: true, inherit: true, relative: $state.$current, notify: false });
            }
        }, function(error) {
            ctrl.handleError(error);
        });
    };
    
    ctrl.setRoleTitle = function() {
        ctrl.title = ctrl.role.id > 0 ? ('Edit Role ' + ctrl.role.name) : ctrl.title; 
    };
    
    ctrl.initializeRole = function(role) {
        ctrl.role = role;
        ctrl.editStamp(ctrl.role);
        ctrl.setRoleTitle();
    };
    
    ctrl.activate = function() {
        if ($stateParams.roleId) {
            roleService.getRole($stateParams.roleId).then(function(role) {
                ctrl.initializeRole(role);
            }, function(error) {
                ctrl.handleError(error, 'roles.list');
            });
        }
    }();
};

editRoleController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'toaster', 'roleService'];

angular.module('manageLiteApp').controller('editRoleController', editRoleController);