app.factory('identity', function($window, UsersResource){
    var user;
    if ($window.bootstrapedUserObject){
        user = new UsersResource();
        angular.extend(user, $window.bootstrapedUserObject);
    }

    return {
        currentUser: user,
        isAuthenticated: function(){
            return !!this.currentUser;
        },
        isAuthorisedForRole: function(role){
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }
});