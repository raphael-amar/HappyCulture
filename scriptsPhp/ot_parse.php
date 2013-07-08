<?php
	require_once("simple_html_dom.php");
	require_once("../entities/ot_event.php");
	set_time_limit(0);
	define('CACHE', dirname(__FILE__) . "/../cache/JSON/");
	define('THREAD', dirname(__FILE__) . "/../cache/THREAD/");
	$file = CACHE . 'otcache.json';
	$thread = THREAD . 'threadOt';
	file_put_contents($thread, "");

	$i = 1;
	$link;

	$allEvents = array(
    "data"  => array());
   
    //array_push($a["data"], $event);
   	//echo json_encode($a);
	for (; $i < 6; $i++)
	{
		$chain = 'http://www.ot-montpellier.fr/agenda-montpellier/periode_' . $i . '.html#contenu';
		$html = file_get_html($chain);
		foreach ($html->find('.actu') as $test)
		{
			$link = $test->find('a', 0)->href;
			$htmlInner = file_get_html($link);
			$test2 = $htmlInner->find('.entete', 0);
			$title = $test2->find('h2 span', 0)->innertext();
			$array = explode("<br />", $test2->find('h4', 0)->innertext());
			$tag;
			$spacetimeinfo;
			if ($array[0])
				$tag = $array[0];
			if ($array[1])
				$spacetimeinfo = $array[1];
			$middle = $htmlInner->find('.style_blok_middle', 0);
			$j = 0;
			$description = "";
			$freeText = "";
			foreach ($middle->find('p') as $desc) {
				$description = $desc->innertext();
				break;
			}
			foreach ($htmlInner->find('.style_blok_middle') as $blok) {
				foreach ($blok->find('p') as $paragraph) {
					$freeText .= '<p>';
					$freeText .= $paragraph->innertext();
					$freeText .= '</p>';
				}
			}
			//echo $freeText;
			//$freeText = implode("", $middle->find('p'));
			$img =  $htmlInner->find('.blok_image img', 0);
			if ($img)
			{
				$img = $img->getAttribute("src");
			}
			$event = new OtEvent($tag, $title, $img, $spacetimeinfo, $description, $freeText);
			if (strpos($title,'Gay') == false && strpos($title,'Visite guidée') == false) 
				array_push($allEvents["data"], $event);
		}
		$html->clear();
	}
	file_put_contents($file, json_encode($allEvents));
	unlink($thread);
?>