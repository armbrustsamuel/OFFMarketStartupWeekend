sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"OFFMarketStartupWeekend/model/filter"
], function(Controller, filter) {
	"use strict";

	return Controller.extend("OFFMarketStartupWeekend.controller.ProductList", {

		oTasksModel : new sap.ui.model.json.JSONModel(),
        sDestinationURL : "offmarketstartupweekend",
    
    	onInit: function() {
    	    var that = this;
    	    
            this.oTasksModel.setData({ 
                taskList : []
            });
            
            this.getView().setModel(this.oTasksModel, "Tasks");
            
            this.getView().addEventDelegate({
    		        onBeforeShow: function () {
    		            that.fnLoadTasksFromServer(that);
    		        }
    		});
    	},
    	
    	//onClose: function() {
    	//	this.getView().close();
    	//},
    	
    	onFilterInvoices : function(oEvent) {
			
			//Building Filter - calling external method
			var aFilter = filter.filterData(oEvent);
			
			//Filter binding
			var oList = this.getView().byId("ProductList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
    	
    	onBeforeRendering: function() {
    	    this.getView().setBusy(true);
    	    
    	    var filters = [];
     		var sFilter;
     		var query = this.getOwnerComponent().selectedSector;
    		
     		if (query && query.length > 0) {
    			
     			sFilter = new sap.ui.model.Filter("sectorName", sap.ui.model.FilterOperator.EQ, query);
     		    filters.push(sFilter);
     		}

			var oList = this.getView().byId("ProductList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(sFilter);
    	},
    
    	onAfterRendering: function() {
    	    this.getView().setBusy(true);
            this.fnLoadTasksFromServer(this);
    	},
    	
    	fnLoadTasksFromServer: function(that){
    	    jQuery.ajax(this.sDestinationURL, {
    	        dataType: "json",
    	        method: "GET",
    			contentType: "application/json; charset=UTF-8",
    			success: that.fnSuccessCallback(that),
    			error: that.fnErrorCallback
    	    });
    	},
    	
    	fnSuccessCallback : function(controller){
    	    return function(data){
    	        var oModelData = controller.oTasksModel.getData();  
    	        oModelData.taskList = data;
    	        controller.oTasksModel.setData(oModelData);
    	        controller.getView().setBusy(false);
    	    };
    	},
    	
    	fnErrorCallback: function(){
    	    console.log("Error!!!");
    	},
    	
    	onTaskClicked: function(oEvent){
    	    this.getView().setBusy(true);
    	    
    	    var that = this;
    	    var sPath = oEvent.getSource().getBindingContextPath();
        	var oSelectTask = this.oTasksModel.getProperty(sPath);
        	oSelectTask.done = !oSelectTask.done;
        	
        	jQuery.ajax(this.sDestinationURL + "/" + oSelectTask.id, {
    	        dataType: "json",
    	        data: JSON.stringify(oSelectTask),
    	        method: "PUT",
    			contentType: "application/json; charset=UTF-8",
    			success: that.fnReloadTasksFromServer(that)
    	    });
    	},
    	
    	fnReloadTasksFromServer: function(that){
    	    return function(){
    	        that.fnLoadTasksFromServer(that);
    	    };
    	},
    	
    	onDeleteClick: function(oEvent){
    	    this.getView().setBusy(true);
    	    
    	    var that = this;
    	    var sPath = oEvent.getParameter("listItem").getBindingContextPath();
        	var oSelectTask = this.oTasksModel.getProperty(sPath);
        	
        	jQuery.ajax(this.sDestinationURL + "/" + oSelectTask.id, {
    	        dataType: "json",
    	        data: JSON.stringify(oSelectTask),
    	        method: "DELETE",
    			contentType: "application/json; charset=UTF-8",
    			complete: that.fnReloadTasksFromServer(that)
    	    });
    	},
    	
    	handleNavButtonPress : function (evt) {
    	    
    	    var sFilter;
            var oList = this.getView().byId("ProductList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(sFilter);
			
			this.getView().invalidate();
			
    		this.nav.back("Customer");
    	},
    	
    	handleListItemPress : function (evt) {
    		var query = evt.getSource().getProperty('title');
    		
    		this.getOwnerComponent().ProductBySector = this.getView().getModel("Tasks");
    		
    		this.getView().invalidate();
    		
    		//this.getView().close();
    		
    		this.nav.to("ProductOverview");
    	}

	});

});