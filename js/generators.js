function generateRandom(nb)
{
	return Math.floor((Math.random() * nb) + 1);
}

function generateTitle(object)
{
	
	if (!object.title)
		return null;
	 var temp = document.createElement("div");
  	temp.innerHTML = object.title;
  	object.title = temp.childNodes[0].nodeValue;
  	temp.removeChild(temp.firstChild)
	console.log(object.title);
	if ($(window).width() < 1400)
		{
			object.title = reduceString(object.title, 35);
		}
	else {
		if (object.title.length >= 55) {
			object.title = reduceString(object.title, 55);
		}
	}
	if (object.title.length <= 37)
		object.title += "<br/>";
	object.title = object.title.replace(/[\n]/gi, "");
	return object.title;
}

function generateContent(object)
{
	if (!object.spacetimeinfo)
		return "";
	//TODO : GERER LE CAS SPECIFIQUE POUR CIBUL GERER LE SPACEIMEINFO
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

