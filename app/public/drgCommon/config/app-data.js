/**
 * Defines constants for application
 */
define([], function () {
  return {
  			'injectParams': ['ngRoute','ngSanitize','ngAnimate', 'routeResolverServices','ui.bootstrap', 'drg.inp'],
    		'modules': {
						'inp':{'path':'modules/inp/','url':'inp', name:'inp', controllerPath:'module/controller/', viewPath:'module/view/', abstract:false}						
					},
    		'defaultRouteURL':'inp/Login'
    	};
});
