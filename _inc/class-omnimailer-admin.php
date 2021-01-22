<?php

namespace OmniMailer;

if( ! defined( 'ABSPATH' ) )
	exit;

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and adds admin functionality
 * such as the options page, plugin settings as well as handlers
 * for AJAX calls and WP-Cron hooks.
 *
 * @since      0.0.1
 * @package    OmniMailer
 * @subpackage OmniMailer/_inc
 * @author     Julian Hartmann <jh@steakbanana.com>
 */
class OmniMailer_Admin {

	private $plugin_name;
	private $version;

	public function __construct( $plugin_name, $version ) {
		$this->plugin_name = $plugin_name;
		$this->version = $version;
	}

	public function register_styles() {
		wp_enqueue_style( 'omnimailer-admin', OMNIMAILER_URL . 'assets/css/admin.min.css', array(), $this->version );
	}

	public function register_scripts() {
		wp_enqueue_script( 'omnimailer-admin', OMNIMAILER_URL . 'assets/js/admin.js', array(), $this->version, true );
	}

	public function admin_menu() {
		add_options_page( __( 'OmniMailer', 'omnimailer' ), __( 'OmniMailer', 'omnimailer' ), 'manage_options', 'omnimailer', array( $this, 'options_page' ) );
	}

	private function add_options_page( $content_path ) {
		if ( ! include_once OMNIMAILER_DIR . '_inc/options/template-parts/wrapper.php' )
			include_once OMNIMAILER_DIR . '_inc/options/template-parts/error-message.php';
	}

	public function options_page() {
		$this->add_options_page( '_inc/options/general.php' );
	}

	public function mailgun_options_page() {
		$this->add_options_page( '_inc/options/mailgun.php' );
	}

	public function admin_menu_subpages() {
		add_submenu_page( null, 'omnimailer_mailgun', 'omnimailer_mailgun', 'manage_options', 'omnimailer_mailgun', array( $this, 'mailgun_options_page' ) );
	}

	public function register_settings() {
		OmniMailer_Options::register_settings();
	}

	/**
	 * Endpoint for the front-end AJAX calls used during form
	 * submissions.
	 *
	 * @since 0.0.1
	 */
	public function omnimailer_form_ajax_handler() {
		check_ajax_referer( 'ajax_handler_nonce', 'security' );

		switch( $_POST['service'] ) {
			case 'mailgun' :
				OmniMailer_Mailgun::ajax_handler();
				break;
		}
	}

	/**
	 * Endpoint for the front-end AJAX calls used for messages
	 * and notifications.
	 *
	 * @since 0.0.1
	 */
	public function omnimailer_event_ajax_handler() {
		check_ajax_referer( 'ajax_handler_nonce', 'security' );

		switch( $_POST['handle'] ) {
			case 'optin' :
				if( ! empty( $_POST['uuid'] ) ) {

					$where = array(
						'uuid' => $_POST['uuid'],
						'opted_in' => null
					);

					$update = array(
						'opted_in' => current_time( 'mysql' )
					);

					$response = OmniMailer_Database::update_row( $where, $update );

					if( $response['response']['code'] === 200 ) {
						$row = $response['response']['row'];

						switch( $row->service ) {
							case 'mailgun' :
								wp_send_json_success( OmniMailer_Mailgun::opt_in_or_subscribe( $row->email, $row->list, $row->name ) );
								break;
						}
					}
					else
						wp_send_json_error();
				}

				wp_send_json_error( __( 'Opt-in ID not provided.', 'omnimailer' ) );
				break;
		}
	}

	/**
	 * Schedules the WP-Cron event for removing obsolete entries
	 * from the database.
	 *
	 * @since 0.0.1
	 */
	public function db_cron_schedule() {
		if ( ! wp_next_scheduled( 'omnimailer_db_cron_hook' ) ) {
			wp_schedule_event( time() + 10, 'hourly', 'omnimailer_db_cron_hook' );
		}
	}

	/**
	 * Function called by the WP-Cron event to remove obsolete
	 * entries from the database.
	 *
	 * @since 0.0.1
	 */
	public function omnimailer_db_cron_hook() {
		OmniMailer_Database::cleanup();
	}

}