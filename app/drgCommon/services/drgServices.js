'use strict';

define(['angular'], function (angular) {

    return function(){
        angular.module("citiApp")
        .service('CNGService', function() {
          var _data = {},
            addData = function(data){
              _data = data;
            },
            getData = function(){
              return _data;
            };

          return {
            addData: addData,
            getData: getData
          };

        })
        /*.service('CNGJampService',function(){
           _showJamp = function(value){
                if(value==true){
                  angular.element('#myJamp').show();
                }
                else{
                  angular.element('#myJamp').hide();
                }
              };
        })*/
        .service('CNGSessionService', ['CNGHTTPService', '$q',function(CNGHTTPService,$q) {
         var _authenticationToken = '',
              _isAnonymus = true,
            _authenticate = function(){
              CNGHTTPService.callAjax('GET','authenticate');
            },
            _reAuthenticate = function(otp){
              var _deferred = $q.defer();
              
              CNGHTTPService.callAjax('POST','/reauthenticate',{otp:otp}).then(function(response){
                if(response.failure){
                  _deferred.reject(response);
                }
                else{
                  
                  _authenticationToken = response.authKey;
                  _isAnonymus = false;
                  _deferred.resolve({success:true});
                }
                
              },function(){
                _deferred.reject();
              });

              return _deferred.promise;
            };

          
            this.reAuthenticate =  _reAuthenticate;
            this.isAnonymus =  function(){
              return _isAnonymus;
            };
            this.authenticationToken = function(){
              return _authenticationToken;
            };//_authenticationToken;
            this.authenticate = _authenticate;
          

        }])
        .service('CNGHTTPService', ['$q','$injector',function($q,$injector) {
          var $http,// = $injector.get('$http'),
              _callAjax = function(method,url,data){
                $http = $injector.get('$http');
                var deferred = $q.defer();
                data = data||{};
                method = method||'GET';
                
                $http({
                      method: method,
                      url: url,
                      data: data
                    }).success(function(data) {
                        if(data!=="")
                        {
                          //CNGJampService._showJamp(_jampValue);
                          deferred.resolve(JSON.parse(data));  
                        }
                        
                     }).error(function(msg, code) {
                        deferred.reject(msg);
                     });
                   return deferred.promise;
              }

          return {
            callAjax: _callAjax
          };

        }]);
    }
    
});
