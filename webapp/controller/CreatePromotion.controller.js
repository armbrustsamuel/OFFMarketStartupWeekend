sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("OFFMarketStartupWeekend.controller.CreatePromotion", {
		
		sDestinationURL : "offmarketstartupweekend",
    
	    onSaveClicked: function(){
	        var sProductName = this.getView().byId("productNameInput").getValue();
	        var sSectorName = this.getView().byId("sectorInput").getValue();
	        var sCurrentValue = this.getView().byId("currentValueInput").getValue();
	        var iQuantity = this.getView().byId("quantityInput").getValue();
	        var sDescription = "Cerveja Puro Malte";
 
	        var oTask = {
	            productName :sProductName,
	            sectorName : sSectorName,
	            value : sCurrentValue,
	            quantity : iQuantity,
	            description : sDescription
	        };
	        
	        this.fnSaveTaskOnServer(oTask, this);
	    },
	    
	    onBackClicked: function(){
	        this.getView().byId("productNameInput").setValue("");
	        this.getView().byId("sectorInput").setValue("");
	        this.getView().byId("currentValueInput").setValue("");
	        this.getView().byId("quantityInput").setValue("");
	        this.nav.back("ProductListCompany");
	    },
	    
	    fnSaveTaskOnServer: function(oTask, oController){
	        jQuery.ajax(this.sDestinationURL, {
		        dataType: "json",
		        data: JSON.stringify(oTask),
		        method: "POST",
				contentType: "application/json; charset=UTF-8",
				success: function(){
				    oController.getView().byId("productNameInput").setValue("");
				    oController.getView().byId("sectorInput").setValue("");
	    			oController.getView().byId("currentValueInput").setValue("");
	        		oController.getView().byId("quantityInput").setValue("");
	                oController.nav.back("ProductListCompany");
	                
	                var sMsg = "PROMOÇÃO RELÂMPAGO!		VERIFIQUE SUAS NOTIFICAÇÕES";
					MessageToast.show(sMsg);
					
					window.setTimeout(sMsg, 10000);
				}
		    });
	    }
		
	});

});