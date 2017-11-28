
/**
 * drgHeaderController controller definition
 */
define(['angular'], function (angular) {
	return function(){
		angular.module('drgApp')
		.factory('drgFactory', [ '$rootScope','$state', function($rootScope,$state) {
		   var _headerFactory = function(){
		   		var LoginData = {};	
		   		return  {
			   		setHeader : function(LoginData) {
				    	Header = header;
				    	$rootScope.$broadcast('drgFactory.changeHeader');
			
				     },
				     getHeader : function() {
				    	return Header;
				     }
			   	}
		   }();
		   var _routeFactory = function(){
		   		return  {
			   		 goToState : function(state,object,reload) {
			   		 	if(object === undefined){
			   		 		object = {};
			   		 		reload= false;
			   		 	}
				    	return $state.go(state,object,{reload:reload});
				     }
			   	}
		   }();

		   return {
		   	headerFactory: _headerFactory,
		   	routeFactory: _routeFactory
		   };
		}])
		.factory('drgSessionInjector', ['drgSessionService','$injector','$q','$crypto', function(SessionService,$injector,$q,$crypto) {  
		    var sessionInjector = {
		        request: function(config) {
		        	if(config.url.indexOf(".html")!==-1)
		        	{
		        		return config;
		        	}
		        	config.requestTimestamp = new Date().getTime();
		        	

		            if (!SessionService.isAnonymus()) {
		                config.headers['x-session-token'] = SessionService.authenticationToken();
		                
		            }
		            else{
		            	config.headers['x-session-token'] = 'NA';
		            }
		            config.data = $crypto.encrypt(JSON.stringify(config.data),config.headers['x-session-token'].toString());
		            return config;
		        },
		        response: function(response) {
		            if(response.config.url.indexOf(".html")!==-1)
	              {
	                return response;
	              }
                response.config.responseTimestamp = new Date().getTime();
                response.data = $crypto.decrypt(response.data,response.config.headers['x-session-token'].toString());
                return response;
		        },
		        responseError: function(response) {
		        	if (response.status === 419){
		                var $http = $injector.get('$http');
		                var deferred = $q.defer();
						SessionService.reAuthenticate().then(deferred.resolve, deferred.reject);
		                return deferred.promise.then(function() {
		                    return $http(response.config);
		                });
		            }
		            return $q.reject(response);
		        }
		    };
		    return sessionInjector;
		}]);
	}
});