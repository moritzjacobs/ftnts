<?php
/*
Plugin Name: Ftnts
Plugin URI: https://github.com/moritzjacobs/ftnts
Description: Footnotes in Wordpress, the easy way.
Version: 1.0
Author: Moritz Jacobs
Author URI: http://www.moritzjacobs.de
*/


require_once('framework/plugin-base.php');
require_once('ftnts.class.php');

// Initalize
$Ftnts = new Ftnts();

// Add an activation hook
register_activation_hook(__FILE__, array(&$Ftnts, 'activate'));

// Run the plugins initialization method
add_action('init', array(&$Ftnts, 'initialize'));
