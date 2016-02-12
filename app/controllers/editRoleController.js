function editRoleController($scope, $stateParams, $state, $controller, Restangular, toaster, roleService) {
    var inherited = $controller('parentController', {$state: $state});
    angular.extend(this, inherited);
    
    var ctrl = this;
    
    ctrl.baseRoles = Restangular.all('roles');
    ctrl.title = 'New Role';
    ctrl.role = { enabled: true };
    
    ctrl.submit = function(role) {
        var saveAction;
        if (ctrl.role.id > 0) {
            saveAction = ctrl.role.save();
        }
        else {
            saveAction = ctrl.baseRoles.post(ctrl.role);
        }
        
        saveAction.then(function(savedObject) {
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
        ctrl.setRoleTitle();
    };
    
    ctrl.activate = function() {
        if ($stateParams.roleId) {
            ctrl.baseRoles.get($stateParams.roleId).then(function(role) {
                ctrl.initializeRole(role);
            }, function(error) {
                ctrl.handleError(error, 'roles.list');
            });
        }
    }();
};

editRoleController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'Restangular', 'toaster', 'roleService'];

angular.module('manageLiteApp').controller('editRoleController', editRoleController);