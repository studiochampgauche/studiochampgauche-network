<?php

$table_prefix  = 'wp_';


define('DB_NAME', 'studiochampgauche');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

define('AUTH_KEY',         '');
define('SECURE_AUTH_KEY',  '');
define('LOGGED_IN_KEY',    '');
define('NONCE_KEY',        '');
define('AUTH_SALT',        '');
define('SECURE_AUTH_SALT', '');
define('LOGGED_IN_SALT',   '');
define('NONCE_SALT',       '');



/*
* Define environment type
* We'll use local, development, staging and production like wordpress defaults
* 
* See "development" as "local"
*
* Use SAVEQUERIES with caution: It stores all SQL queries, which can slow down performance and increase memory usage. Avoid using it in production.
* 
* In your themes and plugins, you can use wp_get_environment_type();
*/
define('WP_ENVIRONMENT_TYPE', 'local');

if(in_array(WP_ENVIRONMENT_TYPE, ['local', 'development', 'staging'])){

	define('WP_DEBUG', true);
	define('WP_DEBUG_LOG', true);
	define('WP_DEBUG_DISPLAY', true);
	// define('SCRIPT_DEBUG', true);
	// define('SAVEQUERIES', true);
	@ini_set('display_errors', 1);

} else if(WP_ENVIRONMENT_TYPE === 'production'){

	define('WP_DEBUG', false);

}


if(!defined('ABSPATH')){

	define('ABSPATH', dirname(__FILE__) . '/');

}


define('WP_DEFAULT_THEME', 'core');


/* Multisite */
define('WP_ALLOW_MULTISITE', true);
define( 'MULTISITE', true );
define( 'SUBDOMAIN_INSTALL', true );
define( 'DOMAIN_CURRENT_SITE', (WP_ENVIRONMENT_TYPE === 'production' ? 'studiochampgauche.com' : 'studiochampgauche.test'));
define( 'PATH_CURRENT_SITE', '/' );
define( 'SITE_ID_CURRENT_SITE', 1 );
define( 'BLOG_ID_CURRENT_SITE', 1 );


/*
* Manage cookies
*/
define('COOKIE_DOMAIN', $_SERVER['HTTP_HOST']);
define('ADMIN_COOKIE_PATH', '/');
define('COOKIEPATH', '/');
define('SITECOOKIEPATH', '/');



require_once(ABSPATH . 'wp-settings.php');