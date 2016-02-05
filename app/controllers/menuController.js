angular.module('manageLiteApp').controller('menuController', [ '$scope', '$location', function($scope, $location) {
    var ctrl = this;

    ctrl.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    }
} ]);