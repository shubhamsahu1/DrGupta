/**
 * Defines constants for application
 */
define([], function () {
  return {
  			'modules': {
						'inp.login':{'path':'modules/inp/subapps/Login/','url':'Login', name:'Login', controllerPath:'controller/', viewPath:'view/', abstract:false,views:["Signin","Signup","ForgotPwd"]},
			            'inp.admin':{'path':'modules/inp/subapps/Admin/','url':'Admin', name:'Admin', controllerPath:'controller/', viewPath:'view/', abstract:false,views:["Home","Report","Patient","Doctor","User","AddUser","Department","Diagnosis","DiagAdd","DiagViewUpdate","DocAdd","DocEUD"]},
			            'inp.user':{'path':'modules/inp/subapps/User/','url':'User', name:'User', controllerPath:'controller/', viewPath:'view/', abstract:false,views:["Home","Report","AddPatient","AddDoctor"]},
			            'inp.comOpt':{'path':'modules/inp/subapps/comOpt','url':'Comp', name:'ComOpt', controllerPath:'controller/', viewPath:'view/', abstract:false,views:["Home"]}
					}

    	};
});
