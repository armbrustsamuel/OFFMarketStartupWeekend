sap.ui.jsview("OFFMarketStartupWeekend.view.App", {

	getControllerName: function () {
		return "OFFMarketStartupWeekend.controller.App";
	},
	
	createContent: function (oController) {
		
		// to avoid scroll bars on desktop the root view must be set to block display
		this.setDisplayBlock(true);
		
		// create app
		this.app = new sap.m.App();
		
		var main = sap.ui.xmlview("Main", "OFFMarketStartupWeekend.view.main");
		main.getController().nav = this.getController();
		this.app.addPage(main, true);
		
		var customer = sap.ui.xmlview("Customer", "OFFMarketStartupWeekend.view.CustomerMain");
		customer.getController().nav = this.getController();
		this.app.addPage(customer, false);
		
		//var productList = sap.ui.xmlview("ProductList", "OFFMarketStartupWeekend.view.ProductList");
		//productList.getController().nav = this.getController();
		//this.app.addPage(productList, false);
		
		
		var company = sap.ui.xmlview("Company", "OFFMarketStartupWeekend.view.CompanyMain");
		company.getController().nav = this.getController();
		this.app.addPage(company, false);
		
		
		// done
		return this.app;
	}
});