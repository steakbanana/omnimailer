<?php

namespace OmniMailer;

if( ! defined( 'ABSPATH' ) )
	exit;

/**
 * OmniMailer core class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      0.0.1
 * @author     Julian Hartmann <jh@steakbanana.com>
 */
class OmniMailer {

	protected $loader;
	protected $plugin_name;
	protected $version;

	public function __construct() {
		$this->version = OMNIMAILER_VER;
		$this->plugin_name = 'omnimailer';

		$this->load_dependencies();
		$this->set_locale();

		/**
		 * Assume that most instantiations are public and only define the admin hooks if they are really required.
		 */
		if( ! is_admin() && ! wp_doing_ajax() && ! wp_doing_cron() )
			$this->define_public_hooks();
		else
			$this->define_admin_hooks();
	}

	private function load_dependencies() {
		$this->loader = new OmniMailer_Loader();
	}

	private function set_locale() {
		$plugin_i18n = new OmniMailer_i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_i18n, 'set_script_translations' );
	}

	private function define_admin_hooks() {
		$plugin_admin = new OmniMailer_Admin( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'register_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'register_scripts' );
		$this->loader->add_action( 'admin_menu', $plugin_admin, 'admin_menu' );
		$this->loader->add_action( 'admin_menu', $plugin_admin, 'admin_menu_subpages' );
		$this->loader->add_action( 'admin_init', $plugin_admin, 'register_settings' );

		$this->loader->add_action( 'wp_ajax_omnimailer_form_ajax_handler', $plugin_admin, 'omnimailer_form_ajax_handler' );
		$this->loader->add_action( 'wp_ajax_nopriv_omnimailer_form_ajax_handler', $plugin_admin, 'omnimailer_form_ajax_handler' );
		$this->loader->add_action( 'wp_ajax_omnimailer_event_ajax_handler', $plugin_admin, 'omnimailer_event_ajax_handler' );
		$this->loader->add_action( 'wp_ajax_nopriv_omnimailer_event_ajax_handler', $plugin_admin, 'omnimailer_event_ajax_handler' );
		$this->loader->add_action( 'omnimailer_db_cron_hook', $plugin_admin, 'omnimailer_db_cron_hook' );

		$plugin_admin->db_cron_schedule();
	}

	private function define_public_hooks() {
		$plugin_public = new OmniMailer_Public( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'register_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'register_scripts' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'localize_scripts' );
		$this->loader->add_action( 'init', $plugin_public, 'add_shortcode' );
		$this->loader->add_action( 'wp_footer', $plugin_public, 'notification_center' );
	}

	public function init() {
		$this->loader->init();
	}

	public function get_plugin_name() {
		return $this->plugin_name;
	}

	public function get_loader() {
		return $this->loader;
	}

	public function get_version() {
		return $this->version;
	}

}