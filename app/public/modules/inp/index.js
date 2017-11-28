define(['drgHandler','modules/inp/module/config/inp-data.js'],function(drgHandler,appData){
	
	var _moduleList = appData.modules;
	  var app = drgHandler.moduleLoader.createModule('drg.inp',[]);
	  drgHandler.moduleRouter.configureRouter(app,_moduleList);
})