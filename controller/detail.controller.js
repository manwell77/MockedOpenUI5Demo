sap.ui.define(["sap/ui/core/mvc/Controller",
               "sap/ui/core/routing/History",
               "sap/ui/demo/model/formatter",
               "sap/ui/model/resource/ResourceModel",
               "sap/m/MessageToast",
               "sap/m/Dialog",
               "sap/m/Button"], 
		
	function (Controller,History,formatter,ResourceModel,MessageToast, Dialog, Button) {
	
		"use strict";
   
		return Controller.extend("sap.ui.demo.controller.detail", {  											
			
			formatter: formatter,
			
			onInit: function () {		
                /* get route */				
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);				
				oRouter.getRoute("app").attachPatternMatched(this._onRootMatched, this);			
				this.getView().byId("detailPage").setVisible(false);				
			},				
			
			onPoItemPressed: function(oEvent) {				
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);	
				oRouter.navTo("schedule", { poitemid: oEvent.getSource().getBindingContext("po").getObject().ID } );
				
			},
			
			onNavigationBack: function () {				
                /* back navigation */
				if (History.getInstance().getPreviousHash() !== undefined) 
				  { window.history.go(-1); } 
				else 
				  { sap.ui.core.UIComponent.getRouterFor(this).navTo("app", true); }
			},					
			
			onSign: function (oEvent) {
				var sRand = Math.floor(Math.random()*100000000000000).toString();
				var sID = sRand.substr(0,4) + "-" + sRand.substr(4,6) + "-" + sRand.substr(10,4);
				var oBundle = this.getView().getModel("i18n").getResourceBundle();
				MessageToast.show(oBundle.getText("signedPo") + " " + oEvent.getSource().getBindingContext("po").getProperty("Number") + " " + oBundle.getText("signedPoSigned") + " " + sID,
						          { width: "25em" });
			},	
			
			onSignPad: function (oEvent) {
				
				var oBundle = this.getView().getModel("i18n").getResourceBundle();
				
				var oDialog = new Dialog("signature",{
					
					title: 'Sign',
					horizontalScrolling: false,
					verticalScrolling: false,
					resizable: false,
					draggable: false,
					stretch: "{= ${device>/system/phone} ? true : false }" ,
					content: new sap.ui.core.HTML({ preferDOM: true, 
					                                content: "<div id='signature-pad' class='m-signature-pad'>" +
														         "<canvas></canvas>" +
														     "</div>" +
														     "<script src='../signature/signature.js'></script>" +
														     "<script src='../signature/app.js'></script>" }),
					
					endButton: new Button({ text: oBundle.getText("poCancelSign"), press: function () { oDialog.close(); }	}),
					beginButton: new Button({ text: oBundle.getText("poSign"), press: function () 
						{   
						  oDialog.close();
						  var sRand = Math.floor(Math.random()*100000000000000).toString();
					      var sID = sRand.substr(0,4) + "-" + sRand.substr(4,6) + "-" + sRand.substr(10,4);
						  MessageToast.show(oBundle.getText("signedPo") + " " + oEvent.getSource().getBindingContext("po").getProperty("Number") + " " + oBundle.getText("signedPoSigned") + " " + sID,{ width: "25em" }); 
						}	
					}),
					
					afterClose: function() { oDialog.destroy(); }
				 
				});
	 
				//to get access to the global model
				this.getView().addDependent(oDialog);
				oDialog.open();
				if (!this.getView().getModel("device").getData().system.phone) {
					oDialog.setContentWidth($("#signature-pad").outerWidth(false) + "px");
					oDialog.setContentHeight($("#signature-pad").outerHeight(false) + "px"); 
				}
			},
			
			PressPDF: function (oEvent) {
				// getconfig  model and set id
                var oCFGModel = this.getView().getModel("config");	
                oCFGModel.setProperty("/idPDFShow",oEvent.getSource().data("idtoshow"))
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);	
				oRouter.navTo("detailpdf", { poid: oEvent.getSource().getBindingContext("po").getObject().ID, pdfid: oEvent.getSource().data("idtoshow") } );				
			},				
			
			_onObjectMatched: function (oEvent) {
				/* match path */						
				var sPath = "/poSet(" + oEvent.getParameter("arguments").poid + ")";
				this.getView().bindElement( { path: sPath, model: "po" } );					
				this.getView().byId("detailPage").setVisible(true);		
			},
			
			_onRootMatched: function (oEvent) {
				/* match path */
				this.getView().unbindElement( "po" );
				this.getView().byId("detailPage").setVisible(false);
			}			
			
		});
   
});