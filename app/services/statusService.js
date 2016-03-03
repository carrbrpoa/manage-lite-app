angular.module('manageLiteApp').factory('statusService', [ 'Restangular', function(Restangular) {
    
    var baseStatuses = Restangular.all('statuses');
    
    var statusService = {

        getStatuses : function(query) {
            return baseStatuses.getList(query, {'Cache-Control': 'no-cache'}).then(function(statuses) {
                return statuses;
            }, function(error) {
                return error;
            });
        },
        
        saveStatus: function(status) {
            if (status.id > 0) {
                return status.save();
            }
            else {
                /*var clonedStatus = angular.copy(status);
                if (clonedStatus.sprints) {
                    angular.forEach(clonedStatus.sprints, function(sprint, key) {
                        delete sprint.workingDays;
                        delete sprint.endPicker;
                        delete sprint.startPicker;
                    });
                }*/
                //return baseStatuses.post(clonedStatus);
                return baseStatuses.post(status);
            }
        },
        
        getStatus: function(id) {
            return baseStatuses.get(id).then(function(status) {
                return status;
            }, function(error) {
                return error;
            });
        }
    }

    return statusService;
} ]);