angular.module('manageLiteApp').factory('projectService', [ 'Restangular', function(Restangular) {
    
    var baseProjects = Restangular.all('projects');
    
    var projectService = {

        getProjects : function(query) {
            return baseProjects.getList(query).then(function(projects) {
                return projects;
            }, function(error) {
                return error;
            });
        },
        
        saveProject: function(project) {
            if (project.id > 0) {
                return project.save();
            }
            else {
                /*var clonedProject = angular.copy(project);
                if (clonedProject.sprints) {
                    angular.forEach(clonedProject.sprints, function(sprint, key) {
                        delete sprint.workingDays;
                        delete sprint.endPicker;
                        delete sprint.startPicker;
                    });
                }*/
                //return baseProjects.post(clonedProject);
                return baseProjects.post(project);
            }
        },
        
        getProject: function(id) {
            return baseProjects.get(id).then(function(project) {
                return project;
            }, function(error) {
                return error;
            });
        }
    }

    return projectService;
} ]);