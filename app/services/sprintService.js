angular.module('manageLiteApp').factory('sprintService', [ 'Restangular', function(Restangular) {
    
    var mountBaseSprints = function(projectId) {
        return Restangular.one('projects', projectId).all('sprints');
    };
    
    var sprintService = {
        getSprints: function(projectId, query) {
            var baseSprints = mountBaseSprints(projectId);
            return baseSprints.getList(query).then(function(sprints) {
                return sprints;
            }, function(error) {
                return error;
            });
        }/*,
        saveSprint: function(sprint, projectId) {
            var baseSprints = mountBacklogBaseSprints(projectId);
            if (sprint.id > 0) {
                return sprint.save();
            }
            else {
                return baseSprints.post(sprint);
            }
        },
        getSprint: function(id) {
            return baseSprints.get(id).then(function(sprint) {
                return sprint;
            }, function(error) {
                return error;
            });
        }*/
    }

    return sprintService;
} ]);