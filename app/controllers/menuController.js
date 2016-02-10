angular.module('manageLiteApp').controller('menuController', [ '$scope', '$location', function($scope, $location) {
    var ctrl = this;

    ctrl.isActive = function(viewLocation) {
        return $location.path().lastIndexOf(viewLocation, 0) === 0;
        //return viewLocation === $location.path();
    }
} ]);