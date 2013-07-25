/*****************************************
			  HTML GENERATORS
*****************************************/

function generateHTMLEvents(object) {
	if (object == null || object === "undefined") 
		{console.log("object on generateHTMLEvents is null or undefined"); return false;}
	var category = generateCategory(object);
	var background = generateColor(object);
	var content = generateContent(object);
	var title = generateTitle(object);
	var img;
	(object.picture != null && object.picture != "undefined") ? img = object.picture : img = "img/default.jpg";
	return "<div class=\"span3 element " + category + "\" data-category=\"" + category + "\" onclick=\"generateDescription(" + object.id + ")\">"
		+            "<div class=\"hover_img\">"
		+                "<a data-toggle=\"modal\" class=\"pinchin\" href=\"#myModal\"><img src=\"" + img + "\"style=\"width:370px;height:278px;\"alt=\"" + title + "\" /></a>"
		+                "<span class=\"portfolio_link\"><a data-toggle=\"modal\" href=\"#myModal\">Voir la fiche</a></span>"
		+            "</div>"
		+			"<div class=\"item_description\" style=\"color: #3D3D3D; background-color: " + background + "\">"
		+ 				"<a><span>" + title + "</span></a><br/>"
		+				content + '<br/>'
		+            "</div>"
		+		"</div>";
}

//----------------------------------------------------------------------------------------------------------------------------------

function generateHTMLDescription(item)
{
	if (typeof(item) == "undefined") {console.log("item undefined on description");}
	item.title ? $('.title').html(item.title) : console.log("generateHTMLDescription : title not set");
	item.description ? $('#subdescription').html(item.description) : console.log("generateHTMLDescription : description not set");
	item.subdescription ? $('.freeText').append(item.subdescription.replace('\\n', '<br/>')) : console.log("generateHTMLDescription : subdesc not set");
	item.picture ? $('.imagethumb').attr('src', item.picture).css('width', "270px").css('height', "178px") : console.log("generateHTMLDescription : picture not set");
	if (item.programs) {
		for (programs in item.programs) {
			item.programs[programs].title ? $("#myModalLabel").html(item.programs[programs].title) : console.log("No title set on event's program");
			item.programs[programs].description ? $("#contentmodal").html(item.programs[programs].description) : console.log("No description set on event's program");
			item.programs[programs].picture ? $("#modal").attr("src", item.programs[programs].picture) : console.log("No picture on event's program");
		}
	}
	var qrcode = new QRCode(document.getElementById("qrcode"), 
		{
			text: item.link,
			width: 210,
			height: 210,
			correctLevel: QRCode.CorrectLevel.L
		});
	$('#map').css('max-width', '100%').css('height', '190px').css('margin-top', '10px').css('width', '270px');
	var longitude = 3.8767160;
	var latitude = 43.6107690;
		for (locationCibul in item.locations) {
			longitude = item.locations[locationCibul].longitude;
			latitude = item.locations[locationCibul].latitude;
		}

	normalGoogleMap(latitude, longitude);
}

function generateRandom(nb)
{
	return Math.floor((Math.random() * nb) + 1);
}

function generateTitle(object)
{
	var title = "";
	if (!object.title)
		return null;
	 var temp = document.createElement("div");
  	temp.innerHTML = object.title;
  	title = temp.childNodes[0].nodeValue;
  	temp.removeChild(temp.firstChild)
	if ($(window).width() < 1400)
		{
			title = reduceString(title, 35);
		}
	else {
		if (title.length >= 55) {
			title = reduceString(title, 55);
		}
	}
	if (title.length <= 37)
		title += "<br/>";
	title = title.replace(/[\n]/gi, "");
	return title;
}

function generateContent(object)
{
	if (!object.spacetimeinfo)
		return "";
	return object.spacetimeinfo.length < 35 ? object.spacetimeinfo + '<br/>' : object.spacetimeinfo;
	var content = extractLimitedDate(extractLieu(object.spacetimeinfo));
	content += '<br/>';
	lieu = "A: " + extractLieu(object.spacetimeinfo)[0];
	content += reduceString(lieu, 25);
	content = content.replace(/[\n]/gi, '<br/>');
	return content;
}

function generateCategory(object)
{
	if (!object.tags)
		return "autres";
	var category = "";
	var tags = object.tags.split(",");
	for (tag in tags)
	{
		tags[tag] = tags[tag].replace(" ", "");
		tags[tag] = tags[tag].toLowerCase();
		if (isExposure(tags[tag]) == true)
			category += "exposition ";
		else if (isFestival(tags[tag]) == true)
			category += "festival ";
		else if (object.title && object.title.toLowerCase().indexOf("concert") != -1)
			category += "concert";
		else if (isMusic(tags[tag]) == true)
			category += "musique ";
		else if (isTheater(tags[tag]) == true)
			category += "theatre ";
		else if (isSpectacle(tags[tag]) == true)
			category += "spectacle ";
		else if (isConcert(tags[tag]) == true)
			category += "concert ";
	}
	if (category == "")
		category = "autres";
	return category;
}

function generateColor(object)
{
	if (!object.tags)
		return "#ffd700";
	var tags = object.tags.split(",");
	var color = "";
	for (tag in tags)
	{
		tags[tag] = tags[tag].replace(" ", "");
		tags[tag] = tags[tag].toLowerCase();
		if (isExposure(tags[tag]) == true)
			color = "#bcab39";
		else if (object.title && object.title.toLowerCase().indexOf("concert") != -1)
			color = "#86fde7";
		else if (isFestival(tags[tag]) == true)
			color = "#5acc98";
		else if (isMusic(tags[tag]) == true)
			color = "#fd1d7d";
		else if (isTheater(tags[tag]) == true)
			color = "#4765f7";
		else if (isSpectacle(tags[tag]) == true)
			color = "#31c344";
		else if (isConcert(tags[tag]) == true)
			color = "#86fde7";
	}
	if (color == "")
		color = "#C993FF";
	return color;
}

