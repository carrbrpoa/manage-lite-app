angular.module('manageLiteApp').factory('storyService', [ 'Restangular', function(Restangular) {
    
    var mountBacklogBaseStories = function(projectId) {
        return Restangular.one('projects', projectId).all('stories');
    };
    
    var storyService = {
        getStories: function(projectId, query) {
            var baseStories = mountBacklogBaseStories(projectId);
            return baseStories.getList(query).then(function(stories) {
                return stories;
            }, function(error) {
                return error;
            });
        },
        moveStory: function(story, sprintId) {
            return story.patch({ sprintId: sprintId, projectId: null });
        },        
        saveStory: function(story, projectId) {
            var baseStories = mountBacklogBaseStories(projectId);
            if (story.id > 0) {
                return story.save();
            }
            else {
                return baseStories.post(story);
            }
        },
        getStory: function(id) {
            return baseStories.get(id).then(function(story) {
                return story;
            }, function(error) {
                return error;
            });
        }
    }

    return storyService;
} ]);