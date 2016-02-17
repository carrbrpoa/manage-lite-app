function editProjectController($scope, $stateParams, $state, $controller, toaster, projectService) {
    var inherited = $controller('parentController', {$state: $state, toaster: toaster});
    angular.extend(this, inherited);
    
    var ctrl = this;
    
    ctrl.title = 'New Project';
    ctrl.project = { archived: false };
    
    ctrl.submit = function() {
        projectService.saveProject(ctrl.project).then(function(savedObject) {
            if (savedObject) {
                toaster.pop('success', 'Success', 'Save successful');
                ctrl.initializeProject(savedObject);
                $state.transitionTo('projects.edit', {projectId: savedObject.id}, { location: true, inherit: true, relative: $state.$current, notify: false });
            }
        }, function(error) {
            ctrl.handleError(error);
        });
    };
    
    ctrl.setProjectTitle = function() {
        ctrl.title = ctrl.project.id > 0 ? ('Edit Project ' + ctrl.project.name) : ctrl.title; 
    };
    
    ctrl.addSprint = function() {
        ctrl.project.sprints = ctrl.project.sprints || [];
        ctrl.project.sprints.push({});
    };
    
    ctrl.removeSprint = function(sprint) {
        var index = ctrl.project.sprints.indexOf(sprint);
        ctrl.project.sprints.splice(index, 1);
        
        if (ctrl.project.sprints.length === 0) {
            delete ctrl.project.sprints;
        }
    };
    
    ctrl.initializeProject = function(project) {
        ctrl.project = project;
        ctrl.editStamp(ctrl.project);
        ctrl.setProjectTitle();
    };
    
    ctrl.activate = function() {
        if ($stateParams.projectId) {
            projectService.getProject($stateParams.projectId).then(function(project) {
                ctrl.initializeProject(project);
            }, function(error) {
                ctrl.handleError(error, 'projects.list');
            });
        }
    }();
};

editProjectController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'toaster', 'projectService'];

angular.module('manageLiteApp').controller('editProjectController', editProjectController);