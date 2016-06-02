sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("OFFMarketStartupWeekend.controller.ProductOverviewCompany", {
		
		    handleNavButtonPress : function (evt) {
			
			this.getView().invalidate();
			
    		this.nav.back("ProductListCompany");
    	}
		
	});

});