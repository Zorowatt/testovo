app.controller('loginCtrl',function($scope, $location, notifier, identity, auth){
    $scope.identity = identity;

    $scope.login=function(user){
        auth.login(user).then(function(success) {

            if (success) {
                notifier.success('Successful login!');
            }
            else {
                notifier.error('Username || Password is not valid!');
            }
        });

    }
    $scope.logout = function(){
        auth.logout().then(function(){
            notifier.success('Successful logout!');
            $scope.user.username='';
            $scope.user.password='';
            $location.path('/');
        })

    }
});