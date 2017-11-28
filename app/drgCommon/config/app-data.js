/**
 * Defines constants for application
 */
define([], function () {
  return {
  			'injectParams': ['ngRoute','ngSanitize','ngAnimate', 'routeResolverServices', 'cng.pnt','mdo-angular-cryptography'],
    		'modules': {
						'pnt':{'path':'modules/pnt/','url':'pnt', name:'pnt', controllerPath:'module/controller/', viewPath:'module/view/', abstract:false}						
					},
    		'defaultRouteURL':'pnt'
    	};
});
