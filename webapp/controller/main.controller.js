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
    		
    		this.getOwnerComponent().promotionDialog.open(this.getView());
    		
    		this.nav.to(sPath, oContext);
    	},
    	
    	onAfterRendering: function() {
    	    //this.getView().setBusy(true);
            //this.fnLoadTasksFromServer(this);
            //this.onOpenDialog();
    	},
    	
    	onOpenDialog : function () {
			//getOwnerComponent is a helper method to call the Component.js
			//helloDialog is available due the addDependent
			//calls the open method available in HelloDialog.js
			//Indicates that this is the view to dialog will be assigned
			//this.getOwnerComponent().helloDialogCompany.open(this.getView());
		}
	    
	});

});