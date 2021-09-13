<?php

namespace OmniMailer;

if( ! defined( 'ABSPATH' ) )
	exit;

/**
 * Provides handling of options.
 *
 * @since      0.0.1
 * @package    OmniMailer
 * @subpackage OmniMailer/_inc
 * @author     Julian Hartmann <jh@steakbanana.com>
 */
class OmniMailer_Options {

	/**
	 * Returns the default options.
	 *
	 * @since 0.0.1
	 */
	public static function get_default_options() {
		return array(
			'mailgun' => array(
				'region' => 'us',
				'api_key' => '',
				'domain'=> '',
			),
			'double_opt_in' => '0',
			'use_honeypot' => '1',
		);
	}

	/**
	 * Returns the full set of options.
	 *
	 * @since 0.0.1
	 */
	public static function get_options() {
		return get_option( 'omnimailer' ) ?: self::get_default_options();
	}

	/**
	 * Returns a single option or a default value.
	 *
	 * @param string $option        The option to be retrieved.
	 * @param string $provider       The e-mail provider the option is attributed to.
	 * @param array $options        An alternate set of options.
	 * @param string|false $default A default value to be returned if the option is not available.
	 *
	 * @since 0.0.1
	 */
	public static function get_option( $option, $provider = null, $options = null, $default = false ) {
		if( is_null( $options ) )
			$options = self::get_options();

		if( ! is_null( $provider ) )
			return $options[$provider][$option] ?: $default;

		return $options[$option] ?: $default;
	}

	public static function validate_options( $options ) {
		$old_options = self::get_options();

		$options = self::validate_mailgun_options( $options );
		$options = self::trim_options( $options );

		/**
		 * Merge to include other options not being saved on this page
		 */
		$options = array_merge( $old_options, $options );

		return $options;
	}

	private static function validate_mailgun_options( $options ) {
		if( ! empty( $options['mailgun'] ) ) {
			$mailgun_api_key = trim( $options['mailgun']['api_key'] );

			if ( ! empty( $mailgun_api_key ) ) {
				$pos = strpos( $mailgun_api_key, 'api:' );

				if ( $pos === 0 ) {
					$mailgun_api_key = substr( $mailgun_api_key, 4 );
				}

				if ( ! preg_match( '(\w{32}-\w{8}-\w{8})', $mailgun_api_key ) ) {
					$pos = strpos( $mailgun_api_key, 'key-' );

					if ( $pos === false || $pos > 4 ) {
						$mailgun_api_key = "key-{$mailgun_api_key}";
					}
				}

				$options['mailgun']['api_key'] = $mailgun_api_key;
			}
		}

		return $options;
	}

	private static function trim_options( $options ) {
		foreach( $options as $key => $value ) {
			if( ! is_array( $value ) )
				$options[$key] = trim( $value );
			else
				$options[$key] = self::trim_options( $value );
		}
		return $options;
	}

	/**
	 * Registers available settings with WordPress. Note that
	 * get_called_class() must be used to call a static method.
	 *
	 * @since 0.0.1
	 */
	public static function register_settings() {
		register_setting( 'omnimailer', 'omnimailer', array( get_called_class(), 'validate_options' ) );
	}

	public static function add_option_text( $label, $id, $name, $value = null, $placeholder = null, $description = '' ) {
		include OMNIMAILER_DIR . '_inc/options/template-parts/input-text-row.php';
	}

	public static function add_option_checkbox( $label, $id, $name, $value = 1, $checked = false, $description = '' ) {
		include OMNIMAILER_DIR . '_inc/options/template-parts/input-checkbox-row.php';
	}

	public static function add_option_select( $label, $id, $name, $region, $options, $description = '' ) {
		include OMNIMAILER_DIR . '_inc/options/template-parts/select-row.php';
	}

}