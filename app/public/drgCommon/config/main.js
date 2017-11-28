require.config({
    baseUrl: '/',
    // Here paths are set relative to `/source` folder
    paths: {
        'angular'               : 'lib/angular/angular',
        'ngResource'            : 'lib/angular/angular-resource',
        "uiRouter"				: "lib/angular/angular-ui-router",
        'domReady'              : 'lib/domReady',
        'app'                   : 'drgCommon/config/app',
        'angular-ui-bootstrap'  : 'lib/dist/ui-bootstrap-tpls',
        'angularRoute'          : 'lib/angular/angular-route',
        'angular-animate'       : 'lib/angular/angular-animate',
        'angularSanitize'       : 'lib/angular/angular-sanitize',
        'drgHandler'            : 'drgCommon/utils/drgHandler'

    },
    shim: {
    	'angular': {
            exports: 'angular'
        },
        'ngResource': ['angular'],
        'uiRouter' :{
            deps: ['angular']
       },
       
        'angular-animate' : ['angular'],
        'angular-ui-bootstrap' : ['angular'],
        'angularRoute': {
            deps: ['angular'],
            exports: 'angularRoute'
        },
        

        'angularSanitize': {
            deps: ['angular'],
            exports: 'angularSanitize'
        },
        'drgHandler': {
            deps: ['angular'],
            exports: 'drgHandler'
        }
    }
});
require(['app','angularRoute','angular','drgHandler','angularSanitize','angular-animate','uiRouter', 'angular-ui-bootstrap'],
function (app, angularRoute) {

});
