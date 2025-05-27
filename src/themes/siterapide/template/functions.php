<?php

/*
* Enqueue styles & scripts
*/
add_action('wp_enqueue_scripts', function(){
	
	/*
	* CSS
	*/
	wp_enqueue_style('rwp-main', get_stylesheet_directory_uri() . '/assets/css/siterapide.min.css', null, null, null);


	/*
	* JS
	*/
	wp_enqueue_script('rwp-main', get_stylesheet_directory_uri() . '/assets/js/siterapide.min.js', null, null, false);



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
    $mediasToDownload = [
        'home' => [
            [
                'type' => 'image',
                'alt' => 'Image démo d\'un de nos projets.',
                'src' => '/wp-content/uploads/2025/04/laptop.png',
                'target' => '#h__intro .container .end .img-container .inner-img .img'
            ],
            [
                'type' => 'image',
                'alt' => 'Construction et rénovation',
                'src' => '/wp-content/uploads/2025/04/Construction.jpg',
                'target' => '#h__sectors-activity .container .list .track .item:nth-child(1) .img-container .inner-img .img'
            ],
            [
                'type' => 'image',
                'alt' => 'Services professionnels',
                'src' => '/wp-content/uploads/2025/04/Service-professionnel.jpg',
                'target' => '#h__sectors-activity .container .list .track .item:nth-child(2) .img-container .inner-img .img'
            ],
            [
                'type' => 'image',
                'alt' => 'Transport',
                'src' => '/wp-content/uploads/2025/04/transport.jpg',
                'target' => '#h__sectors-activity .container .list .track .item:nth-child(3) .img-container .inner-img .img'
            ],
            [
                'type' => 'image',
                'alt' => 'Finances',
                'src' => '/wp-content/uploads/2025/04/Finance.jpg',
                'target' => '#h__sectors-activity .container .list .track .item:nth-child(4) .img-container .inner-img .img'
            ],
            [
                'type' => 'image',
                'alt' => 'Industrie manufacturière',
                'src' => '/wp-content/uploads/2025/04/industrie.jpg',
                'target' => '#h__sectors-activity .container .list .track .item:nth-child(5) .img-container .inner-img .img'
            ],
            [
                'type' => 'image',
                'alt' => 'Loisir et divertissement',
                'src' => '/wp-content/uploads/2025/04/loisirs.jpg',
                'target' => '#h__sectors-activity .container .list .track .item:nth-child(6) .img-container .inner-img .img'
            ],
        ]
    ];
    wp_localize_script('rwp-main', 'MEDIAS', $mediasToDownload);


    /*
    * Routes
    */
    $routes = [];
    $data = rwp::cpt(['page', 'post'], [
        'posts_per_page' => -1
    ])->posts;

    if($data){

	    foreach($data as $k => $v){

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

            if($routes[$k]['path'] === '/')
                $routes[$k]['template'] = 'TemplateHome';


            if(isset($acf['name']))
            	unset($acf['name']);

            if(isset($acf['seo']))
            	unset($acf['seo']);

            if(isset($acf['media_groups']))
            	unset($acf['media_groups']);


            $routes[$k]['acf'] = $acf;


            if($routes[$k]['type'] === 'post'){

                //$routes[$k]['template'] = 'SinglePost';
                $routes[$k]['seo']['og_type'] = 'article';

                $routes[$k]['extraDatas'] = [
                    'date' => $v->post_date,
                    'modified' => $v->post_modified,
                    'author' => get_author_posts_url($v->post_author)
                ];

            } elseif($routes[$k]['type'] === 'author'){

                $routes[$k]['seo']['og_type'] = 'profile';

                $routes[$k]['extraDatas'] = [
                    'username' => '',
                    'name' => [
                        'firstname' => '',
                        'lastname' => ''
                    ]
                ];

            } else {

            	$routes[$k]['seo']['og_type'] = 'website';

            }


	    }
	}

    wp_localize_script('rwp-main', 'ROUTES', $routes);
    

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
            --gray-n9-color: #666666;
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
            &::selection{
                background: var(--theme-color);
                color: var(--white-color);
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
			position: fixed;
            display: flex;
			top: 0;
			left: 0;
			width: 100%;
			height: 100dvh;
            align-items: center;
            justify-content: center;
			z-index: 999;
            .logo{
                position: absolute;
                height: calc(100% + 120px);
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 2;
                svg{
                    display: block;
                    width: auto;
                    height: 100%;
                    path{
                        position: relative;
                        fill: none;
                        stroke: var(--white-color);
                        stroke-dasharray: 500px;
                        stroke-dashoffset: 500px;
                        stroke-width: 10;
                        &:nth-child(2){
                            z-index: 2;
                        }
                    }
                }
            }
            .bg{
                background: var(--theme-color);
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                transform-origin: center top;
                z-index: 1;
            }
            @media screen and (orientation: portrait){
                .logo{
                    width: 100%;
                    height: initial;
                    max-width: 320px;
                    svg{
                        width: 100%;
                        height: auto;
                    }
                }
            }
		}
	</style>
	';

}, 3);