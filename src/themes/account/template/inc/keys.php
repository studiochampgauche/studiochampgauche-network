<?php

if(!defined('STRIPE_SECRET_KEY'))
	define('STRIPE_SECRET_KEY', (WP_ENVIRONMENT_TYPE === 'production' ? getenv('STRIPE_PROD_SECRET_KEY') : getenv('STRIPE_TEST_SECRET_KEY')));

if(!defined('STRIPE_PUBLIC_KEY'))
	define('STRIPE_PUBLIC_KEY', (WP_ENVIRONMENT_TYPE === 'production' ? getenv('STRIPE_PROD_PUBLIC_KEY') : getenv('STRIPE_TEST_PUBLIC_KEY')));

if(!defined('STRIPE_ENDPOINT_KEY'))
	define('STRIPE_ENDPOINT_KEY', (WP_ENVIRONMENT_TYPE === 'production' ? getenv('STRIPE_PROD_ENDPOINT_KEY') : getenv('STRIPE_TEST_ENDPOINT_KEY')));

if(!defined('HUBSPOT_TOKEN_KEY'))
	define('HUBSPOT_TOKEN_KEY', getenv('HUBSPOT_TOKEN'));

if(!defined('HUBSPOT_CLIENT_KEY'))
	define('HUBSPOT_CLIENT_KEY', getenv('HUBSPOT_CLIENT_SECRET'));