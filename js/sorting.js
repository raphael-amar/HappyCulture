/***************************************
			    GLOBAL VARS
*****************************************/

var htmlProperties = {
	"filterButton": {
		"cssColors"       : new Array("#bcab39", "#5acc98", "#fd1d7d", "#4765f7", "#31c344", "#86fde7", "#C993FF"),
		"applyColors"     : null
	}
};

var app = {
	"data" : {
		"formatedObjects" : {},
		"saveHTML"		  : null,
		"rowCount"        : 10,
		"offset"          : 0,
		"ajaxData"		  : null,
		"url"			  : null,
		"date"			  : new Date()
	},
	"iterators" : {
		"swipe"			  : 0
	},
	"html" : {
		"description"	  : null,
		"events"		  : null
	}
};

var structureCibulEventObject = {
	"uid"	: "id",
	"freeText fr" : "subdescription",
	"description fr" : "description",
	"tags fr" : "tags",
	"title fr" : "title",
	"image" : "picture",
	"link" : "link"
};

var structureCibulDateObject = {
	"timeStart"	: "timeStart",
	"timeEnd"	: "timeEnd"
};

var structureCibulLocationObject = {
	"placename" : "placename",
	"longitude" : "longitude",
	"latitude" 	: "latitude"
};

var structureCibulProgramsObject = {
	"title"		: "title",
	"image"		: "picture",
	"description" : "description"
}

var relations = {
	"locations": "FormatedLocations",
	"dates" : "FormatedDates",
	"programs": "FormatedPrograms"
};

/*****************************************
			OBJECT CONSTRUCTORS
*****************************************/

/**
	Le formatage objet doit posséder un objet 'structure'
	qui représente ce que l'on attend comme structure avec
	la structure de l'objet en construction. Pour des niveaux
	de profondeurs n, il suffit juste de rajouter un espace
	dans le premier champ. Exemple : 

	var structureCibulEventObject = {
	"uid"	: "id",
	"title fr" : "title",
	"freeText fr" : "description",
	"photo" : "picture"};

	L'objet doit également avoir un champs relations qui 
	indique toutes les relations avec celui-ci ou les objets
	plus profonds. Exemple :

	var relations = {
	"locations": "FormatedLocations",
	"dates" : "FormatedDates"}; 
};
*/

function FormatedPrograms() {
	this.description;
	this.image;
	this.title;
	this.structure = structureCibulProgramsObject;
}

function FormatedLocations() {
	this.placename;
	this.longitude;
	this.latitude;
	this.dates = new Array();
	this.relations = relations;
	this.structure = structureCibulLocationObject;
}

function FormatedDates() {
	this.timeStart;
	this.timeEnd;
	this.structure = structureCibulDateObject;
}

function FormatedEvent() {
	this.id;
	this.title = "Titre en cours de construction";
	this.subtitle = "Pas encore de sous titre pour cet évènement";
	this.description = "Pas encore de description";
	this.subdescription = "Pas encore de description secondaire";
	this.tags;
	this.link;
	this.picture = "img/default.jpg";
	this.smallpicture;
	this.locations = new Array();
	this.programs = new Array();
	this.relations = relations;
	this.structure = structureCibulEventObject;
	this.isSet = function (field) {
		if (field === "undefined" || (field.length && field.length == 0))
			return false;
		return true;
	};
}

/*****************************************
			  UTILS FUNCTIONS
*****************************************/

function getAjaxData(myUrl, myDataType, handleData) {
	 $.ajax({
		url: myUrl,
		dataType : myDataType,
		success: function(data) {
			if (!data) {
				console.log('error on getAjaxData : data is empty');
			}
			handleData(data);
		},
		error: function(e, xhr) {
			alert('Le contenu est en cours de mise à jour');
		}
	});
}

