<?php
/**
 * Plugin Name: Divi Simple Mobile Menu
 * Plugin URI: https://github.com/ozbarsut/Divi-mobile-menu
 * Description: Simple Divi mobile menu with slide panel and visible close button.
 * Version: 1.1.0
 * Author: ozbarsut
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: divi-simple-mobile-menu
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Load frontend assets for the custom mobile menu.
 */
function dsmm_enqueue_assets() {
    if (is_admin()) {
        return;
    }

    $version = '1.1.0';
    $base_url = plugin_dir_url(__FILE__);

    wp_enqueue_style(
        'dsmm-mobile-menu-style',
        $base_url . 'assets/mobile-menu.css',
        array(),
        $version
    );

    wp_enqueue_script(
        'dsmm-mobile-menu-script',
        $base_url . 'assets/mobile-menu.js',
        array(),
        $version,
        true
    );
}
add_action('wp_enqueue_scripts', 'dsmm_enqueue_assets');
