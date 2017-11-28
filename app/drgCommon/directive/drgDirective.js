'use strict';

define(['angular','cng/controller/CNGHeaderController','cng/controller/CNGFooterController'], function (angular,CNGHeaderController,CNGFooterController) {

    return function(){
      // attaching comman controller  to citiapp
        CNGHeaderController();
        CNGFooterController();

        angular.module("citiApp")
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
                      'config' : '=',

                    },
                    templateUrl: 'app/cng/tmpl/static-control-template.html'
                  }
                })
              .directive('termsNCondition',function(){
                  return {
                    restrict:  'E',
                    scope: {
                      'config' : '=',

                    },
                    templateUrl: 'app/cng/tmpl/TermsNCondition-template.html'
                  }
                })
              .directive('formDivider',function(){
                  return {
                    restrict:  'E',
                    scope: {
                      'config' : '=',

                    },
                    templateUrl: 'app/cng/tmpl/formDivider-template.html'
                  }
                })
              .directive('disclamer',function(){
                  return {
                    restrict:  'E',
                    scope: {
                      'config' : '=',

                    },
                    templateUrl: 'app/cng/tmpl/disclaimer-template.html'
                  }
                })
              .directive('footer',function(){
                  return {
                    restrict:  'EA',
                    controller: 'CNGFooterController',
                     controllerAs: 'CNGFooter',
                    templateUrl: 'app/cng/tmpl/footer-template.html'
                  }
                })
              .directive('leftNav',function(){
                  return {
                    restrict:  'E',
                    scope: {
                      'config' : '=',

                    },
                    templateUrl: 'app/cng/tmpl/leftNav-template.html'
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
				  .directive('phoneControl',function(){
                  return {
                    restrict: 'E',
                    scope: {
                      'config' : '=',

                    },
                    templateUrl: 'app/cng/tmpl/phone-template.html'
                  }
                })
              .directive('simpleControl',function($timeout){
                  return {
                    restrict:  'E',
                    scope: {
                      'blured': '&onBlured',
                      'config' : '=',
                      'changed': '&onChanged'
                    },
                    link: function(scope, elm){
                      //var formLabel = new CM.FormLabel(this);
                     

                    },
                    templateUrl: 'app/cng/tmpl/simple-control-template.html'
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
                                if(!new RegExp(_ruleObj.rule).test(value)){
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
