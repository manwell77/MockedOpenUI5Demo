sap.ui.define(["sap/ui/core/mvc/Controller",
               "sap/ui/demo/model/formatter",
               "sap/ui/model/resource/ResourceModel"], 
		
	function (Controller,formatter,ResourceModel) {
	
		"use strict";
   
		return Controller.extend("sap.ui.demo.controller.master", {  			
			
			formatter: formatter,			
		
			onInit: function () {	 

			},
			
			onPoPressed: function (oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("detail", { poid: oEvent.getSource().getBindingContext("po").getObject().ID } );
			},
			
			onHomePressed: function(oEvent) {
				
				// get parameters
				var sURL= $(location).attr("href");
				
				// SAP Host
				var sNEW = sURL.replace("zmockopenui5","zmockopenui5pad");
				
				// No SAP Host
				if (sNEW===sURL) { sNEW = sURL.replace("OpenUI5Demo","OpenUI5DemoPad"); }
				
				// redirect
				sap.m.URLHelper.redirect(sNEW);						
			}
		});
   
});