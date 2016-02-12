function projectsController($scope, projectService) {
    var ctrl = this;
    ctrl.projects = [];

    ctrl.getProjects = function() {
        projectService.getProjects().then(function(response) {
            ctrl.projects = response;
        }, function(error) {
        });
    }
    
    ctrl.activate = function() {
        // Load projects
        ctrl.getProjects();
    }();
};

projectsController.$inject = ['$scope', 'projectService'];

angular.module('manageLiteApp').controller('projectsController', projectsController);