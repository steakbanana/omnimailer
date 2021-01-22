<?php

namespace OmniMailer\Options;

/**
 * @var $content_path
 */

$current_slug = $_GET['page'] ?: 'omnimailer';

?>

<div id="omnimailer_options" class="wrap">
    <div class="alignright">
        <a class="sb-logo-link" target="_new" href="https://www.steakbanana.com/">
            <img src="<?= OMNIMAILER_URL . 'assets/images/steakbanana.svg' ?>" alt="STEAKBANANA">
        </a>
    </div>
	<h1><?php _e( 'OmniMailer Settings', 'omnimailer' ); ?></h1>
    <div class="nav-tab-wrapper">
        <a class="nav-tab <?= $current_slug === 'omnimailer' ? 'nav-tab-active' : '' ?>" href="?page=omnimailer"><?= esc_html_x( 'General', 'Settings Page', 'omnimailer' ); ?></a>
        <a class="nav-tab <?= $current_slug === 'omnimailer_mailgun' ? 'nav-tab-active' : '' ?>" href="?page=omnimailer_mailgun"><?php esc_html_e( 'Mailgun', 'omnimailer' ); ?></a>
    </div>
    <div class="nav-tab-content">
	    <?php include_once OMNIMAILER_DIR . $content_path; ?>
    </div>
</div>