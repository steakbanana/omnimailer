<?php
/**
 * @var string $label
 * @var string $id
 * @var string $name
 * @var string $region
 * @var array $options
 * @var string $description (optional)
 */
?>

<tr>
    <th scope="row">
        <label for="<?= $id; ?>"><?= $label; ?></label>
    </th>
    <td>
        <select id="<?= $id; ?>" name="<?= $name; ?>">
			<?php foreach( $options as $key => $option ) : ?>
                <option value="<?= $key; ?>"<?php selected( $key, $region ); ?>><?= $option; ?></option>
			<?php endforeach; ?>
        </select>
        <?php if( ! empty( $description ) ) : ?>
            <p class="description">
                <?= $description; ?>
            </p>
        <?php endif; ?>
    </td>
</tr>