function recursiveAssembly(chunk, currentObject, saveArrayName, concatField, isArray, relations)
{
	for (field in chunk)
	{
		var nonFormatedField;
		concatField != null ? nonFormatedField = concatField + " " + field : nonFormatedField = field;
		if (chunk[field] instanceof Array && currentObject[field])
			currentObject[field] = recursiveAssembly(chunk[field], currentObject[field], field, nonFormatedField, true, currentObject.relations);
		else if (chunk[field] instanceof Object)
		{
			if (!isArray)
				currentObject = recursiveAssembly(chunk[field], currentObject, saveArrayName, nonFormatedField, false, null);
			else
				currentObject.push(recursiveAssembly(chunk[field], new this[relations[saveArrayName]](), saveArrayName, null, false, null));
		}
		else
			currentObject[currentObject.structure[nonFormatedField]] = chunk[field];
	}
	return currentObject;
}

function formatAjaxData(data, modelObject) {
	if (!data instanceof Object)
		console.log('error on formatAjaxData : data is not an Object');
	return recursiveAssembly(data, modelObject, null, null, false, null);
}

function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

/*****************************************
			   PLUGIN JQUERY
*****************************************/

(function($)
{ 
    $.fn.colorBackground = function(colorHexaArray)
    {
    	if (colorHexaArray !== "undefined" && Array.isArray(colorHexaArray))
    	{
    		var i = 0;
    		var first = true;
    		return $(this).each(function() {
    			if (first == false)
    			{
    				$(this).find('a').css("background-color", colorHexaArray[i]);
    				i++;
    			}
    			first = false;
    		});
    	}
    	else
    		console.log('error on colorBackground function : parameter is An array of Hexadecimal colors');
   	};
})(jQuery);

/*****************************************
 DURING CONSTRUCTION OF DOCUMENT (JQUERY)
*****************************************/

$(document).ready(function() {

	if ($(window).width() < 1400)
		{$('.inner_content').addClass('container wrapper');}
	else
		$('.element_content').css("margin-left", "1%");
	$('#options ul li').colorBackground(htmlProperties.filterButton.cssColors);

	app.data.url = "scriptsPhp/controller.php?row_count="
			+ app.data.rowCount.toString() + "&offset="
			+ app.data.offset.toString();
});

var makeEvent = function (url) {
			getAjaxData(url, 'json', function(ajaxData) {
			var htmlEvents = "";
			var formatedObjects = new Array();
			for (object in ajaxData.data)
			{
				var formatedObject = formatAjaxData(ajaxData.data[object], new FormatedEvent());
				/*console.log(formatedObject);*/
				htmlEvents += generateHTMLEvents(formatedObject);
				formatedObjects.push(formatedObject);
			}
			if (!localStorage['items'])
				localStorage.setItem('items', JSON.stringify(formatedObjects));
			else
			{
				var items = JSON.parse(localStorage.getItem("items"));
				for (object in formatedObjects)
						items.push(formatedObjects[object]);
				localStorage.setItem('items', JSON.stringify(items));
			}
			$(".projects").append(htmlEvents);
			doIsotope();
		});
};

//------------------------------------------------------------------------------

$(window).load(function() {
	try {
			makeEvent(app.data.url);
			infiniteScroll();
		} catch(e) {console.log("Problem on isotope plugin : " + e.message);}
	
});

$(".bonus").click(function() {
	getAjaxData("bonus.html", null, function(ajaxData) {
		if (app.html.events == null)
			app.html.events = $('.content').html();
		changePage(ajaxData, null, null);
	});
});

function changePage(html, item, save) {
	$('.content').fadeOut(300, function() {
	{
		if (typeof(save) != "undefined")
			app.data.saveHTML = save;
		$('.content').empty();
		$('.content').append(html);
		if (typeof(item) != "undefined"  && item != null)
			generateHTMLDescription(item);
	}
	$('.content').fadeIn(300);
	$('html, body').animate({scrollTop: $(window).scrollTop()}, 1000);
	});
}

function lastContent()
{
	$('.content').empty();
	$('.content').append(app.html.events);
	app.html.description = null;
	doIsotope();
	infiniteScroll();
}

function generateDescription(id) {
	getAjaxData("fiche.html", null, function(ajaxData) {
		app.html.events = $('.content').html();
		app.html.description = ajaxData;
		changePage(ajaxData, extractItemFromId(id), app.html.events);
	});
}

