<?php
/**
 * @wordpress-plugin
 * Plugin Name: OmniMailer
 * Description: This plugin connects to various mailing services using their API to manage mailing lists, subscribers and more.
 * Version:     0.1
 * Author:      STEAKBANANA
 * Author URI:  https://www.steakbanana.com/
 * Text Domain: omnimailer
 * Domain Path: /languages
 */

namespace OmniMailer;

// If this file is called directly, abort.
if( ! defined( 'ABSPATH' ) )
	exit;

define( 'OMNIMAILER_VER', '0.1' );
define( 'OMNIMAILER_DIR', plugin_dir_path( __FILE__ ) );
define( 'OMNIMAILER_URL', plugin_dir_url( __FILE__ ) );

/**
 * Require and register autoloader to load classes as they are needed.
 */
require_once OMNIMAILER_DIR . '_inc/class-omnimailer-autoloader.php';
OmniMailer_Autoloader::register();

if( ! function_exists( 'activate_omnimailer' ) ) {
	function activate_omnimailer() {
		OmniMailer_Activator::activate();
	}

	register_activation_hook( __FILE__, __NAMESPACE__ . '\activate_omnimailer' );
}

if( ! function_exists( 'deactivate_omnimailer' ) ) {
	function deactivate_omnimailer() {
		OmniMailer_Deactivator::deactivate();
	}

	register_deactivation_hook( __FILE__, __NAMESPACE__ . '\deactivate_omnimailer' );
}

$omnimailer = new OmniMailer();
$omnimailer->init();