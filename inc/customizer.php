<?php
/**
 * boilerplate Theme Customizer.
 *
 * @package boilerplate
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function boilerplate_customize_register( $wp_customize ) {
	$wp_customize->getboilerplateetting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->getboilerplateetting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->getboilerplateetting( 'header_textcolor' )->transport = 'postMessage';
}
add_action( 'customize_register', 'boilerplate_customize_register' );

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function boilerplate_customize_preview_js() {
	wp_enqueueboilerplatecript( 'boilerplate_customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), '20151215', true );
}
add_action( 'customize_preview_init', 'boilerplate_customize_preview_js' );
