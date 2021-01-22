<?php

namespace OmniMailer;

if( ! defined( 'ABSPATH' ) )
	exit;

/**
 * The Mailgun-specific functionality of the plugin.
 *
 * Provides Mailgun API functionality.
 *
 * @since      0.0.1
 * @package    OmniMailer
 * @subpackage OmniMailer/_inc
 * @author     Julian Hartmann <jh@steakbanana.com>
 */
class OmniMailer_Mailgun {

	public static function ajax_handler() {
		/**
		 * See which API method needs to be called and return an
		 * error if the method is not available.
		 */
		switch( $_POST['api_action'] ) {
			case 'subscribe' :
				wp_send_json_success( self::opt_in_or_subscribe( $_POST['email'], $_POST['list'], $_POST['name'] ) );
				break;
			default:
				wp_send_json_error( __( '(500) API call failed. Please check your network connection or try again later.', 'omnimailer' ) );
		}
	}

	public static function opt_in_or_subscribe( $email, $list, $name ) {

		/**
		 * Retrieve the e-mail address from the post (defined as
		 * 'address' in Mailgun nomenclature) and set up the object
		 * to be passed to the API.
		 */
		$data = array(
			'address' => sanitize_email( $email )
		);

		if( (bool) OmniMailer_Options::get_option( 'double_opt_in' ) ) {

			$entry = OmniMailer_Database::getEntryByParam( $email, 'email' );

			if( empty( $entry ) )
				return self::opt_in( $data, $list, $name );
			elseif( is_null( $entry->opted_in ) ) {
				return array(
					'response' => array(
						'code' => 500,
					),
					'service' => 'mailgun'
				);
			}

			return self::subscribe( $data, $list, $name );
		}

		return self::subscribe( $data, $list, $name );

	}

	private static function opt_in( $data, $list, $name ) {
		$result = OmniMailer_Database::insert( $data['address'], 'mailgun', $list, $name );
		$response = $result['response'];

		if( $response['code'] === 200 ) {
			self::send_opt_in_email( $data['address'], $response['name'], $response['uuid'] );
		}

		return $result;
	}

	/**
	 * Prepare the AJAX data for a new subscription. If double opt-in
	 * is required, check the address against the database and insert
	 * a new entry. If not, make an API call.
	 *
	 * @param array $data
	 * @param string $name
	 * @param string $list
	 *
	 * @since 0.0.1
	 */
	private static function subscribe( $data, $list, $name ) {
		$data['subscribed'] = true;

		$optional = array(
			'name' => ! empty( $name ) ? sanitize_text_field( $name ) : ''
		);

		$data = self::add_optional_fields_to_data( $data, $optional );

		$url = self::get_endpoint() . "lists/{$list}/members";

		return self::call_api( $url, $data );
	}

	/**
	 * Prepare common API parameters and call the Mailgun API.
	 *
	 * @param string $url   The API URL to be called.
	 * @param array $data   The data to be posted to the API.
	 *
	 * @since 0.0.1
	 */
	private static function call_api( $url, $data ) {
		$key = OmniMailer_Options::get_option( 'api_key', 'mailgun' );
		$headers = array(
			'Authorization' => 'Basic ' . base64_encode( "api:{$key}" ),
		);

		$args = array(
			'method'  => 'POST',
			'body'    => $data,
			'headers' => $headers
		);

		$result = wp_remote_request( $url, $args );

		if ( ! is_wp_error( $result ) ) {
			$result['service'] = 'mailgun';
			return $result;
		}

		return $result->get_error_message();
	}

	private static function send_opt_in_email( $recipient, $name, $uuid ) {
		/* translators: %s: Site Name */
		$subject = sprintf( __( 'Please activate your subscription to %s.', 'omnimailer' ), get_bloginfo( 'name' ) );

		ob_start();
		include_once( OMNIMAILER_DIR . 'template-parts/emails/header.php' );
		include_once( OMNIMAILER_DIR . 'template-parts/emails/confirm-double-optin.php' );
		include_once( OMNIMAILER_DIR . 'template-parts/emails/footer.php' );
		$message = ob_get_contents();
		ob_end_clean();

		wp_mail( $recipient, $subject, $message );
	}

	/**
	 * Adds a set of optional data to an existing set of data.
	 *
	 * @param array $data       An existing set of data.
	 * @param array $optional   A set of optional data to be added to the first set.
	 *
	 * @since 0.0.1
	 */
	private static function add_optional_fields_to_data( $data, $optional ) {
		foreach( $optional as $key => $option ) {
			if( ! empty( $option ) )
				$data[$key] = $option;
		}

		return $data;
	}

	public static function get_endpoint() {
		$api_version = self::get_api_version();

		return OmniMailer_Options::get_option( 'region', 'mailgun' ) === 'eu' ? "https://api.eu.mailgun.net/{$api_version}/" : "https://api.mailgun.net/{$api_version}/";
	}

	public static function get_api_version() {
		return 'v3';
	}

}