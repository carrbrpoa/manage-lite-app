angular.module('manageLiteApp').controller('projectsController', [ '$scope', 'projectService', function($scope, projectService) {
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
} ]);