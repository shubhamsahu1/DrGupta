'use strict';

define(['angular'], function (angular) {
	var app = angular.module('drg.inp');
	app.register.controller('LoginSignupController', ['drgFactory','drgHTTPService',function (drgFactory,drgHTTPService) {
		var self = this;
		self.content = {
				"RegisterHeader":"Please Sign Up"
		};
		self.firstName = {
				textLable:"First Name",
				value:"",
				type:"text",
				placeholder:"Please Enter First Name",
				additionalInputClass:{
					"input-lg":true
				}
		};
		self.lastName = {
				textLable:"Last Name",
				value:"",
				type:"text",
				placeholder:"Please Enter Last Name",
				additionalInputClass:{
					"input-lg":true
				}
		};
		self.userName = {
				textLable:"User Name",
				value:"",
				type:"text",
				placeholder:"Please Enter User Name",
				additionalInputClass:{
					"input-lg":true
				}
		};
		self.answer = {
				textLable:"Answer",
				value:"",
				type:"text",
				placeholder:"Please Enter Security Answer",
				additionalInputClass:{
					"input-lg":true
				}
		};
		self.emailId = {
				textLable:"Email ID",
				value:"",
				type:"email",
				placeholder:"Please Enter Email ID",
				additionalInputClass:{
					"input-lg":true
				}
		};
		self.password = {
				textLable:"Password",
				value:"",
				type:"password",
				placeholder:"Password",
				additionalInputClass:{
					"input-lg":true
				}
		};
		self.selectOption = {
			additionalCLass : {
				"form-control" : true,
				"input-lg" : true
			},
			textLabel : "Please Set Security Question",
			options : [
				{value:"Select a question",key:"-1"},
				{value:"What is your Mother's Maiden Name?",key:"1"},
				{value:"What was the name of your First Car?",key:"2"},
				{value:"What is your mother's DOB?",key:"3"}
			]
			};
		self.confirmPassword = {
				textLable:"Confirm Password",
				value:"",
				type:"password",
				placeholder:"Confirm Password",
				additionalInputClass:{
					"input-lg":true
				}
		};
		self.termNcondition = {
				termsText : "I Agree",
				value:false
		};
		self.Signin = function() {
			drgFactory.routeFactory.goToState('inp.login.Signin');
		}
		self.Register = function() {
			var _self = this;
			var data = {};
			data.name = _self.firstName.value+" "+ _self.lastName.value;
			data.email =  _self.emailId.value;
			data.user =  _self.userName.value;
			data.pass =  _self.password.value;
			drgHTTPService.callAjax('POST','/signup',data).then(function(response) {
				debugger;
			},function(response){
				debugger;
			})
		}

		}]);

});
