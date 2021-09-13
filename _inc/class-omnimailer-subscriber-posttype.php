<?php

namespace OmniMailer;

if( ! defined( 'ABSPATH' ) )
	exit;

class OmniMailer_Subscriber_PostType {

	private string $plugin_name;
	private string $assets_version;
	private string $post_type;
	private string $taxonomy;
	private array $terms;
	private array $options;

	public function __construct( $plugin_name, $assets_version, $post_type ) {

		$this->plugin_name = $plugin_name;
		$this->assets_version = $assets_version;
		$this->post_type = $post_type;
		$this->taxonomy = 'provider';
		$this->terms = array(
			'mailgun' => array(
				'name' => __( 'Mailgun', 'omnimailer' ),
				'id' => OmniMailer_Options::get_option( 'mailgun_term_id' ),
			)
		);
		$this->options = $this->get_default_options();

	}

	public function enqueue_scripts(  ) {

	}

	/**
	 * Register the post type with WordPress.
	 *
	 * @hook init
	 */
	public function register_post_type(  ) {

	}

	/**
	 * Register the taxonomy with WordPress.
	 *
	 * @hook init
	 */
	public function register_taxonomy(  ) {

	}

	/**
	 * Saves custom meta information provided by our meta boxes.
	 *
	 * @hook save_post
	 */
	public function save_postmeta( $post_id ) {

	}

	/**
	 * Adds custom meta information boxes to the custom post type editor window.
	 *
	 * @hook add_meta_boxes
	 */
	public function add_meta_boxes() {

		add_meta_box(
			'subscriber-settings',
			__( 'Subscriber Information', 'omnimailer' ),
			array( $this, 'get_meta_box' ),
			'normal',
			'high',
		);

	}

	/**
	 * Renders the HTML of a custom meta box.
	 *
	 * @param $post
	 */
	public function get_meta_box( $post ) {

	}

	private function get_default_options() {

		return array(
			'test' => 'TEST',
		);

	}

}