function reduceString(str, length)
{
	if (str.length > length) return str.substr(0, length);
	else return str;
}

function extractItemFromId(id)
{
	var items;
	if (localStorage['items'])
		items = JSON.parse(localStorage['items']);
	else
		console.log('on extractItemFromId : localStorage isn\'t set !');
	for (item in items)
	{
		if (items[item].id == id)
			return items[item];
	}
}

function extractLieu(string)
{
	return string.split(',');
}

function extractDateOnString(dateTable)
{
	var str = "";

	for (var i = 1; i < dateTable.length; i++)
	{
		str += dateTable[i];
		
	}
	return str;
}

function extractLimitedDate(dateTable)
{
	var str = "";

	for (var i = 1; i < dateTable.length; i++)
	{
		if (i == 1)
			str += dateTable[i].substr(0, 4);
		else if (i == 2)
			str += dateTable[i].substr(0, 5) + " " + dateTable[i].split(' ')[2] + " ";
		else if (i == 3)
			str += dateTable[i].substr(3);
		else
			str += dateTable[i];
	}
	return str;
}

/** A refaire next et previous
*/
function nextLocation()
{
	var $ite = 0;

	$locationState++;
	if (!$locations[$locationState])
	{
		$locationState = 0;
		return false;
	}
	for (var field in $locations)
	{
		if ($ite == $locationState)
			{
				console.log('on change de paradigme');
			}
		$ite++;
	}
}

function previousLocation()
{
	var $ite = 0;

	$locationState--;
	if (!$locations[$locationState])
	{
		$locationState = 0;
		return false;
	}
	for (var field in $locations)
	{
		if ($ite == $locationState)
			{
				console.log('on change de paradigme');
			}
		$ite++;
	}
}

function infiniteScroll()
{	
	var deviceAgent = navigator.userAgent.toLowerCase();
	var agentID = deviceAgent.match(/(iphone|ipod|ipad|android|iemobile|ppc|smartphone|blackberry|webos|)/);
	$(window).data('ajaxready', true);
	$(window).scroll(function()
	{
		if(($(window).scrollTop() + $(window).height()) == $(document).height()
		   || agentID && ($(window).scrollTop() + $(window).height()) + 150 > $(document).height())
		{
			if (app.html.description != null)
				return;
			currentTime = new Date();
			if ((currentTime.getTime()- app.data.date.getTime()) > 1000) {app.data.date = new Date();}
			else
				return;
			if ($(window).data('ajaxready') == false) return;
			app.data.offset += 10;
			if (localStorage['items'] && $(window).width() > 1400)
				localStorage.setItem('offset', JSON.stringify(app.data.offset));
			app.data.url = "scriptsPhp/controller.php?row_count=" 
			+ app.data.rowCount.toString() + "&offset=" 
			+ app.data.offset.toString();
			var save = $('.content').html();
			$('.content').empty();
			$('.content').append(save);
			makeEvent(app.data.url);
		}
	});
};

function doIsotope()
{
	var $container = $('.projects');

		$container.isotope({
		resizable:false,
		masonry: {
			columnWidth:$container.width() / 12
		}
	});
		
	$(window).smartresize(function()
	{
		$container.isotope({
			masonry: {
				columnWidth:$container.width() / 12
			}
		});
	});

	$container.isotope({
		itemSelector:'.element',
		animationOptions: {
			duration:100,
			easing:'linear',
			queue:true
		}
	});

	var $optionSets=$('#options .option-set'),
	$optionLinks = $optionSets.find('a');	
	$optionLinks.click(function()
		{
			var $this=$(this);
			if($this.hasClass('selected'))
				{
					return false;
				}
			var $optionSet = $this.parents('.option-set');
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');
			var options={}
				,key=$optionSet.attr('data-option-key')
				,value=$this.attr('data-option-value');
			value = value === 'false' ? false : value;
			options[key]=value;
			if(key === 'layoutMode' && typeof changeLayoutMode === 'function') {
					changeLayoutMode($this,options)
				} else {
				$container.isotope(options)
			}
			return false
		});
	$("#options .option-set li:eq(0) a").trigger("click");
}