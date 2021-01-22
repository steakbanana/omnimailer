<?php

namespace OmniMailer\Options;

use OmniMailer\OmniMailer_Options;

?>

<div id="col-container">
    <div id="col-right"></div>
    <div id="col-left">
        <div class="col-wrap">
            <h2><?php _e( 'Mailgun Settings', 'omnimailer' ); ?></h2>
            <div class="form-wrap">
                <form method="post" action="options.php" novalidate>
                    <?php settings_fields( 'omnimailer' ); ?>

                    <table class="form-table">
                        <?php

                        OmniMailer_Options::add_option_text(
                            __( 'Mailgun Domain Name', 'omnimailer' ),
                            'mailgun_domain',
                            'omnimailer[mailgun][domain]',
                            esc_attr__( OmniMailer_Options::get_option( 'domain', 'mailgun' ) ),
                            'samples.mailgun.org',
                            __( 'Your Mailgun domain name.', 'omnimailer' )
                        );

                        OmniMailer_Options::add_option_text(
                            __( 'Mailgun API Key', 'omnimailer' ),
                            'mailgun_api',
                            'omnimailer[mailgun][api_key]',
                            esc_attr__( OmniMailer_Options::get_option( 'api_key', 'mailgun' ) ),
                            'key-3ax6xnjp29jd6fds4gc373sgvjxteol0',
                            __( 'To find your key, visit the Mailgun Dashboard and click on "API keys".', 'omnimailer' )
                        );

                        OmniMailer_Options::add_option_select(
                            __( 'Mailgun Region', 'omnimailer' ),
                            'mailgun_region',
                            'omnimailer[mailgun][region]',
                            OmniMailer_Options::get_option( 'region', 'mailgun' ),
                            array(
                                'eu' => __( 'Europe', 'omnimailer' ),
                                'us' => __( 'U.S./North America', 'omnimailer' ),
                            ),
                            __( 'Please choose the region your Mailgun sending domain is associated with.', 'omnimailer' )
                        );

                        ?>
                    </table>
                    <p class="submit">
                        <input type="submit" class="button-primary" value="<?php _e( 'Save Changes', 'omnimailer' ); ?>">
                    </p>
                </form>
            </div>
        </div>
    </div>
</div>