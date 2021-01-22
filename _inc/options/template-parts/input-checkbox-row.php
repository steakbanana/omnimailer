<?php
/**
 * @var string $label
 * @var string $id
 * @var string $name
 * @var string $value (optional)
 * @var bool $checked (optional)
 * @var string $description (optional)
 */
?>

<tr>
	<th scope="row">
		<?= $label; ?>
	</th>
	<td>
		<label for="<?= $id; ?>">
            <input type="hidden" name="<?= $name; ?>" value="0">
			<input id="<?= $id; ?>" type="checkbox" name="<?= $name; ?>" value="1" <?= checked( 1, $checked, false ); ?>>
			<?= $description; ?>
		</label>
	</td>
</tr>