angular.module('manageLiteApp').factory('roleService', [ 'Restangular', function(Restangular) {
    
    var baseRoles = Restangular.all('roles');
    
    var roleService = {
        getRoles: function(query) {
            return baseRoles.getList(query).then(function(roles) {
                return roles;
            }, function(error) {
                return error;
            });
        },
        saveRole: function(role) {
            if (role.id > 0) {
                return role.save();
            }
            else {
                return baseRoles.post(role);
            }
        },
        getRole: function(id) {
            return baseRoles.get(id).then(function(role) {
                return role;
            }, function(error) {
                return error;
            });
        }
    }

    return roleService;
} ]);