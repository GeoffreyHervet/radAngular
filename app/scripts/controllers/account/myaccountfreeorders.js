'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountFreeOrdersCtrl
 * @description
 * # MyAccountFreeOrdersCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountFreeOrdersCtrl', function ($scope, User) {
    if (!User.isLoggued()) {
      User.goToLogin();
    }

    $scope.loading = true;
    $scope.title = 'myaccount.profile.free_order.title';
    $scope.user = null;
    $scope.email = '';
    $scope.password = '';
    $scope.translateData = {email: $scope.email};

    // FOR SHARE URLS
    // $compileProvider.aHrefSanitizationWhitelist (app.js)
    User
      .getInfos()
      .then(function(data){
        $scope.loading = false;
        $scope.user    = data;
        setShareUrls(data.referafriend.share_link);
      }, function(e){
        $scope.loading = false;
        $scope.error = e;
      })
    ;

    var setShareUrls = function(url){
      url = escape(url);
      $scope.share = {
        facebook: 'https://www.facebook.com/dialog/share?app_id=406695926021804&display=page&href='+url+'&redirect_uri=' + escape(location.href),
        //sms: 'sms:&body='+  url,
        whatsapp: 'whatsapp://send?text=' + url,
        twitter: 'twitter://post?message=' + url
      };
    };


  });
