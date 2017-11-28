'use strict';

define(['angular'], function (angular) {

    var routeResolver = function () {

        this.$get = function () {
            return this;
        };

        this.routeConfig = function () {
            var viewsDirectory = '',
                controllersDirectory = '',

            setBaseDirectories = function (viewsDir, controllersDir) {
                viewsDirectory = viewsDir;
                controllersDirectory = controllersDir;
            },

            getViewsDirectory = function () {
                return viewsDirectory;
            },

            getControllersDirectory = function () {
                return controllersDirectory;
            };

            return {
                setBaseDirectories: setBaseDirectories,
                getControllersDirectory: getControllersDirectory,
                getViewsDirectory: getViewsDirectory
            };
        }();

        this.route = function () {

            var resolve = function (baseName, path, url, abstract, viewPath, controllerPath) {
                if (!path) path = '';
                var routeDef = {};
                if(url!=='')
                    routeDef.url = '/'+url;
                if(controllerPath == undefined)
                {
                    controllerPath = '';
                }
                if(viewPath == undefined)
                {
                    viewPath = '';
                }
                var baseFileName = baseName.charAt(0).toUpperCase() + baseName.substr(1);
                routeDef.controller = baseFileName + 'Controller';
                routeDef.abstract = abstract||false;
                routeDef.controllerAs = 'o'+baseFileName + 'Controller';
                routeDef.templateUrl = path +viewPath + baseFileName + '.html';
                routeDef.resolve = {
                    load: ['$q', '$rootScope', function ($q, $rootScope) {
                        var dependencies = [path+controllerPath + baseFileName+'Controller'];
                        return resolveDependencies($q, $rootScope, dependencies);
                    }]
                };
                return routeDef;
            },

            resolveDependencies = function ($q, $rootScope, dependencies) {
                var defer = $q.defer();
                require(dependencies, function () {
                    defer.resolve();
                });
                return defer.promise;
            };

            return {
                resolve: resolve,
                resolveDependencies: resolveDependencies
            }
        }();

    };

    var servicesApp = angular.module('routeResolverServices', []);

    //Must be a provider since it will be injected into module.config()    
    servicesApp.provider('routeResolver', routeResolver);
});
