<?php
/**
 * @var string $label
 * @var string $id
 * @var string $name
 * @var string $value (optional)
 * @var string $placeholder (optional)
 * @var string $description (optional)
 */
?>

<tr>
	<th scope="row">
		<label for="<?= $id; ?>"><?= $label; ?></label>
	</th>
	<td>
		<input id="<?= $id; ?>" type="text" class="regular-text ltr" name="<?= $name; ?>" value="<?= $value; ?>" placeholder="<?= $placeholder; ?>">
		<?php if( ! empty( $description ) ) : ?>
            <p class="description">
				<?= $description; ?>
            </p>
		<?php endif; ?>
	</td>
</tr>