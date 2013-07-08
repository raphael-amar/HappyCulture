$(document).ready(function(){	

/***************************************************
	MENU
***************************************************/
	$("<select />").appendTo("nav#main_menu div");
	
	// Create default option "Go to..."
	$("<option />", {
	   "selected": "selected",
	   "value"   : "",
	   "text"    : "choose a page"
	}).appendTo("nav#main_menu select");	
	
	// Populate dropdowns with the first menu items
	$("nav#main_menu li a").each(function() {
	 	var el = $(this);
	 	$("<option />", {
	     	"value"   : el.attr("href"),
	    	"text"    : el.text()
	 	}).appendTo("nav#main_menu select");
	});
	
/***************************************************
	RESPONSIVE MENU
***************************************************/		
  	$("nav#main_menu select").change(function() {
    	window.location = $(this).find("option:selected").val();
  	});
  });