function settingsController($scope, $rootScope, Restangular, toaster) {
    var ctrl = this;
    ctrl.baseSettings = Restangular.all('settings');
    ctrl.settings = { theme: 'flatly' };
    ctrl.themes = [];
    
    ctrl.submit = function(settings) {
        var saveAction;
        if (ctrl.settings.id > 0) {
            saveAction = ctrl.settings.save();
        }
        else {
            saveAction = ctrl.baseSettings.post(ctrl.settings);
        }
        
        saveAction.then(function(savedObject) {
            if (savedObject) {
                toaster.pop('success', 'Success', 'Save successful');
                $rootScope.theme = settings.theme;
            }
        }, function(error) {
            ctrl.handleError(error);
        });
    };

    ctrl.getThemes = function() {
        /*roleService.getRoles().then(function(response) {
            ctrl.roles = response;
        }, function(error) {
        });*/
        ctrl.themes = ['flatly', 'darkly'];
    };
    
    ctrl.getSettings = function() {
        ctrl.baseSettings.getList().then(function(settings) {
            if (settings.length > 0) {
                ctrl.settings = settings[0];
                $rootScope.theme = ctrl.settings.theme;
            }
        }, function(error) {
            ctrl.handleError(error, 'projects');
        });
    };
    
    ctrl.activate = function() {
        //$rootScope.theme = 'darkly';
        // Load roles
        ctrl.getThemes(); 
        ctrl.getSettings();
    }();
}

settingsController.$inject = ['$scope', '$rootScope', 'Restangular', 'toaster'];

angular.module('manageLiteApp').controller('settingsController', settingsController);