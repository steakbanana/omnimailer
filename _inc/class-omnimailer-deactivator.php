<?php

namespace OmniMailer;

/**
 * Fired during plugin deactivation.
 *
 * This class removes the WP-Cron event.
 *
 * @since      0.0.1
 * @package    OmniMailer
 * @subpackage OmniMailer/_inc
 * @author     Julian Hartmann <jh@steakbanana.com>
 */
class OmniMailer_Deactivator {

	public static function deactivate() {
		wp_unschedule_event( wp_next_scheduled( 'omnimailer_db_cron_hook' ), 'omnimailer_db_cron_hook' );
	}

}