<?php

class Cache {
	public $dirname;
	public $duration;

	public function __construct($dirname, $duration) {
		$this->dirname = $dirname;
		$this->duration = $duration;
	}

	public function write($filename, $content) {
		$file = $this->dirname . $filename;
		file_put_contents($file, $content);
	}
	public function read($filename) {
		$file = $this->dirname . $filename;
		if (!file_exists($file))
			return false;
		$lifetime = (time() - filemtime($file)) / 60;
		if ($lifetime > $this->duration) {
			return false;
		}
		return file_get_contents($this->dirname . $filename);
	}
	public function delete($filename) {
		$file = $this->dirname . $filename;
		if (file_exists($file))
			unlink($file);
	}
	public function clear() {
		$files = glob($this->dirname.'*');
		foreach ($files as $file) {
			unlink($file);
		}
	}
}
?>