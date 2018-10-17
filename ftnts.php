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

		add_filter('mce_css', function ($stylesheets) {
			$css = plugins_url("public/css/mce.css", __FILE__);
			$ret = $stylesheets .= "," . $css;
			return $ret;
		});

		add_action('admin_head', function () {
			$data = ["pluginRoot" => plugins_url("", __FILE__)];
			echo '<script type="text/javascript"> var ftnts = ' . json_encode($data) . ';</script>';
		});

		add_filter("mce_external_plugins", function ($plugin_array) {
			$plugin_array["ftnts"] = plugins_url('/public/js/mce.js', __FILE__);
			return $plugin_array;
		});

		add_filter("mce_buttons", function ($buttons) {
			array_push($buttons, "ftnts");
			return $buttons;
		});

		add_filter('tiny_mce_before_init', function ($init) {
			// Command separated string of extended elements
			$ext = 'ftnt[*]';
			// Add to extended_valid_elements if it alreay exists
			if (isset($init['extended_valid_elements'])) {
				$init['extended_valid_elements'] .= ',' . $ext;
			} else {
				$init['extended_valid_elements'] = $ext;
			}

			return $init;
		});

		add_shortcode('ftnts', [$this, "frontend_shortcode"]);
		add_filter('the_content', [$this, "content_filter"], 12);
	}

	public function content_filter($the_content) {
		$ftnts = "<div class='ftnts-footnotes'>";
		foreach ($this->ftnts as $id => $content) {
			$ftnts .= "<div class='ftnts-footnote' data-ftnts-id='" . $id . "'>" . $content . "</div>";
		}
		$ftnts .= "</div>";
		return $the_content . $ftnts;
	}

	public function frontend_shortcode($atts, $content = "") {
// 		var_dump($this->ftnts);
		$this->ftnts[$atts["id"]] = $atts["content"];
		return "<span class='ftnts-marker' data-ftnts-for='" . $atts["id"] . "'></span>";
	}
}

// Initalize
$Ftnts = new Ftnts();
