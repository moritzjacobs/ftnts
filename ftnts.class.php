<?php

use moritzjacobs\Ftnts\PluginBase\Main as FtntsBaseClass;

class Ftnts extends FtntsBaseClass {

	function __construct() {
		parent::__construct($this->preferences, __DIR__);
	}
	
	
	/***************************************************
	*
	*  Boilerplate starts here:
	*
	****************************************************
	
	Default settings API overview:
	
	- admin_css: Array of paths to CSS files for the admin
		interface
	
	- public_css: Array of paths to CSS files for the site
	
	- admin_js: Array of paths to JS files for the admin
		interface
	
	- public_js: Array of paths to JS files for the site 
	
	- custom_post_types: associative array of post types
		to register. Value equals options parameter for
		register_post_type(); see:
		http://codex.wordpress.org/Function_Reference/register_post_type
		
		array("my-post-type-slug" => $options)
	
	****************************************************/
	

	private $preferences = array(
		'admin_css' => array("dist/styles/post.css"),
		'public_css' => array("dist/styles/public.css"),
		'admin_js' => array("dist/scripts/admin.js"),
		'public_js' => array("dist/scripts/public.js"),
	);



	public $version = '1.0';


	/***************************************************
	*
	*  This function is called right after a plugin is
	*  activated, but right before a page redirect. It
	*  must not create output!
	*
	****************************************************/
	
	public function activate() {
	

		
	}

	/***************************************************
	*
	*  Init function, add hooks, actions etc. here
	*
	****************************************************/

	private static $ftnts = array();

	public function initialize() {

		$this->add_settings_page("Ftnts Settings", array($this, "load_settings_page"));
		
		add_filter('mce_css', function($stylesheets){
			$css = plugins_url("dist/styles/mce.css", __FILE__);
			$ret = $stylesheets .= "," . $css;
			return $ret;
		});

		add_action('admin_head', function () {
			?>
				<script type="text/javascript">
					var ftnts = {
						"pluginRoot": "<?= plugins_url("", __FILE__)?>",
					};
				</script>
			<?php
		});

		add_filter("mce_external_plugins", function($plugin_array) {
			$plugin_array["ftnts"] =  plugins_url('/dist/scripts/mce.js', __FILE__);
			return $plugin_array;
		});

		add_filter("mce_buttons", function ($buttons) {
			array_push($buttons, "ftnts");
			return $buttons;
		});

		
		add_filter('tiny_mce_before_init', function($init) {
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

		add_shortcode('ftnts', function($atts, $content=""){
			self::$ftnts[$atts["id"]] = $atts["content"];
			return "<span class='ftnts-marker' data-ftnts-for='".$atts["id"]."'></span>";
		});

		add_filter('the_content', function($the_content){
			$ftnts = "<div class='ftnts-footnotes'>";
			foreach(self::$ftnts as $id => $content) {
				$ftnts .= "<div class='ftnts-footnote' data-ftnts-id='".$id."'>".$content."</div>";
			}
			$ftnts .= "</div>";
			return $the_content . $ftnts;
		}, 12);
		
	}





	/***************************************************
	*
	* Examples for action callbacks for PluginBase
	* helper functions 
	*
	****************************************************/

	public function load_settings_page() {
	
		// stupid dog example
		$dogs = array(
		    array("name"=>"Fido", "age"=>4, "color"=>"brown"),
		    array("name"=>"Rex", "age"=>6, "color"=>"black"),
		    array("name"=>"Snoopy", "age"=>2, "color"=>"white"),
		    array("name"=>"Lassie", "age"=>5, "color"=>"golden"),
		);
		
		$this->render("views/admin/dogs.php", array('title'=>"Welcome!", 'dogs'=>$dogs));
	}
	
	public function load_cpt_page() {
		// render view template and extract second parameter array
		$this->render("views/admin/cpt.php", array('title'=>"Foobar Settings"));
	}


}
