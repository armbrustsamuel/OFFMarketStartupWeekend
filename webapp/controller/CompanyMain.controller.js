sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("OFFMarketStartupWeekend.controller.CompanyMain", {
	    
        oTasksModel : new sap.ui.model.json.JSONModel(),
		sDestinationURL : "offmarketstartupweekend",
	        
        onInit: function() {
    	    var that = this;
    	    
            this.oTasksModel.setData({ 
                taskList : [
                    {"sectorName":"Bebidas"},
                    {"sectorName":"Bazar"},
                    {"sectorName":"Açougue"},
                    {"sectorName":"Eletrodomésticos"},
                    {"sectorName":"Limpeza"},
                    {"sectorName":"Marcearia"},
                    {"sectorName":"Higiene Pessoal"},
                    {"sectorName":"Hortifruti"},
                    {"sectorName":"Fiambrearia"},
                    {"sectorName":"Rotisseria"},
                    {"sectorName":"Pet"},
                    {"sectorName":"Outros"}
                    ]
            });
            
            this.getView().setModel(this.oTasksModel, "Tasks");
    	},
    	
    	handleListItemPress : function (evt) {

    		var query = evt.getSource().getProperty('title');
    		this.getOwnerComponent().selectedSector = query;
    		
    		this.nav.to("ProductListCompany");
    		
    	},
    	
    	handleNavButtonPress : function (evt) {
    		this.nav.back("Main");
    	},
    	
    	onBeforeRendering: function() {
    		this.onOpenDialog();
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
			this.getOwnerComponent().helloDialogCompany.open(this.getView());
		}

	});

});