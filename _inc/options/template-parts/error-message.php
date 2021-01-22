<?php
/**
* @var string $content_path
*/
?>
<div class="notice notice-error">
	<p>
		<?php
		_e( 'The options page for the <strong>OmniMailer</strong> plugin cannot be displayed.', 'omnimailer' );
		/* translators: %s: Plugin file path */
		printf( __( 'The file <strong>%s</strong> is missing. Please reinstall the plugin.', 'omnimailer' ), OMNIMAILER_DIR . $content_path );
		?>
	</p>
</div>