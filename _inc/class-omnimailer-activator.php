<?php

namespace OmniMailer;

/**
 * Fired during plugin activation.
 *
 * This class sets up default options and prepares the database.
 *
 * @since      0.0.1
 * @package    OmniMailer
 * @subpackage OmniMailer/_inc
 * @author     Julian Hartmann <jh@steakbanana.com>
 */
class OmniMailer_Activator {

	public static function activate() {
		$defaults = array(
			'mailgun' => array(
				'region' => 'us',
				'api_key' => '',
				'domain'=> '',
			),
			'double_opt_in' => '0',
			'use_honeypot' => '1',
		);

		if ( ! get_option( 'omnimailer' ) )
			add_option( 'omnimailer', $defaults );

		OmniMailer_Database::setup();
	}

}