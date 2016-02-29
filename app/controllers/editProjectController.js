function editProjectController($scope, $stateParams, $state, $controller, toaster, projectService, statusService) {
    var inherited = $controller('parentController', {
        $state : $state,
        toaster : toaster
    });
    angular.extend(this, inherited);

    var ctrl = this;

    ctrl.title = 'New Project';
    ctrl.project = {
        archived : false
    };
    ctrl.dateOptions = {
        showWeeks : false,
        minDate : new Date()
    };

    ctrl.submit = function() {
        projectService.saveProject(ctrl.project).then(function(savedObject) {
            if (savedObject) {
                toaster.pop('success', 'Success', 'Save successful');
                ctrl.initializeProject(savedObject);
                ctrl.initializeSprintsDatePickers();
                $state.transitionTo('projects.edit', {
                    projectId : savedObject.id
                }, {
                    location : true,
                    inherit : true,
                    relative : $state.$current,
                    notify : false
                });
            }
        }, function(error) {
            ctrl.handleError(error);
        });
    };

    ctrl.countWorkdays = function(sprint) {
        if (sprint) {
            if (sprint.start && sprint.end) {
                var start = angular.copy(sprint.start);
                var end = angular.copy(sprint.end);
                start = typeof start === 'string' ? new Date(start) : start;
                end = typeof end === 'string' ? new Date(end) : end;
                var result = 0;

                var currentDate = start;
                while (currentDate <= end) {

                    var weekDay = currentDate.getDay();
                    if (weekDay != 0 && weekDay != 6) {
                        result++;
                    }

                    currentDate.setDate(currentDate.getDate() + 1);
                }

                sprint.workingDays = result;
            } else {
                sprint.workingDays = undefined;
            }

            return sprint.workingDays;
        }
    };

    function calculateDays(d0, d1) {
        var ndays = 1 + Math.round((d1.getTime() - d0.getTime()) / (24 * 3600 * 1000));
        var nsaturdays = Math.floor((ndays + d0.getDay()) / 7);
        return ndays - 2 * nsaturdays + (d0.getDay() == 1) - (d1.getDay() == 7);
    }

    ctrl.checkOverlaps = function(startDate, endDate, index) {
        var overlaps = false;
        angular.forEach(ctrl.project.sprints, function(sprint, key) {
            if (!overlaps && index !== key) {
                overlaps = (startDate >= sprint.start && startDate <= sprint.end) || (endDate >= sprint.start && endDate <= sprint.end);
            }
        });

        return overlaps;
    };

    ctrl.validateDates = function(sprint, index) {
        var valid = true;
        var overlaps = false;
        if (sprint.start && sprint.end) {
            if (sprint.end < sprint.start) {
                valid = false;
            } else {
                overlaps = ctrl.checkOverlaps(sprint.start, sprint.end, index);
            }
        } else {
            ctrl.setDatesValidity(index, 'endBeforeStart', true);
            ctrl.setDatesValidity(index, 'datesOverlap', true);
            return;
        }

        if (!valid) {
            ctrl.setDatesValidity(index, 'endBeforeStart', valid, true);
        } else if (overlaps) {
            ctrl.setDatesValidity(index, 'endBeforeStart', true);
            ctrl.setDatesValidity(index, 'datesOverlap', false);
        } else {
            ctrl.setDatesValidity(index, 'endBeforeStart', true);
            ctrl.setDatesValidity(index, 'datesOverlap', true);
        }
    };

    ctrl.setDatesValidity = function(index, key, valid, onlyEndDate) {
        var form = $scope.editProject['editSprint' + index];
        if (!onlyEndDate) {
            form.sprintStart.$setValidity(key, valid);
        }
        form.sprintEnd.$setValidity(key, valid);
    };

    // Disable weekend selection
    ctrl.disabledDays = function(date, mode) {
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    };

    ctrl.openSprintStartPicker = function(sprint) {
        sprint.startPicker.opened = true;
    };

    ctrl.openSprintEndPicker = function(sprint) {
        sprint.endPicker.opened = true;
    };

    ctrl.setProjectTitle = function() {
        ctrl.title = ctrl.project.id > 0 ? ('Edit Project ' + ctrl.project.name) : ctrl.title;
    };

    ctrl.initializeSprintsDatePickers = function() {
        angular.forEach(ctrl.project.sprints, function(sprint, key) {
            sprint.startPicker = {
                opened : false
            };
            sprint.endPicker = {
                opened : false
            };
        });
    };

    ctrl.addSprint = function() {
        ctrl.project.sprints = ctrl.project.sprints || [];
        ctrl.project.sprints.push({});
        ctrl.initializeSprintsDatePickers();

        ctrl.scrollToEnd();
    };
    
    ctrl.addStatus = function() {
        ctrl.project.statuses = ctrl.project.statuses || [];
        ctrl.project.statuses.push({});

        ctrl.scrollToEnd();
    };
    
    ctrl.removeStatus = function(status) {
        var index = ctrl.project.statuses.indexOf(status);
        ctrl.project.statuses.splice(index, 1);

        if (ctrl.project.statuses.length === 0) {
            delete ctrl.project.statuses;
        }
    };

    ctrl.removeSprint = function(sprint) {
        var index = ctrl.project.sprints.indexOf(sprint);
        ctrl.project.sprints.splice(index, 1);

        if (ctrl.project.sprints.length === 0) {
            delete ctrl.project.sprints;
        }
    };

    ctrl.initializeProject = function(project) {
        if (project && project.sprints) {
            angular.forEach(project.sprints, function(sprint, key) {
                sprint.start = typeof sprint.start === 'string' ? new Date(sprint.start) : sprint.start;
                sprint.end = typeof sprint.end === 'string' ? new Date(sprint.end) : sprint.end;
            });
            /*ctrl.project.sprints.forEach(function(sprint){
                sprint.start = typeof sprint.start === 'string' ? new Date(sprint.start) : sprint.start;
                sprint.end = typeof sprint.end === 'string' ? new Date(sprint.end) : sprint.end;
            });*/
        }
        
        ctrl.project = project;
        ctrl.editStamp(ctrl.project);
        ctrl.setProjectTitle();
    };
    
    ctrl.getStatuses = function() {
        statusService.getStatuses().then(function(response) {
            ctrl.statuses = response;
        }, function(error) {
            ctrl.handleError(error);
        });
    };

    ctrl.activate = function() {
        if ($stateParams.projectId) {
            projectService.getProject($stateParams.projectId).then(function(project) {
                ctrl.initializeProject(project);
                ctrl.initializeSprintsDatePickers();
                ctrl.getStatuses();
            }, function(error) {
                ctrl.handleError(error, 'projects.list');
            });
        }
        else {
            ctrl.getStatuses();
        }
    }();
};

editProjectController.$inject = [ '$scope', '$stateParams', '$state', '$controller', 'toaster', 'projectService', 'statusService' ];

angular.module('manageLiteApp').controller('editProjectController', editProjectController);