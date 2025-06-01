<?php

include 'inc/ajax.php';
include 'inc/endpoint.php';
include 'inc/keys.php';
/*
* Enqueue styles & scripts
*/
add_action('wp_enqueue_scripts', function(){
	
	/*
	* CSS
	*/
	wp_enqueue_style('rwp-main', get_stylesheet_directory_uri() . '/assets/css/account.min.css', null, null, null);


	/*
	* JS
	*/
	wp_enqueue_script('rwp-main', get_stylesheet_directory_uri() . '/assets/js/account.min.js', null, null, false);



	/*
    * Remove rwp-main script type attribute
    */
    add_filter('script_loader_tag', function($tag, $handle, $src){
    	
        if($handle !== 'rwp-main')
            return $tag;

        $tag = '<script src="' . esc_url( $src ) . '" defer></script>';

        return $tag;

    } , 10, 3);


    /*
    * Medias to Download
    */
    $mediasToDownload = [];
    wp_localize_script('rwp-main', 'MEDIAS', $mediasToDownload);


    /*
    * Routes
    */
    $routes = [];
    $data = rwp::cpt(['page', 'post'], [
        'posts_per_page' => -1
    ])->posts;
    
    if($data){

        $x = 0;
	    foreach($data as $k => $v){


            if(is_user_logged_in() && in_array($v->ID, [12, 14])) continue;


	    	$pageTemplate = implode('', array_map('ucfirst', explode('-', str_replace(['.php', ' '], ['', '-'], get_page_template_slug($v->ID)))));


	    	$acfGroups = acf_get_field_groups(['post_id' => $v->ID]);
	    	$acf = [];

	    	if($acfGroups){

	    		foreach($acfGroups as $l => $group){

	    			if(!$group['active'] || !$group['show_in_rest']) continue;


	    			$fields = acf_get_fields($group['key']);

	    			if(!$fields) continue;

	    			foreach($fields as $m => $field){

	    				$acf[$field['name']] = rwp::field($field['name'], $v->ID);

	    			}

	    		}

	    	}

	    	$pageName = rwp::field('name', $v->ID);

            $routes[] = [
            	'id' => $v->ID,
            	'template' => $pageTemplate,
            	'routeName' => $v->post_name,
            	'pageName' => ($pageName ? $pageName : $v->post_title),
            	'path' => str_replace(site_url(), '', get_the_permalink($v->ID)),
            	'type' => $v->post_type,
            	'seo' => (isset($acf['seo']) ? $acf['seo'] : []),
            	'mediaGroups' => (isset($acf['media_groups']) ? str_replace(', ', ',', $acf['media_groups']) : null),
            	'main' => ($v->ID === get_the_ID() ? true : false)
            ];


            if(isset($acf['name']))
            	unset($acf['name']);

            if(isset($acf['seo']))
            	unset($acf['seo']);

            if(isset($acf['media_groups']))
            	unset($acf['media_groups']);


            $routes[$x]['acf'] = $acf;
            $routes[$x]['seo']['og_type'] = 'website';


            $x++;
	    }
	}

    wp_localize_script('rwp-main', 'ROUTES', $routes);


    /*
    * Current user Data
    */
    $user = wp_get_current_user();
    $userSites = get_blogs_of_user($user->ID);
    unset($userSites[1]);
    unset($userSites[2]);
    unset($userSites[3]);

    $userSites = array_values($userSites);


    $sites = [];

    foreach($userSites as $site_key => $site){

    	$sites[] = [
    		'id' => $site->userblog_id,
    		'domain' => $site->domain,
            'domain_excerpt' => wp_html_excerpt($site->domain, 28, '...'),
    		'name' => $site->blogname,
            'url' => get_site_url($site->userblog_id),
            'admin_url' => get_admin_url($site->userblog_id),
            'token' => hash_hmac('sha256', $user->user_login . ':' . $site->domain, getenv('SECRET_SALT'))
    	];

    	switch_to_blog($site->userblog_id);

    	$status = rwp::field('status', 'option');

    	$sites[$site_key]['status'] = $status ? $status : 'active';

    	if($sites[$site_key]['status'] === 'active')
    		$sites[$site_key]['status_text'] = 'Actif';

    	elseif($sites[$site_key]['status'] === 'past_due')
    		$sites[$site_key]['status_text'] = 'En retard de paiement';

    	elseif($sites[$site_key]['status'] === 'unpaid')
    		$sites[$site_key]['status_text'] = 'Inactif';

    	restore_current_blog();

    }

    $user = $user->ID ? [
    	'id' => $user->ID,
    	'username' => $user->user_login,
    	'firstname' => $user->user_firstname,
    	'lastname' => $user->user_lastname,
    	'email' => $user->user_email,
    	'phone' => rwp::field('phone', 'user_' . $user->ID),
    	'company' => rwp::field('company', 'user_' . $user->ID),
    	'addr' => rwp::field('address', 'user_' . $user->ID),
    	'sites' => $sites
    ] : [];

    wp_localize_script('rwp-main', 'USER', $user);


    wp_localize_script('rwp-main', 'STRIPE', [
        'public_key' => STRIPE_PUBLIC_KEY
    ]);

    

});


/*
* Redirect
*/
add_action('template_redirect', function(){

    if(is_404() || is_search() || (is_user_logged_in() && is_page(['mdp-perdu', 'change-mdp']))){

        wp_redirect(home_url());

        exit;
    }

});


/*
* Add inline styles for preloader
*/
add_action('wp_head', function(){

	echo '
	<style type="text/css">
        :root{
            --white-color: #fff;
            --black-color: #000;
            --theme-color: #214CF3;
            --gray-n1-color: #EFEFEF;
            --gray-n2-color: #CCCCCC;
            --gray-n3-color: #777777;
            --gray-n4-color: #1F1F1F;
            --gray-n5-color: #AAAAAA;
            --gray-n6-color: #838383;
            --gray-n7-color: #4B4B4B;
            --gray-n8-color: #101010;
            --good-color: #15A86F;
            --error-color: #FF0000;
            --pending-color: #A87215;
        }

        *{
            outline: 0;
            scrollbar-width: none;
            box-sizing: border-box;
            -ms-overflow-style: none;
            -webkit-font-smoothing: antialiased;
            &::-webkit-scrollbar {
                display: none;
            }
        }

        html,
        body{
            margin: 0;
            padding: 0;
        }

        html{
            font-size: 16px;
        }

        body{
            font-family: "nm";
            font-weight: 500;
            max-height: 100lvh;
            overflow: hidden;
        }

		#loader{
			background: var(--theme-color);
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100svh;
			z-index: 999;
		}
	</style>
	';

}, 3);


/*
* Edit wp_head
*/
add_filter('rwp_wp_head', function($wp_heads){
				
	$wp_heads['title'] = str_replace(['Privé', ': ', '&nbsp;'], '', $wp_heads['title']);

 	return $wp_heads;

});