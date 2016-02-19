function parentController($state, toaster) {
    var ctrl = this;
    ctrl.unknownErrorMessage = 'Oops, an unknown error occurred';

    ctrl.handleError = function(error, transitionTo) {
        var message = ctrl.unknownErrorMessage;
        if (error.data) {
            if (error.data.errors) {
                var error = error.data.errors[0];
                message = (error.value || 'Error') + ": " + error.message;
            }
            else if (error.data.message) {
                message = error.data.message;
            }
        }
        toaster.pop('error', 'Error', message);

        if (transitionTo) {
            $state.go(transitionTo);
        }
    };

    ctrl.editStamp = function(entity) {
        if (entity) {
            entity.startedEditAt = new Date();
        }
    };

    ctrl.isNewEntity = function(entity) {
        return entity && (!entity.id || entity.id === 0);
    };
}

parentController.$inject = [ '$state', 'toaster' ];

angular.module('manageLiteApp').controller('parentController', parentController);