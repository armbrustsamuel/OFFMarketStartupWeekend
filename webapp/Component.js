sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"OFFMarketStartupWeekend/model/models",
	"OFFMarketStartupWeekend/controller/HelloDialog",
	"OFFMarketStartupWeekend/controller/PromotionDialog",
	"OFFMarketStartupWeekend/controller/CatalogDialog"
], function(UIComponent, Device, models, HelloDialog, PromotionDialog, CatalogDialog) {
	"use strict";

	return UIComponent.extend("OFFMarketStartupWeekend.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			//set Dialog
			this.helloDialog = new HelloDialog(); 
			this.helloDialogCompany = new HelloDialog();
			
			this.promotionDialog = new PromotionDialog();
			
			this.catalogDialog = new CatalogDialog();
			
			this.selectedSector = new String();
			
			this.productSelected = new String();
			
			this.ProductBySector = new sap.ui.model.json.JSONModel();
		},
		
		createContent : function() {
    		// create root view
    		var oView = sap.ui.view({
    			id : "app",
    			viewName : "OFFMarketStartupWeekend.view.App",
    			type : "JS",
    			viewData : { component : this }
    		});
    		
    		var i18nModel = new sap.ui.model.resource.ResourceModel({
    		   bundleUrl: "/webapp/i18n/i18n.properties" 
    		});                         
    		oView.setModel(i18nModel,"i18n");
    		
    		return oView;
		}
	});

});