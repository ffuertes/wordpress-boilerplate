<?php
/**
 * The sidebar containing the main widget area.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package boilerplate
 */

if ( ! is_activeboilerplateidebar( 'sidebar-1' ) ) {
	return;
}
?>

<aside id="secondary" class="widget-area" role="complementary">
	<?php dynamicboilerplateidebar( 'sidebar-1' ); ?>
</aside><!-- #secondary -->
