sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("OFFMarketStartupWeekend.controller.ProductOverview", {
	    
// 	    onInit: function (evt){
// 	       // this.getView().setModel(this.getOwnerComponent().ProductBySector, "Tasks");
	        
// 	    },
	    
// 	    onAfterRendering: function () {
// // 	        var sFilter;
// // 	        var filters = [];
	        
// // 	        var query = this.getOwnerComponent().productSelected;
    		
// //      		if (query && query.length > 0) {
    			
// //      			sFilter = new sap.ui.model.Filter("productName", sap.ui.model.FilterOperator.EQ, query);
// //      		    filters.push(sFilter);
// //      		}
	        
// //             var oModel = this.getView().getModel("Tasks");
// // 			oModel.filter(sFilter);
// 	    },

// 		handleNavButtonPress : function (evt) {
			
//     		this.nav.back("ProductList");
    // 	}
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
    	
    	onBeforeRendering: function() {
    	    this.getView().setBusy(true);
    	    
    	    var filters = [];
     		var sFilter;
     		var query = this.getOwnerComponent().selectedSector;
    		
     		if (query && query.length > 0) {
    			
     			sFilter = new sap.ui.model.Filter("productName", sap.ui.model.FilterOperator.EQ, query);
     		    filters.push(sFilter);
     		}

			//var oList = this.getView().getModel("Tasks");
		//	oList.filter(filters);
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
    	 
			this.getView().invalidate();
			
    		this.nav.back("ProductList");
    	}


	});

});