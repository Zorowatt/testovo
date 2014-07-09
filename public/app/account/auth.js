app.factory('auth', function($http, $q, identity){
    return {
        login: function(user) {
            var deffered = $q.defer();
            $http.post('/login', user).success(function(response){
               if (response.success){
                   identity.currentUser = response.user;
                   deffered.resolve(true);
                   console.log(response.user);
                }
               else{
                   deffered.resolve(false);
               }
            });
            return deffered.promise;

        }
    }
});