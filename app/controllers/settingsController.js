function settingsController($scope, $rootScope, Restangular) {
    var ctrl = this;
    ctrl.settings = { theme: 'flatly' };
    ctrl.themes = [];
    
    ctrl.submit = function(settings) {
        $rootScope.theme = settings.theme;
    };

    ctrl.getThemes = function() {
        /*roleService.getRoles().then(function(response) {
            ctrl.roles = response;
        }, function(error) {
        });*/
        
        ctrl.themes = ['flatly', 'darkly'];
    }
    
    ctrl.activate = function() {
        //$rootScope.theme = 'darkly';
        // Load roles
        ctrl.getThemes();        
    }();
}

settingsController.$inject = ['$scope', '$rootScope', 'Restangular'];

angular.module('manageLiteApp').controller('settingsController', settingsController);