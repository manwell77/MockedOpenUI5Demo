sap.ui.define(["sap/ui/core/mvc/Controller",
               "sap/ui/core/routing/History",
               "sap/ui/demo/model/formatter",
               "sap/ui/model/json/JSONModel",
               "sap/ui/model/resource/ResourceModel"], 
		
	function (Controller,History,formatter,JSONModel,ResourceModel) {
	
		"use strict";
   
		return Controller.extend("sap.ui.demo.controller.detailpdf", {  											
			
			formatter: formatter, 
			
			onInit: function () {		
                /* get route */				
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("detailpdf").attachPatternMatched(this._onObjectMatched, this);				
				oRouter.getRoute("app").attachPatternMatched(this._onRootMatched, this);			
				this.getView().byId("detailPDFPage").setVisible(false);						
			},						
			
			onNavigationBack: function () {					
				
				/* back navigation */
				if (History.getInstance().getPreviousHash() !== undefined) 
				  { window.history.go(-1); } 
				else 
				  { sap.ui.core.UIComponent.getRouterFor(this).navTo("app", true); }
				
			},									
			
			_onObjectMatched: function (oEvent) {
				// getconfig  model and set id
                var oCFGModel = this.getView().getModel("config");	
                if (!oCFGModel)
                	{
	    				// configuration model
	    				var oCFGModel = new JSONModel();
	    				oCFGModel.setData({ idPDFShow: oEvent.getParameter("arguments").pdfid });
	    				oCFGModel.setDefaultBindingMode("OneWay");
	    				this.getView().setModel(oCFGModel, "config");                	                	
                	}
                else
                	{	oCFGModel.setProperty("/idPDFShow",oEvent.getParameter("arguments").pdfid) }				
				/* match path */						
				var sPath = "/poSetPDF(" + oEvent.getParameter("arguments").poid + "," + oEvent.getParameter("arguments").pdfid + ")";
				this.getView().bindElement( { path: "/poSet(" + oEvent.getParameter("arguments").poid + ")", model: "po" } );			
				this.getView().byId("detailPDFPage").setVisible(true);										
			},
			
			_onRootMatched: function (oEvent) {
				/* match path */
				this.getView().unbindElement( "po" );
				this.getView().byId("detailPDFPage").setVisible(false);
			}					
			
		});

});