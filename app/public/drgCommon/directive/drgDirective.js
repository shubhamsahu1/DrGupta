'use strict';

define(['angular'], function (angular) {

    return function(){
      // attaching comman controller  to drgApp

        angular.module("drgApp")
              .directive('cngModuleView',function(){
                  return {
                    restrict:  'EA',
                    template: '<ui-view ></ui-view>'
                  }
                })
              .directive('cngForm',function(){
                  return {
                    restrict:  'EA',
                    template: '<div></div>'
                  }
                })
              .directive('cngSubappView',function(){
                  return {
                    restrict:  'EA',
                    template: '<ui-view></ui-view>'
                  }
                })
              .directive('header',function(){
                  return {
                    restrict:  'EA',
                    controller: 'CNGHeaderController',
                    controllerAs: 'CNGHeaderController',
                    templateUrl: 'app/cng/tmpl/header-template.html'
                  }
                })
              .directive('staticControl',function(){
                  return {
                    restrict:  'E',
                    scope: {
                      'key' : '='
                    },
                    transclude: true,
                    templateUrl: 'drgCommon/tmpl/static-control-template.html'
                  }
                })
                .directive('dropdownTag',function(){
                    return {
                      restrict:  'E',
                      scope: {
                        'config' : '=',
                        'changed': '&changed'
                      },
                      templateUrl: 'drgCommon/tmpl/dropdown-template.html'
                    }
                  })
                .directive('buttonTag',function(){
                    return {
                      restrict:  'E',
                      transclude: true,
                      scope: {
                        'config' : '=',
                        'clickfun': '&clickfun'

                      },
                      templateUrl: 'drgCommon/tmpl/button-template.html'

                      }
                  })
              .directive('termsNCondition',function(){
                  return {
                    restrict:  'E',
                    scope: {
                      'config' : '=', 

                    },
                    templateUrl: 'drgCommon/tmpl/TermsNCondition-template.html',
                    link: function(scope, elm, attrs, ctrl){
                    	scope.clicked = function() {
                    		scope.config.value = !scope.config.value;
                    	};
                    }
                  }
                })
              .directive('pageAlert',function(){
                  return {
                    restrict:  'E',
                    scope: {
                      'config' : '='

                    },
                    templateUrl: 'drgCommon/tmpl/pageAlert-template.html'
                  }
                })
              
              .directive('thumbNail',function(){
                  return {
                    restrict:  'E',
                    scope: {
                        'config' : '=',
                    	},
                     templateUrl: 'drgCommon/tmpl/thumbNail-template.html'
                  }
                })
              .directive('leftNav',function(){
                  return {
                    restrict:  'E',
                    scope: {
                      'config' : '=',

                    },
                    templateUrl: 'drgCommon/tmpl/leftNav-template.html',
                    link: function(scope, elm, attrs, ctrl){
                    	scope.clicked = function(item) {
                    		for (var i = 0; i < scope.config.list.length; i++) {
                    			scope.config.list[i].active = false;
								
							}
                    		item.active = true;
                    	};
                    }
                  }
                })
              .directive('modalControl',function(){
                  return {
                    restrict:  'E',
                    scope: {
                      'config' : '=',

                    },
                    templateUrl: 'app/cng/tmpl/modal-control-template.html'
                  }
                })
              .directive('dateControl',function(){
                  return {
                    restrict:  'E',
                    scope: {
                      'config' : '=',

                    },
                    templateUrl: 'app/cng/tmpl/date-control-template.html'
                  }
                })
              .directive('errorControl',function(){
                  return {
                    restrict:  'E',
                    scope: {
                      'config' : '=',

                    },
                    templateUrl: 'app/cng/tmpl/error-control-template.html'
                  }
                })
				
              .directive('inputBox',function($timeout){
                  return {
                    restrict:  'E',
                    scope: {
                      'blured': '&onBlured',
                      'config' : '=',
                      'changed': '&changed'
                    },
                    link: function(scope, elm){
                      //var formLabel = new CM.FormLabel(this);


                    },
                    templateUrl: 'drgCommon/tmpl/input-box-template.html'
                  }
                })
                .directive('inputSearchBox',function($timeout){
                  return {
                    restrict:  'E',
                    scope: {
                      'blured': '&onBlured',
                      'config' : '=',
                      'changed': '&changed'
                    },
                    link: function(scope, elm){
                      //var formLabel = new CM.FormLabel(this);


                    },
                    templateUrl: 'drgCommon/tmpl/input-searchBox-template.html'
                  }
                })
               .directive('inputArea',function($timeout){
                  return {
                    restrict:  'E',
                    scope: {
                      'blured': '&onBlured',
                      'config' : '=',
                      'changed': '&changed'
                    },
                    link: function(scope, elm){
                      //var formLabel = new CM.FormLabel(this);


                    },
                    templateUrl: 'drgCommon/tmpl/input-area-template.html'
                  }
                })
              .directive('radioControl',function(){

                  return {
                    restrict:  'E',
                    scope: {
                      'config' : '=',
                      'change': '&onChanged',
                    },
                    templateUrl: 'app/cng/tmpl/radio-control-template.html'
                  }
                })
              .directive('jampControl',function(){

                  return {
                    restrict:  'E',
                    scope: {
                      'config' : '='
                    },
                    templateUrl: 'app/cng/tmpl/jamp-control-template.html'
                  }
                })
              .directive('bottomNav',function(){

                  return {
                    restrict:  'E',
                    scope: {
                      'config' : '=',
                      'clicked' : '&onClicked'
                    },
                    templateUrl: 'app/cng/tmpl/bottomNav-template.html'
                  }
                })
              .directive('prgressBar',function(){

                  return {
                    restrict:  'E',
                    scope: {
                      'config' : '='
                    },
                    templateUrl: 'app/cng/tmpl/progressBar-template.html'
                  }
                })
              .directive('ctaControl',function(){

                  return {
                    restrict:  'E',
                    scope: {
                      'config' : '=',
                      'clicked' : '&onClicked'
                    },
                    templateUrl: 'app/cng/tmpl/cta-template.html'

                  }
                })
              .directive('validationControl',function(){

                  return {
                    restrict:  'A',
                    require: 'ngModel',
                    scope: {
                      'config' : '=cn'
                    },
                    link: function(scope, elm, attrs, ctrl){
                      ctrl.$parsers.unshift(function(value) {
                        var _errorRuleSet = scope.config.errorRuleSet;
                        if(_errorRuleSet){
                          scope.config.hasError = false;
                          scope.config.errorMessagePosition=[];
                          for(var _rule in _errorRuleSet){
                            var _ruleObj = _errorRuleSet[_rule];
                            switch(_rule){
                              case "minLength":
                                if(value.length<_ruleObj.rule){
                                  scope.config.hasError = true;
                                  scope.config.errorMessagePosition.push(_ruleObj.message);
                                }

                                break;
                              case "maxLength":
                                if(value.length>_ruleObj.rule){
                                  scope.config.hasError = true;
                                  scope.config.errorMessagePosition.push(_ruleObj.message);
                                }

                                break;
                              case "regex":
                                if(!RegExp(_ruleObj.rule).test(value)){
                                  scope.config.hasError = true;
                                  scope.config.errorMessagePosition.push(_ruleObj.message);
                                }
                                break;

                              case "checkbox":
                                if(!value){
                                  scope.config.hasError = true;
                                  scope.config.errorMessagePosition.push(_ruleObj.message);
                                }

                                break;
                              case "radiocheck":
                                if(value=="-1"){
                                  scope.config.hasError = true;
                                  scope.config.errorMessagePosition.push(_ruleObj.message);
                                }

                                break;
                              case "value":

                                if(value==_ruleObj.rule){
                                  scope.config.hasError = true;
                                  scope.config.errorMessagePosition.push(_ruleObj.message);
                                }

                                break;
                            }
                            if( scope.config.hasError){
                              break;
                            }
                          }

                        }
                        if( scope.config.hasError){
                          return;
                        }
                        else{
                          return value;
                        }

                      });
                    }

                  }
                });
    }

});
