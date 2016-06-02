sap.ui.define([
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator"
	], function( Filter, FilterOperator ) {
	"use strict";
	return {
		filterData: function(oEvent) {
			var aFilter = [];
			var sQuery = oEvent.getParameter("newValue");
			if (sQuery) {
				aFilter.push(new Filter("productName", FilterOperator.Contains, sQuery));
			}
			
			return aFilter;
		}
	};
});