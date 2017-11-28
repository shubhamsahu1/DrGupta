'use strict';

define(['angular'], function (angular) {

    var cngHandler = function () {
        var moduleLoader = function(){
            var returnObj = {},
            _commonInjectParams = ['ui.router'],
            setDefaultModuleConfiguration = function(app){
               app.config(['$routeProvider', '$controllerProvider',
                '$compileProvider', '$filterProvider', '$provide', '$httpProvider', 
                function ($routeProvider, $controllerProvider,
                  $compileProvider, $filterProvider, $provide, $httpProvider) {
                        app.register =
                            {
                                controller: $controllerProvider.register,
                                directive: $compileProvider.directive,
                                filter: $filterProvider.register,
                                factory: $provide.factory,
                                service: $provide.service
                            };
                        
                }]);
               return app;
            }
            returnObj.createModule = function(moduleName, dependency){
                dependency = dependency.concat(_commonInjectParams);
                return setDefaultModuleConfiguration(angular.module(moduleName, dependency));
            }
            returnObj.createSubAppModule = function(moduleName, parentModule, dependency){
                dependency.push(parentModule);
                dependency = dependency.concat(_commonInjectParams)
                return setDefaultModuleConfiguration(angular.module(moduleName, dependency));
            }
            return returnObj;
        }();

        var moduleRouter = function(){
            var returnObj = {},
                setRouterConfiguration = function(app, moduleConfig){
                    app.config(['$stateProvider', 'routeResolverProvider',
                    function ($stateProvider, routeResolverProvider){
                        var route = routeResolverProvider.route;
                        for (var _module in moduleConfig) {
                          var _config = moduleConfig[_module];

                          $stateProvider.state(_module, route.resolve(_config['name'], _config['path'],_config['url'],_config.abstract,_config.viewPath,_config.controllerPath));
                          if(_config['views'])
                          {
                            var viewConfig = _config['views'];
                            for (var _view in viewConfig) {
                                var _viewName = viewConfig[_view];
                                $stateProvider.state(_module+'.'+_viewName, route.resolve(_config['name']+_viewName, _config['path'],'',false,_config.viewPath,_config.controllerPath));
                          
                            }
                          }
                        };
                    }]);
            }
            returnObj.configureRouter = function(app, moduleConfig){
                setRouterConfiguration(app, moduleConfig)
            }
            return returnObj;
        }();
        var validator = function(){
            var returnObj = {},
                validateForm = function(formModule){
                    var _isValid = true,
                        _formPristine = formModule.$pristine;
                    
                    angular.forEach(formModule, function(value, key) {
                         if (typeof value === 'object' && value.hasOwnProperty('$modelValue')){
                            if(_formPristine){
                                value.$$parseAndValidate();
                            }
                            else{
                                if(value.$pristine)
                                {
                                    value.$$parseAndValidate();
                                }
                                
                            }
                         }
                     }); 
                     return !formModule.$invalid;
                };
            returnObj.validateForm = function(formModule){
                return validateForm(formModule);
            }
            return returnObj;
        }();
        return  {
            moduleRouter:moduleRouter,
            moduleLoader:moduleLoader,
            validator:validator
        }
    }();
    return cngHandler;
});
