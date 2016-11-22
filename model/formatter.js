sap.ui.define([], function () {
	
	"use strict";
	
	return {
		
		statusColor :  function (Status) {
          								
			if (Status === "SGD") {	return "Success"; } 
			else if (Status === "ERR") { return "Error"; } 
			else { return "None"; }
		},
		
		dateTime :  function (Date) {								
			
			if (Date!=null)	{  					            
	            
				var date = "";				
				var oBundle = this.getView().getModel("i18n").getResourceBundle();
				
				switch (Date.getDay()) {
				case 1: date = oBundle.getText("dayMonday"); break;
				case 2: date = oBundle.getText("dayTuesday"); break;
				case 3: date = oBundle.getText("dayWednesday"); break; 
				case 4: date = oBundle.getText("dayThursday"); break;
				case 5: date = oBundle.getText("dayFriday"); break;
				case 6: date = oBundle.getText("daySaturday"); break;
				case 7: date = oBundle.getText("daySunday"); break;					
				}
				
				date += " " + Date.getDate() + " ";
				
				switch (Date.getMonth()) {
				case 1: date += oBundle.getText("monthJanuary"); break;
				case 2: date += oBundle.getText("monthFebruary"); break;
				case 3: date += oBundle.getText("monthMarch"); break;
				case 4: date += oBundle.getText("monthApril"); break;
				case 5: date += oBundle.getText("monthMay"); break;
				case 6: date += oBundle.getText("monthJune"); break;
				case 7: date += oBundle.getText("monthJuly"); break;
				case 8: date += oBundle.getText("monthAugust"); break;
				case 9: date += oBundle.getText("monthSeptember"); break;
				case 10: date += oBundle.getText("monthOctober"); break;
				case 11: date += oBundle.getText("monthNovember"); break;
				case 12: date += oBundle.getText("monthDecember"); break;				
				}
				
				date += " " + Date.getFullYear();
				
				return date;
			}
		},
		
		valueToString: function (Value,Currency) {
			
			if ((Value!=null) && (Currency!=null)) { 			
				var aCurr = [];
				aCurr.push(Value);
				aCurr.push(Currency);
				var oCurr = new sap.ui.model.type.Currency({showMeasure: false});
				var sValue = oCurr.formatValue(aCurr,"string");
				return sValue;
			}
			
		},
		
		priceToString: function (Price,Currency,CurrencyName,PriceUnit,UnitName) {
			
			if ((Price!=null) && (Currency!=null) && (CurrencyName!=null) && (PriceUnit!=null) && (UnitName!=null)) {			
				var oBundle = this.getView().getModel("i18n").getResourceBundle();			
				var aCurr = [];
				aCurr.push(Price);
				aCurr.push(Currency);
				var oCurr = new sap.ui.model.type.Currency({showMeasure: false});
				var sPriceUnit = PriceUnit.toString();
				var sValue = oCurr.formatValue(aCurr,"string") + " " + CurrencyName + " " + oBundle.getText("poPriceFor") + " " + sPriceUnit + " "  + UnitName;
				return sValue;
			}
			
		},
		
		formatMapUrl: function(sHouseNo, sStreet, sZip, sCity, sRegion, sCountry) {
			
			if ((sHouseNo!=null) && (sStreet!=null) && (sZip!=null) && (sCity!=null) && (sRegion!=null) && (sCountry!=null)) {	
				
				var sFrame="<iframe width='100%' height='100%' src='https://www.google.com/maps/embed/v1/place?key=AIzaSyBZmGvj3AIzVqCX_GueyePYPBzTFXKfb0g&zoom=17&q="
					+ jQuery.sap.encodeURL(sHouseNo + " " + sStreet + ", " + sZip + " " + sCity + ", " + sRegion + ", " + sCountry) +		
					"'/>";
				
				return sFrame;
			}
			
		},
		
		showPDF: function(sID) {
			
			if (sID!=null) { 
				
				switch (sID) {
				
					case '1254-586925-2475': var sPDF = "http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"; break;
					case '4567-567952-8557': var sPDF = "http://advancedlinuxprogramming.com/alp-folder/alp-apF-gnu-public-license.pdf"; break;
					case '6845-815465-7836': var sPDF = "https://arxiv.org/ftp/arxiv/papers/1302/1302.6159.pdf"; break;
					case '8567-347632-8375': var sPDF = "https://www.tutorialspoint.com/sap_fiori/sap_fiori_tutorial.pdf"; break;
					
				}
				
				var sFrame="<iframe src='https://mozilla.github.io/pdf.js/web/viewer.html?file=" + sPDF + "' width='100%' height='100%' />";
				
				return sFrame;				
				
				}
		}
		
	};
});