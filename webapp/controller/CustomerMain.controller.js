sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("OFFMarketStartupWeekend.controller.CustomerMain", {
	    
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
    	
    	onAfterRendering: function() {
    	    //this.getView().setBusy(true);
            //this.fnLoadTasksFromServer(this);
            this.onOpenDialog();
    	},
    	
    	handleListItemPress : function (evt) {
    		var filters = [];
    		var sFilter;
    		var query = evt.getSource().getProperty('title');
    		var oModel = sap.ui.getCore().byId("app").getModel();
    		
    		//Just check if the binding has been correctly done
    		console.log(query);
    		console.log(oModel);
    		
    		if (query && query.length > 0) {
    			
    			sFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.EQ, query);
    		    filters.push(sFilter);
    		}
    		
    		sap.ui.getCore().byId("app").to("ProductList");
    	},
	    
    	handleNavButtonPress : function (evt) {
    		this.nav.back("Main");
    	},
    	
    	onOpenDialog : function () {
			//getOwnerComponent is a helper method to call the Component.js
			//helloDialog is available due the addDependent
			//calls the open method available in HelloDialog.js
			//Indicates that this is the view to dialog will be assigned
			this.getOwnerComponent().helloDialog.open(this.getView());
		}

	});

});