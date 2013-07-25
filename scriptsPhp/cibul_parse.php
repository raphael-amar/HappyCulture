<?php 
	require '../cache/cache.class.php';
	define('CACHE', dirname(__FILE__) . "/../cache/JSON/");
	define('THREAD', dirname(__FILE__) . "/../cache/THREAD/");
	ini_set("memory_limit","128M");
	file_put_contents(THREAD . 'threadCibul', "");
	$Cache = new Cache(CACHE, 1024);
	$res = file_get_contents('http://api.cibul.net/v1/events?lat=43.6107690&lng=3.8767160&radius=10000&key=4bc1106de56674b18e6910699525dfe8&lang=fr', true);
	if ($res) {
		$cibul = json_decode($res, true);
		for ($i = 0; $i < sizeof($cibul["data"]); $i++) {
			$programs = file_get_contents("http://api.cibul.net/v1/events/". $cibul["data"][$i]["uid"] . "/programs", true);
			if ($programs)
				$cibul["data"][$i]["programs"] = array();
				$programArray = json_decode($programs, true);
				if ($programArray["programs"])
					array_push($cibul["data"][$i]["programs"], $programArray["programs"][0]);
		}
		print_r($cibul);
		$Cache->write('cibulcache.json', json_encode($cibul));
	}
	unlink(THREAD . "threadCibul");
?>