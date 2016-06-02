sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"OFFMarketStartupWeekend/model/filter"
], function(Controller, MessageToast, filter) {
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
    	
    	onFilterInvoices : function(oEvent) {
			
			//Building Filter - calling external method
			var aFilter = filter.filterData(oEvent);
			
			//Filter binding
			var oList = this.getView().byId("SectorList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		
		onBeforeRendering: function () {
			this.onOpenDialog();
		},
    	
    	onAfterRendering: function() {
    	    //this.getView().setBusy(true);
            //this.fnLoadTasksFromServer(this);
            //this.onOpenDialog();
            
            //var sMsg = "PROMOÇÃO RELÂMPAGO!		VERIFIQUE SUAS NOTIFICAÇÕES";
			//MessageToast.show(sMsg);
			
			//window.setTimeout(sMsg, 10000);
    	},
    	
    	onListButtonPress: function() {
    		this.getOwnerComponent().catalogDialog.open(this.getView());
    	},
    	
    	onFlagButtonPress: function() {
    		this.getOwnerComponent().promotionDialog.open(this.getView());
    	},
    	
    	handleListItemPress : function (evt) {

    		var query = evt.getSource().getProperty('title');
    		this.getOwnerComponent().selectedSector = query;
    		
    		this.nav.to("ProductList");
    		
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