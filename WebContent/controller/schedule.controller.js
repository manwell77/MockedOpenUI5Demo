sap.ui.define(["sap/ui/core/mvc/Controller",
               "sap/ui/core/routing/History",
               "sap/ui/demo/model/formatter",
               'sap/ui/core/Fragment',
               "sap/ui/model/resource/ResourceModel"], 
		
	function (Controller,History,formatter,Fragment,ResourceModel) {
	
		"use strict";
   
		return Controller.extend("sap.ui.demo.controller.schedule", {  											
			
			formatter: formatter,
			
			onInit: function () {		
                /* get route */				
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("schedule").attachPatternMatched(this._onObjectMatched, this);				
				oRouter.getRoute("app").attachPatternMatched(this._onRootMatched, this);			
				this.getView().byId("schedulePage").setVisible(false);				
			},
			
			onPoItemSchedulePressed: function(oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);	
				oRouter.navTo("schedulemap", { poitemscheduleid: oEvent.getSource().getBindingContext("po").getObject().ID } );				
			},
			
			closeImage: function (oEvent) {
				/* close popover */
				this._oPopover.close();	
			},
			
			showImage: function(oEvent) {
				
				/* create popover */
				if (!this._oPopover) {
					this._oPopover = sap.ui.xmlfragment("sap.ui.demo.view.productimage", this);
					this._oPopover.bindElement(oEvent.getSource().getBindingContext("po").getPath());
					this.getView().addDependent(this._oPopover);						
				}
				
				/* open */
				this._oPopover.openBy(oEvent.getSource());
				
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
				this.getView().bindElement( { path: "/poItemSet(" + oEvent.getParameter("arguments").poitemid + ")", model: "po" } );					
				this.getView().byId("schedulePage").setVisible(true);		
			},
			
			_onRootMatched: function (oEvent) {
				/* match path */
				this.getView().unbindElement( "po" );
				this.getView().byId("schedulePage").setVisible(false);
			}					
			
		});

});		
