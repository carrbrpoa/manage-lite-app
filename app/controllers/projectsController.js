function projectsController($scope, $state, projectService) {
    var ctrl = this;
    ctrl.projects = [];

    ctrl.getProjects = function() {
        projectService.getProjects().then(function(response) {
            ctrl.projects = response;
        }, function(error) {
        });
    };
    
    ctrl.activeSprint = function(sprint) {
        var now = new Date();
        return new Date(sprint.start) <= now && new Date(sprint.end) >= now;
    };
    
    ctrl.hideNewButton = function() {
        return $state.includes('projects.edit') || $state.includes('projects.backlog');
    };
    
    ctrl.activate = function() {
        // Load projects
        ctrl.getProjects();
    }();
};

projectsController.$inject = ['$scope', '$state', 'projectService'];

angular.module('manageLiteApp').controller('projectsController', projectsController);