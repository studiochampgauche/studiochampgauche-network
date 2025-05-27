<?php
/*
Plugin Name: SCG Forms
Description: A plugin that manage your forms.
Update URI: false
Version: 1.0.0
*/



/*
* Check ABSPATH
*/
if(!defined('ABSPATH')) return;


/*
* Make sure you have all you need for the plugin
*/
require_once ABSPATH . 'wp-admin/includes/plugin.php';

/*
* Render custom post type form
*/
include_once __DIR__ . '/inc/render.php';

/*
* Enqueue FORM variable
*/
include_once __DIR__ . '/inc/enqueue.php';

/*
* When you sent a form
*/
include_once __DIR__ . '/inc/ajax.php';


/*
* Shot events on admin_head action
*/
add_action('admin_head', function(){

    /*
    * Display none some element in admin
    */
    echo '
        <style type="text/css">
            #menu-posts-form{
                display: none !important;
            }
        </style>
    ';

});


?>