function sprintBoardController($scope, $stateParams, $state, $controller, $timeout, toaster, storyService, sprintService, projectService) {
    var inherited = $controller('parentController', {
        $state : $state,
        toaster : toaster
    });
    angular.extend(this, inherited);

    var ctrl = this;
    
    $scope.$on('first-bag.drag', function (e, el) {
        el.removeClass('ex-moved');
        //alert('drag');
      });

      $scope.$on('first-bag.drop', function (e, el, target, source, sibling) {
        el.addClass('ex-moved');
        //alert('drop');
      });

    ctrl.getSprint = function() {
        var sprintId = $stateParams.sprintId;
        if (sprintId) {
            sprintService.getSprint($stateParams.projectId, sprintId).then(function(sprint) {
                // ctrl.initializeRole(role);
                ctrl.sprint = sprint;
                ctrl.sprintName = sprint.name;
            }, function(error) {
                ctrl.handleError(error);
            });
        }
    };

    ctrl.activate = function() {
        // Load Sprint
        /*ctrl.getSprint();

        ctrl.projectName = $stateParams.projectName;
        if (!ctrl.projectName) {
            projectService.getProject($stateParams.projectId).then(function(response) {
                ctrl.projectName = response.name;
            }, function(error) {
                ctrl.handleError(error);
            });
        }*/
    }();
};

sprintBoardController.$inject = [ '$scope', '$stateParams', '$state', '$controller', '$timeout', 'toaster', 'storyService', 'sprintService',
        'projectService' ];

angular.module('manageLiteApp').controller('sprintBoardController', sprintBoardController);