<?php
define('CACHE', dirname(__FILE__) . "/../cache/JSON/");
define('ALL', dirname(__FILE__) . "/../cache/");
define('THREAD', dirname(__FILE__) . "/../cache/THREAD/");
set_time_limit(400);

function lockThread()
{
	$threadFiles = glob(THREAD.'*');
	foreach ($threadFiles as $thread)
		{
			if (file_exists($thread))
			{
				sleep(10);
				lockThread();
			}
		}
}

function doSynchronize()
{
	lockThread();
	$cacheFiles = glob(CACHE.'*');
	$allContent;
	$i = 0;
	foreach ($cacheFiles as $file)
	{
		//if (!strpos($file, "cibulcache.json") !== FALSE) {
			//echo $file;
		$fileContent = json_decode(file_get_contents($file), true);
		if ($i == 0)
			$allContent = $fileContent;
		else
		{
			for ($j = 0; $j < sizeof($fileContent['data']); $j++)
			{
					array_push($allContent["data"], $fileContent['data'][$j]);
			}
		}
		$i++;
		//}
	}
	file_put_contents(ALL . 'allcontent.json', json_encode($allContent));	
}
doSynchronize();
?>
