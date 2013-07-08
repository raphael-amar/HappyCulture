<?php 
	require '../cache/cache.class.php';
	define('CACHE', dirname(__FILE__) . "/../cache/JSON/");
	define('THREAD', dirname(__FILE__) . "/../cache/THREAD/");
	file_put_contents(THREAD . 'threadCibul', "");
	$Cache = new Cache(CACHE, 1024);
	$res;
	//if (!$Cache->read('cibulcache.json')) {
		$res = file_get_contents('http://api.cibul.net/v1/events?lat=43.6107690&lng=3.8767160&radius=10000&key=4bc1106de56674b18e6910699525dfe8&lang=fr');
		if ($res)
			$Cache->write('cibulcache.json', $res);
		//echo $res;
	//}
	//else
		//echo $Cache->read('cibulcache.json');
	unlink(THREAD . "threadCibul");
?>