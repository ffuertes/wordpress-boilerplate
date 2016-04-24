<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package boilerplate
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function boilerplate_body_classes( $classes ) {
	// Adds a class of group-blog to blogs with more than 1 published author.
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}

	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	return $classes;
}
add_filter( 'body_class', 'boilerplate_body_classes' );

//Funcion para controlar la longitud del excerpt
function custom_excerpt_length( $length ) {
	return 20;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

//Para modificar la forma en la que concluye el excerpt
function new_excerpt_more( $more ) {
	return "...";
}
add_filter('excerpt_more', 'new_excerpt_more');

//cambiar el logo de la pagina de login...
function my_login_head() {
	echo "
	<style>
	body.login #login h1 a {
		background: url('". get_template_directory_uri() ."/assets/img/logo-login.png') no-repeat scroll center top transparent;
		width: 275px;
		height: 133px;
		background-size: cover;
	}
	</style>
	";
}
add_action("login_head", "my_login_head");

//Cambiar el URL del logo de login
function custom_loginlogo_url($url) {
    return ( home_url() );
}
add_filter( 'login_headerurl', 'custom_loginlogo_url' );

//Cambiar el Título al logo de login
function logo_title(){
	return ( get_bloginfo('name') ); // changing the title from "Powered by WordPress" to whatever you wish
}
add_filter('login_headertitle', 'logo_title');

//Por cuestiones de seguridad remover la version de wordpress de sitios visibles
function remove_version() {
	return '';
}
add_filter('the_generator', 'remove_version');

function disable_comment_url($fields) { 
    unset($fields['url']);
    return $fields;
}
add_filter('comment_form_default_fields','disable_comment_url');