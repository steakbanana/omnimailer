<?php

namespace OmniMailer;

/**
* @var string $provider
* @var string $handle
* @var string $list
* @var string $legend
* @var string $has_name
* @var string $has_labels
*/

$privacy_url = get_privacy_policy_url();
?>
<div class="omnimailer-form omnimailer-form-subscribe" data-omnimailer-form-provider="<?= $provider; ?>" data-omnimailer-form-handle="<?= $handle; ?>" data-omnimailer-form-list="<?= $list; ?>">
    <div class="omnimailer-form-message hide">
        <div class="omnimailer-form-message-inner">
            <div class="omnimailer-form-message-close-button">×</div>
            <div class="omnimailer-form-message-heading"></div>
            <div class="omnimailer-form-message-text"></div>
        </div>
    </div>
    <form>
        <fieldset>
	        <?php if( (bool) $legend ) : ?>
                <legend>
                    <?= $legend ?>
                </legend>
	        <?php endif; ?>
	        <?php if( (bool) $has_name ) : ?>
                <label>
	                <?php if( (bool) $has_labels ) : ?><?php _e( 'Name', 'omnimailer' ); ?><?php endif; ?>
                    <input type="text" <?= $has_name === 'mandatory' ? 'class="mandatory"' : ''; ?> placeholder="<?php _e( 'Name', 'omnimailer' ); ?>" data-omnimailer-form="name" <?= $has_name === 'mandatory' ? 'required' : ''; ?>>
                </label>
	        <?php endif; ?>
            <label>
	            <?php if( (bool) $has_labels ) : ?><?php _e( 'E-mail address', 'omnimailer' ); ?><?php endif; ?>
                <input type="email" class="mandatory" placeholder="<?php _e( 'E-mail address', 'omnimailer' ); ?>" data-omnimailer-form="email" required>
            </label>
            <?php if( (bool) OmniMailer_Options::get_option( 'use_honeypot' ) ) : ?>
                <label class="homepage-field-label">
	                <?php if( (bool) $has_labels ) : ?><?php _ex( 'Homepage', 'Honeypot field', 'omnimailer' ); ?><?php endif; ?>
                    <input type="text" aria-hidden="true" placeholder="<?php _ex( 'Homepage', 'Honeypot field', 'omnimailer' ); ?>">
                </label>
            <?php endif; ?>
            <?php if( ! empty( $privacy_url ) ) : ?>
                <?php /* translators: %s: Privacy Policy URL */ $link = sprintf( wp_kses( __( 'I accept this site\'s <a href="%s">privacy policy</a>.', 'omnimailer' ), array( 'a' => array( 'href' => array() ) ) ), esc_url( $privacy_url ) ); ?>
                <label>
                    <input type="checkbox" class="mandatory" data-omnimailer-form="terms" required>
                    <span class="checkbox-label"><?= $link; ?></span>
                </label>
            <?php endif; ?>
            <button type="submit"><?php _e('Submit', 'omnimailer') ?></button>
            <div class="loader-overlay hide">
                <div class="loader-overlay-message"><?php _e('One moment please...', 'omnimailer') ?></div>
            </div>
        </fieldset>
    </form>
</div>