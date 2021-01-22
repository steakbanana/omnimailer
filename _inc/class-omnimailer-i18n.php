<?php

namespace OmniMailer;

if( ! defined( 'ABSPATH' ) )
	exit;

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      0.0.1
 * @package    OmniMailer
 * @subpackage OmniMailer/_inc
 * @author     Julian Hartmann <jh@steakbanana.com>
 */
class OmniMailer_i18n {

	public function load_plugin_textdomain() {
		load_plugin_textdomain( 'omnimailer', false, dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/' );
	}

	/**
	 * Load available script translations.
	 *
	 * This plugin is using the wp-i18n functionality available since
	 * WordPress 5.0. JSON i18n files are created using WP CLI.
	 *
	 * @since 0.0.1
	 */
	public function set_script_translations() {
		wp_set_script_translations( 'omnimailer-form', 'omnimailer' );
		wp_set_script_translations( 'omnimailer-mailgun-subscribe', 'omnimailer' );
	}

}
