app.factory('auth', function($http, $q, identity, UsersResource){
    return {
        login: function(user) {
            var deferred = $q.defer();
            $http.post('/login', user).success(function(response){
               if (response.success){
                   var user = new UsersResource();
                   angular.extend(user, response.user);
                   identity.currentUser = user;
                   deferred.resolve(true);
                }
               else{
                   deferred.resolve(false);
               }
            });
            return deferred.promise;

        },
        logout: function(){
            var deferred = $q.defer();

            $http.post('/logout').success(function(){
                identity.currentUser = undefined;
                deferred.resolve();
            });
            return deferred.promise;

        },
        isAuthorisedForRole: function(role){
            if (identity.isAuthorisedForRole(role)){
                return true
            }
            else {
                return $q.reject('non - authorized');
            }
        }
    }
});