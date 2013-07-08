<?php
	define('ALL', dirname(__FILE__) . "/../cache/");
	if (!isset($_GET['row_count']))
		echo file_get_contents(ALL . "allcontent.json");
	else
	{
		$fileContent = json_decode(file_get_contents(ALL . "allcontent.json"), true);
		$finalArray = array("data" => array());
		$offset = 0;
		if (isset($_GET['offset']))
			$offset = $_GET['offset'];
		for ($j = $offset; $j < $offset + $_GET['row_count'] && $j < sizeof($fileContent['data']); $j++)
			{
					array_push($finalArray["data"], $fileContent['data'][$j]);
			}
			echo json_encode($finalArray);
	}
?>