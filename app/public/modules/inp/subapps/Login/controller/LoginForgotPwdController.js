'use strict';

define(['angular'], function (angular) {
	var app = angular.module('drg.inp');
	app.register.controller('LoginForgotPwdController', ["drgFactory",function (drgFactory) {
		var self = this;
		self.content = {
				"LoginHeader":"Please Authenticate yourself to recover"
		};

		self.userName = {
				textLable:"User Name/Email Id",
				value:"",
				type:"text",
				placeholder:"Please Enter User Name/Email Id",
				additionalInputClass:{
					"input-lg":true
				}
		};
		self.securityAns = {
				textLable:"Please Answer The Question Below",
				value:"",
				type:"text",
				placeholder:"Here IS question",
				additionalInputClass:{
					"input-lg":true
				}
		};
		self.password = {
				textLable:"Enter New Password",
				value:"",
				type:"password",
				placeholder:"Please Enter Password",
				additionalInputClass:{
					"input-lg":true
				}
		};
		self.confirmPassword = {
				textLable:"Re-enter Password",
				value:"",
				type:"password",
				placeholder:"Please Enter Password",
				additionalInputClass:{
					"input-lg":true
				}
		};
		var _submit = function () {
			drgFactory.routeFactory.goToState('inp.login.Signin');
		}
		self.submitButton = {
				buttonText : "Submit",
				type : "button",
				clicked : _submit,
				additionalCLass : {
					"btn-lg" : true,
					"btn-success" : true,
					"btn-block" : true
				}
		};

		}]);

});
