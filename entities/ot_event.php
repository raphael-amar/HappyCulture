<?php

class title {
	public $fr;

	public function __construct($content)
	{
		$this->fr = $content;
	}
}

class tag {
	public $fr;

	public function __construct($content)
	{
		$this->fr = $content;
	}
}

class description {
	public $fr;

	public function __construct($content)
	{
		$this->fr = $content;
	}
}

class freeText {
	public $fr;

	public function __construct($content)
	{
		$this->fr = $content;
	}
}

class OtEvent {
	public $uid;
	public $tags;
	public $title;
	public $image;
	public $spacetimeinfo;
	public $description;
	public $freeText;

	public function __construct($tags, $title, $image, $spacetimeinfo, $description, $freeText)
	{
		$this->uid = rand(1,100000);
		$this->tags = new tag($tags);
		$this->title = new title($title);
		$this->image = $image;
		$this->spacetimeinfo = $spacetimeinfo;
		$this->description = new description($description);
		$this->freeText = new freeText($freeText);
	}
}

?>