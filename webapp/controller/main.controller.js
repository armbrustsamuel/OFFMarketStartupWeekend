sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("OFFMarketStartupWeekend.controller.main", {
	    
	    handleListItemPress : function (evt) {
    		var oContext = evt.getSource().getBindingContext();//--follow added
    		//var sPath = evt.getSource().getBindingContext().getProperty('title');
    		var sPath = evt.getSource().getProperty('title'); // These two lines works to bindingData
    		if(sPath === "Customer"){ 
    			sPath="Customer";
    		}
    		if(sPath === "Company"){ 
    			sPath="Company";
    		}
    		this.nav.to(sPath, oContext);
    	}
	    
	});

});