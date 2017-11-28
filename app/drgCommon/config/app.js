 /**
 * loads sub modules and wraps them up into the main module.
 * This should be used for top-level module definitions only.
 */
define([
  'domReady!',
  'angular',  
  'cng/config/app-data',
  'cngHandler'
], function (document, angular, appData, cngHandler) {
  var app,
      _injectParams = appData['injectParams'],
      _moduleList = appData['modules'],
      _dependentModules = ['angular','cng/service/routeResolver', 'cng/directive/CNGDirective','cng/factory/CNGFactory', 'cng/service/CNGService'],
      _defaultRouteURL = appData.defaultRouteURL;

  for (var _module in _moduleList) {
    var _config = _moduleList[_module];
    if(_defaultRouteURL==''){
      _defaultRouteURL = _module;
    }
    _dependentModules.push(_config['path']+"index");
  };
  require(_dependentModules,
    function (angular,routeResolverProvider,cngDirective,cngFactory,cngService) {
      var app = cngHandler.moduleLoader.createModule('citiApp',_injectParams);
      app.config(['$urlRouterProvider',  '$httpProvider' ,'$cryptoProvider',function($urlRouterProvider,$httpProvider,$cryptoProvider){
          $urlRouterProvider.otherwise(_defaultRouteURL);
          $httpProvider.interceptors.push('CNGSessionInjector');
          
        }
      ]);
   
      cngFactory();
      cngDirective();
      cngService();
      
      cngHandler.moduleRouter.configureRouter(app,_moduleList);
      
      angular.bootstrap(document, ['citiApp']);
  });
  
});
