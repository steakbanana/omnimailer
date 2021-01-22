<?php

namespace OmniMailer;

class OmniMailer_Autoloader {

	public static function register( $prepend = false ) {
		if( version_compare( phpversion(), '5.3.0', '>=' ) ) {
			spl_autoload_register( array( new self, 'autoload' ), true, $prepend );
		}
		else {
			spl_autoload_register( array( new self, 'autoload' ) );
		}
	}

	public static function autoload( $class ) {
		if( strpos( $class, 'OmniMailer' ) !== 0 )
			return;

		$file_parts = explode( '\\', $class );

		$file_name = '';
		$namespace = '';

		for( $i = count( $file_parts ) - 1; $i > 0; $i-- ) {
			$current = str_ireplace( '_', '-', strtolower( $file_parts[$i] ) );

			if ( count( $file_parts ) - 1 === $i ) {
				$file_name = "class-$current.php";
			}
			else {
				$namespace = '/' . $current . $namespace;
			}
		}

		if( ! empty( $namespace ) || ! empty( $file_name ) ) {
			$file  = trailingslashit( dirname( dirname( __FILE__ ) ) . '/_inc/' . $namespace ) . $file_name;

			if ( file_exists( $file ) ) {
				include_once( $file );
			}
			else {
				wp_die(
					esc_html__( "The file attempting to be loaded at $file does not exist.", 'omnimailer' )
				);
			}
		}
	}

}