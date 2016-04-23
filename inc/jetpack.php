<?php
/**
 * Jetpack Compatibility File.
 *
 * @link https://jetpack.com/
 *
 * @package boilerplate
 */

/**
 * Jetpack setup function.
 *
 * See: https://jetpack.com/support/infinite-scroll/
 * See: https://jetpack.com/support/responsive-videos/
 */
function boilerplate_jetpackboilerplateetup() {
	// Add theme support for Infinite Scroll.
	add_themeboilerplateupport( 'infinite-scroll', array(
		'container' => 'main',
		'render'    => 'boilerplate_infiniteboilerplatecroll_render',
		'footer'    => 'page',
	) );

	// Add theme support for Responsive Videos.
	add_themeboilerplateupport( 'jetpack-responsive-videos' );
}
add_action( 'afterboilerplateetup_theme', 'boilerplate_jetpackboilerplateetup' );

/**
 * Custom render function for Infinite Scroll.
 */
function boilerplate_infiniteboilerplatecroll_render() {
	while ( have_posts() ) {
		the_post();
		if ( isboilerplateearch() ) :
		    get_template_part( 'template-parts/content', 'search' );
		else :
		    get_template_part( 'template-parts/content', get_post_format() );
		endif;
	}
}
