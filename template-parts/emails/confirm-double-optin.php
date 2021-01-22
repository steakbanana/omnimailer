<?php
/**
 * @var string $name
 * @var string $uuid
 */

$activation_href = get_site_url() . '?optin_id=' . $uuid;
?>

<p>
    <?php /* translators: %s: First or full name of a subscriber */ ?>
    <?= sprintf( __( 'Dear %s,', 'omnimailer' ), $name ); ?>
</p>
<p>
    <?php /* translators: %s: Name of the origin site */ ?>
    <?= sprintf( __( 'Please activate your subscription to %s by clicking on the following activation link within 48 hours.', 'omnimailer' ), get_bloginfo( 'name' ) ); ?>
</p>
<p>
    <a href="<?= $activation_href; ?>"><?= $activation_href; ?></a><br>
    <?php _e( 'If clicking the link does not open a window stating that your subscription is now complete, or any window at all, please copy the complete link and paste it into your browser.', 'omnimailer' ); ?>
</p>
<p>
	<?php /* translators: %s: URL of the origin site */ ?>
    <?= sprintf( __( 'You are getting this e-mail because you entered your e-mail address in a subscription form at %s.', 'omnimailer' ), get_site_url() ); ?>
	<?php _e( 'If you did not use the subscription form or would not like to be subscribed anymore, please disregard this e-mail.', 'omnimailer' ); ?>
	<?php _e( 'Your subscription attempt will be deleted 48 hours after this e-mail was sent.', 'omnimailer' ); ?>
</p>
<p>
	<?php /* translators: %s: Name of the origin site */ ?>
	<?= sprintf( __( 'Warmest wishes, %s', 'omnimailer' ), get_bloginfo( 'name' ) ); ?>
</p>