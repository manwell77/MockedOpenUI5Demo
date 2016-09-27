sap.ui.define(["sap/ui/core/mvc/Controller",
               "sap/ui/core/routing/History",
               "sap/ui/demo/model/formatter",
               "sap/ui/model/resource/ResourceModel"], 
		
	function (Controller,History,formatter,ResourceModel) {
	
		"use strict";
   
		return Controller.extend("sap.ui.demo.controller.schedulemap", {  											
			
			formatter: formatter,
			
			onInit: function () {		
                /* get route */				
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("schedulemap").attachPatternMatched(this._onObjectMatched, this);				
				oRouter.getRoute("app").attachPatternMatched(this._onRootMatched, this);			
				this.getView().byId("scheduleMapPage").setVisible(false);						
			},						
			
			onNavigationBack: function () {					
				
				/* back navigation */
				if (History.getInstance().getPreviousHash() !== undefined) 
				  { window.history.go(-1); } 
				else 
				  { sap.ui.core.UIComponent.getRouterFor(this).navTo("app", true); }
				
			},									
			
			_onObjectMatched: function (oEvent) {
				/* match path */							
				this.getView().bindElement( { path: "/poItemScheduleSet(" + oEvent.getParameter("arguments").poitemscheduleid + ")", model: "po" } );					
				this.getView().byId("scheduleMapPage").setVisible(true);										
			},
			
			_onRootMatched: function (oEvent) {
				/* match path */
				this.getView().unbindElement( "po" );
				this.getView().byId("scheduleMapPage").setVisible(false);
			}					
			
		});

});
