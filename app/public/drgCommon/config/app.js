 /**
 * loads sub modules and wraps them up into the main module.
 * This should be used for top-level module definitions only.
 */
define([
  'domReady!',
  'angular',
  'drgCommon/config/app-data',
  'drgHandler',
  'uiRouter'
], function (document, angular, appData, drgHandler,uirouter) {
	var app,
      _injectParams = appData['injectParams'],
      _moduleList = appData['modules'],
      _dependentModules = ['angular','drgCommon/services/routeResolver', 'drgCommon/directive/drgDirective','drgCommon/factory/drgFactory', 'drgCommon/services/drgServices'],
      _defaultRouteURL = appData.defaultRouteURL;

  for (var _module in _moduleList) {
    var _config = _moduleList[_module];
    if(_defaultRouteURL==''){
      _defaultRouteURL = _module;
    }
    _dependentModules.push(_config['path']+"index");
  };
  require(_dependentModules,
    function (angular,routeResolverProvider,drgDirective,drgFactory,drgService) {
      var app = drgHandler.moduleLoader.createModule('drgApp',_injectParams);
      app.config(['$urlRouterProvider',  '$httpProvider',function($urlRouterProvider,$httpProvider){
          $urlRouterProvider.otherwise(_defaultRouteURL);
         // $httpProvider.interceptors.push('drgSessionInjector');
          
        }
      ]);
   
      drgFactory();
      drgDirective();
      drgService();
      
      drgHandler.moduleRouter.configureRouter(app,_moduleList);
      
      angular.bootstrap(document, ['drgApp']);
  });
  
});
