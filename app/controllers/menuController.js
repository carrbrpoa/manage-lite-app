function menuController($scope, $location, $state) {
    var ctrl = this;
    
    ctrl.navigate = function() {
        $state.reload();
    };
    
    ctrl.isActive = function(viewLocation) {
        return $location.path().lastIndexOf(viewLocation, 0) === 0;
        //return viewLocation === $location.path();
    };
}

menuController.$inject = ['$scope', '$location', '$state'];

angular.module('manageLiteApp').controller('menuController', menuController);