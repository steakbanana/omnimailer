<?php

namespace OmniMailer;

if( ! defined( 'ABSPATH' ) )
	exit;

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, registers public-facing assets,
 * and makes the form shortcode available.
 *
 * @since      0.0.1
 * @package    OmniMailer
 * @subpackage OmniMailer/_inc
 * @author     Julian Hartmann <jh@steakbanana.com>
 */
class OmniMailer_Public {

	private $plugin_name;
	private $version;

	public function __construct( $plugin_name, $version ) {
		$this->plugin_name = $plugin_name;
		$this->version = $version;
	}

	public function register_styles() {
		wp_register_style( 'omnimailer-form', OMNIMAILER_URL . 'assets/css/form.min.css', array(), $this->version );

		// Always enqueue main styles to ensure availability throughout the site
		wp_enqueue_style( 'omnimailer', OMNIMAILER_URL . 'assets/css/main.min.css', array(), $this->version );
	}

	public function register_scripts() {
		wp_register_script( 'omnimailer-mailgun', OMNIMAILER_URL . 'assets/js/dist/mailgun.js', array(), $this->version, true );
		wp_register_script( 'omnimailer-mailgun-form', OMNIMAILER_URL . 'assets/js/dist/mailgun-form.js', array( 'omnimailer-mailgun-subscribe' ), $this->version, true );
		wp_register_script( 'omnimailer-shortcode', OMNIMAILER_URL . 'assets/js/dist/shortcode.js', array( 'omnimailer-mailgun-form' ), $this->version, true );
		wp_register_script( 'omnimailer-form', OMNIMAILER_URL . 'assets/js/dist/form.js', array( 'omnimailer-mailgun', 'omnimailer-notification-handler', 'wp-i18n' ), $this->version, true );
		wp_register_script( 'omnimailer-mailgun-subscribe', OMNIMAILER_URL . 'assets/js/dist/mailgun-subscribe.js', array( 'omnimailer-mailgun', 'omnimailer-form', 'omnimailer-messages', 'wp-i18n' ), $this->version, true );

		// Always enqueue main and notification scripts to ensure availability throughout the site
		wp_enqueue_script( 'omnimailer-notifications', OMNIMAILER_URL . 'assets/js/dist/notification.js', array(), $this->version, true );
		wp_enqueue_script( 'omnimailer-notification-handler', OMNIMAILER_URL . 'assets/js/dist/notification-handler.js', array( 'omnimailer-notifications', 'wp-i18n' ), $this->version, true );
		wp_enqueue_script( 'omnimailer', OMNIMAILER_URL . 'assets/js/dist/main.js', array( 'omnimailer-notification-handler' ), $this->version, true );
		wp_enqueue_script( 'omnimailer-messages', OMNIMAILER_URL . 'assets/js/dist/messages.js', array( 'omnimailer', 'wp-i18n' ), $this->version, true );
	}

	/**
	 * Make PHP-exclusive variables available to the plugin's
	 * JavaScript files. Actual translations for JavaScript messages
	 * are done using wp-i18n (see referenced method for more info).
	 *
	 * @since 0.0.1
	 * @see OmniMailer_i18n::set_script_translations()
	 */
	public function localize_scripts() {
		$params = array(
			'url' => admin_url( 'admin-ajax.php' ),
			'nonce' => wp_create_nonce( 'ajax_handler_nonce' ),
			'isDoubleOptIn' => OmniMailer_Options::get_option( 'double_opt_in' ),
			'useHoneypot' => OmniMailer_Options::get_option( 'use_honeypot' ),
		);

		wp_localize_script( 'omnimailer', 'omniMailerParams', $params );
	}

	/**
	 * Add a single universal shortcode to display any form.
	 *
	 * @since 0.0.1
	 */
	public function add_shortcode() {
		add_shortcode( 'omnimailer', array( $this, 'do_shortcode' ) );
	}

	public function do_shortcode( $atts ) {
		wp_enqueue_style( 'omnimailer-form' );
		wp_enqueue_script( 'omnimailer-form' );
		wp_enqueue_script( 'omnimailer-shortcode' );

		/**
		 * @var string $service     The e-mail provider used for API calls.
		 * @var string $handle      The action to be performed.
		 * @var string $list        The mailing list to be used.
		 * @var string $has_name    Whether a name is required or not (0|1|mandatory).
		 * @var string $has_labels  Whether each input should be labeled in addition to its placeholder or not (0|1).
		 */
		extract( shortcode_atts( array(
			'service' => null,
			'handle' => null,
			'list' => null,
			'legend' => null,
			'has_name' => '0',
			'has_labels' => '1'
		), $atts ) );

		// Buffer the generated HTML
		ob_start();

		// Enqueue the form script corresponding to the service if available.
		if( ! empty( $service ) ) {
			wp_enqueue_script( "omnimailer-{$service}-form" );

			/**
			 * Enqueue the service script as well as the script for the
			 * action intended if a form template is available.
			 */
			if( ! empty( $handle ) ) {
				if( include OMNIMAILER_DIR . "template-parts/forms/{$service}-{$handle}.php" ) {
					wp_enqueue_script( "omnimailer-{$service}" );
					wp_enqueue_script( "omnimailer-{$service}-{$handle}" );
				}
				else  {
					_e( 'Error while displaying the form - unknown handle or service.', 'omnimailer' );
				}
			}
			else {
				_e( 'Error while displaying the form - missing handle.', 'omnimailer' );
			}
		}
		else {
			_e( 'Error while displaying the form - missing service.', 'omnimailer' );
		}

		return ob_get_clean();
	}

	public function notification_center() {
		include_once OMNIMAILER_DIR . 'template-parts/notifications/notification-center.php';
	}

}