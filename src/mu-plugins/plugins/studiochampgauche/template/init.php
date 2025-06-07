<?php

include 'inc/render.php';
include 'inc/role.php';
include 'inc/smtp.php';


add_action('init', function(){

    $isSrClient = in_array(get_stylesheet(), ['the-next']);
    $currentUserID = get_current_user_id();
    $currentBlog = get_blog_details();
    $currentBlogID = $currentBlog->blog_id;

    /*
    * SSO Login
    *
    * This is a temporary solution while we replace /wp-admin
    * with our WordPress-based CMS siterapide.ca.
    */
    if(isset($_GET['sso-login'], $_GET['domain'], $_GET['username']) && hash_hmac('sha256', $_GET['username'] . ':' . $_GET['domain'], getenv('SECRET_SALT')) === $_GET['sso-login'] && $currentBlog->domain === $_GET['domain']){

        $user = get_user_by('login', $_GET['username']);
        $blog = get_blog_details([
            'domain' => $_GET['domain']
        ]);

        if(is_user_member_of_blog($user->ID, $blog->blog_id)){

            wp_set_current_user($user->ID, $user->user_login);
            wp_set_auth_cookie($user->ID);


            wp_redirect(admin_url());

            exit;

        }
    }

    /*
    * Redirect /wp-signup.php
    */
    if (strpos($_SERVER['REQUEST_URI'], 'wp-signup.php') !== false) {

        wp_redirect(home_url(), 301);

        exit;

    }


    /*
    * Redirect /wp-admin
    */
    if (is_admin() && !is_super_admin($currentUserID) && !defined('DOING_AJAX') && !is_user_member_of_blog($currentUserID, $currentBlogID)) {

        wp_redirect($isSrClient ? get_home_url(3) : home_url());

        exit;

    }


    /*
    * Redirect /wp-login.php
    */
    if ($isSrClient && strpos($_SERVER['REQUEST_URI'], 'wp-login.php') !== false) {

        wp_redirect(get_home_url(3));

        exit;

    }


    if(!defined('CURRENT_SITE_SLUG')){
    
        define('CURRENT_SITE_SLUG', str_replace(['.siterapide.test', '.siterapide.ca', '.solide.dev', '.studiochampgauche.com', '.studiochampgauche.test', '.ca', '.com', '.net', '.org', '.fr', '.info', '.co', '.us', '.edu', '.biz'], '', get_blog_details()->domain));

    }

    if(!defined('SR_SIGNATURE_TEXT')){
        
        define('SR_SIGNATURE_TEXT', (rwp::field('agency_copyright_text_' . CL) ? rwp::field('agency_copyright_text_' . CL) : (CL === 'fr' ? ($isSrClient ? 'Développement web - siterapide.ca' : 'Développement web - Studio Champ Gauche') : ($isSrClient ? 'Web development - siterapide.ca' : 'Web development - Studio Champ Gauche'))));

    }

    if(!defined('SR_SIGNATURE_URL')){
        
        define('SR_SIGNATURE_URL', (rwp::field('agency_copyright_url_' . CL) ? rwp::field('agency_copyright_url_' . CL) : (CL === 'fr' ? ($isSrClient ? 'https://siterapide.ca' : 'https://studiochampgauche.com') : ($isSrClient ? 'https://siterapide.ca' : 'https://studiochampgauche.com'))));

    }
        
});


add_action('wp_enqueue_scripts', function(){

    wp_localize_script('rwp-main', 'COPYRIGHT', [
        'text' => SR_SIGNATURE_TEXT,
        'url' => SR_SIGNATURE_URL
    ]);

}, 11);


/*
* Shot events on admin_head action
*/
add_action('admin_head', function(){

    /*
    * Display none some element in admin
    */
    echo '
        <style type="text/css">
            #wp-admin-bar-my-sites-list{
                display: none !important;
            }
        </style>
    ';

});


/*
* Lock site if unpaid
*/
add_action('template_redirect', function(){

    $status = rwp::field('status', 'option');

    if ($status === 'unpaid'){

        wp_die((CL === 'fr' ? 'Le site est temporairement indisponible.' : 'The site is temporarily unavailable.'), (CL === 'fr' ? 'Site indisponible' : 'Site unavailable'), array('response' => 403));

        exit;

    }
    
});


/*
* Add to wp_head
*/
add_action('wp_head', function(){

    $ga4_code = rwp::field('ga_code');

    if($ga4_code){
        echo '
            <script async src="https://www.googletagmanager.com/gtag/js?id='. $ga4_code .'"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}

                // Initialisation avec le mode sans cookie
                gtag("js", new Date());

                gtag("config", "'. $ga4_code .'", {
                    "storage": "none",
                    "client_storage": "none",
                    "anonymize_ip": true,
                    "cookie_flags": ""
                });
            </script>
        ';
    }

}, 3);