<?php
/*
Plugin Name: Ftnts
Plugin URI: https://github.com/moritzjacobs/ftnts
Description: Footnotes in Wordpress, the easy way.
Version: 1.0
Author: Moritz Jacobs
Author URI: http://www.moritzjacobs.de
 */

class Ftnts {
	function __construct() {
		$this->ftnts = array();

		// add css to tinymce
		add_filter('mce_css', function ($stylesheets) {
			$css = plugins_url("public/css/mce.css", __FILE__);
			$ret = $stylesheets .= "," . $css;
			return $ret;
		});

		// add css to frontend
		add_filter('wp_footer', [$this, "frontend_css"]);
		add_filter('wp_footer', [$this, "frontend_js"]);

		// add script bridge to admin head
		add_action('admin_head', function () {
			$data = ["pluginRoot" => plugins_url("", __FILE__)];
			echo '<script type="text/javascript"> var ftnts = ' . json_encode($data) . ';</script>';
		});

		// add plugin to tinymce
		add_filter("mce_external_plugins", function ($plugin_array) {
			$plugin_array["ftnts"] = plugins_url('/public/js/mce.js', __FILE__);
			return $plugin_array;
		});

		add_filter("mce_buttons", function ($buttons) {
			array_push($buttons, "ftnts");
			return $buttons;
		});

		add_filter('tiny_mce_before_init', function ($init) {
			$ext = 'ftnt[*]';
			// Add to extended_valid_elements if it alreay exists
			if (isset($init['extended_valid_elements'])) {
				$init['extended_valid_elements'] .= ',' . $ext;
			} else {
				$init['extended_valid_elements'] = $ext;
			}

			return $init;
		});

		// add shortcode for frontend
		add_shortcode('ftnts', [$this, "frontend_shortcode"]);
	}

	/**
	 * Add footnotes to end of content
	 */
	public function render() {
		$ftnts = "<div class='ftnts-footnotes'>";
		foreach ($this->ftnts as $id => $content) {
			$ftnts .= "<div class='ftnts-footnote' data-ftnts-id='" . $id . "'>" . $content . "</div>";
		}
		$ftnts .= "</div>";

		return $ftnts;
	}

	/**
	 * Transform shortcode to html
	 */
	public function frontend_shortcode($atts) {;
		$content = htmlentities($atts["content"]);
		$this->ftnts[$atts["id"]] = $content;
		return "<span class='ftnts-marker' data-ftnts-content='".$content."' data-ftnts-for='" . $atts["id"] . "'></span>";
	}

	public function frontend_css() {
		if(empty($this->ftnts)) { return; }

		$css = dirname(__FILE__) . "/public/css/public.css";
		echo "<style>".file_get_contents($css)."</style>";
	}

	public function frontend_js() {
		if(empty($this->ftnts)) { return; }
		$src = plugins_url('/public/js/public.js', __FILE__);

		echo "<script src='" . $src . "'></script>";
	}
}

// Initalize
global $Ftnts;
$Ftnts = new Ftnts();
