require.config({
    baseUrl: 'app/',
    // Here paths are set relative to `/source` folder
    paths: {
        'angular'               : 'lib/angular.min',
        'jquery'                : 'lib/jquery',
        'ngResource'            : 'lib/angular-resource',
        'ui.router'             : 'lib/angular-ui-router',
        'domReady'              : 'lib/domReady',
        'app'                   : 'cng/config/app',
        'angular-ui-bootstrap'  : 'lib/angular-ui-bootstrap',
        'angularRoute'          : 'lib/angular-route.min',
        'angularSanitize'       : 'lib/angular-sanitize',
        'cngHandler'            : 'cng/utility/CNGHandler',

    },
    shim: {

        'ngResource': ['angular'],
        'ui.router' : ['angular'],
        'angularRoute': {
            deps: ['angular'],
            exports: 'angularRoute'
        },

        'angularSanitize': {
            deps: ['angular'],
            exports: 'angularSanitize'
        },
        'cngHandler': {
            deps: ['angular'],
            exports: 'cngHandler'
        }
    }
});
require(['app','angularRoute','cngHandler','ui.router','angularSanitize','angularAnimate', 'bootstrap','mdo-angular-cryptography'],
function (app, angularRoute) {

});
