app.controller('MainCtrl',function($scope){
    $scope.courses = [
        {name: 'Best2', featured: true, published: new Date('10/1/2014')},
        {name: 'Better2', featured: false, published: new Date('9/2/2014')},
        {name: 'Best1', featured: true, published: new Date('10/5/2014')},
        {name: 'Better1', featured: false, published: new Date('9/6/2014')}

    ]
});