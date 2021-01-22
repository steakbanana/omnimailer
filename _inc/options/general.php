<?php

namespace OmniMailer\Options;

use OmniMailer\OmniMailer_Options;

?>

<h2><?php _e( 'General Settings', 'omnimailer' ) ?></h2>
<div class="form-wrap">
	<form method="post" action="options.php" novalidate>
		<?php settings_fields( 'omnimailer' ); ?>

		<table class="form-table">
			<?php OmniMailer_Options::add_option_checkbox(
				__( 'Double Opt-In', 'omnimailer' ),
				'double_opt_in',
				'omnimailer[double_opt_in]',
				'1',
				OmniMailer_Options::get_option( 'double_opt_in' ) === '1',
				__( 'New subscribers need to confirm their subscription by clicking an activation link sent to their e-mail address.', 'omnimailer' )
			); ?>
			<?php OmniMailer_Options::add_option_checkbox(
				__( 'Use Honeypot', 'omnimailer' ),
				'honeypot',
				'omnimailer[use_honeypot]',
				'1',
				OmniMailer_Options::get_option( 'use_honeypot' ) === '1',
				__( 'If active, a hidden field will be added to all forms to counter spam activity.', 'omnimailer' )
			); ?>
		</table>
		<p class="submit">
			<input type="submit" class="button-primary" value="<?php _e( 'Save Changes', 'omnimailer' ); ?>">
		</p>
	</form>
</div>
