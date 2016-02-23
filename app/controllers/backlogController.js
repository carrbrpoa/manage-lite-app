function backlogController($scope, $stateParams, $state, $controller, $timeout, toaster, storyService, sprintService, projectService) {
    var inherited = $controller('parentController', {
        $state : $state,
        toaster : toaster
    });
    angular.extend(this, inherited);

    var ctrl = this;

    ctrl.stories = [];

    ctrl.addStory = function() {
        var projectId = $stateParams.projectId;
        ctrl.stories.push({
            projectId : projectId
        });

        ctrl.scrollToEnd();
    };

    ctrl.removeStory = function(story) {
        var index = ctrl.stories.indexOf(story);
        ctrl.stories.splice(index, 1);

        /*
         * if (ctrl.stories.length === 0) { delete ctrl.stories; }
         */
    };
    
    ctrl.moveStory = function(story, sprintId) {
        var projectId = $stateParams.projectId;
        story.saving = true;
        storyService.moveStory(story, sprintId).then(function(savedObject) {
            story.saving = false;
            if (savedObject) {
                toaster.pop('success', 'Success', 'Save successful');
                ctrl.removeStory(story);
            }
        }, function(error) {
            story.saving = false;
            ctrl.handleError(error);
        });
    };

    ctrl.saveStory = function(story, index) {
        var projectId = $stateParams.projectId;
        story.saving = true;
        story.projectId = projectId;
        storyService.saveStory(story, projectId).then(function(savedObject) {
            story.saving = false;
            if (savedObject) {
                toaster.pop('success', 'Success', 'Save successful');
                ctrl.stories[index] = savedObject;
                $timeout(function() {
                    document.getElementById('btn-add-story').focus();
                });
            }
        }, function(error) {
            story.saving = false;
            ctrl.handleError(error);
        });
    };

    ctrl.getStories = function() {
        storyService.getStories($stateParams.projectId).then(function(response) {
            ctrl.stories = response;
        }, function(error) {
            ctrl.handleError(error);
        });
    };

    ctrl.activate = function() {
        // Load Stories
        ctrl.getStories();

        ctrl.sprints = $stateParams.sprints;
        if (!ctrl.sprints) {
            sprintService.getSprints($stateParams.projectId).then(function(response) {
                ctrl.sprints = response;
            }, function(error) {
                ctrl.handleError(error);
            });
        }
        
        ctrl.projectName = $stateParams.projectName;
        if (!ctrl.projectName) {
            projectService.getProject($stateParams.projectId).then(function(response) {
                ctrl.projectName = response.name;
            }, function(error) {
                ctrl.handleError(error);
            });
        }
    }();
};

backlogController.$inject = [ '$scope', '$stateParams', '$state', '$controller', '$timeout', 'toaster', 'storyService', 'sprintService', 'projectService' ];

angular.module('manageLiteApp').controller('backlogController', backlogController);