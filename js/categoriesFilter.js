function isExposure(expression)
{
	if (expression == "exposition")
		return true;
	return false;
}

function isFestival(expression)
{
	if (expression == "festival")
		return true;
	return false;
}

function isMusic(expression)
{
 	if (expression == "live" 
		|| expression == "blues" 
		|| expression == "rock" 
		|| expression == "orchestre" 
		|| expression == "pop" 
		|| expression == "rap" 
		|| expression == "punk" 
		|| expression == "jazz" 
		|| expression == "blues"
		|| expression == "musique")
 		return true;
 	return false;
}

function isTheater(expression)
{
	if (expression == "théatre" 
		|| expression == "theatre")
		return true;
	return false;
}

function isSpectacle(expression)
{
	if (expression == "spectacle")
	{
		console.log('on a trouvé un spectacle');
		return true;
	}
	return false;	
}

function isConcert(expression)
{
	if (expression == "concert")
		return true;
	return false;
}