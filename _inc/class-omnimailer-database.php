<?php

namespace OmniMailer;

if( ! defined( 'ABSPATH' ) )
	exit;

/**
 * The database functionality of the plugin.
 *
 * Performs database setup and updates and offers database helper methods
 * to insert, retrieve, update and delete entries as well as clean up
 * disused entries.
 *
 * @since      0.0.1
 * @package    OmniMailer
 * @subpackage OmniMailer/_inc
 * @author     Julian Hartmann <jh@steakbanana.com>
 */
class OmniMailer_Database {

	private static function get_table() {
		global $wpdb;

		return $wpdb->prefix . "omnimailer_optin";
	}

	private static function get_charset_collate() {
		global $wpdb;

		return $wpdb->get_charset_collate();
	}

	private static function get_version() {
		return '1.1';
	}

	public static function setup() {
		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

		$sql = self::get_create_table_sql();

		$installed_ver = get_option( "omnimailer_db_version" );

		dbDelta( $sql );

		$db_version = self::get_version();

		if ( $installed_ver === $db_version )
			add_option( 'omnimailer_db_version', $db_version );
		else
			update_option( "omnimailer_db_version", $db_version );

	}

	private static function get_create_table_sql(): string {
		$table = self::get_table();
		$charset_collate = self::get_charset_collate();

		return "CREATE TABLE $table (
			id mediumint(9) NOT NULL AUTO_INCREMENT,
			email text NOT NULL,
			name text,
			requested datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
			uuid varchar(36) NOT NULL,
			opted_in datetime,
			service text NOT NULL,
			list text,
			PRIMARY KEY  (id)
		) $charset_collate;";
	}

	/**
	 * Inserts a new entry into the database.
	 *
	 * @param string $email   A valid e-mail address.
	 * @param string $provider The e-mail provider used for API calls.
	 * @param string $list    The list the subscriber will be added to.
	 * @param string $name    The subscriber's first or full name.
	 *
	 * @since 0.0.1
	 */
	public static function insert( $email, $provider, $list, $name = null ) {
		global $wpdb;

		$data = array(
			'email'     => $email,
			'name'      => $name,
			'requested' => current_time( 'mysql' ),
			'uuid'      => wp_generate_uuid4(),
			'provider'   => $provider,
			'list'      => $list
		);

		$wpdb->insert( self::get_table(), $data );

		$response = array();

		if ( $wpdb->insert_id ) {
			$response['code'] = 200;
			$response['email'] = $data['email'];
			$response['name'] = $data['name'];
			$response['uuid'] = $data['uuid'];
		}
		else {
			$response['code'] = 503;
		}

		return array(
			'response' => $response
		);
	}

	public static function update( $uuid ) {
		global $wpdb;

		$data = array(
			'opted_in' => current_time( 'mysql' )
		);

		$response = array();

		$update = $wpdb->update( self::get_table(), $data, array( 'uuid' => $uuid, 'opted_in' => null ) );

		if ( $update ) {
			$response['code'] = 200;
		}
		else {
			$response['code'] = 503;
		}

		return array(
			'response' => $response
		);
	}

	/**
	 * @param array $where
	 * @param array $update
	 */
	public static function update_row( $where, $update ) {
		global $wpdb;

		$response = array();
		$table = self::get_table();

		if ( $wpdb->update( $table, $update, $where ) ) {
			$response['code'] = 200;

			$query = "SELECT * FROM {$table} WHERE ";
			$i = 1;

			$where_count = 0;

			foreach( $where as $key => $value ) {
				if( ! empty( $update[$key] ) ) {
					continue;
				}
				elseif( ! is_null( $value ) ) {
					$value = " = '%" . $i . "\$s'";
					$where_count++;
				}
				else {
					$value = ' IS NULL';
					unset( $where[$key] );
				}

				if( $i === 1 )
					$query .= $key . $value;
				else
					$query .= ' AND ' . $key . $value;
				$i++;
			}

			$query = $wpdb->prepare(
				$query, $where_count > 1 ? array_values( $where ) : array_values( $where )[0]
			);

			$response['row'] = $wpdb->get_row( $query );
		}
		else {
			$response['code'] = 503;
		}

		return array(
			'response' => $response
		);
	}

	public static function getEntryByParam( $param, $name ) {
		global $wpdb;

		$table = self::get_table();

		$query = $wpdb->prepare(
			"SELECT * FROM {$table} WHERE {$name} = %s", $param
		);

		return $wpdb->get_row( $query );
	}

	/**
	 * Retrieves database entries that are older than two days or
	 * finished the opt-in process.
	 *
	 * @since 0.0.1
	 */
	public static function getOldEntries() {
		global $wpdb;

		$table = self::get_table();

		return $wpdb->get_results( "SELECT * FROM {$table} WHERE requested < now() - interval 2 day OR opted_in IS NOT NULL" );
	}

	/**
	 * Removes disused entries from the database.
	 *
	 * @since 0.0.1
	 */
	public static function cleanup() {
		$old_entries = self::getOldEntries();

		foreach( $old_entries as $entry ) {
			self::delete( $entry->id );
		}
	}

	public static function delete( $id ) {
		global $wpdb;

		$table = self::get_table();

		$wpdb->delete(
			$table, array(
				'id' => $id
			)
		);
	}

}