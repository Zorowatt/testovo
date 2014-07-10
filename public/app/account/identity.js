app.factory('identity', function($window){
    var currentUser;
    return {
        currentUser: $window.bootstrapedUserObject ,
        isAuthenticated: function(){
            return !!this.currentUser;
        }
    }
});